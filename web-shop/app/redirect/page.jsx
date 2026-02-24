import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const { userId } = auth();

  console.log("USER ID:", userId);

  if (!userId) {
    console.log("No userId → redirecting /");
    redirect("/");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/role`,
    {
      headers: {
        "x-clerk-user-id": userId,
      },
      cache: "no-store",
    }
  );

  console.log("Backend status:", res.status);

  if (!res.ok) {
    console.log("Backend not ok → redirect /");
    redirect("/");
  }

  const data = await res.json();
  console.log("Role response:", data);

  if (data.role === "ADMIN") redirect("/admin");
  if (data.role === "SHOP") redirect("/shop");

  console.log("Role NONE → onboarding");
  redirect("/onboarding");
}