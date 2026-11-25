"use client";

import React, { useState } from "react";
import { Shield } from "lucide-react";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

export default function AdminConfigTab() {
  const [configFilter, setConfigFilter] = useState("general");

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
      <DidacticHeaderBanner
        kicker="ADMINISTRACIÓN DEL SISTEMA • PARÁMETROS"
        title="Configuración Institucional y Parámetros Globales"
        subtitle="GESTIÓN DE ROLES, INTEGRACIONES JUDICIALES SATJE Y SEGURIDAD ZERO-TRUST."
        filters={[
          { id: "general", label: "GENERAL" },
          { id: "roles", label: "ROLES & ACCESOS" },
          { id: "satje", label: "API SATJE" },
          { id: "seguridad", label: "SEGURIDAD" },
        ]}
        activeFilter={configFilter}
        onFilterChange={setConfigFilter}
      />

      <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl space-y-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" /> Parámetros del Casillero Judicial
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 text-[11px] font-semibold mb-1">
              Casillero Judicial Electrónico (SATJE)
            </label>
            <input
              type="text"
              defaultValue="09-1723-CJ-QUITO"
              className="w-full px-3.5 py-2 rounded-xl bg-[#080D15] border border-[#1E293B] text-white focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-[11px] font-semibold mb-1">
              Teléfono Oficial de la Firma
            </label>
            <input
              type="text"
              defaultValue="+593 99 722 4453"
              className="w-full px-3.5 py-2 rounded-xl bg-[#080D15] border border-[#1E293B] text-white focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div>
              <p className="font-bold text-white text-xs">Sincronización Automática con SATJE</p>
              <p className="text-[10px] text-slate-400">Consultar nuevas providencias cada 30 minutos</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/30">
              ACTIVA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
