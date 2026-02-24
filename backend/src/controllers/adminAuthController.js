import prisma from "../prisma.js";

const ALLOWED_ADMIN_EMAILS = [
  "piyush30052004@email.com",
  "cofounder@email.com",
];

export async function ensureAdmin(req, res) {
  try {
    const auth = req.auth();

    if (!auth?.userId) {
      return res.status(401).json({ error: "Unauthenticated" });
    }

    const clerkUserId = auth.userId;
    const email =
      auth.sessionClaims?.email ||
      auth.sessionClaims?.primary_email ||
      auth.sessionClaims?.email_address;

    if (!email) {
      return res.status(400).json({ error: "Email not found" });
    }

    // ✅ Only allow specific emails
    if (!ALLOWED_ADMIN_EMAILS.includes(email)) {
      return res.status(403).json({ error: "Not allowed as admin" });
    }

    const admin = await prisma.admin.upsert({
      where: { clerkUserId },
      update: { lastLoginAt: new Date() },
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