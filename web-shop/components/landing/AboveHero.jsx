"use client";

import React from "react";
import { MoveDown } from "lucide-react";

export default function AboveHero() {
  return (
    <section className="relative w-full pt-32 pb-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Animated Brand Name */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500">
            Print
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            InnovX
          </span>
        </h1>

        {/* Tagline with subtle letter spacing */}
        <p className="text-indigo-300/80 text-sm md:text-base font-medium uppercase tracking-[0.3em] mb-8">
          Your Printer, <span className="text-white">Now Smarter</span>
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center gap-4 w-full max-w-xs opacity-20">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white" />
          <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white" />
        </div>
        
        {/* Scroll Indicator Hint */}
        <div className="mt-8 animate-bounce">
            <MoveDown size={20} className="text-slate-500" />
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}