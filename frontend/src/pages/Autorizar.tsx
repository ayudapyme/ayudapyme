import { Shield, CheckCircle, ArrowRight, FileSignature, ExternalLink, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Autorizar = () => {
  const apoderaUrl = "https://apodera.redsara.es/ciudadano/";

  return (
    <div className="min-h-screen bg-background">
      {/* Header simple */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-dark.png" alt="AyudaPyme" className="w-8 h-8 object-contain" />
            <span className="font-heading font-bold text-lg text-foreground">AyudaPyme</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Cabecera */}
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-3">
              Autoriza a AyudaPyme con tu certificado digital
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Con un solo click, nos autorizas a buscar y tramitar todas las subvenciones
              disponibles para tu empresa. Sin papeleos, sin desplazamientos.
            </p>
          </div>

          {/* Cómo funciona */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h2 className="font-heading font-semibold text-lg mb-5">
              ¿Cómo funciona? Solo 2 clicks.
            </h2>
            <div className="space-y-4">
              <Step
                n={1}
                title="Accede a APODERA"
                text="Te redirigimos al portal oficial del Gobierno de España. Tu navegador te pedirá seleccionar tu certificado digital (el mismo que usas para Hacienda)."
              />
              <Step
                n={2}
                title="Confirma la autorización"
                text="Verás un formulario con los datos de AyudaPyme ya rellenados. Solo tienes que confirmar. Tarda 10 segundos."
              />
            </div>
            <div className="mt-5 p-3 bg-accent/5 rounded-lg border border-accent/20">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Lock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                El poder es de Tipo A (todas las administraciones), válido 5 años.
                Puedes revocarlo en cualquier momento desde apodera.redsara.es.
                Tus datos nunca salen del sistema oficial del Gobierno.
              </p>
            </div>
          </div>

          {/* Qué consigues */}
          <div className="bg-accent/5 rounded-xl border border-accent/20 p-6">
            <h3 className="font-semibold text-foreground mb-3">Con tu autorización, AyudaPyme podrá:</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Buscar todas las subvenciones compatibles con tu empresa</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Obtener certificados de estar al corriente (AEAT y Seguridad Social)</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Presentar solicitudes de subvención en tu nombre</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" /> Monitorizar notificaciones y resoluciones automáticamente</li>
            </ul>
          </div>

          {/* Botón principal */}
          <div className="text-center">
            <a
              href={apoderaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <FileSignature className="w-5 h-5" />
              Autorizar en APODERA
              <ExternalLink className="w-4 h-4 opacity-60" />
            </a>
            <p className="text-xs text-muted-foreground mt-3">
              Serás redirigido al portal oficial del Gobierno de España
            </p>
          </div>

          {/* Requisitos */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold text-foreground mb-3">¿Qué necesitas?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Certificado digital</strong> instalado en tu navegador (FNMT, DNIe) — es el mismo que usas para presentar impuestos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">Ser autónomo o empresa</strong> — funciona para cualquier forma jurídica</span>
              </li>
            </ul>
          </div>

          {/* Alternativa sin certificado */}
          <div className="text-center border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-3">¿No tienes certificado digital?</p>
            <Link
              to="/#formulario"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Usa nuestro formulario estándar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

const Step = ({ n, title, text }: { n: number; title: string; text: string }) => (
  <div className="flex items-start gap-3">
    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
      {n}
    </span>
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{text}</p>
    </div>
  </div>
);

export default Autorizar;
