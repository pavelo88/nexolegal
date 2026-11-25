import React from "react";
import { FileText, CheckCircle2, Shield, Building2 } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Términos y Condiciones de Uso y Servicios Legales | NexoLegal Ecuador",
  description:
    "Términos y condiciones de la plataforma LegalTech y servicios jurídicos de NexoLegal Leyes aplicables de la República del Ecuador. Jurisdicción Quito.",
};

const termSections = [
  {
    title: "1. Identificación del Titular y Aceptación",
    content: (
      <>
        Los presentes Términos y Condiciones regulan el acceso, navegación y uso de la plataforma digital y los servicios profesionales
        ofrecidos por <strong>NexoLegal (NexoLegal)</strong>, sociedad de nacionalidad ecuatoriana, domiciliada en
        el Distrito Metropolitano de <strong>Quito, Provincia de Pichincha, República del Ecuador</strong>.
        <br />
        <br />
        Al navegar por el sitio web, registrarse en el Portal o solicitar una consulta jurídica, el usuario declara haber leído,
        comprendido y aceptado íntegramente estas estipulaciones contractuales, las cuales constituyen un acuerdo vinculante.
      </>
    ),
  },
  {
    title: "2. Naturaleza del Sitio Web y Alcance de las Consultas",
    content: (
      <>
        El contenido publicado en la web (artículos, simuladores, respuestas generales y guías) tiene carácter estrictamente
        <strong> informativo y orientativo</strong>, y no sustituye en ningún caso el patrocinio letrado directo de un profesional del derecho.
        <br />
        <br />
        El envío de un formulario de contacto o consulta preliminar no constituye por sí solo la existencia de una relación formal
        abogado-cliente ni genera mandato judicial, hasta que las partes suscriban el respectivo <strong>Convenio de Servicios Profesionales y Patrocinio</strong>.
      </>
    ),
  },
  {
    title: "3. Uso del Portal LegalTech y Cuentas de Acceso",
    content: (
      <>
        El acceso al Portal Privado de Clientes, Buzón de Notificaciones con IA y Sala de Audiencias requiere credenciales
        individuales e intransferibles. El usuario se compromete a:
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Custodiar con diligencia sus contraseñas y factores de autenticación.</li>
          <li>Notificar de inmediato a NexoLegal ante cualquier sospecha de acceso no autorizado.</li>
          <li>No utilizar la plataforma para fines ilícitos, vulneración de sistemas judiciales ni extracción automatizada no consentida.</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Contratación de Honorarios y Transparencia Económica",
    content: (
      <>
        En estricto apego al principio de transparencia, todo encargo jurídico contará con una <strong>hoja de encargo o contrato escrito</strong>
        que detallará el objeto del patrocinio, los honorarios pactados (fijos, por etapas procesales o cuota litis conforme al COFJ),
        la forma de pago y los gastos procesales judiciales o notariales.
        <br />
        <br />
        Toda transacción y factura emitida cumplirá con los requisitos tributarios de facturación electrónica del Servicio de Rentas Internas (SRI).
      </>
    ),
  },
  {
    title: "5. Secreto Profesional y Confidencialidad Procesal",
    content: (
      <>
        Los letrados y el personal técnico de NexoLegal observan en todo momento el <strong>deber de sigilo y secreto profesional</strong>
        consagrado en el Artículo 335 del Código Orgánico de la Función Judicial. Ninguna pieza procesal, prueba, borrador o dato del cliente
        será divulgado a terceros salvo instrucción documentada o requerimiento formal de autoridad judicial competente.
      </>
    ),
  },
  {
    title: "6. Propiedad Intelectual",
    content: (
      <>
        Todos los signos distintivos, marcas registradas (NexoLegal, NexoLegal), logotipos, diseños, código fuente, algoritmos del asistente
        y materiales editoriales son propiedad exclusiva de NexoLegal o se encuentran debidamente licenciados. Queda prohibida su reproducción,
        distribución o ingeniería inversa sin autorización previa y por escrito.
      </>
    ),
  },
  {
    title: "7. Limitación de Responsabilidad",
    content: (
      <>
        El ejercicio del derecho y el litigio procesal implican una <strong>obligación de medios rigurosos y diligentes, no de resultado garantizado</strong>,
        puesto que las resoluciones judiciales corresponden a los juzgadores y tribunales de la República del Ecuador.
        NexoLegal garantiza la aplicación de la máxima pericia jurídica, técnica y probatoria en favor de sus patrocinados.
      </>
    ),
  },
  {
    title: "8. Legislación Aplicable y Solución de Controversias",
    content: (
      <>
        Los presentes Términos se rigen e interpretan conforme a las leyes de la <strong>República del Ecuador</strong>.
        Para cualquier divergencia o controversia derivada de este acuerdo o de los servicios profesionales, las partes renuncian fuero
        y domicilio y acuerdan someterse en primera instancia a un procedimiento de <strong>mediación</strong> ante el Centro de Arbitraje
        y Mediación de la Cámara de Comercio de Quito (CCQ). De no mediar acuerdo, la controversia se resolverá ante los jueces competentes
        del Distrito Metropolitano de Quito, Provincia de Pichincha.
      </>
    ),
  },
  {
    title: "9. Política de Cancelación, Desistimiento y Reembolsos",
    content: (
      <>
        En cumplimiento de los estándares de protección al consumidor y las directrices de plataformas de pago y redes publicitarias (Google Ads, Meta Ads):
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><strong>Consultas Preliminares:</strong> El cliente podrá cancelar o reprogramar una consulta agendada con al menos 4 horas de anticipación sin penalidad, recibiendo el reembolso íntegro o la reasignación de turno.</li>
          <li><strong>Igualas Jurídicas y Retainers Corporativos:</strong> Los planes mensuales pueden cancelarse en cualquier momento con un preaviso de 15 días calendario antes del siguiente ciclo de facturación, sin cláusulas de permanencia abusivas.</li>
          <li><strong>Patrocinio y Procesos en Curso:</strong> En caso de revocatoria de mandato o terminación anticipada por voluntad del cliente, se liquidarán exclusivamente los honorarios proporcionales a las fases procesales efectivamente ejecutadas y documentadas en el expediente, reembolsando los saldos no devengados conforme a la hoja de encargo.</li>
        </ul>
      </>
    ),
  },
  {
    title: "10. Canales de Notificación y Modificaciones",
    content: (
      <>
        NexoLegal podrá actualizar estos términos conforme a evoluciones normativas del ordenamiento jurídico ecuatoriano. Toda modificación
        se publicará en esta sección.
        <br />
        <br />
        Para comunicaciones formales o solicitudes de reembolso/cancelación:{" "}
        <strong className="text-[#00A9A3]"><span>legal</span><span>&#64;</span><span>nexolegal.ec</span></strong> · WhatsApp: <strong>+593 99 722 4453</strong> · Quito, Ecuador.
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] dark:bg-[#05162E] text-[#17211f] dark:text-slate-100 pb-0">
      <PublicNavbar />

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A3]/10 border border-[#00A9A3]/30 text-xs font-bold uppercase tracking-wider text-[#00A9A3]">
            <FileText size={14} />
            <span>Condiciones Contractuales · República del Ecuador</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17211f] dark:text-white leading-tight tracking-tight">
            Términos &amp; Condiciones de Servicio
          </h1>
          <p className="text-base sm:text-lg text-[#55605a] dark:text-slate-300 leading-relaxed max-w-2xl">
            Bases jurídicas para el uso de la plataforma LegalTech y la prestación de servicios profesionales de defensa y asesoría letrada.
          </p>
        </div>

        {/* Corporate Stamp */}
        <div className="mt-8 p-5 rounded-2xl bg-white dark:bg-[#082041] border border-[#00A9A3]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#082041]/10 dark:bg-[#00A9A3]/15 text-[#082041] dark:text-[#38DFD8] flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-[#00A9A3] dark:text-[#38DFD8]" />
            </div>
            <div>
              <strong className="block text-sm text-[#17211f] dark:text-white">NexoLegal · SinergIA Tech</strong>
              <span className="text-[#6e7771] dark:text-slate-300">Sede Central: Quito, Pichincha, Ecuador · COFJ Art. 335</span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-[11px] font-mono text-[#6e7771] dark:text-slate-400">Vigencia Contractual: Año 2026</span>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="mt-12 space-y-10">
          {termSections.map((sec, idx) => (
            <section key={idx} className="p-6 rounded-2xl bg-white dark:bg-[#082041] border border-[#e6e0d6] dark:border-[#00A9A3]/25 shadow-sm space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#17211f] dark:text-white">
                {sec.title}
              </h2>
              <div className="text-sm leading-relaxed text-[#55605a] dark:text-slate-300">
                {sec.content}
              </div>
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  );
}
