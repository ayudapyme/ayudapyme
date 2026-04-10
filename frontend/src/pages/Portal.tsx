import { useEffect, useState } from "react";
import { Shield, CheckCircle, Clock, FileText, Search } from "lucide-react";

interface ClientData {
  valid: boolean;
  nif: string;
  nombre: string;
  razon_social: string;
}

const Portal = () => {
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Leer token de URL o localStorage
    const params = new URLSearchParams(window.location.search);
    let token = params.get("token");

    if (token) {
      localStorage.setItem("ayudapyme_token", token);
      // Si viene con action=apodera, redirigir a APODERA Tipo A
      const action = params.get("action");
      if (action === "apodera") {
        window.location.href = "https://apodera.redsara.es/ciudadano/";
        return;
      }
      // Limpiar URL
      window.history.replaceState({}, "", "/portal");
    } else {
      token = localStorage.getItem("ayudapyme_token");
    }

    if (!token) {
      setLoading(false);
      return;
    }

    // Verificar token con auth.ayudapyme.es
    fetch("https://auth.ayudapyme.es/api/auth/verify?token=" + token)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) {
          setClient(data);
        } else {
          localStorage.removeItem("ayudapyme_token");
        }
      })
      .catch(() => {
        localStorage.removeItem("ayudapyme_token");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando tu portal...</p>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">Accede con tu certificado</h1>
          <p className="text-muted-foreground mb-6">
            Para ver tu portal necesitas autenticarte con tu certificado digital.
          </p>
          <a
            href="https://auth.ayudapyme.es"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <Shield className="w-5 h-5" />
            Acceder con certificado digital
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-dark.png" alt="AyudaPyme" className="w-8 h-8 object-contain" />
            <span className="font-heading font-bold text-lg text-foreground">AyudaPyme</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{client.razon_social || client.nombre}</span>
            <button
              onClick={() => { localStorage.removeItem("ayudapyme_token"); window.location.href = "/"; }}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      {/* Portal */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
          Bienvenido, {client.razon_social || client.nombre}
        </h1>
        <p className="text-muted-foreground mb-8">NIF: {client.nif}</p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Autorizacion</h3>
            <p className="text-sm text-muted-foreground mb-3">Tu autorizacion esta siendo tramitada.</p>
            <span className="inline-block text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
              En proceso
            </span>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Subvenciones</h3>
            <p className="text-sm text-muted-foreground mb-3">Estamos buscando subvenciones compatibles con tu empresa.</p>
            <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Buscando...
            </span>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Expedientes</h3>
            <p className="text-sm text-muted-foreground mb-3">Cuando presentemos solicitudes apareceran aqui.</p>
            <span className="inline-block text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              Sin expedientes
            </span>
          </div>
        </div>

        <div className="mt-8 bg-accent/5 rounded-xl border border-accent/20 p-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground">Tu autorizacion esta en proceso</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Recibiras un email cuando este activa (2-5 dias laborables).
                Mientras tanto, ya estamos analizando tu empresa para encontrar subvenciones compatibles.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portal;
