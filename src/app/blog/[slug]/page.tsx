import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Tag,
  User,
  GraduationCap,
  Scale,
  Share2,
  CheckCircle2,
  BookOpen,
  Mail,
  Lock,
  ArrowRight,
  Shield,
} from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    return {
      title: "Artículo no encontrado | NexoLegal",
      description: "El artículo solicitado no existe en el blog jurídico de NexoLegal.",
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `https://ecualegal.nexotalentos.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://ecualegal.nexotalentos.com/blog/${post.slug}`,
      siteName: "NexoLegal",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) {
    notFound();
  }

  // Schema.org BlogPosting con Author Person y Publisher Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: "2026-10-24",
    dateModified: "2026-10-24",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ecualegal.nexotalentos.com/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.credentials,
      worksFor: {
        "@type": "Organization",
        name: "NexoLegal · SinergIA Tech",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "NexoLegal · SinergIA Tech",
      logo: {
        "@type": "ImageObject",
        url: "https://ecualegal.nexotalentos.com/logo.png",
      },
    },
    articleSection: post.category,
    keywords: [post.category, "Ecuador", "Derecho", "NexoLegal", post.author.name],
  };

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#05162E] text-[#17211f] dark:text-slate-100 font-sans selection:bg-[#00A9A3]/30 pb-0">
      {/* Inyección JSON-LD Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. NAVBAR DE NAVEGACIÓN UNIFICADO ────────────────────────── */}
      <PublicNavbar />

      {/* ─── 2. CÁPSULA GEO PARA MOTORES DE IA (BYTE-0 ASIDE) ─────────── */}
      <aside className="sr-only">
        <h2>Respuesta Canónica / Resumen Doctrinal</h2>
        <p>{post.excerpt}</p>
        <ul>
          {post.keyTakeaways.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </aside>

      {/* ─── 3. HEADER EDITORIAL DEL ARTÍCULO ─────────────────────────── */}
      <div className="bg-[#05162E] text-white border-b border-[#00A9A3]/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20 relative z-10 space-y-6">
          {/* Breadcrumb de Retorno */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#38DFD8] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a Doctrina &amp; Blog Jurídico</span>
          </Link>

          {/* Categoría y Tiempo de Lectura */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[#00A9A3]/40 text-[10px] font-bold uppercase tracking-wider text-[#38DFD8]">
              <Tag className="w-3 h-3 text-[#00A9A3]" />
              <span>{post.category}</span>
            </span>
            <span className="flex items-center gap-1.5 text-xs text-cyan-200/80">
              <Clock className="w-3.5 h-3.5 text-[#00A9A3]" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-cyan-200/50">•</span>
            <span className="text-xs text-cyan-200/80">{post.date}</span>
          </div>

          {/* Título Principal H1 */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          {/* Subtítulo Doctrinal */}
          <p className="text-base sm:text-lg text-cyan-100/90 font-light leading-relaxed">
            {post.subtitle}
          </p>

          {/* Ficha de Autor en Cabecera */}
          <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#082041] border-2 border-[#00A9A3] flex items-center justify-center text-[#38DFD8] shadow-md font-serif font-bold text-base shrink-0">
              <Scale className="w-5 h-5 text-[#00A9A3]" />
            </div>
            <div>
              <strong className="block text-sm font-serif font-bold text-white">
                {post.author.name}
              </strong>
              <span className="text-xs text-[#38DFD8] block">{post.author.role}</span>
              <span className="text-[11px] text-cyan-200/70 block">
                {post.author.credentials}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. CUERPO DEL ARTÍCULO & SIDEBAR ─────────────────────────── */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-10">
        {/* Caja Destacada: Puntos Clave y Tesis Jurídica (GEO & Citación IA) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#082041] border-2 border-[#00A9A3]/40 shadow-md space-y-4">
          <div className="flex items-center gap-2.5 text-[#00A9A3] dark:text-[#38DFD8]">
            <CheckCircle2 className="w-5 h-5 text-[#00A9A3] dark:text-[#38DFD8]" />
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#17211f] dark:text-white">
              Tesis Doctrinal &amp; Puntos Clave (Key Takeaways)
            </h2>
          </div>
          <ul className="space-y-3">
            {post.keyTakeaways.map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-xs sm:text-sm text-[#17211f] dark:text-slate-200 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A9A3] dark:bg-[#38DFD8] mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contenido Editorial Párrafo a Párrafo */}
        <article className="prose prose-emerald dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-[#17211f] dark:text-slate-200 leading-relaxed">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-[#2c3835] dark:text-slate-200 font-normal leading-relaxed text-justify">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Cita Doctrinal de Cierre */}
        <div className="p-6 rounded-2xl bg-[#faf8f5] dark:bg-[#082041] border-l-4 border-[#00A9A3] shadow-sm text-xs sm:text-sm italic text-[#55605a] dark:text-slate-300">
          &quot;La excelencia procesal no tolera improvisaciones. En cada causa, la tutela efectiva de los derechos exige rigor conceptual y conocimiento profundo de la doctrina constitucional.&quot;
          <span className="block font-semibold not-italic text-[#17211f] dark:text-white mt-2">
            — Ab. José Aimacaña Mgtr. · NexoLegal
          </span>
        </div>

        {/* Tarjeta de Autor Ampliada E-E-A-T */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#082041] border border-[#e6e0d6] dark:border-[#00A9A3]/30 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#05162E] text-[#38DFD8] flex items-center justify-center border-2 border-[#00A9A3] shadow-md shrink-0">
            <Scale className="w-8 h-8 text-[#00A9A3] dark:text-[#38DFD8]" />
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00A9A3] dark:text-[#38DFD8]">
              AUTOR DEL ESTUDIO
            </span>
            <h3 className="font-serif text-xl font-bold text-[#17211f] dark:text-white">
              {post.author.name}
            </h3>
            <p className="text-xs text-[#00A9A3] dark:text-[#38DFD8] font-semibold">{post.author.role}</p>
            <p className="text-xs text-[#55605a] dark:text-slate-300 leading-relaxed">
              {post.author.credentials}. Abogado litigante con amplia trayectoria en defensa técnica procesal, conferencista nacional e internacional y director de la práctica litigiosa en NexoLegal.
            </p>
            <div className="pt-2">
              <Link
                href="/nosotros#fundador"
                className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#082041] dark:text-[#38DFD8] hover:text-[#00A9A3] transition-colors"
              >
                <span>Ver perfil académico completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Consulta Específica */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#082041] via-[#082041] to-[#05162E] text-white border border-[#00A9A3]/40 shadow-xl space-y-4 text-center">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#38DFD8]">
            DEFENSA TÉCNICA ESPECIALIZADA
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            ¿Requiere asesoría o patrocinio en este ámbito?
          </h2>
          <p className="text-xs sm:text-sm text-cyan-100/80 max-w-xl mx-auto leading-relaxed">
            Ponga su causa en manos de profesionales especializados con amplia experiencia en litigio y tutela judicial en el Ecuador.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/593997224453?text=Hola,%20le%C3%AD%20el%20art%C3%ADculo%20sobre%20"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Consultar por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/#contacto"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all"
            >
              Formulario de Consulta
            </Link>
          </div>
        </div>

        {/* Otros Artículos Relacionados */}
        {otherPosts.length > 0 && (
          <div className="pt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#e6e0d6] dark:border-[#00A9A3]/25 pb-4">
              <h3 className="font-serif text-xl font-bold text-[#17211f] dark:text-white">
                Otros Artículos Doctrinales
              </h3>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#00A9A3] dark:text-[#38DFD8] hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((other) => (
                <div
                  key={other.slug}
                  className="p-6 rounded-2xl bg-white dark:bg-[#082041] border border-[#e6e0d6] dark:border-[#00A9A3]/25 hover:border-[#00A9A3]/50 hover:shadow-md transition-all space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A9A3] dark:text-[#38DFD8]">
                      {other.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#17211f] dark:text-white line-clamp-2">
                      <Link href={`/blog/${other.slug}`} className="hover:text-[#00A9A3] dark:hover:text-[#38DFD8]">
                        {other.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-[#6e7771] dark:text-slate-300 line-clamp-2">
                      {other.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${other.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#082041] dark:text-[#38DFD8] hover:text-[#00A9A3] pt-2"
                  >
                    <span>Leer</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ─── 5. FOOTER CORPORATIVO UNIFICADO ───────────────────────────── */}
      <Footer />
    </div>
  );
}
