import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="bg-hero">
      <div className="container-custom pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          {/* Left */}
          <div>
            {/* Urgencia */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-white/80 text-sm">Convocatorias con plazos abiertos ahora</span>
            </div>

            {/* Titular específico */}
            <h1 className="text-[1.65rem] sm:text-4xl md:text-[2.75rem] font-heading font-bold text-white mb-3 md:mb-4 leading-[1.15] tracking-tight">
              <span className="sm:hidden">Descubre qué subvenciones puede conseguir tu empresa</span>
              <span className="hidden sm:inline">Descubre en 2 minutos qué subvenciones puede conseguir tu empresa</span>
            </h1>

            <p className="text-base text-white/80 mb-6 max-w-md leading-relaxed">
              Analizamos tu perfil, encontramos las ayudas que te corresponden y tramitamos todo el papeleo.
              <strong className="text-white"> Si no te lo conceden, no pagas nada.</strong>
            </p>

            {/* CTA orientado a resultado */}
            <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cta text-white font-bold text-sm sm:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Calcular mis ayudas gratis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+34601646362"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/25 text-white font-medium text-sm sm:text-base transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                601 64 63 62
              </a>
            </div>

            {/* Prueba social */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/60 text-sm">
              <span>500+ ayudas monitorizadas</span>
              <span className="text-white/30">·</span>
              <span>Análisis en 48h</span>
              <span className="text-white/30">·</span>
              <span>Toda España</span>
            </div>
          </div>

          {/* Right — card accionable */}
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
              {/* Microcopy accionable */}
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
