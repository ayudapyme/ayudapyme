import { Clock } from "lucide-react";

const past = [
  { name: "Kit Digital Seg. III", amount: "2.000€", org: "Red.es", closed: "Dic 2024" },
  { name: "Bono Enerxía Peme", amount: "hasta 50%", org: "INEGA", closed: "Ene 2025" },
  { name: "MOVES III Vehículos", amount: "hasta 7.000€", org: "IDAE", closed: "Feb 2025" },
  { name: "Kit Digital Seg. IV-V", amount: "29.000€", org: "Red.es", closed: "Mar 2025" },
];

const PastSubsidies = () => {
  return (
    <section className="py-10 md:py-12">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 text-center">
            Convocatorias que ya cerraron
          </p>
          <div className="space-y-1.5">
            {past.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/60 text-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-heading font-semibold text-foreground truncate">{s.name}</span>
                  <span className="text-muted-foreground text-xs hidden sm:inline">· {s.org}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-heading font-bold text-foreground text-sm">{s.amount}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    <Clock className="w-2.5 h-2.5" />
                    {s.closed}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground text-xs mt-4">
            Si hubieras estado registrado, te habríamos avisado.
            <a href="#formulario" className="text-primary font-semibold ml-1 hover:underline">No te pierdas las próximas.</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PastSubsidies;
