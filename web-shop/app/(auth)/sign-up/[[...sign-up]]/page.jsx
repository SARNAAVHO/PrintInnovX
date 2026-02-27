"use client";

import { SignUp } from "@clerk/nextjs";
import { Printer, Rocket, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0b0f2a]">
      
      {/* LEFT SIDE: BRAND & STEPS */}
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-[#0b0f2a] to-[#05071a] p-20 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: `linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
        
        <div className="max-w-md relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-16">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg">
              <Printer size={28} className="text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">PrintInnovX</span>
          </Link>
          
          <h2 className="text-4xl font-black text-white leading-tight mb-8">
            Start your <br />
            <span className="text-indigo-400">Print-as-a-Service</span> <br />
            journey today.
          </h2>
          
          <div className="space-y-10">
            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                1
              </div>
              <div>
                <p className="text-white font-bold tracking-tight">Create Account</p>
                <p className="text-slate-400 text-sm">Access your unified management dashboard.</p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                2
              </div>
              <div>
                <p className="text-white font-bold tracking-tight">Register Hardware</p>
                <p className="text-slate-400 text-sm">Add your printers and generate secure QR nodes.</p>
              </div>
            </div>

            <div className="flex gap-5 group">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all">
                3
              </div>
              <div>
                <p className="text-white font-bold tracking-tight">Launch Service</p>
                <p className="text-slate-400 text-sm">Download the agent and start accepting jobs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: SIGN UP FORM */}
      <div className="flex flex-col justify-center items-center p-8 bg-[#0b0f2a] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px]" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="mb-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Rocket size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Developer Access</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-2">Get Started</h1>
            <p className="text-slate-400 font-medium text-sm">Join the cloud printing network in seconds.</p>
          </div>

          <SignUp 
            afterSignUpUrl="/dashboard"
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
                formResendCodeLink: "text-indigo-400",
                dividerLine: "bg-white/10",
                dividerText: "text-slate-500 font-bold text-[10px] uppercase tracking-widest",
                formFieldInputShowPasswordButton: "text-slate-500 hover:text-white"
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}