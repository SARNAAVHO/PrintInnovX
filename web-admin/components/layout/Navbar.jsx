import Link from "next/link";
import { Printer } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-br from-[#0b0f2a] via-[#14184a] to-[#1f2366]">
      <div className="max-w-7xl mx-auto px-12 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-semibold text-lg"
        >
          <Printer size={22} strokeWidth={1.8} className="text-indigo-400" />
          PrintInnovX
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">

          {/* Admin link */}
          <Link
            href="/admin"
            className="text-sm text-white/80 hover:text-white transition"
          >
            Admin
          </Link>

          {/* Register Device button */}
          <Link
            href="/register"
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            Register Device
          </Link>

        </div>

      </div>
    </header>
  );
}
