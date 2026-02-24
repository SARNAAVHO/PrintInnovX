"use client";

import { SignIn } from "@clerk/nextjs";

export default function ShopLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <SignIn
        path="/shop-login"
        routing="path"
        afterSignInUrl="/shop-redirect"
        afterSignUpUrl="/shop-redirect"
      />
    </div>
  );
}