import prisma from "../prisma.js";
import { generateAuthToken } from "../utils/token.js";

export async function registerDevice({ shopName, deviceName }) {
  const authToken = generateAuthToken();

  const device = await prisma.device.create({
    data: {
      shopName,
      deviceName,
      authToken,
    },
  });

  return {
    deviceId: device.id,
    authToken: device.authToken,
    shopName: device.shopName,
    deviceName: device.deviceName,
  };
}
