import express from "express";
import { authenticateAgent } from "../services/agentService.js";

const router = express.Router();

router.post("/auth", async (req, res) => {
  try {
    const { deviceId, authToken } = req.body;

    if (!deviceId || !authToken) {
      return res.status(400).json({
        error: "deviceId and authToken are required",
      });
    }

    const result = await authenticateAgent(deviceId, authToken);
    res.json(result);
  } catch (err) {
    console.error("Agent auth error:", err.message);
    res.status(401).json({ error: err.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ error: "deviceId is required" });
    }

    const result = await registerAgent(deviceId);

    res.json(result);
  } catch (err) {
    console.error("Agent register error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
