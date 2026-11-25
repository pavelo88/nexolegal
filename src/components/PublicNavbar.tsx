"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Scale,
  Gavel,
  Briefcase,
  Building2,
  Users2,
  ShieldCheck,
  Clock3,
  ChevronDown,
  Menu,
  X,
  Mail,
  Lock,
  BookOpen,
} from "lucide-react";
import PromoMarquee from "@/components/PromoMarquee";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import NexoLogo from "@/components/NexoLogo";

export default function PublicNavbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    if (isActive) {
      return `text-xs uppercase tracking-widest font-bold transition-colors duration-200 py-1.5 border-b-2 ${
        isDark || !scrolled
          ? "text-[#38DFD8] border-[#38DFD8]"
          : "text-[#00A9A3] border-[#00A9A3]"
      }`;
    }
    return `text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 ${
      isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
    }`;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[500] transition-all duration-300">
      <PromoMarquee scrolled={scrolled} />

      <header
        className={`transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-[#05162E]/95 backdrop-blur-xl border-b border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.4)] py-3 sm:py-3.5 px-3 sm:px-6 lg:px-8"
              : "bg-white/95 backdrop-blur-xl border-b border-[#e6e0d6] shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-3 sm:py-3.5 px-3 sm:px-6 lg:px-8"
            : "bg-transparent border-b border-transparent py-3.5 sm:py-4 px-3 sm:px-6 lg:px-8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center group">
            <NexoLogo size="md" variant={isDark ? "dark" : scrolled ? "light" : "dark"} showSubtitle={true} />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/#inicio" className={linkClass("/")}>
              Inicio
            </Link>
            <Link href="/nosotros" className={linkClass("/nosotros")}>
              Nosotros
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 cursor-pointer focus:outline-none ${
                  isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
                onClick={() => setServicesDropdown(!servicesDropdown)}
              >
                Servicios
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} />
              </button>

              {servicesDropdown && (
                <div
                  className={`absolute top-full left-0 w-64 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1 z-50 animate-fade-in ${
                    isDark
                      ? "bg-[#05162E]/98 backdrop-blur-xl border border-[#00A9A3]/30 text-white"
                      : scrolled
                      ? "bg-white border border-[#e6e0d6] text-[#17211f]"
                      : "bg-[#05162E]/95 backdrop-blur-xl border border-[#00A9A3]/30 text-white"
                  }`}
                >
                  <Link
                    href="/#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                      isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                    }`}
                  >
                    <Gavel className="w-4 h-4 text-[#00A9A3]" />
                    <span>Litigios &amp; Defensa Penal</span>
                  </Link>
                  <Link
                    href="/#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                      isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                    }`}
                  >
                    <Briefcase className="w-4 h-4 text-[#00A9A3]" />
                    <span>Mercantil &amp; Empresas</span>
                  </Link>
                  <Link
                    href="/#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                      isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                    }`}
                  >
                    <Scale className="w-4 h-4 text-[#00A9A3]" />
                    <span>Familia &amp; Sucesiones</span>
                  </Link>
                  <Link
                    href="/#servicios"
                    onClick={() => setServicesDropdown(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                      isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#00A9A3]" />
                    <span>Laboral &amp; Regulatorio</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" className={linkClass("/blog")}>
              Blog
            </Link>

            <Link
              href="/#metodo"
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 whitespace-nowrap ${
                isDark || !scrolled ? "text-white/80 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
              }`}
            >
              Método
            </Link>
            <Link
              href="/#contacto"
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 whitespace-nowrap ${
                isDark || !scrolled ? "text-white/80 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
              }`}
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            <Link
              href="/#contacto"
              className={`hidden md:flex px-4 py-2 rounded-xl border text-xs font-semibold transition-all active:scale-95 items-center gap-1.5 whitespace-nowrap ${
                isDark || !scrolled
                  ? "border-[#00A9A3]/60 text-white hover:bg-[#00A9A3]/20"
                  : "border-[#00A9A3] text-[#082041] hover:bg-[#00A9A3]/10"
              }`}
            >
              <Mail className={`w-3.5 h-3.5 ${isDark || !scrolled ? "text-[#38DFD8]" : "text-[#00A9A3]"}`} />
              <span>Consulta</span>
            </Link>

            <Link
              href="/ingresar"
              className="hidden sm:flex px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#0891b2] text-white text-xs font-bold shadow-md shadow-[#00A9A3]/25 hover:brightness-110 transition-all active:scale-95 items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span>Tu app</span>
            </Link>

            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#00A9A3] hover:text-[#38DFD8] active:scale-95 transition-all cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00A9A3]" /> : <Menu className="w-6 h-6 text-[#00A9A3]" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#05162E] border-b border-[#00A9A3]/40 px-5 py-5 flex flex-col gap-3.5 animate-fade-in shadow-2xl text-white mt-2 rounded-2xl">
            <nav className="flex flex-col gap-1 text-left">
              {[
                { href: "/#inicio", label: "Inicio", icon: Scale },
                { href: "/nosotros", label: "Nosotros & Socio Fundador", icon: Users2 },
                { href: "/#servicios", label: "Servicios Jurídicos", icon: Gavel },
                { href: "/blog", label: "Blog Jurídico Doctrinal", icon: BookOpen },
                { href: "/#metodo", label: "Método en 3 Pasos", icon: Clock3 },
                { href: "/#contacto", label: "Contacto & Sedes", icon: Mail },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white hover:text-[#38DFD8] hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Icon className="w-4 h-4 text-[#00A9A3]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}
