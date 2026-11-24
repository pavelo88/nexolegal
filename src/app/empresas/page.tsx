"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  FileCheck,
  ShieldCheck,
  Users,
  AlertTriangle,
  FolderKanban,
  FileText,
  Clock,
  Download,
  PlusCircle,
  ExternalLink,
  ChevronRight,
  LogOut,
  TrendingDown,
  Scale,
  Sparkles,
} from "lucide-react";
import AppExperienceNavigation, { DemoEnvironmentBadge } from "@/components/app/AppExperienceNavigation";

export default function EmpresasPortalPage() {
  const [activeTab, setActiveTab] = useState<"riesgos" | "contratos" | "laboral" | "usuarios">("riesgos");

  return (
    <div className="with-app-experience-dock min-h-screen bg-[#05162E] text-[#e1e8e6] flex flex-col font-sans">
      <DemoEnvironmentBadge />
      {/* Top Bar del Portal B2B */}
      <header className="sticky top-0 z-40 bg-[#08100f] border-b border-[#00A9A3]/30 px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                <Building2 size={18} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white">NexoLegal</span>
                <span className="block text-[9px] uppercase tracking-widest text-[#38DFD8] font-mono">
                  Portal Corporativo Multi-Tenant B2B
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10 text-xs">
              <span className="text-slate-400">Tenant:</span>
              <strong className="text-white">Corporación Favorita S.A.</strong>
              <span className="font-mono text-[10px] text-[#38DFD8] px-1.5 py-0.5 rounded bg-[#00A9A3]/20">
                Entorno empresarial
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-[#00A9A3] text-[#08100f] flex items-center justify-center text-[10px] font-bold">
                CF
              </div>
              <span className="font-semibold hidden sm:inline">Gerencia Legal Corporativa</span>
            </div>
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Cerrar sesión corporativa"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-Header de Navegación B2B */}
      <div className="bg-[#121f1d] border-b border-white/10 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="grid grid-cols-4 gap-1 sm:gap-2">
            {[
              { id: "riesgos", shortLabel: "Riesgos", label: "Matriz de Riesgos & Litigios", icon: ShieldCheck },
              { id: "contratos", shortLabel: "Contratos (142)", label: "Contratos Comerciales (142)", icon: FileCheck },
              { id: "laboral", shortLabel: "Laboral (9)", label: "Causas Laborales (9)", icon: FolderKanban },
              { id: "usuarios", shortLabel: "Equipo (12)", label: "Sub-Usuarios (12)", icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-all active:scale-95 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center cursor-pointer ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="text-[10px] sm:text-xs leading-tight truncate">
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* KPI Cards de Empresa */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0B1D3A] border border-[#00A9A3]/30">
            <span className="text-[10px] font-mono uppercase text-slate-400">Contingencia Procesal</span>
            <p className="text-2xl font-black text-white mt-1">$42,300</p>
            <p className="text-[11px] text-[#38DFD8] mt-0.5">-34% riesgo mitigado</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1D3A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-slate-400">Juicios Laborales</span>
            <p className="text-2xl font-black text-white mt-1">9 Causas</p>
            <p className="text-[11px] text-[#38DFD8] mt-0.5">8 en mediación previa</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1D3A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-slate-400">Contratos Auditados</span>
            <p className="text-2xl font-black text-white mt-1">142</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Cláusulas arbitrales CCQ</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B1D3A] border border-white/10">
            <span className="text-[10px] font-mono uppercase text-slate-400">Superintendencia Cías.</span>
            <p className="text-2xl font-black text-[#38DFD8] mt-1">100% Al Día</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Gobierno corporativo 2026</p>
          </div>
        </div>

        {/* Tab 1: Matriz de Riesgos y Litigios */}
        {activeTab === "riesgos" && (
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#0B1D3A] border border-white/10 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FolderKanban size={18} className="text-[#38DFD8]" />
                <span>Litigios Corporativos en Curso</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  {
                    num: "#17203-2026-03191",
                    matter: "Sumario Laboral (Ex-colaborador Quitumbe)",
                    court: "Unidad Judicial de Trabajo de Pichincha",
                    risk: "Bajo",
                    stage: "En Término de Prueba",
                  },
                  {
                    num: "#09201-2026-00412",
                    matter: "Cobro Ejecutivo de Facturas Comerciales Proveedor",
                    court: "Unidad Judicial Civil de Guayaquil",
                    risk: "Medio",
                    stage: "Mandamiento de Ejecución",
                  },
                  {
                    num: "#17811-2025-09823",
                    matter: "Contencioso Tributario Impugnación Glosa Municipal",
                    court: "Tribunal Distrital de lo Contencioso Administrativo de Quito",
                    risk: "Bajo",
                    stage: "Autos para Sentencia",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#05162E] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#00A9A3]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-emerald-300">{item.num}</strong>
                        <span className="text-slate-400">·</span>
                        <span className="text-white font-bold">{item.matter}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{item.court}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-[#00A9A3]/20 text-emerald-300 font-bold text-[10px]">
                        {item.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Contratos */}
        {activeTab === "contratos" && (
          <div className="p-6 rounded-3xl bg-[#0B1D3A] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Repositorio de Contratos Mercantiles Blindados</h3>
            <p className="text-xs text-slate-400">
              Contratos comerciales con cláusulas arbitrales pactadas ante la Cámara de Comercio de Quito (CCQ) y Cámara de Comercio de Guayaquil (CCG).
            </p>
            <div className="p-4 rounded-2xl bg-[#05162E] border border-white/5 flex items-center justify-between text-xs">
              <div>
                <strong className="block text-white">Contrato Marco de Suministro y Distribución Nacional 2026.pdf</strong>
                <span className="text-[10px] text-slate-400">Auditado por NexoLegal · Cláusula penal y arbitral validada</span>
              </div>
              <button
                onClick={() => alert("Descargando contrato corporativo auditado")}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold"
              >
                Descargar
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Laboral */}
        {activeTab === "laboral" && (
          <div className="p-6 rounded-3xl bg-[#0B1D3A] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Defensa Laboral y Mediaciones Patronales</h3>
            <p className="text-xs text-slate-400">
              Actas de finiquito ante el Ministerio del Trabajo de Ecuador y mediaciones previas para evitar contingencias en corte.
            </p>
          </div>
        )}

        {/* Tab 4: Usuarios */}
        {activeTab === "usuarios" && (
          <div className="p-6 rounded-3xl bg-[#0B1D3A] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Gestión de Accesos Corporativos</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#05162E] border border-white/5 flex justify-between">
                <span>Dra. Pamela Córdova (Directora Legal Corporativa)</span>
                <span className="text-[#38DFD8] font-bold">Admin Tenant</span>
              </div>
              <div className="p-3 rounded-xl bg-[#05162E] border border-white/5 flex justify-between">
                <span>Ing. Andrés Rivadeneira (Gerente de Talento Humano)</span>
                <span className="text-slate-400">Acceso Laboral</span>
              </div>
            </div>
          </div>
        )}
      </main>
      <AppExperienceNavigation />
    </div>
  );
}
