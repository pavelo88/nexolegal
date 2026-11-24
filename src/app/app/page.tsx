"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserRound,
  BriefcaseBusiness,
  Building2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Scale,
  Sparkles,
  Lock,
  ChevronRight,
  CheckCircle2,
  Eye,
  Layers,
  ArrowLeft,
} from "lucide-react";
import AppExperienceNavigation, { DemoEnvironmentBadge } from "@/components/app/AppExperienceNavigation";

interface AppDemoCard {
  id: "user" | "empresas" | "abogado" | "admin";
  title: string;
  badge: string;
  badgeColor: string;
  desc: string;
  themeStyle: string;
  path: string;
  icon: typeof UserRound;
  features: string[];
  cta: string;
}

const appDemos: AppDemoCard[] = [
  {
    id: "user",
    title: "App 1: Portal de Clientes & Suscriptores",
    badge: "Personas & Familias",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    desc: "Demostración para personas naturales y miembros. Permite explorar una interfaz de seguimiento, alertas ficticias y orientación preventiva con IA, sin conexión a expedientes reales ni a SATJE.",
    themeStyle: "from-[#05162E] to-[#082041] border-[#00A9A3]/40",
    path: "/user",
    icon: UserRound,
    features: [
      "Semáforo demostrativo de causas y novedades registradas",
      "Asistente Legal Preventivo con IA con cobertura de membresía",
      "Academia Ciudadana: Clases en video de derechos y prevención",
      "Vista simulada de documentos y providencias ficticias",
    ],
    cta: "Probar App Clientes (/user)",
  },
  {
    id: "empresas",
    title: "App 2: Portal Corporativo & Compliance B2B",
    badge: "Empresas & Directorios",
    badgeColor: "bg-[#00A9A3]/20 text-emerald-300 border-[#00A9A3]/40",
    desc: "Demostración multi-tenant para gerencias y directorios. Presenta flujos ficticios de riesgo societario, auditoría laboral y gestión de contratos.",
    themeStyle: "from-[#05162E] to-[#132220] border-[#00A9A3]/40",
    path: "/empresas",
    icon: Building2,
    features: [
      "Matriz demostrativa de riesgo penal societario (Art. 49 COIP)",
      "Auditoría laboral preventiva y contingencias patronales",
      "Bóveda de contratos de alta cuantía con control de firmas",
      "Panel de niveles de servicio y atención preferente simulados",
    ],
    cta: "Probar App Empresas (/empresas)",
  },
  {
    id: "abogado",
    title: "App 3: Despacho Letrado & Litigios Pro",
    badge: "Socios & Abogados Litigantes",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    desc: "Demostración de herramientas para abogados y letrados asociados. Incluye cronómetros y agendas ficticias que no sustituyen la verificación profesional de términos.",
    themeStyle: "from-[#1a1711] to-[#262118] border-amber-500/40",
    path: "/abogado",
    icon: BriefcaseBusiness,
    features: [
      "Simulación de cómputo y control profesional de términos COGEP",
      "Radar de audiencias orales por unidad judicial y provincia",
      "Generador de minutas con argumentación y doctrina procesal",
      "Control de honorarios y comisiones de éxito por causa",
    ],
    cta: "Probar App Letrados (/abogado)",
  },
  {
    id: "admin",
    title: "Panel de Dirección & CRM de Casos",
    badge: "Gerencia & Dirección",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    desc: "Vista ejecutiva de demostración para socios directores, con métricas y expedientes ficticios para explorar el flujo del CRM.",
    themeStyle: "from-[#161224] to-[#201833] border-purple-500/40",
    path: "/admin",
    icon: ShieldCheck,
    features: [
      "Pipeline de clientes nuevos y cotizaciones en curso",
      "Monitoreo de ingresos por igualas mensuales y litigios",
      "Asignación de causas y control de carga procesal por abogado",
      "Trazabilidad inmutable de actividades y consultas",
    ],
    cta: "Probar Panel Dirección (/admin)",
  },
];

export default function AppPage() {
  const [activePreview, setActivePreview] = useState<"user" | "empresas" | "abogado" | "admin">("user");

  const currentApp = appDemos.find((a) => a.id === activePreview) || appDemos[0];

  return (
    <div className="with-app-experience-dock min-h-screen bg-[#071311] text-white flex flex-col font-sans selection:bg-[#00A9A3]/30">
      <DemoEnvironmentBadge />
      {/* ─── 1. TOP HEADER DE NAVEGACIÓN ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#05162E]/95 backdrop-blur-xl border-b border-[#00A9A3]/30 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-200/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Volver a la Web</span>
            </Link>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#082041] text-[#38DFD8] border border-[#00A9A3]/50 flex items-center justify-center font-bold">
                <Scale size={16} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white">NexoLegal</span>
                <span className="text-[9px] uppercase tracking-widest text-[#38DFD8] block -mt-0.5 font-mono">
                  Ecosistema de Plataformas Digitales
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/ingresar"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Lock size={13} />
              <span>Login Rápido</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 2. BANNER INFORMATIVO: ARQUITECTURA MODULAR ─────────────── */}
      <div className="bg-gradient-to-r from-[#05162E] via-[#082041] to-[#05162E] border-b border-[#00A9A3]/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-semibold text-white">
              Arquitectura Independiente: 3 Aplicaciones Especializadas + 1 Panel de Dirección
            </span>
          </div>
          <span className="text-xs text-cyan-200/80">
            Cada módulo tiene su propio diseño, flujos y seguridad adaptados a su público objetivo.
          </span>
        </div>
      </div>

      {/* ─── 3. SELECTOR DE APPS (TABS VISUALES) ──────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 flex-1 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#00A9A3]/40 text-[#38DFD8] text-xs font-mono font-bold uppercase tracking-wider">
            <Layers size={13} />
            <span>DEMO INTERACTIVO NAVEGABLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Explora las Aplicaciones de NexoLegal
          </h1>
          <p className="text-sm sm:text-base text-cyan-100/70 font-light max-w-2xl mx-auto">
            Selecciona una de las aplicaciones para conocer sus funciones y acceder directamente a su entorno de prueba.
          </p>
        </div>

        {/* Rejilla de Selección de Apps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {appDemos.map((demo) => {
            const isSelected = activePreview === demo.id;
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => setActivePreview(demo.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-4 group cursor-pointer ${
                  isSelected
                    ? "bg-white/10 border-[#00A9A3] shadow-xl shadow-[#00A9A3]/15 ring-2 ring-[#00A9A3]/50 scale-[1.02]"
                    : "bg-[#05162E]/70 border-white/10 hover:border-white/25 hover:bg-[#05162E]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isSelected
                          ? "bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white shadow-md"
                          : "bg-white/10 text-cyan-200"
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${demo.badgeColor}`}
                    >
                      {demo.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-white group-hover:text-[#38DFD8] transition-colors leading-snug">
                    {demo.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-cyan-200/70">
                  <span>{isSelected ? "Seleccionada" : "Ver detalles"}</span>
                  <ChevronRight size={14} className={isSelected ? "text-[#00A9A3]" : ""} />
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── 4. VISTA DETALLADA DEL DEMO SELECCIONADO ──────────────────── */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#05162E] via-[#05162E] to-[#05162E] border-2 border-[#00A9A3]/40 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
            <div className="space-y-2 max-w-2xl">
              <span
                className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentApp.badgeColor}`}
              >
                {currentApp.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                {currentApp.title}
              </h2>
              <p className="text-sm text-cyan-100/80 leading-relaxed font-light">
                {currentApp.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                href={currentApp.path}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>{currentApp.cta}</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/ingresar"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all text-center"
              >
                Cambiar Rol en Login
              </Link>
            </div>
          </div>

          {/* Características Clave del Módulo */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38DFD8]">
              Módulos y Capacidades del Sistema:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentApp.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs sm:text-sm text-cyan-100/90"
                >
                  <CheckCircle2 size={16} className="text-[#00A9A3] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frame de Acceso Directo / Previsualización */}
          <div className="p-5 rounded-2xl bg-[#071311] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#05162E] text-[#38DFD8] flex items-center justify-center font-bold">
                <Sparkles size={16} />
              </div>
              <div>
                <strong className="block text-xs text-white">Ruta Canónica de la Aplicación:</strong>
                <code className="text-[11px] text-[#38DFD8] font-mono">{currentApp.path}</code>
              </div>
            </div>

            <Link
              href={currentApp.path}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#38DFD8] hover:text-white transition-colors"
            >
              <span>Abrir en pantalla completa</span>
              <ExternalLink size={13} />
            </Link>
          </div>
        </div>
      </main>

      {/* ─── 5. FOOTER COMPACTO ─────────────────────────────────────────── */}
      <footer className="border-t border-white/10 bg-[#050e0d] py-6 text-xs text-cyan-200/60 text-center">
        <p>© 2026 NexoLegal S.A.S. · Plataforma LegalTech Multi-Tenant · Ecuador</p>
      </footer>
      <AppExperienceNavigation />
    </div>
  );
}
