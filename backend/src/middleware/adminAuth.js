import { verifyToken } from "@clerk/backend";
import prisma from "../prisma.js";

export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing token" });
    }

    const token = authHeader.split(" ")[1];

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    const clerkUserId = payload.sub;

    const admin = await prisma.admin.findUnique({
      where: { clerkUserId },
    });

    if (!admin) {
      return res.status(403).json({ error: "Admin access denied" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
};