"use client";

import Link from "next/link";
import { LayoutDashboard, Terminal } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <nav className="fixed top-0 z-[100] w-full px-6 py-4 pointers-even-auto">
      {/* Floating Glass Container */}
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/10 transition-all hover:border-indigo-500/30 pointers-even-auto">
        
        {/* Logo Section */}
        <Link
          href="/"
          className="group flex items-center gap-3 tracking-tight outline-none shrink-0"
        >
          {/* Icon Logo - Scaled down to match wordmark */}
          <Image 
            src="/images/PXlogo.png" 
            alt="Icon" 
            width={40} 
            height={40} 
            className="rounded-lg object-contain" 
            priority
          />
          
          {/* Wordmark Logo - Fixed height, automatic width */}
          <div className="h-8 flex items-center"> 
            <Image 
              src="/images/PX.png" 
              alt="PrintInnovX" 
              width={120} // Overestimate width to prevent capping
              height={32} // Match the container height
              className="hidden sm:block h-3/4 w-auto object-contain"
              priority 
            />
          </div>
        </Link>

        {/* Action Section */}
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <div className="flex items-center">
              <Link
                href="/register"
                className="flex items-center gap-2 bg-white text-slate-900 text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-white/5"
              >
                <Terminal size={14} strokeWidth={3} />
                Register Device
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Internal Navigation Links */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-bold transition-all px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <LayoutDashboard size={18} className="text-indigo-400" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>

              {/* Separator */}
              <div className="h-6 w-px bg-white/10" />

              {/* User Profile */}
              <div className="flex items-center p-0.5 rounded-full border border-white/10 bg-white/5 hover:border-indigo-500/50 transition-colors">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-full",
                      userButtonPopoverCard: "rounded-2xl border border-slate-200 shadow-xl",
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}