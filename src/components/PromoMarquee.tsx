"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface PromoMarqueeProps {
  scrolled?: boolean;
}

export default function PromoMarquee({ scrolled = false }: PromoMarqueeProps) {
  const marqueeItems = [
    {
      badge: "⚖️ CONSULTA INICIAL",
      title: "Diagnóstico Jurídico y Blindaje Patrimonial",
      desc: "Evaluación procesal experta para personas, familias y empresas en todo el Ecuador.",
      cta: "Solicitar Diagnóstico",
    },
    {
      badge: "🛡️ PREVENCIÓN LEGAL",
      title: "Identifica contingencias jurídicas antes de tomar decisiones",
      desc: "Revisión técnica de contratos, litigios, herencias y términos COGEP.",
      cta: "Blindar mi Caso",
    },
    {
      badge: "🚀 NexoLegal TECH",
      title: "Asesoría jurídica con acceso permanente al portal",
      desc: "Atención desde Quito y coordinación profesional a escala nacional.",
      cta: "Hablar con Abogado",
    },
    {
      badge: "💎 BENEFICIO DE TEMPORADA",
      title: "Organiza tus documentos y próximos pasos con respaldo profesional",
      desc: "Membresías de asesoría continua y consultoría societaria a medida.",
      cta: "Conocer Planes",
    },
  ];

  // Duplicamos los items para un bucle continuo infinito
  const loopItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  const handleWhatsappPromo = (badge: string) => {
    const text = encodeURIComponent(
      `Hola NexoLegal, deseo solicitar información sobre una consulta de diagnóstico legal. Requerimiento: ${badge}`
    );
    trackEvent("whatsapp_click", { placement: "promo_marquee", badge });
    window.open(`https://wa.me/593991786275?text=${text}`, "_blank");
  };

  return (
    <div
      role="region"
      aria-label="Promoción institucional de temporada"
      className={`w-full overflow-hidden transition-all duration-300 select-none z-40 bg-gradient-to-r from-[#05162E] via-[#05162E] to-[#05162E] border-b border-[#00A9A3]/30 text-white ${
        scrolled ? "hidden" : "block"
      }`}
    >
      <div className="relative w-full overflow-hidden py-2 sm:py-2.5">
        {/* Máscaras laterales de desvanecimiento elegante */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[#05162E] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[#05162E] to-transparent" />

        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {loopItems.map((item, index) => (
            <div
              key={index}
              aria-hidden={index >= marqueeItems.length ? true : undefined}
              className="inline-flex items-center gap-3 shrink-0 group cursor-pointer"
              onClick={() => handleWhatsappPromo(item.badge)}
            >
              {/* Badge temático */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/40 group-hover:bg-[#00A9A3]/30 transition-colors shadow-xs">
                <span>{item.badge}</span>
              </span>

              {/* Título y descripción */}
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-white/95 group-hover:text-[#38DFD8] transition-colors">
                  {item.title}
                </span>
                <span className="text-[#00A9A3]/70 font-mono hidden sm:inline">•</span>
                <span className="text-cyan-100/75 hidden md:inline font-light">
                  {item.desc}
                </span>
              </div>

              {/* Botón CTA dentro de la marquesina */}
              <button
                type="button"
                suppressHydrationWarning
                tabIndex={index >= marqueeItems.length ? -1 : 0}
                className="inline-flex items-center gap-1 px-2.5 py-1 min-h-6 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-[10px] font-bold uppercase tracking-wider group-hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>

              <Sparkles className="w-3 h-3 text-[#00A9A3] shrink-0 opacity-70 group-hover:opacity-100 transition-opacity ml-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
