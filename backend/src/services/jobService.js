import prisma from "../prisma.js";
import Razorpay from "razorpay";

/**
 * USER → Create PAID print job
 */
export async function createPaidPrintJob(data) {
  if (!data) {
    throw new Error("Request body missing");
  }

  const {
    deviceId,
    files,
    copies = 1,
    totalPages,
    color = false,
  } = data;

  if (!Array.isArray(files) || files.length === 0) {
    throw new Error("At least one file is required");
  }

  if (!deviceId) {
    throw new Error("deviceId is required");
  }

  if (!Number.isInteger(totalPages) || totalPages <= 0) {
    throw new Error("totalPages must be a positive integer");
  }

  if (!Number.isInteger(copies) || copies <= 0) {
    throw new Error("copies must be greater than 0");
  }

  /* ===========================
     LOAD DEVICE + SHOP
  =========================== */
  const device = await prisma.device.findUnique({
    where: { id: deviceId },
    include: {
      shop: true,
    },
  });

  if (!device) {
    throw new Error("Device not found");
  }

  if (!device.shop) {
    throw new Error("Shop not found");
  }

  /* ===========================
     SHOP PRICING
  =========================== */
  const pricePerPage = color
    ? device.shop.priceColor
    : device.shop.priceBW;

  if (!pricePerPage || pricePerPage <= 0) {
    throw new Error(
      "Shop pricing is not configured"
    );
  }

  const amount =
    Math.round(pricePerPage * totalPages * copies * 100);

  /* ===========================
     SHOP RAZORPAY ACCOUNT
  =========================== */
  if (
    !device.shop.razorpayKeyId ||
    !device.shop.razorpayKeySecret
  ) {
    throw new Error(
      "This shop has not configured Razorpay yet"
    );
  }

  const shopRazorpay = new Razorpay({
    key_id: device.shop.razorpayKeyId,
    key_secret: device.shop.razorpayKeySecret,
  });

  /* ===========================
     CREATE JOB
  =========================== */
  const job = await prisma.printJob.create({
    data: {
      deviceId,
      files,
      copies,
      color,
      totalPages,
      amount,
      status: "CREATED",
    },
  });

  /* ===========================
     CREATE RAZORPAY ORDER
  =========================== */
  const order = await shopRazorpay.orders.create({
    amount,
    currency: "INR",
    receipt: job.id,
  });

  /* ===========================
     SAVE ORDER ID
  =========================== */
  await prisma.printJob.update({
    where: { id: job.id },
    data: {
      razorpayOrderId: order.id,
    },
  });

  return {
    jobId: job.id,
    razorpayOrderId: order.id,

    // frontend uses this key
    razorpayKeyId: device.shop.razorpayKeyId,

    amount,
    currency: "INR",
  };
}

/**
 * AGENT → Fetch next PAID job
 */
export async function getNextJobForDevice(deviceId) {
  if (!deviceId) {
    throw new Error("deviceId missing in agent context");
  }

  const job = await prisma.printJob.findFirst({
    where: {
      deviceId,
      status: "PAID",
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      Device: true,
    },
  });

  if (!job) {
    return null;
  }

  await prisma.printJob.update({
    where: {
      id: job.id,
    },
    data: {
      status: "PRINTING",
    },
  });

  return {
    id: job.id,
    files: job.files,
    copies: job.copies,
    totalPages: job.totalPages,
    color: job.color,
    printerName: job.Device.deviceName,
  };
}

/**
 * AGENT → Update job status
 */
export async function updateJobStatus(jobId, status) {
  if (!jobId) {
    throw new Error("jobId is required");
  }

  if (!["PRINTED", "FAILED"].includes(status)) {
    throw new Error("Invalid job status");
  }

  return prisma.printJob.update({
    where: {
      id: jobId,
    },
    data: {
      status,
    },
  });
}