const { app, BrowserWindow, shell, ipcMain } = require("electron");
const { spawn } = require("child_process");
const net = require("net");
const path = require("path");
const isDev = !app.isPackaged;

const PORT = isDev ? 3000 : 3000;
const URL = `http://localhost:${PORT}`;

let mainWindow = null;
let serverProcess = null;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function findNextBin() {
  if (isDev) {
    return path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
  }
  return path.join(process.resourcesPath, "node_modules", "next", "dist", "bin", "next");
}

function portInUse(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host: "127.0.0.1" });
    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

function waitForServer(port, timeoutMs = 60_000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tryConnect = () => {
      const socket = net.createConnection({ port, host: "127.0.0.1" });
      socket.on("connect", () => {
        socket.destroy();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Server did not start within ${timeoutMs}ms`));
        } else {
          setTimeout(tryConnect, 500);
        }
      });
    };
    tryConnect();
  });
}

async function startNextServer() {
  if (await portInUse(PORT)) {
    console.log(`[electron] Port ${PORT} already in use — connecting to existing server`);
    return;
  }

  return new Promise((resolve, reject) => {
    const nextBin = findNextBin();
    const args = [nextBin];

    if (isDev) {
      args.push("dev");
    } else {
      args.push("start");
    }
    args.push("-p", String(PORT));

    const nodeBin = isDev ? "node" : process.execPath;

    console.log(`[electron] Starting Next.js: ${nodeBin} ${args.join(" ")}`);

    serverProcess = spawn(nodeBin, args, {
      cwd: path.join(__dirname, ".."),
      stdio: "pipe",
      env: { ...process.env, PORT: String(PORT) },
    });

    serverProcess.stdout?.on("data", (data) => {
      process.stdout.write(`[next] ${data}`);
    });

    serverProcess.stderr?.on("data", (data) => {
      process.stderr.write(`[next] ${data}`);
    });

    serverProcess.on("error", (err) => {
      console.error("[electron] Failed to spawn Next.js server:", err);
      reject(err);
    });

    serverProcess.on("exit", (code, signal) => {
      if (code !== null && code !== 0) {
        console.error(`[electron] Next.js server exited with code ${code} (signal: ${signal})`);
      }
    });

    waitForServer(PORT)
      .then(() => resolve())
      .catch(reject);
  });
}

/* ------------------------------------------------------------------ */
/* IPC — window controls                                               */
/* ------------------------------------------------------------------ */

function registerWindowIPC() {
  ipcMain.on("window-minimize", () => {
    mainWindow?.minimize();
  });

  ipcMain.on("window-maximize", () => {
    if (mainWindow?.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow?.maximize();
    }
  });

  ipcMain.on("window-close", () => {
    mainWindow?.close();
  });

  ipcMain.handle("window-is-maximized", () => {
    return mainWindow?.isMaximized() ?? false;
  });
}

/* ------------------------------------------------------------------ */
/* Window                                                              */
/* ------------------------------------------------------------------ */

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "Algo Arena",
    frame: false,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 12, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      webSecurity: false,
    },
    show: false,
    backgroundColor: "#09090b",
  });

  mainWindow.loadURL(URL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Notify renderer of maximize/unmaximize changes
  mainWindow.on("maximize", () => {
    mainWindow?.webContents.send("window-maximize-change", true);
  });
  mainWindow.on("unmaximize", () => {
    mainWindow?.webContents.send("window-maximize-change", false);
  });

  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription, validatedURL) => {
    console.error(`[electron] Failed to load ${validatedURL}: ${errorDescription} (${errorCode})`);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

/* ------------------------------------------------------------------ */
/* App lifecycle                                                       */
/* ------------------------------------------------------------------ */

app.whenReady().then(async () => {
  registerWindowIPC();

  try {
    await startNextServer();
  } catch (err) {
    console.error("[electron] Failed to start Next.js server:", err);
    app.quit();
    return;
  }

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
  app.quit();
});

app.on("before-quit", () => {
  if (serverProcess) {
    serverProcess.kill();
    serverProcess = null;
  }
});
