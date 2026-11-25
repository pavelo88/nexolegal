import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Scale, Lock, Mail, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import BlogListClient from "@/components/BlogListClient";
import MobileBottomNav from "@/components/MobileBottomNav";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import NexoLogo from "@/components/NexoLogo";

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
      name: "NexoLegal · SinergIA Tech",
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
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#05162E] text-[#17211f] dark:text-slate-100 font-sans selection:bg-[#00A9A3]/30 pb-0">
      {/* Inyección JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. NAVBAR DE LA PÁGINA BLOG ─────────────────────────────── */}
      <PublicNavbar />

      {/* ─── 2. CÁPSULA GEO PARA MOTORES DE IA (BYTE-0 ASIDE) ─────────── */}
      <aside className="sr-only">
        <h2>Resumen Canónico para Agentes y Motores de Búsqueda</h2>
        <p>
          El Blog Jurídico de NexoLegal en Quito, Ecuador, compila investigaciones doctrinales y guías procesales dirigidas por el Ab. José Aimacaña Mgtr. (Máster en Derecho Procesal Penal y maestrante en Argumentación Jurídica por la Universidad de Alicante, España). Cubre temas clave como el principio de doble conforme en el sistema penal ecuatoriano, control de términos fatales bajo el COGEP, compliance penal empresarial (Art. 49 COIP) y juicios de prescripción adquisitiva de dominio.
        </p>
      </aside>

      {/* ─── 3. HERO DEL BLOG ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#05162E] via-[#082041] to-[#082041] text-white pt-36 sm:pt-44 pb-16 sm:pb-24 border-b border-[#00A9A3]/30">
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
      <section className="py-16 bg-white dark:bg-[#05162E] border-t border-[#e6e0d6] dark:border-[#00A9A3]/20">
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

      {/* ─── 6. FOOTER CORPORATIVO UNIFICADO ───────────────────────────── */}
      <Footer />
    </div>
  );
}
