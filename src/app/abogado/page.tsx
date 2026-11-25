"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  Briefcase,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  Gavel,
  BookOpen,
  Send,
  Scale,
  CheckCircle2,
} from "lucide-react";
import PortalAppShell, { PortalNavItem } from "@/components/app/PortalAppShell";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface LawyerCase {
  id: string;
  number: string;
  client: string;
  court: string;
  matter: "Penal" | "Civil" | "Laboral" | "Constitucional";
  termFatal: string;
  termHours: number;
  lastAction: string;
}

const lawyerCases: LawyerCase[] = [
  {
    id: "lc-01",
    number: "17203-2026-03191",
    client: "Ing. Esteban Morales (Morales Construcciones)",
    court: "Unidad Judicial de Trabajo de Pichincha",
    matter: "Laboral",
    termFatal: "Contestación a la Demanda (Art. 578 CT)",
    termHours: 18,
    lastAction: "Notificación de auto de calificación el 23 Oct",
  },
  {
    id: "lc-02",
    number: "17203-2026-00481",
    client: "Sra. Carmen Salazar",
    court: "Unidad Judicial Civil de Quitumbe",
    matter: "Civil",
    termFatal: "Audiencia Preliminar de Conciliación",
    termHours: 72,
    lastAction: "Anuncio de perito topográfico ingresado",
  },
  {
    id: "lc-03",
    number: "09281-2026-00142",
    client: "Farmacias del Sol Cía. Ltda.",
    court: "Tribunal Contencioso Tributario de Guayaquil",
    matter: "Constitucional",
    termFatal: "Recurso de Casación ante la CNJ",
    termHours: 120,
    lastAction: "Sentencia de mayoría notificada",
  },
];

type AbogadoTab = "terminos" | "expedientes" | "audiencias" | "minutas";

export default function AbogadoDespachoPage() {
  const [activeTab, setActiveTab] = useState<AbogadoTab>("terminos");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("todos");

  const navItems: PortalNavItem[] = [
    {
      id: "terminos",
      label: "Control de Términos COGEP",
      icon: AlertTriangle,
      badge: lawyerCases.length.toString(),
      badgeColor: "rose",
    },
    { id: "expedientes", label: "Causas Asignadas & Litigios", icon: Briefcase, badge: "3", badgeColor: "blue" },
    { id: "audiencias", label: "Agenda de Audiencias", icon: Calendar, badge: "1", badgeColor: "amber" },
    { id: "minutas", label: "Redactor de Minutas & IA", icon: Sparkles },
  ];

  const filteredCases = lawyerCases.filter((c) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      c.number.includes(searchTerm) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.matter.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterMode === "todos"
        ? true
        : filterMode === "24h"
        ? c.termHours <= 24
        : filterMode === "72h"
        ? c.termHours <= 72
        : filterMode === "laboral"
        ? c.matter === "Laboral"
        : filterMode === "civil"
        ? c.matter === "Civil"
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <PortalAppShell
      portalTitle="NexoLegal Abogado"
      portalBadge="LETRADO"
      userName="Abg. Diego Alarcón V."
      userRole="Letrado Patrocinador & Especialista"
      userAvatar="DA"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as AbogadoTab)}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Buscar por número de juicio o cliente..."
    >
      {/* ─── TAB 1: TÉRMINOS COGEP ───────────────────────────────────── */}
      {activeTab === "terminos" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="SISTEMA PROCESAL • CONTROL DE CADUCIDADES"
            title="Control de Plazos y Términos Judiciales (Ecuador)"
            subtitle="VIGILANCIA DE TÉRMINOS PERENTORIOS ART. 73 COGEP Y ACTOS PROCESALES EN UNIDADES JUDICIALES."
            filters={[
              { id: "todos", label: "TODOS" },
              { id: "24h", label: "MENOR A 24H" },
              { id: "72h", label: "MENOR A 72H" },
              { id: "laboral", label: "LABORAL" },
              { id: "civil", label: "CIVIL" },
            ]}
            activeFilter={filterMode}
            onFilterChange={setFilterMode}
          />

          {/* Banner de Término Fatal Crítico */}
          <div className="p-5 sm:p-6 rounded-3xl bg-rose-950/30 border border-rose-500/40 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-rose-500/30 text-rose-300 border border-rose-500/40">
                    Término Fatal Menor a 24 Horas
                  </span>
                  <span className="text-xs text-rose-300 font-mono">Art. 73 COGEP</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                  Juicio 17203-2026-03191 · Contestación a la Demanda Laboral
                </h2>
                <p className="text-xs text-slate-300">
                  Cliente: Ing. Esteban Morales · Unidad Judicial de Trabajo de Pichincha
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("minutas")}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shrink-0 shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              Abrir Minuta de Contestación
            </button>
          </div>

          {/* Lista de Causas con Término */}
          <div className="space-y-3">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] hover:border-blue-500/40 transition-all space-y-3 shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/30">
                      {c.matter}
                    </span>
                    <strong className="text-sm font-mono text-white">{c.number}</strong>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                      c.termHours <= 24
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : c.termHours <= 72
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/30"
                    }`}
                  >
                    Quedan {c.termHours} horas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Cliente / Patrocinado:</span>
                    <strong className="text-white block mt-0.5">{c.client}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Órgano Jurisdiccional:</span>
                    <span className="text-slate-200 block mt-0.5">{c.court}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Acto Procesal Requerido:</span>
                    <span className="text-blue-400 font-semibold block mt-0.5">{c.termFatal}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1E293B] text-[11px] text-slate-400">
                  <span>Última Actuación: {c.lastAction}</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab("expedientes")}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Abrir Expediente</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 2: CAUSAS ASIGNADAS ─────────────────────────────────── */}
      {activeTab === "expedientes" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="EXPEDIENTES ACTIVOS • CUERPO LITIGANTE"
            title="Causas Asignadas y Litigios en Sustanciación"
            subtitle="SEGUIMIENTO DE ACTUACIONES, CITACIONES, PRUEBAS Y ESCRITOS JUDICIALES."
            filters={[
              { id: "todas", label: "TODAS" },
              { id: "tramite", label: "EN TRÁMITE" },
              { id: "audiencia", label: "AUDIENCIA" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lawyerCases.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-3xl bg-[#0D141F] border border-[#1E293B] space-y-3 shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-400">{c.number}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    {c.matter}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">{c.termFatal}</h4>
                <p className="text-xs text-slate-400">{c.court}</p>
                <div className="pt-2 border-t border-[#1E293B] flex items-center justify-between text-xs text-slate-300">
                  <span>Cliente: {c.client.split("(")[0]}</span>
                  <span className="text-amber-400 font-mono">Término: {c.termHours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 3: AGENDA AUDIENCIAS ────────────────────────────────── */}
      {activeTab === "audiencias" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="AGENDA PROCESAL • CONVOCATORIAS JUDICIALES"
            title="Audiencias Telemáticas y Presenciales"
            subtitle="CITACIONES DE SALAS CIVILES, TRIBUNALES LABORALES Y CORTE PROVINCIAL."
            filters={[
              { id: "semana", label: "ESTA SEMANA" },
              { id: "mes", label: "PRÓXIMO MES" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                <Gavel size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  Audiencia Convocada · Zoom SATJE
                </span>
                <h4 className="font-bold text-white text-sm">
                  Juicio 17203-2026-00481 · Prescripción Adquisitiva de Dominio
                </h4>
                <p className="text-xs text-slate-400">Jueves 29 de Octubre 2026 · 09:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 4: REDACTOR DE MINUTAS & IA ─────────────────────────── */}
      {activeTab === "minutas" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="REDACCIÓN INTELIGENTE • ASISTENTE JURÍDICO IA"
            title="Redactor de Minutas, Contestaciones y Demandas"
            subtitle="GENERACIÓN DE BORRADORES CON JURISPRUDENCIA NACIONAL Y FUNDAMENTOS DE DERECHO."
            filters={[
              { id: "contestacion", label: "CONTESTACIÓN" },
              { id: "demanda", label: "DEMANDA" },
              { id: "alegatos", label: "ALEGATOS" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs text-[#38DFD8] font-bold">
              <Sparkles size={16} />
              <span>Plantilla Activa: Contestación a la Demanda Laboral (Art. 578 CT)</span>
            </div>
            <textarea
              rows={8}
              defaultValue={`SEÑOR JUEZ DE LA UNIDAD JUDICIAL DE TRABAJO CON SEDE EN EL DISTRITO METROPOLITANO DE QUITO, PROVINCIA DE PICHINCHA.\n\nAbg. Diego Alarcón Vintimilla, por los derechos que represento del Ing. Esteban Morales, dentro del juicio laboral No. 17203-2026-03191, comparezco respetuosamente y contesto la infundada demanda en los siguientes términos...`}
              className="w-full p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => alert("Borrador guardado en expediente.")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Guardar Borrador en SATJE
              </button>
            </div>
          </div>
        </div>
      )}
    </PortalAppShell>
  );
}
