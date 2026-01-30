import fetch from "node-fetch";

const API_BASE = process.env.API_BASE_URL || "http://localhost:4000";

export async function apiRequest(path, method, token, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

export function sendHeartbeat(token) {
  return apiRequest("/api/agent/heartbeat", "POST", token);
}
