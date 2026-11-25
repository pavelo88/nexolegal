"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  ShieldCheck,
  GraduationCap,
  User,
  Sparkles,
  CheckCircle2,
  Calendar,
  CreditCard,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Play,
  Send,
  ExternalLink,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react";
import PortalAppShell, { PortalNavItem } from "@/components/app/PortalAppShell";
import DidacticHeaderBanner from "@/components/app/DidacticHeaderBanner";
import UserCaseDetailModal, { JudicialCase } from "@/components/user/UserCaseDetailModal";
import UserInvoiceModal from "@/components/user/UserInvoiceModal";
import UserVideoModal from "@/components/user/UserVideoModal";

const userCases: JudicialCase[] = [
  {
    id: "17203-2026-00481",
    type: "Juicio Ordinario",
    title: "Prescripción Adquisitiva de Dominio de Inmueble Familiar",
    court: "Unidad Judicial Civil de Quitumbe - Quito",
    lawyer: "Abogado patrocinador",
    hearingDate: "29 de Octubre, 2026 · 09:30 AM",
    status: "Audiencia Convocada",
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
        desc: "Intervención del Socio Fundador con réplica aceptada.",
      },
    ],
    documents: [
      { name: "Accion_Proteccion_Demanda_Constitucional.pdf", date: "19 Sep 2026", size: "3.2 MB" },
      { name: "Auto_Medida_Cautelar_Favorable.pdf", date: "21 Sep 2026", size: "1.4 MB" },
    ],
  },
];

type UserTab = "casos" | "membresia" | "academia" | "abogado" | "ia";

export default function UserPortalPage() {
  const [activeTab, setActiveTab] = useState<UserTab>("casos");
  const [searchTerm, setSearchTerm] = useState("");
  const [caseFilter, setCaseFilter] = useState("todos");

  // Modales
  const [selectedCase, setSelectedCase] = useState<JudicialCase | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ title: string; duration: string } | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // IA State
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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

  const navItems: PortalNavItem[] = [
    { id: "casos", label: "Mis Juicios & Causas SATJE (2)", icon: FolderKanban, badge: "2", badgeColor: "blue" },
    { id: "membresia", label: "Membresía Legal Integral", icon: ShieldCheck, badge: "Activa", badgeColor: "teal" },
    { id: "academia", label: "Academia de Derechos", icon: GraduationCap },
    { id: "abogado", label: "Mi Abogado Patrocinador", icon: User },
    { id: "ia", label: "Asistente Jurídico IA", icon: Sparkles, badge: "24/7", badgeColor: "blue" },
  ];

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiAnswer(
        `Como miembro activo de la Membresía NexoLegal, su consulta sobre "${aiQuestion}" cuenta con amparo preventivo. Según el Código Orgánico General de Procesos (COGEP) y la normativa ecuatoriana, usted tiene derecho a requerir la mediación previa o la interposición de una medida preventiva sin costo procesal extra. Su letrado patrocinador ha recibido esta consulta para ratificar la estrategia.`
      );
      setAiLoading(false);
    }, 700);
  };

  const filteredCases = userCases.filter((c) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      c.id.includes(searchTerm) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      caseFilter === "todos"
        ? true
        : caseFilter === "audiencia"
        ? c.status === "Audiencia Convocada"
        : caseFilter === "tramite"
        ? c.status === "En Trámite"
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <PortalAppShell
      portalTitle="NexoLegal Clientes"
      portalBadge="CLIENTE"
      userName="Roberto Andrade C."
      userRole="Cliente Titular · Membresía Familiar"
      userAvatar="RA"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as UserTab)}
      searchValue={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Buscar en mis expedientes o documentos..."
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#0D141F] text-white px-5 py-3 rounded-2xl border border-[#00A9A3]/60 shadow-2xl flex items-center gap-3 animate-in fade-in duration-200">
          <CheckCircle2 size={18} className="text-[#38DFD8]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* ─── TAB 1: MIS JUICIOS Y CAUSAS ─────────────────────────────── */}
      {activeTab === "casos" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="EXPEDIENTES ACTIVOS • CONEXIÓN JUDICIAL SATJE"
            title="Expedientes en Litigio y Causas Familiares"
            subtitle="SEGUIMIENTO DE ACTOS PROCESALES, CITACIONES Y PRÓXIMAS AUDIENCIAS."
            filters={[
              { id: "todos", label: "TODOS (2)" },
              { id: "audiencia", label: "AUDIENCIA CONVOCADA" },
              { id: "tramite", label: "EN TRÁMITE" },
            ]}
            activeFilter={caseFilter}
            onFilterChange={setCaseFilter}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {filteredCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className="p-5 sm:p-6 rounded-3xl border border-[#1E293B] hover:border-blue-500/50 bg-[#0D141F] shadow-xl transition-all cursor-pointer space-y-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E293B]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {c.type}
                      </span>
                      <strong className="text-xs font-mono text-white">{c.id}</strong>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        c.status === "Audiencia Convocada"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                          : "bg-[#00A9A3]/15 text-[#38DFD8] border border-[#00A9A3]/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{c.court}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#080D15] border border-[#1E293B] text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Abogado Patrocinador</span>
                      <span className="text-slate-200 font-semibold">{c.lawyer}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono text-slate-500 block">Próximo Hito</span>
                      <span className="text-amber-400 font-mono font-bold">{c.hearingDate || "En despacho"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar resumen de suscripción */}
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#38DFD8]">PLAN FAMILIAR</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00A9A3]/20 text-[#38DFD8]">
                    ACTIVO
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{subscription.price}</p>
                  <p className="text-xs text-slate-400 mt-1">Renovación: {subscription.renewsOn}</p>
                </div>
                <div className="pt-2 border-t border-[#1E293B] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Consultas restantes:</span>
                    <strong className="text-white font-mono">{subscription.consultationsLeft} este mes</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Descuento en litigios:</span>
                    <strong className="text-[#38DFD8] font-bold">25% Bonificado</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(true)}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Ver Factura SRI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 2: MEMBRESÍA ────────────────────────────────────────── */}
      {activeTab === "membresia" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="PLAN DE COBERTURA • ASISTENCIA PREVENTIVA"
            title="Membresía Legal Familiar Integral"
            subtitle="CONSULTAS ILIMITADAS, REVISIÓN DE CONTRATOS Y 25% DE DESCUENTO EN LITIGIOS."
            filters={[
              { id: "activa", label: "ESTADO: ACTIVA" },
              { id: "beneficios", label: "BENEFICIOS" },
              { id: "factura", label: "FACTURACIÓN SRI" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4">
              <h3 className="font-bold text-white text-base">Beneficios de su Plan</h3>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#38DFD8]" />
                  <span>4 consultas preventivas mensuales presenciales o por Zoom</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#38DFD8]" />
                  <span>Revisión ilimitada de contratos civiles, arriendos y laborales</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#38DFD8]" />
                  <span>25% de bonificación en patrocinio de juicios ordinarios</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4">
              <h3 className="font-bold text-white text-base">Facturación Electrónica SRI</h3>
              <p className="text-xs text-slate-400">
                Factura mensual emitida con RUC/Cédula para deducción del Impuesto a la Renta de Gastos Personales (Leyes del Ecuador).
              </p>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Descargar Comprobante Electrónico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 3: ACADEMIA ─────────────────────────────────────────── */}
      {activeTab === "academia" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="EDUCACIÓN JURÍDICA • DERECHOS CIUDADANOS"
            title="Academia y Guías Prácticas de Derecho"
            subtitle="CÁPSULAS Y DOCUMENTOS DESCARGABLES PARA DEFENDER SUS DERECHOS PATRIMONIALES."
            filters={[
              { id: "civil", label: "CIVIL & BIENES" },
              { id: "laboral", label: "LABORAL" },
              { id: "familia", label: "FAMILIA & HERENCIAS" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Guía COGEP: Prescripción de Inmuebles en Ecuador",
                duration: "14 minutos",
                tag: "Derecho Civil",
              },
              {
                title: "Cómo calcular la Liquidación y Finiquito Laboral",
                duration: "18 minutos",
                tag: "Laboral",
              },
              {
                title: "Testamentos y Posesión Efectiva sin Conflictos",
                duration: "22 minutos",
                tag: "Familia",
              },
            ].map((vid, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-3 hover:border-blue-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold">
                    {vid.tag}
                  </span>
                  <h4 className="font-bold text-sm text-white mt-1">{vid.title}</h4>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">{vid.duration}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(vid)}
                  className="w-full py-2 rounded-xl bg-[#080D15] hover:bg-[#131C2B] border border-[#1E293B] text-white font-semibold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                >
                  <Play size={14} className="text-blue-400" />
                  <span>Reproducir Clase</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── TAB 4: MI ABOGADO ───────────────────────────────────────── */}
      {activeTab === "abogado" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <DidacticHeaderBanner
            kicker="CUERPO LETRADO • PATROCINIO ASIGNADO"
            title="Mi Abogado Patrocinador de Confianza"
            subtitle="CANAL DIRECTO CON SU LETRADO ASIGNADO PARA REVISIÓN DE CASOS Y ESTRATEGIA."
            filters={[
              { id: "perfil", label: "PERFIL PROFESIONAL" },
              { id: "contacto", label: "CONTACTO DIRECTO" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-[#00A9A3] text-white font-black text-sm flex items-center justify-center shadow-lg">
                  DA
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Abogado patrocinador</h3>
                  <p className="text-xs text-blue-400 font-semibold">Socio Litigante / Especialista COGEP</p>
                  <p className="text-[10px] text-slate-400">Casillero Judicial No. 172910 SATJE Quito</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#1E293B] space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone size={14} className="text-blue-400" />
                  <span>+593 99 722 4453</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail size={14} className="text-blue-400" />
                </div>
              </div>

              <a
                href="https://wa.me/593997224453?text=Hola,%20le%20escribo%20desde%20el%20Portal%20Cliente%20de%20NexoLegal."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#00A9A3] hover:bg-[#008f8a] text-[#070C14] font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <MessageSquare size={14} />
                <span>Escribir por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ─── TAB 5: ASISTENTE IA ─────────────────────────────────────── */}
      {activeTab === "ia" && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl">
          <DidacticHeaderBanner
            kicker="CONSULTA PREVENTIVA • ASISTENTE LEGAL IA"
            title="Asistente Jurídico Inteligente 24/7"
            subtitle="ORIENTACIÓN NORMATIVA SEGÚN EL COGEP, CÓDIGO CIVIL Y NORMAS DEL ECUADOR."
            filters={[
              { id: "consulta", label: "CONSULTA EN VIVO" },
              { id: "historial", label: "HISTORIAL" },
            ]}
          />

          <div className="p-6 rounded-3xl bg-[#0D141F] border border-[#1E293B] shadow-2xl space-y-4">
            <form onSubmit={handleAskAI} className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Escriba su duda o situación jurídica:
              </label>
              <textarea
                rows={3}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ejemplo: ¿Cuánto tiempo tengo para contestar un desahucio de local comercial?"
                className="w-full p-4 rounded-2xl bg-[#080D15] border border-[#1E293B] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-600/30"
                >
                  <Send size={14} />
                  <span>{aiLoading ? "Consultando normas..." : "Enviar Consulta"}</span>
                </button>
              </div>
            </form>

            {aiAnswer && (
              <div className="p-4 rounded-2xl bg-[#080D15] border border-blue-500/30 space-y-2 text-xs animate-in fade-in">
                <span className="text-[10px] font-mono uppercase text-[#38DFD8] font-bold flex items-center gap-1.5">
                  <Sparkles size={13} />
                  <span>Orientación Jurídica Preliminar (Ecuador)</span>
                </span>
                <p className="text-slate-200 leading-relaxed">{aiAnswer}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modales */}
      <UserCaseDetailModal
        caseData={selectedCase}
        onClose={() => setSelectedCase(null)}
        onDownload={(name) => showToast(`Descargando documento: ${name}`)}
      />

      <UserInvoiceModal
        subscription={subscription}
        onClose={() => setShowInvoiceModal(false)}
        onDownload={() => {
          setShowInvoiceModal(false);
          showToast("Descargando factura electrónica autorizada por el SRI.");
        }}
      />

      <UserVideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </PortalAppShell>
  );
}
