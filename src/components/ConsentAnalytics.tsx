"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_UPDATED_EVENT, readConsent, trackEvent } from "@/lib/analytics";

export default function ConsentAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const sync = () => setEnabled(Boolean(readConsent()?.analytics));
    sync();
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    const handleConversionClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      const href = anchor?.getAttribute("href") || "";
      if (href.includes("wa.me/")) trackEvent("whatsapp_click", { placement: anchor?.textContent?.trim().slice(0, 80) || "link" });
      if (href.startsWith("tel:")) trackEvent("phone_click", { placement: anchor?.textContent?.trim().slice(0, 80) || "link" });
    };
    document.addEventListener("click", handleConversionClick);
    return () => document.removeEventListener("click", handleConversionClick);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {googleTagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} strategy="lazyOnload" />
          <Script id="nexolegal-google-tag" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${googleTagId}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}
      {metaPixelId ? (
        <Script id="nexolegal-meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
