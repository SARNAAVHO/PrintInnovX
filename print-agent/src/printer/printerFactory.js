import os from "os";
import { exec } from "child_process";

const DEV_MODE = process.env.PRINT_AGENT_DEV === "true";

const SUMATRA_PATH =
  '"C:\\Users\\SHIRSENDU ROY\\AppData\\Local\\SumatraPDF\\SumatraPDF.exe"';


export function getPrinter() {

  if (os.platform() === "win32") {

    return async function printer(job, filePath) {

      const printerName = job.printerName;
      const copies = job.copies || 1;

      if (!printerName) {
        throw new Error("job.printerName missing");
      }

      if (DEV_MODE) {

        console.log("🧪 DEV MODE PRINT");
        console.log("📄 File:", filePath);
        console.log("🖨️ Intended printer:", printerName);
        console.log("📦 Copies:", copies);

        await new Promise(r => setTimeout(r, 1000));
        console.log("✅ DEV print completed");
        return;
      }

      const cmd =
        `${SUMATRA_PATH} -print-to "${printerName}" -print-settings "${copies}x" "${filePath}"`;

      console.log("[INFO] Sending to printer:", printerName);

      await new Promise((resolve, reject) => {
        exec(cmd, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });

      console.log("🖨️ Real print sent");
    };
  }

  throw new Error("Unsupported OS");
}
