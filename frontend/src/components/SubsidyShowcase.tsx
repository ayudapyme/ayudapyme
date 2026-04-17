import { ArrowRight } from "lucide-react";

const subsidies = [
  { name: "Kit Digital", amount: "12.000€", who: "Pymes 0-49 empl.", org: "Red.es" },
  { name: "Kit Digital Plus", amount: "29.000€", who: "Pymes 50-249 empl.", org: "Red.es" },
  { name: "Bono Enerxía Peme", amount: "hasta 50%", who: "Autónomos y pymes", org: "INEGA" },
  { name: "MOVES", amount: "7.000€", who: "Todos los sectores", org: "IDAE" },
  { name: "Kit Consulting", amount: "24.000€", who: "Pymes 10-249 empl.", org: "Red.es" },
  { name: "Programa Neotec", amount: "250.000€", who: "Startups", org: "CDTI" },
];

const SubsidyShowcase = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="container-custom">
        <div className="max-w-2xl mb-6 md:mb-10">
          <h2 className="text-xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Miles de euros que podrías estar cobrando
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Estas ayudas salen cada año. Si estás registrado, te avisamos y nos encargamos de todo.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-6 md:mb-8">
          {subsidies.map((s, i) => (
            <div
              key={i}
              className="rounded-lg md:rounded-xl border border-border bg-card p-3 md:p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-xl md:text-3xl font-heading font-bold text-foreground mb-1 md:mb-2">{s.amount}</div>
              <h3 className="font-heading font-semibold text-foreground text-xs md:text-base mb-0.5">{s.name}</h3>
              <p className="text-xs md:text-sm text-muted-foreground hidden sm:block">{s.who} · {s.org}</p>
              <p className="text-[11px] text-muted-foreground sm:hidden">{s.org}</p>
            </div>
          ))}
        </div>

        {/* CTA grande naranja — el formulario es LA solución */}
        <a
          href="#formulario"
          className="group flex items-center justify-between w-full p-4 md:p-6 rounded-xl bg-cta text-white hover:brightness-110 active:scale-[0.99] transition-all duration-200"
        >
          <div>
            <p className="font-heading font-bold text-base md:text-xl mb-0.5">
              La próxima puede ser la tuya
            </p>
            <p className="text-white/80 text-xs md:text-base">
              Déjanos tus datos y te avisamos.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};

export default SubsidyShowcase;
