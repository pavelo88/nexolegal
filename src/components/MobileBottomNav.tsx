"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, Sparkles, Lock, BookOpen, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface MobileBottomNavProps {
  onOpenAssistant?: () => void;
}

export default function MobileBottomNav({ onOpenAssistant }: MobileBottomNavProps) {
  const pathname = usePathname();

  const handleOpenAI = () => {
    if (onOpenAssistant) {
      onOpenAssistant();
    } else {
      window.dispatchEvent(new CustomEvent("open-legal-assistant"));
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hola NexoLegal, me contacto desde la app móvil para consultar con un abogado."
    );
    trackEvent("whatsapp_click", { placement: "mobile_bottom_nav" });
    window.open(`https://wa.me/593991786275?text=${text}`, "_blank");
  };

  return (
    <nav
      role="navigation"
      aria-label="Navegación móvil inferior"
      className="public-mobile-dock fixed z-50 md:hidden"
    >
      <div className="flex items-center justify-between gap-1 relative px-1">
        {/* 1. Áreas de Litigio / Servicios */}
        <Link
          href="/#servicios"
          className="flex flex-col items-center justify-center gap-0.5 text-white/80 hover:text-white active:scale-90 transition-all flex-1 min-h-11 py-1"
        >
          <Scale className="w-4 h-4 text-[#38DFD8]" />
          <span className="text-[10px] font-bold tracking-tight text-white/95">Servicios</span>
        </Link>

        {/* 2. Asistente IA Legal */}
        <button
          type="button"
          onClick={handleOpenAI}
          className="flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all flex-1 min-h-11 py-1 text-white/85 hover:text-[#38DFD8] group"
          aria-label="Abrir Asistente IA Legal"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-[#38DFD8] group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 ring-1 ring-black animate-pulse" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-[#38DFD8]">Asistente IA</span>
        </button>

        {/* 3. BOTÓN CENTRAL FLOTANTE (ESTILO APPLE LUXURY CON GLOW) */}
        <Link
          href="/app"
          className="flex flex-col items-center justify-center -mt-5 group active:scale-90 transition-all px-1.5"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#05162E] via-[#1b433b] to-[#00A9A3] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,169,163,0.45)] border-2 border-white/90 ring-2 ring-[#00A9A3]/60 group-hover:scale-105 group-hover:brightness-110 transition-transform">
            <Lock className="w-5 h-5 text-[#fef9f0]" />
          </div>
          <span className="text-[10px] font-extrabold text-[#38DFD8] tracking-wider mt-0.5 drop-shadow">
            Tu app
          </span>
        </Link>

        {/* 4. Blog Jurídico */}
        <Link
          href="/blog"
          className={`flex flex-col items-center justify-center gap-0.5 active:scale-90 transition-all flex-1 min-h-11 py-1 ${
            pathname === "/blog" ? "text-[#38DFD8]" : "text-white/80 hover:text-white"
          }`}
        >
          <BookOpen className={`w-4 h-4 ${pathname === "/blog" ? "text-[#38DFD8]" : "text-white/70"}`} />
          <span className="text-[10px] font-bold tracking-tight text-white/95">Blog</span>
        </Link>

        {/* 5. WhatsApp Directo */}
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center gap-0.5 text-white/80 hover:text-emerald-300 active:scale-90 transition-all flex-1 min-h-11 py-1"
        >
          <div className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
            <MessageCircle className="w-3.5 h-3.5 fill-white text-[#25D366]" />
          </div>
          <span className="text-[10px] font-bold tracking-tight text-[#38DFD8]">WhatsApp</span>
        </button>
      </div>
    </nav>
  );
}
