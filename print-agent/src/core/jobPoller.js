import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { apiRequest } from "../api/client.js";
import { getPrinter } from "../printer/printerFactory.js";

const DOWNLOAD_DIR = path.resolve("jobs");

let isWorking = false;

/**
 * 🚀 Start polling for jobs
 */
export function startJobPoller() {
  // 🧹 Clean jobs dir on startup
  if (fs.existsSync(DOWNLOAD_DIR)) {
    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  const pollInterval = 5000; // 5 seconds
  setInterval(pollOnce, pollInterval);
}

/**
 * 🔁 Poll backend once
 */
async function pollOnce() {
  if (isWorking) return;

  let job = null;
  const downloadedFiles = [];

  try {
    const res = await apiRequest("/api/jobs/next", "POST", getToken());
    job = res.job;
    if (!job) return;

    isWorking = true;
    console.log("🖨️ New job received:", job.id);

    const printer = getPrinter();

    // 🔁 PRINT EACH FILE
    for (const file of job.files) {
      const filePath = await downloadJobFile(job.id, file.fileId);
      downloadedFiles.push(filePath);

      await printer(job, filePath);

      // 🧹 cleanup per file
      fs.unlinkSync(filePath);
    }

    // ✅ Mark job PRINTED only if all succeed
    await apiRequest(
      `/api/jobs/${job.id}/status`,
      "PATCH",
      getToken(),
      { status: "PRINTED" }
    );

    console.log("✅ Job printed:", job.id);

  } catch (err) {
    console.error("❌ Job processing failed:", err.message);

    // Keep files for debugging
    downloadedFiles.forEach((f) => {
      if (fs.existsSync(f)) {
        console.warn("⚠️ Retained:", f);
      }
    });

    if (job?.id) {
      await apiRequest(
        `/api/jobs/${job.id}/status`,
        "PATCH",
        getToken(),
        { status: "FAILED" }
      );
    }

  } finally {
    isWorking = false;
  }
}

/**
 * 📥 Download print file (RAM-only → disk)
 */
async function downloadJobFile(jobId, fileId) {
  const token = getToken();

  const res = await fetch(
    `http://localhost:4000/api/upload/${fileId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  const filePath = path.join(DOWNLOAD_DIR, `${jobId}-${fileId}.pdf`);
  const buffer = Buffer.from(await res.arrayBuffer());

  fs.writeFileSync(filePath, buffer);
  return filePath;
}

/**
 * 🔐 Read agent token
 */
function getToken() {
  const configPath = path.resolve("config/agent.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config.agentToken;
}
