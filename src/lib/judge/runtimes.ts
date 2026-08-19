import { findOnPath, findPythonBin, isWin32 } from "./platform.ts";

/**
 * Detects which judge toolchains are available, so a startup banner can tell
 * the operator at a glance which submission languages will work. Server-side
 * only (uses `node:fs` via the platform module).
 *
 * PATH resolution (including the standard Unix fallback locations for
 * servers started from IDEs/launchd/systemd/cron) lives in `./platform.ts`,
 * which the runner also uses — so this report matches what the judge sees.
 */
export interface JudgeRuntimes {
  /** python3 (or py/python on Windows). */
  python?: string;
  /** deno — JavaScript/TypeScript submissions (Node is NOT used). */
  deno?: string;
  /** javac — Java submissions (also needs `java` at runtime). */
  javac?: string;
  /** g++ — C++ submissions. */
  gpp?: string;
  /** dart — Dart submissions. */
  dart?: string;
  /** True on Windows when the WSL2 launcher exists: a fallback toolchain for
   *  runtimes missing natively. */
  wsl?: boolean;
}

export function checkJudgeRuntimes(): JudgeRuntimes {
  const python = findPythonBin();
  return {
    python: python ? findOnPath(python) : undefined,
    deno: findOnPath("deno"),
    javac: findOnPath("javac"),
    gpp: findOnPath("g++"),
    dart: findOnPath("dart"),
    wsl: isWin32() ? findOnPath("wsl") !== undefined : undefined,
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
  { lang: "Dart", key: "dart", bin: "dart" },
];

/** Human-readable judge status for the startup banner and the setup script. */
export function judgeStatusLines(): string[] {
  const found = checkJudgeRuntimes();
  const lines: string[] = [];
  const present = RUNTIME_LABELS.filter((r) => found[r.key]);
  const missing = RUNTIME_LABELS.filter((r) => !found[r.key]);

  if (missing.length === 0) {
    lines.push(
      `✓  Algo Arena judge: all ${present.length} languages ready (${present.map((r) => r.bin).join(", ")}).`
    );
  } else {
    lines.push("⚙️  Algo Arena judge status:");
    for (const r of RUNTIME_LABELS) {
      const p = found[r.key];
      lines.push(
        p
          ? `    ✓  ${r.lang.padEnd(22)} ${r.bin} (${p})`
          : `    ✗  ${r.lang.padEnd(22)} ${r.bin} not found${r.note ? ` — ${r.note}` : ""}`
      );
    }
    lines.push(
      `    ${present.length}/${RUNTIME_LABELS.length} languages ready. ` +
        "Auto-install missing runtimes with `npm run setup:runtimes`, or use Docker: `npm run setup:docker`"
    );
  }
  if (found.wsl) {
    lines.push("    ℹ️  WSL2 detected — missing native runtimes will be tried inside your Linux distro.");
  }
  return lines;
}
