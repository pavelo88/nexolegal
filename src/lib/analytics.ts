export const CONSENT_STORAGE_KEY = "vis_legal_cookie_consent_v1";
export const CONSENT_UPDATED_EVENT = "nexolegal-consent-updated";

type ConsentPreferences = {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  timestamp?: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY) || "null") as ConsentPreferences | null;
  } catch {
    return null;
  }
}

export function trackEvent(name: string, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !readConsent()?.analytics) return;
  window.gtag?.("event", name, parameters);
  window.fbq?.("trackCustom", name, parameters);
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "direct",
    utm_medium: params.get("utm_medium") || "none",
    utm_campaign: params.get("utm_campaign") || "none",
    utm_content: params.get("utm_content") || "none",
    landing_page: window.location.pathname,
  };
}
