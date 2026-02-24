"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { userId } = useAuth();
  const router = useRouter();

  const [ownerName, setOwnerName] = useState("");
  const [shopName, setShopName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shop/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-user-id": userId,
        },
        body: JSON.stringify({ ownerName, shopName }),
      }
    );

    router.push("/shop");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Create Your Shop</h2>

        <input
          placeholder="Owner Name"
          className="border p-2 mb-3 w-full"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          required
        />

        <input
          placeholder="Shop Name"
          className="border p-2 mb-4 w-full"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Create Shop
        </button>
      </form>
    </div>
  );
}