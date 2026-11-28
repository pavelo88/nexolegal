"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, ShieldCheck, Send, ArrowRight } from "lucide-react";
import { getAttribution, trackEvent } from "@/lib/analytics";

export default function ContactSection() {
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState<{ reference: string; whatsappUrl: string } | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "Consulta General");
    const message = String(data.get("message") || "");
    const website = String(data.get("website") || "");

    const text = encodeURIComponent(
      `Hola NexoLegal, deseo solicitar una consulta jurídica.\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Correo:* ${email}\n*Área:* ${service}\n*Mensaje:* ${message}`
    );
    setContactSubmitting(true);
    setContactError(null);
    setContactResult(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          area: service,
          urgency: "Media",
          description: message,
          website,
          attribution: getAttribution(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.reference) throw new Error(result?.error || "No se pudo registrar la consulta.");
      const whatsappUrl = `https://wa.me/593997224453?text=${text}%0A%0A*Referencia:*%20${encodeURIComponent(result.reference)}`;
      setContactResult({ reference: result.reference, whatsappUrl });
      trackEvent("lead_form_submit_success", { form_name: "home_contact", reference: result.reference });
      form.reset();
    } catch (error) {
      setContactError(error instanceof Error ? error.message : "No se pudo registrar la consulta.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-gradient-to-br from-[#082041] to-[#05162E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Contact Info (50% de ancho) */}
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#38DFD8]">
              COMUNÍCATE CON NOSOTROS
            </span>
            <div className="vis-gold-divider mb-4" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
              Hablemos de tu situación con total reserva
            </h2>
            <p className="text-sm sm:text-base text-cyan-100/80 leading-relaxed font-normal">
              El primer paso consiste en escuchar los detalles de tu problema para brindarte una orientación clara y
              un presupuesto cerrado y sin sorpresas.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Teléfono / WhatsApp</span>
                  <a href="tel:+593997224453" className="inline-flex min-h-11 items-center text-sm font-bold text-white hover:text-[#38DFD8]">
                    +593 99 722 4453
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Correo Electrónico</span>
                  <a href="#contacto" className="inline-flex min-h-11 items-center text-sm font-bold text-white hover:text-[#38DFD8]">
                    <span>Contactar</span>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Sede Jurídica</span>
                  <span className="text-sm font-bold text-white">Quito, Ecuador · Cobertura Nacional</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-cyan-100/80 mt-6">
              <ShieldCheck className="w-5 h-5 text-[#38DFD8] shrink-0" />
              <span>Tu información está protegida bajo el Código de Ética y Secreto Profesional de la Abogacía.</span>
            </div>
          </div>

          {/* Right Contact Form (50% de ancho) */}
          <div>
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-[#00A9A3]/30 p-8 sm:p-10 shadow-2xl">
              <h3 className="text-xl font-bold font-serif text-white mb-2">Solicitar Asesoría o Presupuesto</h3>
              <p className="text-xs text-cyan-100/70 mb-6">
                Registraremos tu solicitud y podrás continuar la conversación por WhatsApp con una referencia de seguimiento.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="company-website">Sitio web</label>
                  <input id="company-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white/90 block mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ej. Dr. Carlos Andrade"
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-white/90 block mb-1">Teléfono o WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Ej. +593 99 999 9999"
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-white/90 block mb-1">Correo electrónico *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                    />
                  </div>
                  <div>
                    <label htmlFor="lead-service" className="text-xs font-semibold text-white/90 block mb-1">Área de interés</label>
                    <select
                      id="lead-service"
                      name="service"
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                    >
                      <option value="Litigios & Penal">Litigios & Penal</option>
                      <option value="Mercantil & Empresas">Mercantil & Empresas</option>
                      <option value="Familia & Sucesiones">Familia & Sucesiones</option>
                      <option value="Laboral & Regulatorio">Laboral & Regulatorio</option>
                      <option value="Consulta General">Otra Consulta Jurídica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/90 block mb-1">¿En qué podemos ayudarte? *</label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe brevemente los antecedentes de tu situación..."
                    className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="vis-interactive-btn w-full py-4 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{contactSubmitting ? "Registrando solicitud…" : "Registrar consulta"}</span>
                </button>

                {contactError ? (
                  <p role="alert" className="rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-xs text-red-100">
                    {contactError}
                  </p>
                ) : null}

                {contactResult ? (
                  <div role="status" className="rounded-xl border border-emerald-300/30 bg-[#00A9A3]/15 p-4 text-sm text-emerald-50">
                    <p className="font-bold">Solicitud registrada · {contactResult.reference}</p>
                    <p className="mt-1 text-xs text-cyan-100/80">Conserva esta referencia y continúa por WhatsApp si deseas atención inmediata.</p>
                    <a
                      href={contactResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white"
                    >
                      Continuar por WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : null}

                <p className="text-[11px] text-cyan-100/60 text-center pt-2">
                  El envío de este formulario no constituye relación abogado-cliente hasta la suscripción del convenio profesional.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
