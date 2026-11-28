"use client";

import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Clock3,
  Landmark,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { HERO_SLIDES } from "./HomeData";

export default function HomeHero() {
  const slide = HERO_SLIDES[0];

  return (
    <section id="inicio" className="relative min-h-[860px] sm:min-h-[820px] lg:min-h-[800px] flex items-center overflow-hidden bg-slate-950">
      {/* Background Image / Architecture Nexo Talento */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/hero-corporate-architecture.jpg"
          alt="Firma Jurídica NexoLegal Ecuador"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="hero-image-overlay absolute inset-0" />
      </div>

      {/* Hero estático: carga inmediata, sin carrusel ni entrada animada */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left pt-36 sm:pt-44 lg:pt-48 pb-28 sm:pb-32">
        <div className="relative min-h-[420px] sm:min-h-[380px] max-w-3xl">
          <div className="relative">
                {/* Eyebrow Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00A9A3]/40 backdrop-blur-md mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00A9A3]" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
                    {slide.tag}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-[1.08] mb-4 sm:mb-6 max-w-3xl break-words">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-[#f4f5f1]/90 max-w-2xl leading-relaxed mb-8 sm:mb-10 font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 max-w-xl">
                  <a
                    href={slide.primaryCta.href}
                    onClick={() => trackEvent("contact_click", { cta: slide.primaryCta.text, slide: slide.title })}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-sm shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={slide.secondaryCta.href}
                    onClick={() => trackEvent("service_explore_click", { cta: slide.secondaryCta.text, slide: slide.title })}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.secondaryCta.text}</span>
                    <ChevronRight className="w-4 h-4 text-[#38DFD8]" />
                  </a>
                </div>

                {/* Mensaje comercial verificable */}
                <div className="pt-4 flex items-center gap-2 text-xs text-[#38DFD8] font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Evaluación inicial sujeta a revisión de antecedentes y disponibilidad profesional</span>
                </div>
          </div>
        </div>
      </div>

      {/* Floating Trust Strip at Bottom of Hero */}
      <div className="hero-trust-strip absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#101820] via-[#1b2730] to-[#101820] border-t border-[#00A9A3]/20 py-3.5 px-4 z-20">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-cyan-100/90">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38DFD8]" />
            <span>Tratamiento reservado y deber de secreto profesional</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Clock3 className="w-4 h-4 text-[#38DFD8]" />
            <span>Confirmación y referencia de seguimiento al enviar tu solicitud</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#38DFD8]" />
            <span>Sede Central en Quito · Cobertura en Todo Ecuador</span>
          </div>
        </div>
      </div>
    </section>
  );
}
