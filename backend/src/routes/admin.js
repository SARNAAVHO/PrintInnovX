import express from "express";
import {
  getAdminStats,
  getAdminDevices,
  getAdminDeviceDetail,
  getAdminJobs,
} from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { ensureAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

/**
 * ADMIN DASHBOARD ROUTES (PROTECTED)
 */
router.get("/stats", adminAuth, getAdminStats);
router.get("/devices", adminAuth, getAdminDevices);
router.get("/devices/:deviceId", adminAuth, getAdminDeviceDetail);
router.get("/jobs", adminAuth, getAdminJobs);
router.post("/ensure", adminAuth, ensureAdmin);

export default router;
