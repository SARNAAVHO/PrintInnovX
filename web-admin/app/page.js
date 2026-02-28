import Link from "next/link";
import { Printer, Shield, BarChart3, ArrowRight, Activity, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#05071a] text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative flex items-center justify-center px-6">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <Activity size={14} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">System Status: Operational</span>
          </div>
          
          <div className="flex flex-col items-center justify-center gap-4">
             <div className="p-5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 mb-2">
                <Printer size={48} strokeWidth={1.5} className="text-white" />
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic italic animate-in fade-in slide-in-from-bottom-4 duration-700">
               PrintInnov<span className="text-indigo-500">X</span> <span className="text-slate-500 not-italic font-light">Admin</span>
             </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
            The next-generation command center for distributed printing networks. 
            Monitor revenue, manage hardware, and scale your fleet.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            {
              title: "Secure Control",
              desc: "Military-grade credential management for every node in your network.",
              icon: <Shield size={24} />,
              color: "text-emerald-400",
              bg: "bg-emerald-400/10"
            },
            {
              title: "Live Analytics",
              desc: "Real-time revenue tracking and job telemetry with sub-second latency.",
              icon: <BarChart3 size={24} />,
              color: "text-indigo-400",
              bg: "bg-indigo-400/10"
            },
            {
              title: "Fleet Monitoring",
              desc: "Instant heartbeat detection for every printer in your global fleet.",
              icon: <Zap size={24} />,
              color: "text-blue-400",
              bg: "bg-blue-400/10"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-md hover:bg-white/[0.06] hover:border-white/10 transition-all cursor-default animate-in fade-in zoom-in-95 duration-700"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-black tracking-tight mb-2 italic uppercase tracking-wider">{feature.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-16 flex flex-col items-center gap-4">
          <Link
            href="/admin"
            className="group relative inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xl shadow-indigo-500/20"
          >
            Enter Command Center
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
            Authorization Required
          </p>
        </div>

      </div>
    </div>
  );
}