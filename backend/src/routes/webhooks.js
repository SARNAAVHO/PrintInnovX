import express from "express";
import crypto from "crypto";
import prisma from "../prisma.js";

const router = express.Router();

router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const payload = JSON.parse(req.body.toString());
    const payment = payload.payload.payment.entity;

    await prisma.printJob.updateMany({
      where: { razorpayOrderId: payment.order_id },
      data: {
        status: "PAID",
        razorpayPaymentId: payment.id,
      },
    });

    res.json({ status: "ok" });
  }
);

export default router;
