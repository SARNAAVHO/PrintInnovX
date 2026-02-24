import Link from "next/link";
import { Printer } from "lucide-react";
import RegisterDeviceForm from "../../components/forms/RegisterDeviceForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Printer className="text-indigo-600" size={20} strokeWidth={1.8} />
            Device Registration
          </div>

          <Link
            href="/"
            className="border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-orange-500 hover:text-white hover:border-none transition"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex justify-center px-6 pt-10 pb-20">
        <RegisterDeviceForm />
      </main>

    </div>
  );
}
