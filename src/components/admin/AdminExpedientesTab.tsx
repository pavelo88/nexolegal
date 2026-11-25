"use client";

import React, { useState } from "react";
import { Eye, Plus } from "lucide-react";
import { DemoCase } from "@/data/platformDemo";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminExpedientesTabProps {
  cases: DemoCase[];
  onSelectCase: (c: DemoCase) => void;
}

export default function AdminExpedientesTab({
  cases,
  onSelectCase,
}: AdminExpedientesTabProps) {
  const [caseFilterStatus, setCaseFilterStatus] = useState("todos");

  const filtered = cases.filter((c) => {
    if (caseFilterStatus === "todos") return true;
    if (caseFilterStatus === "en_tramite") return c.status === "En trámite";
    if (caseFilterStatus === "audiencia") return c.status === "Audiencia programada";
    if (caseFilterStatus === "sentencia") return c.status === "Para sentencia";
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="GESTIÓN INTEGRAL • MÓDULO DE EXPEDIENTES"
        title="Expedientes Judiciales y Causas Activas"
        subtitle="CONTROL DE JUICIOS ORDINARIOS, ACCIONES CONSTITUCIONALES, CONTROVERSIAS LABORALES Y TÉRMINOS PROCESALES."
        filters={[
          { id: "todos", label: "TODOS" },
          { id: "en_tramite", label: "EN TRÁMITE" },
          { id: "audiencia", label: "AUDIENCIAS" },
          { id: "sentencia", label: "SENTENCIA" },
        ]}
        activeFilter={caseFilterStatus}
        onFilterChange={setCaseFilterStatus}
      />

      {/* Cases List Cards */}
      <div className="rounded-3xl bg-[#0D141F] border border-[#1E293B] overflow-hidden shadow-2xl divide-y divide-[#1E293B]">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-5 hover:bg-[#131C2B] transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
                  {c.code}
                </span>
                <h3 className="font-bold text-sm text-white tracking-wide">{c.title}</h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium text-slate-300 bg-[#1A263A] px-2 py-0.5 rounded-md">
                  {c.area}
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    c.status === "Audiencia programada"
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      : c.status === "Para sentencia"
                      ? "bg-[#00A9A3]/15 text-[#38DFD8] border-[#00A9A3]/30"
                      : "bg-blue-500/15 text-blue-300 border-blue-500/30"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs text-slate-400">
                <div>
                  <span className="text-[10px] uppercase font-mono block text-slate-500">Cliente</span>
                  <strong className="text-slate-200">{c.client}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono block text-slate-500">Abogado Asignado</span>
                  <span className="text-slate-300">{c.assignedLawyer}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono block text-slate-500">Próximo Hito / Evento</span>
                  <span className="text-amber-400 font-semibold">{c.nextEventDate || "Sin fecha fija"}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 bg-[#080D15] p-2 rounded-xl border border-[#1E293B]">
                📌 <span className="font-medium text-slate-300">{c.nextEventDescription}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
              <button
                type="button"
                onClick={() => onSelectCase(c)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Ver Expediente</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
