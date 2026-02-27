"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { Loader2, Copy, Download, CheckCircle2, ArrowLeft, Printer, Shieldflex, Cpu, Globe, Lock } from "lucide-react";
import Link from "next/link";

export default function AddDevicePage() {
  const router = useRouter();
  const { apiFetch } = useApi();

  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdDevice, setCreatedDevice] = useState(null);

  const [copiedId, setCopiedId] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const createDevice = async () => {
    if (!deviceName.trim()) return;
    setLoading(true);

    try {
      const res = await apiFetch("/api/devices/create", {
        method: "POST",
        body: JSON.stringify({ deviceName }),
      });

      if (!res.ok) return;

      const data = await res.json();
      setCreatedDevice(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  /* =========================
      SUCCESS VIEW (The Receipt)
  ========================== */
  if (createdDevice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#05071a] px-6 py-12 font-sans selection:bg-emerald-500/30">
        <div className="relative w-full max-w-lg">
          {/* Decorative Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-[3rem] blur opacity-20" />
          
          <div className="relative bg-[#0b0f2a] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white italic">Node Deployed.</h2>
              <p className="text-slate-500 mt-2 text-sm font-medium tracking-tight">
                Secure credentials generated for <span className="text-emerald-400">{deviceName}</span>
              </p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Hardware UUID</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 px-5 py-4 rounded-2xl group hover:border-emerald-500/30 transition-all">
                  <code className="text-xs font-mono text-emerald-400">{createdDevice.id}</code>
                  <button onClick={() => copy(createdDevice.id, "id")} className="text-slate-500 hover:text-white transition-colors">
                    {copiedId ? <span className="text-[10px] font-black text-emerald-500">COPIED</span> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Access Token</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 px-5 py-4 rounded-2xl group hover:border-emerald-500/30 transition-all">
                  <code className="text-[10px] font-mono text-slate-400 break-all line-clamp-1 pr-6">{createdDevice.authToken}</code>
                  <button onClick={() => copy(createdDevice.authToken, "token")} className="text-slate-500 hover:text-white transition-colors shrink-0">
                    {copiedToken ? <span className="text-[10px] font-black text-emerald-500">COPIED</span> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${createdDevice.id}`)}
                className="bg-white text-slate-900 py-4 rounded-2xl flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-widest hover:bg-emerald-50 transition-all active:scale-95 shadow-lg cursor-pointer"
              >
                <Download size={16} strokeWidth={3} /> QR Poster
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
              >
                Return to Base
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
      CREATE FORM (The Setup)
  ========================== */
  return (
    <div className="min-h-screen flex flex-col bg-[#05071a] font-sans selection:bg-indigo-500/30">
      
      <div className="p-8">
        <Link href="/dashboard" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md">
          {/* Header Info */}
          <div className="mb-12 text-center">
            <div className="inline-flex p-4 bg-indigo-600/10 text-indigo-500 rounded-[2rem] border border-indigo-500/20 mb-6">
              <Printer size={32} strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white mb-3">
              Deploy <span className="text-indigo-500">Node.</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium tracking-tight max-w-[280px] mx-auto">
              Initialize a new hardware endpoint for your Print-as-a-Service network.
            </p>
          </div>

          {/* Form */}
          <div className="bg-[#0b0f2a] border border-white/5 p-8 rounded-[3rem] shadow-2xl shadow-black/50">
            <div className="mb-8 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2">
                Provide your exact Printer Name and Model
              </label>
              <input
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
                placeholder="e.g. HP DJ 21300 Series"
                className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold"
                onKeyDown={(e) => e.key === 'Enter' && createDevice()}
              />
            </div>

            <button
              onClick={createDevice}
              disabled={loading || !deviceName.trim()}
              className="group w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Initializing Node...
                </>
              ) : (
                <>
                  Register Hardware
                  <Cpu size={18} className="opacity-50 group-hover:rotate-12 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Feature List */}
          <div className="mt-12 grid grid-cols-2 gap-6 opacity-30">
            <div className="flex items-center gap-3">
               <Globe size={14} className="text-slate-400" />
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Sync</span>
            </div>
            <div className="flex items-center gap-3">
               <Lock size={14} className="text-slate-400" />
               <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">AES-256 Auth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}