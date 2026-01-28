import fs from "fs";
import axios from "axios";
import { fetchNextJob, updateJobStatus } from "../api.js";

export function startJobPolling(config) {
  setInterval(async () => {
    try {
      const job = await fetchNextJob(config.authToken);

      if (!job) return;

      console.log("📄 New job received:", job.id);

      await updateJobStatus(config.authToken, job.id, "PRINTING");

      // TEMP: simulate printing
      console.log(`🖨️ Printing ${job.fileUrl}`);

      await new Promise(r => setTimeout(r, 3000));

      await updateJobStatus(config.authToken, job.id, "PRINTED");
      console.log("✅ Job completed");

    } catch (err) {
      console.error("❌ Job processing error");
    }
  }, 5_000);
}
