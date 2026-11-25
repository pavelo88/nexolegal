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
              <span>WhatsApp Letrado: +593 99 722 4453</span>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 pb-28 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Col 1 (5 cols): Marca, Propuesta & Contacto Oficial */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <NexoLogo size="md" variant="dark" showSubtitle={true} />
            </Link>

            <p className="text-slate-300 leading-relaxed text-xs max-w-md">
              División jurídica y plataforma LegalTech complementaria de{" "}
              <a
                href="https://nexotalentos.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#38DFD8] hover:underline font-semibold"
              >
                Nexo Talento
              </a>
              . Asesoría estratégica para familias, empresas y profesionales con trazabilidad procesal en tiempo real.
            </p>

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
                  <strong>Alcance:</strong> Cobertura procesal nacional en Ecuador y enlace internacional en España &amp; Latam vía Nexo Talento.
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
                  <span>nexotalentos.com</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#38DFD8] shrink-0" />
                <span>Secreto profesional y sigilo riguroso amparado por el Art. 335 del COFJ.</span>
              </div>
            </div>
          </div>

          {/* Col 2 (2 cols): Especialidades Jurídicas */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
              Especialidades
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Litigación Penal &amp; COIP</span>
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Derecho Civil &amp; COGEP</span>
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Laboral &amp; Visto Bueno</span>
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Corporativo &amp; SAS 24h</span>
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Tránsito &amp; Administrativo</span>
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-[#00A9A3] shrink-0" />
                  <span>Familia, Niñez &amp; Alimentos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 (3 cols): Ecosistema App & Portales */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
              Ecosistema Digital
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/user" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Portal Clientes (Seguimiento SATJE)</span>
                </Link>
              </li>
              <li>
                <Link href="/empresas" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Portal Empresas (Compliance &amp; SAS)</span>
                </Link>
              </li>
              <li>
                <Link href="/abogado" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Portal Letrados &amp; Asistente IA</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Dirección Jurídica &amp; CRM</span>
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <Scale className="w-3 h-3 text-[#00A9A3]" />
                  <span>Socio Fundador &amp; Principios</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#38DFD8] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#38DFD8]" />
                  <span>Blog Jurídico &amp; Doctrina</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 (2 cols): Nexo Talento & Enlaces */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white font-bold text-sm border-b border-slate-800 pb-2 md:border-b-0 md:pb-0">
              Ecosistema Nexo
            </h3>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Plataforma vinculada a{" "}
              <a
                href="https://nexotalentos.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-[#38DFD8]"
              >
                nexotalentos.com
              </a>
              , líder en selección ejecutiva, headhunting y servicios corporativos en Ecuador, España y Latinoamérica.
            </p>
            <div className="pt-2 flex flex-col gap-1.5">
              <a
                href="https://nexotalentos.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#38DFD8] hover:underline font-semibold inline-flex items-center gap-1"
              >
                <span>Visitar Nexo Talento</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <Link
                href="/#contacto"
                className="text-xs text-slate-300 hover:text-white inline-flex items-center gap-1"
              >
                <span>Solicitar Consulta Inmediata</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ─── 3. BARRA INFERIOR DE COPYRIGHT Y LEGALES ─────────────────── */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p className="text-center sm:text-left">
            © <CopyrightYear /> NexoLegal. Plataforma jurídica de{" "}
            <a
              href="https://nexotalentos.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white underline font-semibold"
            >
              Nexo Talento
            </a>
            . Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos y Condiciones
            </Link>
            <span>•</span>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Cancelación &amp; Reembolsos
            </Link>
            <span>•</span>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad &amp; LOPDP
            </Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog Doctrinal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
