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
  if (typeof window === "undefined") return;
  // Send to GA4
  window.gtag?.("event", name, parameters);
  // Send to Meta Pixel
  window.fbq?.("trackCustom", name, parameters);
  
  // Standard conversion triggers for Google Ads / Meta Ads
  if (name === "lead_form_submit_success" || name === "generate_lead") {
    window.gtag?.("event", "generate_lead", parameters);
    window.fbq?.("track", "Lead", parameters);
  } else if (name === "whatsapp_click" || name === "contact_click") {
    window.gtag?.("event", "contact", parameters);
    window.fbq?.("track", "Contact", parameters);
  }
}

export function getAttribution() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  
  const currentAttribution = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
    landing_page: window.location.pathname,
  };

  // If URL has ad parameters, save them to sessionStorage so they persist across pages
  if (currentAttribution.utm_source || currentAttribution.gclid || currentAttribution.fbclid) {
    try {
      sessionStorage.setItem("nexolegal_ad_attribution", JSON.stringify(currentAttribution));
    } catch {
      // Ignore storage errors
    }
    return currentAttribution;
  }

  // Fallback to persisted attribution from earlier in the session
  try {
    const saved = sessionStorage.getItem("nexolegal_ad_attribution");
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore storage errors
  }

  return {
    utm_source: "direct",
    utm_medium: "none",
    utm_campaign: "none",
    utm_term: "none",
    utm_content: "none",
    gclid: "",
    fbclid: "",
    landing_page: window.location.pathname,
  };
}
