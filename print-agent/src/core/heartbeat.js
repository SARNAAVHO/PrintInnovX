import { heartbeat } from "../api.js";

export function startHeartbeat(config) {
  setInterval(async () => {
    try {
      await heartbeat(config.authToken);
      console.log("💓 Heartbeat sent");
    } catch {
      console.error("⚠️ Heartbeat failed");
    }
  }, 10_000);
}
