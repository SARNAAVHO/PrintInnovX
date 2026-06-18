import fetch from "node-fetch";
import fs from "fs";
import path from "path";

function getConfig() {
  const configPath = path.resolve("config/agent.json");

  if (!fs.existsSync(configPath)) {
    throw new Error("Agent configuration not found.");
  }

  return JSON.parse(
    fs.readFileSync(configPath, "utf8")
  );
}

export async function apiRequest(pathname, method, token, body) {
  const { backendUrl } = getConfig();

  const res = await fetch(`${backendUrl}${pathname}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && {
        Authorization: `Bearer ${token}`
      })
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}

export function sendHeartbeat(token) {
  return apiRequest(
    "/api/agent/heartbeat",
    "POST",
    token
  );
}