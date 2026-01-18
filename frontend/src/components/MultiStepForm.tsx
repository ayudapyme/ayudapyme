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
  Sparkles,
} from "lucide-react";

type CompanySize = "autonomo" | "micro" | "pequena" | "mediana" | "grande" | null;

interface FormData {
  actividad: string;
  cif_nif: string;
  email_facturacion: string;
  nombre_titular: string;
  iban_titular: string;
  domicilio_fiscal: string;
  codigo_postal: string;
  ciudad: string;
}

const NIF_MAP = "TRWAGMYFPDXBNJZSQVHLCKE";

function normalizeId(value: string): string {
  if (!value) return "";
  return value.toUpperCase().replace(/[\s-]+/g, "");
}

function isValidNIF(v: string): boolean {
  v = normalizeId(v);
  if (!/^[0-9]{8}[A-Z]$/.test(v)) return false;
  const num = parseInt(v.slice(0, 8), 10);
  const letter = v[8];
  const expected = NIF_MAP[num % 23];
  return letter === expected;
}

function isValidNIE(v: string): boolean {
  v = normalizeId(v);
  if (!/^[XYZ][0-9]{7}[A-Z]$/.test(v)) return false;
  const map: Record<string, string> = { X: "0", Y: "1", Z: "2" };
  const numPart = map[v[0]] + v.slice(1, 8);
  const letter = v[8];
  const expected = NIF_MAP[parseInt(numPart, 10) % 23];
  return letter === expected;
}

function sumDigits(n: number): number {
  if (n < 10) return n;
  return Math.floor(n / 10) + (n % 10);
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
    const pos = i + 1;
    if (pos % 2 === 0) {
      sumEven += d;
    } else {
      sumOdd += sumDigits(d * 2);
    }
  }
  const total = sumEven + sumOdd;
  const digit = (10 - (total % 10)) % 10;
  const letter = "JABCDEFGHI"[digit];
  const mustBeDigit = "ABEH".includes(first);
  const mustBeLetter = "KPQSW".includes(first);

  if (mustBeDigit) return control === String(digit);
  if (mustBeLetter) return control === letter;
  return control === String(digit) || control === letter;
}

function isValidSpanishId(v: string): boolean {
  v = normalizeId(v);
  if (!v) return false;
  return isValidNIF(v) || isValidNIE(v) || isValidCIF(v);
}

function normalizeIban(iban: string): string {
  if (!iban) return "";
  return iban.replace(/\s+/g, "").toUpperCase();
}

function isValidIban(iban: string): boolean {
  const v = normalizeIban(iban);
  if (!/^([A-Z]{2}[0-9]{2}[A-Z0-9]{11,30})$/.test(v)) return false;
  return v.length >= 15 && v.length <= 34;
}

function isValidEmail(email: string): boolean {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = pantalla inicio
  const [companySize, setCompanySize] = useState<CompanySize>(null);
  const [formData, setFormData] = useState<FormData>({
    actividad: "",
    cif_nif: "",
    email_facturacion: "",
    nombre_titular: "",
    iban_titular: "",
    domicilio_fiscal: "",
    codigo_postal: "",
    ciudad: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = 3;

  const companySizeOptions = [
    { value: "autonomo" as const, label: "Autónomo", icon: User },
    { value: "micro" as const, label: "Micro", sublabel: "1–9 empleados", icon: Users },
    { value: "pequena" as const, label: "Pequeña", sublabel: "10–49 empleados", icon: Building2 },
    { value: "mediana" as const, label: "Mediana", sublabel: "50–249 empleados", icon: Building },
    { value: "grande" as const, label: "Gran empresa", sublabel: "250+ empleados", icon: Factory },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setErrorMessage(null);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrorMessage(null);
    }
  };

  const startForm = () => {
    setCurrentStep(1);
  };

  const getCompanySizeValue = (size: CompanySize): string => {
    const mapping: Record<string, string> = {
      autonomo: "Autónomo",
      micro: "Micro (1–9 empleados)",
      pequena: "Pequeña (10–49 empleados)",
      mediana: "Mediana (50–249 empleados)",
      grande: "Gran empresa (250+ empleados)",
    };
    return size ? mapping[size] : "";
  };

  const canSubmitStep3 = (): string | null => {
    if (!formData.cif_nif.trim()) return "La identificación es obligatoria.";
    if (!isValidSpanishId(formData.cif_nif)) return "El NIF/NIE/CIF introducido no es válido.";
    if (!formData.email_facturacion.trim()) return "El email de facturación es obligatorio.";
    if (!isValidEmail(formData.email_facturacion)) return "Introduce un email de facturación válido.";
    if (!formData.nombre_titular.trim()) return "El nombre del titular es obligatorio.";
    if (!formData.iban_titular.trim()) return "El IBAN es obligatorio.";
    if (!isValidIban(formData.iban_titular)) return "Introduce un IBAN válido.";
    if (!formData.domicilio_fiscal.trim()) return "El domicilio fiscal es obligatorio.";
    if (!formData.codigo_postal.trim()) return "El código postal es obligatorio.";
    if (!/^[0-9]{4,6}$/.test(formData.codigo_postal.trim())) return "Introduce un código postal válido.";
    if (!formData.ciudad.trim()) return "La ciudad es obligatoria.";

    const termsCheckbox = document.getElementById("aceptaTerminos") as HTMLInputElement | null;
    if (!termsCheckbox || !termsCheckbox.checked) {
      return "Debes aceptar los términos y condiciones.";
    }

    if (!getCompanySizeValue(companySize)) {
      return "Selecciona el tamaño de tu empresa en el primer paso.";
    }

    if (!formData.actividad.trim()) {
      return "Indica a qué se dedica tu empresa en el segundo paso.";
    }

    return null;
  };

  const handleSubmit = async () => {
    const error = canSubmitStep3();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

    const cleanIban = normalizeIban(formData.iban_titular);
    const cif_nifNormalizada = normalizeId(formData.cif_nif);

    try {
      // 1) Enviar IBAN a Stripe vía backend
      const ibanRes = await fetch(`${apiBase}/api/iban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombre_titular.trim(),
          email: formData.email_facturacion.trim(),
          iban: cleanIban,
        }),
      });

      const ibanData = await ibanRes.json();
      if (!ibanRes.ok || !ibanData.success) {
        throw new Error(ibanData.error || "No se pudo guardar el IBAN en Stripe.");
      }

      // 2) Enviar formulario completo a n8n vía backend
      const payload = {
        tamano_empresa: getCompanySizeValue(companySize),
        actividad: formData.actividad.trim(),
        cif_nif: cif_nifNormalizada,
        email_facturacion: formData.email_facturacion.trim(),
        nombre_titular: formData.nombre_titular.trim(),
        domicilio_fiscal: formData.domicilio_fiscal.trim(),
        codigo_postal: formData.codigo_postal.trim(),
        ciudad: formData.ciudad.trim(),
        acepta_terminos: true,
        origen: "entrevista-web",
      };

      await fetch(`${apiBase}/api/formulario/alta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
      setCurrentStep(3);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Ha ocurrido un error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="formulario" className="section-padding bg-muted">
      <div className="container-custom">
        {/* Form Container */}
        <div className="max-w-[650px] mx-auto">
          <form
            id="gestoria-form"
            className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Hidden field for company size value */}
            <input
              type="hidden"
              name="tamano_empresa"
              id="tamano_empresa"
              value={getCompanySizeValue(companySize)}
            />

            {/* Inner container with scroll */}
            <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto">
              {/* Step 0: Start Screen */}
              {currentStep === 0 && (
                <div className="animate-fade-in text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    Descubre las Ayudas y Subvenciones para tu Empresa
                  </h2>
                  <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
                    Completa este formulario en pocos pasos y nuestro equipo se pondrá en contacto contigo.
                  </p>
                  <button
                    type="button"
                    onClick={startForm}
                    className="btn-primary text-lg px-10 py-4"
                  >
                    Comenzar
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Progress Steps */}
              {(currentStep > 0 || isSubmitted) && (
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-3">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`step-indicator w-9 h-9 text-sm ${
                            isSubmitted
                              ? "completed"
                              : currentStep === step
                              ? "active"
                              : currentStep > step
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {isSubmitted || currentStep > step ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < totalSteps && (
                          <div
                            className={`w-10 md:w-16 h-1 mx-2 rounded-full transition-colors ${
                              isSubmitted || currentStep > step ? "bg-accent" : "bg-muted"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-3 text-xs">
                    <div className="flex items-center gap-3 md:gap-12">
                      <span
                        className={`w-12 md:w-16 text-center font-semibold ${
                          isSubmitted || currentStep >= 1 ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        Tamaño
                      </span>
                      <span
                        className={`w-12 md:w-16 text-center font-semibold ${
                          isSubmitted || currentStep >= 2 ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        Actividad
                      </span>
                      <span
                        className={`w-12 md:w-16 text-center font-semibold ${
                          isSubmitted || currentStep >= 3 ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        Pago
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Company Size */}
              {currentStep === 1 && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    ¿Cuál es el tamaño de tu empresa?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {companySizeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCompanySize(option.value)}
                        className={`company-size-option p-4 ${
                          companySize === option.value ? "selected" : ""
                        }`}
                      >
                        <option.icon
                          className={`w-6 h-6 mb-2 transition-colors ${
                            companySize === option.value ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                        <span className="font-semibold text-foreground text-xs">
                          {option.label}
                        </span>
                        {option.sublabel && (
                          <span className="text-[10px] text-muted-foreground mt-1">
                            {option.sublabel}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!companySize}
                      className="btn-primary"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Activity */}
              {currentStep === 2 && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-5 text-center">
                    Actividad de tu empresa
                  </h3>
                  <div>
                    <label
                      htmlFor="actividad"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      ¿A qué se dedica tu empresa?
                    </label>
                    <input
                      type="text"
                      id="actividad"
                      name="actividad"
                      required
                      value={formData.actividad}
                      onChange={handleInputChange}
                      placeholder="Ej: Consultoría tecnológica, Comercio minorista..."
                      className="input-field"
                    />
                  </div>

                  <div className="flex justify-between mt-6">
                    <button type="button" onClick={prevStep} className="btn-secondary">
                      <ArrowLeft className="mr-2 w-4 h-4" />
                      Anterior
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.actividad.trim()}
                      className="btn-primary"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Success Screen */}
              {isSubmitted && (
                <div className="animate-fade-in text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20 mb-6">
                    <Check className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                    ¡Formulario enviado!
                  </h2>
                  <p className="text-foreground text-lg mb-2">
                    Muy pronto nuestro equipo se pondrá en contacto contigo por correo electrónico o por teléfono.
                  </p>
                  <p className="text-muted-foreground text-base max-w-md mx-auto">
                    Gracias por confiar en nosotros. Revisaremos tu solicitud y te responderemos lo antes posible.
                  </p>
                </div>
              )}

              {/* Step 3: SEPA Data */}
              {currentStep === 3 && !isSubmitted && (
                <div className="animate-fade-in">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2 text-center">
                    Datos para domiciliación SEPA
                  </h3>
                  <p className="text-muted-foreground text-sm text-center mb-5">
                    Estos datos son necesarios para procesar el pago de forma segura.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="cif_nif"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Identificación (NIF/CIF/NIE) *
                      </label>
                      <input
                        type="text"
                        id="cif_nif"
                        name="cif_nif"
                        required
                        value={formData.cif_nif}
                        onChange={handleInputChange}
                        placeholder="Ej: 12345678A, B12345678..."
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email-facturacion"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email-facturacion"
                        name="email"
                        required
                        value={formData.email_facturacion}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="nombre-titular"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Nombre del responsable
                      </label>
                      <input
                        type="text"
                        id="nombre-titular"
                        name="nombre_titular"
                        required
                        value={formData.nombre_titular}
                        onChange={handleInputChange}
                        placeholder="Nombre completo del responsable"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="domicilio-fiscal"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Domicilio fiscal *
                      </label>
                      <input
                        type="text"
                        id="domicilio-fiscal"
                        name="domicilio_fiscal"
                        required
                        value={formData.domicilio_fiscal}
                        onChange={handleInputChange}
                        placeholder="Calle, número, piso..."
                        className="input-field"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="codigo-postal"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Código postal *
                        </label>
                        <input
                          type="text"
                          id="codigo-postal"
                          name="codigo_postal"
                          required
                          value={formData.codigo_postal}
                          onChange={handleInputChange}
                          placeholder="28001"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="ciudad"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          id="ciudad"
                          name="ciudad"
                          required
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          placeholder="Madrid"
                          className="input-field"
                        />
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <div className="pt-3 border-t border-border">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          id="aceptaTerminos"
                          name="acepta_terminos"
                          required
                          className="mt-1 w-5 h-5 rounded border-input text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          He leído y acepto los{" "}
                          <a
                            href="/terminos"
                            target="_blank"
                            className="text-primary hover:underline font-medium"
                          >
                            términos y condiciones
                          </a>{" "}
                          y la política de privacidad. *
                        </span>
                      </label>
                    </div>
                  </div>

                  {errorMessage && (
                    <p className="mt-4 text-sm text-destructive text-center">{errorMessage}</p>
                  )}

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar solicitud"}
                      {!isSubmitting && <Check className="ml-2 w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Security Note */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Tus datos están protegidos con encriptación SSL
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultiStepForm;
