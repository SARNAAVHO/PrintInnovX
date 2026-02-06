import fs from "fs";
import path from "path";
import { apiRequest } from "./client.js";

const CONFIG_PATH = path.resolve("config/agent.json");

/**
 * Authenticate print-agent and ensure valid agent session token
 */
export async function authenticateAgent() {
  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));

  if (!config.deviceId) {
    throw new Error("deviceId missing in agent.json");
  }

  if (!config.registrationToken) {
    throw new Error(
      "registrationToken missing. Register agent from backend first."
    );
  }

  /* -----------------------------------------
     1️⃣ Try existing agent session token
  ------------------------------------------ */
  if (config.agentToken) {
    try {
      await apiRequest(
        "/api/agent/heartbeat",
        "POST",
        config.agentToken
      );
      console.log("✅ Agent session valid");
      return;
    } catch (err) {
      console.log("⚠ Agent token expired or invalid, re-authenticating...");
    }
  }

  /* -----------------------------------------
     2️⃣ Authenticate using registration token
  ------------------------------------------ */
  const authResponse = await apiRequest(
    "/api/agent/auth",
    "POST",
    config.registrationToken,
    {
      deviceId: config.deviceId
    }
  );

  config.agentToken = authResponse.agentToken;

  // Optional but recommended
  if (authResponse.expiresIn) {
    config.agentTokenExpiresAt = calculateExpiry(
      authResponse.expiresIn
    );
  }

  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

  console.log("✅ Agent authenticated successfully");
}

/* -----------------------------------------
   Helper: calculate expiry timestamp
------------------------------------------ */
function calculateExpiry(expiresIn) {
  const now = Date.now();

  // supports "12h", "30m", "3600s"
  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) return null;

  const value = Number(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return new Date(now + value * multipliers[unit]).toISOString();
}
