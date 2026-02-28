"use client";

import { QrCode, X, Cpu, Clock, HardDrive, ShieldCheck, Key } from "lucide-react";
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
  link.download = `${shopName}-qr.png`;
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
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  }

  const isOnline = status === "online";

  return (
    <>
      <div
        onClick={openDetail}
        className="group flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <div className={`p-3.5 rounded-2xl border transition-all duration-500 ${isOnline ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/5 text-slate-600 border-white/5'}`}>
            <HardDrive size={20} />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-tight">{name}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 flex items-center gap-1">
                <Cpu size={10} /> {printer}
              </span>
              <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500 flex items-center gap-1">
                <Clock size={10} /> {formatLastSeen(lastSeen)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
            isOnline ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-slate-600 border-white/5"
          }`}>
            {isOnline && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              </span>
            )}
            {status}
          </div>

          <button
            onClick={() => downloadDeviceQR(id, name)}
            className="p-3 bg-white/5 text-slate-500 hover:text-indigo-400 hover:bg-white/10 rounded-xl transition-all border border-white/5 cursor-pointer"
          >
            <QrCode size={18} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-[#05071a]/90 backdrop-blur-xl transition-opacity" onClick={() => setOpen(false)} />
          
          <div className="relative bg-[#0b1026] border border-white/10 rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                  <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="font-black text-white text-xl tracking-tight uppercase italic">Access Panel</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Secure Credential View</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-3 hover:bg-white/5 rounded-full text-slate-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="p-10 space-y-8">
              {loading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-4">
                  <div className="w-10 h-10 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 animate-pulse">Decrypting Keys...</p>
                </div>
              ) : detail ? (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 ml-1 flex items-center gap-2">
                       <Key size={12} /> Hardware ID
                    </label>
                    <code className="block w-full bg-black/40 border border-white/5 p-5 rounded-[1.5rem] text-slate-300 font-mono text-xs break-all shadow-inner leading-relaxed">
                      {detail.deviceId}
                    </code>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 ml-1 flex items-center gap-2">
                       <ShieldCheck size={12} /> Auth Token
                    </label>
                    <code className="block w-full bg-indigo-500/[0.03] border border-indigo-500/20 p-5 rounded-[1.5rem] text-indigo-400 font-mono text-xs break-all leading-relaxed">
                      {detail.authToken}
                    </code>
                  </div>

                  <button
                    onClick={() => setOpen(false)}
                    className="w-full py-5 rounded-[2rem] bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-500 transition-all active:scale-95 shadow-xl shadow-indigo-600/20 cursor-pointer"
                  >
                    Close Session
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