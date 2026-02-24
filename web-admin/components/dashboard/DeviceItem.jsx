"use client";

import { QrCode } from "lucide-react";
import { useState } from "react";
import QRCode from "qrcode";
import { fetchAdminDeviceDetail } from "@/lib/api";

function formatLastSeen(date) {
  if (!date) return "Never";
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

async function downloadDeviceQR(deviceId, shopName) {
  const PUBLIC_BASE =
    process.env.NEXT_PUBLIC_PUBLIC_APP_URL || "http://localhost:3000";

  const qrUrl = `${PUBLIC_BASE}/p/${deviceId}`;
  const qrDataUrl = await QRCode.toDataURL(qrUrl, { width: 320 });

  const link = document.createElement("a");
  link.href = qrDataUrl;
  link.download = `${shopName}-qr.png`;
  link.click();
}

export default function DeviceItem({
  id,
  name,
  printer,
  status,
  lastSeen,
}) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  async function openDetail() {
    if (!id) return;

    setOpen(true);

    try {
      const data = await fetchAdminDeviceDetail(id);
      setDetail(data);
    } catch (err) {
      console.error("Device detail error:", err);
    }
  }

  return (
    <>
      <div
        onClick={openDetail}
        className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition cursor-pointer"
      >
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-slate-500">{printer}</p>
          <p className="text-xs text-slate-400 mt-1">
            Last seen: {formatLastSeen(lastSeen)}
          </p>
        </div>

        <div
          className="flex items-center gap-3"
          onClick={e => e.stopPropagation()}
        >
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === "online"
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {status}
          </span>

          <button
            onClick={() => downloadDeviceQR(id, name)}
            className="p-2 rounded-lg hover:bg-slate-100 shadow"
          >
            <QrCode size={18} />
          </button>
        </div>
      </div>

      {open && detail && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="font-semibold text-lg mb-4">
              Device Credentials
            </h2>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-500">Device ID</p>
                <code className="block bg-slate-100 p-2 rounded">
                  {detail.deviceId}
                </code>
              </div>

              <div>
                <p className="text-slate-500">Auth Token</p>
                <code className="block bg-slate-100 p-2 rounded break-all">
                  {detail.authToken}
                </code>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}