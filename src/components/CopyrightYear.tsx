"use client";

import { useEffect, useState } from "react";

/**
 * Año del copyright. Se calcula solo en el cliente, tras hidratar.
 *
 * Si el año se calculara durante el render, el HTML prerenderizado en el build
 * (con el año de compilación) y el render del cliente (con el año actual) no
 * coincidirían: React lanza el error #418 de hidratación para todos los
 * visitantes en cuanto cambia el año.
 */
export default function CopyrightYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year ?? ""}</>;
}
