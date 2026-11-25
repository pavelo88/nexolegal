import React from "react";

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "ProfessionalService"],
        "@id": "https://ecualegal.nexotalentos.com/#organization",
        "name": "NexoLegal Ecuador",
        "alternateName": "NexoLegal Asesoría Jurídica",
        "url": "https://ecualegal.nexotalentos.com",
        "logo": "https://ecualegal.nexotalentos.com/icon-dark.png",
        "image": "https://ecualegal.nexotalentos.com/hero-corporate-architecture.jpg",
        "description":
          "Firma jurídica líder y plataforma LegalTech en Ecuador. Defensa penal, litigios civiles COGEP, derecho corporativo, laboral, tránsito, familia y trazabilidad procesal digital 24/7.",
        "telephone": "+593-99-722-4453",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Av. República de El Salvador y Naciones Unidas, Edificio Citiplaza",
          "addressLocality": "Quito",
          "addressRegion": "Pichincha",
          "postalCode": "170505",
          "addressCountry": "EC",
        },
        "areaServed": [
          { "@type": "Country", "name": "Ecuador" },
          { "@type": "City", "name": "Quito" },
          { "@type": "City", "name": "Guayaquil" },
          { "@type": "City", "name": "Cuenca" },
        ],
        "knowsAbout": [
          "Derecho Penal y Litigios COIP Ecuador",
          "Derecho Civil y Procesal COGEP",
          "Derecho Corporativo, Societario y Compliance",
          "Derecho Laboral y Visto Bueno",
          "Derecho de Familia, Niñez y Sucesiones",
          "Tránsito, Impugnaciones y Derecho Administrativo",
          "LegalTech y Seguimiento SATJE",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Jurídicos Estratégicos NexoLegal Ecuador",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Litigios y Defensa Penal de Alto Impacto",
                "description": "Patrocinio en causas penales, audiencias orales y defensa ante la Corte Nacional y Cortes Provinciales.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Blindaje Societario, Laboral y Compliance Empresarial",
                "description": "Asesoría corporativa fija para empresas en Ecuador, contratos blindados, visto bueno y prevención de contingencias.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Derecho Civil, Herencias y Sucesiones",
                "description": "Prescripción adquisitiva, partición de bienes, acuerdos familiares y procesos ordinarios COGEP.",
              },
            },
          ],
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+593-99-722-4453",
          "contactType": "customer service",
          "areaServed": "EC",
          "availableLanguage": ["Spanish"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ecualegal.nexotalentos.com/#website",
        "url": "https://ecualegal.nexotalentos.com",
        "name": "NexoLegal Ecuador",
        "publisher": {
          "@id": "https://ecualegal.nexotalentos.com/#organization",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://ecualegal.nexotalentos.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Cómo inicio una consulta legal urgente con NexoLegal en Ecuador?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes solicitar un diagnóstico estratégico en menos de 24 horas directamente por WhatsApp (+593 99 722 4453), mediante el formulario web o desde nuestro Asistente Legal IA en ecualegal.nexotalentos.com.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Atienden casos en todo el Ecuador o solo en Quito?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nuestra sede central está en Quito (Av. República de El Salvador y Naciones Unidas, Edificio Citiplaza) y contamos con red de abogados asociados y procuradores en Guayaquil, Cuenca, Ambato, Manta y las 24 provincias del Ecuador.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia a NexoLegal de un estudio jurídico tradicional?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Combinamos defensa letrada especializada en litigio con tecnología LegalTech operada por SinergIA Tech: trazabilidad procesal en tiempo real, portal de clientes 24/7 y alertas tempranas de términos bajo el COGEP y COIP.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
