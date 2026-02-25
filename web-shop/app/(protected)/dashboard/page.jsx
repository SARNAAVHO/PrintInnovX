"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import Link from "next/link";
import {
  Printer,
  Plus,
  FileText,
  Activity,
  Loader2,
  Home,
  Download,
  Copy,
  Trash2,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { apiFetch } = useApi();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const res = await apiFetch("/api/shop/dashboard");

        if (!res.ok) {
          router.push("/onboarding");
          return;
        }

        const data = await res.json();
        setShop(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadShop();
  }, [apiFetch, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-indigo-600" size={40} />
          <p className="text-sm font-medium text-slate-500 animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!shop) return null;

  const devices = shop.devices || [];
  const jobs = shop.printJobs || [];
  const revenue = jobs.reduce((acc, job) => acc + (job.amount || 0), 0);
  const rev = revenue / 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* ================= TOP BAR ================= */}
      <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 hover:opacity-80 transition-opacity"
          >
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Printer className="text-white" size={20} />
            </div>
            PrintInnovX
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:border-indigo-600 hover:text-indigo-600 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {shop.shopName}
          </h1>
          <p className="text-slate-500 mt-2 text-base max-w-xl">
            Manage your device fleet and monitor printing activity in real-time.
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<Printer size={24} className="text-indigo-600" />}
            iconBg="bg-indigo-50"
            title="Total Devices"
            value={devices.length}
          />
          <StatCard
            icon={<FileText size={24} className="text-emerald-600" />}
            iconBg="bg-emerald-50"
            title="Total Print Jobs"
            value={jobs.length}
          />
          <StatCard
            icon={<Activity size={24} className="text-amber-500" />}
            iconBg="bg-amber-50"
            title="Revenue (₹)"
            value={rev.toLocaleString("en-IN")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= DEVICES ================= */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Connected Devices
                </h2>
              </div>
              <Link
                href="/devices/new"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-sm shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus size={18} />
                Add Device
              </Link>
            </div>

            {devices.length === 0 ? (
              <EmptyState
                title="No Devices Added"
                description="You haven’t connected any printer devices to this shop yet."
                buttonText="Add Your First Device"
                link="/devices/new"
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {devices.map((device) => (
                  <div
                    key={device.id}
                    onClick={() => setSelectedDevice(device)}
                    className="group bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-50 group-hover:bg-indigo-50 rounded-xl transition-colors">
                        <Printer
                          size={24}
                          className="text-slate-600 group-hover:text-indigo-600 transition-colors"
                        />
                      </div>
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
                        <span className="relative flex h-2.5 w-2.5">
                          {device.isOnline && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          )}
                          <span
                            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                              device.isOnline ? "bg-emerald-500" : "bg-slate-300"
                            }`}
                          ></span>
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                          {device.isOnline ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900 truncate text-lg">
                        {device.deviceName}
                      </p>
                      <p className="text-sm text-indigo-600 font-medium mt-3 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
                        View Settings →
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= PRINT JOBS ================= */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Recent Jobs
            </h2>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
              {jobs.length === 0 ? (
                <EmptyState
                  title="No Print Jobs Yet"
                  description="Recent prints will appear here."
                />
              ) : (
                <div className="divide-y divide-slate-100">
                  {jobs.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="p-5 hover:bg-slate-50/50 transition-colors flex justify-between items-center"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {job.copies} {job.copies === 1 ? "copy" : "copies"}{" "}
                          <span className="text-slate-300 mx-1">•</span>{" "}
                          <span className={job.color ? "text-indigo-600" : "text-slate-600"}>
                            {job.color ? "Color" : "B/W"}
                          </span>
                        </p>
                        <div className="inline-flex items-center mt-2 px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                          {job.status}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-slate-900">
                          ₹{job.amount / 100}
                        </div>
                      </div>
                    </div>
                  ))}
                  {jobs.length > 5 && (
                    <div className="p-4 bg-slate-50/50 text-center border-t border-slate-100">
                      <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer">
                        View all jobs
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= DEVICE MODAL ================= */}
      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, iconBg, title, value }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3.5 rounded-2xl ${iconBg}`}>{icon}</div>
        <span className="text-sm font-medium text-slate-500">{title}</span>
      </div>
      <div className="text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </div>
    </div>
  );
}

function EmptyState({ title, description, buttonText, link }) {
  return (
    <div className="text-center py-16 px-6 bg-white border border-dashed border-slate-300 rounded-3xl">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
        <Printer size={28} className="text-slate-400" />
      </div>
      <p className="text-lg font-semibold text-slate-900 mb-1">{title}</p>
      <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
        {description}
      </p>

      {buttonText && link && (
        <Link
          href={link}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={18} />
          {buttonText}
        </Link>
      )}
    </div>
  );
}

function DeviceModal({ device, onClose }) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { apiFetch } = useApi();

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this device? This action cannot be undone.")) {
        return;
    }

    setDeleting(true);
    try {
      const res = await apiFetch(`/api/devices/${device.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onClose();
        window.location.reload();
      } else {
        alert("Failed to delete device");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting device");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="mb-8">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <Printer size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {device.deviceName}
          </h2>
          <p className="text-sm text-slate-500 mt-1">Device Configuration</p>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
              Device ID
            </label>
            <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl group hover:border-indigo-200 transition-colors">
              <span className="text-sm font-mono text-slate-700">
                {device.id}
              </span>
              <button
                onClick={() => copy(device.id, "id")}
                className="text-slate-400 hover:text-indigo-600 transition-colors p-1"
                title="Copy ID"
              >
                {copiedId ? (
                  <span className="text-xs font-semibold text-emerald-600">
                    Copied!
                  </span>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 block">
              Auth Token
            </label>
            <div className="flex justify-between items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl group hover:border-indigo-200 transition-colors">
              <span className="text-xs font-mono text-slate-700 break-all pr-4 line-clamp-2">
                {device.authToken}
              </span>
              <button
                onClick={() => copy(device.authToken, "token")}
                className="text-slate-400 hover:text-indigo-600 transition-colors p-1 shrink-0"
                title="Copy Token"
              >
                {copiedToken ? (
                  <span className="text-xs font-semibold text-emerald-600">
                    Copied!
                  </span>
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              window.open(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/qr/${device.id}`
              )
            }
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-md cursor-pointer"
          >
            <Download size={18} />
            Download QR Code
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all border border-red-100 disabled:opacity-50 cursor-pointer"
          >
            {deleting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
            {deleting ? "Deleting..." : "Delete Device"}
          </button>
        </div>
      </div>
    </div>
  );
}