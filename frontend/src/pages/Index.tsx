import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
