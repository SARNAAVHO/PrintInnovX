import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

export async function authenticateAgent(deviceId, authToken) {
  const device = await prisma.device.findUnique({
    where: { id: deviceId },
  });

  if (!device) {
    throw new Error("Invalid deviceId");
  }

  if (device.authToken !== authToken) {
    throw new Error("Invalid authentication token");
  }

  if (!device.isActive) {
    throw new Error("Device is disabled");
  }

  const token = jwt.sign(
    {
      deviceId: device.id,
      type: "print-agent",
    },
    process.env.AGENT_JWT_SECRET,
    {
      expiresIn: process.env.AGENT_JWT_EXPIRY || "12h",
    }
  );

  return {
    agentToken: token,
    expiresIn: process.env.AGENT_JWT_EXPIRY || "12h",
    deviceId: device.id,
    shopName: device.shopName,
    deviceName: device.deviceName,
  };
}

export async function registerAgent(deviceId) {

  const device = await prisma.device.findUnique({
    where: { id: deviceId }
  });

  if (!device) {
    throw new Error("Device not found");
  }

  const token = jwt.sign(
    { deviceId: device.id },
    process.env.AGENT_JWT_SECRET,
    { expiresIn: "30d" }
  );

  return {
    deviceId: device.id,
    token
  };
}

