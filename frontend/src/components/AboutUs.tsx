import { Search, FileText, ThumbsUp, ArrowDown } from "lucide-react";

const steps = [
  { icon: Search, title: "Pones tu CIF", sub: "Con eso sabemos qué ayudas encajan contigo." },
  { icon: FileText, title: "Tramitamos todo", sub: "Un gestor profesional presenta el expediente." },
  { icon: ThumbsUp, title: "Tú cobras", sub: "Solo pagas el 15% cuando recibes el dinero." },
];

const AboutUs = () => {
  return (
    <section id="como-funciona" className="py-12 md:py-16 bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">
            Así de simple
          </h2>
        </div>

        {/* Horizontal flow with arrows */}
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-3">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-center p-5 rounded-lg bg-card border border-border">
                  <div className="relative inline-flex items-center justify-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-0.5">{step.title}</h3>
                  <p className="text-muted-foreground text-[13px]">{step.sub}</p>
                </div>
                {/* Arrow between cards (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-secondary border border-border items-center justify-center">
                    <ArrowDown className="w-2.5 h-2.5 text-muted-foreground rotate-[-90deg]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
