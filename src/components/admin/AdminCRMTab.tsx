"use client";

import React, { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { DemoLead } from "@/data/platformDemo";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminCRMTabProps {
  leads: DemoLead[];
  onUpdateStatus: (id: string, newStatus: DemoLead["status"]) => void;
}

export default function AdminCRMTab({ leads, onUpdateStatus }: AdminCRMTabProps) {
  const [leadFilter, setLeadFilter] = useState("todos");

  const filtered = leads.filter((l) => {
    if (leadFilter === "todos") return true;
    return l.status === leadFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="PIPELINE COMERCIAL • CRM DE PROSPECTOS"
        title="Solicitudes de Asesoría Legal del Landing"
        subtitle="CAPTACIÓN OMNICANAL, CITAS AGENDADAS Y TRIAGE JURÍDICO AUTOMATIZADO."
        filters={[
          { id: "todos", label: "TODOS" },
          { id: "Nuevo", label: "NUEVO" },
          { id: "Contactado", label: "CONTACTADO" },
          { id: "Consulta Agendada", label: "CONSULTA AGENDADA" },
          { id: "Contratado", label: "CONTRATADO" },
        ]}
        activeFilter={leadFilter}
        onFilterChange={setLeadFilter}
      />

      <div className="rounded-3xl bg-[#0D141F] border border-[#1E293B] overflow-hidden shadow-2xl divide-y divide-[#1E293B]">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            className="p-5 hover:bg-[#131C2B] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-sm text-white">{lead.name}</span>
                <span className="text-[11px] font-medium text-slate-300 bg-[#1A263A] px-2 py-0.5 rounded-md">
                  {lead.area}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  {lead.urgency}
                </span>
                {lead.source && (
                  <span className="text-[10px] font-mono text-slate-400">Canal: {lead.source}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-blue-400" /> {lead.phone}
                </span>
                <span>{lead.email}</span>
                <span className="text-slate-500 font-mono">Ingreso: {lead.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={lead.status}
                onChange={(e) => onUpdateStatus(lead.id, e.target.value as DemoLead["status"])}
                className="px-3 py-2 rounded-xl bg-[#080D15] border border-[#1E293B] text-xs font-semibold text-white focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Contactado">Contactado</option>
                <option value="Consulta Agendada">Consulta Agendada</option>
                <option value="Contratado">Contratado</option>
              </select>

              <a
                href="https://wa.me/593997224453"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#00A9A3] hover:bg-[#008f8a] text-[#070C14] font-bold text-xs transition-all flex items-center gap-1.5 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => onUpdateStatus(lead.id, "Contratado")}
                className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 cursor-pointer"
              >
                Aprobar Cliente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
