import { QrCode } from "lucide-react";

export default function DeviceItem({ name, printer, status, lastSeen }) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
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
          className={`px-3 py-1 rounded text-xs font-medium ${
            status === "online"
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {status}
        </span>

        <button className="border px-3 py-2 rounded-md flex items-center gap-1">
          <QrCode size={16} /> QR
        </button>
      </div>
    </div>
  );
}
