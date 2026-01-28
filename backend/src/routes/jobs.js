import express from "express";
import agentAuth from "../middleware/agentAuth.js";
import {
  createPrintJob,
  getNextJobForDevice,
  updateJobStatus,
} from "../services/jobService.js";

const router = express.Router();

/**
 * USER → Create print job
 */
router.post("/", async (req, res) => {
  try {
    const job = await createPrintJob(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("Create job error:", err.message);
    res.status(400).json({ error: "Failed to create job" });
  }
});

/**
 * AGENT → Fetch next job
 */
router.post("/next", agentAuth, async (req, res) => {
  try {
    const job = await getNextJobForDevice(req.agent.deviceId);

    if (!job) {
      return res.json({ job: null });
    }

    res.json({ job });
  } catch (err) {
    console.error("Fetch job error:", err.message);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

/**
 * AGENT → Update job status
 */
router.patch("/:id/status", agentAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await updateJobStatus(req.params.id, status);
    res.json(job);
  } catch (err) {
    console.error("Update job error:", err.message);
    res.status(400).json({ error: "Failed to update job" });
  }
});

export default router;
