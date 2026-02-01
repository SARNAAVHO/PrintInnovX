"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import DeviceItem from "./DeviceItem";
import { fetchAdminDevices } from "@/lib/api";

export default function DevicesCard() {
  const { getToken } = useAuth();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();
        const data = await fetchAdminDevices(token);
        setDevices(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [getToken]);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="font-semibold mb-4">Registered Devices</h2>

      <div className="space-y-4">
        {devices.length === 0 && (
          <p className="text-slate-400">No devices found</p>
        )}

        {devices.map(device => (
          <DeviceItem
            key={device.id}
            id={device.id}
            name={device.shopName}
            printer={device.printerName}
            status={device.status}
            lastSeen={device.lastSeen}
          />
        ))}
      </div>
    </div>
  );
}
