import jwt from "jsonwebtoken";

export default function agentAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(
      token,
      process.env.AGENT_JWT_SECRET
    );

    if (payload.type !== "print-agent") {
      return res.status(401).json({ error: "Invalid agent token" });
    }

    req.agent = {
      deviceId: payload.deviceId,
    };

    next();
  } catch (err) {
    console.error("Agent auth error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
