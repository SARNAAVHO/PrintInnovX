"use client";

import { QrCode, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import FeatureCard from "../common/FeatureCard";

export default function WhyPrintCloud() {
  return (
    <section className="bg-[#0b0f2a] py-20 relative overflow-hidden">
      {/* Subtle Grid Background Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              Why <span className="text-indigo-500">PrintInnovX?</span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 font-medium">
              Enterprise-grade infrastructure designed to turn any standard printer 
              into a powerful, automated service point.
            </p>
          </div>
          <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent mx-8 mb-4" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<QrCode size={32} />}
            title="QR-Based Access"
            description="Frictionless printing. Users scan, upload, and print via browser. Zero app fatigue."
          />
          <FeatureCard
            icon={<Zap size={32} />}
            title="Instant Payments"
            description="Razorpay powered checkout. Funds are verified before the first page ever hits the tray."
          />
          <FeatureCard
            icon={<ShieldCheck size={32} />}
            title="Secure by Design"
            description="End-to-end encryption with hardware-level authentication for every connected node."
          />
          <FeatureCard
            icon={<TrendingUp size={32} />}
            title="Live Analytics"
            description="Granular tracking of revenue, ink levels, and job success rates in real-time."
          />
        </div>
      </div>
    </section>
  );
}