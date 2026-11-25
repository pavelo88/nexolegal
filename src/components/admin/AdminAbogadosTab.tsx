"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Lawyer } from "./types";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminAbogadosTabProps {
  lawyers: Lawyer[];
}

export default function AdminAbogadosTab({ lawyers }: AdminAbogadosTabProps) {
  const [lawyerFilter, setLawyerFilter] = useState("todos");

  const filtered = lawyers.filter((law) => {
    if (lawyerFilter === "todos") return true;
    if (lawyerFilter === "socios") return law.role.includes("Socia") || law.role.includes("Socio");
    if (lawyerFilter === "litigantes") return law.role.includes("Litigante");
    if (lawyerFilter === "disponibles") return law.status === "Disponible";
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="EQUIPO PROCESAL • CUERPO LETRADO"
        title="Socios, Abogados Litigantes y Especialistas"
        subtitle="ASIGNACIÓN DE JUICIOS, CARGA PROCESAL, AUDIENCIAS Y RENDIMIENTO DE LITIGACIÓN."
        filters={[
          { id: "todos", label: "TODOS" },
          { id: "socios", label: "SOCIOS DIRECTORES" },
          { id: "litigantes", label: "LITIGANTES" },
          { id: "disponibles", label: "DISPONIBLES" },
        ]}
        activeFilter={lawyerFilter}
        onFilterChange={setLawyerFilter}
        actionButton={{
          label: "Registrar Abogado",
          icon: Plus,
          onClick: () => alert("Alta de letrado patrocinador con casillero judicial."),
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((law) => (
          <div
            key={law.id}
            className="p-5 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4 hover:border-blue-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#00A9A3] text-white font-black text-sm flex items-center justify-center shadow-lg shadow-blue-600/20">
                  {law.avatar}
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    law.status === "Disponible"
                      ? "bg-[#00A9A3]/15 text-[#38DFD8] border border-[#00A9A3]/30"
                      : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {law.status}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">{law.name}</h4>
                <p className="text-[11px] text-blue-400 font-semibold">{law.role}</p>
                <p className="text-[10px] text-slate-400 mt-1">{law.specialty}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1E293B] text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-[10px] uppercase font-mono text-slate-500">Causas en curso:</span>
                <strong className="text-white font-mono">{law.activeCasesCount}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-[10px] uppercase font-mono text-slate-500">Audiencias mes:</span>
                <strong className="text-amber-400 font-mono">{law.courtHearingsMonth}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-[10px] uppercase font-mono text-slate-500">Calificación:</span>
                <strong className="text-[#38DFD8] font-mono">⭐ {law.rating} / 5.0</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
