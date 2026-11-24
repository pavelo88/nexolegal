import React from "react";

export default function SchemaMarkup() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": "https://ecualegal.nexotalentos.com/#organization",
        "name": "NexoLegal",
        "alternateName": "NexoLegal Ecuador",
        "url": "https://ecualegal.nexotalentos.com",
        "logo": "https://ecualegal.nexotalentos.com/logo.png",
        "parentOrganization": {
          "@type": "Organization",
          "name": "NexoTalentos",
          "url": "https://nexotalentos.com",
        },
        "description":
          "Firma jurídica y plataforma LegalTech integral de NexoTalentos. Asesoría jurídica, litigios, membresía preventiva y seguimiento digital de expedientes en Ecuador.",
        "areaServed": {
          "@type": "Country",
          "name": "Ecuador",
        },
        "knowsAbout": [
          "Derecho Civil",
          "Derecho Laboral",
          "Derecho Corporativo y Societario",
          "Derecho de Familia",
          "Derecho Penal",
          "Prevención Jurídica",
          "LegalTech",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Servicios Jurídicos y Membresías",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Membresía NexoLegal PREMIUM",
                "description": "Capacitación jurídica mensual para ciudadanos y pymes, check-up preventivo y tarifas preferenciales.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Patrocinio Judicial y Asesoría Legal Integral",
                "description": "Representación técnica en causas civiles, laborales, societarias y de familia.",
              },
            },
          ],
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+593-99-178-6275",
          "contactType": "customer service",
          "availableLanguage": ["Spanish", "English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://ecualegal.nexotalentos.com/#website",
        "url": "https://ecualegal.nexotalentos.com",
        "name": "NexoLegal",
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
            "name": "¿Qué es NexoLegal y cuál es su relación con Nexo Talento?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NexoLegal (ecualegal.nexotalentos.com) es la división de asesoría jurídica y plataforma LegalTech complementaria de Nexo Talento, especializada en derecho laboral, corporativo, mercantil, litigios y contratación empresarial en Ecuador y LATAM.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Cómo inicio una consulta legal con NexoLegal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puedes solicitar una evaluación directa desde el formulario de la plataforma o por WhatsApp 24/7 para recibir un diagnóstico inicial y estrategia procesal.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Qué diferencia a NexoLegal de los estudios jurídicos tradicionales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NexoLegal combina litigación y blindaje corporativo con tecnología LegalTech: portal de clientes en tiempo real, alertas de términos procesales y sinergia directa con el ecosistema empresarial de Nexo Talento.",
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
