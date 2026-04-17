import { Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-8 md:py-20">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-lg md:text-3xl font-heading font-bold text-foreground mb-1">
            Llámanos. 5 minutos.
          </h2>
          <p className="text-muted-foreground text-xs md:text-base mb-4 md:mb-8">Sin compromiso.</p>

          <div className="flex gap-2 justify-center mb-2">
            <a
              href="tel:+34601646362"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 md:px-6 md:py-3 rounded-lg bg-cta text-white font-bold text-sm active:scale-[0.98] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              601 64 63 62
            </a>
            <a
              href="mailto:admin@ayudapyme.es"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 md:px-6 md:py-3 rounded-lg border border-border text-foreground font-semibold text-sm active:scale-[0.98] transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">admin@ayudapyme.es</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>

          <p className="text-muted-foreground text-[10px] md:text-sm">L-V 10:00–19:00</p>
        </div>
      </div>
    </section>
  );
}
