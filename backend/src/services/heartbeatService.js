import prisma from "../prisma.js";

export async function updateHeartbeat(deviceId) {
  return prisma.device.update({
    where: { id: deviceId },
    data: {
      isOnline: true,
      lastSeenAt: new Date(),
    },
  });
}
