"use client";

import { useState, useEffect, useRef } from "react";
import CopyrightYear from "@/components/CopyrightYear";
import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Gavel,
  Briefcase,
  Building2,
  Users2,
  ScrollText,
  ShieldCheck,
  Clock3,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  Sparkles,
  Send,
  Award,
  BookOpen,
  Landmark,
} from "lucide-react";
import LandingAssist from "@/components/LandingAssist";
import FirmOrbit from "@/components/site/FirmOrbit";
import AnimatedCounter from "@/components/AnimatedCounter";
import PromoMarquee from "@/components/PromoMarquee";
import MobileBottomNav from "@/components/MobileBottomNav";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import NexoLogo from "@/components/NexoLogo";
import { getAttribution, trackEvent } from "@/lib/analytics";

// ─── SLIDES DATA (GANCHOS DE ALTA CONVERSIÓN PUBLICITARIA NEXOLEGAL) ────────
const slides = [
  {
    tag: "DEFENSA JUDICIAL INMEDIATA · COBERTURA NACIONAL ECUADOR",
    title: "Defensa Jurídica & Litigios de Alto Impacto",
    subtitle:
      "Protección inmediata ante demandas, litigios judiciales y procesos fiscales en Ecuador. Diagnóstico estratégico en menos de 24 horas y seguimiento digital en tiempo real.",
    primaryCta: { text: "Solicitar Diagnóstico en 24h", href: "#contacto" },
    secondaryCta: { text: "Conocer Áreas de Litigio", href: "#servicios" },
    badge: "Respaldo Colegiado",
  },
  {
    tag: "DERECHO CORPORATIVO & COMPLIANCE EMPRESARIAL",
    title: "Blindaje Societario, Laboral & Tributario",
    subtitle:
      "Prevención de contingencias, contratos blindados, reestructuración y defensa laboral para empresas de la red Nexo Talento. Tarifa fija mensual transparente sin sorpresas.",
    primaryCta: { text: "Plan Retainer Empresas", href: "#contacto" },
    secondaryCta: { text: "Ver Servicios de Empresa", href: "#servicios" },
    badge: "Sin Costes Ocultos",
  },
  {
    tag: "DERECHO CIVIL, FAMILIA & PATRIMONIO",
    title: "Protección Familiar, Herencias & Sucesiones",
    subtitle:
      "Resolución pacífica de acuerdos familiares, división de bienes, testamentos y sucesiones con absoluta reserva ética, empatía y patrocinio letrado riguroso.",
    primaryCta: { text: "Consultar Caso Familiar", href: "#contacto" },
    secondaryCta: { text: "Guía de Sucesiones", href: "#servicios" },
    badge: "Secreto Profesional",
  },
];

// ─── SERVICIOS PRINCIPALES (HOASESOR GRID) ──────────────────────────────────
const services = [
  {
    icon: Gavel,
    category: "LITIGIOS & PENAL",
    title: "Litigios & Defensa Penal",
    desc: "Defensa técnica en sede fiscal y judicial. Intervención en audiencias, casación y recursos extraordinarios de protección.",
    highlights: ["Defensa penal corporativa e individual", "Acciones constitucionales", "Recursos de casación y apelación"],
    href: "#contacto",
  },
  {
    icon: Briefcase,
    category: "MERCANTIL & EMPRESAS",
    title: "Asesoría Mercantil & Societaria",
    desc: "Acompañamiento integral para sociedades: constitución, reformas estatutarias, pactos de socios y fusiones.",
    highlights: ["Constitución y reestructuración societaria", "Contratación mercantil especializada", "Gobierno corporativo & compliance"],
    href: "#contacto",
  },
  {
    icon: Scale,
    category: "FAMILIA & SUCESIONES",
    title: "Familia, Herencias & Donaciones",
    desc: "Gestión experta en partición judicial o notarial de herencias, inventarios de bienes, testamentos y régimen patrimonial.",
    highlights: ["Partición de bienes y herencias", "Divorcios por mutuo acuerdo y contenciosos", "Planificación sucesoria patrimonial"],
    href: "#contacto",
  },
  {
    icon: Building2,
    category: "LABORAL & REGULATORIO",
    title: "Asesoría Laboral & Corporativa",
    desc: "Auditorías laborales preventivas, desvinculaciones seguras, mediaciones y defensa en sumarios o demandas del trabajo.",
    highlights: ["Contratos de trabajo y reglamentos internos", "Actas de finiquito y mediación", "Defensa judicial laboral"],
    href: "#contacto",
  },
];

// ─── CAPACIDADES INSTITUCIONALES VERIFICABLES ───────────────────────────────
const metrics = [
  { value: "Quito", label: "Sede Jurídica Principal", subtext: "Atención profesional y coordinación de casos" },
  { value: "Nacional", label: "Cobertura Profesional", subtext: "Profesionales asociados para coordinación territorial" },
  { value: "Multiarea", label: "Equipo Especializado", subtext: "Litigio, empresa, familia y relaciones laborales" },
  { value: "24/7", label: "Acceso al Portal LegalTech", subtext: "Consulta documentos y novedades registradas por tu equipo" },
];

// ─── MÉTODO EN 3 PASOS (HOASESOR METODOLOGÍA) ──────────────────────────────
const methodSteps = [
  {
    step: "01",
    title: "Te Escuchamos & Diagnosticamos",
    desc: "Analizamos tu caso y sus implicaciones legales y patrimoniales sin tecnicismos confusos ni costos ocultos.",
  },
  {
    step: "02",
    title: "Diseño Estratégico & Plan de Acción",
    desc: "Construimos una hoja de ruta con análisis de riesgos, probabilidades y presupuesto a medida cerrado.",
  },
  {
    step: "03",
    title: "Ejecución Rigurosa & Seguimiento Digital",
    desc: "Actuamos con rigor mientras consultas desde tu Portal Privado los avances registrados por tu equipo legal.",
  },
];

// ─── PREGUNTAS FRECUENTES (FAQS) ───────────────────────────────────────────
const faqs = [
  {
    q: "¿Cómo inicio una consulta legal con NexoLegal?",
    a: "Puedes solicitar una sesión mediante el formulario web, WhatsApp o la plataforma. Nuestro equipo confirmará la recepción y te indicará la disponibilidad para una revisión profesional.",
  },
  {
    q: "¿Qué diferencia a NexoLegal de los estudios tradicionales?",
    a: "Unimos el rigor de la abogacía de élite con una infraestructura tecnológica propia (Portal de Clientes 24/7 y Asistencia Digital) que te da transparencia total sobre cada documento y trámite de tu expediente.",
  },
  {
    q: "¿Atienden casos fuera de Quito?",
    a: "Sí. Contamos con sede principal en Quito y una red de abogados asociados y procuradores con cobertura en Guayaquil, Cuenca, Ambato, Manta y todo el territorio ecuatoriano.",
  },
  {
    q: "¿Tienen planes continuos para empresas y personas?",
    a: "Sí. Ofrecemos esquemas de iguala jurídica mensual para personas jurídicas que requieren blindaje societario y laboral permanente, así como contratos por caso específico.",
  },
];

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactResult, setContactResult] = useState<{ reference: string; whatsappUrl: string } | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  // Scroll listener: la barra nunca desaparece, solo cambia a fondo blanco y oculta la marquesina
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Slider automático cada 6.5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "Consulta General");
    const message = String(data.get("message") || "");
    const website = String(data.get("website") || "");

    const text = encodeURIComponent(
      `Hola NexoLegal, deseo solicitar una consulta jurídica.\n\n*Nombre:* ${name}\n*Teléfono:* ${phone}\n*Correo:* ${email}\n*Área:* ${service}\n*Mensaje:* ${message}`
    );
    setContactSubmitting(true);
    setContactError(null);
    setContactResult(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          area: service,
          urgency: "Media",
          description: message,
          website,
          attribution: getAttribution(),
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.reference) throw new Error(result?.error || "No se pudo registrar la consulta.");
      const whatsappUrl = `https://wa.me/593997224453?text=${text}%0A%0A*Referencia:*%20${encodeURIComponent(result.reference)}`;
      setContactResult({ reference: result.reference, whatsappUrl });
      trackEvent("lead_form_submit_success", { form_name: "home_contact", reference: result.reference });
      form.reset();
    } catch (error) {
      setContactError(error instanceof Error ? error.message : "No se pudo registrar la consulta.");
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <div className="site-shell relative min-h-screen pb-0">
      {/* ────────────────────────────────────────────────────────────────────────
          0 & 1. BARRA FLOTANTE CON SMART HIDE AL BAJAR Y REVEAL AL SUBIR
          ──────────────────────────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <PromoMarquee scrolled={scrolled} />

        <header
          className={`transition-all duration-300 ${
            scrolled
              ? isDark
                ? "bg-[#05162E]/95 backdrop-blur-xl border-b border-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.4)] py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8"
                : "bg-white/95 backdrop-blur-xl border-b border-[#e6e0d6] shadow-[0_4px_24px_rgba(0,0,0,0.06)] py-2 sm:py-2.5 px-3 sm:px-6 lg:px-8"
              : "bg-transparent border-b border-transparent py-2.5 sm:py-3 px-3 sm:px-6 lg:px-8"
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo Brand Oficial */}
            <Link href="/" className="flex min-h-11 items-center group">
              <NexoLogo size="md" variant={isDark ? "dark" : (scrolled ? "light" : "dark")} showSubtitle={true} />
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                href="#inicio"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 ${
                  isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 ${
                  isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
              >
                Nosotros
              </Link>

              {/* Dropdown Servicios */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button
                  className={`flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 cursor-pointer focus:outline-none ${
                    isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                  }`}
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                >
                  Servicios
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} />
                </button>

                {servicesDropdown && (
                  <div className={`absolute top-full left-0 w-64 rounded-2xl shadow-2xl p-2.5 flex flex-col gap-1 z-50 animate-fade-in ${
                    isDark
                      ? "bg-[#05162E]/98 backdrop-blur-xl border border-[#00A9A3]/30 text-white"
                      : (scrolled
                          ? "bg-white border border-[#e6e0d6] text-[#17211f]"
                          : "bg-[#05162E]/95 backdrop-blur-xl border border-[#00A9A3]/30 text-white")
                  }`}>
                    <Link
                      href="#servicios"
                      onClick={() => setServicesDropdown(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                      }`}
                    >
                      <Gavel className="w-4 h-4 text-[#00A9A3]" />
                      <span>Litigios &amp; Defensa Penal</span>
                    </Link>
                    <Link
                      href="#servicios"
                      onClick={() => setServicesDropdown(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                      }`}
                    >
                      <Briefcase className="w-4 h-4 text-[#00A9A3]" />
                      <span>Mercantil &amp; Empresas</span>
                    </Link>
                    <Link
                      href="#servicios"
                      onClick={() => setServicesDropdown(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        isDark || !scrolled ? "text-white/90 hover:bg-[#00A9A3]/15 hover:text-[#38DFD8]" : "text-[#17211f] hover:bg-stone-100"
                      }`}
                    >
                      <Scale className="w-4 h-4 text-[#00A9A3]" />
                      <span>Familia &amp; Sucesiones</span>
                    </Link>
                    <Link
                      href="#servicios"
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

              <Link
                href="/blog"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 ${
                  isDark || !scrolled ? "text-white/90 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
              >
                Blog
              </Link>

              <Link
                href="#metodo"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 whitespace-nowrap ${
                  isDark || !scrolled ? "text-white/80 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
              >
                Método
              </Link>
              <Link
                href="#contacto"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 py-1.5 whitespace-nowrap ${
                  isDark || !scrolled ? "text-white/80 hover:text-[#38DFD8]" : "text-[#17211f] hover:text-[#00A9A3]"
                }`}
              >
                Contacto
              </Link>
            </nav>

            {/* Action Buttons Right (Limpios y espaciados) */}
            <div className="flex items-center gap-2.5">
              <ThemeToggle />

              <Link
                href="#contacto"
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

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#00A9A3] hover:text-[#38DFD8] active:scale-95 transition-all cursor-pointer"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#00A9A3]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#00A9A3]" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu (Diseño Apple Luxury con Alto Contraste y Privacidad) */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#05162E] border-b border-[#00A9A3]/40 px-5 py-5 flex flex-col gap-3.5 animate-fade-in shadow-2xl text-white mt-2 rounded-2xl">
              <nav className="flex flex-col gap-1 text-left">
                {[
                  { href: "#inicio", label: "Inicio", icon: Scale },
                  { href: "/nosotros", label: "Nosotros & Socio Fundador", icon: Users2 },
                  { href: "#servicios", label: "Servicios Jurídicos", icon: Gavel },
                  { href: "/blog", label: "Blog Jurídico Doctrinal", icon: BookOpen },
                  { href: "#metodo", label: "Método en 3 Pasos", icon: Clock3 },
                  { href: "#contacto", label: "Contacto & Sedes", icon: Mail },
                  { href: "/privacidad", label: "Privacidad & LOPDP Ecuador", icon: ShieldCheck },
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

              {/* Accesos a las 4 WebApps desde el celular */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-[#00A9A3]/30 space-y-2 text-left">
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

              {/* Acciones principales */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-11 py-2.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#00A9A3]/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Acceder a la Plataforma Jurídica (/app)</span>
                </Link>
                <Link
                  href="#contacto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full min-h-11 py-2.5 rounded-xl border border-[#00A9A3]/60 text-white text-xs font-semibold hover:bg-[#00A9A3]/15 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#00A9A3]" />
                  <span>Solicitar Consulta Jurídica</span>
                </Link>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* ────────────────────────────────────────────────────────────────────────
          2. HERO CAROUSEL INTERACTIVO ESTILO HOASESOR
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="inicio" className="relative min-h-[720px] md:min-h-[700px] lg:min-h-[760px] flex items-center overflow-hidden bg-slate-950">
        {/* Background Image / Architecture Nexo Talento (Nítida sin película azul) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src="/hero-corporate-architecture.jpg"
            alt="Firma Jurídica NexoLegal Ecuador"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover object-center opacity-85"
          />
          {/* Sombreado neutro para legibilidad de textos blancos, cero película azul */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/25 to-black/45" />
        </div>

        {/* Carousel Slides Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-left pt-28 pb-24">
          <div className="relative min-h-[390px] sm:min-h-[380px] max-w-3xl">
          {slides.map((slide, index) => {
            const isActive = index === activeSlide;
            const Heading = isActive ? "h1" : "h2";
            return (
              <div
                key={slide.title}
                aria-hidden={!isActive}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0 scale-100 relative"
                    : "opacity-0 translate-y-4 scale-95 absolute inset-0 pointer-events-none"
                }`}
              >
                {/* Eyebrow Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#00A9A3]/40 backdrop-blur-md mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-pulse" />
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
                    {slide.tag}
                  </span>
                </div>

                {/* Main Heading */}
                <Heading className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif text-white tracking-tight leading-[1.08] mb-4 sm:mb-6 max-w-3xl break-words">
                  {slide.title}
                </Heading>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-[#f4f5f1]/90 max-w-2xl leading-relaxed mb-10 font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 max-w-xl">
                  <a
                    href={slide.primaryCta.href}
                    onClick={() => trackEvent("contact_click", { cta: slide.primaryCta.text, slide: slide.title })}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-sm shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href={slide.secondaryCta.href}
                    onClick={() => trackEvent("service_explore_click", { cta: slide.secondaryCta.text, slide: slide.title })}
                    className="vis-interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>{slide.secondaryCta.text}</span>
                    <ChevronRight className="w-4 h-4 text-[#38DFD8]" />
                  </a>
                </div>

                {/* Mensaje comercial verificable y permanente */}
                <div className="pt-4 flex items-center gap-2 text-xs text-[#38DFD8] font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Evaluación inicial sujeta a revisión de antecedentes y disponibilidad profesional</span>
                </div>
              </div>
            );
          })}

          {/* Slider Navigation Controls */}
          <div className="mt-14 flex items-center justify-start gap-4">
            <button
              onClick={handlePrevSlide}
              aria-label="Diapositiva anterior"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Bullets indicator */}
            <div className="flex items-center gap-2.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Ir a diapositiva ${idx + 1}`}
                  aria-current={idx === activeSlide ? "true" : undefined}
                  className="flex h-11 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-300 ${idx === activeSlide ? "w-8 bg-[#00A9A3]" : "w-2 bg-white/30 hover:bg-white/60"}`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              aria-label="Siguiente diapositiva"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        </div>

        {/* Floating Trust Strip at Bottom of Hero */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-[#05162E] via-[#082041] to-[#05162E] border-t border-[#00A9A3]/20 py-3.5 px-4 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-cyan-100/90">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#38DFD8]" />
              <span>Tratamiento reservado y deber de secreto profesional</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-[#38DFD8]" />
              <span>Confirmación y referencia de seguimiento al enviar tu solicitud</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#38DFD8]" />
              <span>Sede Central en Quito · Cobertura en Todo Ecuador</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          3. SECCIÓN DE CREDENCIALES & HISTORIA (ESTILO HOASESOR)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="historia" className="py-24 bg-[#faf8f5] border-b border-[#e6e0d6] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
                  QUIÉNES SOMOS
                </span>
                <div className="vis-gold-divider mb-4" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
                  La Firma
                </h2>
              </div>

              <p className="text-base sm:text-lg text-[#55605a] leading-relaxed font-normal">
                NexoLegal está encaminada a consolidarse como referente nacional en defensa legal corporativa,
                respaldada por una amplia experiencia en asuntos de distinta naturaleza.
              </p>
              <p className="text-base text-[#69736d] leading-relaxed">
                Está conformada por profesionales especializados en cada área legal y con experiencia en litigio.
                Nuestra sede se encuentra en Quito y contamos con profesionales asociados para brindar cobertura nacional.
              </p>
              <p className="text-base text-[#69736d] leading-relaxed">
                Hemos construido una propuesta clara de diferenciación: relaciones fiables entre cliente y abogado,
                acompañamiento a largo plazo y un servicio de excelencia orientado a resultados satisfactorios.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/nosotros"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#00A9A3]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Conoce al Socio Fundador &amp; Principios</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://wa.me/593997224453?text=Deseo%20solicitar%20asesoria%20con%20el%20despacho%20de%20NexoLegal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl border border-[#00A9A3] text-[#17211f] hover:bg-[#00A9A3]/10 text-xs font-semibold active:scale-95 transition-all"
                >
                  Consultar al Despacho
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="group relative rounded-3xl overflow-hidden border border-[#00A9A3]/40 shadow-2xl bg-[#05162E] transition-all duration-500 hover:border-[#00A9A3] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,169,163,0.25)]">
                <div className="relative h-[420px] sm:h-[460px] w-full overflow-hidden">
                  <Image
                    src="/nexolegal-firma.webp"
                    alt="Junta directiva y letrados de NexoLegal en Quito"
                    fill
                    sizes="(max-width: 1023px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05162E] via-[#05162E]/25 to-transparent" />
                  <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#05162E]/85 backdrop-blur-md border border-[#00A9A3]/30 text-white flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#38DFD8]">
                      Presencia en Quito · Sede Central
                    </span>
                    <strong className="text-sm font-bold text-white">
                      Visión jurídica de excelencia con alcance nacional
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-16 border-t border-[#e6e0d6]">
            <div className="max-w-3xl mb-8 lg:mb-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
                MISIÓN, VISIÓN Y VALORES
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
                Principios que guían cada defensa
              </h2>
              <p className="mt-4 text-base text-[#69736d] leading-relaxed">
                Explora la órbita de NexoLegal y selecciona cada principio para conocer cómo orienta nuestro trabajo.
              </p>
            </div>

            <FirmOrbit />
          </div>

          {/* Counters Grid (Hoasesor Metricas Animadas) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[#e6e0d6]">
            {metrics.map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#00A9A3] tracking-tight mb-2">
                  <AnimatedCounter value={item.value} duration={2200} />
                </div>
                <div className="font-bold text-sm text-[#17211f] mb-1">{item.label}</div>
                <p className="text-xs text-[#717872] leading-relaxed">{item.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          4. REJILLA DE SERVICIOS / ÁREAS DE PRÁCTICA (HOASESOR CARDS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="servicios" className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
              ÁREAS DE ESPECIALIZACIÓN
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
              Soluciones jurídicas con criterio, rigor y confidencialidad
            </h2>
            <p className="text-base text-[#69736d] mt-4">
              Cada área está liderada por profesionales con experiencia probada en tribunales y negociación de alto nivel.
            </p>
          </div>

          {/* Grid de 4 Cards de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.title}
                  className="vis-card-luxury p-7 flex flex-col justify-between group hover:border-[#00A9A3] transition-all"
                >
                  <div>
                    {/* Top Icon with Gold/Emerald Touch */}
                    <div className="w-12 h-12 rounded-xl bg-[#082041]/10 text-[#082041] group-hover:bg-[#082041] group-hover:text-[#38DFD8] flex items-center justify-center transition-all duration-300 mb-6">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00A9A3] block mb-1">
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-bold font-serif text-[#17211f] mb-3 group-hover:text-[#00A9A3] transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#69736d] leading-relaxed mb-6">
                      {srv.desc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 border-t border-[#f0ebe3] pt-4 mb-6">
                      {srv.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#55605a]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A9A3] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={`https://wa.me/593997224453?text=Hola%20NexoLegal,%20deseo%20consultar%20sobre%20el%20%C3%A1rea%20de%20${encodeURIComponent(srv.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-11 py-2.5 rounded-xl bg-[#faf8f5] group-hover:bg-[#082041] text-[#082041] group-hover:text-[#38DFD8] border border-[#e6e0d6] group-hover:border-[#082041] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-xs active:scale-95 text-center mt-4"
                  >
                    <span>Consultar Caso</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Banner CTA de diagnóstico preliminar */}
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#082041] via-[#082041] to-[#05162E] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#00A9A3]/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A9A3]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-2 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A3]/20 border border-[#00A9A3]/40 text-[#38DFD8] text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                <span>DIAGNÓSTICO PRELIMINAR</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold font-serif text-white">
                ¿Requieres un diagnóstico preliminar para tu empresa o patrimonio?
              </h4>
              <p className="text-xs sm:text-sm text-cyan-100/80 max-w-2xl leading-relaxed">
                Registra tu solicitud para que el equipo revise los antecedentes y confirme el alcance, disponibilidad y honorarios antes de iniciar.
              </p>
            </div>
            <a
              href="#contacto"
              target="_blank"
              rel="noopener noreferrer"
              className="vis-interactive-btn px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 flex items-center gap-2 relative z-10"
            >
              <span>Solicitar Diagnóstico</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          5. SECCIÓN DE EXPERIENCIA & MÉTODO (CÓMO TRABAJAMOS - 3 PASOS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="metodo" className="py-24 bg-[#05162E] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#38DFD8]">
              NUESTRA METODOLOGÍA
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
              Menos incertidumbre. Mayor contundencia procesal.
            </h2>
            <p className="text-base text-cyan-100/80 mt-4">
              Un estándar claro para que conozcas en todo momento dónde estás parado y cuál es el próximo paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {methodSteps.map((m) => (
              <div
                key={m.step}
                className="relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00A9A3]/50 transition-all duration-300"
              >
                <div className="text-4xl font-extrabold font-serif text-[#00A9A3] mb-4">
                  {m.step}
                </div>
                <h3 className="text-xl font-bold font-serif text-white mb-3">{m.title}</h3>
                <p className="text-sm text-cyan-100/75 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA directo al método */}
          <div className="mt-10 text-center">
            <a
              href="https://wa.me/593997224453?text=Hola%20NexoLegal,%20deseo%20iniciar%20el%20Paso%201%20de%20diagnostico%20para%20mi%20caso"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Iniciar Paso 1: Diagnóstico de tu Caso</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Portal Tech Highlight */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-[#00A9A3]/30 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A3]/20 text-[#38DFD8] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>Portal Privado LegalTech</span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                Tu información legal y expediente, siempre al alcance
              </h3>
              <p className="text-sm text-cyan-100/80 max-w-2xl leading-relaxed">
                Nuestros clientes no dependen de llamadas interminables para saber cómo va su proceso judicial. Tienen
                acceso al portal con el estado actualizado, archivos compartidos y calendario de diligencias.
              </p>
            </div>
            <Link
              href="/ingresar"
              className="vis-interactive-btn px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-xl flex items-center gap-2"
            >
              <span>Acceder al Portal</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          6. SECCIÓN DE PREGUNTAS FRECUENTES (FAQS)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-24 bg-[#faf8f5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
              RESOLVEMOS TUS DUDAS
            </span>
            <div className="vis-gold-divider mx-auto my-3" />
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#17211f]">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = faqOpen === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl border border-[#e6e0d6] bg-white overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : index)}
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-bold text-[#17211f] hover:text-[#00A9A3] transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-serif">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#00A9A3] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-[#55605a] leading-relaxed border-t border-[#f3eee8] pt-4 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tarjeta de Acción Rápida tras FAQs */}
          <div className="mt-12 p-8 rounded-3xl bg-white border-2 border-[#00A9A3]/40 shadow-xl text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#082041]/10 text-[#082041] text-[10px] font-bold uppercase tracking-wider">
              <span>RESPUESTA LEGAL INMEDIATA</span>
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#17211f]">
              ¿Tienes una situación jurídica urgente o un término corriendo?
            </h3>
            <p className="text-xs sm:text-sm text-[#55605a] max-w-lg mx-auto leading-relaxed">
              Si tienes un plazo próximo, indícalo en tu solicitud. El equipo confirmará la recepción y la disponibilidad profesional para revisar el caso.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/593997224453?text=Hola%20NexoLegal,%20tengo%20una%20urgencia%20procesal%20y%20deseo%20atencion%20inmediata"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Atención Inmediata por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#contacto"
                className="px-6 py-3.5 rounded-xl border border-[#082041] text-[#082041] text-xs font-bold uppercase tracking-wider hover:bg-[#082041]/5 active:scale-95 transition-all"
              >
                Llenar Formulario Web
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          7. FORMULARIO DE CONTACTO PREMIUM (ESTILO HOASESOR)
          ──────────────────────────────────────────────────────────────────────── */}
      <section id="contacto" className="py-24 bg-gradient-to-br from-[#082041] to-[#05162E] text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#38DFD8]">
                COMUNÍCATE CON NOSOTROS
              </span>
              <div className="vis-gold-divider mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white leading-tight">
                Hablemos de tu situación con total reserva
              </h2>
              <p className="text-sm sm:text-base text-cyan-100/80 leading-relaxed font-normal">
                El primer paso consiste en escuchar los detalles de tu problema para brindarte una orientación clara y
                un presupuesto cerrado y sin sorpresas.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Teléfono / WhatsApp</span>
                    <a href="tel:+593997224453" className="inline-flex min-h-11 items-center text-sm font-bold text-white hover:text-[#38DFD8]">
                      +593 99 722 4453
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Correo Electrónico</span>
                    <a href="mailto:legal@nexotalentos.com" className="inline-flex min-h-11 items-center text-sm font-bold text-white hover:text-[#38DFD8]">
                      legal@nexotalentos.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38DFD8]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-cyan-100/60 block">Sede Jurídica</span>
                    <span className="text-sm font-bold text-white">Quito, Ecuador · Cobertura Nacional</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 text-xs text-cyan-100/80 mt-6">
                <ShieldCheck className="w-5 h-5 text-[#38DFD8] shrink-0" />
                <span>Tu información está protegida bajo el Código de Ética y Secreto Profesional de la Abogacía.</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-[#00A9A3]/30 p-8 sm:p-10 shadow-2xl">
                <h3 className="text-xl font-bold font-serif text-white mb-2">Solicitar Asesoría o Presupuesto</h3>
                <p className="text-xs text-cyan-100/70 mb-6">
                  Registraremos tu solicitud y podrás continuar la conversación por WhatsApp con una referencia de seguimiento.
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="company-website">Sitio web</label>
                    <input id="company-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Nombre completo *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ej. Dr. Carlos Andrade"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Teléfono o WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Ej. +593 99 999 9999"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-white/90 block mb-1">Correo electrónico *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="tu@correo.com"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                      />
                    </div>
                    <div>
                      <label htmlFor="lead-service" className="text-xs font-semibold text-white/90 block mb-1">Área de interés</label>
                      <select
                        id="lead-service"
                        name="service"
                        className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                      >
                        <option value="Litigios & Penal">Litigios & Penal</option>
                        <option value="Mercantil & Empresas">Mercantil & Empresas</option>
                        <option value="Familia & Sucesiones">Familia & Sucesiones</option>
                        <option value="Laboral & Regulatorio">Laboral & Regulatorio</option>
                        <option value="Consulta General">Otra Consulta Jurídica</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/90 block mb-1">¿En qué podemos ayudarte? *</label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Describe brevemente los antecedentes de tu situación..."
                      className="w-full px-4 py-3 rounded-lg bg-white text-[#17211f] text-sm focus:outline-none focus:ring-2 focus:ring-[#00A9A3]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="vis-interactive-btn w-full py-4 rounded-lg bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-sm tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{contactSubmitting ? "Registrando solicitud…" : "Registrar consulta"}</span>
                  </button>

                  {contactError ? (
                    <p role="alert" className="rounded-xl border border-red-300/30 bg-red-500/15 px-4 py-3 text-xs text-red-100">
                      {contactError}
                    </p>
                  ) : null}

                  {contactResult ? (
                    <div role="status" className="rounded-xl border border-emerald-300/30 bg-[#00A9A3]/15 p-4 text-sm text-emerald-50">
                      <p className="font-bold">Solicitud registrada · {contactResult.reference}</p>
                      <p className="mt-1 text-xs text-cyan-100/80">Conserva esta referencia y continúa por WhatsApp si deseas atención inmediata.</p>
                      <a
                        href={contactResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white"
                      >
                        Continuar por WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : null}

                  <p className="text-[11px] text-cyan-100/60 text-center pt-2">
                    El envío de este formulario no constituye relación abogado-cliente hasta la suscripción del convenio profesional.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────────────────
          8. FOOTER CORPORATIVO UNIFICADO (NEXO TALENTO PALETTE & WHATSAPP)
          ──────────────────────────────────────────────────────────────────────── */}
      <Footer />

      {/* Floating Assist / WhatsApp para Desktop */}
      <LandingAssist />
    </div>
  );
}
