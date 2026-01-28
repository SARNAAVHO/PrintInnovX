import express from "express";
import agentAuth from "../middleware/agentAuth.js";
import { updateHeartbeat } from "../services/heartbeatService.js";

const router = express.Router();

/**
 * POST /api/agent/heartbeat
 * Headers:
 * Authorization: Bearer <agentToken>
 */
router.post("/heartbeat", agentAuth, async (req, res) => {
  try {
    await updateHeartbeat(req.agent.deviceId);
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Heartbeat error:", err.message);
    res.status(500).json({ error: "Heartbeat failed" });
  }
});

export default router;
