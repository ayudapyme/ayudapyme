import { ArrowRight, Check, Search, FileText, ThumbsUp } from "lucide-react";

const includes = [
  "Análisis completo de tu empresa",
  "Monitorización continua de ayudas nuevas",
  "Te avisamos cuando sale algo para ti",
  "Preparamos todo el expediente",
  "Lo presentamos en tu nombre",
  "Seguimiento hasta que cobres",
];

const PricingSection = () => {
  return (
    <section id="como-funciona" className="py-14 md:py-20">
      <div className="container-custom">

        {/* 3 steps */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-14">
          {[
            { icon: Search, num: "1", label: "Pones tu CIF" },
            { icon: FileText, num: "2", label: "Tramitamos todo" },
            { icon: ThumbsUp, num: "3", label: "Tú cobras" },
          ].map((step, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-2 relative">
                <step.icon className="w-5 h-5 text-primary" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <p className="font-heading font-bold text-foreground text-base">{step.label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Sin letra pequeña
          </h2>
          <p className="text-muted-foreground text-base">Solo ganamos si tú ganas. Y eso nos obliga a hacerlo bien.</p>
        </div>

        {/* Pricing card */}
        <div className="bg-hero rounded-2xl p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-widest text-white bg-white/15 px-3 py-1 rounded mb-5">
                100% a éxito
              </span>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl md:text-6xl font-heading font-bold text-white">0€</span>
                <span className="text-white/70 text-lg">coste inicial</span>
              </div>

              <p className="text-white/80 text-base leading-relaxed mb-6">
                Analizamos tu empresa gratis. Solo cobramos si te conceden la subvención.
              </p>

              <div className="bg-white/10 border border-white/15 rounded-xl p-5">
                <span className="text-sm font-bold text-white/70 mb-3 block">Ejemplo real</span>
                <div className="space-y-2.5">
                  <div className="flex justify-between text-white/80 text-base">
                    <span>Subvención conseguida</span>
                    <span className="font-bold text-white text-xl">40.000€</span>
                  </div>
                  <div className="flex justify-between text-white/80 text-base">
                    <span>Nuestra comisión (15%)</span>
                    <span className="text-white/80">6.000€</span>
                  </div>
                  <div className="border-t border-white/15 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-white text-lg">Lo que te quedas</span>
                    <span className="font-bold text-white text-3xl">34.000€</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-sm font-bold text-white/70 mb-5 block">Qué incluye</span>
              <ul className="space-y-3">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#formulario"
                className="group inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-lg bg-cta text-white font-bold text-base transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
              >
                Ver cuánto me corresponde
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
