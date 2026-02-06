import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { apiRequest } from "../api/client.js";
import { getPrinter } from "../printer/printerFactory.js";

const DOWNLOAD_DIR = path.resolve("jobs");

let isWorking = false;

export function startJobPoller() {
  if (!fs.existsSync(DOWNLOAD_DIR)) {
    fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  }

  const pollInterval = 5000;

  setInterval(pollOnce, pollInterval);
}

async function pollOnce() {
  if (isWorking) return;

  let job = null;

  try {
    // 🔁 MUST be POST (your backend expects POST)
    const res = await apiRequest(
      "/api/jobs/next",
      "POST",
      getToken()
    );

    job = res.job;

    if (!job) return;

    isWorking = true;

    console.log("🖨️ New job received:", job.id);

    const filePath = await downloadFile(job.fileUrl, job.id);

    const printer = getPrinter();

    await printer(job, filePath);

    // ✅ backend expects PATCH + PRINTED
    await apiRequest(
      `/api/jobs/${job.id}/status`,
      "PATCH",
      getToken(),
      { status: "PRINTED" }
    );

    console.log("✅ Job printed:", job.id);

  } catch (err) {
    console.error("❌ Job processing failed:", err.message);

    if (job?.id) {
      try {
        await apiRequest(
          `/api/jobs/${job.id}/status`,
          "PATCH",
          getToken(),
          { status: "FAILED" }
        );
      } catch (e) {}
    }

  } finally {
    isWorking = false;
  }
}

async function downloadFile(fileUrl, jobId) {
  const res = await fetch(fileUrl);

  if (!res.ok) {
    throw new Error("Failed to download file");
  }

  const ext =
    path.extname(new URL(fileUrl).pathname) || ".pdf";

  const filePath = path.join(DOWNLOAD_DIR, `${jobId}${ext}`);

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return filePath;
}

function getToken() {
  const configPath = path.resolve("config/agent.json");
  const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  return config.agentToken;
}
