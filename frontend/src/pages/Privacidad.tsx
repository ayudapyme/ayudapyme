import Footer from "@/components/Footer";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header section */}
      <header className="hero-gradient py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground">
          Política de Privacidad
        </h1>
        <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto text-lg">
          Información sobre cómo gestionamos tus datos personales en Gestoría Express.
        </p>
      </header>

      {/* Content section */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container-custom max-w-3xl mx-auto space-y-8 text-foreground leading-relaxed">

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">1. Responsable del tratamiento</h2>
            <p>
              Gestoría Express es responsable del tratamiento de los datos personales que nos facilitas
              al utilizar nuestros servicios y formularios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">2. Datos que recogemos</h2>
            <p>Podemos recopilar y procesar los siguientes datos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Datos de contacto (nombre, email, teléfono).</li>
              <li>Datos de identificación fiscal (NIF/CIF/NIE).</li>
              <li>Datos de actividad empresarial.</li>
              <li>Datos necesarios para trámites administrativos.</li>
              <li>Datos bancarios para domiciliaciones SEPA.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">3. Finalidad del tratamiento</h2>
            <p>Tratamos tus datos con las siguientes finalidades:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Gestionar tu solicitud enviada mediante nuestros formularios.</li>
              <li>Realizar trámites administrativos y fiscales.</li>
              <li>Facturación y comunicación relacionada con los servicios.</li>
              <li>Mejorar la experiencia de usuario y nuestros servicios.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">4. Base legal del tratamiento</h2>
            <p>
              La base jurídica es tu consentimiento, el cumplimiento de obligaciones legales
              y la ejecución de servicios solicitados.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">5. Conservación de los datos</h2>
            <p>
              Los datos se conservarán el tiempo necesario para cumplir con las finalidades descritas
              o mientras exista una relación profesional activa.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">6. Derechos del usuario</h2>
            <p>Puedes ejercer los siguientes derechos sobre tus datos personales:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acceso, rectificación y supresión.</li>
              <li>Limitación u oposición al tratamiento.</li>
              <li>Portabilidad de los datos.</li>
              <li>Retirada del consentimiento en cualquier momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">7. Contacto</h2>
            <p>
              Para ejercer tus derechos o solicitar información adicional:
            </p>
            <p className="mt-2 font-semibold">
              Email: info@gestoriaexpress.es  
              <br />
              Teléfono: +34 900 123 456
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacidad;
