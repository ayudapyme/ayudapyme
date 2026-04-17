import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuánto cuesta?", a: "Nada hasta que cobres. 15% si se concede. Si no, 0€." },
  { q: "¿Qué tengo que hacer?", a: "Rellenar el formulario. Nosotros hacemos el resto." },
  { q: "¿Cuánto tarda?", a: "Análisis en 48h. Resolución: 2 meses a 1 año según convocatoria." },
  { q: "¿Y si no me la conceden?", a: "No pagas nada. Solo presentamos expedientes viables." },
  { q: "¿Solo para Galicia?", a: "No. Toda España." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-8 md:py-20 bg-hero">
      <div className="container-custom">
        <div className="lg:grid lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2 mb-3 lg:mb-0">
            <h2 className="text-lg md:text-3xl font-heading font-bold text-white mb-0.5">
              Resolvemos tus dudas
            </h2>
            <p className="text-white/70 text-xs md:text-base">Antes de dar el paso.</p>
          </div>

          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-1">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/10 border border-white/15 rounded-lg px-3 md:px-5 data-[state=open]:bg-white/15 transition-colors"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-white hover:no-underline py-2.5 md:py-4 text-sm md:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-2.5 md:pb-4 text-xs md:text-base">
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
