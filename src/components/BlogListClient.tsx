"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, BookOpen, User, Tag, Scale } from "lucide-react";
import { BlogPost } from "@/data/blogPosts";

interface BlogListClientProps {
  posts: BlogPost[];
}

const CATEGORIES = [
  "Todas",
  "Penal & Procesal",
  "COGEP & Litigios",
  "Corporativo & Compliance",
  "Civil & Tierras",
] as const;

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todas" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* ─── FILTROS Y BARRA DE BÚSQUEDA ───────────────────────────── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e6e0d6] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Pills de Categorías */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 ${
                  isActive
                    ? "bg-[#082041] text-[#38DFD8] shadow-sm"
                    : "bg-[#faf8f5] text-[#55605a] hover:bg-[#ede7dd] hover:text-[#17211f]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Input de Búsqueda */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a948e]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por tema, ley o autor..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#faf8f5] border border-[#e6e0d6] text-[#17211f] placeholder-[#8a948e] focus:outline-none focus:ring-2 focus:ring-[#00A9A3] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* ─── CONTADOR DE RESULTADOS ─────────────────────────────────── */}
      <div className="flex items-center justify-between text-xs text-[#6e7771] px-1">
        <span>
          Mostrando <strong className="text-[#17211f]">{filteredPosts.length}</strong> de{" "}
          {posts.length} artículos doctrinales
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-[#00A9A3] hover:underline"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      {/* ─── GRID DE ARTÍCULOS ───────────────────────────────────────── */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#e6e0d6] p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#faf8f5] text-[#00A9A3] flex items-center justify-center mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#17211f]">
            No encontramos artículos para su búsqueda
          </h3>
          <p className="text-xs text-[#6e7771] max-w-md mx-auto">
            Intente con otros términos como &quot;doble conforme&quot;, &quot;COGEP&quot;, &quot;compliance&quot; o seleccione la categoría &quot;Todas&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Todas");
              setSearchQuery("");
            }}
            className="px-5 py-2 rounded-xl bg-[#082041] text-[#38DFD8] text-xs font-semibold hover:brightness-110 active:scale-95 transition-all"
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => {
            const isLead = post.slug === "el-doble-conforme-en-ecuador-garantia-procesal";
            return (
              <article
                key={post.slug}
                className={`bg-white rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden group ${
                  isLead
                    ? "border-[#00A9A3]/60 shadow-md ring-1 ring-[#00A9A3]/20 md:col-span-2 lg:col-span-2"
                    : "border-[#e6e0d6] shadow-sm hover:border-[#00A9A3]/50"
                }`}
              >
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Badges de Cabecera */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#faf8f5] border border-[#e6e0d6] text-[10px] font-bold uppercase tracking-wider text-[#082041]">
                      <Tag className="w-3 h-3 text-[#00A9A3]" />
                      <span>{post.category}</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-[#6e7771]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00A9A3]" />
                        <span>{post.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Título y Enlace */}
                  <div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#17211f] group-hover:text-[#00A9A3] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-[#55605a] mt-2 font-medium line-clamp-2">
                      {post.subtitle}
                    </p>
                  </div>

                  {/* Extracto */}
                  <p className="text-xs text-[#6e7771] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Key Takeaways preview en artículo principal */}
                  {isLead && post.keyTakeaways && (
                    <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6e0d6] space-y-2 mt-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#00A9A3]">
                        <Scale className="w-3.5 h-3.5" />
                        <span>Tesis Jurídica Destacada</span>
                      </div>
                      <p className="text-xs text-[#17211f] font-medium leading-relaxed italic">
                        &quot;{post.keyTakeaways[0]}&quot;
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer de Tarjeta con Autor y CTA */}
                <div className="px-6 sm:px-8 py-4 bg-[#faf8f5]/80 border-t border-[#e6e0d6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#05162E] text-[#38DFD8] flex items-center justify-center font-bold text-xs shrink-0 border border-[#00A9A3]/40">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-xs text-[#17211f]">
                        {post.author.name}
                      </strong>
                      <span className="text-[10px] text-[#6e7771] block -mt-0.5">
                        {post.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex min-h-11 items-center gap-1.5 text-xs font-bold text-[#082041] group-hover:text-[#00A9A3] group-hover:translate-x-1 transition-all"
                  >
                    <span>Leer análisis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
