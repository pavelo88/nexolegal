"use client";

import React from "react";
import { X, CheckCircle2, Download } from "lucide-react";

interface UserInvoiceModalProps {
  subscription: {
    plan: string;
    price: string;
    renewsOn: string;
    status: string;
    invoiceNumber: string;
    sriAuth: string;
  };
  onClose: () => void;
  onDownload: () => void;
}

export default function UserInvoiceModal({
  subscription,
  onClose,
  onDownload,
}: UserInvoiceModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl p-6 sm:p-7 space-y-5 text-white animate-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-[#1E293B] pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#38DFD8] font-bold">
              Comprobante Electrónico Válido para el SRI
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Factura N° {subscription.invoiceNumber}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar factura"
            className="p-1.5 rounded-xl bg-[#080D15] hover:bg-[#1E293B] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400">Emisor:</span>
            <strong className="text-white">NEXOLEGAL S.A.S.</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">RUC:</span>
            <span className="font-mono text-slate-200">1793208491001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Concepto:</span>
            <span className="text-slate-200">{subscription.plan}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#1E293B]">
            <span className="text-slate-400 font-bold">Total Facturado:</span>
            <strong className="text-white text-sm font-mono">{subscription.price}</strong>
          </div>
          <div className="pt-2">
            <span className="text-[10px] text-slate-500 font-mono block">Clave de Acceso SRI:</span>
            <span className="text-[9px] font-mono text-slate-400 break-all">{subscription.sriAuth}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onDownload}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-md shadow-blue-600/30"
          >
            <Download size={13} />
            <span>Descargar Factura PDF & XML</span>
          </button>
        </div>
      </div>
    </div>
  );
}
