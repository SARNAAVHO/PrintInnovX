import TopBar from "@/components/dashboard/TopBar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import DevicesCard from "@/components/dashboard/DevicesCard";
import JobsCard from "@/components/dashboard/JobsCard";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#05071a] text-slate-200 selection:bg-indigo-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        {/* Subtle Grainy Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
      </div>

      <div className="relative z-10">
        <TopBar />

        <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
          {/* Header Section */}
          <header className="flex flex-col gap-1">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500/80 mb-2">
              System Overview
            </h2>
            <h1 className="text-3xl font-black text-white tracking-tighter italic">
              Network <span className="text-slate-500 not-italic font-light">Command.</span>
            </h1>
          </header>

          {/* Stats Section */}
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <StatsGrid />
          </section>

          {/* Data Modules Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="group transition-all duration-500">
               <DevicesCard />
            </div>
            <div className="group transition-all duration-500">
               <JobsCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}