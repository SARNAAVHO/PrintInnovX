import TopBar from "@/components/dashboard/TopBar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DevicesCard from "@/components/dashboard/DevicesCard";
import JobsCard from "@/components/dashboard/JobsCard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DevicesCard />
          <JobsCard />
        </div>
      </main>
    </div>
  );
}
