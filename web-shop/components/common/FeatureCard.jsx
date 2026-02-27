export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:bg-white/[0.07] hover:border-indigo-500/50 hover:-translate-y-2 overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl group-hover:bg-indigo-600/20 transition-colors" />

      {/* Icon Wrapper */}
      <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-slate-900 border border-white/10 text-indigo-400 mb-8 group-hover:scale-110 group-hover:text-white group-hover:bg-indigo-600 transition-all duration-500 shadow-xl">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-4 tracking-tight leading-tight">
        {title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">
        {description}
      </p>

      {/* Bottom Interactive Bar */}
      <div className="mt-8 w-0 h-1 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500" />
    </div>
  );
}