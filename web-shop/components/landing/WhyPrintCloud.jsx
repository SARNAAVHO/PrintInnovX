import {
  QrCode,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import FeatureCard from "../common/FeatureCard";

export default function WhyPrintCloud() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why PrintInnovX?
          </h2>
          <p className="mt-4 text-gray-600">
            Enterprise-grade printing infrastructure for modern businesses
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <FeatureCard
            icon={<QrCode size={40} strokeWidth={1.8} />}
            title="QR-Based Access"
            description="Users scan a QR code to print instantly. No app installation required."
          />

          <FeatureCard
            icon={<Zap size={40} strokeWidth={1.8} />}
            title="Instant Payments"
            description="Integrated Razorpay ensures secure, fast payments before printing."
          />

          <FeatureCard
            icon={<ShieldCheck size={40} strokeWidth={1.8} />}
            title="Secure by Design"
            description="Device authentication, payment verification, and encrypted connections."
          />

          <FeatureCard
            icon={<TrendingUp size={40} strokeWidth={1.8} />}
            title="Real-Time Analytics"
            description="Track revenue, job status, and device health from a unified dashboard."
          />

        </div>

      </div>
    </section>
  );
}
