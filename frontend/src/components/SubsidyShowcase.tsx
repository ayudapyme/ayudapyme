import { ArrowRight } from "lucide-react";

const subsidies = [
  { name: "Kit Digital", amount: "12.000€", org: "Red.es" },
  { name: "Kit Digital Plus", amount: "29.000€", org: "Red.es" },
  { name: "Bono Enerxía", amount: "hasta 50%", org: "INEGA" },
  { name: "MOVES", amount: "7.000€", org: "IDAE" },
  { name: "Kit Consulting", amount: "24.000€", org: "Red.es", hideOnMobile: true },
  { name: "Neotec", amount: "250.000€", org: "CDTI", hideOnMobile: true },
];

const SubsidyShowcase = () => {
  return (
    <section className="py-8 md:py-20">
      <div className="container-custom">
        <div className="mb-4 md:mb-10">
          <h2 className="text-lg md:text-4xl font-heading font-bold text-foreground mb-1">
            Miles de euros que podrías estar cobrando
          </h2>
          <p className="text-muted-foreground text-xs md:text-base">
            Estas ayudas salen cada año. Te avisamos cuando abran.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 md:gap-3 mb-4 md:mb-8">
          {subsidies.map((s, i) => (
            <div
              key={i}
              className={`rounded-lg border border-border bg-card p-2.5 md:p-5 ${s.hideOnMobile ? "hidden md:block" : ""}`}
            >
              <div className="text-base md:text-3xl font-heading font-bold text-foreground mb-0.5 md:mb-2">{s.amount}</div>
              <h3 className="font-heading font-semibold text-foreground text-[11px] md:text-base">{s.name}</h3>
              <p className="text-[10px] md:text-sm text-muted-foreground">{s.org}</p>
            </div>
          ))}
        </div>

        <a
          href="#formulario"
          className="group flex items-center justify-between w-full p-3 md:p-6 rounded-lg md:rounded-xl bg-cta text-white active:scale-[0.99] transition-all"
        >
          <div>
            <p className="font-heading font-bold text-sm md:text-xl">La próxima puede ser la tuya</p>
            <p className="text-white/80 text-[11px] md:text-base">Déjanos tus datos y te avisamos.</p>
          </div>
          <ArrowRight className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 ml-2" />
        </a>
      </div>
    </section>
  );
};

export default SubsidyShowcase;
