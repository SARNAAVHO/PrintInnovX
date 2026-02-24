import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ShopRedirectPage() {
  const { userId } = auth();

  if (!userId) redirect("/");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/shop/me`,
    {
      headers: {
        "x-clerk-user-id": userId,
      },
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    redirect("/onboarding");
  }

  if (!res.ok) {
    redirect("/");
  }

  redirect("/shop");
}