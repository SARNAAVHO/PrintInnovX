"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  CircleDashed, 
  Receipt,
  TrendingUp,
  Layers,
  Search
} from "lucide-react";
import { fetchAdminJobs } from "@/lib/api";

export default function JobsCard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminJobs();
        setJobs(data);
      } catch (err) {
        console.error("Jobs error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "pending":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      default:
        return "text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
    }
  };

  return (
    <div className="bg-[#0b0f2a] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/10">
      {/* Header */}
      <div className="p-8 pb-6 flex items-center justify-between border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-black text-white tracking-tight italic uppercase">Recent Jobs</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Live Logs</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Real-time telemetry</p>
        </div>
        <div className="p-3 bg-white/5 rounded-2xl text-slate-400 border border-white/5">
          <Receipt size={20} strokeWidth={1.5} />
        </div>
      </div>

      {/* List Container */}
      <div className="p-4 h-[450px] overflow-y-auto scrollbar-hide">
        <div className="space-y-2">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center py-20 gap-4">
              <CircleDashed className="animate-spin text-indigo-500" size={32} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Syncing database</span>
            </div>
          ) : jobs.length === 0 ? (
            <div className="py-20 flex flex-col items-center text-center">
              <div className="p-5 bg-white/5 rounded-[2rem] text-slate-700 mb-4 border border-white/5">
                <FileText size={40} strokeWidth={1} />
              </div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Zero print cycles detected</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div
                key={job.id}
                className="group flex justify-between items-center p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  {/* Status-specific Icon */}
                  <div className="relative">
                    <div className="p-3.5 bg-white/5 text-slate-400 rounded-2xl group-hover:text-white transition-colors border border-white/5">
                      <FileText size={20} />
                    </div>
                    {job.status === "completed" && (
                      <div className="absolute -bottom-1 -right-1 bg-[#0b0f2a] p-0.5 rounded-full">
                        <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-500/10" />
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-100 text-sm tracking-tight mb-1 truncate max-w-[150px]">
                      {job.fileName}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                      <span className="flex items-center gap-1"><Layers size={10} /> {job.pages} pgs</span>
                      <span className="w-1 h-1 bg-slate-800 rounded-full" />
                      <span>{job.copies}x {job.colorMode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-600">₹</span>
                    <p className="text-lg font-black text-white leading-none tracking-tighter">
                      {job.price}
                    </p>
                  </div>
                  <div className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${getStatusStyle(job.status)}`}>
                    {job.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Footer Utility */}
      <div className="p-6 bg-white/[0.02] border-t border-white/5 text-center">
         <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-400 transition-colors cursor-pointer">
            View full log history
         </button>
      </div>
    </div>
  );
}