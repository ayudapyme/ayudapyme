import { Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-14 md:py-20">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
            Llámanos. Te lo explicamos en 5 minutos.
          </h2>
          <p className="text-muted-foreground text-base mb-8">
            Sin compromiso, sin letra pequeña.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a
              href="tel:+34601646362"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-cta text-white font-bold text-base hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <Phone className="w-4 h-4" />
              601 64 63 62
            </a>
            <a
              href="mailto:admin@ayudapyme.es"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-border text-foreground font-semibold text-base hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <Mail className="w-4 h-4 text-muted-foreground" />
              admin@ayudapyme.es
            </a>
          </div>

          <p className="text-muted-foreground text-sm">L-V de 10:00 a 19:00 · Respondemos en menos de 24h</p>
        </div>
      </div>
    </section>
  );
}
