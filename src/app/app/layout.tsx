import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "App | NexoLegal",
  description: "Espacio de trabajo de la plataforma NexoLegal.",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
