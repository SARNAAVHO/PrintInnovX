import express from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";
import crypto from "crypto";

const router = express.Router();

/* ===========================
   CREATE DEVICE (AUTH)
=========================== */
router.post("/create", requireAuth, async (req, res) => {
  try {
    const clerkUserId = req.clerkUserId;
    const { deviceName } = req.body;

    if (!deviceName) {
      return res.status(400).json({ error: "Device name required" });
    }

    // 🔥 Find shop by clerkUserId
    const shop = await prisma.shop.findUnique({
      where: { clerkUserId },
    });

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // 🔥 Create device with REQUIRED shopId
    const device = await prisma.device.create({
      data: {
        shopId: shop.id,              // ✅ REQUIRED
        shopName: shop.shopName,      // optional duplicate
        deviceName,
        authToken: crypto.randomBytes(32).toString("hex"),
      },
    });

    res.json(device);
  } catch (err) {
    console.error("Create device error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ===========================
   GET SHOP DEVICES
=========================== */
router.get("/", requireAuth, async (req, res) => {
  const clerkUserId = req.clerkUserId;

  const shop = await prisma.shop.findUnique({
    where: { clerkUserId },
    include: { devices: true },
  });

  if (!shop) {
    return res.status(404).json({ error: "Shop not found" });
  }

  res.json(shop.devices);
});

router.get("/:deviceId", requireAuth, async (req, res) => {
  const { deviceId } = req.params;

  const device = await prisma.device.findUnique({
    where: { id: deviceId },
  });

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  res.json(device);
});

/* ===========================
   DELETE DEVICE (AUTH + OWNERSHIP CHECK)
=========================== */
router.delete("/:deviceId", requireAuth, async (req, res) => {
  try {
    const clerkUserId = req.clerkUserId;
    const { deviceId } = req.params;

    // Find shop of logged-in user
    const shop = await prisma.shop.findUnique({
      where: { clerkUserId },
    });

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Check device belongs to this shop
    const device = await prisma.device.findFirst({
      where: {
        id: deviceId,
        shopId: shop.id,
      },
    });

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    // Delete device
    await prisma.device.delete({
      where: { id: deviceId },
    });

    res.json({ message: "Device deleted successfully" });

  } catch (err) {
    console.error("Delete device error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;