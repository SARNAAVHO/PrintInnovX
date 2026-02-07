<<<<<<< HEAD
import { printWindows } from "./windows/index.js";
import { printLinux } from "./linux/index.js";

export function getPrinter() {
  if (process.platform === "win32") {
    return printWindows;
  }
  return printLinux;
}
 
=======
import os from "os";
import * as windowsPrinter from "./windows/index.js";

export function getPrinter() {
  if (os.platform() === "win32") {
    return windowsPrinter;
  }
  throw new Error("Unsupported OS");
}
>>>>>>> b94d829d6731e463c7139d669adb9f99998420c9
