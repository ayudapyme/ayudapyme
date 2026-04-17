import { ArrowRight } from "lucide-react";

const subsidies = [
  { name: "Kit Digital", amount: "12.000€", who: "Pymes de 0 a 49 empleados", org: "Red.es" },
  { name: "Kit Digital Plus", amount: "29.000€", who: "Pymes de 50 a 249 empleados", org: "Red.es" },
  { name: "Bono Enerxía Peme", amount: "hasta 50%", who: "Autónomos y pymes en Galicia", org: "INEGA" },
  { name: "MOVES", amount: "7.000€", who: "Todos los sectores", org: "IDAE" },
  { name: "Kit Consulting", amount: "24.000€", who: "Pymes de 10 a 249 empleados", org: "Red.es" },
  { name: "Programa Neotec", amount: "250.000€", who: "Startups tecnológicas", org: "CDTI" },
];

const SubsidyShowcase = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container-custom">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Miles de euros que podrías estar cobrando
          </h2>
          <p className="text-muted-foreground text-base">
            Estas ayudas salen cada año. Si estás registrado, te avisamos y nos encargamos de todo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {subsidies.map((s, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-3xl font-heading font-bold text-foreground mb-2">{s.amount}</div>
              <h3 className="font-heading font-semibold text-foreground text-base mb-1">{s.name}</h3>
              <p className="text-sm text-muted-foreground">{s.who} · {s.org}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 border border-primary/15 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-heading font-bold text-foreground text-lg mb-0.5">
              La próxima convocatoria puede ser la tuya
            </p>
            <p className="text-muted-foreground text-base">
              Déjanos tus datos y te avisamos cuando salga algo para ti.
            </p>
          </div>
          <a
            href="#formulario"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-cta text-white font-bold text-base whitespace-nowrap transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            Ver las mías
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubsidyShowcase;
