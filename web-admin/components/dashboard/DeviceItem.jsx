"use client";

import { QrCode, X, Cpu, Clock, HardDrive, ShieldCheck } from "lucide-react";
import { useState } from "react";
import QRCode from "qrcode";
import { fetchAdminDeviceDetail } from "@/lib/api";

function formatLastSeen(date) {
  if (!date) return "Never";
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

async function downloadDeviceQR(deviceId, shopName) {
  const PUBLIC_BASE = process.env.NEXT_PUBLIC_PUBLIC_APP_URL || "http://localhost:3000";
  const qrUrl = `${PUBLIC_BASE}/p/${deviceId}`;
  const qrDataUrl = await QRCode.toDataURL(qrUrl, { 
    width: 600, 
    margin: 2,
    color: { dark: "#0f172a", light: "#ffffff" } 
  });

  const link = document.createElement("a");
  link.href = qrDataUrl;
  link.download = `${shopName+deviceId}-qr.png`;
  link.click();
}

export default function DeviceItem({ id, name, printer, status, lastSeen }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  async function openDetail() {
    if (!id) return;
    setOpen(true);
    setLoading(true);
    try {
      const data = await fetchAdminDeviceDetail(id);
      setDetail(data);
    } catch (err) {
      console.error("Device detail error:", err);
    } finally {
      setLoading(false);
    }
  }

  const isOnline = status === "online";

  return (
    <>
      {/* Device Card */}
      <div
        onClick={openDetail}
        className="group relative flex items-center justify-between p-5 mb-3 bg-white border border-slate-200 rounded-2xl transition-all duration-200 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-500/5 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-colors ${isOnline ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
            <HardDrive size={22} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 leading-tight">{name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <Cpu size={12} /> {printer}
              </span>
              <span className="text-[10px] text-slate-300">•</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={12} /> {formatLastSeen(lastSeen)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {/* Animated Status Badge */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
            isOnline ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
          }`}>
            {isOnline && <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>}
            {status}
          </div>

          <button
            onClick={() => downloadDeviceQR(id, name)}
            className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100"
            title="Download QR"
          >
            <QrCode size={20} />
          </button>
        </div>
      </div>

      {/* Modern Modal Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="font-bold text-slate-800 text-xl tracking-tight">Access Credentials</h2>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {loading ? (
                <div className="py-10 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 font-medium">Fetching secure keys...</p>
                </div>
              ) : detail ? (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Device Identity</label>
                    <div className="group relative">
                      <code className="block w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-700 font-mono text-sm break-all">
                        {detail.deviceId}
                      </code>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Security Token</label>
                    <div className="relative">
                      <code className="block w-full bg-slate-900 p-4 rounded-2xl text-indigo-300 font-mono text-xs leading-relaxed break-all shadow-inner">
                        {detail.authToken}
                      </code>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
                  >
                    Done
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}