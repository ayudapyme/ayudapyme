import { ArrowRight, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section id="inicio" className="bg-hero">
      <div className="container-custom pt-20 pb-8 md:pt-28 md:pb-14">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">

          <div>
            {/* Badge — oculto en móvil, no aporta */}
            <div className="hidden sm:inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-white/80 text-sm">Convocatorias con plazos abiertos ahora</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-[2.75rem] font-heading font-bold text-white mb-3 leading-[1.15] tracking-tight">
              Descubre qué subvenciones puede conseguir tu empresa
            </h1>

            <p className="text-sm sm:text-base text-white/80 mb-5 max-w-md leading-relaxed">
              Encontramos las ayudas, tramitamos todo.
              <strong className="text-white"> Si no te lo conceden, no pagas nada.</strong>
            </p>

            <div className="flex gap-2 mb-3">
              <a
                href="#formulario"
                className="group inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-cta text-white font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Calcular mis ayudas
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="tel:+34601646362"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg border border-white/25 text-white font-medium text-sm transition-colors hover:bg-white/10 active:scale-[0.98]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">601 64 63 62</span>
                <span className="sm:hidden">Llamar</span>
              </a>
            </div>

            {/* Prueba social — solo desktop */}
            <div className="hidden sm:flex flex-wrap items-center gap-x-4 gap-y-1 text-white/60 text-sm">
              <span>500+ ayudas</span>
              <span className="text-white/30">·</span>
              <span>Análisis en 48h</span>
              <span className="text-white/30">·</span>
              <span>Toda España</span>
            </div>
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
