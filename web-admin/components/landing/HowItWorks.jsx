import StepCard from "../common/StepCard";

export default function HowItWorks() {
  return (
    <section className="bg-white py-28">
      <div className="max-w-7xl mx-auto px-20 gap-12">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            How It Works
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Three simple steps to transform your printing business
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <StepCard
            number="01"
            title="Register Your Device"
            description="Add your printer to the cloud platform. Get a unique QR code instantly."
          />

          <StepCard
            number="02"
            title="Install Print Agent"
            description="Download and run our lightweight agent on any Windows or Linux device."
          />

          <StepCard
            number="03"
            title="Start Earning"
            description="Users scan, pay, and print. You receive payments automatically."
          />
        </div>

      </div>
    </section>
  );
}
