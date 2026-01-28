import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import deviceRoutes from "./routes/devices.js";
import qrRoutes from "./routes/qr.js";
import agentRoutes from "./routes/agent.js";
import heartbeatRoutes from "./routes/heartbeat.js";
import jobRoutes from "./routes/jobs.js";
import webhookRoutes from "./routes/webhooks.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json()); // 🔑 REQUIRED

app.use("/api/devices", deviceRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/agent", heartbeatRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/webhooks", webhookRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
