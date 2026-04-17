import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cuánto cuesta?", a: "Nada hasta que cobres. 15% si se concede." },
  { q: "¿Qué hago yo?", a: "Rellenas el formulario. Nosotros hacemos el resto." },
  { q: "¿Cuánto tarda?", a: "Análisis en 48h. Resolución: 2-12 meses." },
  { q: "¿Y si no me la dan?", a: "No pagas nada." },
  { q: "¿Solo Galicia?", a: "No. Toda España." },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-6 md:py-20 bg-hero">
      <div className="container-custom">
        <h2 className="text-[17px] md:text-3xl font-heading font-bold text-white mb-2 md:mb-6">
          Dudas
        </h2>
        <Accordion type="single" collapsible className="space-y-1">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white/10 border border-white/15 rounded-lg px-3 md:px-5 data-[state=open]:bg-white/15"
            >
              <AccordionTrigger className="text-left font-heading font-semibold text-white hover:no-underline py-2.5 md:py-4 text-[13px] md:text-base">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-white/80 pb-2.5 md:pb-4 text-[12px] md:text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
