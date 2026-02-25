"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api";
import { Loader2, Store } from "lucide-react";

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { apiFetch } = useApi();

  const [shopName, setShopName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createShop = async () => {
    if (!shopName.trim()) {
      setError("Shop name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await apiFetch("/api/shop/create", {
        method: "POST",
        body: JSON.stringify({
          shopName,
          ownerName: user?.fullName || user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border p-10">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <Store className="text-indigo-600" size={24} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
          Create Your Shop
        </h2>

        <p className="text-sm text-gray-500 text-center mb-8">
          Set up your shop to start managing devices and print jobs.
        </p>

        {/* Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shop Name
          </label>

          <input
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder="e.g. Campus Print Shop"
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-4 py-2.5 rounded-lg outline-none transition"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4">
            {error}
          </p>
        )}

        {/* Button */}
        <button
          onClick={createShop}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Creating...
            </>
          ) : (
            "Create Shop"
          )}
        </button>
      </div>
    </div>
  );
}