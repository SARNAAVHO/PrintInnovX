"use client";

import { MonitorSmartphone, CloudDownload, Wallet } from "lucide-react";
import StepCard from "../common/StepCard";

export default function HowItWorks() {
  return (
    <section className="bg-[#0b0f2a] py-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-indigo-400">
              Process
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-slate-400 font-medium">
            Three simple steps to transform your legacy hardware into a revenue-generating smart terminal.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

          <StepCard
            number="01"
            icon={<MonitorSmartphone size={28} />}
            title="Register Your Device"
            description="Add your printer to the cloud platform via our intuitive dashboard. Receive a high-res QR code instantly."
          />

          <StepCard
            number="02"
            icon={<CloudDownload size={28} />}
            title="Install Print Agent"
            description="Deploy our ultra-lightweight agent on your host machine. It connects your printer to our secure global network."
          />

          <StepCard
            number="03"
            icon={<Wallet size={28} />}
            title="Start Earning"
            description="Users scan, pay, and print. Revenue is calculated per page and settled automatically to your account."
          />
        </div>
      </div>
    </section>
  );
}