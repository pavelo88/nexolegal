"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { HOME_FAQS } from "./HomeData";

export default function FaqSection() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <section id="faqs" className="py-24 bg-[#faf8f5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
            RESOLVEMOS TUS DUDAS
          </span>
          <div className="vis-gold-divider mx-auto my-3" />
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#17211f]">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-4">
          {HOME_FAQS.map((faq, index) => {
            const isOpen = faqOpen === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-[#e6e0d6] bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-[#17211f] hover:text-[#00A9A3] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-serif">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#00A9A3] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-[#55605a] leading-relaxed border-t border-[#f3eee8] pt-4 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Tarjeta de Acción Rápida tras FAQs */}
        <div className="mt-12 p-8 rounded-3xl bg-white border-2 border-[#00A9A3]/40 shadow-xl text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082041]/10 text-[#082041] text-[10px] font-bold uppercase tracking-wider">
            <span>RESPUESTA LEGAL INMEDIATA</span>
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#17211f]">
            ¿Tienes una situación jurídica urgente o un término corriendo?
          </h3>
          <p className="text-xs sm:text-sm text-[#55605a] max-w-lg mx-auto leading-relaxed">
            Si tienes un plazo próximo, indícalo en tu solicitud. El equipo confirmará la recepción y la disponibilidad profesional para revisar el caso.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/593997224453?text=Hola%20NexoLegal,%20tengo%20una%20urgencia%20procesal%20y%20deseo%20atencion%20inmediata"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Atención Inmediata por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="#contacto"
              className="px-6 py-3.5 rounded-xl border border-[#082041] text-[#082041] text-xs font-bold uppercase tracking-wider hover:bg-[#082041]/5 active:scale-95 transition-all"
            >
              Llenar Formulario Web
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
