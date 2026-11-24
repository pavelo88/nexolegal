"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Eye,
  EyeOff,
  Scale,
  ShieldCheck,
  UserRound,
  Lock,
  Sparkles,
  CheckCircle2,
  FolderKanban,
  ShieldAlert,
} from "lucide-react";
import AppExperienceNavigation, { DemoEnvironmentBadge } from "@/components/app/AppExperienceNavigation";

type DemoRole = "CLIENTE" | "ABOGADO" | "ADMIN" | "B2B";

interface RoleOption {
  role: DemoRole;
  label: string;
  email: string;
  password: string;
  path: string;
  badge: string;
  Icon: typeof UserRound;
}

const demoRoles: RoleOption[] = [
  {
    role: "CLIENTE",
    label: "Usuario",
    email: "cliente@nexolegal.example",
    password: "DemoCliente2026!",
    path: "/user",
    badge: "Membresía",
    Icon: UserRound,
  },
  {
    role: "ABOGADO",
    label: "Abogado",
    email: "abogado@nexolegal.example",
    password: "DemoAbogado2026!",
    path: "/abogado",
    badge: "Litigios",
    Icon: BriefcaseBusiness,
  },
  {
    role: "ADMIN",
    label: "Dirección",
    email: "admin@nexolegal.example",
    password: "DemoAdmin2026!",
    path: "/admin",
    badge: "Gerencia",
    Icon: ShieldCheck,
  },
  {
    role: "B2B",
    label: "Empresas",
    email: "empresa@nexolegal.example",
    password: "DemoEmpresa2026!",
    path: "/empresas",
    badge: "Corporativo",
    Icon: Building2,
  },
];

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState(demoRoles[0].email);
  const [password, setPassword] = useState(demoRoles[0].password);
  const [selectedRole, setSelectedRole] = useState<DemoRole | null>("CLIENTE");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function selectDemo(role: RoleOption) {
    setSelectedRole(role.role);
    setEmail(role.email);
    setPassword(role.password);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const demoMatch = demoRoles.find((role) => role.email === email && role.password === password);
      if (demoMatch) {
        router.push(demoMatch.path);
        return;
      }

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) throw new Error(data?.error ?? "No se pudo iniciar sesión. Verifica tus datos.");

      router.push(data?.redirectTo ?? "/app");
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="with-app-experience-dock min-h-screen bg-[#faf8f5] text-[#17211f] flex flex-col justify-between p-3.5 sm:p-6 lg:p-8 selection:bg-[#00A9A3]/30">
      {/* Top Bar Minimalista */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between pb-3 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#082041] text-[#38DFD8] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
            <Scale size={18} />
          </div>
          <span className="font-sans font-bold text-base tracking-wide text-[#17211f]">
            Nexo<span className="text-[#00A9A3] font-serif italic">Legal</span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-[#55605a] hover:text-[#17211f] px-3.5 py-1.5 rounded-full hover:bg-stone-200/60 transition-colors"
        >
          ← Volver a la web
        </Link>
      </header>

      {/* Tarjeta Principal en Grid (Fluida y Elegante en Tablet/Mobile) */}
      <div className="max-w-6xl w-full mx-auto flex-1 flex items-center justify-center my-auto py-2">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#e6e0d6] shadow-[0_20px_60px_rgba(27,58,53,0.08)] bg-white">
          {/* COLUMNA IZQUIERDA: Identidad Visual Editorial & Credenciales (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#082041] via-[#082041] to-[#05162E] p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[#00A9A3]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#00A9A3]/40 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
                  Plataforma LegalTech
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-white">
                Tu equipo legal, en un solo espacio.
              </h1>

              <p className="text-xs sm:text-sm text-cyan-100/80 leading-relaxed font-light">
                Explora una demostración de seguimiento de causas, documentos, audiencias y comunicación con tu equipo legal.
              </p>
            </div>

            {/* 3 Micro-Cards de Autoridad (Rellenan con elegancia el espacio) */}
            <div className="relative z-10 my-4 space-y-2.5">
              <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00A9A3]/20 text-[#38DFD8] flex items-center justify-center shrink-0">
                  <FolderKanban size={16} />
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white truncate">Seguimiento procesal</strong>
                  <span className="text-[10px] text-cyan-100/70 truncate block">Flujo demostrativo con datos ficticios</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00A9A3]/20 text-emerald-300 flex items-center justify-center shrink-0">
                  <Lock size={16} />
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white truncate">Sigilo Profesional &amp; Cifrado</strong>
                  <span className="text-[10px] text-cyan-100/70 truncate block">Amparo COFJ Art. 335 y LOPDP Ecuador</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs font-bold text-white truncate">Asistente Judicial con IA Ética</strong>
                  <span className="text-[10px] text-cyan-100/70 truncate block">Resúmenes claros sin tecnicismos oscuros</span>
                </div>
              </div>
            </div>

            {/* Bottom Security Badge */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-cyan-100/70">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#38DFD8]" />
                <span>Acceso Seguro 256-bit</span>
              </span>
              <span className="font-mono text-[10px] text-[#38DFD8]">Sede Central: Quito</span>
            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario Compacto de Un Solo Golpe de Vista (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div>
              {/* Header formulario */}
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A9A3]">
                  Acceso Seguro
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17211f]">
                  Ingresa a tu espacio
                </h2>
                <p className="text-xs text-[#6e7771] mt-0.5">
                  Elige un perfil de demostración para explorar o ingresa con tu cuenta.
                </p>
              </div>

              {/* Segmented Control / Tabs Compactas para los 4 Perfiles Demo */}
              <div className="mb-2 text-[11px] text-[#6e7771]">Toca un perfil para cargar su acceso de demostración.</div>
              <div className="mb-5 p-1 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] grid grid-cols-2 sm:grid-cols-4 gap-1">
                {demoRoles.map((role) => {
                  const Icon = role.Icon;
                  const isActive = selectedRole === role.role;
                  return (
                    <button
                      key={role.role}
                      type="button"
                      onClick={() => selectDemo(role)}
                      className={`py-2 px-1 rounded-xl text-center transition-all flex flex-col items-center justify-center gap-1 active:scale-95 ${
                        isActive
                          ? "bg-white text-[#17211f] shadow-sm font-bold border border-[#00A9A3]/40 ring-1 ring-[#00A9A3]/20"
                          : "text-[#55605a] hover:text-[#17211f] hover:bg-white/50 font-medium"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isActive ? "text-[#00A9A3]" : "text-[#717872]"}
                      />
                      <span className="text-[11px] leading-tight block truncate w-full">
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#17211f] mb-1">
                    Correo electrónico
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                    className="h-10 sm:h-11 w-full rounded-xl border border-[#d6cfc5] bg-[#faf8f5] px-3.5 text-xs text-[#17211f] outline-none transition placeholder:text-[#a0a8a3] focus:border-[#00A9A3] focus:bg-white focus:ring-2 focus:ring-[#00A9A3]/15"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[#17211f]">
                      Contraseña
                    </label>
                    <span className="text-[10px] text-[#717872]">Confidencial</span>
                  </div>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      autoComplete="current-password"
                      className="h-10 sm:h-11 w-full rounded-xl border border-[#d6cfc5] bg-[#faf8f5] px-3.5 pr-10 text-xs text-[#17211f] outline-none transition placeholder:text-[#a0a8a3] focus:border-[#00A9A3] focus:bg-white focus:ring-2 focus:ring-[#00A9A3]/15"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#717872] hover:text-[#17211f]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-700 flex items-center gap-2">
                    <ShieldAlert size={14} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Botón Primario */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] hover:from-[#d4b475] hover:to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#00A9A3]/25 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-60"
                >
                  {loading ? "Verificando credenciales…" : "Ingresar a la Plataforma"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* Acceso Directo Rápido a los Paneles Demo */}
              <div className="mt-4 pt-3 border-t border-[#f0ebe3]">
                <div className="flex items-center justify-between text-[11px] mb-2">
                  <span className="font-semibold text-[#17211f]">Explorar paneles demo directamente:</span>
                  <span className="text-[10px] text-[#00A9A3] font-mono">1-Clic</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {demoRoles.map((r) => (
                    <Link
                      key={r.role}
                      href={r.path}
                      className="p-2 rounded-xl bg-[#faf8f5] hover:bg-[#fff9ef] border border-[#e6e0d6] hover:border-[#00A9A3] text-center text-[10px] font-semibold text-[#17211f] transition-all flex items-center justify-center gap-1 active:scale-95"
                    >
                      <span>Panel {r.label}</span>
                      <span className="text-[#00A9A3]">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Formulario */}
            <div className="pt-3 border-t border-[#f0ebe3] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#717872]">
              <span>¿Necesitas patrocinio legal o membresía?</span>
              <Link href="/afiliarse" className="font-bold text-[#00A9A3] hover:underline">
                Afiliarse o Solicitar Asesoría →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Minimalista */}
      <footer className="text-center text-[11px] text-[#8a918b] shrink-0 pt-2">
        <span>NexoLegal · República del Ecuador · Quito · Guayaquil · Cobertura Nacional</span>
      </footer>
      <AppExperienceNavigation />
    </main>
  );
}
