import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ===========================
   PUBLIC DEVICE FETCH
=========================== */
router.get("/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
      select: {
        id: true,
        deviceName: true,
        shopName: true,
        shop: {
          select: {
            razorpayKeyId: true,
            priceBW: true,
            priceColor: true,
          },
        },
      },
    });

    if (!device) {
      return res.status(404).json({
        error: "Device not found",
      });
    }

    res.json({
      id: device.id,
      deviceName: device.deviceName,
      shopName: device.shopName,

      // Razorpay
      razorpayKeyId: device.shop?.razorpayKeyId ?? null,

      // Pricing
      priceBW: Number(device.shop?.priceBW ?? 5),
      priceColor: Number(device.shop?.priceColor ?? 10),
    });
  } catch (error) {
    console.error("Device fetch error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;