import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Nada hasta que cobres. Si te conceden la subvención, cobramos el 15%. Si no, no pagas nada.",
  },
  {
    q: "¿Qué tengo que hacer yo?",
    a: "Rellenar el formulario. Nosotros buscamos las ayudas, preparamos el expediente y lo presentamos. Tú solo firmas una vez.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El análisis, menos de 48 horas. La resolución depende de la administración: de 2 meses a 1 año.",
  },
  {
    q: "¿Y si no me la conceden?",
    a: "No pagas nada. Solo presentamos expedientes con posibilidades reales.",
  },
  {
    q: "¿Solo para Galicia?",
    a: "No. Toda España. Convocatorias nacionales, autonómicas y europeas.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-10 md:py-20 bg-hero">
      <div className="container-custom">
        {/* En móvil: heading + accordion apilados. En desktop: lado a lado */}
        <div className="grid lg:grid-cols-5 gap-5 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-3xl font-heading font-bold text-white mb-1">
              Resolvemos tus dudas
            </h2>
            <p className="text-white/70 text-sm md:text-base">
              Lo que necesitas saber antes de dar el paso.
            </p>
          </div>

          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-1.5 md:space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/10 border border-white/15 rounded-lg px-4 md:px-5 data-[state=open]:bg-white/15 transition-colors"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-white hover:no-underline py-3 md:py-4 text-sm md:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-3 md:pb-4 leading-relaxed text-sm md:text-base">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
