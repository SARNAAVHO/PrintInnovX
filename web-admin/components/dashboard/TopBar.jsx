import { Printer } from "lucide-react";

export default function TopBar() {
  return (
    <header className="bg-white border-gray-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Printer className="text-indigo-600" />
          PrintInnovX Admin
        </div>
      </div>
    </header>
  );
}
