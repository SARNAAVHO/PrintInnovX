import os from "os";
import { exec } from "child_process";
import fs from "fs";

const DEV_MODE = process.env.PRINT_AGENT_DEV === "true";

/**
 * Try to locate SumatraPDF.exe in common install locations
 */
function findSumatraPath() {

  const candidates = [
    // per-user install (like your machine)
    `${process.env.LOCALAPPDATA}\\SumatraPDF\\SumatraPDF.exe`,

    // system installs
    "C:\\Program Files\\SumatraPDF\\SumatraPDF.exe",
    "C:\\Program Files (x86)\\SumatraPDF\\SumatraPDF.exe",
  ];

  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      return p;
    }
  }

  return null;
}

export function getPrinter() {

  if (os.platform() !== "win32") {
    throw new Error("Unsupported OS");
  }

  const sumatraPath = findSumatraPath();

  if (!DEV_MODE && !sumatraPath) {
    throw new Error(
      "SumatraPDF not found. Please install SumatraPDF on this machine."
    );
  }

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
      await new Promise(r => setTimeout(r, 800));
      console.log("✅ DEV print completed");
      return;
    }

    const exe = `"${sumatraPath}"`;

    const cmd =
      `${exe} -exit-on-print -print-to "${printerName}" -print-settings "${copies}x" "${filePath}"`;

    console.log("[INFO] Printing using Sumatra:", sumatraPath);

    await new Promise((resolve, reject) => {
      exec(cmd, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  };
}
