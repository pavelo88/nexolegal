import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Rastreadores de ENTRENAMIENTO de IA y herramientas de clonacion de sitios (403).
// Se comparan en minusculas contra el User-Agent.
// SE DEJAN PASAR a proposito (para que nos encuentren y nos citen): Googlebot, Bingbot,
// OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User,
// DuckAssistBot, MistralAI-User, YouBot, PhindBot y las vistas previas (WhatsApp, facebookexternalhit...).
const BLOCKED_AGENTS = [
  "gptbot", "claudebot", "claude-web", "anthropic-ai", "deepseekbot", "grokbot", "xai-bot", "kimibot",
  "moonshotbot", "cohere-ai", "cohere-training-data-crawler", "meta-externalagent", "facebookbot",
  "amazonbot", "bytespider", "ccbot", "diffbot", "omgili", "imagesiftbot", "timpibot",
  "velenpublicwebcrawler", "ai2bot", "img2dataset", "google-cloudvertexbot",
  "httrack", "webcopier", "webreaper", "webzip", "sitesnagger", "teleport", "offline explorer",
  "sitesucker", "wget", "scrapy", "mj12bot", "cyotek",
];

// Rutas que cubria el matcher ORIGINAL. La logica propia (redireccion de dominio y auth de /app)
// solo se ejecuta en ellas, exactamente igual que antes de ampliar el matcher.
const ORIGINAL_MATCHER = /^\/(?!api|_next\/static|_next\/image|favicon.ico|.*\..*).*$/;

export async function middleware(request: NextRequest) {
  const userAgent = (request.headers.get("user-agent") || "").toLowerCase();
  if (BLOCKED_AGENTS.some((agent) => userAgent.includes(agent))) {
    return new NextResponse("Acceso denegado: este sitio no permite rastreadores de entrenamiento de IA ni copiadores.", {
      status: 403,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noai, noimageai" },
    });
  }
  if (!ORIGINAL_MATCHER.test(request.nextUrl.pathname)) return NextResponse.next();

  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (hostname === "www.ecualegal.nexotalentos.com") {
    const canonical = request.nextUrl.clone();
    canonical.protocol = "https:";
    canonical.host = "ecualegal.nexotalentos.com";
    canonical.port = "";
    return NextResponse.redirect(canonical, 308);
  }

  if (!request.nextUrl.pathname.startsWith("/app")) return NextResponse.next();

  // Vista pública de demostración y Showcase Hub: no expone expedientes reales ni permite mutaciones.
  if (
    request.nextUrl.pathname === "/app" ||
    request.nextUrl.pathname === "/app/demo" ||
    request.nextUrl.pathname.startsWith("/app/demo/") ||
    request.nextUrl.pathname.startsWith("/app/preview")
  ) {
    return NextResponse.next();
  }
  let response = NextResponse.next({ request });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.redirect(new URL("/ingresar", request.url));
  const supabase = createServerClient(url, anonKey, { cookies: { getAll: () => request.cookies.getAll(), setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => { request.cookies.set(name, value); response = NextResponse.next({ request }); response.cookies.set(name, value, options); }); } } });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/ingresar", request.url));
  const { data: profile } = await supabase.from("users").select("role,is_active,must_change_password").eq("id", user.id).maybeSingle();
  if (!profile?.is_active || !["ADMIN", "ABOGADO", "CLIENTE", "B2B"].includes(profile.role)) return NextResponse.redirect(new URL("/ingresar?error=unauthorized", request.url));
  if (profile.must_change_password && !request.nextUrl.pathname.startsWith("/app/cambiar-contrasena")) return NextResponse.redirect(new URL("/app/cambiar-contrasena", request.url));
  return response;
}

export const config = {
  // Ampliado para cubrir imagenes, archivos y /api (bloqueo de bots). Se exceptuan robots.txt y
  // sitemap.xml para que los bots puedan leer las reglas. El matcher original era
  // "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)" y sigue aplicandose a la logica
  // propia mediante ORIGINAL_MATCHER.
  matcher: ["/((?!_next/static|favicon.ico|robots.txt|sitemap.xml).*)"],
};

