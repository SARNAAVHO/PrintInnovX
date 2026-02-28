"use client";

import { useEffect, useState } from "react";
import { FileText, TrendingUp, Printer, Activity } from "lucide-react";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-40 bg-white/[0.03] border border-white/5 animate-pulse rounded-[2.5rem]" 
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StatCard 
        title="Total Jobs" 
        value={stats.totalJobs.toLocaleString()} 
        icon={<FileText size={20} />} 
        color="indigo"
      />
      <StatCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue.toLocaleString()}`}
        icon={<TrendingUp size={20} />}
        color="emerald"
      />
      <StatCard
        title="Total Devices"
        value={stats.totalDevices}
        icon={<Printer size={20} />}
        color="amber"
      />
      <StatCard
        title="Online Nodes"
        value={stats.onlineDevices}
        icon={<Activity size={20} />}
        color="rose"
      />
    </div>
  );
}