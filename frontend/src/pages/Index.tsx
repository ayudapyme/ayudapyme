import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SubsidyShowcase from "@/components/SubsidyShowcase";
import MultiStepForm from "@/components/MultiStepForm";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <main>
        <Hero />
        <SubsidyShowcase />
        <MultiStepForm />
        <PricingSection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
