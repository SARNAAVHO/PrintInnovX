export async function activateAgent(deviceId, authToken) {
  const base = "http://localhost:4000";

  // 1️⃣ Auth → agentToken
  const authRes = await fetch(`${base}/api/agent/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId, authToken })
  }).then(r => r.json());

  if (authRes.error) throw new Error(authRes.error);

  // 2️⃣ Register → registrationToken
  const regRes = await fetch(`${base}/api/agent/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceId })
  }).then(r => r.json());

  return {
    agentToken: authRes.agentToken,
    registrationToken: regRes.token
  };
}
