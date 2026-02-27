export default function StepCard({ number, title, description, icon }) {
  return (
    <div className="group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/5 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-indigo-500/40 hover:-translate-y-2">
      
      {/* Step number - Floating Style */}
      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-7xl font-black text-white/5 tracking-tighter group-hover:text-indigo-500/10 transition-colors">
        {number}
      </span>

      {/* Glass Icon Container */}
      <div className="relative mb-8 p-5 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-500">
        {icon}
        {/* Glow behind icon */}
        <div className="absolute inset-0 bg-indigo-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-white tracking-tight group-hover:text-indigo-300 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed font-medium">
        {description}
      </p>

      {/* Decorative arrow or accent for the last card (optional) */}
      <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-8 h-1 bg-indigo-500 rounded-full mx-auto" />
      </div>
    </div>
  );
}