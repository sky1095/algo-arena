#!/usr/bin/env node
/**
 * Launch & auto-start helpers for the installed Algo Arena PWA.
 *
 * A web app (even an installed PWA) can never start the server itself —
 * browsers forbid web pages from spawning local processes. This script makes
 * launching the PWA feel automatic in two ways:
 *
 *   node scripts/launch-pwa.mjs            start the production server if it
 *                                          isn't running, then open the app
 *   node scripts/launch-pwa.mjs autostart  register the server to start at
 *                                          login (launchd / systemd / Task
 *                                          Scheduler) — after that the PWA
 *                                          always just works
 *
 * Options:
 *   --port N     serve on port N (default 3000)
 *   --no-open    don't open the browser
 *   --dry-run    (autostart) print what would be created without writing
 *   --remove     (autostart) remove the previously registered login item
 *
 * Also available as `npm run launch` / `npm run launch:autostart`.
 */
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, openSync, rmSync, writeFileSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { judgeStatusLines } from "../src/lib/judge/runtimes.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MIN_NODE = 24;
const DEFAULT_PORT = 3000;
const APP_MARKER = /algo\s*-?\s*arena/i; // appears in the homepage HTML
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const LOG_DIR = path.join(os.homedir(), ".algo-arena");
const LOG_FILE = path.join(LOG_DIR, "server.log");
const NEXT_BIN = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");

const args = process.argv.slice(2);
const opts = {
  action: "start", // start | autostart
  port: DEFAULT_PORT,
  open: true,
  dryRun: false,
  remove: false,
};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "start" || a === "autostart") opts.action = a;
  else if (a === "--no-open") opts.open = false;
  else if (a === "--dry-run") opts.dryRun = true;
  else if (a === "--remove") opts.remove = true;
  else if (a === "--port") opts.port = Number(args[++i]);
  else if (/^--port=/.test(a)) opts.port = Number(a.slice(7));
  else if (a === "--help") {
    console.log(
      "Usage: node scripts/launch-pwa.mjs [start|autostart] [--port N] [--no-open] [--dry-run] [--remove]\n" +
        "  start      (default) start the server if it isn't running, then open the app\n" +
        "  autostart  register the server to start at login (launchd/systemd/Task Scheduler)\n" +
        "  --port N   serve on port N\n" +
        "  --no-open  don't open the browser\n" +
        "  --dry-run  with autostart: show what would be created without writing\n" +
        "  --remove   with autostart: remove the registered login item"
    );
    process.exit(0);
  } else {
    console.error(`Unknown option: ${a} (see --help)`);
    process.exit(1);
  }
}
if (!Number.isInteger(opts.port) || opts.port < 1 || opts.port > 65535) {
  console.error(`Invalid port: ${opts.port}`);
  process.exit(1);
}

const log = (...m) => console.log("[launch]", ...m);
const fail = (m) => {
  console.error(`[launch] ✗ ${m}`);
  process.exit(1);
};

/* ------------------------------------------------------------------ */
/* Requirements                                                        */
/* ------------------------------------------------------------------ */

const major = Number(process.versions.node.split(".")[0]);
if (major < MIN_NODE) {
  fail(
    `Algo Arena requires Node ${MIN_NODE}+ (it uses the built-in node:sqlite module); you have ${process.versions.node}.`
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers (mirror scripts/setup.mjs)                            */
/* ------------------------------------------------------------------ */

function run(cmd, cargs) {
  return new Promise((resolve, reject) => {
    log(`$ ${cmd} ${cargs.join(" ")}`);
    const child = spawn(cmd, cargs, {
      stdio: "inherit",
      shell: process.platform === "win32",
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
/* start: make sure the server is up, then open the app                */
/* ------------------------------------------------------------------ */

async function ensureReady(port) {
  if (await isOurApp(port)) return "already running";
  if (await portInUse(port)) fail(`port ${port} is in use by something that is not Algo Arena.`);

  const needsInstall = !existsSync(path.join(ROOT, "node_modules", ".package-lock.json"));
  if (needsInstall) {
    log("installing dependencies (first run)…");
    try {
      await run(npmCmd, ["install", "--no-audit", "--no-fund"]);
    } catch {
      fail("npm install failed.");
    }
  }
  if (!existsSync(path.join(ROOT, ".next"))) {
    log("no build found — building (this prerenders ~3,000 pages on first run)…");
    try {
      await run(npmCmd, ["run", "build"]);
    } catch {
      fail("build failed — see the errors above.");
    }
  }

  // Detached + new session (POSIX) so the server outlives this script; output
  // goes to ~/.algo-arena/server.log. It is deliberately NOT run through the
  // shell — absolute paths keep it working from launchd (minimal PATH).
  mkdirSync(LOG_DIR, { recursive: true });
  const logFd = openSync(LOG_FILE, "a");
  const child = spawn(
    process.execPath,
    [NEXT_BIN, "start", "-p", String(port)],
    { cwd: ROOT, detached: true, stdio: ["ignore", logFd, logFd] }
  );
  child.unref();

  log(`starting production server on port ${port} (logs: ${LOG_FILE})…`);
  if (!(await waitForApp(port, 60000))) {
    fail(`the server did not answer on port ${port} in time — check ${LOG_FILE}.`);
  }
  return `started (pid ${child.pid})`;
}

if (opts.action === "start") {
  log(`Algo Arena on ${process.platform}/${process.arch}, Node ${process.versions.node}`);
  for (const line of judgeStatusLines()) console.log(line);

  const url = `http://localhost:${opts.port}`;
  const status = await ensureReady(opts.port);
  log(`server ${status} — opening ${url}${opts.open ? "" : " (--no-open)"}`);
  if (opts.open) openBrowser(url);
  log(
    "Tip: install the app from the address-bar install icon; if the server is ever stopped,\n" +
      `     'npm run launch' brings it back up. Or run 'npm run launch:autostart' once so the\n` +
      "     server starts automatically at login and the PWA always just works."
  );
  process.exit(0);
}

/* ------------------------------------------------------------------ */
/* autostart: register (or remove) a per-user login item               */
/* ------------------------------------------------------------------ */

const q = (s) => `"${String(s).replace(/"/g, '""')}"`;

function launchdPlist() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.algoarena.server</string>
  <key>ProgramArguments</key>
  <array>
    <string>${process.execPath}</string>
    <string>${NEXT_BIN}</string>
    <string>start</string>
    <string>-p</string>
    <string>${opts.port}</string>
  </array>
  <key>WorkingDirectory</key>
  <string>${ROOT}</string>
  <key>RunAtLoad</key>
  <true/>
  <key>StandardOutPath</key>
  <string>${LOG_FILE}</string>
  <key>StandardErrorPath</key>
  <string>${LOG_FILE}</string>
</dict>
</plist>
`;
}

function systemdUnit() {
  return `[Unit]
Description=Algo Arena server (PWA backend)
After=network.target

[Service]
Type=simple
WorkingDirectory=${ROOT}
ExecStart=${process.execPath} ${NEXT_BIN} start -p ${opts.port}
Restart=on-failure

[Install]
WantedBy=default.target
`;
}

function windowsVbs() {
  // Runs the server in a hidden (window style 0) background cmd.
  const inner = `cmd /c ${q(process.execPath)} ${q(NEXT_BIN)} start -p ${opts.port}`;
  return `Set sh = CreateObject("WScript.Shell")\r\nsh.CurrentDirectory = ${q(ROOT)}\r\nsh.Run ${q(inner)}, 0, False\r\n`;
}

const platform = process.platform;
const targets = {
  darwin: {
    label: "macOS launchd LaunchAgent",
    file: path.join(os.homedir(), "Library", "LaunchAgents", "com.algoarena.server.plist"),
    content: () => launchdPlist(),
    enable: (file) =>
      `launchctl bootstrap gui/$(id -u) ${file}   # (or: launchctl load ${file})`,
    disable: (file) =>
      `launchctl bootout gui/$(id -u)/com.algoarena.server   # (or: launchctl unload ${file})`,
  },
  linux: {
    label: "systemd user service",
    file: path.join(os.homedir(), ".config", "systemd", "user", "algo-arena.service"),
    content: () => systemdUnit(),
    enable: () => "systemctl --user daemon-reload && systemctl --user enable --now algo-arena.service",
    disable: () => "systemctl --user disable --now algo-arena.service",
  },
  win32: {
    label: "Windows Task Scheduler (hidden VBS wrapper)",
    file: path.join(os.homedir(), ".algo-arena", "start-server.vbs"),
    content: () => windowsVbs(),
    enable: (file) =>
      `schtasks /Create /TN "AlgoArena" /TR "wscript.exe ${q(file)}" /SC ONLOGON /RL LIMITED /F`,
    disable: () => `schtasks /Delete /TN "AlgoArena" /F`,
  },
};

const target = targets[platform];
if (!target) fail(`autostart isn't implemented for ${platform} yet.`);

if (opts.remove) {
  if (opts.dryRun) {
    console.log(`[launch] would remove: ${target.file}`);
    console.log(`  ${target.disable(target.file)}`);
    process.exit(0);
  }
  if (existsSync(target.file)) {
    rmSync(target.file);
    log(`removed ${target.file}`);
  } else {
    log(`nothing to remove — ${target.file} does not exist`);
  }
  console.log(`  To unregister the login item: ${target.disable(target.file)}`);
  process.exit(0);
}

if (opts.dryRun) {
  console.log(`[launch] ${target.label} — would write:\n`);
  console.log(`  ${target.file}\n`);
  console.log(target.content().split("\n").map((l) => `    ${l}`).join("\n"));
  console.log(`\n  Then register it with:\n    ${target.enable(target.file)}`);
  process.exit(0);
}

mkdirSync(path.dirname(target.file), { recursive: true });
writeFileSync(target.file, target.content());
log(`wrote ${target.label} → ${target.file}`);
console.log(`  Register it now with:\n    ${target.enable(target.file)}`);
console.log(`  Uninstall later with:\n    ${target.disable(target.file)}`);
console.log(
  "  After registration, the server starts at login in the background — the\n" +
    "  installed PWA will simply connect to it."
);
