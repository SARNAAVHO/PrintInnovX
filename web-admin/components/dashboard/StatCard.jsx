"use client";

import { ArrowUpRight } from "lucide-react";

export default function StatCard({ title, value, icon, color = "indigo" }) {
  const colorMap = {
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-indigo-500/10",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-amber-500/10",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-rose-500/10",
  };

  return (
    <div className="group relative bg-[#0b0f2a] rounded-[2.5rem] p-8 border border-white/5 transition-all duration-500 hover:bg-[#0e1436] hover:border-white/10 hover:-translate-y-1.5 cursor-pointer overflow-hidden shadow-2xl">
      
      {/* Background Accent Glow - Appears on Hover */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 ${colorMap[color].split(' ')[1]}`} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header: Icon & External Link Indicator */}
        <div className="flex items-start justify-between mb-8">
          <div className={`p-3 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg] ${colorMap[color] || colorMap.indigo}`}>
            {icon}
          </div>
          <ArrowUpRight size={16} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 leading-none">
            {title}
          </p>
          <h3 className="text-3xl font-black text-white tracking-tighter italic leading-tight">
            {value}
          </h3>
        </div>

        {/* Live Indicator Dot */}
        <div className="mt-5 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${colorMap[color].split(' ')[1]}`}></span>
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colorMap[color].split(' ')[0].replace('text', 'bg')}`}></span>
          </span>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Real-time Feed</p>
        </div>
      </div>
    </div>
  );
}