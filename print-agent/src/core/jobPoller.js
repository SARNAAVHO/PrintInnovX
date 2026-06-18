import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { apiRequest } from "../api/client.js";
import { getPrinter } from "../printer/printerFactory.js";

const DOWNLOAD_DIR = path.resolve("jobs");

let isWorking = false;

/**
 * 📖 Read agent configuration
 */
function getConfig() {
  const configPath = path.resolve("config/agent.json");

  if (!fs.existsSync(configPath)) {
    throw new Error("Agent configuration not found.");
  }

  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

/**
 * 🔐 Read agent token
 */
function getToken() {
  return getConfig().agentToken;
}

/**
 * 🌐 Read backend URL
 */
function getBackendUrl() {
  return getConfig().backendUrl;
}

/**
 * 🚀 Start polling
 */
export function startJobPoller() {
  // Clean download folder
  if (fs.existsSync(DOWNLOAD_DIR)) {
    fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
  }

  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });

  console.log("📡 Job poller started");

  setInterval(pollOnce, 5000);
}

/**
 * 🔁 Poll backend
 */
async function pollOnce() {
  if (isWorking) return;

  let job = null;
  const downloadedFiles = [];

  try {
    isWorking = true;

    const res = await apiRequest(
      "/api/jobs/next",
      "POST",
      getToken()
    );

    job = res.job;

    if (!job) return;

    console.log(`🖨️ New job received: ${job.id}`);

    const printer = getPrinter();

    for (const file of job.files) {
      const filePath = await downloadJobFile(job.id, file.fileId);

      downloadedFiles.push(filePath);

      await printer(job, filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await apiRequest(
      `/api/jobs/${job.id}/status`,
      "PATCH",
      getToken(),
      {
        status: "PRINTED"
      }
    );

    console.log(`✅ Job printed: ${job.id}`);

  } catch (err) {
    console.error("❌ Job processing failed:", err.message);

    if (job?.id) {
      try {
        await apiRequest(
          `/api/jobs/${job.id}/status`,
          "PATCH",
          getToken(),
          {
            status: "FAILED"
          }
        );
      } catch {}
    }

    downloadedFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.warn("⚠️ Retained for debugging:", file);
      }
    });

  } finally {
    isWorking = false;
  }
}

/**
 * 📥 Download print file
 */
async function downloadJobFile(jobId, fileId) {
  const backendUrl = getBackendUrl();
  const token = getToken();

  const response = await fetch(
    `${backendUrl}/api/upload/${fileId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to download file (${response.status})`
    );
  }

  const filePath = path.join(
    DOWNLOAD_DIR,
    `${jobId}-${fileId}.pdf`
  );

  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(filePath, buffer);

  return filePath;
}