import { Clerk } from "@clerk/clerk-sdk-node";

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "No auth header" });
    }

    const token = authHeader.replace("Bearer ", "");

    const session = await clerk.verifyToken(token);

    req.clerkUserId = session.sub;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}