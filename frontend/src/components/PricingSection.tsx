import { ArrowRight, Check, Search, FileText, ThumbsUp } from "lucide-react";

const includes = [
  "Análisis completo de tu empresa",
  "Monitorización de ayudas nuevas",
  "Te avisamos cuando sale algo para ti",
  "Preparamos todo el expediente",
  "Lo presentamos en tu nombre",
  "Seguimiento hasta que cobres",
];

const PricingSection = () => {
  return (
    <section id="como-funciona" className="py-10 md:py-20">
      <div className="container-custom">

        {/* 3 steps */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 max-w-sm md:max-w-md mx-auto mb-10 md:mb-14">
          {[
            { icon: Search, num: "1", label: "Pones tu CIF" },
            { icon: FileText, num: "2", label: "Tramitamos" },
            { icon: ThumbsUp, num: "3", label: "Tú cobras" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 mb-1.5 md:mb-2 relative">
                <step.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-accent text-white text-[10px] md:text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <p className="font-heading font-bold text-foreground text-sm md:text-base">{step.label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h2 className="text-xl md:text-4xl font-heading font-bold text-foreground mb-1.5">
            Sin letra pequeña
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Solo ganamos si tú ganas.</p>
        </div>

        {/* Pricing card */}
        <div className="bg-hero rounded-xl md:rounded-2xl p-4 md:p-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <span className="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-white bg-white/15 px-2.5 py-0.5 md:px-3 md:py-1 rounded mb-4">
                100% a éxito
              </span>

              <div className="flex items-baseline gap-2 mb-2 md:mb-3">
                <span className="text-4xl md:text-6xl font-heading font-bold text-white">0€</span>
                <span className="text-white/70 text-base md:text-lg">coste inicial</span>
              </div>

              <p className="text-white/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6">
                Analizamos tu empresa gratis. Solo cobramos si te conceden la subvención.
              </p>

              <div className="bg-white/10 border border-white/15 rounded-lg md:rounded-xl p-3 md:p-5">
                <span className="text-xs md:text-sm font-bold text-white/70 mb-2 md:mb-3 block">Ejemplo real</span>
                <div className="space-y-1.5 md:space-y-2.5">
                  <div className="flex justify-between text-white/80 text-sm md:text-base">
                    <span>Subvención</span>
                    <span className="font-bold text-white text-base md:text-xl">40.000€</span>
                  </div>
                  <div className="flex justify-between text-white/80 text-sm md:text-base">
                    <span>Comisión (15%)</span>
                    <span className="text-white/80">6.000€</span>
                  </div>
                  <div className="border-t border-white/15 pt-2 md:pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-white text-sm md:text-lg">Te quedas</span>
                    <span className="font-bold text-white text-2xl md:text-3xl">34.000€</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs md:text-sm font-bold text-white/70 mb-3 md:mb-5 block mt-4 md:mt-0">Qué incluye</span>
              <ul className="space-y-2 md:space-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#formulario"
                className="group inline-flex items-center gap-2 mt-5 md:mt-8 px-6 py-3 md:px-7 md:py-3.5 rounded-lg bg-cta text-white font-bold text-sm md:text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Calcular mis ayudas gratis
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
