import { Users, Award, Clock, Shield } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Profesionales con años de experiencia en gestión administrativa.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Compromiso con la excelencia y la satisfacción de nuestros clientes en cada subvención.",
    },
    {
      icon: Clock,
      title: "Rapidez",
      description: "Respuesta ágil y gestión eficiente para que no pierdas tiempo en burocracia.",
    },
    {
      icon: Shield,
      title: "Confianza",
      description: "Tus datos están seguros con nosotros. Cumplimos con todas las normativas de protección.",
    },
  ];

  return (
    <section id="quienes-somos" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-accent font-semibold text-sm uppercase tracking-wider mb-4">
            Quiénes somos
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
           Una agencia dedicada a localizar y tramitar subvenciones.

          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
             En Ayuda Pyme nos dedicamos a facilitar todo el trámite para conseguir
             subvenciones para autónomos y pymes. Nosotros, mediante los datos de la empresa,
             localizamos todas las subvenciones y seleccionamos entre ellas las que sean adecuadas
             para cada negocio. Con el permiso de la empresa, las tramitamos de forma que la
             obtenciónde la subvención cause las mínimas molestias al empresario.
             
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl card-elevated group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-secondary rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                Nuestra misión
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
               Ayudar a autónomos y pymes a no perder subvenciones por falta de información.
               Analizamos convocatorias públicas, identificamos las ayudas que encajan con cada negocio y explicamos de forma clara qué puede solicitar, cómo y cuándo.

              </p>
              <p className="text-muted-foreground leading-relaxed">
                Además, gestionamos la tramitación de la subvención, coordinando toda la documentación necesaria y el proceso administrativo para que el cliente no tenga que enfrentarse a la burocracia.
                Nuestro objetivo es que ninguna empresa deje pasar dinero público por desconocimiento, falta de tiempo o complejidad administrativa.
              

              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">+1000</div>
                <div className="text-muted-foreground text-sm">Subvenciones analizadas</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground text-sm">Convocatorias monitorizadas</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">     En curso </div>
                <div className="text-muted-foreground text-sm">Tramitaciones gestionadas</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"> Solo si hay éxito</div>
                <div className="text-muted-foreground text-sm">Modelo de pago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
