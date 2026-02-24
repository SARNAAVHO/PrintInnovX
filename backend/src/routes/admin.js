import express from "express";
import {
  getAdminStats,
  getAdminDevices,
  getAdminDeviceDetail,
  getAdminJobs,
} from "../controllers/adminController.js";
// import { adminAuth } from "../middleware/adminAuth.js";
// import { ensureAdmin } from "../controllers/adminAuthController.js";

const router = express.Router();

/**
 * ADMIN DASHBOARD ROUTES (PROTECTED)
 */
router.get("/stats", getAdminStats);
router.get("/devices", getAdminDevices);
router.get("/devices/:deviceId", getAdminDeviceDetail);
router.get("/jobs", getAdminJobs);
// router.post("/ensure", ensureAdmin);

export default router;
