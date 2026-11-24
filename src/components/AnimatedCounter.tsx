"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1800,
  className = "",
}: AnimatedCounterProps) {
  // Inicializamos con el valor real para evitar que quede atascado en 0
  const [displayValue, setDisplayValue] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      if (value === "24/7") {
        setDisplayValue("24/7");
        return;
      }

      // Soporta prefijos (como "+", "$"), números enteros o decimales y sufijos ("%", "M", "K")
      const cleanStr = value.replace(/,/g, "");
      const match = cleanStr.match(/^([^\d]*)(\d+(?:\.\d+)?)([^\d]*)$/);
      if (!match) {
        setDisplayValue(value);
        return;
      }

      const prefix = match[1] || "";
      const targetNum = parseFloat(match[2]);
      const suffix = match[3] || "";
      const isDecimal = match[2].includes(".");
      const decimals = isDecimal ? match[2].split(".")[1].length : 0;

      const startTime = performance.now();

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Curva cúbica Apple suave out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNum = targetNum * easeProgress;

        const formattedNum = isDecimal
          ? currentNum.toFixed(decimals)
          : Math.floor(currentNum).toLocaleString("es-EC");

        setDisplayValue(`${prefix}${formattedNum}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          const finalFormatted = isDecimal
            ? targetNum.toFixed(decimals)
            : targetNum.toLocaleString("es-EC");
          setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
        }
      };

      requestAnimationFrame(step);
    };

    if (typeof IntersectionObserver === "undefined") {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          startAnimation();
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    observer.observe(element);

    // Timeout de seguridad: si no se detecta intersección en 800ms, animar directamente
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated) startAnimation();
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={`inline-block tabular-nums transition-all ${className}`}>
      {displayValue}
    </span>
  );
}
