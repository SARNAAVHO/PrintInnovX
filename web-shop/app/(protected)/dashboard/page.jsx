"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useApi } from "@/lib/api";
import Link from "next/link";
import {
  Printer,
  Plus,
  FileText,
  Activity,
  Loader2,
  Home,
  Download,
  Copy,
  Trash2,
  ChevronRight,
  TrendingUp,
  X,
  Lock
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { apiFetch } = useApi();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const res = await apiFetch("/api/shop/dashboard");
        if (!res.ok) {
          router.push("/onboarding");
          return;
        }
        const data = await res.json();
        setShop(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadShop();
  }, [apiFetch, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b0f2a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-indigo-500" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Syncing Nodes...</p>
        </div>
      </div>
    );
  }

  if (!shop) return null;

  const devices = shop.devices || [];
  const jobs = shop.printJobs || [];
  const revenue = jobs.reduce((acc, job) => acc + (job.amount || 0), 0) / 100;

  return (
    <div className="min-h-screen bg-[#05071a] text-white font-sans selection:bg-indigo-500/30">
      
      {/* ================= HEADER (Now Full Width) ================= */}
      <header className="px-6 md:px-12 h-20 flex items-center justify-between border-b border-white/5 sticky top-0 bg-[#05071a]/80 backdrop-blur-md z-40">
        <div className="flex items-center gap-6">
          {/* Logo Section */}
        <Link
          href="/"
          className="group flex items-center gap-3 tracking-tight outline-none shrink-0"
        >
          {/* Icon Logo - Scaled down to match wordmark */}
          <Image 
            src="/images/PXlogo.png" 
            alt="Icon" 
            width={40} 
            height={40} 
            className="rounded-lg object-contain" 
            priority
          />
          
          {/* Wordmark Logo - Fixed height, automatic width */}
          <div className="h-8 flex items-center"> 
            <Image 
              src="/images/PX.png" 
              alt="PrintInnovX" 
              width={120} // Overestimate width to prevent capping
              height={32} // Match the container height
              className="hidden sm:block h-3/4 w-auto object-contain"
              priority 
            />
          </div>
        </Link>
          <div className="h-6 w-px bg-white/10 hidden md:block" />
          <div className="hidden md:flex items-center gap-3">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Dashboard</h2>
            <ChevronRight size={14} className="text-slate-700" />
            <span className="text-sm font-bold text-white/80">{shop.shopName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
           <Link href="/download" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors">
              <Download size={14} /> Agent
           </Link>
           <Link href="/" className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-slate-400 hover:text-white transition-all">
              <Home size={18} />
           </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* WELCOME SECTION */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-2">
              System <span className="text-indigo-500">Overview.</span>
            </h1>
            <p className="text-slate-400 font-medium tracking-tight">Managing fleet for <span className="text-white underline decoration-indigo-500/30 underline-offset-4">{shop.shopName}</span></p>
          </div>
          <Link
              href="/devices/new"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95 text-center justify-center"
            >
              <Plus size={18} />
              Add Printer Node
          </Link>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <StatCard title="Active Fleet" value={devices.length} icon={<Printer />} color="indigo" />
          <StatCard title="Total Jobs" value={jobs.length} icon={<FileText />} color="emerald" />
          <StatCard title="Earnings" value={`₹${revenue.toLocaleString("en-IN")}`} icon={<TrendingUp />} color="amber" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* DEVICES LIST */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">Hardware Grid</h3>
              <div className="h-px flex-1 bg-white/5 mx-6" />
            </div>
            
            {devices.length === 0 ? (
              <div className="h-72 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-center p-8 bg-white/[0.01]">
                <Printer size={40} className="text-slate-800 mb-4" />
                <p className="text-slate-600 font-black uppercase text-[10px] tracking-widest">No nodes detected</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    onClick={() => setSelectedDevice(device)}
                    className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 transition-all hover:bg-white/[0.05] hover:border-indigo-500/40 cursor-pointer overflow-hidden shadow-2xl shadow-black/20"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        <Printer size={22} />
                      </div>
                      <StatusBadge online={device.isOnline} />
                    </div>
                    <p className="font-bold text-white text-xl tracking-tight truncate">{device.deviceName}</p>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2 group-hover:text-indigo-400 transition-colors">Configure System →</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT JOBS */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-600">Recent Traffic</h3>
            <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
              {jobs.length === 0 ? (
                <div className="p-16 text-center text-slate-800 text-[10px] font-black uppercase">Idle</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {jobs.slice(0, 6).map((job) => (
                    <div key={job.id} className="p-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                      <div>
                        <p className="text-sm font-bold text-white mb-1.5">{job.copies} {job.copies === 1 ? 'Copy' : 'Copies'}</p>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${job.color ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5' : 'text-slate-500 border-white/10'}`}>
                          {job.color ? 'Color' : 'B/W'} • {job.status}
                        </span>
                      </div>
                      <p className="text-sm font-black text-white">₹{job.amount / 100}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* DEVICE MODAL */}
      {selectedDevice && (
        <DeviceModal device={selectedDevice} onClose={() => setSelectedDevice(null)} />
      )}
    </div>
  );
}

/* ================= REFINED COMPONENTS ================= */

function StatCard({ title, value, icon, color }) {
  const themes = {
    indigo: "border-indigo-500/20 text-indigo-500 bg-indigo-500/5",
    emerald: "border-emerald-500/20 text-emerald-500 bg-emerald-500/5",
    amber: "border-amber-500/20 text-amber-500 bg-amber-500/5"
  };

  return (
    <div className={`border rounded-[3rem] p-10 relative overflow-hidden group transition-all hover:bg-white/[0.02] ${themes[color]}`}>
      <div className="absolute -right-6 -top-6 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
        <div className="scale-[5]">{icon}</div>
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">{title}</p>
      <p className="text-5xl font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}

function StatusBadge({ online }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${online ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 border-slate-500/20 text-slate-500'}`}>
      <div className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`} />
      <span className="text-[10px] font-black uppercase tracking-tighter">{online ? "Active" : "Offline"}</span>
    </div>
  );
}

function DeviceModal({ device, onClose }) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { apiFetch } = useApi();

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

  const handleDelete = async () => {
    if (!window.confirm("Confirm decommissioning? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await apiFetch(`/api/devices/${device.id}`, { method: "DELETE" });
      if (res.ok) {
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#05071a]/95 backdrop-blur-3xl flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300">
      <div className="bg-[#0b0f2a] w-full max-w-xl border border-white/10 rounded-[3.5rem] p-10 md:p-14 relative shadow-2xl animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
          <X size={20} />
        </button>

        <div className="flex items-center gap-6 mb-12">
          <div className="p-5 bg-indigo-600 rounded-[2rem] shadow-2xl shadow-indigo-600/40">
            <Printer className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-3xl font-black text-white tracking-tighter">{device.deviceName}</h3>
            <div className="flex items-center gap-2 mt-1.5">
               <Lock size={14} className="text-indigo-500" />
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secure Terminal Node</p>
            </div>
          </div>
        </div>

        <div className="space-y-8 mb-12">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">Device UUID</label>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 group hover:border-indigo-500/30 transition-all">
              <code className="text-sm text-indigo-400 font-mono tracking-tight">{device.id}</code>
              <button onClick={() => copy(device.id, "id")} className="text-slate-500 hover:text-white transition-colors">
                {copiedId ? <span className="text-[10px] text-emerald-500 font-black">COPIED</span> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] ml-2">Access Auth Token</label>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-5 group hover:border-indigo-500/30 transition-all">
              <code className="text-[11px] text-slate-400 font-mono break-all line-clamp-1 pr-6">{device.authToken}</code>
              <button onClick={() => copy(device.authToken, "token")} className="text-slate-500 hover:text-white transition-colors shrink-0">
                {copiedToken ? <span className="text-[10px] text-emerald-500 font-black">COPIED</span> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button 
             onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${device.id}`)}
             className="flex items-center justify-center gap-3 bg-white text-slate-900 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all active:scale-95"
          >
            <Download size={18} strokeWidth={3} /> Get QR Code
          </button>
          <button 
             onClick={handleDelete}
             disabled={deleting}
             className="flex items-center justify-center gap-3 bg-red-500/5 text-red-500 border border-red-500/10 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95"
          >
            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
            {deleting ? "Deleting..." : "Delete Device"}
          </button>
        </div>
      </div>
    </div>
  );
}