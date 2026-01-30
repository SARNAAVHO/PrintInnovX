import { printWindows } from "./windows/index.js";
import { printLinux } from "./linux/index.js";

export function getPrinter() {
  if (process.platform === "win32") {
    return printWindows;
  }
  return printLinux;
}
 