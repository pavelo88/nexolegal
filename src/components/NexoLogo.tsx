import React from "react";
import Image from "next/image";

interface NexoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light" | "auto";
  showSubtitle?: boolean;
  badge?: string;
}

export default function NexoLogo({
  className = "",
  size = "md",
  variant = "auto",
  showSubtitle = true,
  badge,
}: NexoLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const titleSizes = {
    sm: "text-sm sm:text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl",
  };

  const isDark = variant === "dark";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`} id="nexolegal-brand-logo">
      {/* Official Nexo Icon */}
      <div
        className={`relative ${iconSizes[size]} rounded-2xl overflow-hidden border border-[#00A9A3]/50 shadow-md bg-[#05162E] flex items-center justify-center shrink-0 p-1 group-hover:border-[#00A9A3] transition-colors`}
      >
        <Image
          src="/favicon.svg"
          alt="NexoLegal"
          width={40}
          height={40}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight font-sans ${titleSizes[size]} ${
              isDark ? "text-white" : "text-[#082041] dark:text-white"
            }`}
          >
            NEXO
          </span>
          <span
            className={`font-bold tracking-wide font-sans ${titleSizes[size]} text-[#00A9A3]`}
          >
            LEGAL
          </span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 ml-1">
              {badge}
            </span>
          )}
        </div>
        {showSubtitle && (
          <span
            className={`text-[8px] sm:text-[9px] uppercase font-bold tracking-[0.12em] mt-1 ${
              isDark ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Asesoría Jurídica · Nexo Talento
          </span>
        )}
      </div>
    </div>
  );
}
