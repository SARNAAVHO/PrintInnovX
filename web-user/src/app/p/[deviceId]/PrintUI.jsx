"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Printer,
  FileText,
  X,
  Minus,
  Plus,
  CreditCard,
  Loader2
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { uploadFile } from "../../lib/upload";
import { apiFetch } from "../../lib/api";

export default function PrintUI({ printer, deviceId }) {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]); 
  const [copies, setCopies] = useState(1);
  const [colorMode, setColorMode] = useState("bw"); 
  const [pageMode, setPageMode] = useState("all"); 
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  function loadRazorpay() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSelect(e) {
    const selectedFiles = Array.from(e.target.files || []);
    if (!selectedFiles.length) return;

    const processed = [];
    for (const f of selectedFiles) {
      if (f.type === "application/pdf") {
        const buffer = await f.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer);
        processed.push({ file: f, pages: pdfDoc.getPageCount() });
      } else {
        processed.push({ file: f, pages: 1 });
      }
    }
    setFiles((prev) => [...prev, ...processed]);
    setPageMode("all");
    setStartPage(1);
    setEndPage(Math.max(...processed.map((f) => f.pages)));
  }

  const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const totalPages = files.reduce((sum, f) => {
    if (pageMode === "all") return sum + f.pages * copies;
    const from = Math.max(1, startPage);
    const to = Math.min(endPage, f.pages);
    return sum + Math.max(0, to - from + 1) * copies;
  }, 0);

  const ratePerPage = colorMode === "color" ? 10 : 5;
  const totalPrice = totalPages * ratePerPage;

  async function handlePrint() {
    if (!files.length || isProcessing) return;
    setIsProcessing(true);

    try {
      const uploadedFiles = [];
      for (const f of files) {
        const { fileId } = await uploadFile(f.file);
        uploadedFiles.push({ fileId, pages: f.pages });
      }

      const job = await apiFetch("/api/jobs/create-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          files: uploadedFiles,
          copies,
          totalPages,
          color: colorMode === "color",
        }),
      });

      const loaded = await loadRazorpay();
      if (!loaded) {
        setIsProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: job.amount,
        currency: job.currency,
        name: "PrintInnovX",
        description: `Printing ${totalPages} pages`,
        order_id: job.razorpayOrderId,
        handler: function () {
          setFiles([]);
          setCopies(1);
          setIsProcessing(false);
          alert("Success! Your documents are being printed.");
        },
        modal: { ondismiss: () => setIsProcessing(false) },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900 font-sans pb-32">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              <Printer size={20} className="text-indigo-600" />
              {printer.deviceName}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {printer.shopName}
            </p>
          </div>
          <div className="bg-emerald-500/10 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border border-emerald-500/10">
            Online
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-8">
        {/* Upload Area */}
        <section>
          <button
            onClick={() => fileInputRef.current.click()}
            className="group w-full aspect-[2/1] rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center transition-all hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer active:scale-[0.99]"
          >
            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors pointer-events-none">
              <Upload size={28} />
            </div>
            <p className="mt-4 text-sm font-bold pointer-events-none">Tap to upload documents</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1 pointer-events-none">PDF or Images</p>
          </button>
          <input ref={fileInputRef} type="file" accept=".pdf,image/*" multiple hidden onChange={handleSelect} />
        </section>

        {/* Selected Files */}
        {files.length > 0 && (
          <section className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Queue</h3>
                <button onClick={() => setFiles([])} className="text-[10px] font-bold text-red-500 uppercase cursor-pointer hover:underline">Clear All</button>
             </div>
             <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm group">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{f.file.name}</p>
                      <p className="text-[10px] font-medium text-slate-400 uppercase">{f.pages} Pages</p>
                    </div>
                    <button onClick={() => removeFile(i)} className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer">
                      <X size={18} />
                    </button>
                  </div>
                ))}
             </div>
          </section>
        )}

        {/* Configuration Card */}
        {files.length > 0 && (
          <section className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
            {/* Copies */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-tight">Copies</p>
                <p className="text-[10px] text-slate-400 font-medium">Quantity</p>
              </div>
              <div className="flex items-center bg-slate-50 p-1 rounded-2xl border border-slate-100">
                <button onClick={() => setCopies(Math.max(1, copies - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 cursor-pointer hover:bg-slate-50 active:scale-90 transition-all"><Minus size={16} /></button>
                <span className="w-12 text-center font-black text-lg">{copies}</span>
                <button onClick={() => setCopies(copies + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-slate-600 cursor-pointer hover:bg-slate-50 active:scale-90 transition-all"><Plus size={16} /></button>
              </div>
            </div>

            {/* Color Mode Tabs */}
            <div className="space-y-3">
               <p className="text-sm font-black uppercase tracking-tight">Mode</p>
               <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'bw', label: 'B/W', price: '₹5' },
                    { id: 'color', label: 'Color', price: '₹10' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setColorMode(mode.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-95 ${colorMode === mode.id ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <p className={`text-xs font-black ${colorMode === mode.id ? 'text-indigo-600' : 'text-slate-400'}`}>{mode.label}</p>
                      <p className="text-[10px] font-bold text-slate-500 mt-1">{mode.price}/page</p>
                    </button>
                  ))}
               </div>
            </div>

            {/* Page Range */}
            <div className="space-y-4 pt-4 border-t border-slate-50">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-black uppercase tracking-tight">Pages</p>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button onClick={() => setPageMode("all")} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${pageMode === 'all' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>All</button>
                    <button onClick={() => setPageMode("range")} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all cursor-pointer ${pageMode === 'range' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>Range</button>
                  </div>
               </div>
               {pageMode === "range" && (
                <div className="flex gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase ml-2">From</span>
                    <input type="number" min="1" value={startPage} onChange={(e) => setStartPage(Math.max(1, Number(e.target.value)))} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase ml-2">To</span>
                    <input type="number" min={startPage} value={endPage} onChange={(e) => setEndPage(Number(e.target.value))} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
               )}
            </div>
          </section>
        )}
      </div>

      {/* Floating Action Bar */}
      {files.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 z-40 bg-gradient-to-t from-[#f8f9fc] via-[#f8f9fc]/80 to-transparent">
           <div className="max-w-2xl mx-auto bg-slate-900 rounded-[2rem] p-4 shadow-2xl flex items-center justify-between gap-4 border border-white/10">
              <div className="pl-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</p>
                 <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-white">₹{totalPrice}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">{totalPages} pages</span>
                 </div>
              </div>
              <button
                onClick={handlePrint}
                disabled={isProcessing}
                className="flex-1 h-14 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <CreditCard size={18} />
                    Pay & Print
                  </>
                )}
              </button>
           </div>
        </div>
      )}
    </main>
  );
}