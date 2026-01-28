"use client";

import { useState } from "react";
import { toast } from "sonner";
import { registerDevice } from "../../lib/api";
import RegisterSuccessCard from "./RegisterSuccessCard";

export default function RegisterDeviceForm() {
  const [shopName, setShopName] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopName.trim() || !deviceName.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const data = await registerDevice({
        shopName,
        deviceName,
      });

      setSuccessData(data);
      toast.success("Device registered successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
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
            className="w-full border rounded-md px-4 py-2.5"
          />
          <p className="mt-1 text-xs text-gray-500"> This will be displayed to users when they scan the QR code </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Device Name
          </label>
          <input
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="e.g. HP LaserJet Pro M404n"
            className="w-full border rounded-md px-4 py-2.5"
          />
          <p className="mt-1 text-xs text-gray-500"> Internal identifier for your device </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-medium py-3 rounded-md cursor-pointer"
        >
          {loading ? "Registering..." : "Register Device"}
        </button>
      </form>
    </div>
  );
}
