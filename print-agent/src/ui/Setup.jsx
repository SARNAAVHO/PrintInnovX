import { useState } from "react";
import { activateAgent } from "./api";
import "./styless.css";

export default function Setup() {
  const [deviceId, setDeviceId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleActivate() {
    try {
      setStatus("loading");
      setError("");

      const result = await activateAgent(deviceId, authToken);

      window.agentAPI.writeConfig({
        backendUrl: "http://localhost:4000",
        printerName: "Print Agent",
        pollIntervalMs: 5000,
        deviceId,
        registrationToken: result.registrationToken,
        agentToken: result.agentToken
      });

      setStatus("success");
    } catch (e) {
      setError(e.message);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return <h3>✅ Printer Activated. You may close this window.</h3>;
  }

  return (
    <div>
      <h2>Activate Printer</h2>

      <input
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />

      <input
        placeholder="Device Auth Token"
        type="password"
        value={authToken}
        onChange={(e) => setAuthToken(e.target.value)}
      />

      <button onClick={handleActivate}>Activate</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
