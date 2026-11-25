"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Gavel,
  Clock,
  Filter,
  Sparkles,
  CheckCircle2,
  Shield,
  TrendingUp,
  Plus,
} from "lucide-react";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";

interface AdminDashboardTabProps {
  onNewCase: () => void;
}

export default function AdminDashboardTab({ onNewCase }: AdminDashboardTabProps) {
  const [dashboardFilter, setDashboardFilter] = useState("general");

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <DidacticHeaderBanner
        kicker="SISTEMA ACTIVO • SATJE SYNC • QUITO, ECUADOR"
        title="Panel de Control y Litigio Estratégico"
        subtitle="SUPERVISIÓN INTEGRAL DE CAUSAS JUDICIALES, AUDIENCIAS, CLIENTES CORPORATIVOS Y PROVIDENCIAS CON IA."
        filters={[
          { id: "general", label: "VISTA GENERAL" },
          { id: "urgencias", label: "URGENCIAS" },
          { id: "auditoria", label: "AUDITORÍA" },
        ]}
        activeFilter={dashboardFilter}
        onFilterChange={setDashboardFilter}
        actionButton={{
          label: "Nueva Causa",
          icon: Plus,
          onClick: onNewCase,
        }}
      />

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
              Causas Activas
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-extrabold text-white">43</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#38DFD8] font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8 este trimestre</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
              Audiencias Esta Semana
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Gavel className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-extrabold text-amber-300">5</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-amber-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Próxima: Jueves 29 Oct</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
              Leads CRM Landing
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Filter className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-extrabold text-white">12</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#38DFD8] font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>2 pendientes de triage</span>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-lg hover:border-[#00A9A3]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
              Términos Cumplidos
            </span>
            <div className="p-2 rounded-xl bg-[#00A9A3]/10 text-[#38DFD8] border border-[#00A9A3]/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-3xl font-extrabold text-[#38DFD8]">99.4%</p>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#38DFD8] font-medium">
              <Shield className="w-3.5 h-3.5" />
              <span>0 caducidades COGEP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
