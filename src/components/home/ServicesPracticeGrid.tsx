import { CheckCircle2, ArrowRight } from "lucide-react";
import { LEGAL_SERVICES } from "./HomeData";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function ServicesPracticeGrid() {
  return (
    <section id="servicios" className="py-24 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll className="text-center max-w-3xl mx-auto mb-16">
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
        </RevealOnScroll>

        {/* Grid de 4 Cards de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEGAL_SERVICES.map((srv, index) => {
            const Icon = srv.icon;
            return (
              <RevealOnScroll key={srv.title} delay={index * 0.08}>
                <div className="vis-card-luxury p-7 flex h-full flex-col justify-between group hover:border-[#00A9A3] transition-all">
                  <div>
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
              </RevealOnScroll>
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
            className="vis-interactive-btn px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-all active:scale-95 shadow-xl shadow-[#00A9A3]/30 hover:brightness-110 flex items-center gap-2 relative z-10"
          >
            <span>Solicitar Diagnóstico</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
