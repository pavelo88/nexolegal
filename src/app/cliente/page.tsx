"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  AlertCircle,
  HelpCircle,
  LogOut,
  Bell,
  Send,
  PlusCircle,
} from "lucide-react";

interface JudicialCase {
  id: string;
  number: string;
  title: string;
  type: string;
  court: string;
  status: "En trámite" | "Audiencia convocada" | "Sentencia favorable" | "En apelación";
  lawyer: string;
  nextEvent: string;
  nextEventDate: string;
  unreadDocs: number;
}

const clientCases: JudicialCase[] = [
  {
    id: "c-01",
    number: "17203-2026-00481",
    title: "Juicio Ordinario de Prescripción Adquisitiva de Dominio",
    type: "Civil & Tierras",
    court: "Unidad Judicial Civil de Quitumbe - Quito",
    status: "Audiencia convocada",
    lawyer: "Abogado patrocinador",
    nextEvent: "Audiencia Preliminar de Conciliación",
    nextEventDate: "29 de Octubre, 2026 · 09:30 AM",
    unreadDocs: 2,
  },
  {
    id: "c-02",
    number: "17981-2025-01892",
    title: "Acción de Protección Constitucional por Vulneración de Derechos",
    type: "Constitucional",
    court: "Corte Provincial de Justicia de Pichincha",
    status: "En trámite",
    lawyer: "Dra. Valeria Santamaría",
    nextEvent: "Evacuación de Prueba Pericial",
    nextEventDate: "05 de Noviembre, 2026 · 11:00 AM",
    unreadDocs: 1,
  },
];

export default function ClientePortalPage() {
  const [activeTab, setActiveTab] = useState<"casos" | "abogado" | "documentos" | "consultas">("casos");
  const [selectedCase, setSelectedCase] = useState<JudicialCase>(clientCases[0]);
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiAnswer(
        `En el juicio ${selectedCase.number} sobre "${selectedCase.title}", la última providencia emitida por la Unidad Judicial convoca a las partes para el día ${selectedCase.nextEventDate}. Su abogado patrocinador ya presentó el anuncio probatorio pericial y la contestación conforme al Art. 294 del COGEP. No requiere realizar ningún pago de tasas judiciales en esta fase.`
      );
      setAiLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#17211f] flex flex-col font-sans">
      {/* Top Navbar del Portal Cliente */}
      <header className="sticky top-0 z-40 bg-[#082041] text-white border-b border-[#00A9A3]/30 px-4 sm:px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-[#082041] text-[#38DFD8] border border-[#00A9A3]/40 flex items-center justify-center">
                <Scale size={18} />
              </div>
              <div>
                <span className="font-bold text-sm tracking-wider text-white">NexoLegal</span>
                <span className="block text-[9px] uppercase tracking-widest text-[#38DFD8]">Portal del Cliente</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-white/10 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-mono text-[11px]">SATJE Conectado (Quito)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-200">
              <User size={14} className="text-[#38DFD8]" />
              <span className="font-medium hidden sm:inline">Roberto Andrade C.</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00A9A3]/30 text-[#38DFD8]">
                Cliente VIP
              </span>
            </div>
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Sub-Header con Tabs Claras de Navegación del Cliente */}
      <div className="bg-white border-b border-[#e6e0d6] px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("casos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "casos"
                  ? "bg-[#082041] text-white shadow-sm"
                  : "text-[#55605a] hover:text-[#17211f] hover:bg-stone-100"
              }`}
            >
              <FolderKanban size={15} />
              <span>Mis Juicios &amp; Causas ({clientCases.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("abogado")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "abogado"
                  ? "bg-[#082041] text-white shadow-sm"
                  : "text-[#55605a] hover:text-[#17211f] hover:bg-stone-100"
              }`}
            >
              <User size={15} />
              <span>Mi Abogado Patrocinador</span>
            </button>

            <button
              onClick={() => setActiveTab("documentos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "documentos"
                  ? "bg-[#082041] text-white shadow-sm"
                  : "text-[#55605a] hover:text-[#17211f] hover:bg-stone-100"
              }`}
            >
              <FileText size={15} />
              <span>Documentos &amp; Providencias</span>
            </button>

            <button
              onClick={() => setActiveTab("consultas")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "consultas"
                  ? "bg-[#082041] text-white shadow-sm"
                  : "text-[#55605a] hover:text-[#17211f] hover:bg-stone-100"
              }`}
            >
              <Sparkles size={15} className="text-[#00A9A3]" />
              <span>Asistente IA de mi Causa</span>
            </button>
          </nav>

          <a
            href="https://wa.me/593997224453?text=Hola%20NexoLegal,%20deseo%20consultar%20sobre%20mi%20expediente"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shrink-0 active:scale-95 transition-all"
          >
            <Phone size={13} />
            <span className="hidden sm:inline">WhatsApp Urgente</span>
          </a>
        </div>
      </div>

      {/* Contenido Principal del Portal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner de Estado General */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#082041] to-[#0f2824] text-white shadow-lg border border-[#00A9A3]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#38DFD8]">
              Expediente Digital Activo
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Causa Nº {selectedCase.number}
            </h1>
            <p className="text-xs sm:text-sm text-cyan-100/80">
              {selectedCase.title} · {selectedCase.court}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/15 text-center">
              <span className="text-[10px] uppercase text-cyan-200 block">Próxima Diligencia</span>
              <strong className="text-xs sm:text-sm text-[#38DFD8] font-bold block">
                {selectedCase.nextEventDate}
              </strong>
            </div>
          </div>
        </div>

        {/* TAB 1: MIS JUICIOS Y CAUSAS */}
        {activeTab === "casos" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lista de Causas (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-[#17211f] flex items-center gap-2">
                <FolderKanban size={18} className="text-[#00A9A3]" />
                <span>Expedientes en Trámite en la Función Judicial</span>
              </h2>

              {clientCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCase(c)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white shadow-sm ${
                    selectedCase.id === c.id
                      ? "border-[#00A9A3] ring-2 ring-[#00A9A3]/20"
                      : "border-[#e6e0d6] hover:border-[#00A9A3]/50"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0ebe3]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#082041]/10 text-[#082041]">
                        Juicio Ordinario
                      </span>
                      <strong className="text-sm font-mono text-[#17211f]">{c.number}</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20 self-start sm:self-auto">
                      {c.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-bold font-serif text-[#17211f]">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#6e7771] mt-1">{c.court}</p>

                  <div className="mt-4 pt-3 border-t border-[#f0ebe3] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-[#55605a]">
                      <User size={14} className="text-[#00A9A3]" />
                      <span>{c.lawyer}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium">
                      <Clock size={14} />
                      <span>{c.nextEvent}: {c.nextEventDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ficha Resumen del Caso Seleccionado (1 col) */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#17211f] flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#00A9A3]" />
                <span>Estado de Patrocinio</span>
              </h2>

              <div className="p-6 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#082041] text-[#38DFD8] flex items-center justify-center font-bold text-base shadow-sm">
                    DA
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17211f]">{selectedCase.lawyer}</h3>
                    <p className="text-xs text-[#6e7771]">Magíster en Derecho Procesal</p>
                    <span className="text-[10px] text-emerald-600 font-semibold">● Disponible en despacho</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#f0ebe3] text-xs">
                  <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                    <span className="text-[#6e7771]">Número SATJE:</span>
                    <span className="font-mono font-bold text-[#17211f]">{selectedCase.number}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                    <span className="text-[#6e7771]">Última Providencia:</span>
                    <span className="font-semibold text-emerald-700">Notificada ayer</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#f0ebe3]">
                    <span className="text-[#6e7771]">Honorarios:</span>
                    <span className="font-semibold text-[#17211f]">Al día (Etapa 2 cubierta)</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setActiveTab("consultas")}
                    className="w-full min-h-11 py-2.5 rounded-xl bg-[#082041] hover:bg-[#082041] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Sparkles size={14} className="text-[#38DFD8]" />
                    <span>Consultar a la IA sobre esta Causa</span>
                  </button>
                  <a
                    href="https://wa.me/593997224453"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl border border-[#d6cfc5] hover:border-[#00A9A3] text-xs font-semibold text-[#17211f] text-center transition-all"
                  >
                    Contactar al Letrado
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MI ABOGADO PATROCINADOR */}
        {activeTab === "abogado" && (
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-[#082041] text-[#38DFD8] flex items-center justify-center text-3xl font-serif font-bold shadow-md">
                DA
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00A9A3]">
                  Abogado Principal Asignado
                </span>
                <h2 className="text-2xl font-bold font-serif text-[#17211f]">
                  Abogado patrocinador
                </h2>
                <p className="text-sm text-[#55605a]">
                  Matrícula Foro de Abogados Pichincha Nº 17-2012-482 · Especialista en Litigación Oral
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Patrocinio Activo
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#082041]/10 text-[#082041] text-[10px] font-bold">
                    Sede Quito
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] text-xs text-[#55605a] leading-relaxed">
              El letrado patrocinador es responsable de la estrategia probatoria, redacción de minutas y comparecencia a estrados en sus causas activas. Toda comunicación por este portal se encuentra amparada por el sigilo letrado (COFJ Art. 335).
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <a
                href="https://wa.me/593997224453"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50 flex items-center gap-3 transition-colors text-emerald-900 font-bold"
              >
                <Phone size={18} className="text-emerald-600" />
                <span>Mensaje Directo al Abogado</span>
              </a>
              <a
                href="mailto:legal@nexotalento.com"
                className="p-4 rounded-2xl border border-[#e6e0d6] bg-[#faf8f5] hover:bg-white flex items-center gap-3 transition-colors text-[#17211f] font-semibold"
              >
                <Mail size={18} className="text-[#00A9A3]" />
                <span>legal</span><span className="text-[#38DFD8]">&#64;</span><span>nexotalento.com</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTOS Y PROVIDENCIAS */}
        {activeTab === "documentos" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#f0ebe3]">
              <div>
                <h2 className="text-lg font-bold text-[#17211f]">Documentos y Providencias Judiciales</h2>
                <p className="text-xs text-[#6e7771]">Descarga las piezas procesales del expediente {selectedCase.number}</p>
              </div>
              <span className="text-xs font-mono text-[#00A9A3] font-bold">4 Archivos Verificados</span>
            </div>

            <div className="space-y-3">
              {[
                { name: "Providencia Judicial - Convocatoria a Audiencia Preliminar.pdf", date: "24 Octubre 2026", size: "1.4 MB", type: "Providencia Oficial" },
                { name: "Escrito de Anuncio Probatorio y Contestación a la Demanda.pdf", date: "18 Octubre 2026", size: "840 KB", type: "Escrito Letrado" },
                { name: "Demanda Ordinaria y Auto de Calificación Judicial.pdf", date: "02 Septiembre 2026", size: "3.2 MB", type: "Demanda Inicial" },
                { name: "Acta de Mediación Previa y Constancia de Imposibilidad.pdf", date: "15 Agosto 2026", size: "520 KB", type: "Acta Legal" },
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-2xl border border-[#e6e0d6] hover:border-[#00A9A3] transition-colors flex items-center justify-between gap-4 bg-[#faf8f5]">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#082041]/10 text-[#082041] flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-[#00A9A3]" />
                    </div>
                    <div className="min-w-0">
                      <strong className="block text-xs font-bold text-[#17211f] truncate">{doc.name}</strong>
                      <span className="text-[10px] text-[#6e7771]">{doc.type} · {doc.date} · {doc.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Descargando documento seguro: ${doc.name}`)}
                    className="p-2 rounded-xl bg-white border border-[#d6cfc5] hover:border-[#00A9A3] text-[#17211f] transition-all shrink-0 active:scale-95"
                    title="Descargar PDF"
                  >
                    <Download size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ASISTENTE IA DE MI CAUSA */}
        {activeTab === "consultas" && (
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#e6e0d6] shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A9A3]/15 text-[#00A9A3] text-xs font-bold">
                <Sparkles size={14} />
                <span>Explicador Jurídico con Inteligencia Artificial</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17211f]">
                Haz una pregunta sobre tu juicio
              </h2>
              <p className="text-xs text-[#6e7771]">
                Nuestra IA procesa los términos del COGEP y te explica en lenguaje claro y sencillo qué significa cada notificación.
              </p>
            </div>

            <form onSubmit={handleAskAI} className="space-y-3">
              <textarea
                rows={3}
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                placeholder="Ejemplo: ¿Qué debo hacer para la audiencia del 29 de octubre? ¿Tengo que declarar yo o solo mi abogado?"
                className="w-full p-4 rounded-2xl border border-[#d6cfc5] bg-[#faf8f5] text-xs text-[#17211f] outline-none transition focus:border-[#00A9A3] focus:bg-white focus:ring-2 focus:ring-[#00A9A3]/15"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#717872]">Supervisado por letrados de NexoLegal</span>
                <button
                  type="submit"
                  disabled={aiLoading}
                  className="px-5 py-2.5 rounded-xl bg-[#082041] hover:bg-[#082041] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60"
                >
                  {aiLoading ? "Consultando expediente…" : "Consultar a la IA"}
                  {!aiLoading && <Send size={13} />}
                </button>
              </div>
            </form>

            {aiAnswer && (
              <div className="p-5 rounded-2xl bg-[#faf8f5] border border-[#00A9A3]/40 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[#00A9A3]">
                  <Sparkles size={14} />
                  <span>Respuesta Asistida para Causa {selectedCase.number}:</span>
                </div>
                <p className="text-xs text-[#333e38] leading-relaxed">{aiAnswer}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
