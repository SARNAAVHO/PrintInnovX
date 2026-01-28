import { Download, Printer, Monitor, Terminal } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="flex items-center justify-between px-10 py-6 bg-white border-slate-200">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-900">
          <Printer className="text-indigo-600" />
          Download Print Agent
        </div>

        <a
          href="/"
          className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-500 hover:text-white hover:border-none transition"
        >
          Back to Home
        </a>
      </header>

      {/* HERO */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PrintInnovX Agent
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          A lightweight background service that connects your printer to the
          cloud and executes paid print jobs securely.
        </p>
      </section>

      {/* DOWNLOAD CARDS */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {/* WINDOWS */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="text-indigo-600" />
            <h3 className="text-xl font-semibold">Windows</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Compatible with Windows 10, 11, and Server 2019+
          </p>

          <ul className="space-y-3 text-sm text-gray-700 mb-8">
            <li>✅ Automatic startup on boot</li>
            <li>✅ System tray integration</li>
            <li>✅ Native Windows printer support</li>
            <li>✅ Silent background operation</li>
          </ul>

          <a
            href="/agents/printcloud-agent-windows.exe"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex items-center justify-center gap-2 font-medium"
          >
            <Download size={16} />
            Download for Windows
          </a>
        </div>

        {/* LINUX */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="text-indigo-600" />
            <h3 className="text-xl font-semibold">Linux / Raspberry Pi</h3>
          </div>

          <p className="text-gray-600 mb-6">
            Compatible with Ubuntu, Debian, Raspbian, and other distros
          </p>

          <ul className="space-y-3 text-sm text-gray-700 mb-8">
            <li>✅ Systemd service integration</li>
            <li>✅ CUPS printer support</li>
            <li>✅ Low resource footprint</li>
            <li>✅ Perfect for Raspberry Pi</li>
          </ul>

          <a
            href="/agents/printcloud-agent-linux.sh"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex items-center justify-center gap-2 font-medium"
          >
            <Download size={16} />
            Download for Linux
          </a>
        </div>
      </section>

      {/* INSTALLATION */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-xl border shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Installation & Setup
          </h2>

          {/* WINDOWS SETUP */}
          <div className="mb-8">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Monitor size={18} /> Windows Setup
            </h3>

            <ol className="list-decimal ml-6 text-sm text-gray-700 space-y-2">
              <li>Download and run <code className="bg-gray-100 px-2 py-1 rounded">printcloud-agent-windows.exe</code></li>
              <li>Follow the installation wizard</li>
              <li>Enter your Device ID and Authentication Token</li>
              <li>Agent starts automatically in background</li>
              <li>Check system tray for PrintCloud icon</li>
            </ol>
          </div>

          {/* LINUX SETUP */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Terminal size={18} /> Linux Setup
            </h3>

            <ol className="list-decimal ml-6 text-sm text-gray-700 space-y-2">
              <li>Download the installer script</li>
              <li>
                Make executable:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  chmod +x printcloud-agent-linux.sh
                </code>
              </li>
              <li>
                Run installer:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  sudo ./printcloud-agent-linux.sh
                </code>
              </li>
              <li>Enter Device ID and Auth Token when prompted</li>
              <li>Agent installs as system service</li>
              <li>
                Check status:{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  sudo systemctl status printcloud-agent
                </code>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CONFIGURATION */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-white rounded-xl border shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-4">Configuration</h2>

          <p className="text-gray-600 mb-4">
            The agent requires two pieces of information from your device
            registration:
          </p>

          <div className="space-y-3 text-sm text-gray-700">
            <p>
              <strong>Device ID:</strong> Unique identifier for your printer
            </p>
            <p>
              <strong>Auth Token:</strong> Security token for authentication
            </p>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            These are provided when you register a device. Keep them secure!
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="text-center pb-20">
        <p className="text-gray-600 mb-4">
          Don&apos;t have a device registered yet?
        </p>

        <a
          href="/register"
          className="inline-block border border-gray-300 px-6 py-3 rounded-md text-gray-700 hover:bg-indigo-600 hover:border-none hover:text-white"
        >
          Register a Device First
        </a>
      </div>
    </div>
  );
}
