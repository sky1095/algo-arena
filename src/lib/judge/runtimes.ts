import { accessSync, constants } from "node:fs";
import path from "node:path";

/**
 * Detects which judge runtimes are available to the server process, so a
 * startup banner can tell the operator at a glance which submission languages
 * will work. Server-side only (uses `node:fs`).
 *
 * Mirrors the PATH logic in `./runner.ts`: a server started from an IDE,
 * launchd, systemd or cron can have a PATH that omits the judge runtimes, so
 * standard locations are appended as a fallback. The server's own PATH entries
 * always win (they come first).
 *
 * The fallbacks are Unix-only by design: the judge itself shells out through
 * `bash -c` with ulimits (see `./harness.ts`), so submissions are already
 * Unix-only. On Windows, runtime installers (Python, Deno, JDK, MinGW) add
 * themselves to PATH and there is no stable fallback directory to append, so
 * we scan the inherited PATH only.
 */
const EXTRA_PATH_ENTRIES =
  process.platform === "win32"
    ? []
    : [
        "/usr/local/bin",
        "/opt/homebrew/bin",
        "/opt/homebrew/sbin",
        "/usr/bin",
        "/bin",
        "/usr/sbin",
        "/sbin",
      ];

/** PATH entries the judge would actually use, in priority order. */
function judgePathEntries(): string[] {
  const env = (process.env.PATH ?? "").split(path.delimiter).filter(Boolean);
  for (const entry of EXTRA_PATH_ENTRIES) {
    if (!env.includes(entry)) env.push(entry);
  }
  return env;
}

/** First executable match for `bin` on the judge PATH, or undefined. */
export function findOnPath(bin: string): string | undefined {
  const exts = process.platform === "win32" ? ["", ".exe", ".cmd", ".bat"] : [""];
  for (const dir of judgePathEntries()) {
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

export interface JudgeRuntimes {
  /** python3 — Python submissions. */
  python?: string;
  /** deno — JavaScript/TypeScript submissions (Node is NOT used). */
  deno?: string;
  /** javac — Java submissions (also needs `java` at runtime). */
  javac?: string;
  /** g++ — C++ submissions. */
  gpp?: string;
}

export function checkJudgeRuntimes(): JudgeRuntimes {
  return {
    python: findOnPath("python3"),
    deno: findOnPath("deno"),
    javac: findOnPath("javac"),
    gpp: findOnPath("g++"),
  };
}

/** Language → runtime(s) needed, for human-readable reporting. `key` indexes
 *  `JudgeRuntimes`; `bin` is the executable name shown to the user. */
export const RUNTIME_LABELS: {
  lang: string;
  key: keyof JudgeRuntimes;
  bin: string;
  note?: string;
}[] = [
  { lang: "Python", key: "python", bin: "python3" },
  { lang: "JavaScript/TypeScript", key: "deno", bin: "deno", note: "Node alone is not enough" },
  { lang: "Java", key: "javac", bin: "javac", note: "also needs `java`" },
  { lang: "C++", key: "gpp", bin: "g++" },
];
