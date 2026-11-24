import React from "react";
import Link from "next/link";
import { Scale, ShieldCheck, Lock, FileCheck, ArrowLeft, Mail, MapPin } from "lucide-react";
import CopyrightYear from "@/components/CopyrightYear";

export const metadata = {
  title: "Política de Privacidad y Protección de Datos Personales | NexoLegal Ecuador",
  description:
    "Tratamiento de datos personales conforme a la Ley Orgánica de Protección de Datos Personales (LOPDP) de la República del Ecuador. NexoLegal Quito, Ecuador.",
};

const sections = [
  {
    title: "1. Responsable del Tratamiento y Marco Jurídico Ecuatoriano",
    content: (
      <>
        El responsable del tratamiento de los datos personales es <strong>NexoLegal (NexoLegal)</strong>,
        sociedad legalmente constituida en la República del Ecuador, con RUC corporativo, domicilio legal principal en la ciudad
        de <strong>Quito, Distrito Metropolitano, Provincia de Pichincha</strong>.
        <br />
        <br />
        Esta política se fundamenta y rige estrictamente por la{" "}
        <strong>Ley Orgánica de Protección de Datos Personales (LOPDP)</strong> publicada en el Registro Oficial Suplemento 459
        del 26 de mayo de 2021, la Constitución de la República del Ecuador (Art. 66 numeral 19), la Ley de Comercio Electrónico,
        Firmas Electrónicas y Mensajes de Datos, y los estándares de confidencialidad del Código Orgánico de la Función Judicial (Art. 335).
      </>
    ),
  },
  {
    title: "2. Principios del Tratamiento de Datos Personales",
    content: (
      <>
        En cumplimiento del Artículo 10 de la LOPDP, todo tratamiento de datos en NexoLegal se rige por los principios de:
        <strong> juridicidad</strong>, <strong>lealtad y transparencia</strong>, <strong>finalidad determinada</strong>,
        <strong> pertinencia y minimización</strong>, <strong>exactitud</strong>, <strong>conservación limitada</strong>,
        <strong> seguridad y confidencialidad</strong>, y <strong>responsabilidad proactiva y demostrada</strong>.
      </>
    ),
  },
  {
    title: "3. Categorías de Datos Recopilados",
    content: (
      <>
        Tratamos únicamente los datos necesarios para la prestación de asesoría jurídica y el funcionamiento de la plataforma LegalTech:
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><strong>Datos de Identificación y Contacto:</strong> Nombres completos, número de cédula de ciudadanía o RUC, dirección de correo electrónico, número telefónico y ciudad de residencia.</li>
          <li><strong>Datos Procesales y de Casos:</strong> Número de causa judicial SATJE, unidad judicial de radicación, judicatura, tipo de procedimiento y documentación provista voluntariamente para patrocinio.</li>
          <li><strong>Datos de Navegación y Sesión Segura:</strong> Dirección IP, registros de acceso cifrados, identificadores de sesión y cookies técnicas indispensables.</li>
        </ul>
        <em>No recopilamos datos crediticios sensibles en formularios públicos ni vendemos jamás bases de datos a terceros.</em>
      </>
    ),
  },
  {
    title: "4. Finalidad Legítima del Tratamiento",
    content: (
      <>
        Los datos recopilados se destinan exclusivamente a:
        <ol className="mt-2 list-decimal pl-5 space-y-1">
          <li>Gestión, tramitación y seguimiento de causas, audiencias y expedientes judiciales en el sistema SATJE.</li>
          <li>Atención de consultas jurídicas y emisión de propuestas técnicas profesionales.</li>
          <li>Acceso seguro y autenticado al Portal de Clientes, Buzón de Notificaciones con IA y Chat Cifrado con el letrado patrocinador.</li>
          <li>Facturación electrónica y cumplimiento de obligaciones tributarias ante el Servicio de Rentas Internas (SRI).</li>
          <li>Notificación de términos y plazos procesales perentorios previstos en el COGEP y COIP.</li>
        </ol>
      </>
    ),
  },
  {
    title: "5. Secreto Profesional y Confidencialidad Letrada",
    content: (
      <>
        Toda comunicación e información suministrada por el cliente a los abogados de NexoLegal está amparada bajo el
        <strong> secreto profesional irrestricto</strong> garantizado por la legislación ecuatoriana y los códigos de ética profesional.
        La información de casos y estrategias procesales no podrá ser revelada sin autorización expresa del titular o mandato judicial vinculante.
      </>
    ),
  },
  {
    title: "6. Ejercicio de Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)",
    content: (
      <>
        Conforme a los Artículos 21 al 28 de la LOPDP, usted como titular de datos personales tiene derecho a:
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li><strong>Acceso:</strong> Conocer qué datos personales suyos constan en nuestros registros.</li>
          <li><strong>Rectificación y Actualización:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
          <li><strong>Eliminación (Supresión):</strong> Exigir la supresión de sus datos cuando ya no sean necesarios para la relación jurídica, salvo deber legal de conservación procesal o fiscal.</li>
          <li><strong>Oposición y Limitación:</strong> Oponerse al tratamiento para fines específicos no esenciales.</li>
          <li><strong>Portabilidad:</strong> Obtener sus datos en formato digital estructurado e interoperable.</li>
        </ul>
        <br />
        Para ejercer cualquiera de sus derechos ARCO, puede remitir una solicitud escrita dirigida al Delegado de Protección de Datos de NexoLegal a:{" "}
        <strong className="text-[#00A9A3]">privacidad@nexotalentos.com</strong> o mediante comunicación física en nuestra sede de Quito.
      </>
    ),
  },
  {
    title: "7. Transferencia y Encargados del Tratamiento",
    content: (
      <>
        NexoLegal podrá apoyarse en proveedores de alojamiento, base de datos, mensajería y analítica configurados para prestar el servicio. Cuando se habiliten mediciones con consentimiento, podrán intervenir Google y Meta según la selección del usuario. Los proveedores aplicables, su finalidad y las transferencias correspondientes se revisarán conforme a sus contratos y políticas vigentes.
      </>
    ),
  },
  {
    title: "8. Política de Cookies y Tecnologías de Rastreo",
    content: (
      <>
        Utilizamos almacenamiento técnico necesario para sesiones y preferencias. Las etiquetas de Google o Meta solo se cargan
        cuando el usuario acepta la categoría analítica. La selección queda almacenada en el dispositivo y puede modificarse en
        cualquier momento mediante el botón “Privacidad” visible en el sitio. Al retirar el consentimiento se impiden nuevas cargas
        de medición en visitas posteriores; la eliminación de datos ya tratados se solicita mediante los canales indicados en esta política.
      </>
    ),
  },
  {
    title: "9. Autoridad de Control Competente",
    content: (
      <>
        Si considera que el tratamiento de sus datos vulnera la normativa aplicable, le asiste el derecho de presentar un reclamo ante la{" "}
        <strong>Superintendencia de Protección de Datos Personales del Ecuador</strong>, sin perjuicio de las acciones judiciales que correspondan en sede constitucional o contenciosa administrativa.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#17211f]">
      {/* Top Header */}
      <header className="border-b border-[#e6e0d6] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center gap-2.5 text-[#17211f] group">
            <span className="w-9 h-9 rounded-xl bg-[#082041] text-[#38DFD8] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Scale size={18} />
            </span>
            <span className="font-bold tracking-wide text-base">
              Nexo<span className="text-[#00A9A3] font-serif italic">Legal</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55605a] hover:text-[#17211f] transition-colors px-3 py-1.5 rounded-full hover:bg-stone-100"
          >
            <ArrowLeft size={14} />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      {/* Main Content Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00A9A3]/10 border border-[#00A9A3]/30 text-xs font-bold uppercase tracking-wider text-[#00A9A3]">
            <ShieldCheck size={14} />
            <span>Normativa Oficial de la República del Ecuador</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#17211f] leading-tight tracking-tight">
            Política de Privacidad &amp; Protección de Datos
          </h1>
          <p className="text-base sm:text-lg text-[#55605a] leading-relaxed max-w-2xl">
            Tratamiento riguroso de información personal y procesal bajo los estándares de la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador.
          </p>
        </div>

        {/* Legal Badge */}
        <div className="mt-8 p-5 rounded-2xl bg-white border border-[#00A9A3]/40 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#082041]/10 text-[#082041] flex items-center justify-center shrink-0">
              <Lock size={20} className="text-[#00A9A3]" />
            </div>
            <div>
              <strong className="block text-sm text-[#17211f]">Marco Legal LOPDP Ecuador</strong>
              <span className="text-[#6e7771]">Registro Oficial Suplemento 459 · Secreto Profesional COFJ Art. 335</span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-[11px] font-mono text-[#6e7771]">Vigencia: Año 2026</span>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="mt-12 space-y-10">
          {sections.map((sec, idx) => (
            <section key={idx} className="p-6 rounded-2xl bg-white border border-[#e6e0d6] shadow-sm space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#17211f] flex items-center gap-2">
                <span>{sec.title}</span>
              </h2>
              <div className="text-sm leading-relaxed text-[#55605a]">
                {sec.content}
              </div>
            </section>
          ))}
        </div>

        {/* Contact DPO Box */}
        <div className="mt-14 p-8 rounded-3xl bg-[#05162E] text-white border border-[#00A9A3]/40 shadow-xl space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">
            Canal Formal de Ejercicio de Derechos ARCO
          </h3>
          <p className="text-sm text-cyan-100/80 leading-relaxed">
            Para ejercer sus derechos de acceso, rectificación, cancelación o solicitar información sobre sus expedientes protegidos, contacte a nuestro Delegado de Protección de Datos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <Mail className="text-[#38DFD8] w-4 h-4 shrink-0" />
              <span>privacidad@nexotalentos.com</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
              <MapPin className="text-[#38DFD8] w-4 h-4 shrink-0" />
              <span>Av. República de El Salvador y Shyris, Quito, Ecuador</span>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#e6e0d6] py-8 text-center text-xs text-[#6e7771]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© <CopyrightYear /> NexoLegal · Todos los derechos reservados · Quito, Ecuador</span>
          <div className="flex items-center gap-4">
            <Link href="/terminos" className="hover:text-[#00A9A3] underline">Términos y Condiciones</Link>
            <Link href="/" className="hover:text-[#00A9A3] underline">Inicio</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
