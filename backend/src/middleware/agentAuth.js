import prisma from "../prisma.js";

export default async function agentAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    const device = await prisma.device.findFirst({
      where: {
        authToken: token,
        isActive: true,
      },
    });

    if (!device) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // 🔑 THIS LINE IS CRITICAL
    req.agent = {
      deviceId: device.id,
    };

    next();
  } catch (err) {
    console.error("Agent auth error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
}
