import { Users, Award, Clock, Shield } from "lucide-react";

const AboutUs = () => {
  const features = [
    {
      icon: Users,
      title: "Equipo Experto",
      description: "Profesionales con más de 15 años de experiencia en gestión administrativa y fiscal.",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Compromiso con la excelencia y la satisfacción de nuestros clientes en cada trámite.",
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
            Tu gestoría de confianza
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            En Gestoría Express nos dedicamos a simplificar la vida de autónomos y empresas. 
            Llevamos años ayudando a nuestros clientes a gestionar sus obligaciones administrativas 
            y fiscales de manera eficiente, para que puedan centrarse en lo que realmente importa: 
            hacer crecer su negocio.
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
                Facilitar la gestión administrativa y fiscal de autónomos, pymes y grandes empresas, 
                ofreciendo un servicio personalizado, ágil y de máxima calidad.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Creemos que la burocracia no debe ser un obstáculo para el crecimiento de tu negocio. 
                Por eso, nos encargamos de todos los trámites para que tú puedas dedicar tu tiempo 
                y energía a lo que mejor sabes hacer.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">+500</div>
                <div className="text-muted-foreground text-sm">Clientes satisfechos</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground text-sm">Años de experiencia</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground text-sm">Tasa de éxito</div>
              </div>
              <div className="bg-card p-6 rounded-xl text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">24h</div>
                <div className="text-muted-foreground text-sm">Tiempo de respuesta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
