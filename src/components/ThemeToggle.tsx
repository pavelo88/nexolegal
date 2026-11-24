"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cambiar tema claro / oscuro"
        className={`w-9 h-9 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-slate-400 cursor-pointer ${className}`}
      >
        <span className="w-4 h-4 rounded-full bg-slate-400/20" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Claro" : "Modo Oscuro"}
      className={`relative w-9 h-9 rounded-xl border transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
        isDark
          ? "border-[#00A9A3]/40 bg-[#082041]/80 text-[#38DFD8] hover:bg-[#082041] hover:border-[#00A9A3] shadow-md shadow-[#00A9A3]/20"
          : "border-slate-300 bg-white text-[#082041] hover:bg-slate-50 hover:border-[#00A9A3] shadow-sm"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#38DFD8] transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-[#082041] transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
