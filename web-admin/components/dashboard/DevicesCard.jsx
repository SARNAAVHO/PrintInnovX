"use client";

import { useEffect, useState } from "react";
import { Laptop, RefreshCw, Plus } from "lucide-react";
import DeviceItem from "./DeviceItem";
import { fetchAdminDevices } from "@/lib/api";

export default function DevicesCard() {
  const [devices, setDevices] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function load() {
    setIsRefreshing(true);
    try {
      const data = await fetchAdminDevices();
      setDevices(data);
    } catch (err) {
      console.error("Devices error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden">
      {/* Header Section */}
      <div className="p-8 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Registered Devices
            </h2>
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            Manage and monitor your active printing nodes
          </p>
        </div>

        <button 
          onClick={load}
          disabled={isRefreshing}
          className={`p-2.5 rounded-xl border border-slate-100 text-slate-500 transition-all hover:bg-slate-50 active:scale-95 ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="px-4 pb-8">
        <div className="space-y-1">
          {devices.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-300">
                <Laptop size={32} />
              </div>
              <h3 className="text-slate-900 font-semibold">No devices found</h3>
              <p className="text-sm text-slate-400 max-w-[200px] mt-1">
                Once you register a device, it will appear here in the list.
              </p>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                <Plus size={16} /> Add First Device
              </button>
            </div>
          ) : (
            <div className="mt-4">
               {/* Minimalist labels for the list */}
              <div className="grid grid-cols-2 px-4 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Device Details</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right pr-14">Status & Tools</span>
              </div>
              
              <div className="space-y-1">
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
          )}
        </div>
      </div>

      {/* Footer Info */}
      {devices.length > 0 && (
        <div className="bg-slate-50/50 border-t border-slate-100 px-8 py-4">
          <p className="text-[11px] text-slate-400 font-medium italic">
            Showing {devices.length} registered terminal{devices.length === 1 ? '' : 's'}. Click a device to view security credentials.
          </p>
        </div>
      )}
    </div>
  );
}