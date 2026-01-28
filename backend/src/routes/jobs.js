import express from "express";
import agentAuth from "../middleware/agentAuth.js";
import {
  createPaidPrintJob,
  getNextJobForDevice,
  updateJobStatus,
} from "../services/jobService.js";

const router = express.Router();

/**
 * USER → Create PAID print job
 */
router.post("/create-paid", async (req, res) => {
  try {
    // console.log("CREATE PAID JOB BODY:", req.body); // debug (remove later)

    const result = await createPaidPrintJob(req.body);
    res.json(result);
  } catch (err) {
    console.error("Create paid job error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

/**
 * AGENT → Fetch next PAID job
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
    res.status(500).json({ error: err.message });
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
    res.status(400).json({ error: err.message });
  }
});

export default router;
