import express from "express";
import crypto from "crypto";
import prisma from "../prisma.js";

const router = express.Router();

router.post("/razorpay", async (req, res) => {
  try {
    console.log("🔥 WEBHOOK HIT");

    const signature = req.headers["x-razorpay-signature"];

    if (!signature) {
      console.log("❌ Missing signature");
      return res.status(400).send("Missing signature");
    }

    const payload = req.body;
    console.log("EVENT:", payload.event);

    const payment = payload?.payload?.payment?.entity;

    if (!payment?.order_id) {
      console.log("❌ Missing order_id in payload");
      return res.status(400).send("Missing order_id");
    }

    /* ===========================
       FIND JOB + SHOP
    =========================== */
    const job = await prisma.printJob.findFirst({
      where: {
        razorpayOrderId: payment.order_id,
      },
      include: {
        Device: {
          include: {
            shop: true,
          },
        },
      },
    });

    if (!job) {
      console.log("❌ No job found for order:", payment.order_id);
      return res.status(404).send("Job not found");
    }

    /* ===========================
       WEBHOOK SECRET
    =========================== */
    const webhookSecret =
      job.Device?.shop?.razorpayWebhookSecret ||
      process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.log("❌ No webhook secret configured");
      return res.status(500).send("Webhook secret not configured");
    }

    /* ===========================
       VERIFY SIGNATURE
    =========================== */
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.log("❌ Signature mismatch");
      return res.status(400).send("Invalid signature");
    }

    console.log("✅ SIGNATURE OK");

    /* ===========================
       IGNORE OTHER EVENTS
    =========================== */
    if (payload.event !== "payment.captured") {
      return res.json({
        status: "ignored",
      });
    }

    /* ===========================
       MARK JOB PAID
    =========================== */
    await prisma.printJob.updateMany({
      where: {
        razorpayOrderId: payment.order_id,
        status: {
          not: "PAID",
        },
      },
      data: {
        status: "PAID",
        razorpayPaymentId: payment.id,
      },
    });

    console.log("✅ Job marked PAID:", payment.order_id);

    return res.json({
      status: "ok",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;


//Job processing failed: {"error":"\nInvalid `prisma.printJob.findFirst()` invocation:\n\n\nCan't reach database server at `ep-red-hill-ah6nbzbp-pooler.c-3.us-east-1.aws.neon.tech`:`5432`\n\nPlease make sure your database server is running at `ep-red-hill-ah6nbzbp-pooler.c-3.us-east-1.aws.neon.tech`:`5432`."}
// Heartbeat failed: {"error":"Heartbeat failed"}