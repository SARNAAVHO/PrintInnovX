import fs from "fs";

export function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync("logs/agent.log", line);
}
