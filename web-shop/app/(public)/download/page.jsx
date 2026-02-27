"use client";

import Link from "next/link";
import {
  Download,
  Printer,
  Monitor,
  CheckCircle2,
  ArrowLeft,
  Cpu,
  ShieldAlert,
  ChevronRight,
  Info,
  Server
} from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#0b0f2a] text-white font-sans selection:bg-indigo-500/30">
      {/* HEADER */}
      <nav className="sticky top-0 z-[100] w-full px-6 py-4">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Printer size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">PrintInnovX</span>
          </div>

          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Windows <span className="text-indigo-500">Print Agent</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Connect your local printer to the cloud infrastructure in seconds. 
            Optimized for <span className="text-white font-bold">low-latency execution</span> and secure tunneling.
          </p>
        </div>
      </section>

      {/* MAIN DOWNLOAD SECTION */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="group relative bg-white/[0.03] border border-white/10 rounded-[3rem] p-1 shadow-2xl overflow-hidden transition-all hover:border-indigo-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-3 bg-slate-900/40 rounded-[2.8rem] overflow-hidden">
            
            {/* Left Info Area */}
            <div className="lg:col-span-2 p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20">
                  <Monitor size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">Desktop Client</h3>
                  <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Microsoft Windows Certified</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12">
                {[
                  "Automatic Background Operation",
                  "Secure WebSocket Encryption",
                  "Real-time Job Notifications",
                  "Auto-Update Capability",
                  "System Tray Management",
                  "Native Driver Integration"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                    <CheckCircle2 size={18} className="text-indigo-500" />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="/agents/printcloud-agent-windows.exe"
                className="inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-2xl shadow-indigo-500/10"
                download
              >
                <Download size={20} strokeWidth={3} />
                Download Installer
              </a>
            </div>

            {/* Right Specs Sidebar */}
            <div className="p-10 md:p-14 bg-indigo-600/5">
              <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-8">Technical Specs</h4>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Server size={20} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Architecture</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">x64 / x86 Compatible<br/>Win 10, 11, Server 2022+</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <ShieldAlert size={20} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Security</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">AES-256 TLS Tunnel<br/>OIDC Auth Protocols</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Cpu size={20} className="text-slate-500 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-white mb-1">Footprint</p>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">~24MB RAM usage<br/>{"<"}1% CPU Overhead</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SETUP GUIDE */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mb-4 tracking-tight">Three Step Activation</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Download", d: "Get the executable installer above." },
            { t: "Configure", d: "Paste your Device ID and Auth Token." },
            { t: "Monitor", d: "Check the system tray for green status." }
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-500 font-black mb-6 mx-auto">
                {i+1}
              </div>
              <h4 className="text-white font-bold mb-2">{step.t}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl flex items-start gap-6">
          <Info className="text-indigo-400 flex-shrink-0" />
          <p className="text-sm text-slate-400 font-medium">
            Lost your credentials? You can regenerate your secure <span className="text-white">Auth Tokens</span> inside your 
            <Link href="/dashboard" className="text-indigo-400 hover:underline mx-1">
              Management Dashboard <ChevronRight size={12} className="inline" />
            </Link> 
            at any time.
          </p>
        </div>
      </section>

      {/* FOOTER CTA */}
      <div className="text-center pb-32 border-t border-white/5 pt-20">
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Hardware not listed?</p>
        <Link
          href="/register"
          className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all shadow-xl"
        >
          Register New Printer
        </Link>
      </div>
    </div>
  );
}