"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Printer,
  FileText,
  X,
  Minus,
  Plus
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { uploadFile } from "../../lib/upload";
import { apiFetch } from "../../lib/api";

export default function PrintUI({ printer, deviceId }) {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]); // [{ file, pages }]
  const [copies, setCopies] = useState(1);
  const [colorMode, setColorMode] = useState("bw"); // bw | color
  const [pageMode, setPageMode] = useState("all"); // all | range
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  function loadRazorpay() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

  // ===== File selection =====
  async function handleSelect(e) {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const processed = [];

    for (const f of selectedFiles) {
      if (f.type === "application/pdf") {
        const buffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        processed.push({
          file: f,
          pages: pdfDoc.getPageCount(),
        });
      } else {
        // Image = 1 page
        processed.push({
          file: f,
          pages: 1,
        });
      }
    }

    setFiles((prev) => [...prev, ...processed]);

    // Reset page range defaults
    setPageMode("all");
    setStartPage(1);
    setEndPage(
      Math.max(...processed.map((f) => f.pages))
    );
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function clearAll() {
    setFiles([]);
    setCopies(1);
    setPageMode("all");
  }

  // ===== Calculations =====
  const totalPages = files.reduce((sum, f) => {
    if (pageMode === "all") return sum + f.pages;

    const from = Math.max(1, startPage);
    const to = Math.min(endPage, f.pages);
    return sum + Math.max(0, to - from + 1);
  }, 0);

  const ratePerPage = colorMode === "color" ? 10 : 5;
  const totalPrice = totalPages * copies * ratePerPage;

  async function handlePrint() {
    if (!files.length) return;

    // 1️⃣ Upload to RAM
    const { fileId } = await uploadFile(files[0].file);

    // 2️⃣ Create job
    const job = await apiFetch("/api/jobs/create-paid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deviceId,
        fileId,
        copies,
        totalPages,
        color: colorMode === "color",
      }),
    });

    // 3️⃣ Load Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // 4️⃣ Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: job.amount,
      currency: job.currency,
      name: "PrintInnovX",
      description: "Print Job Payment",
      order_id: job.razorpayOrderId,
      handler: function (response) {
        console.log("PAYMENT SUCCESS", response);
        alert("Payment successful! Printing will start shortly.");
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}

  return (
    <main className="min-h-screen bg-[#f2f2f7] flex flex-col">
      {/* Header */}
      <header className="px-6 py-5 bg-white border-gray-50">
        <h1 className="text-base font-semibold">
          {printer.deviceName}
        </h1>
        <p className="text-xs text-gray-500">
          {printer.shopName}
        </p>
      </header>

      {/* Content */}
      <section className="flex-1 p-6 space-y-6">
        {/* Upload */}
        <button
          onClick={() => fileInputRef.current.click()}
          className="cursor-pointer w-full rounded-2xl border border-dashed bg-white p-6 text-center hover:bg-gray-50"
        >
          <Upload size={26} className="mx-auto text-gray-400" />
          <p className="mt-2 text-sm font-medium">
            Add files
          </p>
          <p className="text-xs text-gray-500">
            PDF or images
          </p>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/*"
          multiple
          hidden
          onChange={handleSelect}
        />

        {/* File list */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm divide-y">
            {files.map((f, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <div>
                    <p className="text-sm truncate max-w-[180px]">
                      {f.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {f.pages} page{f.pages > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(i)}
                  className="cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Print options */}
        {files.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            {/* Copies */}
            <div className="flex justify-between items-center">
              <span className="text-sm">Copies</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="cursor-pointer"
                >
                  <Minus size={16} />
                </button>
                <span>{copies}</span>
                <button
                  onClick={() => setCopies(copies + 1)}
                  className="cursor-pointer"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Color Mode */}
            <div>
              <p className="text-sm mb-2">Mode</p>
              <div className="flex rounded-xl overflow-hidden border">
                {["bw", "color"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setColorMode(mode)}
                    className={`cursor-pointer flex-1 py-2 ${
                      colorMode === mode
                        ? "bg-black text-white"
                        : "bg-white"
                    }`}
                  >
                    {mode === "bw" ? "B/W" : "Color"}
                  </button>
                ))}
              </div>
            </div>

            {/* Page Range */}
            <div>
              <p className="text-sm mb-2">Pages</p>
              <div className="flex gap-4 mb-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={pageMode === "all"}
                    onChange={() => setPageMode("all")}
                  />
                  All
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={pageMode === "range"}
                    onChange={() => setPageMode("range")}
                  />
                  Range
                </label>
              </div>

              {pageMode === "range" && (
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="1"
                    value={startPage}
                    onChange={(e) =>
                      setStartPage(
                        Math.max(1, Number(e.target.value))
                      )
                    }
                    className="w-1/2 rounded-lg border px-3 py-2 text-sm"
                    placeholder="From"
                  />
                  <input
                    type="number"
                    min={startPage}
                    value={endPage}
                    onChange={(e) =>
                      setEndPage(Number(e.target.value))
                    }
                    className="w-1/2 rounded-lg border px-3 py-2 text-sm"
                    placeholder="To"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      {files.length > 0 && (
        <footer className="p-4 bg-white border-t">
          <div className="text-center text-sm mb-2">
            Total pages: <strong>{totalPages}</strong>
            <br />
            Total: <strong>₹{totalPrice}</strong>
          </div>
          <button
            onClick={handlePrint}
            className="cursor-pointer w-full py-3 bg-black text-white rounded-xl"
          >
            <Printer size={18} className="inline mr-2" />
            Pay & Print
          </button>
        </footer>
      )}
    </main>
  );
}
