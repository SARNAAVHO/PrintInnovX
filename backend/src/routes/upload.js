import express from "express";
import multer from "multer";
import crypto from "crypto";

const router = express.Router();

// 🧠 RAM-ONLY storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
});

// TEMP in-memory store (jobId → buffer)
const memoryStore = new Map();

/**
 * USER → Upload file (RAM only)
 */
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "File missing" });
  }

  const fileId = crypto.randomUUID();

  memoryStore.set(fileId, {
    buffer: req.file.buffer,
    mimetype: req.file.mimetype,
    createdAt: Date.now(),
  });

  // ⏱ Auto-destroy after 10 minutes (failsafe)
  setTimeout(() => {
    memoryStore.delete(fileId);
  }, 10 * 60 * 1000);

  res.json({
    fileId, // NOT a URL
  });
});

/**
 * AGENT → Fetch file once (RAM only)
 */
router.get("/:fileId", (req, res) => {
  const file = memoryStore.get(req.params.fileId);

  if (!file) {
    return res.status(404).json({ error: "File expired or not found" });
  }

  res.setHeader("Content-Type", file.mimetype);
  res.send(file.buffer);

  // 🔥 DESTROY AFTER FIRST ACCESS
  memoryStore.delete(req.params.fileId);
});

export default router;
