"use client";

import { SignIn } from "@clerk/nextjs";
import { Printer, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0f2a]">
      
      {/* LEFT SIDE: AUTHENTICATION */}
      <div className="flex flex-col justify-center items-center p-8 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center gap-3 mb-10 justify-center lg:justify-start">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Printer size={24} className="text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">PrintInnovX</span>
          </Link>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-400 font-medium">Manage your cloud printing nodes and revenue.</p>
          </div>

          {/* Clerk Component Customization */}
          <SignIn 
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent border-none shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-xl py-6",
                socialButtonsBlockButtonText: "text-white font-bold",
                formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 border-none shadow-lg shadow-indigo-600/20 py-6 rounded-xl text-sm font-black uppercase tracking-widest transition-all active:scale-95",
                formFieldLabel: "text-slate-300 font-bold text-xs uppercase tracking-widest mb-2",
                formFieldInput: "bg-white/5 border-white/10 rounded-xl py-3 text-white focus:border-indigo-500 focus:ring-indigo-500/20 transition-all",
                footerActionText: "text-slate-400 font-medium",
                footerActionLink: "text-indigo-400 hover:text-indigo-300 font-bold transition-colors",
                identityPreviewText: "text-white",
                identityPreviewEditButtonIcon: "text-indigo-400",
                formResendCodeLink: "text-indigo-400",
                dividerLine: "bg-white/10",
                dividerText: "text-slate-500 font-bold text-[10px] uppercase tracking-widest"
              }
            }}
          />
        </div>

        {/* Bottom Copyright */}
        <p className="absolute bottom-8 text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          © 2026 PrintInnovX Secure Auth
        </p>
      </div>

      {/* RIGHT SIDE: BRAND VISUALS */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-700 via-indigo-900 to-[#0b0f2a] p-20 relative">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        
        <div className="max-w-md relative z-10 text-center lg:text-left">
          <div className="inline-flex p-4 bg-white/10 backdrop-blur-2xl rounded-[2rem] border border-white/10 mb-10">
            <ShieldCheck size={48} className="text-white" />
          </div>
          
          <h2 className="text-4xl font-black text-white leading-tight mb-6">
            Enterprise-Grade <br />
            <span className="text-indigo-300 underline decoration-indigo-400/50 underline-offset-8">Cloud Infrastructure</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 p-1 bg-emerald-500/20 rounded-full h-fit">
                <Zap size={16} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-bold mb-1 tracking-tight text-lg">Instant Connectivity</p>
                <p className="text-indigo-100/60 text-sm leading-relaxed">Agent heartbeats ensure your printers are online and ready for jobs 24/7.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 p-1 bg-indigo-400/20 rounded-full h-fit">
                <Globe size={16} className="text-indigo-300" />
              </div>
              <div>
                <p className="text-white font-bold mb-1 tracking-tight text-lg">Global Payments</p>
                <p className="text-indigo-100/60 text-sm leading-relaxed">Integrated Razorpay support for automated currency handling and settlements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}