import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#inicio", label: "Inicio", type: "hash" as const },
    { href: "#quienes-somos", label: "Quiénes somos", type: "hash" as const },
    { href: "#faq", label: "Preguntas frecuentes", type: "hash" as const },
    { href: "#formulario", label: "Formulario", type: "hash" as const },
  ];

  const linkBaseClasses = (isScrolled: boolean) =>
    `font-semibold transition-colors ${
      isScrolled
        ? "text-foreground hover:text-primary"
        : "text-white/90 hover:text-white"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-md border-border/30"
          : "hero-gradient border-white/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={isScrolled ? "/logo-dark.png" : "/logo-light.png"}
              alt="AyudaPyme logo"
              className="w-10 h-10 object-contain transition-all duration-300"
            />

            {!isScrolled && (
              <span className="font-heading font-bold text-xl text-white">
                AyudaPyme
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.type === "hash" ? (
                <a
                  key={link.href}
                  href={link.href}
                  className={linkBaseClasses(isScrolled)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={linkBaseClasses(isScrolled)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className={`md:hidden py-4 border-t animate-fade-in ${
              isScrolled ? "border-border" : "border-white/15"
            }`}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.type === "hash" ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`font-semibold py-2 transition-colors ${
                      isScrolled
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-white/80"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`font-semibold py-2 transition-colors ${
                      isScrolled
                        ? "text-foreground hover:text-primary"
                        : "text-white hover:text-white/80"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
