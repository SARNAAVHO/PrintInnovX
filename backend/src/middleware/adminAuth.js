import prisma from "../prisma.js";

export async function adminAuth(req, res, next) {
  try {
    const auth = req.auth(); // ✅ NEW API

    if (!auth?.userId) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const admin = await prisma.admin.findUnique({
      where: { clerkUserId: auth.userId },
    });

    if (!admin) {
      return res.status(403).json({ error: "Admin access denied" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Admin auth error:", err);
    return res.status(500).json({ error: "Admin auth failed" });
  }
}
