import { CheckCircle2, Copy, Download } from "lucide-react";
import { toast } from "sonner";

export default function RegisterSuccessCard({ data }) {
  const copy = (value, label) => {
    navigator.clipboard.writeText(value);
    toast.success(`${label} copied`);
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-md px-10 py-8 mt-10">

      {/* Card Header */}
      <div className="flex items-center gap-3 mb-3">
        <CheckCircle2 className="text-green-600" size={26} />
        <h2 className="text-lg font-semibold text-gray-900">
          Device Registered Successfully!
        </h2>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Follow the steps below to set up your print agent
      </p>

      {/* Summary */}
      <div className="bg-gray-50 rounded-md px-5 py-4 mb-6 space-y-5">
        <div>
          <div className="text-sm text-gray-500">Shop Name</div>
          <div className="text-base text-gray-900 font-medium">
            {data.shopName}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-500">Device Name</div>
          <div className="text-base text-gray-900 font-medium">
            {data.deviceName}
          </div>
        </div>
      </div>

      {/* Device ID */}
      <div className="mb-5">
        <label className="text-sm font-medium text-gray-800 block mb-1">
          Device ID
        </label>

        <div className="relative">
          <input
            readOnly
            value={data.deviceId}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-2 pr-10 text-sm"
          />
          <button
            onClick={() => copy(data.deviceId, "Device ID")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Auth Token */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-800 block mb-1">
          Authentication Token
        </label>

        <div className="relative">
          <input
            readOnly
            value={data.authToken}
            className="w-full border border-gray-300 bg-gray-50 rounded-md px-3 py-2 pr-10 text-sm tracking-widest"
          />
          <button
            onClick={() => copy(data.authToken, "Authentication Token")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Copy size={16} />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          Keep this token secure. You’ll need it to configure the print agent.
        </p>
      </div>

      {/* Next Steps */}
      <div className="mb-6">
        <div className="font-semibold text-gray-900 mb-2">
          Next Steps:
        </div>
        <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
          <li>Download and install the Print Agent on your computer</li>
          <li>Configure the agent with your Device ID and Auth Token</li>
          <li>Download and print the QR code to attach to your printer</li>
          <li>Users can now scan the QR code to print!</li>
        </ol>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-5">
        <a
          href="/download"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Download size={16} />
          Download Agent
        </a>

        <button
          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Download size={16} />
          Download QR Code
        </button>
      </div>

      <a
        href="/admin"
        className="block w-full text-center border border-gray-300 py-3 rounded-md text-sm text-gray-700 hover:bg-gray-50"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
