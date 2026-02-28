import { Printer, Home, Activity } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="bg-[#05071a]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand/Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-indigo-600/10 p-2 rounded-lg border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Printer size={20} className="text-indigo-400 group-hover:text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tighter text-white uppercase italic">
              PrintInnov<span className="text-indigo-500">X</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.1em]">Terminal Active</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer active:scale-95"
          >
            <Home size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            Exit to Home
          </Link>
          
          {/* Optional: User Avatar or Quick Settings placeholder */}
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[1px] cursor-pointer hover:opacity-80 transition-opacity">
            <div className="h-full w-full rounded-full bg-[#05071a] flex items-center justify-center overflow-hidden">
               <Activity size={12} className="text-indigo-400" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}