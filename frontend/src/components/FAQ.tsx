import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Nada hasta que cobres. Si te conceden la subvención, cobramos el 15%. Si no te la conceden, no pagas nada.",
  },
  {
    q: "¿Qué tengo que hacer yo?",
    a: "Rellenar el formulario con tus datos básicos. Nosotros nos encargamos de buscar las ayudas, preparar el expediente y presentarlo. Tú solo firmas una vez.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "El análisis inicial, menos de 48 horas. La resolución depende de la administración: de 2 meses a 1 año según la convocatoria.",
  },
  {
    q: "¿Y si no me la conceden?",
    a: "No pagas nada. Nuestros ingresos dependen de tu éxito, por eso solo presentamos expedientes con posibilidades reales.",
  },
  {
    q: "¿Solo para Galicia?",
    a: "No. Operamos en toda España. Monitorizamos convocatorias nacionales, autonómicas y europeas.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-14 md:py-20 bg-hero">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
              Resolvemos tus dudas
            </h2>
            <p className="text-white/70 text-base">
              Lo que necesitas saber antes de dar el paso.
            </p>
          </div>

          {/* Right */}
          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/10 border border-white/15 rounded-lg px-5 data-[state=open]:bg-white/15 transition-colors"
                >
                  <AccordionTrigger className="text-left font-heading font-semibold text-white hover:no-underline py-4 text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 pb-4 leading-relaxed text-base">
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
