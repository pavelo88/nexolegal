"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Target,
  Eye,
  Sparkles,
  ShieldCheck,
  Flame,
  Award,
  ChevronRight,
  Scale,
  Orbit,
} from "lucide-react";

export interface OrbitSphere {
  id: number;
  label: string;
  category: "Propósito" | "Horizonte" | "Valor Central" | "Compromiso";
  title: string;
  description: string;
  points: string[];
  icon: typeof Target;
  badge: string;
  color: string;
}

const spheresData: OrbitSphere[] = [
  {
    id: 1,
    label: "Misión",
    category: "Propósito",
    title: "Misión: Defensa Técnica de Derechos Vulnerados",
    description:
      "Priorizamos sus intereses brindando un servicio legal riguroso y una defensa técnica implacable orientada a la protección de sus derechos vulnerados, con una dimensión y alcance nacional.",
    points: [
      "Defensa procesal en cortes provinciales y nacionales",
      "Prioridad absoluta en el bienestar y seguridad jurídica del patrocinado",
      "Actuación estratégica inmediata en sedes judiciales y fiscales",
    ],
    icon: Target,
    badge: "Propósito Institucional",
    color: "#00A9A3",
  },
  {
    id: 2,
    label: "Visión",
    category: "Horizonte",
    title: "Visión: El Despacho de Referencia en Ecuador",
    description:
      "Forjamos un camino que proteja sus intereses, adaptándose a las continuas exigencias de la realidad. Encaminados en ser el despacho de referencia para empresas y ciudadanos que necesiten defender sus causas en cualquiera de las jurisdicciones en que operamos.",
    points: [
      "Firma jurídica líder en litigio corporativo e individual",
      "Adopción pionera de LegalTech y trazabilidad digital",
      "Presencia consolidada en Quito y cobertura en todo el país",
    ],
    icon: Eye,
    badge: "Visión Estratégica",
    color: "#38DFD8",
  },
  {
    id: 3,
    label: "Talento",
    category: "Valor Central",
    title: "Talento e Innovación",
    description:
      "Tomamos cada asunto como si fuera el único. Nos aproximamos a él desde la formación académica de élite y buscamos su resolución desde el talento y la pericia técnica, estando permanentemente abiertos a la innovación procesal.",
    points: [
      "Formación académica continua en universidades nacionales y europeas",
      "Argumentación jurídica avanzada e investigación de doctrina",
      "Diseño creativo de estrategias para causas de alta complejidad",
    ],
    icon: Sparkles,
    badge: "Rigor Intelectual",
    color: "#6ee7b7",
  },
  {
    id: 4,
    label: "Ética",
    category: "Valor Central",
    title: "Confidencialidad, Lealtad y Ética",
    description:
      "La firma tiene como credo la deontología en nuestras acciones y realizarlas de forma leal, así como considerar sagrado e inviolable el secreto profesional y la información confiada por nuestros clientes.",
    points: [
      "Sigilo profesional amparado por el Art. 335 del COFJ",
      "Transparencia presupuestaria sin costos ocultos",
      "Lealtad incondicional al cliente en todo momento del proceso",
    ],
    icon: ShieldCheck,
    badge: "Credo Deontológico",
    color: "#93c5fd",
  },
  {
    id: 5,
    label: "Tenacidad",
    category: "Valor Central",
    title: "Persistencia y Tenacidad",
    description:
      "Ningún asunto es imposible; todo puede y debe lucharse cuando se trata de la defensa de los derechos vulnerados. Nuestros clientes son el pilar fundamental de la firma.",
    points: [
      "Combate procesal incansable en todas las instancias judiciales",
      "Recursos extraordinarios, casación y acciones constitucionales",
      "Resiliencia probatoria hasta obtener el resultado justo",
    ],
    icon: Flame,
    badge: "Fuerza Procesal",
    color: "#fca5a5",
  },
  {
    id: 6,
    label: "Cobertura",
    category: "Compromiso",
    title: "Presencia en Quito & Cobertura Nacional",
    description:
      "Conformado por un equipo de profesionales especializados en cada área legal con amplia experiencia en litigio, con sede central en la ciudad de Quito y red de profesionales asociados a nivel nacional.",
    points: [
      "Sede principal en el corazón financiero y judicial de Quito",
      "Asociados en Guayaquil, Cuenca, Manta, Ambato y Machala",
      "Relación de largo plazo fiable entre cliente y abogado",
    ],
    icon: Award,
    badge: "Alcance Nacional",
    color: "#fcd34d",
  },
];

export default function NosotrosOrbit() {
  const [activeId, setActiveId] = useState<number>(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const targetRef = useRef<number | null>(null);
  const autoRotateRef = useRef(true);
  const rotationRef = useRef(0);
  const resumeRef = useRef<number | null>(null);
  autoRotateRef.current = autoRotate;

  const ACTIVE_ANGLE = -60; // Ángulo de enfoque hacia la derecha superior
  const radius = 175; // Radio orbital en px
  const angleStep = 360 / spheresData.length;

  const activeSphere = spheresData.find((s) => s.id === activeId) ?? spheresData[0];
  const ActiveIcon = activeSphere.icon;

  useEffect(() => {
    setIsMounted(true);
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
          resumeRef.current = window.setTimeout(() => setAutoRotate(true), 2500);
        } else {
          next = (((previous + delta * (1 - Math.exp(-dt / 150))) % 360) + 360) % 360;
        }
      } else if (autoRotateRef.current) {
        next = (previous + (11 * dt) / 1000) % 360;
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

  const selectSphere = (id: number) => {
    const itemIndex = spheresData.findIndex((s) => s.id === id);
    setActiveId(id);
    if (itemIndex !== -1) {
      targetRef.current = (((ACTIVE_ANGLE - itemIndex * angleStep) % 360) + 360) % 360;
    }
    setAutoRotate(false);
    autoRotateRef.current = false;
    if (resumeRef.current) window.clearTimeout(resumeRef.current);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      {/* Visual Orbital con Esferas Giratorias (7 cols) */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[440px] sm:min-h-[500px]">
        {/* Glow de fondo */}
        <div className="absolute w-72 h-72 rounded-full bg-[#00A9A3]/10 blur-3xl pointer-events-none" />

        {/* Anillos orbitales concéntricos */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: radius * 2 + 100, height: radius * 2 + 100 }}
        >
          {/* Anillo exterior */}
          <div
            className="absolute rounded-full border border-[#00A9A3]/25 pointer-events-none"
            style={{ width: radius * 2, height: radius * 2 }}
          />
          {/* Anillo de pulso interior */}
          <div
            className="absolute rounded-full border border-dashed border-[#00A9A3]/40 pointer-events-none animate-[spin_60s_linear_infinite]"
            style={{ width: radius * 2 - 40, height: radius * 2 - 40 }}
          />

          {/* Núcleo Central de Autoridad (El Sol de la Firma) */}
          <div className="relative z-20 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#082041] via-[#082041] to-[#05162E] border-2 border-[#00A9A3] shadow-[0_0_35px_rgba(0,169,163,0.35)] flex flex-col items-center justify-center text-center p-3">
            <Scale className="w-8 h-8 text-[#38DFD8] mb-1 drop-shadow" />
            <span className="text-[10px] font-serif font-bold text-white tracking-wider">NexoLegal</span>
            <span className="text-[8px] uppercase tracking-widest text-[#00A9A3] font-mono">Quito · Ecuador</span>
          </div>

          {/* Esferas Giratorias que Orbitan */}
          {spheresData.map((sphere, index) => {
            const angle = ((index / spheresData.length) * 360 + (isMounted ? rotationAngle : 0)) % 360;
            const radian = (angle * Math.PI) / 180;
            const x = Math.round(radius * Math.cos(radian) * 10) / 10;
            const y = Math.round(radius * Math.sin(radian) * 10) / 10;
            const isActive = sphere.id === activeId;
            const Icon = sphere.icon;

            return (
              <button
                key={sphere.id}
                suppressHydrationWarning
                onClick={() => selectSphere(sphere.id)}
                aria-label={`Seleccionar principio: ${sphere.label}`}
                className={`absolute z-30 transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-pointer group active:scale-90 ${
                  isActive
                    ? "w-16 h-16 sm:w-18 sm:h-18 bg-[#082041] border-2 border-[#00A9A3] shadow-[0_0_25px_rgba(0,169,163,0.6)] scale-110"
                    : "w-12 h-12 sm:w-14 sm:h-14 bg-white/90 dark:bg-[#082041]/90 border border-[#00A9A3]/40 hover:border-[#00A9A3] hover:scale-105 shadow-md"
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
              >
                <Icon
                  size={isActive ? 22 : 18}
                  style={{ color: isActive ? "#38DFD8" : sphere.color }}
                  className="transition-transform group-hover:scale-110"
                />
                <span
                  className={`text-[9px] font-bold mt-0.5 tracking-tight ${
                    isActive ? "text-white" : "text-[#17211f] dark:text-slate-200"
                  }`}
                >
                  {sphere.label}
                </span>

                {/* Halo de pulso si está activa */}
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-[#00A9A3] animate-ping opacity-30 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>

        {/* Indicador de interacción */}
        <div className="mt-4 flex items-center gap-2 text-xs text-[#6e7771]">
          <Orbit size={14} className="text-[#00A9A3] animate-spin" />
          <span>Esferas interactivas en rotación continua · Haz clic en cualquier esfera</span>
        </div>
      </div>

      {/* Tarjeta de Contenido Detallado de la Esfera Activa (5 cols) */}
      <div className="lg:col-span-5">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#00A9A3]/35 shadow-xl space-y-5 relative overflow-hidden transition-all duration-500">
          <div className="flex items-center justify-between pb-3 border-b border-[#f0ebe3]">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#082041] text-[#38DFD8] flex items-center justify-center shadow-sm">
                <ActiveIcon size={20} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#00A9A3]">
                  {activeSphere.badge}
                </span>
                <h3 className="text-xl font-bold font-serif text-[#17211f]">
                  {activeSphere.label}
                </h3>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#082041]/10 text-[#082041]">
              {activeSphere.category}
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-bold text-[#17211f] leading-snug">
            {activeSphere.title}
          </h4>

          <p className="text-xs sm:text-sm text-[#55605a] leading-relaxed">
            {activeSphere.description}
          </p>

          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#17211f] block">
              Pilares de Ejecución:
            </span>
            <ul className="space-y-1.5">
              {activeSphere.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#69736d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A9A3] mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#f0ebe3] flex items-center justify-between">
            <span className="text-xs text-[#717872]">Conoce a nuestro equipo legal</span>
            <a
              href="#fundador"
              className="text-xs font-bold text-[#00A9A3] hover:text-[#00A9A3] flex items-center gap-1 transition-colors"
            >
              <span>Ver Socio Fundador</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
