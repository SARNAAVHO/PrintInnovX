import express from "express";
import crypto from "crypto";
import prisma from "../prisma.js";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
  console.log("🔥 WEBHOOK HIT");

  const signature = req.headers["x-razorpay-signature"];
  if (!signature) {
    console.log("❌ Missing signature");
    return res.status(400).send("Missing signature");
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest("hex");

  if (signature !== expectedSignature) {
    console.log("❌ Signature mismatch");
    return res.status(400).send("Invalid signature");
  }

  console.log("✅ SIGNATURE OK");

  const payload = req.body;
  console.log("EVENT:", payload.event);

  if (payload.event !== "payment.captured") {
    return res.json({ status: "ignored" });
  }

  const payment = payload.payload.payment.entity;

  await prisma.printJob.updateMany({
    where: {
      razorpayOrderId: payment.order_id,
      status: { not: "PAID" },
    },
    data: {
      status: "PAID",
      razorpayPaymentId: payment.id,
    },
  });

  console.log("✅ Job marked PAID:", payment.order_id);

  res.json({ status: "ok" });
});

export default router;
