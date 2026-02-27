"use client";

import { useEffect, useState } from "react";
import { FileText, TrendingUp, Printer, Activity, Loader2 } from "lucide-react";
import StatCard from "./StatCard";
import { fetchAdminStats } from "@/lib/api";

export default function StatsGrid() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (err) {
        console.error("Stats error:", err);
      }
    }
    load();
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-[2rem]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Jobs" 
        value={stats.totalJobs.toLocaleString()} 
        icon={<FileText size={24} />} 
        color="indigo"
      />
      <StatCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue.toLocaleString()}`}
        icon={<TrendingUp size={24} />}
        color="emerald"
      />
      <StatCard
        title="Total Devices"
        value={stats.totalDevices}
        icon={<Printer size={24} />}
        color="amber"
      />
      <StatCard
        title="Online Devices"
        value={stats.onlineDevices}
        icon={<Activity size={24} />}
        color="rose"
      />
    </div>
  );
}