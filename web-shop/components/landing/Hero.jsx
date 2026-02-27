"use client";

import { Download, ArrowRight, Sparkles, ShieldCheck, Zap, Printer } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0b0f2a] text-white">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-100">
              The Future of Print
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
            QR-Based <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Cloud Printing
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-medium">
            Turn any printer into a smart, pay-per-print node in seconds. 
            <span className="text-slate-200"> No apps required.</span> Just scan, pay, and watch your documents fly.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <a
              href="/register"
              className="group w-full sm:w-auto inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 gap-2"
            >
              Get Started 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="/download"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-10 py-4 rounded-2xl transition-all backdrop-blur-md gap-3 active:scale-95"
            >
              <Download size={20} className="text-indigo-400" />
              Download Agent
            </a>
          </div>

          {/* Micro-Social Proof / Features */}
          <div className="mt-12 flex items-center gap-8 border-t border-white/10 pt-8 w-full">
            <div className="flex items-center gap-2 text-slate-400">
              <Zap size={18} className="text-amber-400" />
              <span className="text-sm font-semibold tracking-wide">Instant Setup</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={18} className="text-emerald-400" />
              <span className="text-sm font-semibold tracking-wide">Secure Cloud</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE / GRAPHIC */}
        <div className="relative group">
          {/* Abstract Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />
          
          <div className="relative rounded-[2.5rem] p-3 bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden transform group-hover:-rotate-1 group-hover:scale-[1.02] transition-all duration-700">
            <img
              src="/images/land_img.jpeg"
              alt="Printer preview"
              className="rounded-[1.8rem] w-full h-auto object-cover shadow-inner"
            />
            
            {/* Floating UI Element (Optional Overlays) */}
            <div className="absolute bottom-10 left-10 right-10 p-6 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-indigo-500 rounded-lg">
                  <Printer size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-sm font-bold text-white leading-none">Job Printed Successfully</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}