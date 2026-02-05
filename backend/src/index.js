import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import deviceRoutes from "./routes/devices.js";
import qrRoutes from "./routes/qr.js";
import agentRoutes from "./routes/agent.js";
import heartbeatRoutes from "./routes/heartbeat.js";
import jobRoutes from "./routes/jobs.js";
import webhookRoutes from "./routes/webhooks.js";
import adminRoutes from "./routes/admin.js";
import adminAuthRoutes from "./routes/adminAuth.js";
import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(
  "/api/webhooks",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf; // 👈 store raw body safely
    },
  }),
  webhookRoutes
);
app.use(express.json());

app.use((req, res, next) => {
  // 🔥 Allow Razorpay webhooks without auth
  if (req.originalUrl.startsWith("/api/webhooks")) {
    return next();
  }

  return clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })(req, res, next);
});

// routes
app.use("/api/devices", deviceRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/agent", heartbeatRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
