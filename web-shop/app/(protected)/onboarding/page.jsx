"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { Loader2, Store, Sparkles, ShieldCheck, Zap, KeyRound, Eye, EyeOff } from "lucide-react";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { apiFetch } = useApi();

  const [shopName, setShopName] = useState("");

  const [priceBW, setPriceBW] = useState("");
  const [priceColor, setPriceColor] = useState("");

  const [razorpayKeyId, setRazorpayKeyId] = useState("");
  const [razorpayKeySecret, setRazorpayKeySecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createShop = async () => {
    if (!shopName.trim()) {
      setError("Terminal identifier is required");
      return;
    }

    // ✅ NEW: validate Razorpay fields
    if (!razorpayKeyId.trim()) {
      setError("Razorpay Key ID is required");
      return;
    }
    if (!razorpayKeySecret.trim()) {
      setError("Razorpay Key Secret is required");
      return;
    }
    if (!razorpayKeyId.startsWith("rzp_")) {
      setError("Invalid Razorpay Key ID — must start with rzp_live_ or rzp_test_");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("/api/shop/create", {
        method: "POST",
        body: JSON.stringify({
        shopName,
        ownerName:
          user?.fullName ||
          user?.primaryEmailAddress?.emailAddress,

        priceBW: parseFloat(priceBW),
        priceColor: parseFloat(priceColor),

        razorpayKeyId,
        razorpayKeySecret,
      }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Execution failed. Check uplink.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Protocol error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return (
    <div className="min-h-screen bg-[#05071a] flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05071a] text-white font-sans selection:bg-indigo-500/30 flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">

        {/* Branding/Logo Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-[2rem] mb-6 shadow-2xl shadow-indigo-600/10">
            <Store className="text-indigo-500" size={36} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">
            Initialize <span className="text-indigo-500">Shop</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium tracking-tight text-center max-w-[280px]">
            Welcome, <span className="text-slate-300">{user?.firstName || 'Operator'}</span>. Establish your printing node to begin.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#0b0f2a] border border-white/5 p-8 md:p-10 rounded-[3rem] shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="space-y-6">

            {/* ── Shop Name ── */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2 mb-3 block">
                Official Shop Name
              </label>
              <div className="relative group">
                <input
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. CORE_PRINT_HQ"
                  className={`w-full bg-white/[0.03] border ${error && !shopName ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold`}
                  onKeyDown={(e) => e.key === 'Enter' && createShop()}
                />
                <Sparkles size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-indigo-400 transition-colors" />
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                <KeyRound size={10} /> Payment Setup
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* ── Razorpay Key ID ── */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2 mb-3 block">
                Razorpay Key ID
              </label>
              <div className="relative group">
                <input
                  value={razorpayKeyId}
                  onChange={(e) => setRazorpayKeyId(e.target.value)}
                  placeholder="rzp_live_xxxxxxxxxxxxxxxx"
                  className={`w-full bg-white/[0.03] border ${error && !razorpayKeyId ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold font-mono text-sm`}
                />
                <KeyRound size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <p className="text-[10px] text-slate-600 ml-2 mt-2">
                Razorpay Dashboard → Settings → API Keys → Key ID
              </p>
            </div>

            {/* ── Razorpay Key Secret ── */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2 mb-3 block">
                Razorpay Key Secret
              </label>
              <div className="relative group">
                <input
                  type={showSecret ? "text" : "password"}
                  value={razorpayKeySecret}
                  onChange={(e) => setRazorpayKeySecret(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  className={`w-full bg-white/[0.03] border ${error && !razorpayKeySecret ? 'border-red-500/50' : 'border-white/10'} text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold font-mono text-sm pr-14`}
                />
                {/* toggle show/hide secret */}
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-indigo-400 transition-colors"
                >
                  {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 ml-2 mt-2">
                Never share this with anyone. Stored encrypted on our server.
              </p>
            </div>

            {/* ── Error Message ── */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-[11px] font-bold text-red-400 uppercase tracking-wider">
                  {error}
                </p>
              </div>
            )}

            {/* Pricing Grid */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2 mb-3 block">
                  B/W Rate
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceBW}
                  onChange={(e) => setPriceBW(e.target.value)}
                  placeholder="2.00"
                  className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 ml-2 mb-3 block">
                  Color Rate
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={priceColor}
                  onChange={(e) => setPriceColor(e.target.value)}
                  placeholder="10.00"
                  className="w-full bg-white/[0.03] border border-white/10 text-white px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-bold"
                />
              </div>

            </div>

            {/* ── Submit Button ── */}
            <button
              onClick={createShop}
              disabled={loading}
              className="group w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Provisioning...
                </>
              ) : (
                <>
                  Establish Terminal
                  <Zap size={18} className="group-hover:fill-current transition-all" />
                </>
              )}
            </button>

          </div>
        </div>

        {/* Security Trust Badges */}
        <div className="mt-10 flex items-center justify-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Setup</span>
          </div>
          <div className="h-1 w-1 bg-slate-700 rounded-full" />
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Instant Deploy</span>
          </div>
        </div>

      </div>
    </div>
  );
}