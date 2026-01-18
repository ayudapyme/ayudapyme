import { Link } from "react-router-dom";

export default function ContactSection() {
  return (
    <section id="contacto" className="section-padding bg-muted">
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
          <div className="rounded-2xl bg-card/90 border border-border/40 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Horario de llamadas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              (hora peninsular española):
            </p>
            <ul className="space-y-1 text-sm">
              <li>Lunes a viernes: 10:00 – 14:00</li>
              <li>Lunes a viernes: 16:00 – 19:00</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Indica tu disponibilidad en el formulario y ajustaremos la llamada lo máximo posible.
            </p>
          </div>

          <div className="rounded-2xl bg-card/90 border border-border/40 shadow-md p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-3">Correo electrónico</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Si lo prefieres, puedes escribirnos directamente.
              </p>
              <a
                href="mailto:info@ayudapyme.es"
                className="inline-flex items-center font-medium underline underline-offset-4 hover:no-underline"
              >
                info@ayudapyme.es
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Cuanta más información (sector, tamaño, ubicación), más precisa será la respuesta.
            </p>
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
