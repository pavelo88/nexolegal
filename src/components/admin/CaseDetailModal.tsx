"use client";

import React from "react";
import { X } from "lucide-react";
import { DemoCase } from "@/data/platformDemo";

interface CaseDetailModalProps {
  caseData: DemoCase | null;
  onClose: () => void;
}

export default function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  if (!caseData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-[#1E293B] pb-4">
          <div className="space-y-1">
            <span className="font-mono font-bold text-xs text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
              {caseData.code}
            </span>
            <h3 className="font-bold text-base text-white mt-1">{caseData.title}</h3>
            <p className="text-xs text-slate-400">{caseData.area}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar detalle"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#080D15] border border-[#1E293B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs bg-[#080D15] p-4 rounded-2xl border border-[#1E293B]">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Cliente Patrocinado</span>
            <strong className="text-white">{caseData.client}</strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Abogado Litigante</span>
            <span className="text-slate-200">{caseData.assignedLawyer}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Fase Procesal</span>
            <span className="text-blue-300 font-semibold">{caseData.stage}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-400 block">Documentos Vinculados</span>
            <span className="text-slate-200 font-mono">{caseData.documentsCount} fojas / actas</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
