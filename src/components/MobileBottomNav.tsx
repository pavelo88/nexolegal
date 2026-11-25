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

  const triggerHaptic = (ms = 15) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  };

  const handleOpenAI = () => {
    triggerHaptic(12);
    if (onOpenAssistant) {
      onOpenAssistant();
    } else {
      window.dispatchEvent(new CustomEvent("open-legal-assistant"));
    }
  };

  const handleWhatsApp = () => {
    triggerHaptic(15);
    const text = encodeURIComponent(
      "Hola NexoLegal, me contacto desde la web móvil para consultar con un abogado."
    );
    trackEvent("whatsapp_click", { placement: "mobile_bottom_nav" });
    window.open(`https://wa.me/593997224453?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <nav
      aria-label="Barra de navegación móvil NexoLegal"
      className="fixed inset-x-0 bottom-0 z-50 md:hidden select-none pointer-events-auto"
    >
      <div className="relative">
        {/* Apple iOS Drop Shadow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 drop-shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
          <div className="h-full w-full rounded-t-[50%_1.75rem] bg-[#05162E]/80 ios-notch-mask" />
        </div>

        {/* Apple Frosted Glass Background with Elliptic Arch & Center Notch */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-[50%_1.75rem] border-t border-white/[0.12] bg-[#05162E]/95 backdrop-blur-2xl ios-notch-mask"
        />

        {/* 5-Column Grid */}
        <ul className="relative grid grid-cols-5 items-end px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
          {/* Item 1: Servicios */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href="/#servicios"
              onClick={() => triggerHaptic(12)}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-300 hover:text-white"
            >
              <Scale className="h-5 w-5 text-[#38DFD8]" />
              <span className="text-[10px] font-semibold leading-none tracking-tight text-white/95">Servicios</span>
            </Link>
          </li>

          {/* Item 2: Asistente IA */}
          <li className="flex h-14 items-end justify-center">
            <button
              type="button"
              onClick={handleOpenAI}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-300 hover:text-white cursor-pointer"
            >
              <div className="relative">
                <Sparkles className="h-5 w-5 text-[#38DFD8]" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A9A3]" />
                </span>
              </div>
              <span className="text-[10px] font-semibold leading-none tracking-tight text-[#38DFD8]">Asistente IA</span>
            </button>
          </li>

          {/* Center Column: Notch Floating WhatsApp Button (Principal) */}
          <li className="relative flex h-14 justify-center">
            <a
              href="https://wa.me/593997224453?text=Hola%20NexoLegal%2C%20me%20contacto%20desde%20la%20web%20m%C3%B3vil%20para%20consultar%20con%20un%20abogado."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerHaptic(25);
                trackEvent("whatsapp_click", { placement: "mobile_bottom_nav" });
              }}
              aria-label="Consultar por WhatsApp 24/7"
              className="group absolute -top-[28px] bottom-0 flex flex-col items-center justify-between pb-1 cursor-pointer"
            >
              <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-emerald-400 via-[#25D366] to-[#00A9A3] text-slate-950 shadow-[0_4px_20px_rgba(37,211,102,0.5)] ring-2 ring-white/30 transition-transform duration-150 group-active:scale-90">
                <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 pointer-events-none" />
                <MessageCircle className="h-6 w-6 text-slate-950 fill-slate-950/15" aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[10px] font-black leading-none tracking-wider text-emerald-400 uppercase drop-shadow">
                WhatsApp
              </span>
            </a>
          </li>

          {/* Item 4: Blog */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href="/blog"
              onClick={() => triggerHaptic(12)}
              className={`flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 ${
                pathname === "/blog" ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              <BookOpen className={`h-5 w-5 ${pathname === "/blog" ? "text-cyan-400" : "text-slate-300"}`} />
              <span className="text-[10px] font-semibold leading-none tracking-tight">Blog</span>
            </Link>
          </li>

          {/* Item 5: Tu app */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href="/app"
              onClick={() => triggerHaptic(12)}
              className={`flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 ${
                pathname === "/app" ? "text-cyan-400 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              <Lock className={`h-5 w-5 ${pathname === "/app" ? "text-cyan-400" : "text-[#38DFD8]"}`} />
              <span className="text-[10px] font-semibold leading-none tracking-tight text-white/95">Tu app</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
