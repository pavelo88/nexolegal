"use client";

import React, { useState } from "react";
import { Building2, Users, Phone, MessageCircle, Plus } from "lucide-react";
import { B2BClient } from "./types";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminClientesTabProps {
  clients: B2BClient[];
}

export default function AdminClientesTab({ clients }: AdminClientesTabProps) {
  const [clientFilter, setClientFilter] = useState("todos");

  const filtered = clients.filter((cl) => {
    if (clientFilter === "todos") return true;
    if (clientFilter === "empresas") return cl.type === "Empresa B2B";
    if (clientFilter === "personas") return cl.type === "Persona Natural";
    if (clientFilter === "al_dia") return cl.status === "Al día";
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="CARTERA DE CLIENTES • CONTRATOS & RETAINERS"
        title="Empresas con Retainer y Clientes Particulares"
        subtitle="SEGUIMIENTO DE CUENTAS CORPORATIVAS, CLIENTES INDIVIDUALES Y ESTADO DE FACTURACIÓN."
        filters={[
          { id: "todos", label: "TODOS" },
          { id: "empresas", label: "EMPRESAS B2B" },
          { id: "personas", label: "PERSONAS NATURALES" },
          { id: "al_dia", label: "AL DÍA" },
        ]}
        activeFilter={clientFilter}
        onFilterChange={setClientFilter}
        actionButton={{
          label: "Nuevo Cliente Corporativo",
          icon: Plus,
          onClick: () => alert("Formulario de alta de cliente corporativo con RUC y validación SRI."),
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((cl) => (
          <div
            key={cl.id}
            className="p-5 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl hover:border-blue-500/40 transition-all space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600/20 to-[#00A9A3]/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  {cl.type === "Empresa B2B" ? <Building2 className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{cl.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400">RUC/CI: {cl.ruc}</span>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  cl.status === "Al día"
                    ? "bg-[#00A9A3]/15 text-[#38DFD8] border border-[#00A9A3]/30"
                    : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                }`}
              >
                {cl.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-[#080D15] p-3 rounded-2xl border border-[#1E293B]">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Plan / Retainer</span>
                <strong className="text-white">{cl.plan}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Causas Activas</span>
                <span className="text-blue-400 font-bold">{cl.activeCases} causas en litigio</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-[#1E293B]">
                <span className="text-[10px] uppercase font-mono text-slate-500 block">Abogado Responsable</span>
                <span className="text-slate-300 font-medium">{cl.assignedLawyer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-400" /> +593 99 722 4453
              </span>
              <a
                href="https://wa.me/593997224453"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-[#00A9A3] hover:bg-[#008f8a] text-[#070C14] font-bold text-[11px] transition-all flex items-center gap-1 active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
