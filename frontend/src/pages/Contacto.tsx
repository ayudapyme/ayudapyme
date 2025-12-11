import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";

const Contacto = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="hero-gradient py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Contacta con nosotros
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o consulta? Escríbenos y te responderemos lo antes posible.
          </p>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-12 md:py-20 flex-1">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-border shadow-lg p-6 md:p-8">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact_email"
                    className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2"
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="input-field"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="contact_mensaje"
                    className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2"
                  >
                    <MessageSquare className="w-4 h-4 text-primary" />
                    Mensaje *
                  </label>
                  <textarea
                    id="contact_mensaje"
                    name="contact_mensaje"
                    required
                    maxLength={2000}
                    rows={8}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="input-field resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {mensaje.length}/2000 caracteres
                  </p>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn-primary w-full text-lg py-4">
                  Enviar
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                  <Send className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  ¡Mensaje enviado!
                </h2>
                <p className="text-muted-foreground">
                  Gracias por contactarnos. Te responderemos lo antes posible.
                </p>
              </div>
            )}
          </div>

          {/* Back Link */}
          <div className="text-center mt-8">
            <a href="/" className="text-primary hover:underline font-medium">
              ← Volver a la página principal
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
