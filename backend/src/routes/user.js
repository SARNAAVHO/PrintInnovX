import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

/**
 * GET /api/user/role
 * Returns role of current Clerk user
 */
router.get("/role", async (req, res) => {
  try {
    const clerkUserId = req.headers["x-clerk-user-id"];

    if (!clerkUserId) {
      return res.status(401).json({ error: "Missing userId" });
    }

    // Check Admin
    const admin = await prisma.admin.findUnique({
      where: { clerkUserId },
    });

    if (admin) {
      return res.json({ role: "ADMIN" });
    }

    // Check Shop
    const shop = await prisma.shop.findUnique({
      where: { clerkUserId },
    });

    if (shop) {
      return res.json({ role: "SHOP" });
    }

    return res.json({ role: "NONE" });
  } catch (err) {
    console.error("Role check failed:", err);
    res.status(500).json({ error: "Failed to check role" });
  }
});

export default router;