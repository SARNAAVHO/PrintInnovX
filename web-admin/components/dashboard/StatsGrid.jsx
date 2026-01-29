import { FileText, TrendingUp, Printer, Activity } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Jobs" value="1" icon={<FileText />} />
      <StatCard title="Total Revenue" value="₹0.00" icon={<TrendingUp />} />
      <StatCard title="Total Devices" value="9" icon={<Printer />} />
      <StatCard title="Online Devices" value="1" icon={<Activity />} />
    </div>
  );
}
