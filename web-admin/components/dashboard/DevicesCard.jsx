"use client";

import { useEffect, useState } from "react";
import { Laptop, RefreshCw, Plus, Terminal } from "lucide-react";
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

  useEffect(() => { load(); }, []);

  return (
    <div className="bg-[#0b0f2a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/10">
      {/* Header Section */}
      <div className="p-8 pb-4 flex items-center justify-between border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-black text-white tracking-tight italic uppercase">
              Registered Nodes
            </h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
               <Terminal size={12} className="text-indigo-400" />
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{devices.length} Active</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Network hardware telemetry
          </p>
        </div>

        <button 
          onClick={load}
          disabled={isRefreshing}
          className={`p-3 rounded-2xl border border-white/5 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={18} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 h-[450px] overflow-y-auto scrollbar-hide">
        {devices.length === 0 && !isRefreshing ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mb-6 text-slate-700">
              <Laptop size={40} strokeWidth={1} />
            </div>
            <h3 className="text-white font-black uppercase tracking-widest text-sm">No Nodes Detected</h3>
            <button className="mt-6 flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all cursor-pointer">
              <Plus size={14} /> Provision New Device
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between px-4 mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Hardware Identity</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">Connectivity</span>
            </div>
            
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
        )}
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5">
        <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest text-center">
          Terminal Status Sync: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}