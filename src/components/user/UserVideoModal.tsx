"use client";

import React from "react";
import { X, Play } from "lucide-react";

interface UserVideoModalProps {
  video: { title: string; duration: string } | null;
  onClose: () => void;
}

export default function UserVideoModal({ video, onClose }: UserVideoModalProps) {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-2xl rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl p-6 space-y-4 text-white animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#1E293B] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono text-blue-400 font-bold">
              Academia Jurídica NexoLegal
            </span>
            <h3 className="text-base font-bold text-white">{video.title}</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar video"
            className="p-1.5 rounded-xl bg-[#080D15] hover:bg-[#1E293B] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="aspect-video w-full rounded-2xl bg-[#080D15] border border-[#1E293B] flex flex-col items-center justify-center text-slate-400 p-6 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center shadow-lg">
            <Play size={24} className="ml-0.5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Reproduciendo Clase Jurídica Preventiva</p>
            <p className="text-xs text-slate-400">Duración estimada: {video.duration}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#080D15] hover:bg-[#1E293B] text-slate-300 font-semibold text-xs border border-[#1E293B] cursor-pointer"
          >
            Cerrar Reproductor
          </button>
        </div>
      </div>
    </div>
  );
}
