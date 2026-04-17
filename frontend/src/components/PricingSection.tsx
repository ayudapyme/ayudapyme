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
    <section id="como-funciona" className="py-8 md:py-20">
      <div className="container-custom">

        {/* 3 steps — compacto en móvil */}
        <div className="flex justify-center gap-6 md:gap-8 mb-6 md:mb-14">
          {[
            { icon: Search, num: "1", label: "Tu CIF" },
            { icon: FileText, num: "2", label: "Tramitamos" },
            { icon: ThumbsUp, num: "3", label: "Cobras" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 mb-1 relative">
                <step.icon className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-accent text-white text-[8px] md:text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <p className="font-heading font-bold text-foreground text-[11px] md:text-base">{step.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-4 md:mb-8">
          <h2 className="text-lg md:text-4xl font-heading font-bold text-foreground mb-1">Sin letra pequeña</h2>
          <p className="text-muted-foreground text-xs md:text-base">Solo ganamos si tú ganas.</p>
        </div>

        {/* Pricing card */}
        <div className="bg-hero rounded-xl p-3.5 md:p-10">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12">
            <div>
              <span className="inline-block text-[10px] md:text-sm font-bold uppercase tracking-wider text-white bg-white/15 px-2 py-0.5 rounded mb-3 md:mb-5">
                100% a éxito
              </span>

              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-3xl md:text-6xl font-heading font-bold text-white">0€</span>
                <span className="text-white/70 text-sm md:text-lg">coste inicial</span>
              </div>

              <p className="text-white/80 text-xs md:text-base mb-3 md:mb-6">
                Solo cobramos si te conceden la subvención.
              </p>

              <div className="bg-white/10 border border-white/15 rounded-lg p-2.5 md:p-5 text-xs md:text-base">
                <span className="text-[10px] md:text-sm font-bold text-white/70 mb-1.5 md:mb-3 block">Ejemplo real</span>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Subvención</span>
                  <span className="font-bold text-white text-sm md:text-xl">40.000€</span>
                </div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Comisión (15%)</span>
                  <span>6.000€</span>
                </div>
                <div className="border-t border-white/15 pt-1.5 md:pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-white text-xs md:text-lg">Te quedas</span>
                  <span className="font-bold text-white text-xl md:text-3xl">34.000€</span>
                </div>
              </div>
            </div>

            <div className="mt-1 md:mt-0">
              <span className="text-[10px] md:text-sm font-bold text-white/70 mb-2 md:mb-5 block">Qué incluye</span>
              <ul className="space-y-1.5 md:space-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 md:gap-2">
                    <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-xs md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#formulario"
                className="group inline-flex items-center gap-1.5 mt-4 md:mt-8 px-4 py-2.5 md:px-7 md:py-3.5 rounded-lg bg-cta text-white font-bold text-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Calcular mis ayudas
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
