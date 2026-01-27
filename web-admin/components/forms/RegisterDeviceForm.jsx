"use client";

import { useState } from "react";
import { toast } from "sonner";
import RegisterSuccessCard from "./RegisterSuccessCard";

export default function RegisterDeviceForm() {
  const [shopName, setShopName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shopName.trim() || !deviceName.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // 🔥 Mock backend response (replace later)
    setSuccessData({
      shopName,
      deviceName,
      deviceId: "69914013-55e9-4dc5-8efe-b23001163fd3",
      authToken:
        "***************************************",
    });
  };

  if (successData) {
    return <RegisterSuccessCard data={successData} />;
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-md px-10 py-8">

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          Register New Device
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Register your printer to start accepting print jobs
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Shop Name
          </label>
          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="e.g. Campus Print Shop"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            This will be displayed to users when they scan the QR code
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Device Name
          </label>
          <input
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="e.g. HP LaserJet Pro M404n"
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:ring-2 focus:ring-indigo-500"
          />
          <p className="mt-1 text-xs text-gray-500">
            Internal identifier for your device
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-md"
        >
          Register Device
        </button>
      </form>
    </div>
  );
}
