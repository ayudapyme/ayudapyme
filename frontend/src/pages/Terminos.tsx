import Footer from "@/components/Footer";

const Terminos = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="hero-gradient py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Términos y Condiciones
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Información legal y condiciones de uso del servicio.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 md:py-20 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-foreground leading-relaxed space-y-6 text-base">
          
          <h2 className="text-2xl font-heading font-semibold">1. Objeto del servicio</h2>
          <p>
            Gestoría Express ofrece servicios de asesoría administrativa y fiscal para autónomos 
            y empresas. El uso del servicio implica la aceptación íntegra de estos términos.
          </p>

          <h2 className="text-2xl font-heading font-semibold">2. Uso permitido</h2>
          <p>
            El usuario se compromete a facilitar información veraz y actualizada, y a utilizar 
            los servicios conforme a la legislación vigente.
          </p>

          <h2 className="text-2xl font-heading font-semibold">3. Responsabilidad del usuario</h2>
          <p>
            El usuario es responsable de la exactitud de los datos proporcionados. Gestoría 
            Express no se hace responsable de retrasos o incidencias causadas por datos incorrectos.
          </p>

          <h2 className="text-2xl font-heading font-semibold">4. Pagos y domiciliaciones</h2>
          <p>
            Los pagos mediante domiciliación SEPA se gestionan de forma segura a través de Stripe. 
            El usuario autoriza expresamente el cargo al proporcionar su IBAN.
          </p>

          <h2 className="text-2xl font-heading font-semibold">5. Protección de datos</h2>
          <p>
            Los datos se tratan conforme al Reglamento (UE) 2016/679 (RGPD). Consulta nuestra{" "}
            <a href="/privacidad" className="text-primary font-semibold hover:underline">
              Política de Privacidad
            </a>{" "}
            para más información.
          </p>

          <h2 className="text-2xl font-heading font-semibold">6. Modificaciones</h2>
          <p>
            Gestoría Express podrá modificar estos términos en cualquier momento. Los cambios 
            serán publicados en esta misma página.
          </p>

          <h2 className="text-2xl font-heading font-semibold">7. Legislación aplicable</h2>
          <p>
            Estos términos se rigen por la legislación española. En caso de disputa, ambas partes 
            se someterán a los tribunales de Madrid.
          </p>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terminos;
