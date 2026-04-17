import { ArrowRight } from "lucide-react";

const subsidies = [
  { name: "Kit Digital", amount: "12.000€", org: "Red.es" },
  { name: "Kit Digital Plus", amount: "29.000€", org: "Red.es" },
  { name: "Bono Enerxía", amount: "hasta 50%", org: "INEGA" },
  { name: "MOVES", amount: "7.000€", org: "IDAE" },
];

const SubsidyShowcase = () => {
  return (
    <section className="hidden md:block py-6 md:py-20">
      <div className="container-custom">
        <h2 className="text-[17px] md:text-4xl font-heading font-bold text-foreground mb-1 md:mb-2">
          Miles de euros que podrías estar cobrando
        </h2>
        <p className="text-muted-foreground text-xs md:text-base mb-3 md:mb-8">
          Estas ayudas salen cada año. Te avisamos cuando abran.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3 mb-3 md:mb-8">
          {subsidies.map((s, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-2.5 md:p-5">
              <div className="text-[15px] md:text-3xl font-heading font-bold text-foreground mb-0.5">{s.amount}</div>
              <div className="text-[11px] md:text-base font-semibold text-foreground">{s.name}</div>
              <div className="text-[10px] md:text-sm text-muted-foreground">{s.org}</div>
            </div>
          ))}
        </div>

        <a
          href="#formulario"
          className="group flex items-center justify-between w-full p-3 md:p-6 rounded-lg bg-cta text-white active:scale-[0.99] transition-all"
        >
          <div>
            <div className="font-heading font-bold text-[13px] md:text-xl">La próxima puede ser la tuya</div>
            <div className="text-white/80 text-[11px] md:text-base">Déjanos tus datos y te avisamos.</div>
          </div>
          <ArrowRight className="w-4 h-4 md:w-6 md:h-6 flex-shrink-0 ml-2" />
        </a>
      </div>
    </section>
  );
};

export default SubsidyShowcase;
