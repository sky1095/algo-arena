import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ClassSpec, InputType, LanguageId, TestCase } from "@/lib/types";
import { buildSubmission } from "@/lib/judge/harness";

export interface ExecuteOptions {
  /** Wall-clock timeout for the run phase in ms. */
  runTimeoutMs: number;
  /** Wall-clock timeout for the compile phase in ms. */
  compileTimeoutMs?: number;
}

/**
 * When set (e.g. JUDGE_UID=1001 JUDGE_GID=1001 in Docker), submission
 * processes run as an unprivileged user instead of the server's user. The
 * server runs as root in the container, so this is what keeps a malicious
 * submission from reading /app/data (app.db + every user's progress file).
 * Left unset in local dev, where the server already runs as the developer.
 */
const JUDGE_UID = process.env.JUDGE_UID ? Number(process.env.JUDGE_UID) : undefined;
const JUDGE_GID = process.env.JUDGE_GID ? Number(process.env.JUDGE_GID) : undefined;

export interface ExecuteResult {
  stdout: string;
  stderr: string;
  compileMs: number;
  runMs: number;
  timedOut: boolean;
  compileFailed: boolean;
  compileError: string;
}

function runProcess(
  cmd: string[],
  opts: { cwd: string; timeoutMs: number; stdin?: string }
): Promise<{ code: number | null; stdout: string; stderr: string; timedOut: boolean }> {
  return new Promise((resolve) => {
    const child = spawn(cmd[0], cmd.slice(1), {
      cwd: opts.cwd,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
      uid: JUDGE_UID,
      gid: JUDGE_GID,
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    // Cap captured output so a runaway print loop can't exhaust server memory
    // (the judge only ever reports a truncated tail anyway).
    const MAX_OUT = 64 * 1024;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        try {
          process.kill(-child.pid!, "SIGKILL");
        } catch {
          /* already dead */
        }
        resolve({ code: null, stdout, stderr, timedOut: true });
      }
    }, opts.timeoutMs);

    child.stdout.on("data", (d) => {
      stdout = stdout + d.toString();
      if (stdout.length > MAX_OUT) stdout = stdout.slice(-MAX_OUT);
    });
    child.stderr.on("data", (d) => {
      stderr = stderr + d.toString();
      if (stderr.length > MAX_OUT) stderr = stderr.slice(-MAX_OUT);
    });
    child.on("error", (err) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ code: null, stdout, stderr: stderr + "\n" + err.message, timedOut: false });
      }
    });
    child.on("close", (code) => {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        resolve({ code, stdout, stderr, timedOut: false });
      }
    });
    if (opts.stdin) {
      child.stdin.write(opts.stdin);
    }
    child.stdin.end();
  });
}

export async function executeSubmission(
  lang: LanguageId,
  userCode: string,
  methodName: string,
  argTypes: string[],
  cases: TestCase[],
  opts: ExecuteOptions,
  outputType: InputType,
  classSpec?: ClassSpec
): Promise<ExecuteResult> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aa-judge-"));
  const built = buildSubmission(lang, userCode, methodName, argTypes as any, cases, outputType, classSpec);

  try {
    for (const f of built.files) {
      fs.writeFileSync(path.join(dir, f.name), f.content);
    }
    // When running submissions as a dedicated unprivileged user, hand the dir
    // to that user (770) so they can write compile/run artifacts — and so other
    // concurrent submissions (same uid) cannot read this one's files.
    if (JUDGE_UID !== undefined && JUDGE_GID !== undefined) {
      try {
        fs.chownSync(dir, JUDGE_UID, JUDGE_GID);
        fs.chmodSync(dir, 0o770);
      } catch {
        // Non-root server (local dev with env set oddly): degrade gracefully.
      }
    }

    let compileMs = 0;
    if (built.compile) {
      const t0 = Date.now();
      const comp = await runProcess(built.compile, {
        cwd: dir,
        timeoutMs: opts.compileTimeoutMs ?? 20000,
      });
      compileMs = Date.now() - t0;
      if (comp.code !== 0) {
        return {
          stdout: "",
          stderr: comp.stderr.slice(0, 4000),
          compileMs,
          runMs: 0,
          timedOut: false,
          compileFailed: true,
          compileError: comp.stderr.slice(0, 4000),
        };
      }
    }

    const t1 = Date.now();
    const run = await runProcess(built.run, {
      cwd: dir,
      timeoutMs: opts.runTimeoutMs,
      stdin: built.stdin,
    });
    const runMs = Date.now() - t1;

    return {
      stdout: run.stdout,
      stderr: run.stderr,
      compileMs,
      runMs,
      timedOut: run.timedOut,
      compileFailed: false,
      compileError: "",
    };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}
