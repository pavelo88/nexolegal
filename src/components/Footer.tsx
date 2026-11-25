import React from "react";
import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Gavel,
  Scale,
  Sparkles,
  Lock,
  Globe2,
} from "lucide-react";
import NexoLogo from "@/components/NexoLogo";
import CopyrightYear from "@/components/CopyrightYear";

export default function Footer() {
  const whatsappUrl =
    "https://wa.me/593997224453?text=Hola%20NexoLegal,%20deseo%20solicitar%20asesoria%20juridica%20especializada";

  return (
    <footer className="border-t border-slate-800 bg-[#05162E] text-slate-300 text-xs relative overflow-hidden transition-colors duration-300">
      {/* ─── 1. TOP BANNER EJECUTIVO (ESTILO NEXO TALENTO) ─────────────── */}
      <div className="border-b border-slate-800/80 bg-[#030D1C]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-300 text-center md:text-left">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="text-xs">
              <strong className="text-white">Atención Jurídica Inmediata:</strong> Abogados y consultores sénior disponibles para audiencias y causas en Quito, Guayaquil y las 24 provincias del Ecuador.
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Directo: +593 99 722 4453</span>
            </a>

            <Link
              href="/ingresar"
              className="px-3.5 py-2 bg-[#00A9A3]/15 border border-[#00A9A3]/40 text-[#38DFD8] hover:text-white hover:bg-[#00A9A3]/25 font-bold rounded-xl transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#38DFD8]" />
              <span>Portal Clientes 24/7</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── 2. CUERPO PRINCIPAL DEL FOOTER ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-32 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Col 1 (4 cols): Marca, Propuesta & Contacto Oficial */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <NexoLogo size="md" variant="dark" showSubtitle={true} />
            </Link>

            <div className="space-y-2 pt-2 text-slate-300 text-xs">
              <div className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-[#00A9A3] shrink-0 mt-0.5" />
                <span>
                  <strong>Sede Central:</strong> Av. República de El Salvador y Naciones Unidas, Edificio Citiplaza, Quito, Ecuador.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-[#00A9A3] shrink-0" />
                <span>
                  <strong>Alcance:</strong> Cobertura procesal nacional en Ecuador y enlace internacional en España &amp; Latam.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A9A3] shrink-0" />
                <span>
                  <strong>Atención Directa:</strong>{" "}
                  <a href="tel:+593997224453" className="hover:text-[#38DFD8] font-bold text-white">
                    +593 99 722 4453
                  </a>{" "}
                  / +593 2 298 4400
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00A9A3] shrink-0" />
                <span>
                  <strong>Email Corporativo:</strong>{" "}
                  <span>contacto</span>
                  <span className="text-[#00A9A3]">&#64;</span>
                  <span>nexolegal.ec</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#38DFD8] shrink-0" />
                <span>Secreto profesional y sigilo riguroso amparado por el Art. 335 del COFJ.</span>
              </div>
            </div>
          </div>

          {/* Grid Compacto en Móvil (2 columnas lado a lado) + SinergIA Tech */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-8 gap-6 sm:gap-8">
            {/* Especialidades Jurídicas */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
                Especialidades
              </h3>
              <ul className="space-y-1.5 md:space-y-2 text-xs">
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Litigación Penal &amp; COIP</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Derecho Civil &amp; COGEP</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Laboral &amp; Visto Bueno</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Corporativo &amp; SAS 24h</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Tránsito &amp; Administrativo</span>
                  </Link>
                </li>
                <li>
                  <Link href="/#servicios" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1 active:scale-95">
                    <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Familia, Niñez &amp; Alimentos</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Ecosistema Digital */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
                Ecosistema Digital
              </h3>
              <ul className="space-y-1.5 md:space-y-2 text-xs">
                <li>
                  <Link href="/user" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="truncate">Portal Clientes SATJE</span>
                  </Link>
                </li>
                <li>
                  <Link href="/empresas" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span className="truncate">Portal Empresas SAS</span>
                  </Link>
                </li>
                <li>
                  <Link href="/abogado" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="truncate">Portal Letrados IA</span>
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                    <span className="truncate">Dirección &amp; CRM</span>
                  </Link>
                </li>
                <li>
                  <Link href="/nosotros" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <Scale className="w-3 h-3 text-[#00A9A3] shrink-0" />
                    <span className="truncate">Socio Fundador</span>
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="p-1.5 md:p-0 rounded-lg bg-slate-900/60 md:bg-transparent border border-slate-800/60 md:border-0 hover:text-[#38DFD8] transition-colors flex items-center gap-1.5 active:scale-95">
                    <Sparkles className="w-3 h-3 text-[#38DFD8] shrink-0" />
                    <span className="truncate">Blog Doctrinal</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* SinergIA Tech */}
            <div className="col-span-2 lg:col-span-2 pt-2 lg:pt-0 space-y-3">
              <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
                SinergIA Tech
              </h3>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Infraestructura tecnológica e inteligencia aplicada para la práctica legal y corporativa en Ecuador, España y Latinoamérica.
              </p>
              <div className="pt-1 flex flex-wrap lg:flex-col gap-3 lg:gap-1.5">
                <Link
                  href="/#contacto"
                  className="text-xs text-[#38DFD8] hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <span>Solicitar Consulta Inmediata</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/privacidad"
                  className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1"
                >
                  <span>Políticas de Privacidad</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3. BARRA INFERIOR DE LEGALES Y COPYRIGHT (2 LÍNEAS CENTRADAS) ─── */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col items-center justify-center gap-4 text-center text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Link
              href="/terminos"
              className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:text-[#38DFD8] hover:border-[#00A9A3]/50 transition-all active:scale-95"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:text-[#38DFD8] hover:border-[#00A9A3]/50 transition-all active:scale-95"
            >
              Privacidad &amp; LOPDP
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:text-[#38DFD8] hover:border-[#00A9A3]/50 transition-all active:scale-95"
            >
              Blog Doctrinal
            </Link>
          </div>
          <p className="text-slate-300 leading-relaxed max-w-2xl">
            © <CopyrightYear /> SinergIA Tech · NexoLegal Asesoría Jurídica Ecuador. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
