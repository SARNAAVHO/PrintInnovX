import { startHeartbeat } from "./heartbeat.js";
import { startJobPoller } from "./jobPoller.js";
import { authenticateAgent } from "../api/auth.js";

export async function startAgent() {

  await authenticateAgent();

  console.log("✅ Agent authenticated");

  startHeartbeat();
  startJobPoller();
}
