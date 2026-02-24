const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * DEVICE REGISTRATION (already used)
 */
export async function registerDevice({ shopName, deviceName }) {
  const res = await fetch(`${API_BASE}/api/devices/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shopName, deviceName }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to register device");
  }

  return data;
}

/**
 * ADMIN – DASHBOARD STATS
 */
export async function fetchAdminStats(token) {
  const res = await fetch(`${API_BASE}/api/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch stats");
  }

  return data;
}
/**
 * ADMIN – DEVICES LIST
 */
export async function fetchAdminDevices(token) {
  const res = await fetch(`${API_BASE}/api/admin/devices`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch admin devices");
  }

  return data;
}

/**
 * ADMIN – RECENT JOBS
 */
export async function fetchAdminJobs(token) {
  const res = await fetch(`${API_BASE}/api/admin/jobs`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch admin jobs");
  }

  return data;
}

/**
 * PUBLIC – FETCH DEVICE DETAILS (QR PAGE)
 */
export async function fetchPublicDevice(deviceId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/devices/${deviceId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch device");
  }

  return data;
}

/**
 * ADMIN – DEVICE SECRET DETAILS
 */
export async function fetchAdminDeviceDetail(deviceId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/devices/${deviceId}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch device details");
  }

  return data;
}