import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { ClassSpec, InputType, LanguageId, TestCase } from "@/lib/types";
import { buildSubmission, type BuiltSubmission } from "@/lib/judge/harness";
import {
  findOnPath,
  findPythonBin,
  isWin32,
  judgeEnv,
  localBinaryArgv,
  pythonArgv,
  unixBashCommand,
  wslCompileScript,
  wslRunScript,
} from "@/lib/judge/platform";

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

// Cap captured output so a runaway print loop can't exhaust server memory
// (the judge only ever reports a truncated tail anyway).
const MAX_OUT = 64 * 1024;

/** Kill a timed-out child and its process tree. Unix: SIGKILL the detached
 *  process group. Windows: taskkill /T /F (no process groups there). */
function killTree(pid: number): void {
  try {
    if (isWin32()) {
      spawn("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      process.kill(-pid, "SIGKILL");
    }
  } catch {
    /* already dead */
  }
}

interface ProcResult {
  code: number | null;
  stdout: string;
  stderr: string;
  timedOut: boolean;
}

/** Run a plain argv directly (native macOS/Linux or native Windows). */
function runProcess(
  cmd: string[],
  opts: { cwd: string; timeoutMs: number; stdin?: string }
): Promise<ProcResult> {
  return new Promise((resolve) => {
    const child = spawn(cmd[0], cmd.slice(1), {
      cwd: opts.cwd,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
      uid: JUDGE_UID,
      gid: JUDGE_GID,
      env: judgeEnv(),
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        killTree(child.pid!);
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

/**
 * Run `bash <scriptName>` inside the default WSL2 distro. The script file
 * lives in the shared temp dir; WSL translates the child's cwd to
 * /mnt/<drive>/<temp dir> automatically, so a relative script name resolves.
 * The script itself applies ulimits and a `timeout` guard, so the Linux-side
 * process terminates even when wsl.exe is killed from the Windows side.
 */
function runWsl(
  scriptName: string,
  opts: { cwd: string; timeoutMs: number; stdin?: string }
): Promise<ProcResult> {
  return new Promise((resolve) => {
    const child = spawn("wsl.exe", ["bash", scriptName], {
      cwd: opts.cwd,
      stdio: ["pipe", "pipe", "pipe"],
      detached: true,
      env: judgeEnv(),
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        killTree(child.pid!);
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

/* ------------------------------------------------------------------ */
/* Execution environment selection                                     */
/* ------------------------------------------------------------------ */

/** Which toolchain executes a submission. */
type ExecEnv = "unix" | "win-native" | "wsl";

/** Binaries a submission needs, in canonical form (python is always
 *  "python3"; Windows alias resolution happens later). */
function requiredBins(built: BuiltSubmission): string[] {
  const bins = new Set<string>();
  if (built.compile) bins.add(built.compile[0]!);
  const run0 = built.run[0]!;
  if (!run0.startsWith("./")) bins.add(run0);
  return [...bins];
}

/** Bins available inside the default WSL2 distro. Probed once per server
 *  process and cached (the probe boots the distro, which is slow-ish). */
let wslBinsPromise: Promise<Set<string>> | null = null;

function wslAvailableBins(): Promise<Set<string>> {
  wslBinsPromise ??= new Promise((resolve) => {
    const wanted = ["python3", "deno", "javac", "java", "g++"];
    const child = spawn("wsl.exe", ["bash", "-lc", `command -v ${wanted.join(" ")}`], {
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
      env: judgeEnv(),
    });
    let out = "";
    const timer = setTimeout(() => killTree(child.pid!), 12000);
    child.stdout.on("data", (d) => {
      out += d.toString();
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve(new Set());
    });
    child.on("close", () => {
      clearTimeout(timer);
      const found = new Set<string>();
      for (const line of out.split("\n")) {
        const name = path.basename(line.trim());
        if (wanted.includes(name)) found.add(name);
      }
      resolve(found);
    });
  });
  return wslBinsPromise;
}

function hasWsl(): boolean {
  return isWin32() && findOnPath("wsl") !== undefined;
}

/** Human-friendly name for a required bin on Windows. */
const displayBin = (b: string): string => (b === "python3" ? "python3/py/python" : b);

/**
 * Pick the toolchain for a submission:
 *  - native Unix (macOS/Linux, or the app itself inside WSL2) → unix
 *  - native Windows with the runtimes installed → win-native
 *  - native Windows, missing a runtime, WSL2 available → wsl (fallback)
 *  - otherwise → an error message (surfaced as a compile error).
 */
async function resolveExecEnv(
  bins: string[]
): Promise<{ env: ExecEnv } | { missing: string; hint: string }> {
  if (!isWin32()) return { env: "unix" };

  const missingNative = bins.filter((b) =>
    b === "python3" ? findPythonBin() === undefined : findOnPath(b) === undefined
  );
  if (missingNative.length === 0) return { env: "win-native" };

  const missing = missingNative.map(displayBin).join(", ");
  if (hasWsl()) {
    const wslBins = await wslAvailableBins();
    const missingWsl = bins.filter((b) => !wslBins.has(b));
    if (missingWsl.length === 0) return { env: "wsl" };
    return {
      missing,
      hint:
        `not found on this Windows machine (${missing}) nor inside WSL2 (${missingWsl.join(", ")}). ` +
        "Install them, or run the server from inside WSL2 where they already exist.",
    };
  }
  return {
    missing,
    hint:
      `not found on this Windows machine (${missing}). ` +
      "Install them and add them to PATH, or install WSL2 with a Linux distro that has them.",
  };
}

/* ------------------------------------------------------------------ */
/* Submission execution                                                */
/* ------------------------------------------------------------------ */

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
  const built = buildSubmission(lang, userCode, methodName, argTypes as never, cases, outputType, classSpec);

  try {
    const envRes = await resolveExecEnv(requiredBins(built));
    if ("missing" in envRes) {
      return {
        stdout: "",
        stderr: "",
        compileMs: 0,
        runMs: 0,
        timedOut: false,
        compileFailed: true,
        compileError: `Judge runtime ${envRes.hint}`,
      };
    }
    const execEnv = envRes.env;
    const isWsl = execEnv === "wsl";

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
      let comp: ProcResult;
      if (isWsl) {
        const script = wslCompileScript(built.compile, Math.ceil((opts.compileTimeoutMs ?? 25000) / 1000));
        fs.writeFileSync(path.join(dir, "_compile.sh"), script);
        comp = await runWsl("_compile.sh", { cwd: dir, timeoutMs: opts.compileTimeoutMs ?? 25000 });
      } else {
        comp = await runProcess(built.compile, { cwd: dir, timeoutMs: opts.compileTimeoutMs ?? 25000 });
      }
      compileMs = Date.now() - t0;
      if (comp.code !== 0) {
        return {
          stdout: "",
          stderr: comp.stderr.slice(0, 4000),
          compileMs,
          runMs: 0,
          timedOut: comp.timedOut,
          compileFailed: true,
          compileError: comp.stderr.slice(0, 4000),
        };
      }
    }

    // Build the run invocation for this environment.
    //  - unix:       bash -c wrapper with ulimits (historical behavior).
    //  - win-native: direct spawn; python aliases; `./main` → absolute main.exe.
    //  - wsl:        a script file executed by bash inside the distro.
    let runCmd: string[] | null = null;
    if (execEnv === "unix") {
      runCmd = unixBashCommand(built.run, built.limits);
    } else if (execEnv === "win-native") {
      runCmd =
        built.run[0] === "python3"
          ? pythonArgv(built.run.slice(1))
          : localBinaryArgv(built.run, dir);
    }

    const t1 = Date.now();
    let run: ProcResult;
    if (isWsl) {
      const script = wslRunScript(built.run, built.limits, Math.ceil(opts.runTimeoutMs / 1000));
      fs.writeFileSync(path.join(dir, "_run.sh"), script);
      run = await runWsl("_run.sh", { cwd: dir, timeoutMs: opts.runTimeoutMs, stdin: built.stdin });
    } else {
      run = await runProcess(runCmd!, { cwd: dir, timeoutMs: opts.runTimeoutMs, stdin: built.stdin });
    }
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
