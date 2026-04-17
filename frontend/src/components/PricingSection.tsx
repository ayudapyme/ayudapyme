import { ArrowRight, Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section id="como-funciona" className="py-6 md:py-20">
      <div className="container-custom">
        <h2 className="text-[17px] md:text-4xl font-heading font-bold text-foreground mb-0.5 md:mb-2 text-center">
          Sin letra pequeña
        </h2>
        <p className="text-muted-foreground text-xs md:text-base mb-4 md:mb-8 text-center">Solo ganamos si tú ganas.</p>

        {/* Pricing card */}
        <div className="bg-hero rounded-xl p-3 md:p-10">
          {/* Badge */}
          <span className="inline-block text-[10px] md:text-sm font-bold uppercase tracking-wider text-white bg-white/15 px-2 py-0.5 rounded mb-3 md:mb-5">
            100% a éxito
          </span>

          {/* 0€ + ejemplo en fila en desktop, apilado en móvil */}
          <div className="grid md:grid-cols-2 gap-3 md:gap-12">
            <div>
              <div className="flex items-baseline gap-1.5 mb-1 md:mb-3">
                <span className="text-3xl md:text-6xl font-heading font-bold text-white">0€</span>
                <span className="text-white/70 text-xs md:text-lg">coste inicial</span>
              </div>

              {/* Ejemplo real — compacto en móvil */}
              <div className="bg-white/10 rounded-lg p-2.5 md:p-5 text-[12px] md:text-base">
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Subvención</span>
                  <span className="font-bold text-white">40.000€</span>
                </div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Comisión (15%)</span>
                  <span>6.000€</span>
                </div>
                <div className="border-t border-white/15 pt-1 md:pt-3 flex justify-between items-baseline">
                  <span className="font-bold text-white">Te quedas</span>
                  <span className="font-bold text-white text-lg md:text-3xl">34.000€</span>
                </div>
              </div>
            </div>

            {/* Qué incluye */}
            <div className="mt-1 md:mt-0">
              <ul className="grid grid-cols-2 md:grid-cols-1 gap-1 md:gap-3">
                {[
                  "Análisis de tu empresa",
                  "Monitorización de ayudas",
                  "Te avisamos",
                  "Preparamos expediente",
                  "Lo presentamos",
                  "Seguimiento completo",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-1 md:gap-2">
                    <Check className="w-3 h-3 md:w-5 md:h-5 text-white flex-shrink-0" />
                    <span className="text-white/90 text-[11px] md:text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#formulario"
                className="group inline-flex items-center gap-1.5 mt-3 md:mt-8 px-4 py-2 md:px-7 md:py-3.5 rounded-lg bg-cta text-white font-bold text-sm transition-all active:scale-[0.98]"
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
