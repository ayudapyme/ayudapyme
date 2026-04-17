import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#faq", label: "Preguntas" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={isScrolled ? "/logo-dark.png" : "/logo-light.png"}
              alt="AyudaPyme"
              className="w-6 h-6 object-contain"
            />
            <span className={`font-heading font-bold text-[15px] transition-colors ${isScrolled ? "text-foreground" : "text-white"}`}>
              AyudaPyme
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[13px] font-medium transition-colors ${
                  isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#formulario"
              className={`px-4 py-1.5 rounded-md font-semibold text-[13px] transition-all ${
                isScrolled
                  ? "bg-cta text-white hover:brightness-110"
                  : "bg-white/90 text-foreground hover:bg-white"
              }`}
            >
              Análisis gratuito
            </a>
          </nav>

          <button
            className={`md:hidden p-1.5 rounded-md ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <nav className={`md:hidden py-2 border-t ${isScrolled ? "border-border" : "border-white/10"}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`block px-2 py-2 rounded text-sm font-medium ${
                  isScrolled ? "text-muted-foreground" : "text-white/60"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#formulario"
              className="block mt-1 px-4 py-2 rounded-md bg-cta text-white font-semibold text-sm text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Análisis gratuito
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
