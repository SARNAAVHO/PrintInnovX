const { useState, useEffect } = React;

function Setup() {
  const [deviceId, setDeviceId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    window.agentAPI.onLog((msg) => {
      setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
      // Auto-scroll logic could be added here
    });
  }, []);

  async function activate() {
    try {
      setStatus("loading");
      setError("");
      const base = window.config.API_BASE_URL;

      const authRes = await fetch(`${base}/api/agent/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, authToken })
      }).then(r => r.json());

      if (authRes.error) throw new Error(authRes.error);

      const regRes = await fetch(`${base}/api/agent/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId })
      }).then(r => r.json());

      window.agentAPI.saveConfig({
        backendUrl: base,
        printerName: authRes.deviceName,
        pollIntervalMs: 5000,
        deviceId,
        agentToken: authRes.agentToken,
        registrationToken: regRes.token
      });

      window.agentAPI.startAgent();
      setStatus("running");

    } catch (e) {
      setError(e.message);
      setStatus("idle");
    }
  }

  /* ---------- RUNNING VIEW (LOGS) ---------- */
  if (status === "running") {
    return React.createElement("div", { className: "container" },
      React.createElement("div", { className: "header" },
        React.createElement("div", { className: "status-indicator active" }),
        React.createElement("h2", null, "Agent Live")
      ),
      React.createElement("div", { className: "terminal-container" },
        React.createElement("div", { className: "terminal-header" }, "System Output"),
        React.createElement("div", { className: "log-box" },
          logs.map((l, i) => React.createElement("div", { key: i, className: "log-line" }, l))
        )
      ),
      React.createElement("p", { className: "footer-text" }, "Agent is polling for jobs...")
    );
  }

  /* ---------- SETUP FORM ---------- */
  return React.createElement("div", { className: "container" },
    React.createElement("div", { className: "branding" }, "Aetheriox"),
    React.createElement("div", { className: "card" },
      React.createElement("h2", null, "Activate Node"),
      React.createElement("p", { className: "subtitle" }, "Sync hardware with cloud dashboard"),
      
      React.createElement("div", { className: "input-group" },
        React.createElement("label", null, "Device Identity"),
        React.createElement("input", {
          placeholder: "Enter Device ID",
          value: deviceId,
          onChange: e => setDeviceId(e.target.value)
        })
      ),

      React.createElement("div", { className: "input-group" },
        React.createElement("label", null, "Security Token"),
        React.createElement("input", {
          type: "password",
          placeholder: "••••••••••••",
          value: authToken,
          onChange: e => setAuthToken(e.target.value)
        })
      ),

      React.createElement("button", {
        className: status === "loading" ? "btn-loading" : "",
        onClick: activate,
        disabled: status === "loading"
      }, status === "loading" ? "Establishing Link..." : "Initialize Agent"),

      error && React.createElement("div", { className: "error-box" }, 
        React.createElement("span", null, "⚠️"), 
        error
      )
    )
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Setup));