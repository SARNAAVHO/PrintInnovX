import fs from "fs";
import path from "path";
import { apiRequest } from "./client.js";

const CONFIG_PATH = path.resolve("config/agent.json");

export async function authenticateAgent() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

  if (!config.deviceId) {
    throw new Error(
      "deviceId missing in config/agent.json. Register device first from backend."
    );
  }

  // Try heartbeat if token exists
  if (config.token) {
    try {
      await apiRequest(
        "/api/agent/heartbeat",
        "POST",
        config.token
      );
      console.log("✅ Agent already authenticated");
      return;
    } catch (err) {
      console.log("⚠ Stored token invalid, re-registering...");
    }
  }

  // Register agent using deviceId
  const data = await apiRequest(
    "/api/agent/register",
    "POST",
    null,
    {
      deviceId: config.deviceId
    }
  );

  config.token = data.token;

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

  console.log("✅ Agent registered for device:", config.deviceId);
}
