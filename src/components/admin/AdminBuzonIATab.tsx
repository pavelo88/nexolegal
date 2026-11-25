"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { JudicialNotificationAI } from "@/data/platformDemo";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminBuzonIATabProps {
  providencia: JudicialNotificationAI;
}

export default function AdminBuzonIATab({ providencia }: AdminBuzonIATabProps) {
  const [buzonFilter, setBuzonFilter] = useState("todas");
  const [providenciaValidated, setProvidenciaValidated] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="AUTOMATIZACIÓN IA • CONEXIÓN JUDICIAL"
        title="Buzón de Providencias y Notificaciones SATJE"
        subtitle="EXTRACCIÓN INTELIGENTE DE ACTUACIONES JUDICIALES Y CÓMPUTO AUTOMÁTICO DE TÉRMINOS COGEP."
        filters={[
          { id: "todas", label: "TODAS" },
          { id: "urgentes", label: "URGENTES < 24H" },
          { id: "validadas", label: "VALIDADAS" },
          { id: "en_proceso", label: "EN PROCESO" },
        ]}
        activeFilter={buzonFilter}
        onFilterChange={setBuzonFilter}
        actionButton={{
          label: providenciaValidated ? "Validado por Abogado" : "Validar y Cargar al Expediente",
          icon: CheckCircle2,
          onClick: () => setProvidenciaValidated(!providenciaValidated),
        }}
      />

      <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400">{providencia.processNumber}</span>
            <h3 className="font-bold text-base text-white">{providencia.aiClassification}</h3>
            <p className="text-xs text-slate-400">{providencia.court}</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 self-start sm:self-auto">
            Término Detectado: {providencia.detectedDeadlineDays} días ({providencia.deadlineExpiration})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              📄 Síntesis Extraída por IA del Auto
            </span>
            <p className="text-slate-300 leading-relaxed">{providencia.aiSummary}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] space-y-2">
            <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
              💡 Estrategia Procesal Sugerida
            </span>
            <p className="text-slate-300 leading-relaxed">{providencia.suggestedAction}</p>
            <div className="pt-2 text-[11px] text-amber-300 font-mono">
              Base Legal: Art. 151 y 153 del COGEP (Ecuador)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
