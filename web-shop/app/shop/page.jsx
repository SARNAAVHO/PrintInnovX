import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ShopPage() {
  const { userId } = auth();

  if (!userId) redirect("/shop-login");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Shop Dashboard</h1>
      <a
        href="/shop/devices/new"
        className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Register Device
      </a>
    </div>
  );
}