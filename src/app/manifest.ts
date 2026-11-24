import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NexoLegal - LegalTech Ecuador",
    short_name: "NexoLegal",
    description: "Aplicación Jurídica Integral y Seguimiento de Causas Judiciales en Ecuador — NexoLegal (ecualegal.nexotalentos.com)",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F2F7",
    theme_color: "#082041",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
