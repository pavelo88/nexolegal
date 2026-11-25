"use client";

import React from "react";
import { X, Calendar, User, FileText, CheckCircle2, Download } from "lucide-react";

export interface JudicialCase {
  id: string;
  type: string;
  title: string;
  court: string;
  lawyer: string;
  hearingDate?: string;
  status: "Audiencia Convocada" | "En Trámite" | "Dictamen Emitido";
  milestones: { date: string; title: string; desc: string; isLatest?: boolean }[];
  documents: { name: string; date: string; size: string }[];
}

interface UserCaseDetailModalProps {
  caseData: JudicialCase | null;
  onClose: () => void;
  onDownload: (docName: string) => void;
}

export default function UserCaseDetailModal({
  caseData,
  onClose,
  onDownload,
}: UserCaseDetailModalProps) {
  if (!caseData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl p-5 sm:p-7 space-y-6 text-white animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-[#1E293B] pb-4">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-lg border border-blue-500/20">
              Causa {caseData.id} · {caseData.type}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">{caseData.title}</h3>
            <p className="text-xs text-slate-400">{caseData.court}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar detalle de causa"
            className="p-1.5 rounded-xl bg-[#080D15] hover:bg-[#1E293B] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] text-xs">
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Abogado Patrocinador</span>
            <strong className="text-white flex items-center gap-1.5 mt-0.5">
              <User size={13} className="text-blue-400" />
              <span>{caseData.lawyer}</span>
            </strong>
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono text-slate-500 block">Próxima Audiencia</span>
            <span className="text-amber-400 font-bold flex items-center gap-1.5 mt-0.5">
              <Calendar size={13} />
              <span>{caseData.hearingDate || "Sin fecha fijada"}</span>
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Línea de Tiempo Procesal (SATJE)
          </h4>
          <div className="space-y-2.5">
            {caseData.milestones.map((m, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-[#080D15] border border-[#1E293B] flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <strong className="text-white">{m.title}</strong>
                    <span className="text-[10px] font-mono text-slate-400">{m.date}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Documentos y Actuaciones Oficiales
          </h4>
          <div className="space-y-2">
            {caseData.documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#080D15] border border-[#1E293B] flex items-center justify-between text-xs hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText size={15} className="text-blue-400 shrink-0" />
                  <span className="font-mono text-white truncate text-[11px]">{doc.name}</span>
                </div>
                <button
                  onClick={() => onDownload(doc.name)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] flex items-center gap-1 shrink-0 ml-2 active:scale-95 cursor-pointer"
                >
                  <Download size={12} />
                  <span>Descargar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
