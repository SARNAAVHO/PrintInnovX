import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-indigo-600 py-28">
      <div className="max-w-4xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Ready to Scale Your Printing Business?
        </h2>

        <p className="text-lg text-indigo-100 mb-12">
          Join the cloud printing revolution. Start accepting print jobs in minutes.
        </p>

        <Link
          href="/register"
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-md transition"
        >
          Register Your First Device
        </Link>

      </div>
    </section>
  );
}
