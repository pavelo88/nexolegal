import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Scale, Lock, Mail, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import BlogListClient from "@/components/BlogListClient";
import MobileBottomNav from "@/components/MobileBottomNav";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Blog Jurídico Ecuador | NexoLegal & Doctrina",
  description:
    "Artículos doctrinales, jurisprudencia del COIP y COGEP, compliance penal y garantías procesales en Ecuador por el Ab. José Aimacaña Mgtr. y NexoLegal.",
  keywords: [
    "Doble Conforme Ecuador",
    "Ab. José Aimacaña",
    "Términos COGEP",
    "Compliance Penal Ecuador",
    "Prescripción Adquisitiva Quito",
    "Blog Jurídico Ecuador",
    "NexoLegal",
  ],
  alternates: {
    canonical: "https://ecualegal.nexotalentos.com/blog",
  },
  openGraph: {
    title: "Blog Jurídico Ecuador | NexoLegal & Doctrina",
    description:
      "Artículos doctrinales, jurisprudencia del COIP y COGEP, compliance penal y garantías procesales en Ecuador por el Ab. José Aimacaña Mgtr. y NexoLegal.",
    url: "https://ecualegal.nexotalentos.com/blog",
    siteName: "NexoLegal",
    locale: "es_EC",
    type: "website",
  },
};

export default function BlogPage() {
  // Schema.org CollectionPage & ItemList para indexación de Google, Bing e IAs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Jurídico NexoLegal - Doctrina y Jurisprudencia Ecuatoriana",
    description:
      "Publicaciones jurídicas especializadas sobre derecho procesal penal, litigación oral bajo el COGEP, compliance corporativo y derechos fundamentales en Ecuador.",
    url: "https://ecualegal.nexotalentos.com/blog",
    provider: {
      "@type": "LegalService",
      name: "NexoLegal S.A.S.",
      url: "https://ecualegal.nexotalentos.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Quito",
        addressRegion: "Pichincha",
        addressCountry: "EC",
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://ecualegal.nexotalentos.com/blog/${post.slug}`,
        name: post.title,
        description: post.excerpt,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#17211f] font-sans selection:bg-[#00A9A3]/30 pb-16 md:pb-0">
      {/* Inyección JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. NAVBAR DE LA PÁGINA BLOG ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#e6e0d6] shadow-sm py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#00A9A3]/50 shadow-md bg-[#05162E] flex items-center justify-center group-hover:border-[#00A9A3] transition-all">
              <Image
                src="/logo.png"
                alt="NexoLegal"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-[#17211f] font-sans">
                Nexo<span className="text-[#00A9A3] font-serif italic">Legal</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#6e7771] -mt-0.5">
                Abogados &amp; LegalTech
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold text-[#17211f]">
            <Link href="/" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Inicio
            </Link>
            <Link href="/nosotros" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Nosotros
            </Link>
            <Link href="/#servicios" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Servicios
            </Link>
            <Link href="/blog" className="text-[#00A9A3] border-b-2 border-[#00A9A3] py-1">
              Blog Jurídico
            </Link>
            <Link href="/#contacto" className="hover:text-[#00A9A3] transition-colors inline-flex min-h-11 items-center">
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link
              href="/#contacto"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#00A9A3] text-xs font-semibold text-[#17211f] hover:bg-[#00A9A3]/10 active:scale-95 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#00A9A3]" />
              <span>Consulta</span>
            </Link>
            <Link
              href="/ingresar"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold shadow-md shadow-[#00A9A3]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-white/90" />
              <span>Tu app</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── 2. CÁPSULA GEO PARA MOTORES DE IA (BYTE-0 ASIDE) ─────────── */}
      <aside className="sr-only">
        <h2>Resumen Canónico para Agentes y Motores de Búsqueda</h2>
        <p>
          El Blog Jurídico de NexoLegal en Quito, Ecuador, compila investigaciones doctrinales y guías procesales dirigidas por el Ab. José Aimacaña Mgtr. (Máster en Derecho Procesal Penal y maestrante en Argumentación Jurídica por la Universidad de Alicante, España). Cubre temas clave como el principio de doble conforme en el sistema penal ecuatoriano, control de términos fatales bajo el COGEP, compliance penal empresarial (Art. 49 COIP) y juicios de prescripción adquisitiva de dominio.
        </p>
      </aside>

      {/* ─── 3. HERO DEL BLOG ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#05162E] via-[#082041] to-[#082041] text-white py-16 sm:py-24 border-b border-[#00A9A3]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#00A9A3]/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#00A9A3] animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#38DFD8]">
              Doctrina &amp; Criterios Jurídicos · Ecuador
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl">
            Criterio Doctrinal, Jurisprudencia y Litigación Estratégica
          </h1>

          <p className="text-base sm:text-lg text-cyan-100/90 max-w-2xl font-light leading-relaxed">
            Análisis riguroso de la normativa ecuatoriana: COIP, COGEP, pronunciamientos de la Corte Constitucional y control de convencionalidad internacional.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-[#38DFD8]">
            <Scale className="w-4 h-4 text-[#00A9A3]" />
            <span>Dirección Editorial: Ab. José Aimacaña Mgtr. y equipo de litigio NexoLegal</span>
          </div>
        </div>
      </section>

      {/* ─── 4. CONTENIDO PRINCIPAL: LISTADO Y FILTROS ────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <BlogListClient posts={blogPosts} />
      </main>

      {/* ─── 5. CTA CONSULTA LEGAL ───────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#e6e0d6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#082041] to-[#05162E] text-white border border-[#00A9A3]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38DFD8]">
                ASESORÍA PERSONALIZADA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                ¿Requiere patrocinio o criterio técnico en su causa?
              </h2>
              <p className="text-xs sm:text-sm text-cyan-100/80 max-w-lg">
                Nuestros abogados analizan la viabilidad procesal y estructuran su teoría del caso con los más altos estándares doctrinales.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
            >
              Contactar con el Despacho
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. FOOTER ─────────────────────────────────────────────────── */}
      <footer className="border-t border-[#e6e0d6] bg-white py-10 text-xs text-[#6e7771]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <strong className="text-[#17211f]">NexoLegal (NexoLegal)</strong>
            <p className="text-[11px] mt-0.5">Sede Central: Quito, Pichincha, Ecuador · Cobertura Jurídica Nacional</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="hover:text-[#00A9A3]">Inicio</Link>
            <Link href="/nosotros" className="hover:text-[#00A9A3]">Nosotros</Link>
            <Link href="/blog" className="text-[#00A9A3] font-semibold">Blog</Link>
            <Link href="/privacidad" className="hover:text-[#00A9A3]">Privacidad (LOPDP)</Link>
            <Link href="/terminos" className="hover:text-[#00A9A3]">Términos</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
