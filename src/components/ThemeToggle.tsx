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

  const isDark = mounted 
    ? theme === "dark" 
    : (typeof document !== "undefined" && document.documentElement.classList.contains("dark"));

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo Claro" : "Modo Oscuro"}
      className={`relative w-9 h-9 rounded-xl border transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
        isDark
          ? "border-[#00A9A3]/50 bg-[#082041]/90 text-cyan-300 hover:border-cyan-400 shadow-sm"
          : "border-slate-300 bg-white text-slate-800 hover:border-[#00A9A3] shadow-sm"
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-cyan-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-slate-800 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
