import Link from "next/link";
import { ArrowRight, Lock, ExternalLink } from "lucide-react";
import { METHOD_STEPS } from "./HomeData";

export default function MethodologySection() {
  return (
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
          {METHOD_STEPS.map((m) => (
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
  );
}
