"use client";

import { useSignIn, useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { isSignedIn, getToken } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [syncing, setSyncing] = useState(false);

  // 🔒 If already signed in → ensure admin → redirect
  useEffect(() => {
    if (!isSignedIn || syncing) return;

    async function syncAdmin() {
      try {
        setSyncing(true);

        const token = await getToken();
        if (!token) return;

        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/auth/ensure`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        router.replace("/admin");
      } catch (err) {
        console.error("Admin sync failed:", err);
      }
    }

    syncAdmin();
  }, [isSignedIn, getToken, router, syncing]);

  if (!isLoaded) return null;

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // 🔁 admin sync handled by useEffect
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Login failed");
    }
  }

  async function loginWithGoogle() {
    if (isSignedIn) return;

    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/admin-login",
      redirectUrlComplete: "/admin-login",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full p-3 rounded-lg border mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg border mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
        >
          Sign In
        </button>

        <div className="my-6 text-center text-slate-400">OR</div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full py-3 border rounded-lg font-medium hover:bg-slate-50"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
}
