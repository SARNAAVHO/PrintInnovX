"use client";

import Link from "next/link";
import { Printer, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05071a] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <Printer size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">PrintInnovX</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Enterprise-grade cloud printing infrastructure. Transforming legacy hardware into smart, revenue-generating terminals.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/download" className="text-slate-400 hover:text-indigo-400 transition-colors">Download Agent</Link>
              </li>
              <li>
                <Link href="/register" className="text-slate-400 hover:text-indigo-400 transition-colors">Register Device</Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1">
                  API Documentation <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Network Status</a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Stay Updated</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
                <Mail size={16} className="text-white" />
              </button>
            </div>
            <p className="mt-4 text-[11px] text-slate-500 italic font-medium">
              Get the latest updates on agent versions and new cloud features.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © {currentYear} PrintInnovX. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}