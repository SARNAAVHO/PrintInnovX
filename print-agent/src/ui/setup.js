const { useState, useEffect } = React;

function Setup() {
  const [deviceId, setDeviceId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    window.agentAPI.onLog((msg) => {
      setLogs(prev => [...prev, msg]);
    });
  }, []);

  async function activate() {
    try {
      setStatus("loading");
      setError("");

      const base = "http://localhost:4000";

      // 1️⃣ Authenticate
      const authRes = await fetch(`${base}/api/agent/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, authToken })
      }).then(r => r.json());

      if (authRes.error) throw new Error(authRes.error);

      // 2️⃣ Register
      const regRes = await fetch(`${base}/api/agent/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId })
      }).then(r => r.json());

      // 3️⃣ Save config
      window.agentAPI.saveConfig({
        backendUrl: base,
        printerName: authRes.deviceName,
        pollIntervalMs: 5000,
        deviceId,
        agentToken: authRes.agentToken,
        registrationToken: regRes.token
      });

      // 4️⃣ Start agent
      window.agentAPI.startAgent();
      setStatus("running");

    } catch (e) {
      setError(e.message);
      setStatus("idle");
    }
  }

  /* ---------- LOG VIEW ---------- */
  if (status === "running") {
    return React.createElement(
      "div",
      { className: "card logs" },
      React.createElement("h3", null, "Printer Running"),
      React.createElement(
        "div",
        { className: "log-box" },
        logs.map((l, i) =>
          React.createElement("div", { key: i }, l)
        )
      )
    );
  }

  /* ---------- SETUP FORM ---------- */
  return React.createElement(
    "div",
    { className: "card" },
    React.createElement("h2", null, "Activate Printer"),
    React.createElement("p", { className: "subtitle" },
      "Enter the device credentials provided by admin"
    ),

    React.createElement("input", {
      placeholder: "Device ID",
      value: deviceId,
      onChange: e => setDeviceId(e.target.value)
    }),

    React.createElement("input", {
      type: "password",
      placeholder: "Device Auth Token",
      value: authToken,
      onChange: e => setAuthToken(e.target.value)
    }),

    React.createElement("button", {
      onClick: activate,
      disabled: status === "loading"
    }, status === "loading" ? "Activating..." : "Activate Printer"),

    error && React.createElement("p", { className: "error" }, error)
  );
}

ReactDOM.createRoot(document.getElementById("root"))
  .render(React.createElement(Setup));
