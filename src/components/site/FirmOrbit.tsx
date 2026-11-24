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
      "Priorizamos los intereses de nuestros clientes mediante un servicio legal riguroso y una defensa técnica orientada a proteger sus derechos vulnerados, con capacidad de actuación judicial a escala nacional.",
    energy: 98,
    icon: Target,
    relatedIds: [2, 4],
  },
  {
    id: 2,
    title: "Visión",
    category: "HORIZONTE JURÍDICO",
    content:
      "Forjamos un camino que proteja sus intereses, adaptándose a las continuas exigencias de la realidad. Aspiramos a ser el despacho de referencia para empresas y ciudadanos en todas las jurisdicciones del Ecuador.",
    energy: 95,
    icon: Eye,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Talento",
    category: "INNOVACIÓN & LEGALTECH",
    content:
      "Tomamos cada asunto como si fuera el único: lo abordamos desde la formación especializada, la argumentación jurídica de alto nivel y el uso de plataformas LegalTech con seguimiento transparente en tiempo real.",
    energy: 96,
    icon: Sparkles,
    relatedIds: [2, 5],
  },
  {
    id: 4,
    title: "Ética",
    category: "DEONTOLOGÍA INQUEBRANTABLE",
    content:
      "La firma tiene como credo la deontología en nuestras acciones y el ejercicio leal del derecho. Consideramos sagrado el secreto profesional y la reserva absoluta de la información de cada cliente.",
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
    relatedIds: [4, 1],
  },
];

const ACTIVE_ANGLE = -60;

export default function FirmOrbit() {
  const [activeNodeId, setActiveNodeId] = useState<number>(principlesData[0].id);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<number | null>(null);
  const autoRotateRef = useRef(true);
  const rotationRef = useRef(0);
  const resumeRef = useRef<number | null>(null);
  autoRotateRef.current = autoRotate;

  // El nodo elegido se acomoda a la 1 en punto (-60 grados) frente a la tarjeta informativa
  const radius = 200;
  const angleStep = 360 / principlesData.length;

  useEffect(() => {
    setIsMounted(true);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setAutoRotate(false);
      autoRotateRef.current = false;
      return;
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
        // Rotación animada con momentum hacia el nodo seleccionado
        const delta = ((target - previous + 540) % 360) - 180;
        if (Math.abs(delta) < 0.15) {
          next = ((target % 360) + 360) % 360;
          targetRef.current = null;
          if (resumeRef.current) window.clearTimeout(resumeRef.current);
          resumeRef.current = window.setTimeout(() => setAutoRotate(true), 2500);
        } else {
          next = (((previous + delta * (1 - Math.exp(-dt / 140))) % 360) + 360) % 360;
        }
      } else if (autoRotateRef.current) {
        // Giro continuo en el sentido de las agujas del reloj (sentido horario)
        next = (previous + (12.5 * dt) / 1000) % 360;
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
      if (resumeRef.current) window.clearTimeout(resumeRef.current);
    };
  }, []);

  // Actualizar la tarjeta derecha al nodo más cercano al ángulo activo durante la rotación automática
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
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + (isMounted ? rotationAngle : 0)) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = Math.round(radius * Math.cos(radian) * 10) / 10;
    const y = Math.round(radius * Math.sin(radian) * 10) / 10;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.round(Math.max(0.4, Math.min(1, 0.45 + 0.55 * ((1 + Math.sin(radian)) / 2))) * 100) / 100;

    return { x, y, angle, zIndex, opacity };
  };

  const activeItem = principlesData.find((t) => t.id === activeNodeId) || principlesData[0];
  const ActiveIcon = activeItem.icon;

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 py-6 select-none"
    >
      {/* ─── 1. COLUMNA IZQUIERDA: ÓRBITA RADIAL CON GIRO HORARIO ─────── */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center h-[360px] sm:h-[440px] lg:h-[540px]">
        <button
          type="button"
          onClick={() => setAutoRotate((current) => !current)}
          className="absolute right-1 top-1 z-[210] inline-flex items-center gap-1.5 rounded-full border border-[#00A9A3]/40 bg-[#05162E]/90 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#38DFD8] shadow-md backdrop-blur"
          aria-pressed={!autoRotate}
          aria-label={autoRotate ? "Pausar animación de principios" : "Reanudar animación de principios"}
        >
          {autoRotate ? <Pause size={13} /> : <Play size={13} />}
          {autoRotate ? "Pausar" : "Reanudar"}
        </button>
        <div
          ref={orbitRef}
          className="absolute flex items-center justify-center w-full h-full scale-[.72] sm:scale-90 lg:scale-100"
          style={{ perspective: "1000px" }}
        >
          {/* Anillos orbitales decorativos con brillo dorado */}
          <div
            className="absolute rounded-full border border-[#00A9A3]/25 border-dashed pointer-events-none"
            style={{ width: radius * 2.5, height: radius * 2.5 }}
          />
          <div
            className="absolute rounded-full border-2 border-[#00A9A3]/40 shadow-[0_0_40px_rgba(0,169,163,0.12)] pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          />
          <div
            className="absolute rounded-full border border-[#00A9A3]/20 pointer-events-none"
            style={{ width: radius * 1.4, height: radius * 1.4 }}
          />

          {/* Núcleo Central: Balanza de la Justicia con Resplandor Ámbar */}
          <div className="absolute w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-[#05162E] via-[#082041] to-[#05162E] flex items-center justify-center z-10 shadow-[0_0_50px_rgba(0,169,163,0.35)] border-2 border-[#00A9A3]/60">
            <div className="absolute w-[125%] h-[125%] rounded-full border border-[#00A9A3]/30 animate-ping opacity-60 pointer-events-none" />
            <div
              className="absolute w-[150%] h-[150%] rounded-full border border-[#00A9A3]/20 animate-ping opacity-40 pointer-events-none"
              style={{ animationDelay: "0.6s" }}
            />
            <div className="w-14 h-14 rounded-full bg-[#05162E] shadow-inner flex flex-col items-center justify-center border border-[#00A9A3]/40 text-[#38DFD8]">
              <Scale size={24} className="animate-pulse" />
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-[#00A9A3] -mt-0.5">
                Nexo
              </span>
            </div>
          </div>

          {/* Nodos Orbitales Giratorios */}
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
                  transform: `translate(${position.x}px, ${position.y}px) scale(${isActive ? 1.25 : 1})`,
                  zIndex: isActive ? 200 : position.zIndex,
                  opacity: isActive ? 1 : position.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
                aria-label={`Seleccionar principio: ${item.title}`}
                aria-pressed={isActive}
              >
                {/* Resplandor radial del nodo */}
                <div
                  className={`absolute rounded-full -inset-4 transition-opacity duration-500 ${
                    isActive ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,169,163,0.35) 0%, rgba(0,0,0,0) 70%)`,
                    width: `${item.energy * 0.7 + 60}px`,
                    height: `${item.energy * 0.7 + 60}px`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />

                {/* Esfera / Contenedor del Icono */}
                <div
                  className={`relative w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                    isActive
                      ? "bg-gradient-to-tr from-[#00A9A3] via-[#38DFD8] to-[#00A9A3] text-[#05162E] border-2 border-white ring-4 ring-[#00A9A3]/40 shadow-[0_0_30px_rgba(0,169,163,0.5)]"
                      : "bg-[#05162E] text-[#38DFD8] border-2 border-[#00A9A3]/40 hover:border-[#00A9A3] hover:bg-[#082041]"
                  }`}
                >
                  <Icon
                    size={isActive ? 26 : 20}
                    strokeWidth={isActive ? 2.2 : 1.7}
                    className="transition-transform group-hover:scale-110"
                  />
                </div>

                {/* Etiqueta del nodo */}
                <div
                  className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#00A9A3] font-serif drop-shadow-md scale-110"
                      : "text-slate-300/80 group-hover:text-white"
                  }`}
                >
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── 2. COLUMNA DERECHA: PANEL INFORMATIVO INTERACTIVO (APPLE LUXURY) ─ */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start max-w-xl">
        <div
          ref={cardRef}
          key={activeItem.id}
          className="w-full min-h-[340px] flex flex-col justify-between bg-gradient-to-br from-[#05162E] via-[#05162E] to-[#05162E] rounded-3xl p-7 lg:p-9 shadow-2xl border-2 border-[#00A9A3]/40 relative overflow-hidden text-white transition-all duration-300"
        >
          {/* Brillo ambiental de fondo */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-[#00A9A3]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            {/* Cabecera del Principio Activo */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#00A9A3] to-[#00A9A3] text-white flex items-center justify-center border border-white/20 shadow-md shrink-0 p-3">
                <ActiveIcon size={26} strokeWidth={2} />
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-widest uppercase rounded-full bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/40 mb-1">
                  {activeItem.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
                  {activeItem.title}
                </h3>
              </div>
            </div>

            {/* Párrafo descriptivo del principio */}
            <p className="text-sm lg:text-base text-cyan-100/90 leading-relaxed font-light">
              {activeItem.content}
            </p>

            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <span className="flex items-center font-bold text-[#38DFD8] uppercase tracking-wider text-[11px]">
                <Zap size={14} className="mr-1.5 text-[#00A9A3]" />
                Principio rector del servicio profesional
              </span>
            </div>

            {/* Principios Conectados (Clickables que mueven la órbita) */}
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
                        <ArrowRight size={12} className="text-[#00A9A3] group-hover:translate-x-1 transition-transform" />
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
