import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SchemaMarkup from "@/components/SchemaMarkup";
import ThemeProvider from "@/components/ThemeProvider";
import CookieBanner from "@/components/CookieBanner";
import GlobalMobileNavigation from "@/components/GlobalMobileNavigation";
import ConsentAnalytics from "@/components/ConsentAnalytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

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
  metadataBase: new URL("https://ecualegal.nexotalentos.com"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://ecualegal.nexotalentos.com",
    siteName: "NexoLegal",
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
    <html lang="es" className={`${playfair.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <SchemaMarkup />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F2F2F7" media="(prefers-color-scheme: light)" />
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
