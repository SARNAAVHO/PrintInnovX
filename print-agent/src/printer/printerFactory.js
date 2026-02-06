import os from "os";
import * as windowsPrinter from "./windows/index.js";

export function getPrinter() {
  if (os.platform() === "win32") {
    return windowsPrinter;
  }
  throw new Error("Unsupported OS");
}
