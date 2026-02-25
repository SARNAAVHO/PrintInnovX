import express from "express";
import prisma from "../prisma.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/* ===========================
   GET CURRENT SHOP
=========================== */
router.get("/me", requireAuth, async (req, res) => {
  const clerkUserId = req.clerkUserId;

  const shop = await prisma.shop.findUnique({
    where: { clerkUserId },
  });

  if (!shop) {
    return res.status(404).json({ error: "Shop not found" });
  }

  res.json(shop);
});

/* ===========================
   CREATE SHOP (SAFE)
=========================== */
router.post("/create", requireAuth, async (req, res) => {
  const clerkUserId = req.clerkUserId;
  const { ownerName, shopName } = req.body;

  const existing = await prisma.shop.findUnique({
    where: { clerkUserId },
  });

  if (existing) {
    return res.json(existing);
  }

  const shop = await prisma.shop.create({
    data: {
      clerkUserId,
      ownerName,
      shopName,
    },
  });

  res.json(shop);
});

router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const clerkUserId = req.clerkUserId;

    const shop = await prisma.shop.findUnique({
      where: { clerkUserId },
      include: {
        devices: {
          include: {
            printJobs: true,
  //           orderBy: { createdAt: "desc" },
  // take: 50,
          },
        },
      },
    });

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

    // Flatten print jobs from all devices
    const allJobs = shop.devices.flatMap((device) =>
      device.printJobs.map((job) => ({
        ...job,
        deviceName: device.deviceName,
      }))
    );

    res.json({
      id: shop.id,
      shopName: shop.shopName,
      ownerName: shop.ownerName,
      devices: shop.devices,
      printJobs: allJobs,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;