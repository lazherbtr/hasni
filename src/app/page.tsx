import { LanguageProvider } from "@/lib/i18n";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import IndustriesSection from "@/components/IndustriesSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";

function PageGlow() {
  return (
    <div className="page-glow" aria-hidden>
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#f5e8dc]/80 blur-3xl" />
      <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-[#e8f0ea]/70 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full bg-[#faf3ed]/90 blur-3xl" />
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <PageGlow />
      <div className="min-h-screen relative">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <IndustriesSection />
          <ServicesSection />
          <ProcessSection />
          <TrustSection />
          <RequestForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
