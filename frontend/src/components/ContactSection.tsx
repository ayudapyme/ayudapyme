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

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-neutral-900/95 border border-border/40 shadow-md p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Horario de llamadas</h3>
            <p className="text-sm text-neutral-300 mb-2">(hora peninsular española):</p>
            <ul className="space-y-1 text-sm">
              <li>Lunes a viernes: 10:00 – 14:00 <span className="ml-2 font-semibold">910 00 00 00</span></li>
              <li>Lunes a viernes: 16:00 – 19:00 <span className="ml-2 font-semibold">910 00 00 00</span></li>
            </ul>
            <p className="mt-4 text-sm text-neutral-300">
              Indica tu disponibilidad en el formulario y ajustaremos la llamada lo máximo posible.
            </p>
          </div>

          <div className="rounded-2xl bg-neutral-900/95 border border-border/40 shadow-md p-6 flex flex-col justify-between text-white">
            <div>
              <h3 className="text-xl font-semibold mb-3">Correo electrónico</h3>
              <p className="text-sm text-neutral-300 mb-4">
                Si lo prefieres, puedes escribirnos directamente.
              </p>
              <a
                href="mailto:info@ayudapyme.es"
                className="inline-flex items-center font-medium underline underline-offset-4 hover:no-underline"
              >
                info@ayudapyme.es
              </a>
            </div>
            <p className="mt-6 text-xs text-neutral-300">
              Cuanta más información (sector, tamaño, ubicación), más precisa será la respuesta.
            </p>
            <div className="mt-6 p-3 rounded bg-neutral-800/80 border border-neutral-700">
              <div className="text-xs text-neutral-400 mb-1">Ejemplo de datos de prueba:</div>
              <ul className="text-xs text-neutral-200 list-disc pl-4">
                <li>Nombre: Juan Pérez</li>
                <li>Email: juan@ejemplo.com</li>
                <li>Teléfono: 600 123 456</li>
                <li>Sector: Comercio</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            También puedes rellenar nuestro formulario para que estudiemos tu caso.
          </p>
          <Link
            to="/#formulario"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Ir al formulario
          </Link>
        </div>
      </div>
    </section>
  );
}
