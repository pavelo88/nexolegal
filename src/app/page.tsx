import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";
import {
  HomeHero,
  FirmSection,
  ServicesPracticeGrid,
  MethodologySection,
  FaqSection,
  ContactSection,
} from "@/components/home";
import RevealOnScroll from "@/components/motion/RevealOnScroll";

export default function Home() {
  return (
    <div className="site-shell relative min-h-screen pb-0">
      {/* 0 & 1. Header con Smart Navigation y Selector de Modo */}
      <PublicNavbar />

      {/* 2. Hero Interactivo de Alta Conversión */}
      <HomeHero />

      {/* 3. Quiénes somos, Órbita de Principios y Métricas Institucionales */}
      <FirmSection />

      {/* 4. Especialidades Jurídicas y Banner de Diagnóstico */}
      <ServicesPracticeGrid />

      {/* 5. Metodología en 3 Pasos y Respaldo LegalTech */}
      <RevealOnScroll>
        <MethodologySection />
      </RevealOnScroll>

      {/* 6. Preguntas Frecuentes y Asistencia Inmediata */}
      <RevealOnScroll>
        <FaqSection />
      </RevealOnScroll>

      {/* 7. Formulario de Contacto (Columnas 50/50 balanceadas) */}
      <RevealOnScroll>
        <ContactSection />
      </RevealOnScroll>

      {/* 8. Footer Corporativo */}
      <Footer />
    </div>
  );
}
