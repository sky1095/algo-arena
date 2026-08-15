#!/usr/bin/env node
/**
 * One-command bootstrap: check requirements, install dependencies, and bring
 * up a running Algo Arena instance, then open the browser.
 *
 *   node scripts/setup.mjs                 dev server  (http://localhost:3000)
 *   node scripts/setup.mjs --prod          build + production server
 *   node scripts/setup.mjs --docker        build & run the Docker image (every
 *                                          judge runtime baked in; no local
 *                                          toolchain needed)
 *   node scripts/setup.mjs --port 4000     use a different port (dev/prod only)
 *   node scripts/setup.mjs --no-open       don't open the browser
 *   node scripts/setup.mjs --help
 *
 * Also available as `npm run setup` / `npm run setup:prod` / `npm run setup:docker`.
 */
import { spawn } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { judgeStatusLines } from "../src/lib/judge/runtimes.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_NODE = 24;
const DEFAULT_PORT = 3000;
const APP_MARKER = /algo\s*-?\s*arena/i; // appears in the homepage HTML
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const args = process.argv.slice(2);
const opts = {
  mode: "dev", // dev | prod | docker
  port: DEFAULT_PORT,
  open: true,
};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--prod") opts.mode = "prod";
  else if (a === "--docker") opts.mode = "docker";
  else if (a === "--no-open") opts.open = false;
  else if (a === "--help") {
    console.log(
      "Usage: node scripts/setup.mjs [--prod|--docker] [--port N] [--no-open]\n" +
        "  (default)  install deps + start the dev server\n" +
        "  --prod     build once, then serve with the production server\n" +
        "            (the build is an installable PWA — address-bar install icon)\n" +
        "  --docker   docker compose up -d --build (all judge runtimes included)\n" +
        "  --port N   serve on port N (dev/prod only)\n" +
        "  --no-open  don't open the browser"
    );
    process.exit(0);
  } else if (a === "--port") opts.port = Number(args[++i]);
  else if (/^--port=/.test(a)) opts.port = Number(a.slice(7));
  else {
    console.error(`Unknown option: ${a} (see --help)`);
    process.exit(1);
  }
}
if (!Number.isInteger(opts.port) || opts.port < 1 || opts.port > 65535) {
  console.error(`Invalid port: ${opts.port}`);
  process.exit(1);
}

const log = (...m) => console.log("[setup]", ...m);
const fail = (m) => {
  console.error(`[setup] ✗ ${m}`);
  process.exit(1);
};

/* ------------------------------------------------------------------ */
/* Requirements                                                        */
/* ------------------------------------------------------------------ */

if (opts.mode !== "docker") {
  const major = Number(process.versions.node.split(".")[0]);
  if (major < MIN_NODE) {
    fail(
      `Algo Arena requires Node ${MIN_NODE}+ (it uses the built-in node:sqlite module); ` +
        `you have ${process.versions.node}. Install Node ${MIN_NODE}+ (nvm/fnm/volta) ` +
        `or run with --docker, which handles everything.`
    );
  }
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function run(cmd, cargs) {
  return new Promise((resolve, reject) => {
    log(`$ ${cmd} ${cargs.join(" ")}`);
    const child = spawn(cmd, cargs, {
      stdio: "inherit",
      shell: process.platform === "win32", // resolve npm.cmd etc. on Windows
      cwd: ROOT,
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`"${cmd}" exited with code ${code}`))
    );
  });
}

function portInUse(port) {
  return new Promise((resolve) => {
    const s = net.createConnection({ port, host: "127.0.0.1" });
    s.on("connect", () => {
      s.destroy();
      resolve(true);
    });
    s.on("error", () => resolve(false));
  });
}

/** True when the app (not some random service) responds on `port`. */
async function isOurApp(port) {
  try {
    const res = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return false;
    const text = await res.text();
    return APP_MARKER.test(text.slice(0, 20000));
  } catch {
    return false;
  }
}

async function waitForApp(port, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await isOurApp(port)) return true;
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
}

function openBrowser(url) {
  let cmd;
  let cargs;
  if (process.platform === "darwin") {
    cmd = "open";
    cargs = [url];
  } else if (process.platform === "win32") {
    cmd = "cmd";
    cargs = ["/c", "start", "", url];
  } else {
    cmd = "xdg-open";
    cargs = [url];
  }
  const child = spawn(cmd, cargs, { stdio: "ignore", detached: true });
  child.unref();
}

/* ------------------------------------------------------------------ */
/* Judge status                                                        */
/* ------------------------------------------------------------------ */

log(`Algo Arena on ${process.platform}/${process.arch}, Node ${process.versions.node}`);
for (const line of judgeStatusLines()) console.log(line);

/* ------------------------------------------------------------------ */
/* Already running?                                                    */
/* ------------------------------------------------------------------ */

const url = `http://localhost:${opts.port}`;
if (await isOurApp(opts.port)) {
  log(`${url} is already serving Algo Arena.`);
  if (opts.open) openBrowser(url);
  process.exit(0);
}
if (await portInUse(opts.port)) {
  fail(
    `port ${opts.port} is in use by something that is not Algo Arena. ` +
      `Pick another port with --port N.`
  );
}

/* ------------------------------------------------------------------ */
/* Docker mode                                                         */
/* ------------------------------------------------------------------ */

if (opts.mode === "docker") {
  if (opts.port !== DEFAULT_PORT) {
    log(`note: --port is ignored in --docker mode (compose maps 3000).`);
  }
  try {
    await run("docker", ["compose", "up", "-d", "--build"]);
  } catch {
    fail("Docker build/start failed — is Docker installed and running?");
  }
  if (!(await waitForApp(DEFAULT_PORT, 240000))) {
    fail(`the container did not answer on port ${DEFAULT_PORT} — check 'docker compose logs'.`);
  }
  if (opts.open) openBrowser(url);
  log(`Algo Arena is up at ${url} (Docker). Ctrl+C to stop is not needed — 'docker compose stop' stops it.`);
  process.exit(0);
}

/* ------------------------------------------------------------------ */
/* Install dependencies                                                */
/* ------------------------------------------------------------------ */

const lock = path.join(ROOT, "package-lock.json");
const installed = path.join(ROOT, "node_modules", ".package-lock.json");
const needsInstall =
  !existsSync(installed) ||
  (existsSync(lock) && statSync(lock).mtimeMs > statSync(installed).mtimeMs);
if (needsInstall) {
  log("installing dependencies (first run is the heavy one)…");
  try {
    await run(npmCmd, ["install", "--no-audit", "--no-fund"]);
  } catch {
    fail("npm install failed.");
  }
} else {
  log("dependencies up to date — skipping npm install.");
}

/* ------------------------------------------------------------------ */
/* Start the server                                                    */
/* ------------------------------------------------------------------ */

if (opts.mode === "prod") {
  // PWA icons are generated (the repo ships no image assets), so make sure
  // they exist before the build — otherwise the manifest would 404 them.
  const iconNames = ["icon-180.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];
  const iconsDir = path.join(ROOT, "public", "icons");
  if (iconNames.some((f) => !existsSync(path.join(iconsDir, f)))) {
    log("generating PWA icons…");
    // Quote on Windows: run() uses `shell: true` there and node.exe lives in
    // "C:\Program Files\..." (spaces break an unquoted path).
    const nodeCmd =
      process.platform === "win32" ? `"${process.execPath}"` : process.execPath;
    try {
      await run(nodeCmd, ["scripts/generate-icons.mjs"]);
    } catch {
      fail("PWA icon generation failed.");
    }
  }
}

let serverCmd;
let serverArgs;
if (opts.mode === "prod") {
  log("building (this prerenders ~3,000 pages on first run)…");
  try {
    await run(npmCmd, ["run", "build"]);
  } catch {
    fail("build failed — see the errors above.");
  }
  serverCmd = npmCmd;
  serverArgs = ["start", "--", "--port", String(opts.port)];
} else {
  serverCmd = npmCmd;
  serverArgs = ["run", "dev", "--", "--port", String(opts.port)];
}

log(`starting ${opts.mode === "prod" ? "production" : "dev"} server on port ${opts.port}…`);
let serverReady = false;
const server = spawn(serverCmd, serverArgs, {
  stdio: "inherit",
  shell: process.platform === "win32",
  cwd: ROOT,
});
server.on("exit", (code) => {
  if (!serverReady) {
    console.error(
      `[setup] ✗ the server exited before becoming ready (code ${code ?? "?"}). See the output above.`
    );
  }
  process.exit(code ?? 0);
});
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));

const ready = await waitForApp(opts.port, opts.mode === "prod" ? 30000 : 120000);
if (!ready) {
  fail(`the server did not answer on port ${opts.port} in time.`);
}
serverReady = true;
log(`Algo Arena is up at ${url}${opts.open ? " — opening your browser" : ""}.`);
if (opts.open) openBrowser(url);
if (opts.mode === "prod") {
  log("This build is a PWA: install it from the address-bar install icon (or browser menu → Install Algo Arena).");
}
log(`Stop it with Ctrl+C. Runtimes missing above? Install them or use 'npm run setup:docker'.`);
