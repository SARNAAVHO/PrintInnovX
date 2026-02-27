export default function StatCard({ title, value, icon, color = "indigo" }) {
  // Mapping colors for dynamic styling
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="group bg-white rounded-[2rem] p-7 border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 cursor-pointer flex items-start justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 mb-2">
          {title}
        </p>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
          {value}
        </h3>
        {/* <div className="mt-4 flex items-center gap-1.5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          <p className="text-[10px] font-semibold text-slate-400">Live Updates</p>
        </div> */}
      </div>
      
      <div className={`p-4 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${colorMap[color] || colorMap.indigo}`}>
        {icon}
      </div>
    </div>
  );
}