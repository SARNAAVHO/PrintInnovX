import prisma from "../prisma.js";

export async function createPrintJob(data) {
  const {
    deviceId,
    fileUrl,
    copies = 1,
    color = false,
  } = data;

  return prisma.printJob.create({
    data: {
      deviceId,
      fileUrl,
      copies,
      color,
    },
  });
}

export async function getNextJobForDevice(deviceId) {
  // return prisma.printJob.findFirst({
  const job = await prisma.printJob.findFirst({
    where: {
      deviceId,
      status: "CREATED",
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  if (!job) return null;

  await prisma.printJob.update({
    where: { id: job.id },
    data: { status: "PRINTING" },
  });
  return job;
}

export async function updateJobStatus(jobId, status) {
  return prisma.printJob.update({
    where: { id: jobId },
    data: { status },
  });
}
