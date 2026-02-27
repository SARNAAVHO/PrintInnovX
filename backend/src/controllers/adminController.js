import prisma from "../prisma.js";
const OFFLINE_THRESHOLD_MS = 60 * 1000; // 60 seconds

/**
 * GET /api/admin/stats
 */
export async function getAdminStats(req, res) {
  try {
    const [
      totalJobs,
      revenueAgg,
      totalDevices,
      onlineDevices,
    ] = await Promise.all([
      prisma.printJob.count(),

      prisma.printJob.aggregate({
        _sum: { amount: true },
      }),

      prisma.device.count({
        where: { isActive: true },
      }),

      prisma.device.count({
        where: {
          isActive: true,
          isOnline: true,
        },
      }),
    ]);

    res.json({
      totalJobs,
      totalRevenue: (revenueAgg._sum.amount || 0) / 100,
      totalDevices,
      onlineDevices,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ error: "Failed to fetch admin stats" });
  }
}

/**
 * GET /api/admin/devices
 */
export async function getAdminDevices(req, res) {
  try {
    const devices = await prisma.device.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    const now = Date.now();

    res.json(
      devices.map(d => {
        const isOnline =
          d.lastSeenAt &&
          now - new Date(d.lastSeenAt).getTime() < OFFLINE_THRESHOLD_MS;

        return {
          id: d.id,
          shopName: d.shopName,
          printerName: d.deviceName,
          status: isOnline ? "online" : "offline",
          lastSeen: d.lastSeenAt,
        };
      })
    );
  } catch (err) {
    console.error("Admin devices error:", err);
    res.status(500).json({ error: "Failed to fetch devices" });
  }
}

/**
 * GET /api/admin/jobs
 */
export async function getAdminJobs(req, res) {
  try {
    const jobs = await prisma.printJob.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        Device: true,
      },
    });

    res.json(
      jobs.map(j => ({
        id: j.id,
        deviceId: j.deviceId,
        deviceName: j.Device?.deviceName || "Unknown Device",

        fileName:
          Array.isArray(j.files) && j.files.length > 0
            ? j.files[0].originalName || "Unknown File"
            : "Unknown File",

        pages: j.totalPages || 1,
        copies: j.copies || 1,
        colorMode: j.color ? "COLOR" : "BW",
        price: j.amount ? j.amount / 100 : 0,
        status: j.status,
        createdAt: j.createdAt,
      }))
    );
  } catch (err) {
    console.error("Admin jobs error:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

/**
 * GET /api/admin/devices/:deviceId
 * Admin-only: returns deviceId + authToken
 */
export async function getAdminDeviceDetail(req, res) {
  try {
    const { deviceId } = req.params;

    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.json({
      deviceId: device.id,
      shopName: device.shopName,
      deviceName: device.deviceName,
      authToken: device.authToken,
      isOnline: device.isOnline,
      lastSeenAt: device.lastSeenAt,
      isActive: device.isActive,
      createdAt: device.createdAt,
    });
  } catch (err) {
    console.error("Admin device detail error:", err);
    res.status(500).json({ error: "Failed to fetch device detail" });
  }
}