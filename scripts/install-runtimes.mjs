#!/usr/bin/env node
/**
 * Auto-installer script for Algo Arena judge runtimes (Python, Deno, Java, C++).
 *
 * Usage:
 *   node scripts/install-runtimes.mjs
 *   npm run setup:runtimes
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkJudgeRuntimes, RUNTIME_LABELS } from "../src/lib/judge/runtimes.ts";
import { findOnPath } from "../src/lib/judge/platform.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const log = (...m) => console.log("[install-runtimes]", ...m);
const fail = (m) => {
  console.error(`[install-runtimes] ✗ ${m}`);
  process.exit(1);
};

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    log(`$ ${cmd} ${args.join(" ")}`);
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      cwd: ROOT,
      ...opts,
    });
    child.on("error", reject);
    child.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`"${cmd}" exited with code ${code}`))
    );
  });
}

async function main() {
  log(`Scanning system runtimes on ${process.platform} (${process.arch})…`);
  const found = checkJudgeRuntimes();
  const missing = RUNTIME_LABELS.filter((r) => !found[r.key]);

  if (missing.length === 0) {
    log("✓ All judge runtimes (Python, Deno, Java, C++) are already installed!");
    process.exit(0);
  }

  log(`Found ${missing.length} missing runtime(s): ${missing.map((r) => r.lang).join(", ")}`);

  const platform = process.platform;

  if (platform === "win32") {
    await installWindows(missing);
  } else if (platform === "darwin") {
    await installMac(missing);
  } else if (platform === "linux") {
    await installLinux(missing);
  } else {
    fail(`Unsupported platform: ${platform}`);
  }

  log("--------------------------------------------------");
  log("✓ Runtime installation steps finished.");
  if (platform === "win32") {
    log("⚠️  IMPORTANT FOR WINDOWS USERS:");
    log("    Please RESTART your terminal/Command Prompt/VS Code so the new PATH environment variables take effect.");
  }
}

async function installWindows(missing) {
  const hasWinget = findOnPath("winget") !== undefined;

  if (hasWinget) {
    log("Updating winget package sources…");
    try {
      await run("winget", ["source", "update"]);
    } catch {
      // ignore if winget source update fails, try installing anyway
    }
  }

  for (const item of missing) {
    log(`\n--> Installing ${item.lang} (${item.bin})…`);
    let installed = false;

    if (item.key === "deno") {
      if (hasWinget) {
        try {
          await run("winget", [
            "install",
            "--id",
            "DenoLand.Deno",
            "--accept-source-agreements",
            "--accept-package-agreements",
          ]);
          installed = true;
        } catch (err) {
          log(`winget failed for Deno (${err.message}). Trying PowerShell fallback…`);
        }
      }
      if (!installed) {
        try {
          await run("powershell", ["-Command", "irm https://deno.land/install.ps1 | iex"]);
          installed = true;
        } catch (err) {
          console.error("[install-runtimes] PowerShell Deno install failed:", err.message);
        }
      }
    } else if (item.key === "gpp") {
      if (hasWinget) {
        try {
          await run("winget", [
            "install",
            "--id",
            "w64devkit",
            "--accept-source-agreements",
            "--accept-package-agreements",
          ]);
          installed = true;
        } catch (err) {
          log(`winget w64devkit failed (${err.message}). Trying GNU.GCC fallback…`);
          try {
            await run("winget", [
              "install",
              "--id",
              "GNU.GCC",
              "--accept-source-agreements",
              "--accept-package-agreements",
            ]);
            installed = true;
          } catch {
            // fallback below
          }
        }
      }
      if (!installed) {
        log("Please install MinGW / g++ manually (e.g. via MSYS2 https://www.msys2.org/ or w64devkit https://github.com/skeeto/w64devkit/releases).");
      }
    } else if (item.key === "python") {
      if (hasWinget) {
        try {
          await run("winget", [
            "install",
            "--id",
            "Python.Python.3.12",
            "--accept-source-agreements",
            "--accept-package-agreements",
          ]);
          installed = true;
        } catch (err) {
          console.error("[install-runtimes] winget Python install failed:", err.message);
        }
      }
      if (!installed) {
        log("Please install Python 3 manually from https://www.python.org/downloads/ (check 'Add python.exe to PATH').");
      }
    } else if (item.key === "javac") {
      if (hasWinget) {
        try {
          await run("winget", [
            "install",
            "--id",
            "Microsoft.OpenJDK.21",
            "--accept-source-agreements",
            "--accept-package-agreements",
          ]);
          installed = true;
        } catch (err) {
          console.error("[install-runtimes] winget JDK install failed:", err.message);
        }
      }
      if (!installed) {
        log("Please install JDK 21+ manually from https://learn.microsoft.com/en-us/java/openjdk/download.");
      }
    }
  }
}

async function installMac(missing) {
  const hasBrew = findOnPath("brew") !== undefined;
  if (!hasBrew) {
    fail("Homebrew ('brew') is not installed. Please install Homebrew first (https://brew.sh) or install runtimes manually.");
  }

  const brewPackages = [];
  for (const item of missing) {
    if (item.key === "python") brewPackages.push("python3");
    if (item.key === "deno") brewPackages.push("deno");
    if (item.key === "gpp") brewPackages.push("gcc");
    if (item.key === "javac") brewPackages.push("openjdk");
  }

  if (brewPackages.length > 0) {
    log(`Installing packages via Homebrew: ${brewPackages.join(", ")}…`);
    await run("brew", ["install", ...brewPackages]);
  }
}

async function installLinux(missing) {
  const aptPackages = [];
  let needDeno = false;

  for (const item of missing) {
    if (item.key === "python") aptPackages.push("python3");
    if (item.key === "deno") needDeno = true;
    if (item.key === "gpp") aptPackages.push("g++");
    if (item.key === "javac") aptPackages.push("default-jdk");
  }

  if (aptPackages.length > 0) {
    log(`Installing packages via apt: ${aptPackages.join(", ")}…`);
    await run("sudo", ["apt-get", "update"]);
    await run("sudo", ["apt-get", "install", "-y", ...aptPackages]);
  }

  if (needDeno) {
    log("Installing Deno via official installer script…");
    await run("sh", ["-c", "curl -fsSL https://deno.land/install.sh | sh"]);
  }
}

main().catch((err) => {
  console.error("[install-runtimes] ✗ Error:", err);
  process.exit(1);
});
