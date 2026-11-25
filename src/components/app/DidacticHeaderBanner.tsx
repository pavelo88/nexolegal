"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface HeaderFilterOption {
  id: string;
  label: string;
}

interface DidacticHeaderBannerProps {
  kicker: string;
  title: string;
  subtitle: string;
  filters?: HeaderFilterOption[];
  activeFilter?: string;
  onFilterChange?: (filterId: string) => void;
  actionButton?: {
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
  };
}

export default function DidacticHeaderBanner({
  kicker,
  title,
  subtitle,
  filters,
  activeFilter,
  onFilterChange,
  actionButton,
}: DidacticHeaderBannerProps) {
  return (
    <div className="rounded-3xl bg-[#0D141F] border border-[#1E293B] p-5 sm:p-6 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all">
      <div className="space-y-1.5 min-w-0 flex-1">
        <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase block">
          {kicker}
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-[11px] sm:text-xs uppercase tracking-wide text-slate-400 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
        {filters && filters.length > 0 && (
          <div className="inline-flex items-center p-1 rounded-full bg-[#080D15]/90 border border-[#1E293B] shadow-inner overflow-x-auto max-w-full">
            {filters.map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onFilterChange?.(f.id)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all duration-150 whitespace-nowrap active:scale-95 cursor-pointer ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        )}

        {actionButton && (
          <button
            type="button"
            onClick={actionButton.onClick}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
          >
            {actionButton.icon && <actionButton.icon className="w-3.5 h-3.5" />}
            <span>{actionButton.label}</span>
          </button>
        )}
      </div>
    </div>
  );
}
