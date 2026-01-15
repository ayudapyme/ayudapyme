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
          Información sobre cómo gestionamos tus datos personales en Ayuda Pyme.
        </p>
        <p className="text-primary-foreground/80 mt-2 text-base font-semibold">
          Última actualización: 15 de enero de 2026
        </p>
      </header>

      {/* Content section */}
      <main className="flex-1 py-12 md:py-20">
        <div className="container-custom max-w-3xl mx-auto space-y-8 text-foreground leading-relaxed">

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">1. Responsable del tratamiento</h2>
            <p>
              El responsable del tratamiento de los datos personales es la plataforma de búsqueda y análisis de subvenciones públicas para empresas, autónomos y emprendedores.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">2. Datos que recogemos</h2>
            <p>Podemos recopilar y procesar los siguientes datos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Datos de contacto (nombre, email, teléfono).</li>
              <li>Datos de identificación fiscal y empresarial.</li>
              <li>Datos sobre actividad profesional o empresarial.</li>
              <li>Datos necesarios para la gestión de solicitudes de subvenciones.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">3. Finalidad del tratamiento</h2>
            <p>Tratamos tus datos con las siguientes finalidades:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Gestionar tu acceso y uso de la plataforma.</li>
              <li>Notificarte sobre subvenciones y convocatorias de interés.</li>
              <li>Orientarte sobre requisitos y trámites relacionados.</li>
              <li>Mejorar el servicio y la experiencia de usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold mb-3">4. Base legal del tratamiento</h2>
            <p>
              La base jurídica es tu consentimiento, el cumplimiento de obligaciones legales y la ejecución de los servicios ofrecidos por la plataforma.
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
              Email: admin@ayudapyme.es  
              <br />
              Teléfono: +34 601 64 63 62 / +34 611 08 59 21
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacidad;
