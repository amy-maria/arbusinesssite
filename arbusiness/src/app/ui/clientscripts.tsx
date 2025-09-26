"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function ClientScripts() {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      try {
        const prefs = JSON.parse(localStorage.getItem("cookiePreferences") || "{}");
        setAnalyticsConsent(!!prefs.analytics);
      } catch {
        setAnalyticsConsent(false);
      }
    };

    checkConsent();
    window.addEventListener("cookiePreferencesUpdated", checkConsent);

    return () => {
      window.removeEventListener("cookiePreferencesUpdated", checkConsent);
    };
  }, []);

  if (!analyticsConsent) return null;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LXDF5060ZM"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-LXDF5060ZM');
        `}
      </Script>
    </>
  );
}
