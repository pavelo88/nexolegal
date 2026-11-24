"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Building2,
  LayoutGrid,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const destinations = [
  { href: "/app", label: "Apps", Icon: LayoutGrid },
  { href: "/user", label: "Cliente", Icon: UserRound },
  { href: "/empresas", label: "Empresa", Icon: Building2 },
  { href: "/abogado", label: "Abogado", Icon: BriefcaseBusiness },
  { href: "/admin", label: "Admin", Icon: ShieldCheck },
];

export function DemoEnvironmentBadge() {
  return null;
}

export default function AppExperienceNavigation() {
  const pathname = usePathname();

  return (
    <nav className="app-experience-dock" aria-label="Cambiar de aplicación NexoLegal">
      <div className="app-experience-dock__surface">
        {destinations.map(({ href, label, Icon }) => {
          const active = pathname === href || (href !== "/app" && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`app-experience-dock__item ${active ? "is-active" : ""}`}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
