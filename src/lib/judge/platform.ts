import { accessSync, constants } from "node:fs";
import path from "node:path";

/**
 * Platform-aware command building and PATH handling for the judge.
 *
 * The judge must run on three execution environments:
 *  - **unix**       — native macOS/Linux, or the whole app running inside WSL2
 *                     (process.platform is "linux" there, so no special casing).
 *  - **win-native** — Node on Windows with the runtimes installed natively
 *                     (python3/py/python, deno, javac/java, g++/MinGW).
 *  - **wsl**        — Node on Windows, missing a native runtime: fall back to
 *                     the default WSL2 distro, which shares the Windows temp
 *                     dir over /mnt/<drive>.
 *
 * This module has no project imports so it can be exercised standalone.
 */

export const isWin32 = (platform: NodeJS.Platform = process.platform): boolean =>
  platform === "win32";

/**
 * Standard fallback locations for judge runtimes when the server's PATH is
 * minimal (IDE, launchd, systemd, cron). Unix-only by design: on Windows,
 * runtime installers (Python, Deno, JDK, MinGW) register themselves on PATH
 * and there is no stable fallback directory, so we scan the inherited PATH
 * only.
 */
const UNIX_EXTRA_PATH_ENTRIES = [
  "/usr/local/bin",
  "/opt/homebrew/bin",
  "/opt/homebrew/sbin",
  "/usr/bin",
  "/bin",
  "/usr/sbin",
  "/sbin",
];

/** PATH entries a judge subprocess would actually see, in priority order. */
export function judgePathEntries(
  env: NodeJS.ProcessEnv = process.env,
  platform: NodeJS.Platform = process.platform
): string[] {
  const sep = isWin32(platform) ? ";" : ":";
  const entries = (env.PATH ?? "").split(sep).filter(Boolean);
  if (!isWin32(platform)) {
    for (const entry of UNIX_EXTRA_PATH_ENTRIES) {
      if (!entries.includes(entry)) entries.push(entry);
    }
  }
  return entries;
}

/** Environment for judge subprocesses: inherited env plus a PATH that includes
 *  the standard fallback locations (Unix only). */
export function judgeEnv(
  env: NodeJS.ProcessEnv = process.env,
  platform: NodeJS.Platform = process.platform
): NodeJS.ProcessEnv {
  const sep = isWin32(platform) ? ";" : ":";
  return { ...env, PATH: judgePathEntries(env, platform).join(sep) };
}

/** First executable match for `bin` on the judge PATH, or undefined. */
export function findOnPath(
  bin: string,
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env
): string | undefined {
  const exts = isWin32(platform) ? ["", ".exe", ".cmd", ".bat"] : [""];
  for (const dir of judgePathEntries(env, platform)) {
    for (const ext of exts) {
      const p = path.join(dir, bin + ext);
      try {
        accessSync(p, constants.X_OK);
        return p;
      } catch {
        // keep looking
      }
    }
  }
  return undefined;
}

/* ------------------------------------------------------------------ */
/* Python interpreter selection                                        */
/* ------------------------------------------------------------------ */

/** Windows python executables, in preference order. `py` is the Windows
 *  launcher; `python` is the plain interpreter. */
const PYTHON_ALIASES = ["python3", "py", "python"];

/** Resolve a working python interpreter on this platform, or undefined.
 *  On Unix this is `python3`; on Windows accept python3 / py / python. */
export function findPythonBin(
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env
): string | undefined {
  // Unix always uses the canonical `python3`; only Windows needs alias probing.
  if (!isWin32(platform)) return "python3";
  for (const alias of PYTHON_ALIASES) {
    if (findOnPath(alias, platform, env)) return alias;
  }
  return undefined;
}

/** argv that runs a python script, e.g. ["-I", "-B", "main.py"], using the
 *  best interpreter available. Falls back to `python3` so failures report the
 *  canonical name. */
export function pythonArgv(
  rest: string[],
  platform: NodeJS.Platform = process.platform,
  env: NodeJS.ProcessEnv = process.env
): string[] {
  const bin = findPythonBin(platform, env);
  if (bin === "py") return ["py", "-3", ...rest];
  return [bin ?? "python3", ...rest];
}

/* ------------------------------------------------------------------ */
/* Windows ↔ WSL                                                      */
/* ------------------------------------------------------------------ */

/** Convert a Windows path (`C:\Users\...\Temp\x`) to the WSL
 *  `/mnt/<drive>/...` form. Non-drive paths pass through unchanged. */
export function wslPath(p: string): string {
  const norm = p.replace(/\\/g, "/");
  const m = /^([A-Za-z]):\//.exec(norm);
  if (m) return "/mnt/" + m[1]!.toLowerCase() + "/" + norm.slice(m[0].length);
  return norm;
}

/** Resolve `./main`-style argv on native Windows, where MinGW's g++ emits
 *  `main.exe`. Returns an absolute path so spawn can find it (it is not on
 *  PATH). Falls back to the original argv so spawn reports a clear error. */
export function localBinaryArgv(argv: string[], cwd: string): string[] {
  const head = argv[0];
  if (!head || !head.startsWith("./")) return argv;
  const base = head.slice(2);
  for (const name of [base + ".exe", base + ".cmd", base + ".bat", base]) {
    try {
      accessSync(path.join(cwd, name));
      return [path.join(cwd, name), ...argv.slice(1)];
    } catch {
      // try next
    }
  }
  return argv;
}

/* ------------------------------------------------------------------ */
/* Command building                                                    */
/* ------------------------------------------------------------------ */

export interface RunLimits {
  /** Virtual memory cap in KB (`ulimit -v`). Unix only. */
  memoryKb?: number;
  /** CPU time cap in seconds (`ulimit -t`). Unix only. */
  cpuSec?: number;
}

function shellQuote(arg: string): string {
  return /[\s'"]/.test(arg) ? `'${arg.replace(/'/g, `'\\''`)}'` : arg;
}

/** The historical bash -c wrapper: apply ulimits, then exec the command.
 *  Used on Unix (native macOS/Linux, or the app running inside WSL2). */
export function unixBashCommand(argv: string[], limits?: RunLimits): string[] {
  const parts: string[] = [];
  if (limits?.memoryKb) parts.push(`ulimit -v ${limits.memoryKb} 2>/dev/null`);
  if (limits?.cpuSec) parts.push(`ulimit -t ${limits.cpuSec}`);
  parts.push(`exec ${argv.map(shellQuote).join(" ")}`);
  return ["bash", "-c", parts.join("; ")];
}

/** Script run by bash *inside WSL2* for a run phase. Applies ulimits and a
 *  `timeout` guard so the Linux-side process dies on its own even if wsl.exe
 *  is killed from the Windows side. */
export function wslRunScript(argv: string[], limits: RunLimits | undefined, timeoutSec: number): string {
  const lines: string[] = ['#!/usr/bin/env bash', 'cd "$(dirname "$0")" || exit 1'];
  if (limits?.memoryKb) lines.push(`ulimit -v ${limits.memoryKb} 2>/dev/null`);
  if (limits?.cpuSec) lines.push(`ulimit -t ${limits.cpuSec}`);
  lines.push(`exec timeout ${timeoutSec}s ${argv.map(shellQuote).join(" ")}`);
  return lines.join("\n") + "\n";
}

/** Script run by bash *inside WSL2* for a compile phase. */
export function wslCompileScript(argv: string[], timeoutSec: number): string {
  return (
    '#!/usr/bin/env bash\n' +
    'cd "$(dirname "$0")" || exit 1\n' +
    `timeout ${timeoutSec}s ${argv.map(shellQuote).join(" ")}\n`
  );
}
