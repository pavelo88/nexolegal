"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Settings, Check, X, ChevronRight, Lock } from "lucide-react";
import { CONSENT_STORAGE_KEY, CONSENT_UPDATED_EVENT } from "@/lib/analytics";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Siempre obligatorias
    analytics: false,
    functional: false,
  });

  useEffect(() => {
    // Comprobar si ya existe consentimiento registrado
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (consent) {
        const saved = JSON.parse(consent);
        setPreferences({ necessary: true, analytics: Boolean(saved.analytics), functional: Boolean(saved.functional) });
      }
      if (!consent) {
        // Retardo elegante de 1.2 segundos para no agredir la carga inicial
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenBanner = () => {
      setShowBanner(true);
      setShowPreferences(true);
    };
    window.addEventListener("open-cookie-preferences", handleOpenBanner);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenBanner);
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
      framework: "LOPDP-Ecuador-Art20",
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT));
    } catch {}
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
      framework: "LOPDP-Ecuador-Art20",
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT));
    } catch {}
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSaveCustom = () => {
    const consent = {
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
      framework: "LOPDP-Ecuador-Art20",
    };
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
      window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT));
    } catch {}
    setShowBanner(false);
    setShowPreferences(false);
  };

  if (!showBanner) {
    return null;
  }



  return (
    <>
      {/* Banner Principal Fijo Inferior (Elevado en móvil para flotar limpiamente sobre el dock inferior) */}
      <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] md:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-[70] max-w-4xl mx-auto animate-fade-in">
        <div className="rounded-2xl bg-[#05162E]/95 backdrop-blur-xl border border-[#00A9A3]/40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 sm:p-5 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#00A9A3]/15 border border-[#00A9A3]/30 flex items-center justify-center shrink-0 text-[#38DFD8] mt-0.5">
                <ShieldCheck className="w-5 h-5 text-[#00A9A3]" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#F8FAFC]">
                    Privacidad &amp; Cookies Legales · Ecuador (LOPDP)
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/30">
                    Ley Orgánica
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  En cumplimiento de la <strong>Ley Orgánica de Protección de Datos Personales de la República del Ecuador</strong>,
                  utilizamos almacenamiento técnico para recordar tu sesión y preferencias. Las mediciones publicitarias
                  solo se activan con tu consentimiento. Puedes aceptar todas o personalizar tu preferencia.{" "}
                  <Link href="/privacidad" className="inline-flex min-h-11 items-center text-[#38DFD8] underline hover:text-white transition-colors">
                    Leer Política de Privacidad
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto shrink-0 justify-end pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
              <button
                onClick={() => setShowPreferences(true)}
                className="min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white border border-white/15 hover:border-[#00A9A3]/50 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Settings className="w-3.5 h-3.5 text-[#00A9A3]" />
                <span>Configurar</span>
              </button>
              <button
                onClick={handleAcceptNecessary}
                className="min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#F8FAFC] bg-white/10 hover:bg-white/15 border border-white/20 transition-all active:scale-95"
              >
                Solo necesarias
              </button>
              <button
                onClick={handleAcceptAll}
                className="min-h-11 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white shadow-lg shadow-[#00A9A3]/25 hover:brightness-110 transition-all active:scale-95"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Preferencias Granulares */}
      {showPreferences && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#05162E] border border-[#00A9A3]/40 shadow-2xl p-6 text-white space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#00A9A3]/20 flex items-center justify-center text-[#38DFD8]">
                  <Cookie className="w-4 h-4 text-[#00A9A3]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Configuración de Privacidad</h3>
                  <p className="text-[11px] text-slate-400">LOPDP Ecuador · Registro Oficial Sup. 459</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Cookies Técnicas (Obligatorias) */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#00A9A3]" />
                    <strong className="text-white text-sm">Cookies Técnicas y de Seguridad</strong>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#00A9A3]/20 text-emerald-300 border border-[#00A9A3]/30">
                    Obligatorias
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Imprescindibles para autenticación, conservación de preferencias y navegación segura.
                  No se utilizan para publicidad.
                </p>
              </div>

              {/* Cookies Analíticas (Opcionales) */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-white text-sm">Cookies de Rendimiento &amp; Telemetría</strong>
                    <p className="text-slate-400 text-[11px]">Métricas de latencia y experiencia de usuario</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00A9A3]"></div>
                  </label>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Permiten medir visitas y conversiones para evaluar el rendimiento del sitio y de las campañas.
                  Solo se cargan cuando otorgas este consentimiento.
                </p>
              </div>

              {/* Cookies Funcionales (Opcionales) */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-white text-sm">Preferencias de Interfaz</strong>
                    <p className="text-slate-400 text-[11px]">Tema (claro/oscuro), tamaño de fuente y filtros</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) =>
                        setPreferences((prev) => ({ ...prev, functional: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00A9A3]"></div>
                  </label>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Guardan la configuración visual elegida en tu dispositivo para que no tengas que reconfigurarla en cada visita.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
              <Link
                href="/privacidad"
                onClick={() => setShowPreferences(false)}
                className="text-[#38DFD8] hover:underline"
              >
                Ver Derechos ARCO (LOPDP)
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="px-3 py-1.5 rounded-xl text-slate-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-4 py-2 rounded-xl font-bold bg-[#00A9A3] hover:bg-[#00A9A3] text-white shadow-md active:scale-95 transition-all"
                >
                  Guardar Preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
