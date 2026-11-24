"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MobileBottomNav from "@/components/MobileBottomNav";

const PORTAL_PREFIXES = ["/user", "/abogado", "/admin", "/empresas", "/app"];

export default function GlobalMobileNavigation() {
  const pathname = usePathname();

  const isPortal = PORTAL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // En portales (/app, /user, /abogado, /empresas, /admin), se utiliza AppExperienceNavigation.
  // En todas las demás páginas públicas, se renderiza MobileBottomNav.
  if (isPortal) {
    return null;
  }

  return <MobileBottomNav />;
}
