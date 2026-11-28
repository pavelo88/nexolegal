import { LucideIcon, Gavel, Briefcase, Scale, Building2 } from "lucide-react";

export interface HeroSlide {
  tag: string;
  title: string;
  subtitle: string;
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  badge: string;
}

export interface LegalService {
  icon: LucideIcon;
  category: string;
  title: string;
  desc: string;
  highlights: string[];
  href: string;
}

export interface MetricItem {
  value: string;
  label: string;
  subtext: string;
}

export interface MethodStep {
  step: string;
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const HERO_SLIDES: HeroSlide[] = [
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

export const LEGAL_SERVICES: LegalService[] = [
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

export const INSTITUTIONAL_METRICS: MetricItem[] = [
  { value: "Quito", label: "Sede Jurídica Principal", subtext: "Atención profesional y coordinación de casos" },
  { value: "Nacional", label: "Cobertura Profesional", subtext: "Profesionales asociados para coordinación territorial" },
  { value: "Multiarea", label: "Equipo Especializado", subtext: "Litigio, empresa, familia y relaciones laborales" },
  { value: "24/7", label: "Acceso al Portal LegalTech", subtext: "Consulta documentos y novedades registradas por tu equipo" },
];

export const METHOD_STEPS: MethodStep[] = [
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

export const HOME_FAQS: FAQItem[] = [
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
