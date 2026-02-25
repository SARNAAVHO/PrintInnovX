"use client";

import Link from "next/link";
import { Printer } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <header className="w-full bg-gradient-to-br from-[#0b0f2a] via-[#14184a] to-[#1f2366]">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold text-lg"
        >
          <Printer
            size={22}
            strokeWidth={1.8}
            className="text-indigo-400"
          />
          PrintInnovX
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">

          {!isSignedIn ? (
            <>
              {/* <Link
                href="/download"
                className="text-white text-sm hover:text-indigo-300 transition"
              >
                Download
              </Link> */}

              <Link
                href="/register"
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
              >
                Register Device
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="text-white text-sm hover:bg-indigo-700 transition bg-indigo-600 border-none rounded px-4 py-2"
              >
                Dashboard
              </Link>

              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
            </>
          )}

        </div>
      </div>
    </header>
  );
}