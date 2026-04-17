const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo-dark.png" alt="AyudaPyme" className="w-6 h-6 object-contain" />
            <span className="font-heading font-bold text-foreground text-sm">AyudaPyme</span>
            <span className="text-muted-foreground text-xs ml-1">· Hecho en Galicia</span>
          </div>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="/terminos" className="hover:text-foreground transition-colors">Términos</a>
            <a href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
