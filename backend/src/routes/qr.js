import express from "express";
import QRCode from "qrcode";

const router = express.Router();

router.get("/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;

    const publicUrl = `${process.env.PUBLIC_BASE_URL}/p/${deviceId}`;

    const qrBuffer = await QRCode.toBuffer(publicUrl, {
      type: "png",
      width: 400,
      margin: 2,
    });

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="printinnovx-${deviceId}.png"`
    );

    res.send(qrBuffer);
  } catch (err) {
    console.error("QR generation error:", err);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

export default router;
