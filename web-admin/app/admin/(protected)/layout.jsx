import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/admin-login");
  // }

  return <>{children}</>;
}
