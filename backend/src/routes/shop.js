import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  const clerkUserId = req.headers["x-clerk-user-id"];

  const shop = await prisma.shop.findUnique({
    where: { clerkUserId },
  });

  if (!shop) {
    return res.status(404).json({ error: "Shop not found" });
  }

  res.json(shop);
});

router.post("/create", async (req, res) => {
  const clerkUserId = req.headers["x-clerk-user-id"];
  const { ownerName, shopName } = req.body;

  const shop = await prisma.shop.create({
    data: {
      clerkUserId,
      ownerName,
      shopName,
    },
  });

  res.json(shop);
});

export default router;