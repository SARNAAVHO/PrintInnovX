import prisma from "../prisma.js";

export async function ensureAdmin(req, res) {
  try {
    const auth = req.auth(); // ✅ NEW API

    if (!auth?.userId) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const clerkUserId = auth.userId;

    const email =
      auth.sessionClaims?.email ||
      auth.sessionClaims?.primary_email ||
      auth.sessionClaims?.email_address;

    if (!email) {
      return res.status(400).json({ error: "Email not found in Clerk claims" });
    }

    const admin = await prisma.admin.upsert({
      where: { clerkUserId },
      update: {
        lastLoginAt: new Date(),
      },
      create: {
        clerkUserId,
        email,
        role: "ADMIN",
        lastLoginAt: new Date(),
      },
    });

    return res.json({ success: true, adminId: admin.id });
  } catch (err) {
    console.error("Ensure admin failed:", err);
    return res.status(500).json({ error: "Failed to ensure admin" });
  }
}
