export function setupShutdown() {
  const shutdown = () => {
    console.log("🛑 Agent shutting down...");
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
