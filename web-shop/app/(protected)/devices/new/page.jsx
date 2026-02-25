"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { Loader2, Copy, Download, CheckCircle2, ArrowLeft, Printer } from "lucide-react";
import Link from "next/link";

export default function AddDevicePage() {
  const router = useRouter();
  const { apiFetch } = useApi();

  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdDevice, setCreatedDevice] = useState(null);

  // UI state for copy feedback
  const [copiedId, setCopiedId] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);

  const createDevice = async () => {
    if (!deviceName.trim()) return;

    setLoading(true);

    try {
      const res = await apiFetch("/api/devices/create", {
        method: "POST",
        body: JSON.stringify({ deviceName }),
      });

      if (!res.ok) {
        console.error("Failed to register device");
        return;
      }

      const data = await res.json();
      setCreatedDevice(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "id") {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  /* =========================
     SUCCESS VIEW
  ========================== */
  if (createdDevice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12 font-sans">
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 w-full max-w-lg border border-slate-100 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Device Registered!
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Your printer is ready to be configured.
            </p>
          </div>

          <div className="space-y-5 mb-8">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Device ID
              </label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl group hover:border-indigo-200 transition-colors">
                <span className="text-sm font-mono text-slate-700">{createdDevice.id}</span>
                <button 
                  onClick={() => copy(createdDevice.id, "id")}
                  className="text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {copiedId ? <span className="text-xs font-semibold text-emerald-600">Copied!</span> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
                Auth Token
              </label>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl group hover:border-indigo-200 transition-colors">
                <span className="text-sm font-mono text-slate-700 break-all pr-4">
                  {createdDevice.authToken}
                </span>
                <button 
                  onClick={() => copy(createdDevice.authToken, "token")}
                  className="text-slate-400 hover:text-indigo-600 transition-colors shrink-0"
                >
                  {copiedToken ? <span className="text-xs font-semibold text-emerald-600">Copied!</span> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() =>
                window.open(
                  `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${createdDevice.id}`
                )
              }
              className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <Download size={18} />
              Download QR Code
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-white border border-slate-200 py-3.5 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     CREATE FORM
  ========================== */
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* Optional minimal header for navigation context */}
      <div className="p-6">
        <Link href="/devices" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-24">
        <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 w-full max-w-md border border-slate-100 animate-in fade-in duration-300">
          
          <div className="mb-8">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5">
              <Printer size={24} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Add New Device
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Register a new printer to start accepting print jobs.
            </p>
          </div>

          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              Device Name
            </label>
            <input
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="e.g. Front Desk Printer, Color Laser..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter') createDevice();
              }}
            />
          </div>

          <button
            onClick={createDevice}
            disabled={loading || !deviceName.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all shadow-sm hover:shadow-md active:translate-y-0 hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Registering...
              </>
            ) : (
              "Register Device"
            )}
          </button>

        </div>
      </div>
    </div>
  );
}