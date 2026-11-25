"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Eye,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Scale,
  Zap,
  Pause,
  Play,
  Globe2,
  Link as LinkIcon,
} from "lucide-react";

export interface PrincipleItem {
  id: number;
  title: string;
  category: string;
  content: string;
  energy: number;
  icon: typeof Target;
  relatedIds: number[];
}

const principlesData: PrincipleItem[] = [
  {
    id: 1,
    title: "Misión",
    category: "PROPÓSITO NACIONAL",
    content:
      "Priorizamos los intereses de nuestros clientes mediante un servicio legal riguroso y una defensa técnica implacable orientada a proteger sus derechos vulnerados, con capacidad de actuación judicial a escala nacional.",
    energy: 98,
    icon: Target,
    relatedIds: [2, 4],
  },
  {
    id: 2,
    title: "Visión",
    category: "HORIZONTE JURÍDICO",
    content:
      "Forjamos un camino que proteja sus intereses, adaptándose a las continuas exigencias de la realidad. Encaminados a ser el despacho de referencia para empresas y ciudadanos en todas las jurisdicciones del Ecuador.",
    energy: 95,
    icon: Eye,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Talento",
    category: "INNOVACIÓN & LEGALTECH",
    content:
      "Tomamos cada asunto como si fuera el único: lo abordamos desde la formación especializada de élite, la argumentación jurídica de alto nivel y el uso de plataformas LegalTech con seguimiento transparente en tiempo real.",
    energy: 96,
    icon: Sparkles,
    relatedIds: [2, 5],
  },
  {
    id: 4,
    title: "Ética",
    category: "DEONTOLOGÍA INQUEBRANTABLE",
    content:
      "La firma tiene como credo la deontología en nuestras acciones y el ejercicio leal del derecho. Consideramos sagrado e inviolable el secreto profesional (Art. 335 COFJ) y la reserva absoluta de la información.",
    energy: 100,
    icon: ShieldCheck,
    relatedIds: [1, 3],
  },
  {
    id: 5,
    title: "Tenacidad",
    category: "PERSISTENCIA PROCESAL",
    content:
      "Ningún asunto es imposible. Todo puede y debe lucharse con rigor jurídico cuando se trata de la defensa de derechos vulnerados. Sostenemos cada causa con disciplina procesal hasta la última instancia.",
    energy: 99,
    icon: Flame,
    relatedIds: [4, 6],
  },
  {
    id: 6,
    title: "Cobertura",
    category: "ALCANCE NACIONAL & LATAM",
    content:
      "Sede central en el centro financiero y judicial de Quito, con asociados en Guayaquil, Cuenca, Manta y las 24 provincias. Respaldo del ecosistema corporativo de Nexo Talento con proyección en España y Latinoamérica.",
    energy: 97,
    icon: Globe2,
    relatedIds: [1, 5],
  },
];

const ACTIVE_ANGLE = -60;

export default function FirmOrbit() {
  const [activeNodeId, setActiveNodeId] = useState<number>(principlesData[0].id);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const autoRotateRef = useRef(true);
  const rotationRef = useRef(0);
  const resumeRef = useRef<number | null>(null);
  autoRotateRef.current = autoRotate;

  const radius = isMobile ? 108 : 185;
  const angleStep = 360 / principlesData.length;

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setAutoRotate(false);
      autoRotateRef.current = false;
      return () => window.removeEventListener("resize", checkMobile);
    }

    let frame: number;
    let last = performance.now();

    const animate = (time: number) => {
      const dt = Math.min(time - last, 64);
      last = time;
      const previous = rotationRef.current;
      let next = previous;
      const target = targetRef.current;

      if (target !== null) {
        const delta = ((target - previous + 540) % 360) - 180;
        if (Math.abs(delta) < 0.2) {
          next = ((target % 360) + 360) % 360;
          targetRef.current = null;
          if (resumeRef.current) window.clearTimeout(resumeRef.current);
          resumeRef.current = window.setTimeout(() => setAutoRotate(true), 3000);
        } else {
          next = (((previous + delta * (1 - Math.exp(-dt / 130))) % 360) + 360) % 360;
        }
      } else if (autoRotateRef.current) {
        next = (previous + (10 * dt) / 1000) % 360;
      }

      if (next !== previous) {
        rotationRef.current = next;
        setRotationAngle(next);
      }
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", checkMobile);
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    };
  }, []);

  // Sincronizar tarjeta con el nodo que apunta al ángulo activo durante rotación
  useEffect(() => {
    if (!autoRotate || targetRef.current !== null) return;

    let closestId = principlesData[0].id;
    let minDistance = 360;
    principlesData.forEach((item, index) => {
      const angle = (((index * angleStep + rotationAngle) % 360) + 360) % 360;
      const distance = Math.abs(((angle - ACTIVE_ANGLE + 540) % 360) - 180);
      if (distance < minDistance) {
        minDistance = distance;
        closestId = item.id;
      }
    });

    if (activeNodeId !== closestId) setActiveNodeId(closestId);
  }, [rotationAngle, autoRotate, activeNodeId, angleStep]);

  const toggleItem = (id: number) => {
    const itemIndex = principlesData.findIndex((item) => item.id === id);
    setActiveNodeId(id);
    if (itemIndex !== -1) {
      targetRef.current = (((ACTIVE_ANGLE - itemIndex * angleStep) % 360) + 360) % 360;
    }

    setAutoRotate(false);
    autoRotateRef.current = false;
    if (resumeRef.current) window.clearTimeout(resumeRef.current);

    if (window.innerWidth < 1024 && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + (isMounted ? rotationAngle : 0)) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = Math.round(radius * Math.cos(radian) * 10) / 10;
    const y = Math.round(radius * Math.sin(radian) * 10) / 10;

    const zIndex = Math.round(15 + 10 * Math.cos(radian));
    const opacity = Math.round(Math.max(0.65, Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2))) * 100) / 100;

    return { x, y, angle, zIndex, opacity };
  };

  const activeItem = principlesData.find((t) => t.id === activeNodeId) || principlesData[0];
  const ActiveIcon = activeItem.icon;

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 py-4 select-none"
    >
      {/* ─── 1. COLUMNA IZQUIERDA: RELOJ / ÓRBITA RADIAL CON GIRO HORARIO ── */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center min-h-[360px] sm:min-h-[440px] lg:min-h-[500px]">
        {/* Botón Pausa / Reanudar */}
        <button
          type="button"
          onClick={() => setAutoRotate((current) => !current)}
          className="absolute right-2 top-0 z-20 inline-flex items-center gap-1.5 rounded-full border border-[#00A9A3]/50 bg-[#05162E] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#38DFD8] shadow-lg backdrop-blur hover:bg-[#082041] active:scale-95 transition-all cursor-pointer"
          aria-pressed={!autoRotate}
          aria-label={autoRotate ? "Pausar animación del reloj de principios" : "Reanudar animación del reloj de principios"}
        >
          {autoRotate ? <Pause size={12} /> : <Play size={12} />}
          <span>{autoRotate ? "Pausar Giro" : "Reanudar Giro"}</span>
        </button>

        {/* Halo resplandor sutil */}
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#00A9A3]/10 blur-3xl pointer-events-none" />

        {/* Anillos concéntricos del reloj */}
        <div
          ref={orbitRef}
          className="relative flex items-center justify-center"
          style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
        >
          {/* Anillo exterior punteado */}
          <div
            className="absolute rounded-full border border-[#00A9A3]/25 border-dashed pointer-events-none"
            style={{ width: radius * 2 + 40, height: radius * 2 + 40 }}
          />
          {/* Anillo principal de trayectoria */}
          <div
            className="absolute rounded-full border-2 border-[#00A9A3]/40 shadow-[0_0_30px_rgba(0,169,163,0.15)] pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          />
          {/* Anillo interior */}
          <div
            className="absolute rounded-full border border-[#00A9A3]/20 pointer-events-none"
            style={{ width: radius * 1.3, height: radius * 1.3 }}
          />

          {/* Núcleo Central: Sello de Autoridad NexoLegal */}
          <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#05162E] via-[#082041] to-[#030D1C] flex items-center justify-center z-10 shadow-[0_0_40px_rgba(0,169,163,0.35)] border-2 border-[#00A9A3]/70">
            <div className="absolute w-[120%] h-[120%] rounded-full border border-[#00A9A3]/30 animate-ping opacity-50 pointer-events-none" />
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#05162E] shadow-inner flex flex-col items-center justify-center border border-[#00A9A3]/40 text-[#38DFD8]">
              <Scale size={22} className="animate-pulse" />
              <span className="text-[9px] font-sans font-black tracking-wider uppercase text-white mt-0.5">
                NEXO<span className="text-[#00A9A3]">LEGAL</span>
              </span>
              <span className="text-[7px] font-mono tracking-widest uppercase text-[#38DFD8]">
                ECUADOR
              </span>
            </div>
          </div>

          {/* Nodos Orbitales Giratorios (Sentido Horario de Reloj) */}
          {principlesData.map((item, index) => {
            const position = calculateNodePosition(index, principlesData.length);
            const isActive = activeNodeId === item.id;
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.id}
                suppressHydrationWarning
                className="absolute transition-transform duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38DFD8]/70 rounded-full"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px) scale(${isActive ? (isMobile ? 1.15 : 1.25) : 1})`,
                  zIndex: isActive ? 35 : position.zIndex,
                  opacity: isActive ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                aria-label={`Seleccionar principio: ${item.title}`}
                aria-pressed={isActive}
              >
                {/* Resplandor activo */}
                {isActive && (
                  <div
                    className="absolute rounded-full -inset-3 bg-[#00A9A3]/35 animate-pulse blur-sm pointer-events-none"
                  />
                )}

                {/* Esfera / Contenedor del Icono */}
                <div
                  className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-gradient-to-tr from-[#00A9A3] via-[#38DFD8] to-[#00A9A3] text-[#05162E] border-2 border-white ring-4 ring-[#00A9A3]/40 shadow-[0_0_25px_rgba(0,169,163,0.6)]"
                      : "bg-[#05162E] text-[#38DFD8] border-2 border-[#00A9A3]/50 hover:border-[#00A9A3] hover:bg-[#082041]"
                  }`}
                >
                  <Icon
                    size={isActive ? 20 : 16}
                    strokeWidth={isActive ? 2.3 : 1.8}
                    className="transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Etiqueta del nodo: Altísima Legibilidad en Modo Claro y Oscuro */}
                <div
                  className={`absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-xs font-black tracking-wider uppercase transition-all duration-300 px-1.5 sm:px-2 py-0.5 rounded-md ${
                    isActive
                      ? "text-white bg-[#00A9A3] shadow-md scale-105"
                      : "text-[#082041] dark:text-slate-200 bg-white/90 dark:bg-[#05162E]/90 border border-slate-300 dark:border-slate-700 shadow-xs group-hover:text-[#00A9A3]"
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. COLUMNA DERECHA: PANEL INFORMATIVO DETALLADO (APPLE LUXURY) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start max-w-xl">
        <div
          ref={cardRef}
          key={activeItem.id}
          className="w-full min-h-[350px] flex flex-col justify-between bg-gradient-to-br from-[#05162E] via-[#082041] to-[#030D1C] rounded-3xl p-7 sm:p-9 shadow-2xl border-2 border-[#00A9A3]/40 relative overflow-hidden text-white transition-all duration-300"
        >
          {/* Brillo ambiental */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-[#00A9A3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            {/* Cabecera del Principio Activo */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#00A9A3] to-[#38DFD8] text-[#05162E] flex items-center justify-center border border-white/30 shadow-lg shrink-0 p-3">
                <ActiveIcon size={26} strokeWidth={2.2} />
              </div>
              <div>
                <span className="inline-block px-3 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/40 mb-1">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Párrafo descriptivo del principio */}
            <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed font-light">
              {activeItem.content}
            </p>

            <div className="bg-black/35 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <span className="flex items-center font-bold text-[#38DFD8] uppercase tracking-wider text-[11px]">
                <Zap size={14} className="mr-1.5 text-[#00A9A3]" />
                Principio rector del servicio profesional
              </span>
              <span className="text-[10px] font-mono font-bold text-[#00A9A3]">
                Calidad A+
              </span>
            </div>

            {/* Principios Conectados (Clickables que mueven la órbita de reloj) */}
            {activeItem.relatedIds.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center gap-1.5 mb-2 text-slate-300 text-xs font-semibold">
                  <LinkIcon size={13} className="text-[#00A9A3]" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#38DFD8]">
                    Principios Conectados:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeItem.relatedIds.map((relId) => {
                    const related = principlesData.find((p) => p.id === relId);
                    if (!related) return null;
                    return (
                      <button
                        key={relId}
                        type="button"
                        onClick={() => toggleItem(relId)}
                        className="px-3.5 py-1.5 rounded-xl border border-[#00A9A3]/40 bg-white/5 hover:bg-[#00A9A3]/20 hover:border-[#00A9A3] text-white text-xs font-semibold transition-all active:scale-95 flex items-center gap-1.5 group cursor-pointer shadow-sm"
                      >
                        <span>{related.title}</span>
                        <ArrowRight size={12} className="text-[#38DFD8] group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
