import printer from "node-printer";
import fs from "fs";

/* -------------------------------------------
   Get all installed printers (Windows)
-------------------------------------------- */
export function getInstalledPrinters() {
  try {
    return printer.getPrinters();
  } catch (err) {
    console.error("❌ Failed to get printers:", err.message);
    return [];
  }
}

/* -------------------------------------------
   Get detailed printer info
-------------------------------------------- */
export function getPrinterInfo(printerName) {
  if (!printerName) {
    throw new Error("printerName is required");
  }

  try {
    return printer.getPrinter(printerName);
  } catch (err) {
    console.error(
      `❌ Failed to get printer info for ${printerName}:`,
      err.message
    );
    throw err;
  }
}

/* -------------------------------------------
   Validate printer exists & is available
-------------------------------------------- */
export function validatePrinter(printerName) {
  const printers = getInstalledPrinters();

  const found = printers.find(
    (p) => p.name === printerName
  );

  if (!found) {
    throw new Error(
      `Printer "${printerName}" not found on system`
    );
  }

  return found;
}

/* -------------------------------------------
   Print a file (PDF / RAW)
-------------------------------------------- */
export function printFile(
  filePath,
  printerName,
  options = {}
) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist: " + filePath);
  }

  validatePrinter(printerName);

  const data = fs.readFileSync(filePath);

  return new Promise((resolve, reject) => {
    printer.printDirect({
      printer: printerName,
      data,
      type: options.type || "PDF", // PDF or RAW
      options: {
        copies: options.copies || 1,
      },
      success(jobId) {
        console.log(
          `🖨️ Job sent to printer "${printerName}" (Job ID: ${jobId})`
        );
        resolve(jobId);
      },
      error(err) {
        console.error("❌ Print failed:", err);
        reject(err);
      }
    });
  });
}

/* -------------------------------------------
   Debug helper (useful during setup)
-------------------------------------------- */
export function logPrinters() {
  const printers = getInstalledPrinters();

  console.log("🖨️ Installed printers:");
  printers.forEach((p) => {
    console.log(
      `- ${p.name}${p.isDefault ? " (default)" : ""}`
    );
  });
}
