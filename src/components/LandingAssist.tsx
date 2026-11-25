"use client";

import { FormEvent, Fragment, useEffect, useState } from "react";
import { Bot, CheckCircle2, MessageCircle, Send, UserCheck, X } from "lucide-react";

function formatCleanText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, lineIdx) => {
    const cleanLine = line.replace(/^\s*[\*\-]\s+/, "• ");
    const parts = cleanLine.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={lineIdx} className={cleanLine.trim() === "" ? "h-2" : "mb-1.5 last:mb-0"}>
        {parts.map((part, partIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={partIdx} className="font-bold text-slate-950 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return <Fragment key={partIdx}>{part.replace(/\*/g, "")}</Fragment>;
        })}
      </p>
    );
  });
}

export default function LandingAssist() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [answer, setAnswer] = useState(
    "Hola. Puedo orientarte de forma informativa sobre trámites y áreas legales en Ecuador. ¿En qué podemos ayudarte hoy?"
  );
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSent, setLeadSent] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-legal-assistant", handleOpen);
    return () => window.removeEventListener("open-legal-assistant", handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function ask(event: FormEvent) {
    event.preventDefault();
    if (!query.trim() || loading) return;
    const currentQ = query.trim();
    setLastQuery(currentQ);
    setLoading(true);
    setLeadSent(null);
    try {
      const response = await fetch("/api/ai/legal-query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQ }),
      });
      const data = await response.json().catch(() => null);
      setAnswer(
        data?.answer ??
          "No pude procesar la consulta en este momento. Escríbenos por WhatsApp o déjanos tus datos para que un abogado te contacte."
      );
      setQuery("");
      setShowLeadForm(true);
    } catch {
      setAnswer(
        "El asistente no está disponible ahora. Puedes escribirnos directamente por WhatsApp o dejarnos tu número para contactarte."
      );
      setShowLeadForm(true);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(event: FormEvent) {
    event.preventDefault();
    if (!leadName.trim() || !leadPhone.trim() || leadSubmitting) return;
    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName.trim(),
          phone: leadPhone.trim(),
          service: "Asistente IA",
          message: lastQuery ? `Consulta IA: ${lastQuery}` : "Solicitud desde Asistente IA",
          source: "ai_assistant",
        }),
      });
      const data = await res.json().catch(() => null);
      setLeadSent(data?.reference || "Registrado");
      setLeadName("");
      setLeadPhone("");
    } catch {
      setLeadSent("Enviado");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <>
      <div className="landing-float-actions hidden md:flex" aria-label="Contacto NexoLegal">
        <a
          className="whatsapp-float"
          href="https://wa.me/593997224453?text=Hola%20NexoLegal,%20quiero%20una%20orientación"
          target="_blank"
          rel="noreferrer"
          aria-label="Escribir por WhatsApp"
        >
          <MessageCircle size={22} />
          <span>WhatsApp</span>
        </a>
        <button
          className="ai-float"
          onClick={() => setOpen(true)}
          aria-label="Abrir asistente jurídico"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Bot size={20} />
          <span>Asistente IA</span>
        </button>
      </div>

      {open && (
        <div
          className="fixed bottom-24 left-4 right-4 md:left-auto md:right-5 md:bottom-24 z-[70] md:w-full md:max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#00A9A3]/35 bg-white dark:bg-[#082041] text-slate-900 dark:text-slate-100 flex flex-col max-h-[78vh]"
          role="dialog"
          aria-label="Asistente informativo NexoLegal"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-[#05162E] text-white border-b border-white/10 shrink-0">
            <div>
              <strong className="block text-sm font-bold">Asistente NexoLegal</strong>
              <small className="block text-[11px] text-[#38DFD8]">Orientación informativa · Ecuador</small>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>

          {/* Answer & CTA */}
          <div className="p-4 overflow-y-auto space-y-3 text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-200">
            <div>{formatCleanText(answer)}</div>

            {/* CTA & Lead Capture */}
            {showLeadForm && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-[#05162E]/80 border border-[#00A9A3]/30 space-y-2.5">
                {leadSent ? (
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>¡Datos recibidos ({leadSent})! Un abogado de NexoLegal te contactará pronto.</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#082041] dark:text-[#38DFD8]">
                      <UserCheck className="w-4 h-4 shrink-0" />
                      <span>¿Quieres que un abogado revise tu caso? Déjanos tus datos:</span>
                    </div>
                    <form onSubmit={submitLead} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Tu nombre"
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#082041] text-slate-900 dark:text-white text-xs outline-none focus:border-[#00A9A3]"
                      />
                      <input
                        type="tel"
                        required
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        placeholder="WhatsApp / Teléfono"
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#082041] text-slate-900 dark:text-white text-xs outline-none focus:border-[#00A9A3]"
                      />
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="sm:col-span-2 py-2 rounded-lg bg-[#00A9A3] hover:brightness-110 text-white font-bold text-xs transition-all cursor-pointer disabled:opacity-60"
                      >
                        {leadSubmitting ? "Enviando..." : "Solicitar contacto de un abogado"}
                      </button>
                    </form>
                  </>
                )}
                <a
                  href={`https://wa.me/593997224453?text=${encodeURIComponent(
                    lastQuery
                      ? `Hola NexoLegal, consulté con el Asistente IA sobre: ${lastQuery}`
                      : "Hola NexoLegal, deseo hablar con un abogado."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#25D366] hover:brightness-105 text-white font-bold text-xs transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Hablar ahora por WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={ask}
            className="flex items-center gap-2 p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#05162E]/60 shrink-0"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué necesitas saber?"
              aria-label="Consulta jurídica"
              className="flex-1 min-w-0 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#082041] text-slate-900 dark:text-white placeholder:text-slate-400 text-xs outline-none focus:border-[#00A9A3]"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Enviar consulta"
              className="w-10 h-10 rounded-xl bg-[#00A9A3] hover:brightness-110 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
          <small className="px-4 pb-2.5 pt-1 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#05162E]/60">
            No reemplaza asesoría profesional ni calcula vencimientos procesales.
          </small>
        </div>
      )}
    </>
  );
}
