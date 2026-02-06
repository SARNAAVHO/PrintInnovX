import { contextBridge, ipcRenderer } from "electron";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.resolve("config/agent.json");

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
