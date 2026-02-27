"use client";

import Link from "next/link";
import { ArrowRight, Zap, Globe, Sparkles } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-10 px-6 bg-[#0b0f2a]">
      <div className="max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-indigo-500/20">
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Top Icon Badge */}
          <div className="mb-8 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl animate-bounce-slow">
            <Sparkles className="text-white" size={28} />
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight max-w-3xl leading-[1.1]">
            Ready to Scale Your <br />
            <span className="text-indigo-200">Printing Business?</span>
          </h2>

          <p className="text-lg md:text-xl text-indigo-100/80 mb-12 max-w-xl font-medium leading-relaxed">
            Join the cloud printing revolution. Deploy your hardware and start accepting jobs in <span className="text-white font-bold underline decoration-indigo-400 underline-offset-4">under 5 minutes.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/register"
              className="group flex items-center gap-3 bg-white text-indigo-600 font-black uppercase tracking-widest text-sm px-10 py-5 rounded-2xl hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-950/20 active:scale-95"
            >
              Register Your First Device
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bottom Trust Labels */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-white/10 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-1">
              <Zap size={20} className="text-indigo-300 mb-1" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Instant Setup</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Globe size={20} className="text-indigo-300 mb-1" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">Global Access</span>
            </div>
            <div className="hidden md:flex flex-col items-center gap-1">
              <Sparkles size={20} className="text-indigo-300 mb-1" />
              <span className="text-xs font-bold text-white uppercase tracking-tighter">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}