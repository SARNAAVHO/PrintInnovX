import { sendHeartbeat } from "../api/client.js";
import fs from "fs";
import path from "path";

const CONFIG_PATH = path.resolve("config/agent.json");

export function startHeartbeat() {
  setInterval(async () => {
    try {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
      await sendHeartbeat(config.agentToken);
      console.log("💓 Heartbeat sent");
    } catch (e) {
      console.error("Heartbeat failed:", e.message);
    }
  }, 30000);
}
