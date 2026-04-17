import { useState, useEffect } from "react";
import { ArrowRight, Phone } from "lucide-react";

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-border px-4 py-3 safe-area-bottom animate-slide-up">
      <div className="flex items-center gap-2">
        <a
          href="#formulario"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cta font-semibold text-sm active:scale-[0.98]"
        >
          Ver mis subvenciones
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="tel:+34601646362"
          className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border active:scale-[0.95]"
          aria-label="Llamar"
        >
          <Phone className="w-4 h-4 text-foreground" />
        </a>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
