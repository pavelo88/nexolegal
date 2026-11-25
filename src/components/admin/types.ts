import { DemoCase, JudicialNotificationAI, DemoLead } from "@/data/platformDemo";

export interface B2BClient {
  id: string;
  name: string;
  type: "Empresa B2B" | "Persona Natural";
  ruc: string;
  email: string;
  phone: string;
  activeCases: number;
  plan: "Plan Corporativo Pro" | "Retainer Legal" | "Caso Individual";
  status: "Al día" | "Auditoría en curso" | "Pendiente pago";
  assignedLawyer: string;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  specialty: string;
  activeCasesCount: number;
  courtHearingsMonth: number;
  rating: number;
  status: "Disponible" | "En Audiencia" | "Sobrecargado";
  avatar: string;
}

export type AdminActiveTab =
  | "dashboard"
  | "expedientes"
  | "clientes"
  | "abogados"
  | "buzon_ia"
  | "crm"
  | "configuracion";
