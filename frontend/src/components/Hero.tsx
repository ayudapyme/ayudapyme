import { ArrowRight, ArrowDown, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="bg-hero">
      <div className="container-custom pt-20 pb-8 md:pt-28 md:pb-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          <div>
            <h1 className="text-[22px] sm:text-4xl md:text-[2.75rem] font-heading font-bold text-white mb-2 sm:mb-3 leading-[1.2] tracking-tight">
              Hay subvenciones para tu negocio
            </h1>

            <p className="text-[13px] sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Las encontramos y las tramitamos.
              <strong className="text-white"> Si no te lo conceden, no pagas nada.</strong>
            </p>

            <a
              href="#formulario"
              className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg bg-cta text-white font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] mb-2"
            >
              Calcular mis ayudas gratis
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+34601646362"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-white/70 font-medium text-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              601 64 63 62
            </a>
          </div>

          {/* Flecha abajo — indica dónde clicar, sobre todo en móvil */}
          <div className="flex justify-center lg:hidden mt-2">
            <a href="#formulario" className="animate-bounce text-white/40">
              <ArrowDown className="w-5 h-5" />
            </a>
          </div>

          {/* Card — solo desktop */}
          <div className="hidden lg:block">
            <div className="bg-white/[0.08] border border-white/[0.12] rounded-xl p-6">
              <p className="text-white/80 text-sm font-semibold mb-5">Algunas ayudas disponibles ahora</p>
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
              <a href="#formulario" className="block mt-4 text-center text-sm text-white/70 hover:text-white transition-colors">
                Estas son solo algunas. <span className="underline font-medium">Te decimos cuáles aplican a ti.</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
