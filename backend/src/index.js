import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deviceRoutes from "./routes/devices.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

/* 🔑 REQUIRED MIDDLEWARE */
app.use(cors());
app.use(express.json()); // ← THIS WAS MISSING / NOT RUNNING

/* ROUTES */
app.use("/api/devices", deviceRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
