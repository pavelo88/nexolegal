"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Scale,
  Award,
  BookOpen,
  GraduationCap,
  Globe2,
  FileText,
  ShieldCheck,
  ChevronRight,
  Phone,
  Mail,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Users2,
  Gavel,
  Lock,
  Menu,
  X,
  Clock3,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import NosotrosOrbit from "@/components/NosotrosOrbit";
import Footer from "@/components/Footer";
import NexoLogo from "@/components/NexoLogo";

export default function NosotrosPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#17211f] font-sans selection:bg-[#00A9A3]/30 pb-0">
      {/* ─── 1. NAVBAR DE LA PÁGINA NOSOTROS ───────────────────────────── */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm py-3.5 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDark ? "bg-[#05162E]/95 border-slate-800 text-white" : "bg-white/95 border-[#e6e0d6] text-[#17211f]"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center group">
            <NexoLogo size="md" variant={isDark ? "dark" : "light"} showSubtitle={true} />
          </Link>

          <nav className={`hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold ${isDark ? "text-white/90" : "text-[#17211f]"}`}>
            <Link href="/" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-[#00A9A3] border-b-2 border-[#00A9A3] py-1">
              Nosotros
            </Link>
            <Link href="/#servicios" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Servicios
            </Link>
            <Link href="/blog" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Blog Jurídico
            </Link>
            <Link href="/#contacto" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/#contacto"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#00A9A3] text-xs font-semibold hover:bg-[#00A9A3]/10 active:scale-95 transition-all ${
                isDark ? "text-white" : "text-[#17211f]"
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#00A9A3]" />
              <span>Consulta</span>
            </Link>
            <Link
              href="/ingresar"
              className="hidden sm:flex px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold shadow-md shadow-[#00A9A3]/25 hover:brightness-110 active:scale-95 transition-all items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-white/90" />
              <span>Tu app</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#00A9A3] hover:text-[#38DFD8] active:scale-90 transition-all cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00A9A3]" /> : <Menu className="w-6 h-6 text-[#00A9A3]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu (Diseño Apple Luxury Ultra Legible) */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#05162E] backdrop-blur-3xl border-t border-[#00A9A3]/40 px-5 py-6 flex flex-col gap-4 animate-fade-in shadow-2xl text-white mt-3">
            <nav className="flex flex-col gap-1 text-left">
              {[
                { href: "/", label: "Inicio", icon: Scale },
                { href: "/nosotros", label: "Nosotros & Socio Fundador", icon: Users2 },
                { href: "/#servicios", label: "Servicios Jurídicos", icon: Gavel },
                { href: "/blog", label: "Blog Jurídico Doctrinal", icon: BookOpen },
                { href: "/#contacto", label: "Contacto & Sedes", icon: Mail },
                { href: "/privacidad", label: "Privacidad & LOPDP", icon: ShieldCheck },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/95 hover:text-[#38DFD8] hover:bg-white/10 active:scale-95 transition-all"
                  >
                    <Icon className="w-4 h-4 text-[#00A9A3]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Accesos a las 4 WebApps desde el celular */}
            <div className="p-4 rounded-2xl bg-white/5 border border-[#00A9A3]/30 space-y-2 text-left">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#38DFD8] block">
                Accesos a la Plataforma Web:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  href="/user"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Clientes</span>
                </Link>
                <Link
                  href="/empresas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Empresas</span>
                </Link>
                <Link
                  href="/abogado"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Letrados</span>
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Dirección</span>
                </Link>
              </div>
            </div>

            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg shadow-[#00A9A3]/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-white" />
              <span>Entrar al Ecosistema App Legal (4 Portales)</span>
            </Link>
          </div>
        )}
      </header>

      {/* ─── 2. HERO SECTION NOSOTROS (DESKTOP & CELULARES) ─────────────── */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#05162E] text-white">
        {/* Imagen del Hero Responsive (Desktop y Celulares - Sin zoom y nítida a la derecha) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Desktop Image */}
          <Image
            src="/nexolegal-firma.webp"
            alt="Junta directiva y letrados de NexoLegal en Quito"
            fill
            priority
            sizes="100vw"
            className="hidden sm:block object-cover object-center opacity-100 scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Mobile Image */}
          <Image
            src="/nexolegal-hero-mobile.webp"
            alt="Abogados de NexoLegal revisando expedientes en Quito"
            fill
            priority
            sizes="100vw"
            className="block sm:hidden object-cover object-center opacity-90 scale-100"
          />
          {/* Máscara Lateral de Legibilidad Inteligente: Sombra suave a la izquierda */}
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#070b12]/85 via-[#070b12]/50 30% via-[#070b12]/15 45% to-transparent 55% pointer-events-none" />
          {/* Máscara móvil vertical limpia */}
          <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#070b12]/85 via-[#070b12]/45 45% to-transparent 65% pointer-events-none" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00A9A3]/40 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
                Sobre NexoLegal · Quito, Ecuador
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08]">
              Defensa Legal con Rigor Estratégico y Vocación de Liderazgo
            </h1>

            <p className="text-base sm:text-lg text-cyan-100/90 leading-relaxed font-light">
              Encaminados a ser referente nacional en defensa legal corporativa y litigios de alto impacto. Un equipo interdisciplinario que une la excelencia procesal con la innovación tecnológica.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#fundador"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Conoce al Socio Fundador</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="#orbit"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all"
              >
                Misión &amp; Valores en Órbita
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. PERFIL DEL SOCIO FUNDADOR ───────────────────────────────── */}
      <section id="fundador" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-[#e6e0d6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
              LIDERAZGO ACADÉMICO &amp; PROCESAL
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#00A9A3] to-[#38DFD8] mx-auto rounded-full" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f]">
              Socio Fundador
            </h2>
            <p className="text-base text-[#55605a]">
              Conducción jurídica forjada en las aulas de mayor prestigio y probada en audiencias orales y estrados de la República del Ecuador.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Tarjeta Visual de Prestigio del Socio Fundador (5 cols) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#082041] via-[#082041] to-[#05162E] border-2 border-[#00A9A3]/50 shadow-2xl p-6 sm:p-8 text-white relative">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#00A9A3]/15 blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  {/* Retrato Oficial de Ab. José Aimacaña Mgtr. */}
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 rounded-3xl overflow-hidden border-2 border-[#00A9A3] shadow-2xl mb-2 group">
                    <Image
                      src="/abogado-jose-aimacana.webp"
                      alt="Ab. José Aimacaña Mgtr. - Socio Fundador de NexoLegal"
                      fill
                      sizes="(max-width: 640px) 144px, 176px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05162E]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#38DFD8] font-bold block mb-1">
                      DIRECCIÓN GENERAL · NexoLegal
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                      Ab. José Aimacaña Mgtr.
                    </h3>
                    <p className="text-xs text-cyan-200/80 mt-1">
                      Socio Fundador · Especialista en Litigación Penal &amp; Argumentación Jurídica
                    </p>
                  </div>

                  <div className="w-full pt-4 border-t border-white/10 text-xs space-y-2 text-left">
                    <div className="flex items-center gap-2 text-cyan-100/90">
                      <CheckCircle2 size={14} className="text-[#00A9A3] shrink-0" />
                      <span>Universidad Central del Ecuador (Alumni)</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-100/90">
                      <CheckCircle2 size={14} className="text-[#00A9A3] shrink-0" />
                      <span>Universidad de Alicante, España (Argumentación)</span>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-100/90">
                      <CheckCircle2 size={14} className="text-[#00A9A3] shrink-0" />
                      <span>Universidad Indoamérica (Litigación Oral)</span>
                    </div>
                  </div>

                  <a
                    href="https://wa.me/593997224453?text=Deseo%20solicitar%20una%20reunion%20con%20el%20Ab.%20Jose%20Aimacana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all text-center mt-2"
                  >
                    Agendar Sesión con el Socio Fundador
                  </a>
                </div>
              </div>
            </div>

            {/* Trayectoria, Formación Académica y Publicaciones (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Formación Académica */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 text-[#00A9A3]">
                  <GraduationCap size={22} />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17211f]">
                    Formación Académica de Cuarto Nivel
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#00A9A3] uppercase">Pregrado de Excelencia</span>
                    <strong className="block text-sm text-[#17211f]">Abogado de los Tribunales</strong>
                    <p className="text-[#6e7771]">Universidad Central del Ecuador (UCE)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#00A9A3] uppercase">Posgrado Magistral</span>
                    <strong className="block text-sm text-[#17211f]">Máster en Derecho Procesal Penal</strong>
                    <p className="text-[#6e7771]">Especialización en audiencia y dogmática punitiva</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#00A9A3] uppercase">Internacional · Europa</span>
                    <strong className="block text-sm text-[#17211f]">Maestrante en Argumentación Jurídica</strong>
                    <p className="text-[#6e7771]">Universidad de Alicante, España</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                    <span className="text-[10px] font-mono font-bold text-[#00A9A3] uppercase">Especialización Procesal</span>
                    <strong className="block text-sm text-[#17211f]">Maestrante en Litigación Oral</strong>
                    <p className="text-[#6e7771]">Universidad Indoamérica</p>
                  </div>
                </div>
              </div>

              {/* Experiencia Profesional & Conferencias */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-4">
                <div className="flex items-center gap-2.5 text-[#00A9A3]">
                  <Award size={22} />
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#17211f]">
                    Experiencia Profesional &amp; Docencia
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#55605a] leading-relaxed">
                  Capacitador en temas jurídicos y procesales para colegios de abogados, gremios empresariales y entidades públicas. Conferencista destacado en seminarios nacionales e internacionales sobre garantías procesales, recursos impugnatorios y litigación oral bajo el COGEP y COIP.
                </p>
              </div>

              {/* Publicaciones Destacadas */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#faf8f5] to-[#f4eee4] border border-[#00A9A3]/40 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#00A9A3] uppercase">
                  <BookOpen size={16} />
                  <span>Publicación Destacada</span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#17211f]">
                  “El doble conforme en Ecuador y una garantía procesal sin regulación expresa”
                </h4>
                <p className="text-xs text-[#55605a] leading-relaxed">
                  Estudio doctrinal y jurisprudencial sobre la garantía fundamental del recurso frente a sentencias condenatorias en el sistema penal ecuatoriano y su aplicación directa frente a vacíos normativos.
                </p>
                <div className="pt-2">
                  <Link
                    href="/blog/el-doble-conforme-en-ecuador-garantia-procesal"
                    className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#00A9A3] hover:text-[#00A9A3] transition-colors"
                  >
                    <span>Leer análisis en el Blog Jurídico</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. ESFERAS ORBITALES GIRATORIAS (MISIÓN, VISIÓN, VALORES) ─── */}
      <section id="orbit" className="py-20 sm:py-28 bg-[#ffffff] border-b border-[#e6e0d6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
              MISIÓN, VISIÓN Y VALORES
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#00A9A3] to-[#38DFD8] mx-auto rounded-full" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f]">
              La Órbita de NexoLegal
            </h2>
            <p className="text-base text-[#55605a]">
              Las esferas en rotación continua representan los principios inquebrantables que orientan cada estrategia y patrocinio procesal en el Ecuador.
            </p>
          </div>

          {/* Componente Orbital Super Cool */}
          <NosotrosOrbit />
        </div>
      </section>

      {/* ─── 5. DIFERENCIACIÓN Y PROMESA DE LA FIRMA ────────────────────── */}
      <section className="py-20 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#082041] text-white border border-[#00A9A3]/40 shadow-2xl text-center space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
              NUESTRA PROMESA DE VALOR
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold max-w-3xl mx-auto leading-tight text-white">
              “Construyendo relaciones fiables entre cliente y abogado a largo plazo, con servicio de excelencia y resultados satisfactorios.”
            </h2>
            <p className="text-xs sm:text-sm text-cyan-100/80 max-w-2xl mx-auto leading-relaxed">
              Combinamos la pericia jurídica con el uso transparente de nuestra plataforma digital, para que cada cliente conozca el estado exacto de su proceso en todo momento.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/#contacto"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 transition-all"
              >
                Solicitar Consulta con el Despacho
              </Link>
              <Link
                href="/ingresar"
                className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all"
              >
                Acceder a la Plataforma
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. FOOTER CORPORATIVO UNIFICADO ───────────────────────────── */}
      <Footer />
    </div>
  );
}
