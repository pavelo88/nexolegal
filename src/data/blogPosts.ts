export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: "Penal & Procesal" | "COGEP & Litigios" | "Corporativo & Compliance" | "Civil & Tierras";
  author: {
    name: string;
    role: string;
    credentials: string;
  };
  date: string;
  readTime: string;
  keyTakeaways: string[];
  content: string[];
  seoTitle: string;
  seoDescription: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "el-doble-conforme-en-ecuador-garantia-procesal",
    title: "El Doble Conforme en Ecuador y la Garantía Procesal sin Regulación Expresa",
    subtitle: "Análisis doctrinal y jurisprudencial sobre el derecho humano al recurso ante sentencias condenatorias en el sistema penal ecuatoriano.",
    excerpt: "Estudio exhaustivo del Ab. José Aimacaña Mgtr. sobre la aplicación del principio de doble conforme en el Código Orgánico Integral Penal (COIP) y la jurisprudencia vinculante de la Corte Constitucional.",
    category: "Penal & Procesal",
    author: {
      name: "Ab. José Aimacaña Mgtr.",
      role: "Socio Fundador · NexoLegal",
      credentials: "Máster en Derecho Procesal Penal · Maestrante en Argumentación Jurídica (U. de Alicante, España)",
    },
    date: "24 de Octubre, 2026",
    readTime: "7 min de lectura",
    keyTakeaways: [
      "El principio de doble conforme exige que toda persona condenada tenga derecho a que su condena sea revisada íntegramente por un tribunal superior jerárquico.",
      "En el Ecuador, cuando un tribunal de apelación revoca una sentencia absolutoria y condena por primera vez, se genera un vacío que vulnera el Art. 8.2.h del Pacto de San José.",
      "La Corte Constitucional del Ecuador ha dictado sentencias interpretativas para tutelar esta garantía mediante un recurso especial de revisión o apelación extraordinaria.",
      "NexoLegal aplica esta estrategia técnica para evitar que condenas de primera vez en segunda instancia queden en indefensión.",
    ],
    seoTitle: "El Doble Conforme en Ecuador | NexoLegal",
    seoDescription: "Análisis del doble conforme en el sistema penal ecuatoriano por el Ab. José Aimacaña Mgtr. Jurisprudencia vinculante COIP y Corte Constitucional.",
    content: [
      "El principio del doble conforme constituye uno de los pilares más trascendentales del debido proceso penal contemporáneo. Consagrado en el Artículo 8, numeral 2, literal h de la Convención Americana sobre Derechos Humanos (Pacto de San José) y en el Artículo 14, numeral 5 del Pacto Internacional de Derechos Civiles y Políticos, garantiza que toda persona declarada culpable de un delito tenga el derecho irrestricto de recurrir del fallo ante un juez o tribunal superior.",
      "Sin embargo, en el ordenamiento jurídico de la República del Ecuador se presenta una paradoja procesal de enorme impacto: ¿qué ocurre cuando una persona es absuelta en el Tribunal de Garantías Penales (primera instancia) y, tras la apelación de la Fiscalía o acusación particular, la Sala Penal de la Corte Provincial revoca la absolución y dicta sentencia condenatoria por primera vez?",
      "En este escenario, el Código Orgánico Integral Penal (COIP) únicamente contempla el Recurso Extraordinario de Casación ante la Corte Nacional de Justicia. No obstante, la casación no es una instancia de revisión fáctica ni probatoria, sino un juicio estrictamente técnico sobre la legalidad de la sentencia. Esto dejaba al ciudadano condenado sin la posibilidad de una revisión integral de los hechos y la prueba de su primera condena, configurando una violación flagrante a la tutela judicial efectiva.",
      "A través de nuestra investigación y patrocinio en estrados, hemos sostenido la aplicabilidad directa de los tratados internacionales de derechos humanos (Artículos 11, numeral 3 y 424 de la Constitución de la República del Ecuador). La Corte Constitucional ecuatoriana, acogiendo criterios de la Corte Interamericana de Derechos Humanos (Caso Mohamed vs. Argentina y Caso Zegarra Marín vs. Perú), ha establecido que el Estado ecuatoriano debe habilitar una vía procesal efectiva para el doble conforme.",
      "En NexoLegal estructuramos las defensas penales con un enfoque de control de convencionalidad y argumentación jurídica de élite, impidiendo que resoluciones arbitrarias consoliden privaciones de la libertad sin la garantía plena de la doble conformidad procesal.",
    ],
  },
  {
    slug: "guia-cogep-terminos-plazos-procesales-ecuador",
    title: "Términos y Plazos Fatales en el COGEP: Cómo Evitar la Preclusión Judicial",
    subtitle: "Reglas clave para el cómputo de términos procesales, días hábiles, contestación a la demanda y recursos según el Código Orgánico General de Procesos.",
    excerpt: "Guía técnica para abogados y empresas sobre el régimen de términos fatales en el COGEP. Evite el rechazo de pruebas o la preclusión de derechos procesales.",
    category: "COGEP & Litigios",
    author: {
      name: "Ab. Diego Alarcón Vintimilla",
      role: "Especialista en Litigación Oral",
      credentials: "Magíster en Derecho Procesal · Sede Quito",
    },
    date: "19 de Octubre, 2026",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "En el COGEP, los términos se computan únicamente en días hábiles judiciales; los plazos en días calendario.",
      "El término de 30 días para contestar la demanda en procedimiento ordinario es fatal y no admite prórroga tácita (Art. 291 COGEP).",
      "La falta de anuncio de prueba en los actos de proposición precluye el derecho a aportarla en la audiencia preliminar.",
      "El equipo de NexoLegal puede registrar providencias y alertas internas en su plataforma para apoyar el control profesional de los plazos.",
    ],
    seoTitle: "Términos Procesales COGEP Ecuador | Guía Judicial",
    seoDescription: "Guía legal sobre términos y plazos en el COGEP Ecuador. Cómputo de días hábiles, contestación de demanda ordinaria y apelación en estrados.",
    content: [
      "El Código Orgánico General de Procesos (COGEP) transformó el sistema de justicia ecuatoriano al consagrar el principio de oralidad por audiencias y la celeridad procesal. No obstante, uno de los mayores riesgos para los justiciables radica en el desconocimiento o error en el cómputo de los términos procesales.",
      "Conforme al Artículo 73 del COGEP, los términos corren a partir del día hábil siguiente a la notificación de la providencia judicial respectiva. Si la notificación ocurre por boletas en casillero judicial electrónico, el término inicia conforme a las reglas de radicación y horario judicial.",
      "En el Procedimiento Ordinario, el demandado cuenta con un término fatal de 30 días (Art. 291 COGEP) para deducir excepciones previas, contestar los hechos de la demanda y anunciar la totalidad de sus pruebas documentales, testimoniales y periciales. La preclusión opera con rigor absoluto: cualquier prueba no anunciada oportunamente será declarada inadmisible en la audiencia preliminar.",
      "En NexoLegal utilizamos una metodología interna de trazabilidad y control dual para registrar providencias, revisar agendas letradas y reducir el riesgo operativo en el seguimiento de plazos. La verificación profesional sigue siendo obligatoria.",
    ],
  },
  {
    slug: "defensa-penal-corporativa-compliance-ecuador",
    title: "Responsabilidad Penal de las Personas Jurídicas y Programas de Compliance en Ecuador",
    subtitle: "Implicaciones del COIP para empresas y directorios: blindaje preventivo frente a delitos tributarios, aduaneros y lavado de activos.",
    excerpt: "Cómo proteger a empresas, gerencias y accionistas en Ecuador mediante auditorías de cumplimiento normativo y defensa penal societaria.",
    category: "Corporativo & Compliance",
    author: {
      name: "Ab. José Aimacaña Mgtr.",
      role: "Socio Fundador · NexoLegal",
      credentials: "Máster en Derecho Procesal Penal",
    },
    date: "12 de Octubre, 2026",
    readTime: "6 min de lectura",
    keyTakeaways: [
      "El Artículo 49 del COIP consagra la responsabilidad penal independiente de las personas jurídicas frente a las personas naturales que actúan en su nombre.",
      "Las sanciones corporativas incluyen multas millonarias, clausura temporal, inhabilitación para contratar con el Estado y la disolución judicial de la compañía.",
      "La implementación de un programa de compliance penal idóneo opera como eximente o atenuante de responsabilidad penal corporativa.",
      "NexoLegal diseña matrices de riesgo societario a medida para corporaciones nacionales y multinacionales en Quito y Guayaquil.",
    ],
    seoTitle: "Compliance y Responsabilidad Penal Empresas Ecuador",
    seoDescription: "Responsabilidad penal de personas jurídicas en Ecuador bajo el COIP. Compliance corporativo, prevención de delitos y blindaje para directorios.",
    content: [
      "La legislación penal ecuatoriana superó el viejo aforismo societatis delinquere non potest al incorporar formalmente en el COIP la responsabilidad penal autónoma de las personas jurídicas de derecho privado.",
      "Una empresa en el Ecuador puede ser procesada y sentenciada penalmente cuando los delitos sean cometidos para beneficio propio o de sus accionistas, por personas que ejerzan la representación legal, directiva o de control. Esto abarca delitos de defraudación tributaria ante el SRI, contrabando aduanero, cohecho, lavado de activos y delitos contra el ambiente.",
      "Frente a este escenario de riesgo extremo, el compliance penal o programa de cumplimiento normativo se ha convertido en el escudo indispensable para los directorios empresariales. Un programa de cumplimiento serio debe contar con un mapa de riesgos penales, canales de denuncia anónimos, código de ética vinculante y protocolos de debida diligencia.",
    ],
  },
  {
    slug: "prescripcion-adquisitiva-dominio-tierras-quito",
    title: "Prescripción Adquisitiva Extraordinaria de Dominio en Ecuador: Requisitos y Carga Probatoria",
    subtitle: "Cómo regularizar la titularidad de bienes inmuebles en Quito y provincias tras 15 años de posesión pacífica e ininterrumpida.",
    excerpt: "Análisis del juicio ordinario de prescripción extraordinaria de dominio bajo el Código Civil ecuatoriano y el COGEP. La importancia de la prueba pericial.",
    category: "Civil & Tierras",
    author: {
      name: "Dra. Valeria Santamaría",
      role: "Especialista en Derecho Civil & Inmobiliario",
      credentials: "Abogada Litigante · Experta en Tierras y Patrimonio",
    },
    date: "05 de Octubre, 2026",
    readTime: "5 min de lectura",
    keyTakeaways: [
      "La prescripción adquisitiva extraordinaria requiere posesión material pacífica, pública, ininterrumpida y con ánimo de señor y dueño por al menos 15 años (Art. 2410 Código Civil).",
      "No es suficiente el pago de predios urbanos; se deben demostrar actos posesorios materiales (construcciones, cercamientos, mejoras y testimonio de colindantes).",
      "Es indispensable demandar a los titulares registrales que consten en el Certificado de Gravámenes del Registro de la Propiedad del cantón.",
      "La sentencia judicial protocolizada e inscrita en el Registro de la Propiedad constituye el título de dominio perfecto.",
    ],
    seoTitle: "Prescripción Extraordinaria de Dominio Ecuador | Guía",
    seoDescription: "Requisitos legales para el juicio de prescripción adquisitiva extraordinaria de dominio en Ecuador. Posesión de 15 años y prueba pericial.",
    content: [
      "La regularización de tierras y bienes inmuebles en el Ecuador encuentra en la prescripción adquisitiva extraordinaria de dominio su vía procesal más frecuente y contundente.",
      "El Código Civil ecuatoriano, en su Artículo 2410, establece que el dominio de las cosas comerciales que no han sido adquiridas por la prescripción ordinaria, puede ser adquirido por la extraordinaria, requiriéndose el transcurso de por lo menos 15 años sin necesidad de título alguno.",
      "Para que la pretensión prospere en sede judicial bajo el procedimiento ordinario del COGEP, la carga probatoria es determinante: se debe acreditar la posesión con ánimo de señor y dueño, sin violencia ni clandestinidad, mediante peritajes planimétricos, testimonios de vecinos colindantes y pruebas de inversión material.",
    ],
  },
];
