import { Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contacto" className="py-6 md:py-20">
      <div className="container-custom text-center">
        <h2 className="text-[17px] md:text-3xl font-heading font-bold text-foreground mb-3 md:mb-8">
          Llámanos
        </h2>
        <div className="flex gap-2 justify-center">
          <a
            href="tel:+34601646362"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-cta text-white font-bold text-sm active:scale-[0.98]"
          >
            <Phone className="w-3.5 h-3.5" />
            601 64 63 62
          </a>
          <a
            href="mailto:admin@ayudapyme.es"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg border border-border text-foreground font-semibold text-sm active:scale-[0.98]"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
