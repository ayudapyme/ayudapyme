// src/components/MultiStepForm.tsx
import React, { useState } from "react";
import {
  Building2,
  User,
  Users,
  Building,
  Factory,
  ArrowRight,
  ArrowLeft,
  Check,
  Briefcase,
  Phone,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────

type FormPath = "empresa" | "autonomo" | null;
type CompanySize = "micro" | "pequena" | "mediana" | "grande" | null;
type EmployeeCount = "solo" | "1-3" | "4-9" | null;

interface FormData {
  // Common
  cif_nif: string;
  email: string;
  nombre: string;
  telefono: string;
  domicilio: string;
  codigo_postal: string;
  ciudad: string;
  actividad: string;
  // Autonomo only
  nombre_negocio: string;
  anos_antiguedad: string;
  facturacion_anual: string;
}

// ── Validation helpers ─────────────────────────────────

const NIF_MAP = "TRWAGMYFPDXBNJZSQVHLCKE";

function normalizeId(value: string): string {
  if (!value) return "";
  return value.toUpperCase().replace(/[\s-]+/g, "");
}

function isValidNIF(v: string): boolean {
  v = normalizeId(v);
  if (!/^[0-9]{8}[A-Z]$/.test(v)) return false;
  return v[8] === NIF_MAP[parseInt(v.slice(0, 8), 10) % 23];
}

function isValidNIE(v: string): boolean {
  v = normalizeId(v);
  if (!/^[XYZ][0-9]{7}[A-Z]$/.test(v)) return false;
  const map: Record<string, string> = { X: "0", Y: "1", Z: "2" };
  const numPart = map[v[0]] + v.slice(1, 8);
  return v[8] === NIF_MAP[parseInt(numPart, 10) % 23];
}

function sumDigits(n: number): number {
  return n < 10 ? n : Math.floor(n / 10) + (n % 10);
}

function isValidCIF(v: string): boolean {
  v = normalizeId(v);
  if (!/^[A-HJUVNPQRSWKLa-hjuvnpqrswkl][0-9]{7}[0-9A-Z]$/.test(v)) return false;
  const first = v[0].toUpperCase();
  const body = v.slice(1, 8);
  const control = v[8].toUpperCase();
  let sumEven = 0;
  let sumOdd = 0;
  for (let i = 0; i < 7; i++) {
    const d = parseInt(body[i], 10);
    if ((i + 1) % 2 === 0) sumEven += d;
    else sumOdd += sumDigits(d * 2);
  }
  const digit = (10 - ((sumEven + sumOdd) % 10)) % 10;
  const letter = "JABCDEFGHI"[digit];
  if ("ABEH".includes(first)) return control === String(digit);
  if ("KPQSW".includes(first)) return control === letter;
  return control === String(digit) || control === letter;
}

function isValidSpanishId(v: string): boolean {
  v = normalizeId(v);
  return !!v && (isValidNIF(v) || isValidNIE(v) || isValidCIF(v));
}

function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

// ── Component ──────────────────────────────────────────

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formPath, setFormPath] = useState<FormPath>(null);
  const [companySize, setCompanySize] = useState<CompanySize>(null);
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    cif_nif: "",
    email: "",
    nombre: "",
    telefono: "",
    domicilio: "",
    codigo_postal: "",
    ciudad: "",
    actividad: "",
    nombre_negocio: "",
    anos_antiguedad: "",
    facturacion_anual: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  // showCalendly removed — Calendly opens automatically after submit
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = 4;

  // ── Options ────────────────────────────────────────

  const companySizeOptions = [
    { value: "micro" as const, label: "Micro", sublabel: "1–9 empleados", icon: Users },
    { value: "pequena" as const, label: "Pequeña", sublabel: "10–49 empleados", icon: Building2 },
    { value: "mediana" as const, label: "Mediana", sublabel: "50–249 empleados", icon: Building },
    { value: "grande" as const, label: "Gran empresa", sublabel: "250+ empleados", icon: Factory },
  ];

  const employeeOptions = [
    { value: "solo" as const, label: "Solo yo", icon: User },
    { value: "1-3" as const, label: "1–3 empleados", icon: Users },
    { value: "4-9" as const, label: "4–9 empleados", icon: Users },
  ];

  const antiguedadOptions = [
    "Menos de 1 año",
    "1–3 años",
    "3–5 años",
    "5–10 años",
    "Más de 10 años",
  ];

  const facturacionOptions = [
    "Menos de 30.000 €",
    "30.000–60.000 €",
    "60.000–100.000 €",
    "100.000–200.000 €",
    "Más de 200.000 €",
  ];

  // ── Helpers ────────────────────────────────────────

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getCompanySizeLabel = (size: CompanySize): string => {
    const map: Record<string, string> = {
      micro: "Micro (1–9 empleados)",
      pequena: "Pequeña (10–49 empleados)",
      mediana: "Mediana (50–249 empleados)",
      grande: "Gran empresa (250+ empleados)",
    };
    return size ? map[size] : "";
  };

  const getEmployeeLabel = (count: EmployeeCount): string => {
    const map: Record<string, string> = {
      solo: "Solo yo",
      "1-3": "1–3 empleados",
      "4-9": "4–9 empleados",
    };
    return count ? map[count] : "";
  };

  const getStepLabels = (): string[] => {
    if (formPath === "empresa") return ["Tipo", "Tamaño", "Actividad", "Contacto"];
    if (formPath === "autonomo") return ["Tipo", "Equipo", "Negocio", "Contacto"];
    return ["Tipo", "", "", ""];
  };

  // ── Navigation ─────────────────────────────────────

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrorMessage(null);
    }
  };

  const prevStep = () => {
    if (currentStep <= 1) return;
    if (currentStep === 2) {
      // Going back to bifurcation — reset path
      setFormPath(null);
      setCompanySize(null);
      setEmployeeCount(null);
      setCurrentStep(1);
    } else {
      setCurrentStep(currentStep - 1);
    }
    setErrorMessage(null);
  };

  const selectPath = (path: FormPath) => {
    setFormPath(path);
    setCompanySize(null);
    setEmployeeCount(null);
    setCurrentStep(2);
    setErrorMessage(null);
  };

  // ── Can proceed checks ────────────────────────────

  const canProceedStep2 = (): boolean => {
    if (formPath === "empresa") return companySize !== null;
    if (formPath === "autonomo") return employeeCount !== null;
    return false;
  };

  const canProceedStep3 = (): boolean => {
    if (formPath === "empresa") return formData.actividad.trim().length > 0;
    if (formPath === "autonomo") {
      return (
        formData.nombre_negocio.trim().length > 0 &&
        formData.actividad.trim().length > 0 &&
        formData.anos_antiguedad.length > 0 &&
        formData.facturacion_anual.length > 0
      );
    }
    return false;
  };

  // ── Submit validation ─────────────────────────────

  const validateStep4 = (): string | null => {
    if (!formData.cif_nif.trim()) return "La identificación es obligatoria.";

    const id = normalizeId(formData.cif_nif);
    if (formPath === "empresa") {
      if (!isValidCIF(id) && !isValidSpanishId(id))
        return "Introduce un CIF válido para tu empresa.";
    } else {
      if (!isValidNIF(id) && !isValidNIE(id))
        return "Introduce un NIF o NIE válido.";
    }

    if (!formData.email.trim()) return "El email es obligatorio.";
    if (!isValidEmail(formData.email)) return "Introduce un email válido.";
    if (!formData.nombre.trim())
      return formPath === "empresa"
        ? "El nombre del responsable es obligatorio."
        : "Tu nombre completo es obligatorio.";
    if (!formData.telefono.trim()) return "El teléfono es obligatorio.";
    if (!formData.domicilio.trim()) return "El domicilio es obligatorio.";
    if (!formData.codigo_postal.trim()) return "El código postal es obligatorio.";
    if (!/^[0-9]{4,5}$/.test(formData.codigo_postal.trim()))
      return "Introduce un código postal válido.";
    if (!formData.ciudad.trim()) return "La ciudad es obligatoria.";
    if (/^\d+$/.test(formData.ciudad.trim()))
      return "Introduce el nombre de la ciudad, no el código postal.";
    if (!acceptedTerms) return "Debes aceptar los términos y condiciones.";

    return null;
  };

  // ── Submit ────────────────────────────────────────

  const handleSubmit = async () => {
    const error = validateStep4();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
    if (!webhookUrl) {
      setErrorMessage("Error de configuración. Contacta con soporte.");
      setIsSubmitting(false);
      return;
    }

    const common = {
      cif_nif: normalizeId(formData.cif_nif),
      email: formData.email.trim(),
      telefono: formData.telefono.trim(),
      domicilio: formData.domicilio.trim(),
      codigo_postal: formData.codigo_postal.trim(),
      ciudad: formData.ciudad.trim(),
      actividad: formData.actividad.trim(),
      acepta_terminos: true,
      origen: "entrevista-web",
    };

    const payload =
      formPath === "empresa"
        ? {
            ...common,
            tipo: "empresa",
            tamano_empresa: getCompanySizeLabel(companySize),
            nombre_responsable: formData.nombre.trim(),
          }
        : {
            ...common,
            tipo: "autonomo",
            num_empleados: getEmployeeLabel(employeeCount),
            nombre_completo: formData.nombre.trim(),
            nombre_negocio: formData.nombre_negocio.trim(),
            anos_antiguedad: formData.anos_antiguedad,
            facturacion_anual: formData.facturacion_anual,
          };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Error al enviar el formulario.");
      }
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ha ocurrido un error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ────────────────────────────────────────

  const stepLabels = getStepLabels();

  return (
    <section id="formulario" className="py-6 md:py-16 bg-hero">
      <div className="container-custom">
        <div className={`${isSubmitted ? "max-w-2xl" : "max-w-[540px]"} mx-auto`}>

          {/* Section header */}
          {!isSubmitted && (
            <div className="text-center mb-3 md:mb-6">
              <h2 className="text-[17px] md:text-2xl font-heading font-bold text-white tracking-tight">
                Analiza tu empresa gratis
              </h2>
            </div>
          )}

          <form
            className="bg-card rounded-xl border border-border shadow-lg overflow-hidden"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="p-5 md:p-8">

              {/* ─── Progress indicator ─────────────────── */}
              {currentStep > 0 && !isSubmitted && (
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`step-indicator w-9 h-9 text-sm ${
                            currentStep === step
                              ? "active"
                              : currentStep > step
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {currentStep > step ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < totalSteps && (
                          <div
                            className={`w-8 md:w-12 h-1 mx-1 rounded-full transition-colors ${
                              currentStep > step ? "bg-accent" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {formPath && (
                    <div className="flex justify-center mt-3 text-xs">
                      <div className="flex items-center gap-2 md:gap-8">
                        {stepLabels.map((label, i) => (
                          <span
                            key={i}
                            className={`w-14 md:w-16 text-center font-semibold ${
                              currentStep >= i + 1 ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── Post-submit: Calendly directo ────── */}
              {isSubmitted && (
                <div className="animate-fade-in">
                  {/* Heading */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-base font-heading font-bold text-foreground">
                        Hemos recibido tus datos
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Elige un día y te contamos tus subvenciones en 15 min.
                      </p>
                    </div>
                  </div>

                  {/* Calendly */}
                  <iframe
                    src={`${import.meta.env.VITE_CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1`}
                    width="100%"
                    className="rounded-lg border border-border h-[480px] md:h-[620px]"
                    frameBorder="0"
                    title="Agendar reunión"
                  />

                  {/* Fallback — siempre debajo */}
                  <div className="mt-4 p-4 bg-secondary rounded-lg">
                    <p className="text-foreground text-sm font-semibold mb-2">
                      ¿No puedes ahora? Te contactamos nosotros:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href="tel:+34601646362"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cta text-white font-semibold text-sm active:scale-[0.98] transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        601 64 63 62
                      </a>
                      <a
                        href="mailto:admin@ayudapyme.es"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm active:scale-[0.98] transition-colors"
                      >
                        admin@ayudapyme.es
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── Step 1: Bifurcation ────────────────── */}
              {currentStep === 1 && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    ¿Cómo trabajas?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => selectPath("autonomo")}
                      className="company-size-option p-5 md:p-6 flex flex-col items-center text-center"
                    >
                      <User className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="font-heading font-bold text-foreground text-base">
                        Autónomo
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => selectPath("empresa")}
                      className="company-size-option p-5 md:p-6 flex flex-col items-center text-center"
                    >
                      <Briefcase className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="font-heading font-bold text-foreground text-base">
                        Empresa
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Step 2: Empresa → Tamaño ──────────── */}
              {currentStep === 2 && formPath === "empresa" && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    ¿Cuál es el tamaño de tu empresa?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {companySizeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => { setCompanySize(option.value); setTimeout(() => setCurrentStep(3), 300); }}
                        className={`company-size-option p-4 ${
                          companySize === option.value ? "selected" : ""
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 mb-2 transition-colors ${
                            companySize === option.value ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-semibold text-foreground text-xs">{option.label}</span>
                        {option.sublabel && (
                          <span className="text-xs text-muted-foreground mt-1">
                            {option.sublabel}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-start mt-6">
                    <button type="button" onClick={prevStep} className="btn-secondary text-sm">
                      <ArrowLeft className="mr-1 w-3.5 h-3.5" />
                      Atrás
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Step 2: Autónomo → Empleados ──────── */}
              {currentStep === 2 && formPath === "autonomo" && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    ¿Cuántos empleados tienes?
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {employeeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => { setEmployeeCount(option.value); setTimeout(() => setCurrentStep(3), 300); }}
                        className={`company-size-option p-4 ${
                          employeeCount === option.value ? "selected" : ""
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 mb-2 transition-colors ${
                            employeeCount === option.value ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-semibold text-foreground text-xs">{option.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-start mt-6">
                    <button type="button" onClick={prevStep} className="btn-secondary text-sm">
                      <ArrowLeft className="mr-1 w-3.5 h-3.5" />
                      Atrás
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Step 3: Empresa → Actividad ─────── */}
              {currentStep === 3 && formPath === "empresa" && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    ¿A qué se dedica tu empresa?
                  </h3>
                  <div>
                    <input
                      type="text"
                      id="actividad"
                      name="actividad"
                      value={formData.actividad}
                      onChange={handleInputChange}
                      placeholder="Ej: Hostelería, Construcción, Comercio..."
                      className="input-field"
                    />
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={prevStep} className="btn-secondary text-sm">
                      <ArrowLeft className="mr-1 w-3.5 h-3.5" />
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceedStep3()}
                      className="btn-primary"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Step 3: Autónomo → Datos negocio ── */}
              {currentStep === 3 && formPath === "autonomo" && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    Cuéntanos sobre tu negocio
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="nombre_negocio" className="block text-sm font-medium text-foreground mb-2">
                        Nombre de tu negocio *
                      </label>
                      <input
                        type="text"
                        id="nombre_negocio"
                        name="nombre_negocio"
                        value={formData.nombre_negocio}
                        onChange={handleInputChange}
                        placeholder="Ej: Peluquería Estilo, Taller Pérez..."
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="actividad" className="block text-sm font-medium text-foreground mb-2">
                        Actividad / sector *
                      </label>
                      <input
                        type="text"
                        id="actividad"
                        name="actividad"
                        value={formData.actividad}
                        onChange={handleInputChange}
                        placeholder="Ej: Peluquería, Fontanería, Coaching..."
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="anos_antiguedad" className="block text-sm font-medium text-foreground mb-2">
                        Años de antigüedad *
                      </label>
                      <select
                        id="anos_antiguedad"
                        name="anos_antiguedad"
                        value={formData.anos_antiguedad}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Selecciona...</option>
                        {antiguedadOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="facturacion_anual" className="block text-sm font-medium text-foreground mb-2">
                        Facturación aproximada anual *
                      </label>
                      <select
                        id="facturacion_anual"
                        name="facturacion_anual"
                        value={formData.facturacion_anual}
                        onChange={handleInputChange}
                        className="input-field"
                      >
                        <option value="">Selecciona...</option>
                        {facturacionOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={prevStep} className="btn-secondary text-sm">
                      <ArrowLeft className="mr-1 w-3.5 h-3.5" />
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceedStep3()}
                      className="btn-primary"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* ─── Step 4: Contact data ───────────────── */}
              {currentStep === 4 && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    Último paso: tus datos de contacto
                  </h3>
                  <div className="space-y-3">
                    {/* Row 1: CIF + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="cif_nif" className="block text-sm font-medium text-foreground mb-1.5">
                          {formPath === "empresa" ? "CIF" : "NIF / NIE"}
                        </label>
                        <input type="text" id="cif_nif" name="cif_nif" value={formData.cif_nif} onChange={handleInputChange}
                          placeholder={formPath === "empresa" ? "B12345678" : "12345678A"} className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                          placeholder="tu@email.com" className="input-field" />
                      </div>
                    </div>

                    {/* Row 2: Nombre + Teléfono */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-1.5">
                          {formPath === "empresa" ? "Responsable" : "Nombre completo"}
                        </label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange}
                          placeholder="Nombre y apellidos" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-foreground mb-1.5">Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleInputChange}
                          placeholder="600123456" className="input-field" />
                      </div>
                    </div>

                    {/* Row 3: Domicilio */}
                    <div>
                      <label htmlFor="domicilio" className="block text-sm font-medium text-foreground mb-1.5">Domicilio fiscal</label>
                      <input type="text" id="domicilio" name="domicilio" value={formData.domicilio} onChange={handleInputChange}
                        placeholder="Calle, número, piso..." className="input-field" />
                    </div>

                    {/* Row 4: CP + Ciudad */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="codigo_postal" className="block text-sm font-medium text-foreground mb-1.5">C.P.</label>
                        <input type="text" id="codigo_postal" name="codigo_postal" value={formData.codigo_postal} onChange={handleInputChange}
                          placeholder="28001" className="input-field" />
                      </div>
                      <div>
                        <label htmlFor="ciudad" className="block text-sm font-medium text-foreground mb-1.5">Ciudad</label>
                        <input type="text" id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleInputChange}
                          placeholder="Madrid" className="input-field" />
                      </div>
                    </div>

                    {/* Terms */}
                    <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                      <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-input text-primary focus:ring-primary" />
                      <span className="text-sm text-muted-foreground">
                        Acepto los{" "}
                        <a href="/terminos" target="_blank" className="text-primary hover:underline">términos</a>{" y "}
                        <a href="/privacidad" target="_blank" className="text-primary hover:underline">privacidad</a>
                      </span>
                    </label>
                  </div>

                  {errorMessage && (
                    <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    </div>
                  )}

                  <div className="flex justify-between mt-5">
                    <button type="button" onClick={prevStep} className="btn-secondary text-sm">
                      <ArrowLeft className="mr-1 w-3.5 h-3.5" />
                      Atrás
                    </button>
                    <button type="button" onClick={handleSubmit} className="btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "Enviando..." : "Enviar y agendar reunión"}
                      {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </form>

          {/* Security note — solo visible cuando el form no está enviado */}
          {!isSubmitted && (
            <p className="mt-3 text-center text-white/50 text-xs">
              Datos protegidos · Sin compromiso
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
