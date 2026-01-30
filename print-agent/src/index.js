import { startAgent } from "./core/agent.js";
import { setupShutdown } from "./core/shutdown.js";

console.log("🚀 Print Agent starting...");

await startAgent();
setupShutdown();
