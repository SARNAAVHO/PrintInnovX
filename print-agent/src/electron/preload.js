import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

const CONFIG_PATH = path.resolve("config/agent.json");

contextBridge.exposeInMainWorld("config", {
  API_BASE_URL: process.env.API_BASE_URL
});

contextBridge.exposeInMainWorld("agentAPI", {
  saveConfig(config) {
    fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  },
  
  startAgent() {
    ipcRenderer.send("start-agent");
  },

  onLog(callback) {
    ipcRenderer.on("agent-log", (_, message) => {
      callback(message);
    });
  }
});
