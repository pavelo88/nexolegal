"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  FileCheck,
  FolderKanban,
  Users,
  Download,
  PlusCircle,
  Building2,
  FolderOpen,
} from "lucide-react";
import PortalAppShell, { PortalNavItem } from "@/components/app/PortalAppShell";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

type EmpresasTab = "riesgos" | "contratos" | "laboral" | "usuarios";

export default function EmpresasPortalPage() {
  const [activeTab, setActiveTab] = useState<EmpresasTab>("riesgos");
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("todos");

  const navItems: PortalNavItem[] = [
    { id: "riesgos", label: "Matriz de Riesgos & Litigios", icon: ShieldCheck, badge: "3", badgeColor: "blue" },
    { id: "contratos", label: "Contratos Comerciales (142)", icon: FileCheck, badge: "142", badgeColor: "teal" },
    { id: "laboral", label: "Causas Laborales (9)", icon: FolderKanban, badge: "9", badgeColor: "amber" },
    { id: "usuarios", label: "Sub-Usuarios & Permisos (12)", icon: Users },
  ];

  const corporateLitigations = [
    {
      num: "#17203-2026-03191",
      matter: "Sumario Laboral (Ex-colaborador Quitumbe)",
      court: "Unidad Judicial de Trabajo de Pichincha",
      risk: "Bajo",
      stage: "En Término de Prueba",
      type: "laboral",
    },
    {
      num: "#09201-2026-00412",
      matter: "Cobro Ejecutivo de Facturas Comerciales Proveedor",
      court: "Unidad Judicial Civil de Guayaquil",
      risk: "Medio",
      stage: "Mandamiento de Ejecución",
      type: "ejecutivo",
    },
    {
      num: "#17811-2025-09823",
      matter: "Contencioso Tributario Impugnación Glosa Municipal",
      court: "Tribunal Distrital de lo Contencioso Administrativo de Quito",
      risk: "Bajo",
      stage: "Autos para Sentencia",
      type: "tributario",
    },
  ];

  const filteredLitigations = corporateLitigations.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.matter.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      riskFilter === "todos"
        ? true
        : riskFilter === "laboral"
        ? item.type === "laboral"
        : riskFilter === "ejecutivo"
        ? item.type === "ejecutivo"
        : riskFilter === "tributario"
        ? item.type === "tributario"
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <PortalAppShell
      portalTitle="NexoLegal B2B"
      portalBadge="B2B"
      userName="Corporación Favorita S.A."
      userRole="Tenant Corporativo · Gerencia Legal"
      userAvatar="CF"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as EmpresasTab)}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Buscar juicio corporativo, contrato o RUC..."
    >
      {/* ─── TAB 1: RIESGOS & LITIGIOS ─────────────────────────────────── */}
      {activeTab === "riesgos" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="BLINDAJE CORPORATIVO • MATRIZ DE RIESGOS"
            title="Litigios Corporativos y Cuantías Procesales"
            subtitle="MONITOREO DE CONTINGENCIAS JUDICIALES, ACCIONES DE PROTECCIÓN Y COBROS COACTIVOS."
            filters={[
              { id: "todos", label: "TODOS" },
              { id: "laboral", label: "SUMARIO LABORAL" },
              { id: "ejecutivo", label: "COBRO EJECUTIVO" },
              { id: "tributario", label: "TRIBUTARIO" },
            ]}
            activeFilter={riskFilter}
            onFilterChange={setRiskFilter}
          />

          {/* KPI Cards de Empresa */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg">
              <span className="text-[10px] font-mono uppercase text-slate-400">Contingencia Procesal</span>
              <p className="text-2xl font-black text-white mt-1">$42,300</p>
              <p className="text-[11px] text-[#38DFD8] mt-0.5">-34% riesgo mitigado</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg">
              <span className="text-[10px] font-mono uppercase text-slate-400">Juicios Laborales</span>
              <p className="text-2xl font-black text-white mt-1">9 Causas</p>
              <p className="text-[11px] text-[#38DFD8] mt-0.5">8 en mediación previa</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg">
              <span className="text-[10px] font-mono uppercase text-slate-400">Contratos Auditados</span>
              <p className="text-2xl font-black text-white mt-1">142</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Cláusulas arbitrales CCQ</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg">
              <span className="text-[10px] font-mono uppercase text-slate-400">Superintendencia Cías.</span>
              <p className="text-2xl font-black text-[#38DFD8] mt-1">100% Al Día</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Gobierno corporativo 2026</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FolderKanban size={18} className="text-[#38DFD8]" />
              <span>Litigios Corporativos en Curso</span>
            </h3>

            <div className="space-y-3 text-xs">
              {filteredLitigations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-[#38DFD8]">{item.num}</strong>
                      <span className="text-slate-500">·</span>
                      <span className="text-white font-bold">{item.matter}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{item.court}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#00A9A3]/15 text-[#38DFD8] border border-[#00A9A3]/30 font-bold text-[10px]">
                      {item.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: CONTRATOS COMERCIALES ────────────────────────────── */}
      {activeTab === "contratos" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="AUDITORÍA LEGAL • CÁMARA DE COMERCIO CCQ"
            title="Repositorio de Contratos Mercantiles Blindados"
            subtitle="CLÁUSULAS ARBITRALES, COMPLIANCE Y RESOLUCIÓN TEMPRANA DE DISPUTAS B2B."
            filters={[
              { id: "todos", label: "TODOS (142)" },
              { id: "suministro", label: "SUMINISTRO" },
              { id: "distribucion", label: "DISTRIBUCIÓN" },
              { id: "nda", label: "CONFIDENCIALIDAD" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Contratos Mercantiles Auditados</h3>
            <p className="text-xs text-slate-400">
              Contratos con cláusulas arbitrales pactadas ante la Cámara de Comercio de Quito (CCQ) y Cámara de Comercio de Guayaquil (CCG).
            </p>
            <div className="p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] flex items-center justify-between text-xs">
              <div>
                <strong className="block text-white">Contrato Marco de Suministro y Distribución Nacional 2026.pdf</strong>
                <span className="text-[10px] text-slate-400">Auditado por NexoLegal · Cláusula penal y arbitral validada</span>
              </div>
              <button
                type="button"
                onClick={() => alert("Descargando contrato corporativo auditado.")}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 cursor-pointer"
              >
                Descargar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: CAUSAS LABORALES ─────────────────────────────────── */}
      {activeTab === "laboral" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="MINISTERIO DEL TRABAJO • PREVENCIÓN PATRONAL"
            title="Defensa Laboral y Mediaciones Patronales"
            subtitle="ACTAS DE FINIQUITO, VISTOS BUENOS Y GESTIÓN PREVENTIVA DE TALENTO HUMANO."
            filters={[
              { id: "mediacion", label: "EN MEDIACIÓN" },
              { id: "finiquitos", label: "FINIQUITOS" },
              { id: "tramite", label: "EN TRÁMITE" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Prevención de Controversias Laborales</h3>
            <p className="text-xs text-slate-400">
              Actas de finiquito ante el Ministerio del Trabajo de Ecuador y mediaciones previas para mitigar contingencias en corte.
            </p>
          </div>
        </div>
      )}

      {/* ─── TAB 4: SUB-USUARIOS & ACCESOS ───────────────────────────── */}
      {activeTab === "usuarios" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="GOBIERNO CORPORATIVO • CONTROL DE IDENTIDADES"
            title="Gestión de Accesos y Sub-Usuarios Corporativos"
            subtitle="POLÍTICAS DE SEGURIDAD ZERO-TRUST Y ASIGNACIÓN DE PERMISOS POR DEPARTAMENTO."
            filters={[
              { id: "todos", label: "TODOS (12)" },
              { id: "directores", label: "DIRECTORES" },
              { id: "rrhh", label: "RRHH" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Usuarios con Acceso Autorizado</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-[#080D15] border border-[#1E293B] flex justify-between items-center">
                <div>
                  <strong className="text-white block">Dra. Pamela Córdova</strong>
                  <span className="text-[10px] text-slate-400">Directora Legal Corporativa</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 font-bold text-[10px]">
                  Admin Tenant
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#080D15] border border-[#1E293B] flex justify-between items-center">
                <div>
                  <strong className="text-white block">Ing. Andrés Rivadeneira</strong>
                  <span className="text-[10px] text-slate-400">Gerente de Talento Humano</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#00A9A3]/20 text-[#38DFD8] font-bold text-[10px]">
                  Acceso Laboral
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalAppShell>
  );
}
