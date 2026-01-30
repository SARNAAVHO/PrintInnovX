import { QrCode } from "lucide-react";

export default function DeviceItem({ name, printer, status, lastSeen }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition">
      
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-slate-500">{printer}</p>

        {lastSeen && (
          <p className="text-xs text-slate-400 mt-1">
            Last seen: {lastSeen}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "online"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {status}
        </span>

        <button className="p-2 rounded-lg transition cursor-pointer hover:bg-indigo-300 shadow">
          <QrCode size={18} />
        </button>
      </div>
    </div>
  );
}
