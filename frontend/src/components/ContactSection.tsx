import { Link } from "react-router-dom";

export default function ContactSection() {
  return (
    <section id="contacto" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Contacta con nosotros
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Si tienes dudas sobre las subvenciones, el proceso o quieres que revisemos tu caso,
            escríbenos o solicita una llamada.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-neutral-800 border border-neutral-700 shadow-lg p-8 text-neutral-100 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
              Horario de llamadas
            </h3>
            <p className="text-sm text-neutral-300 mb-2">(hora peninsular española):</p>
            <ul className="space-y-1 text-base font-medium">
              <li>Lunes a viernes: 10:00 – 14:00 <span className="ml-2 font-semibold text-primary">910 00 00 00</span></li>
              <li>Lunes a viernes: 16:00 – 19:00 <span className="ml-2 font-semibold text-primary">910 00 00 00</span></li>
            </ul>
            <p className="mt-4 text-sm text-neutral-400">
              Indica tu disponibilidad en el formulario y ajustaremos la llamada lo máximo posible.
            </p>
          </div>

          <div className="rounded-xl bg-neutral-800 border border-neutral-700 shadow-lg p-8 flex flex-col justify-between text-neutral-100 transition-all hover:shadow-xl">
            <div>
              <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                Correo electrónico
              </h3>
              <p className="text-sm text-neutral-300 mb-4">
                Si lo prefieres, puedes escribirnos directamente.
              </p>
              <a
                href="mailto:info@ayudapyme.es"
                className="inline-flex items-center font-semibold underline underline-offset-4 hover:text-primary"
              >
                info@ayudapyme.es
              </a>
            </div>
            <p className="mt-6 text-xs text-neutral-400">
              Cuanta más información (sector, tamaño, ubicación), más precisa será la respuesta.
            </p>
          </div>
        </div>

        {/* Eliminado el botón y el texto de ir al formulario */}
      </div>
    </section>
  );
}
