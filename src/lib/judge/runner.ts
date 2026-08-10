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
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
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

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
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
