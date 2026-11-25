import type { Metadata, Viewport } from "next";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import ThemeProvider from "@/components/ThemeProvider";
import CookieBanner from "@/components/CookieBanner";
import GlobalMobileNavigation from "@/components/GlobalMobileNavigation";
import ConsentAnalytics from "@/components/ConsentAnalytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F2F7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: "NexoLegal | Plataforma LegalTech & Abogados Ecuador",
  description:
    "Firma jurídica y plataforma LegalTech con app móvil 24/7. Gestión transparente de casos, prevención ciudadana y membresía premium en Ecuador.",
  keywords: [
    "NexoLegal",
    "NexoTalentos Legal",
    "LegalTech Ecuador",
    "App judicial",
    "Membresía jurídica",
    "Abogados Quito",
    "Abogados Guayaquil",
    "Buzón judicial IA",
    "Prevención legal",
  ],
  authors: [{ name: "NexoLegal" }],
  creator: "NexoLegal",
  publisher: "NexoLegal",
  metadataBase: new URL("https://ecualegal.vercel.app"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://ecualegal.vercel.app",
    siteName: "NexoLegal",
    title: "NexoLegal | Plataforma LegalTech & Abogados Ecuador",
    description:
      "Firma jurídica y plataforma LegalTech con app móvil 24/7. Gestión transparente de casos, prevención ciudadana y membresía premium en Ecuador.",
    images: [
      {
        url: "https://ecualegal.vercel.app/hero-corporate-architecture.jpg",
        width: 1200,
        height: 630,
        alt: "NexoLegal | Plataforma LegalTech & Abogados Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexoLegal | Plataforma LegalTech & Abogados Ecuador",
    description:
      "Firma jurídica y plataforma LegalTech con app móvil 24/7. Gestión transparente de casos en Ecuador.",
    images: ["https://ecualegal.vercel.app/hero-corporate-architecture.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.ico?v=2", sizes: "any" },
    ],
    apple: [
      { url: "/icon-dark.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "NexoLegal",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
        <link rel="alternate icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-dark.png?v=2" />
        <meta name="theme-color" content="#05162E" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F2F2F7" media="(prefers-color-scheme: light)" />
        <meta property="og:image" content="https://ecualegal.vercel.app/hero-corporate-architecture.jpg" />
        <meta property="og:image:secure_url" content="https://ecualegal.vercel.app/hero-corporate-architecture.jpg" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="https://ecualegal.vercel.app/hero-corporate-architecture.jpg" />
        {/* Inline script to prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme')||'light';document.documentElement.classList.add(t==='dark'?'dark':'light')}catch(e){document.documentElement.classList.add('light')}})();`
        }} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          {children}
          <ConsentAnalytics />
          <CookieBanner />
          <GlobalMobileNavigation />
        </ThemeProvider>
      </body>
    </html>
  );
}
