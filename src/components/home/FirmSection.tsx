import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FirmOrbit from "@/components/site/FirmOrbit";
import AnimatedCounter from "@/components/AnimatedCounter";
import RevealOnScroll from "@/components/motion/RevealOnScroll";
import { INSTITUTIONAL_METRICS } from "./HomeData";

export default function FirmSection() {
  return (
    <section id="historia" className="py-24 bg-[#faf8f5] border-b border-[#e6e0d6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <RevealOnScroll className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
                QUIÉNES SOMOS
              </span>
              <div className="vis-gold-divider mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
                La Firma
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#55605a] leading-relaxed font-normal">
              NexoLegal está encaminada a consolidarse como referente nacional en defensa legal corporativa,
              respaldada por una amplia experiencia en asuntos de distinta naturaleza.
            </p>
            <p className="text-base text-[#69736d] leading-relaxed">
              Está conformada por profesionales especializados en cada área legal y con experiencia en litigio.
              Nuestra sede se encuentra en Quito y contamos con profesionales asociados para brindar cobertura nacional.
            </p>
            <p className="text-base text-[#69736d] leading-relaxed">
              Hemos construido una propuesta clara de diferenciación: relaciones fiables entre cliente y abogado,
              acompañamiento a largo plazo y un servicio de excelencia orientado a resultados satisfactorios.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/nosotros"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00A9A3] to-[#00A9A3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#00A9A3]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Conoce al Socio Fundador &amp; Principios</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href="https://wa.me/593997224453?text=Deseo%20solicitar%20asesoria%20con%20el%20despacho%20de%20NexoLegal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl border border-[#00A9A3] text-[#17211f] hover:bg-[#00A9A3]/10 text-xs font-semibold active:scale-95 transition-all"
              >
                Consultar al Despacho
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12} className="lg:col-span-5">
            <div className="group relative rounded-3xl overflow-hidden border border-[#00A9A3]/40 shadow-2xl bg-[#05162E] transition-all duration-500 hover:border-[#00A9A3] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,169,163,0.25)]">
              <div className="relative h-[420px] sm:h-[460px] w-full overflow-hidden">
                <Image
                  src="/nexolegal-firma.webp"
                  alt="Junta directiva y letrados de NexoLegal en Quito"
                  fill
                  sizes="(max-width: 1023px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05162E] via-[#05162E]/25 to-transparent" />
                <div className="absolute bottom-5 inset-x-5 p-4 rounded-2xl bg-[#05162E]/85 backdrop-blur-md border border-[#00A9A3]/30 text-white flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#38DFD8]">
                    Presencia en Quito · Sede Central
                  </span>
                  <strong className="text-sm font-bold text-white">
                    Visión jurídica de excelencia con alcance nacional
                  </strong>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>

        <div className="mt-20 pt-16 border-t border-[#e6e0d6]">
          <RevealOnScroll className="max-w-3xl mb-8 lg:mb-2">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#00A9A3]">
              MISIÓN, VISIÓN Y VALORES
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#17211f] leading-tight">
              Principios que guían cada defensa
            </h2>
            <p className="mt-4 text-base text-[#69736d] leading-relaxed">
              Explora la órbita de NexoLegal y selecciona cada principio para conocer cómo orienta nuestro trabajo.
            </p>
          </RevealOnScroll>

          <FirmOrbit />
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-[#e6e0d6]">
          {INSTITUTIONAL_METRICS.map((item) => (
            <div key={item.label} className="text-center p-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-[#00A9A3] tracking-tight mb-2">
                <AnimatedCounter value={item.value} duration={2200} />
              </div>
              <div className="font-bold text-sm text-[#17211f] mb-1">{item.label}</div>
              <p className="text-xs text-[#717872] leading-relaxed">{item.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
