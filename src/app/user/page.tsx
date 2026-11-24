"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  FolderKanban,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
  ShieldCheck,
  Sparkles,
  Download,
  ExternalLink,
  ChevronRight,
  User,
  Phone,
  Mail,
  CheckCircle2,
  GraduationCap,
  Play,
  Lock,
  LogOut,
  Send,
  CreditCard,
  Bell,
  X,
  FileCheck,
  AlertCircle,
  Eye,
  Check,
  HelpCircle,
} from "lucide-react";
import AppExperienceNavigation from "@/components/app/AppExperienceNavigation";

interface JudicialCase {
  id: string;
  type: string;
  title: string;
  court: string;
  lawyer: string;
  hearingDate?: string;
  status: "Audiencia Convocada" | "En Trámite" | "Dictamen Emitido";
  statusColor: string;
  milestones: { date: string; title: string; desc: string; isLatest?: boolean }[];
  documents: { name: string; date: string; size: string }[];
}

const userCases: JudicialCase[] = [
  {
    id: "17203-2026-00481",
    type: "Juicio Ordinario",
    title: "Prescripción Adquisitiva de Dominio de Inmueble Familiar",
    court: "Unidad Judicial Civil de Quitumbe - Quito",
    lawyer: "Abg. Diego Alarcón Vintimilla",
    hearingDate: "29 de Octubre, 2026 · 09:30 AM",
    status: "Audiencia Convocada",
    statusColor: "bg-amber-500/15 text-amber-700 border-amber-500/30",
    milestones: [
      {
        date: "24 de Octubre, 2026",
        title: "Auto de Sustanciación Notificado",
        desc: "El Juez convoca formalmente a audiencia preliminar y ordena la prueba pericial.",
        isLatest: true,
      },
      {
        date: "15 de Octubre, 2026",
        title: "Contestación de la Demanda Recibida",
        desc: "La contraparte presenta allanamiento parcial. NexoLegal ingresa objeción procesal.",
      },
      {
        date: "28 de Septiembre, 2026",
        title: "Calificación de Demanda Admitida a Trámite",
        desc: "Cumplimiento pleno de requisitos formales según el Art. 142 del COGEP.",
      },
      {
        date: "12 de Septiembre, 2026",
        title: "Demanda Ingresada en Oficina de Sorteos SATJE",
        desc: "Asignación de casillero judicial electrónico y letrado patrocinador de NexoLegal.",
      },
    ],
    documents: [
      { name: "Escrito_Demanda_Prescripcion_Sellado.pdf", date: "12 Sep 2026", size: "2.4 MB" },
      { name: "Auto_Calificacion_Admisoria_Tribunal.pdf", date: "28 Sep 2026", size: "840 KB" },
      { name: "Notificacion_Convocatoria_Audiencia.pdf", date: "24 Oct 2026", size: "1.1 MB" },
    ],
  },
  {
    id: "17981-2025-01892",
    type: "Constitucional",
    title: "Acción de Protección contra Vulneración de Derechos Adquiridos",
    court: "Corte Provincial de Justicia de Pichincha",
    lawyer: "Ab. José Aimacaña Mgtr.",
    status: "En Trámite",
    statusColor: "bg-[#00A9A3]/15 text-emerald-700 border-[#00A9A3]/30",
    milestones: [
      {
        date: "20 de Octubre, 2026",
        title: "Alegato Escrito de Conclusión Ingresado",
        desc: "Sustentación de jurisprudencia de la Corte Constitucional del Ecuador.",
        isLatest: true,
      },
      {
        date: "04 de Octubre, 2026",
        title: "Audiencia Pública Oral Evacuada",
        desc: "Intervención del Socio Fundador Ab. José Aimacaña con réplica aceptada.",
      },
      {
        date: "19 de Septiembre, 2026",
        title: "Medidas Cautelares Concedidas",
        desc: "Suspensión provisional del acto lesivo para proteger los derechos del cliente.",
      },
    ],
    documents: [
      { name: "Accion_Proteccion_Demanda_Constitucional.pdf", date: "19 Sep 2026", size: "3.2 MB" },
      { name: "Auto_Medida_Cautelar_Favorable.pdf", date: "21 Sep 2026", size: "1.4 MB" },
      { name: "Alegato_Final_Jurisprudencia_CE.pdf", date: "20 Oct 2026", size: "1.8 MB" },
    ],
  },
];

export default function UserPortalPage() {
  const [activeTab, setActiveTab] = useState<"casos" | "membresia" | "academia" | "abogado" | "ia">("casos");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Estados interactivos para modales Apple
  const [selectedCase, setSelectedCase] = useState<JudicialCase | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ title: string; duration: string } | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const subscription = {
    plan: "Membresía Familiar Integral",
    price: "$29.00 / mes",
    renewsOn: "15 de Noviembre, 2026",
    status: "Activa",
    consultationsLeft: 4,
    invoiceNumber: "001-020-000492819",
    sriAuth: "2610202601179283749200120010200004928191234567819",
  };

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiAnswer(
        `Como miembro activo de la Membresía NexoLegal, su consulta sobre "${aiQuestion}" cuenta con amparo preventivo. Según el Código Orgánico General de Procesos (COGEP) y la normativa ecuatoriana, usted tiene derecho a requerir la mediación previa o la interposición de una medida preventiva sin costo procesal extra. Su letrado patrocinador ha recibido esta consulta para ratificar la estrategia en su próxima llamada.`
      );
      setAiLoading(false);
    }, 750);
  };

  return (
    <div className="with-app-experience-dock min-h-screen bg-[#faf8f5] text-[#17211f] flex flex-col font-sans selection:bg-[#00A9A3]/30">
      {/* ─── TOAST NOTIFICATION APPLE STYLE ─────────────────────────────── */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#082041] text-white px-5 py-3 rounded-2xl border border-[#00A9A3]/60 shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={18} className="text-[#00A9A3]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ─── TOP NAVBAR APPLE FROSTED GLASS ──────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#082041]/95 backdrop-blur-xl text-white border-b border-[#00A9A3]/30 px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group active:scale-95 transition-all">
              <div className="w-9 h-9 rounded-xl bg-[#082041] text-[#38DFD8] border border-[#00A9A3]/40 flex items-center justify-center">
                <Scale size={18} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white">NexoLegal</span>
                <span className="block text-[9px] uppercase tracking-widest text-[#38DFD8] font-mono">
                  Portal Clientes &amp; Familias
                </span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-mono text-[11px]">Membresía Activa · Ecuador</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200">
              <User size={14} className="text-[#38DFD8]" />
              <span className="font-medium hidden sm:inline">Roberto Andrade C.</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00A9A3]/30 text-[#38DFD8]">
                ★ SUSCRIPTOR
              </span>
            </div>
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-90 transition-all"
              title="Volver a la Web"
              aria-label="Volver a la web"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* ─── CONTENIDO PRINCIPAL ─────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full">
        {/* 1. PANTALLA / CUADRO DE BIENVENIDA Y COBERTURA (PRIMERO) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#082041] via-[#082041] to-[#082041] text-white shadow-lg border border-[#00A9A3]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#38DFD8] font-bold">
              SUSCRIPCIÓN ACTIVA · MEMBRESÍA FAMILIAR INTEGRAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Bienvenido a tu Espacio Jurídico, Roberto
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/80 font-light">
              Cuentas con 4 consultas preventivas disponibles este periodo y 2 causas en seguimiento SATJE.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-right">
              <span className="text-[10px] uppercase text-cyan-200 block">Próxima Renovación</span>
              <strong className="text-xs sm:text-sm text-[#38DFD8] font-bold block">
                {subscription.renewsOn}
              </strong>
            </div>
          </div>
        </div>

        {/* 2. ACCESOS DIRECTOS A LOS PORTALES (EL CUADRO DE LA TERCERA IMAGEN) */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#e6e0d6] shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase font-mono font-bold tracking-wider text-[#00A9A3]">
                Accesos a la Plataforma Web &amp; Ecosistema
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#55605a]">4 Portales Conectados</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <Link
              href="/user"
              className="p-2 sm:p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-900 font-bold flex items-center justify-between active:scale-95 transition-all shadow-xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 shadow-sm shadow-blue-500/50" />
                <span className="text-xs font-bold truncate">Portal Clientes</span>
              </div>
              <span className="text-[9px] font-mono uppercase bg-blue-600 text-white px-1.5 py-0.5 rounded font-extrabold shrink-0">
                Activo
              </span>
            </Link>
            <Link
              href="/empresas"
              className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-[#00A9A3]/10 border border-[#e6e0d6] hover:border-[#00A9A3]/40 text-[#17211f] hover:text-emerald-900 font-semibold flex items-center justify-between active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A9A3] shrink-0" />
                <span className="text-xs truncate">Portal Empresas</span>
              </div>
              <ExternalLink size={12} className="text-slate-400 shrink-0" />
            </Link>
            <Link
              href="/abogado"
              className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-amber-500/10 border border-[#e6e0d6] hover:border-amber-500/40 text-[#17211f] hover:text-amber-900 font-semibold flex items-center justify-between active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs truncate">Portal Abogado</span>
              </div>
              <ExternalLink size={12} className="text-slate-400 shrink-0" />
            </Link>
            <Link
              href="/admin"
              className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-purple-500/10 border border-[#e6e0d6] hover:border-purple-500/40 text-[#17211f] hover:text-purple-900 font-semibold flex items-center justify-between active:scale-95 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                <span className="text-xs truncate">Portal Admin</span>
              </div>
              <ExternalLink size={12} className="text-slate-400 shrink-0" />
            </Link>
          </div>
        </div>

        {/* 3. BOTONES INTERACTIVOS DE ELECCIÓN (TODOS LOS BOTONES VISIBLES EN MOBILE Y DESKTOP) */}
        <div className="bg-white rounded-2xl border border-[#e6e0d6] p-1.5 sm:p-2 shadow-xs sticky top-[60px] z-30">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {[
              { id: "casos", shortLabel: "Juicios (2)", label: "Mis Juicios (2)", icon: FolderKanban },
              { id: "membresia", shortLabel: "Membresía", label: "Membresía", icon: ShieldCheck },
              { id: "academia", shortLabel: "Academia", label: "Academia", icon: GraduationCap },
              { id: "abogado", shortLabel: "Abogado", label: "Mi Abogado", icon: User },
              { id: "ia", shortLabel: "IA Legal", label: "Asistente IA", icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 sm:px-2 rounded-xl transition-all active:scale-95 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer text-center ${
                    isActive
                      ? "bg-[#082041] text-white shadow-md shadow-[#082041]/25 ring-1 ring-[#00A9A3]/60"
                      : "text-[#55605a] hover:text-[#17211f] hover:bg-stone-100/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-[#38DFD8]" : "text-[#55605a]"}`} />
                  <span className="text-[10px] sm:text-xs font-bold leading-tight truncate">
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── TAB 1: MIS JUICIOS Y CAUSAS JUDICIALES ────────────────────── */}
        {activeTab === "casos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#17211f] flex items-center gap-2">
                  <FolderKanban size={18} className="text-[#00A9A3]" />
                  <span>Expedientes en Litigio Conectados al SATJE</span>
                </h2>
                <span className="text-xs text-[#6e7771]">Haz clic en cualquier causa para abrir su expediente</span>
              </div>

              {userCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className="p-5 sm:p-6 rounded-2xl border border-[#e6e0d6] hover:border-[#00A9A3] bg-white shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer space-y-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0ebe3]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#082041]/10 text-[#082041]">
                        {c.type}
                      </span>
                      <strong className="text-sm font-mono text-[#17211f] group-hover:text-[#00A9A3] transition-colors">
                        {c.id}
                      </strong>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${c.statusColor}`}
                    >
                      ● {c.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-[#17211f] group-hover:text-[#082041] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#6e7771] mt-0.5">{c.court}</p>
                  </div>

                  <div className="pt-3 border-t border-[#f0ebe3] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-[#55605a]">
                      Letrado: <strong>{c.lawyer}</strong>
                    </span>
                    {c.hearingDate ? (
                      <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        Audiencia: {c.hearingDate}
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold">Estado: Escrito Admitido</span>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 text-xs text-[#00A9A3] font-bold">
                    <span>Ver Expediente Completo</span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Ficha Lateral de Acciones Rápidas */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#17211f] flex items-center gap-2">
                <Sparkles size={18} className="text-[#00A9A3]" />
                <span>Servicios de tu Suscripción</span>
              </h2>

              <div className="p-6 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-4 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-[#f0ebe3]">
                  <span className="text-[#6e7771]">Consultas Disponibles:</span>
                  <strong className="text-emerald-700 font-bold">
                    {subscription.consultationsLeft} restantes este mes
                  </strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f0ebe3]">
                  <span className="text-[#6e7771]">Revisión de Contratos:</span>
                  <strong className="text-[#17211f]">Ilimitada (Sin costo extra)</strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f0ebe3]">
                  <span className="text-[#6e7771]">Bonificación en Litigios:</span>
                  <strong className="text-[#00A9A3] font-bold">25% Descuento</strong>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#f0ebe3]">
                  <span className="text-[#6e7771]">Asistencia en Flagrancias:</span>
                  <strong className="text-emerald-700 font-bold">Incluida 24/7</strong>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("ia")}
                    className="w-full min-h-11 py-2.5 rounded-xl bg-[#082041] hover:bg-[#082041] text-white font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <Sparkles size={14} className="text-[#38DFD8]" />
                    <span>Preguntar a la IA sobre un Trámite</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("abogado")}
                    className="w-full min-h-11 py-2.5 rounded-xl border border-[#00A9A3] text-[#17211f] hover:bg-[#00A9A3]/10 font-bold flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                  >
                    <User size={14} className="text-[#00A9A3]" />
                    <span>Contactar a mi Abogado</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: MI MEMBRESÍA PREVENTIVA ────────────────────────────── */}
        {activeTab === "membresia" && (
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0ebe3]">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#00A9A3]">
                  Plan Jurídico Contratado
                </span>
                <h2 className="text-2xl font-bold font-serif text-[#17211f]">{subscription.plan}</h2>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-2xl font-bold font-serif text-[#00A9A3]">{subscription.price}</span>
                <span className="block text-[11px] text-emerald-600 font-bold">● Suscripción Activa &amp; al Día</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                <strong className="block text-[#17211f] text-sm">Cobertura Familiar Ampliada</strong>
                <p className="text-[#6e7771]">
                  Titular + Cónyuge + Hijos hasta 25 años protegidos en temas civiles, herencias, inquilinato y tránsito.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-1">
                <strong className="block text-[#17211f] text-sm">Línea Telefónica de Emergencia 24/7</strong>
                <p className="text-[#6e7771]">
                  Orientación inmediata en detenciones de tránsito, citaciones fiscales o allanamientos en todo el Ecuador.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900">
                <ShieldCheck size={16} className="text-emerald-600" />
                <span>Garantía de Fidelidad NexoLegal</span>
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Tus consultas están protegidas bajo el secreto profesional de la ley ecuatoriana. No hay costos ocultos ni letras pequeñas.
              </p>
            </div>

            <div className="pt-4 border-t border-[#f0ebe3] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
              <span className="text-[#6e7771]">
                Facturación Electrónica SRI: <strong>{subscription.invoiceNumber}</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2.5 rounded-xl bg-[#082041] text-white hover:bg-[#082041] font-bold active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FileText size={14} className="text-[#38DFD8]" />
                <span>Ver Factura Electrónica SRI</span>
              </button>
            </div>
          </div>
        )}

        {/* ─── TAB 3: ACADEMIA Y FORMACIÓN JURÍDICA ───────────────────────── */}
        {activeTab === "academia" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#00A9A3]">
                Educación Legal Preventiva
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17211f]">
                Módulos de Formación para Miembros Activos
              </h2>
              <p className="text-xs text-[#6e7771] mt-1 max-w-2xl">
                Aprende a proteger tu patrimonio, evitar fraudes inmobiliarios y gestionar contratos con pleno respaldo legal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: "Guía Práctica de Herencias y Testamentos en Ecuador",
                  duration: "45 min",
                  badge: "Nuevo",
                  teacher: "Ab. José Aimacaña Mgtr.",
                },
                {
                  title: "Cómo actuar ante una citación o demanda judicial",
                  duration: "30 min",
                  badge: "Fundamental",
                  teacher: "Abg. Diego Alarcón V.",
                },
                {
                  title: "Blindaje de Arriendos y Compraventa de Inmuebles",
                  duration: "60 min",
                  badge: "Esencial",
                  teacher: "Dra. Sofía Narváez P.",
                },
              ].map((mod, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] hover:border-[#00A9A3] flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#082041]/10 text-[#082041]">
                      {mod.badge}
                    </span>
                    <h3 className="font-bold font-serif text-sm text-[#17211f] group-hover:text-[#082041] transition-colors leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-[11px] text-[#6e7771]">Docente: {mod.teacher}</p>
                    <span className="text-[10px] font-mono text-[#00A9A3] block">
                      Duración: {mod.duration} · Video HD
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveVideo(mod)}
                    className="w-full min-h-11 py-2.5 rounded-xl bg-[#082041] hover:bg-[#082041] text-white text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-sm"
                  >
                    <Play size={13} className="text-[#38DFD8] fill-current" />
                    <span>Reproducir Clase</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── TAB 4: MI ABOGADO DE CABECERA ──────────────────────────────── */}
        {activeTab === "abogado" && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-[#f0ebe3]">
              <div className="w-16 h-16 rounded-2xl bg-[#082041] text-[#38DFD8] flex items-center justify-center font-bold text-xl border-2 border-[#00A9A3]/40 shadow-md">
                DA
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-[#00A9A3]">
                  Abogado Titular Asignado
                </span>
                <h3 className="text-xl font-bold font-serif text-[#17211f]">
                  Abg. Diego Alarcón Vintimilla
                </h3>
                <p className="text-xs text-[#6e7771]">
                  Magíster en Litigación Oral · Sede Quito · Matrícula Foro 17-2018-492
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://wa.me/593991786275?text=Estimado%20Abg.%20Diego%20Alarcon,%20deseo%20coordinar%20una%20sesion%20por%20mi%20caso"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 flex items-center justify-between text-emerald-900 font-bold text-xs transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-emerald-600" />
                  <span>Contactar Directo por WhatsApp Oficial</span>
                </div>
                <ChevronRight size={14} />
              </a>

              <button
                type="button"
                onClick={() => showToast("Solicitud de reunión virtual enviada al despacho de turno.")}
                className="w-full p-4 rounded-2xl border border-[#e6e0d6] hover:border-[#00A9A3] bg-[#faf8f5] hover:bg-white flex items-center justify-between text-[#17211f] font-semibold text-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-[#00A9A3]" />
                  <span>Agendar Consulta Presencial en Quito</span>
                </div>
                <ChevronRight size={14} className="text-[#00A9A3]" />
              </button>
            </div>
          </div>
        )}

        {/* ─── TAB 5: ASISTENTE GEMINI AI ─────────────────────────────────── */}
        {activeTab === "ia" && (
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A9A3]/15 text-[#00A9A3] text-xs font-bold">
                <Sparkles size={14} />
                <span>Asistente Jurídico Gemini AI</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17211f]">
                Consulta tus dudas legales cotidianas
              </h2>
              <p className="text-xs text-[#6e7771]">
                Entrenado en normativa ecuatoriana (Constitución, Código Civil, COGEP, COIP y Código del Trabajo).
              </p>
            </div>

            {/* Pastillas de preguntas frecuentes para rellenar rápido */}
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="text-[10px] text-[#6e7771] uppercase font-mono block w-full">
                Sugerencias rápidas:
              </span>
              {[
                "¿Qué plazo tiene un inquilino para desocupar sin contrato escrito?",
                "¿Cómo calcular la liquidación por despido intempestivo?",
                "¿Cuáles son los requisitos para una posesión efectiva de herencia?",
              ].map((query, qIdx) => (
                <button
                  key={qIdx}
                  type="button"
                  onClick={() => setAiQuestion(query)}
                  className="px-3 py-1.5 rounded-full bg-[#faf8f5] hover:bg-[#082041] hover:text-white border border-[#e6e0d6] text-[#55605a] text-[11px] transition-all cursor-pointer active:scale-95"
                >
                  {query}
                </button>
              ))}
            </div>

            <form onSubmit={handleAskAI} className="space-y-3">
              <textarea
                rows={3}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Escribe tu consulta legal aquí..."
                className="w-full p-4 rounded-2xl border border-[#d6cfc5] bg-[#faf8f5] text-xs text-[#17211f] outline-none transition focus:border-[#00A9A3] focus:bg-white focus:ring-2 focus:ring-[#00A9A3]/15"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="px-6 py-2.5 rounded-xl bg-[#082041] hover:bg-[#082041] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  {aiLoading ? "Consultando normativa ecuatoriana…" : "Consultar a la IA"}
                  {!aiLoading && <Send size={13} />}
                </button>
              </div>
            </form>

            {aiAnswer && (
              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#00A9A3]/40 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A9A3]">
                  <Sparkles size={14} />
                  <span>Respuesta de Orientación Legal:</span>
                </div>
                <p className="text-xs text-[#333e38] leading-relaxed">{aiAnswer}</p>
                <div className="pt-2 border-t border-[#e6e0d6] flex justify-end">
                  <button
                    type="button"
                    onClick={() => showToast("Criterio remitido a tu abogado para validación.")}
                    className="px-3 py-1 rounded-lg text-[10px] font-bold text-[#082041] bg-[#082041]/10 hover:bg-[#082041]/20 transition-colors"
                  >
                    Guardar consulta en expediente
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <AppExperienceNavigation />

      {/* ─── MODAL APPLE: EXPEDIENTE JUDICIAL SATJE DETALLADO ────────────── */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#00A9A3]/40 space-y-6 relative animate-fade-in">
            <button
              type="button"
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-stone-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#082041]/10 text-[#082041]">
                  {selectedCase.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${selectedCase.statusColor}`}>
                  {selectedCase.status}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17211f]">
                {selectedCase.title}
              </h2>
              <p className="text-xs font-mono text-[#00A9A3]">Causa SATJE: {selectedCase.id}</p>
              <p className="text-xs text-[#6e7771]">{selectedCase.court}</p>
            </div>

            {/* Bitácora de Hitos Procesales */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17211f] flex items-center gap-1.5">
                <Clock size={14} className="text-[#00A9A3]" />
                <span>Cronología Procesal en Tiempo Real:</span>
              </h3>
              <div className="space-y-3 border-l-2 border-[#082041]/30 pl-4 ml-2">
                {selectedCase.milestones.map((m, mIdx) => (
                  <div key={mIdx} className="relative space-y-1">
                    <span
                      className={`absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full ${
                        m.isLatest ? "bg-[#00A9A3] ring-4 ring-[#00A9A3]/20" : "bg-[#082041]"
                      }`}
                    />
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#17211f]">{m.title}</span>
                      <span className="text-[10px] font-mono text-[#6e7771]">{m.date}</span>
                    </div>
                    <p className="text-xs text-[#55605a] leading-relaxed">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documentos y Providencias */}
            <div className="space-y-3 pt-2 border-t border-[#f0ebe3]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#17211f] flex items-center gap-1.5">
                <FileCheck size={14} className="text-[#00A9A3]" />
                <span>Escritos y Providencias Judiciales:</span>
              </h3>
              <div className="space-y-2">
                {selectedCase.documents.map((doc, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-xl bg-[#faf8f5] border border-[#e6e0d6] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      <FileText size={16} className="text-[#00A9A3] shrink-0" />
                      <div className="truncate">
                        <strong className="block text-[#17211f] truncate">{doc.name}</strong>
                        <span className="text-[10px] text-[#6e7771]">
                          {doc.date} · {doc.size}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast(`Descargando copia certificada: ${doc.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#082041] hover:bg-[#082041] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 active:scale-95 transition-all cursor-pointer"
                    >
                      <Download size={12} />
                      <span>Descargar</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-bold active:scale-95 transition-all cursor-pointer"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL APPLE: REPRODUCTOR DE CLASE DE ACADEMIA ──────────────── */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#05162E] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#00A9A3]/50 space-y-5 relative animate-fade-in">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#38DFD8]">
                AULA VIRTUAL NexoLegal · DURACIÓN: {activeVideo.duration}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                {activeVideo.title}
              </h2>
            </div>

            {/* Simulación de Video Player con Controles */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-[#00A9A3]/30 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#00A9A3] text-[#05162E] flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 active:scale-95 transition-transform">
                <Play size={24} className="fill-current ml-1" />
              </div>
              <span className="text-xs text-white/80 mt-3 font-mono">
                Transmisión protegida · Calidad 1080p Full HD
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10 text-cyan-200/80">
              <span>Módulo certificado para miembros de NexoLegal</span>
              <button
                type="button"
                onClick={() => {
                  showToast("Progreso registrado: Has completado el módulo.");
                  setActiveVideo(null);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold active:scale-95 transition-all cursor-pointer"
              >
                Completar y Certificar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL APPLE: FACTURA ELECTRÓNICA SRI ───────────────────────── */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#00A9A3]/40 space-y-5 relative animate-fade-in">
            <button
              type="button"
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-stone-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-1 pb-3 border-b border-[#f0ebe3]">
              <span className="text-[10px] uppercase font-mono font-bold text-[#00A9A3]">
                COMPROBANTE ELECTRÓNICO OFICIAL
              </span>
              <h2 className="text-xl font-bold font-serif text-[#17211f]">
                Factura Electrónica SRI
              </h2>
              <p className="text-xs text-[#6e7771]">RUC: 1792837492001 · NexoLegal S.A.S.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                <span className="text-[#6e7771]">Nro. Factura:</span>
                <strong className="font-mono text-[#17211f]">{subscription.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                <span className="text-[#6e7771]">Cliente:</span>
                <strong>Roberto Andrade C. (CI: 1718293847)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                <span className="text-[#6e7771]">Concepto:</span>
                <span>Membresía Familiar Integral (Mensual)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                <span className="text-[#6e7771]">Subtotal:</span>
                <span>$25.89</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                <span className="text-[#6e7771]">IVA (12%):</span>
                <span>$3.11</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f0ebe3] text-sm">
                <span className="font-bold text-[#17211f]">Total Pagado:</span>
                <strong className="font-bold text-emerald-700">{subscription.price}</strong>
              </div>
              <div className="pt-2 text-[10px] text-[#6e7771] break-all font-mono bg-stone-50 p-2 rounded-xl">
                Clave Acceso SRI: {subscription.sriAuth}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold active:scale-95 transition-all cursor-pointer"
              >
                Cerrar
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast("Descargando archivo XML/PDF de Factura Electrónica SRI...");
                  setShowInvoiceModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#082041] text-white text-xs font-bold flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-md"
              >
                <Download size={13} />
                <span>Descargar PDF Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
