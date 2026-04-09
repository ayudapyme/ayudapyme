import { Shield, CheckCircle, ArrowRight, FileSignature, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface CertData {
  nif: string;
  nombre: string;
  verified: boolean;
}

const Autorizar = () => {
  const [cert, setCert] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // El backend (Nginx) pasa los datos del certificado vía headers
    // que el frontend recoge desde un endpoint /api/whoami
    fetch("/api/whoami")
      .then((res) => {
        if (!res.ok) throw new Error("No se detectó certificado digital");
        return res.json();
      })
      .then((data) => {
        if (data.verified) {
          setCert(data);
        } else {
          setError("No se pudo verificar tu certificado digital. Asegúrate de tener uno instalado en el navegador.");
        }
      })
      .catch(() => {
        setError("noCert");
      })
      .finally(() => setLoading(false));
  }, []);

  const apoderaUrl = cert
    ? `https://apodera.redsara.es/ciudadano/`
    : "#";

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
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando tu certificado digital...</p>
          </div>
        ) : cert ? (
          /* --- CERTIFICADO DETECTADO --- */
          <div className="space-y-8">
            {/* Saludo */}
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Hola, {cert.nombre}
              </h1>
              <p className="text-muted-foreground">
                NIF: <span className="font-mono font-semibold text-foreground">{cert.nif}</span>
              </p>
              <p className="text-sm text-accent mt-2 flex items-center justify-center gap-1">
                <CheckCircle className="w-4 h-4" /> Identidad verificada con certificado digital
              </p>
            </div>

            {/* Qué va a pasar */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <h2 className="font-heading font-semibold text-lg mb-4">
                Autoriza a AyudaPyme en 1 click
              </h2>
              <div className="space-y-4">
                <Step n={1} text="Te redirigimos a APODERA (portal oficial del Gobierno)" />
                <Step n={2} text="Confirmas el poder de representación (ya pre-rellenado)" />
                <Step n={3} text="Vuelves aquí y empezamos a buscar tus subvenciones" />
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                El poder es de Tipo A (todas las administraciones), válido 5 años.
                Puedes revocarlo en cualquier momento desde apodera.redsara.es.
              </p>
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
          </div>
        ) : error === "noCert" ? (
          /* --- SIN CERTIFICADO --- */
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">
              No se detectó certificado digital
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Para acceder con certificado digital, necesitas tenerlo instalado en tu navegador.
              La mayoría de empresas ya lo tienen (es el mismo que usas para presentar impuestos).
            </p>
            <div className="bg-card rounded-xl border border-border p-6 text-left max-w-md mx-auto">
              <h3 className="font-semibold mb-3">¿No tienes certificado?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                No te preocupes. Puedes usar nuestro formulario estándar y te guiaremos en el proceso.
              </p>
              <Link
                to="/#formulario"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Ir al formulario <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* --- ERROR GENÉRICO --- */
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-heading font-bold text-foreground">Error de verificación</h1>
            <p className="text-muted-foreground">{error}</p>
            <Link to="/" className="text-primary font-semibold hover:underline">
              Volver al inicio
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

const Step = ({ n, text }: { n: number; text: string }) => (
  <div className="flex items-start gap-3">
    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
      {n}
    </span>
    <p className="text-foreground/80 pt-0.5">{text}</p>
  </div>
);

export default Autorizar;
