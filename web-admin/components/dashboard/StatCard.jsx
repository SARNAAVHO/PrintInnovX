export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl p-6 border flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-3xl font-semibold mt-1">{value}</p>
      </div>
      <div className="text-indigo-600">{icon}</div>
    </div>
  );
}
