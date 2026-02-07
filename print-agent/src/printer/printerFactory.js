import os from "os";
import * as windowsPrinter from "./windows/index.js";

const DEV_MODE = process.env.PRINT_AGENT_DEV === "true";

export function getPrinter() {
  if (os.platform() === "win32") {
    return async function printer(job, filePath) {
      const printers = safeGetPrinters();

      // 🧪 DEV MODE OR NO PRINTERS
      if (DEV_MODE || printers.length === 0) {
        console.log("🧪 DEV MODE PRINT");
        console.log("📄 File:", filePath);
        console.log("🖨️ Intended printer:", job.printerName);
        console.log("📦 Copies:", job.copies);

        // simulate print time
        await new Promise((r) => setTimeout(r, 1500));

        console.log("✅ DEV print completed");
        return;
      }

      // 🔥 REAL PRINT
      windowsPrinter.printFile(
        filePath,
        job.printerName,
        {
          copies: job.copies,
          type: "PDF",
        }
      );
    };
  }

  throw new Error("Unsupported OS");
}

function safeGetPrinters() {
  try {
    return windowsPrinter.getInstalledPrinters();
  } catch {
    return [];
  }
}
