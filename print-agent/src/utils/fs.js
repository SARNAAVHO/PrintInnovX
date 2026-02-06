import fs from "fs";
import path from "path";

const CONFIG_PATH = path.resolve("config/agent.json");

export function loadAgentConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf-8"));
}
