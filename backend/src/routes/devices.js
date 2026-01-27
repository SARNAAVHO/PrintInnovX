import express from "express";
import { registerDevice } from "../services/deviceService.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { shopName, deviceName } = req.body || {};

    if (!shopName || !deviceName) {
      return res.status(400).json({
        error: "shopName and deviceName are required",
      });
    }

    const device = await registerDevice({ shopName, deviceName });
    res.json(device);
  } catch (err) {
    console.error("Register device error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
