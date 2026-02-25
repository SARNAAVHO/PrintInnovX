import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/* ===========================
   PUBLIC DEVICE FETCH
=========================== */
router.get("/:deviceId", async (req, res) => {
  const { deviceId } = req.params;

  const device = await prisma.device.findUnique({
    where: { id: deviceId },
    select: {
      id: true,
      deviceName: true,
      shopName: true,
    },
  });

  if (!device) {
    return res.status(404).json({ error: "Device not found" });
  }

  res.json(device);
});

export default router;