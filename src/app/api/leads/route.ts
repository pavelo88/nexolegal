import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getClientIp, tooLarge } from "@/lib/request-guard";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedUrgencies = new Set(["Baja", "Media", "Alta"]);

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  if (tooLarge(request, 16_000)) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  const ip = getClientIp(request);
  const rate = checkRateLimit(`lead:${ip}`, 5, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos antes de volver a enviar." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfter) } },
    );
  }
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Solicitud JSON inválida." }, { status: 400 }); }
  const input = body as Record<string, unknown>;
  if (text(input.website, 200)) return NextResponse.json({ received: true }, { status: 201 });
  const fullName = text(input.name, 255);
  const phone = text(input.phone, 50);
  const email = text(input.email, 255).toLowerCase();
  const legalArea = text(input.area, 100);
  const urgency = text(input.urgency, 20);
  const caseDescription = text(input.description, 4000);
  const attribution = typeof input.attribution === "object" && input.attribution
    ? input.attribution as Record<string, unknown>
    : {};
  const attributionSummary = [
    `Fuente: ${text(attribution.utm_source, 80) || "direct"}`,
    `Medio: ${text(attribution.utm_medium, 80) || "none"}`,
    `Campaña: ${text(attribution.utm_campaign, 120) || "none"}`,
    `Landing: ${text(attribution.landing_page, 200) || "/"}`,
  ].join(" | ");
  if (!fullName || !phone || !email || !legalArea || !caseDescription || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Completa los campos requeridos con datos válidos." }, { status: 422 });
  }
  if (!allowedUrgencies.has(urgency)) return NextResponse.json({ error: "Nivel de urgencia inválido." }, { status: 422 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return NextResponse.json({ error: "La captura no está disponible: falta configuración segura del servidor." }, { status: 503 });
  const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.from("crm_leads").insert({
    full_name: fullName, phone, email, legal_area: legalArea, source: "WEB", status: "NUEVO",
    case_description: `[Urgencia: ${urgency}] ${caseDescription}\n[${attributionSummary}]`,
  }).select("id, created_at").single();
  if (error || !data) {
    console.error("crm_leads insert failed", { code: error?.code, message: error?.message });
    return NextResponse.json({ error: "No se pudo registrar la solicitud. Intenta nuevamente." }, { status: 502 });
  }
  const reference = `VL-${new Date().getFullYear()}-${String(data.id).replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`;
  return NextResponse.json({ reference, createdAt: data.created_at }, { status: 201 });
}
