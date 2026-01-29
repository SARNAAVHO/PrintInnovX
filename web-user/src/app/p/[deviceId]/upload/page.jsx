"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const { deviceId } = useParams();
  const router = useRouter();
  const [file, setFile] = useState(null);

  return (
    <main className="p-6 space-y-4">
      <h2 className="text-lg font-semibold">Upload file</h2>

      <input
        type="file"
        accept=".pdf,image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <button
          onClick={() => router.push(`/p/${deviceId}/preview`)}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Next →
        </button>
      )}
    </main>
  );
}