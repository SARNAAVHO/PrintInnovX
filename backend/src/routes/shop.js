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
   CREATE SHOP
=========================== */
router.post("/create", requireAuth, async (req, res) => {
  const clerkUserId = req.clerkUserId;

  const {
    ownerName,
    shopName,
    priceBW,
    priceColor,
    razorpayKeyId,
    razorpayKeySecret,
  } = req.body;

  try {
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

        // Pricing
        priceBW: parseFloat(priceBW) || 0,
        priceColor: parseFloat(priceColor) || 0,

        // Razorpay (optional during creation)
        razorpayKeyId: razorpayKeyId || null,
        razorpayKeySecret: razorpayKeySecret || null,
      },
    });

    res.json(shop);
  } catch (error) {
    console.error("Shop Creation Error:", error);
    res.status(500).json({ error: "Failed to initialize terminal node." });
  }
});

/* ===========================
   DASHBOARD
=========================== */
router.get("/dashboard", requireAuth, async (req, res) => {
  try {
    const clerkUserId = req.clerkUserId;

    const shop = await prisma.shop.findUnique({
      where: { clerkUserId },
      include: {
        devices: {
          include: {
            printJobs: true,
          },
        },
      },
    });

    if (!shop) {
      return res.status(404).json({ error: "Shop not found" });
    }

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

      // Pricing
      priceBW: shop.priceBW,
      priceColor: shop.priceColor,

      // Razorpay
      razorpayKeyId: shop.razorpayKeyId, // public key only
      hasRazorpaySetup: !!(
        shop.razorpayKeyId && shop.razorpayKeySecret
      ),

      devices: shop.devices,
      printJobs: allJobs,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

/* ===========================
   UPDATE RAZORPAY KEYS
=========================== */
router.put("/razorpay-keys", requireAuth, async (req, res) => {
  try {
    const clerkUserId = req.clerkUserId;
    const { razorpayKeyId, razorpayKeySecret } = req.body;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return res.status(400).json({
        error: "Both keys are required",
      });
    }

    const shop = await prisma.shop.update({
      where: { clerkUserId },
      data: {
        razorpayKeyId,
        razorpayKeySecret,
      },
    });

    res.json({
      success: true,
      shop,
    });
  } catch (error) {
    console.error("Razorpay update error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;