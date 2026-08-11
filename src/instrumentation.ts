/**
 * Runs once when the Next.js server boots (dev and production), printing a
 * banner that tells the operator which judge languages are ready and whether
 * the Node version is supported. Pure diagnostics — never crashes the server.
 */
export async function register() {
  // Skip during `next build` — the banner is for server startup, not build logs.
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { checkJudgeRuntimes, RUNTIME_LABELS } = await import("./lib/judge/runtimes");
  const lines: string[] = [];

  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor < 24) {
    lines.push(
      `\u26a0\ufe0f  Node ${process.versions.node} detected — Algo Arena requires Node >= 24 (it uses the built-in node:sqlite module).`
    );
    lines.push("   Install Node 24+ and restart, or the server may crash when accounts features load.");
  }

  const found = checkJudgeRuntimes();
  const present = RUNTIME_LABELS.filter((r) => found[r.key]);
  const missing = RUNTIME_LABELS.filter((r) => !found[r.key]);

  if (missing.length === 0) {
    lines.push(
      `\u2713  Algo Arena judge: all ${present.length} languages ready (${present.map((r) => r.bin).join(", ")}).`
    );
  } else {
    lines.push("\u2699\ufe0f  Algo Arena judge status:");
    for (const r of RUNTIME_LABELS) {
      const p = found[r.key];
      lines.push(
        p
          ? `    \u2713  ${r.lang.padEnd(22)} ${r.bin} (${p})`
          : `    \u2717  ${r.lang.padEnd(22)} ${r.bin} not found${r.note ? ` — ${r.note}` : ""}`
      );
    }
    lines.push(
      `    ${present.length}/${RUNTIME_LABELS.length} languages ready. Install the missing runtimes, ` +
        "or use Docker which ships them all: `docker compose up -d --build`"
    );
  }

  console.warn(lines.join("\n"));
}
