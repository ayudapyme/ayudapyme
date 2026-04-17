import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="bg-hero">
      <div className="container-custom pt-24 pb-12 md:pt-28 md:pb-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-heading font-bold text-white mb-4 leading-[1.15] tracking-tight">
              Hay dinero público para tu negocio.
              <br className="hidden md:block" />
              Nosotros lo conseguimos.
            </h1>

            <p className="text-lg text-white/80 mb-7 max-w-md leading-relaxed">
              Te decimos cuánto puedes cobrar, preparamos todo el papeleo y lo presentamos.
              <strong className="text-white"> Si no te lo conceden, no pagas nada.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-cta text-white font-bold text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Ver cuánto me corresponde
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+34601646362"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-white/25 text-white font-medium text-base transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                601 64 63 62
              </a>
            </div>

            <p className="text-white/60 text-sm">Gratuito · Sin compromiso · En toda España</p>
          </div>

          {/* Right */}
          <div className="hidden lg:block">
            <div className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-6">
              <p className="text-white/80 text-sm font-semibold mb-5">Ayudas disponibles para pymes</p>
              {[
                { name: "Kit Digital", amount: "12.000€" },
                { name: "Kit Consulting", amount: "24.000€" },
                { name: "Eficiencia Energética", amount: "hasta 55%" },
                { name: "Bono Enerxía Peme", amount: "hasta 50%" },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.08] last:border-0">
                  <span className="text-white text-base font-medium">{s.name}</span>
                  <span className="text-white font-heading font-bold text-lg">{s.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
