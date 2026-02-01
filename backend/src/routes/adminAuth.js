import express from "express";
import { requireAuth } from "@clerk/express";
import { ensureAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

router.post("/ensure", requireAuth(), ensureAdmin);

export default router;
