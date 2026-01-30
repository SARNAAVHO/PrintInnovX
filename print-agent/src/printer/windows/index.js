import { exec } from "child_process";
import path from "path";

const SUMATRA_PATH =
  '"C:\\Program Files\\SumatraPDF\\SumatraPDF.exe"';

export async function printWindows(job, filePath) {
  return new Promise((resolve, reject) => {

    const printer = job.printerName;
    const copies = job.copies || 1;

    const cmd =
      `${SUMATRA_PATH} -print-to "${printer}" -print-settings "${copies}x" "${filePath}"`;

    exec(cmd, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
