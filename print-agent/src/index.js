import { loadConfig } from "./config.js";
import { authenticate } from "./api.js";
import { startHeartbeat } from "./heartbeat.js";
import { startJobPolling } from "./jobPoller.js";

async function startAgent() {
  console.log("🖨️ PrintCloud Agent starting...");

  const config = loadConfig();

  if (!config.deviceId || !config.authToken) {
    console.error("❌ Device not configured");
    process.exit(1);
  }

  await authenticate(config);

  startHeartbeat(config);
  startJobPolling(config);
}

startAgent();
