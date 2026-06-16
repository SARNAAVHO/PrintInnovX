import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { startAgent } from "../core/agent.js";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 650,
    height: 520,
    resizable: true,
    icon: path.join(__dirname, "../../assets/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      sandbox: false,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(
    path.join(__dirname, "../ui/index.html")
  );
}

/* ---------- IPC: save agent.json ---------- */
ipcMain.on("save-config", (_, config) => {
  const configPath = path.resolve("config/agent.json");
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(
    configPath,
    JSON.stringify(config, null, 2)
  );
});

/* ---------- IPC: start agent + stream logs ---------- */
ipcMain.on("start-agent", async () => {
  const originalLog = console.log;
  const originalError = console.error;

  function sendLog(type, args) {
    const msg = `[${type}] ${args.join(" ")}`;
    mainWindow.webContents.send("agent-log", msg);
  }

  console.log = (...args) => {
    sendLog("INFO", args);
    originalLog(...args);
  };

  console.error = (...args) => {
    sendLog("ERROR", args);
    originalError(...args);
  };

  console.log("🚀 Print Agent starting...");
  await startAgent();
});

app.whenReady().then(createWindow);
