"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Briefcase,
  Calendar,
  AlertTriangle,
  Clock,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Gavel,
  BookOpen,
  Send,
  Sparkles,
  LogOut,
  UserCheck,
  FolderOpen,
} from "lucide-react";
import AppExperienceNavigation, { DemoEnvironmentBadge } from "@/components/app/AppExperienceNavigation";

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

export default function AbogadoDespachoPage() {
  const [activeTab, setActiveTab] = useState<"terminos" | "expedientes" | "audiencias" | "minutas">("terminos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCases = lawyerCases.filter(
    (c) =>
      c.number.includes(searchTerm) ||
      c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.matter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="with-app-experience-dock min-h-screen bg-[#111816] text-[#e4e8e6] flex flex-col font-sans">
      <DemoEnvironmentBadge />
      {/* Top Bar del Despacho de Abogados */}
      <header className="sticky top-0 z-40 bg-[#030E1F] border-b border-[#00A9A3]/30 px-4 sm:px-6 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#00A9A3] text-[#030E1F] flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform">
                <Gavel size={18} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white">NexoLegal</span>
                <span className="block text-[9px] uppercase tracking-widest text-[#00A9A3] font-mono">
                  Despacho Litigante · Letrado
                </span>
              </div>
            </Link>
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-white/10 text-xs">
              <span className="px-2 py-0.5 rounded bg-[#00A9A3]/20 text-[#38DFD8] font-mono text-[10px] font-bold">
                SATJE Quito En Vivo
              </span>
              <span className="text-slate-400 font-mono text-[11px]">Casillero Electrónico: 172910</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200">
              <div className="w-5 h-5 rounded-full bg-[#00A9A3] text-[#030E1F] flex items-center justify-center text-[10px] font-bold">
                DA
              </div>
              <span className="font-semibold hidden sm:inline">Abg. Diego Alarcón V.</span>
              <span className="text-[10px] font-mono font-bold text-[#00A9A3]">Letrado Patrocinador</span>
            </div>
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Salir del despacho"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Navegación por Módulos del Abogado */}
      <div className="bg-[#141f1c] border-b border-white/10 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto">
          <nav className="grid grid-cols-4 gap-1 sm:gap-2">
            {[
              { id: "terminos", shortLabel: `Términos (${lawyerCases.length})`, label: `Términos COGEP (${lawyerCases.length})`, icon: AlertTriangle },
              { id: "expedientes", shortLabel: "Causas", label: "Causas Asignadas", icon: Briefcase },
              { id: "audiencias", shortLabel: "Audiencias", label: "Agenda Audiencias", icon: Calendar },
              { id: "minutas", shortLabel: "Minutas", label: "Redactor de Minutas", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 sm:px-3 rounded-xl text-xs font-bold transition-all active:scale-95 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center cursor-pointer ${
                    isActive
                      ? "bg-[#00A9A3] text-[#030E1F] shadow-md shadow-[#00A9A3]/30 font-extrabold"
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

      {/* Contenido Principal del Despacho */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner de Término Fatal Crítico */}
        <div className="p-5 rounded-3xl bg-rose-950/40 border border-rose-500/40 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
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
            onClick={() => setActiveTab("minutas")}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shrink-0 shadow-lg active:scale-95 transition-all"
          >
            Abrir Minuta de Contestación
          </button>
        </div>

        {/* TAB 1: TÉRMINOS COGEP POR VENCER */}
        {activeTab === "terminos" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Clock size={18} className="text-[#00A9A3]" />
                <span>Control de Plazos y Términos Judiciales (Ecuador)</span>
              </h3>
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por juicio o cliente…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 outline-none focus:border-[#00A9A3]"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl bg-[#082041] border border-white/10 hover:border-[#00A9A3]/50 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00A9A3]/20 text-[#00A9A3]">
                        {c.matter}
                      </span>
                      <strong className="text-sm font-mono text-white">{c.number}</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                          c.termHours <= 24
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : c.termHours <= 72
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-[#00A9A3]/20 text-emerald-300 border border-[#00A9A3]/30"
                        }`}
                      >
                        Quedan {c.termHours} horas
                      </span>
                    </div>
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
                      <span className="text-[#00A9A3] font-semibold block mt-0.5">{c.termFatal}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/5">
                    <span>{c.lastAction}</span>
                    <button
                      onClick={() => alert(`Abriendo expediente judicial ${c.number}`)}
                      className="text-[#00A9A3] hover:text-[#d4b475] font-bold flex items-center gap-1"
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

        {/* TAB 2: CAUSAS ASIGNADAS */}
        {activeTab === "expedientes" && (
          <div className="p-6 rounded-3xl bg-[#082041] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Directorio de Causas del Letrado</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lawyerCases.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-[#00A9A3] font-bold">{c.number}</span>
                    <span className="text-slate-400">{c.matter}</span>
                  </div>
                  <strong className="block text-sm text-white">{c.client}</strong>
                  <p className="text-xs text-slate-300">{c.court}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: AUDIENCIAS ORALES */}
        {activeTab === "audiencias" && (
          <div className="p-6 rounded-3xl bg-[#082041] border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white">Rol de Audiencias Orales Convocadas</h3>
            <div className="p-5 rounded-2xl bg-[#030E1F] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#00A9A3] font-bold">29 Octubre 2026 · 09:30 AM</span>
                <h4 className="text-base font-bold text-white mt-1">
                  Audiencia Preliminar Ordinaria · Juicio 17203-2026-00481
                </h4>
                <p className="text-xs text-slate-400">Sala 302, Complejo Judicial Quitumbe, Quito</p>
              </div>
              <button
                onClick={() => alert("Cargando credenciales de acceso a la sala virtual del CJ")}
                className="px-4 py-2 rounded-xl bg-[#00A9A3] text-[#030E1F] font-bold text-xs"
              >
                Ingresar a Sala Virtual CJ
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: REDACTOR DE MINUTAS CON IA */}
        {activeTab === "minutas" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#082041] border border-[#00A9A3]/30 space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A9A3]/20 text-[#00A9A3] text-xs font-bold">
                <Sparkles size={14} />
                <span>Asistente de Redacción Procesal COGEP</span>
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                Borrador de Escritos y Alegatos de Litigio
              </h3>
              <p className="text-xs text-slate-400">
                Estructura fundamentada en jurisprudencia obligatoria de la Corte Nacional de Justicia y Corte Constitucional del Ecuador.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#030E1F] border border-white/10 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
{`SEÑOR JUEZ DE LA UNIDAD JUDICIAL DE TRABAJO DEL CANTÓN QUITO, PROVINCIA DE PICHINCHA.

JUICIO Nº: 17203-2026-03191
ACTOR: JUAN CARLOS PÉREZ GÓMEZ
DEMANDADO: ESTEBAN MORALES (MORALES CONSTRUCCIONES)

Abg. Diego Alarcón Vintimilla, con matrícula profesional Nº 17-2012-482 del Foro de Abogados de Pichincha, en calidad de procurador judicial de la parte demandada, dentro del término legal concedido en el Art. 578 del Código del Trabajo en concordancia con el Art. 151 del Código Orgánico General de Procesos (COGEP), comparezco y contesto la infundada demanda en los siguientes términos:

I. NEGACIÓN PURA Y SIMPLE DE LOS FUNDAMENTOS DE HECHO Y DERECHO...`}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => alert("Copiando minuta al portapapeles...")}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold"
              >
                Copiar Texto Completo
              </button>
              <button
                onClick={() => alert("Descargando minuta en formato .docx para Word...")}
                className="px-4 py-2 rounded-xl bg-[#00A9A3] hover:bg-[#d4b475] text-[#030E1F] text-xs font-bold"
              >
                Descargar Documento Word (.docx)
              </button>
            </div>
          </div>
        )}
      </main>
      <AppExperienceNavigation />
    </div>
  );
}
