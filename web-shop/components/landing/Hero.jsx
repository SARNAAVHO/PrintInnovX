import { Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-[#0b0f2a] via-[#14184a] to-[#1f2366] text-white">
      <div className="max-w-7xl mx-auto px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            QR-Based Cloud <br /> Printing Platform
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl">
            Transform any printer into a smart, pay-per-print service.
            No apps, no hassle. Scan, print, done.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/register"
              className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-md transition"
            >
              Get Started →
            </a>

            <a
              href="/download"
              className="inline-flex items-center justify-center border border-white/30 hover:border-white text-white font-medium px-8 py-3 rounded-md transition gap-2"
            >
              <Download size={16} />
              Download Agent
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-2xl bg-black/20">
            <img
              src="/images/land_img.jpeg"
              alt="Printer preview"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
