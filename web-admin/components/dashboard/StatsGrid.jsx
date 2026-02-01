"use client";

import { useEffect, useState } from "react";
import { FileText, TrendingUp, Printer, Activity } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import StatCard from "./StatCard";
import { fetchAdminStats } from "@/lib/api";

export default function StatsGrid() {
  const { getToken } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const token = await getToken();
        const data = await fetchAdminStats(token);
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }

    load();
  }, [getToken]);

  if (!stats) {
    return <div className="text-slate-400">Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Jobs" value={stats.totalJobs} icon={<FileText />} />
      <StatCard
        title="Total Revenue"
        value={`₹${stats.totalRevenue}`}
        icon={<TrendingUp />}
      />
      <StatCard
        title="Total Devices"
        value={stats.totalDevices}
        icon={<Printer />}
      />
      <StatCard
        title="Online Devices"
        value={stats.onlineDevices}
        icon={<Activity />}
      />
    </div>
  );
}
