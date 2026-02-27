import { Printer } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg cursor-pointer text-black">
          <Printer className="text-indigo-600" />
          PrintInnovX Admin
        </div>
        <Link
            href="/"
            className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-500 hover:text-white hover:border-none transition"
          >
            Back to Home
          </Link>
      </div>
    </header>
  );
}
