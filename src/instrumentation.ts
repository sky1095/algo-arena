/**
 * Runs once when the Next.js server boots (dev and production), printing a
 * banner that tells the operator which judge languages are ready and whether
 * the Node version is supported. Pure diagnostics — never crashes the server.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  // Skip during `next build` — the banner is for server startup, not build logs.
  if (process.env.NEXT_PHASE === "phase-production-build") return;

  const { judgeStatusLines } = await import("./lib/judge/runtimes");
  const lines: string[] = [];

  const nodeMajor = Number(process.versions.node.split(".")[0]);
  if (nodeMajor < 24) {
    lines.push(
      `\u26a0\ufe0f  Node ${process.versions.node} detected — Algo Arena requires Node >= 24 (it uses the built-in node:sqlite module).`
    );
    lines.push("   Install Node 24+ and restart, or the server may crash when accounts features load.");
  }

  lines.push(...judgeStatusLines());
  console.warn(lines.join("\n"));
}
