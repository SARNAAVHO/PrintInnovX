import Link from "next/link";
import { Printer, Shield, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 text-white flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-3">
          <Printer size={40} className="text-indigo-400" />
          <h1 className="text-4xl font-bold tracking-tight">
            PrintInnovX Admin
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Centralized dashboard to monitor devices, track jobs, and manage
          revenue across your printing network.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur">
            <Shield className="mx-auto mb-3 text-indigo-400" />
            <h3 className="font-semibold">Secure Control</h3>
            <p className="text-sm text-slate-300 mt-2">
              Manage devices and credentials safely.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur">
            <BarChart3 className="mx-auto mb-3 text-indigo-400" />
            <h3 className="font-semibold">Live Analytics</h3>
            <p className="text-sm text-slate-300 mt-2">
              Monitor revenue and print activity in real time.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur">
            <Printer className="mx-auto mb-3 text-indigo-400" />
            <h3 className="font-semibold">Device Monitoring</h3>
            <p className="text-sm text-slate-300 mt-2">
              Track online/offline printer status instantly.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="pt-6">
          <Link
            href="/admin"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl font-medium transition"
          >
            Go to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}