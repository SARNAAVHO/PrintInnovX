import Hero from "../components/landing/Hero";
import WhyPrintCloud from "../components/landing/WhyPrintCloud";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero />
      <WhyPrintCloud />
      <HowItWorks />
      <CTASection />
      <Footer/>
    </main>
  );
}
