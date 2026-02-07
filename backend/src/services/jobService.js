import prisma from "../prisma.js";
import razorpay from "../utils/razorpay.js";

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

  if (!deviceId) throw new Error("deviceId is required");
  // if (!fileId) throw new Error("fileId is required");

  if (!Number.isInteger(totalPages) || totalPages <= 0) {
    throw new Error("totalPages must be a positive integer");
  }

  if (!Number.isInteger(copies) || copies <= 0) {
    throw new Error("copies must be greater than 0");
  }

  // 💰 FINAL pricing logic (authoritative)
  const pricePerPage = color ? 10 : 5; // INR
  const amount = pricePerPage * totalPages * 100; // paise

  // 1️⃣ Create job
  const job = await prisma.printJob.create({
    data: {
      deviceId,
      files,
      copies,
      color,
      totalPages,               // ✅ STORE THIS
      amount,
      status: "CREATED",
    },
  });

  // 2️⃣ Create Razorpay order
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: job.id,
  });

  // 3️⃣ Save order ID
  await prisma.printJob.update({
    where: { id: job.id },
    data: { razorpayOrderId: order.id },
  });

  return {
    jobId: job.id,
    razorpayOrderId: order.id,
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
      Device: true, // 👈 JOIN DEVICE
    },
  });

  if (!job) return null;

  // 🔒 Lock job
  await prisma.printJob.update({
    where: { id: job.id },
    data: { status: "PRINTING" },
  });

  // ✅ RETURN SHAPED PAYLOAD FOR AGENT
  return {
    id: job.id,
    files: job.files,
    copies: job.copies,
    totalPages: job.totalPages,
    color: job.color,

    // 🔑 THIS IS THE FIX
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
    where: { id: jobId },
    data: { status },
  });
}
