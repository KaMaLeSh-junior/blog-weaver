import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CONSENT_STORAGE_KEY = "cookie-consent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-updated";

type GtagArguments = [command: string, ...args: unknown[]];

declare global {
  interface Window {
    dataLayer?: GtagArguments[];
    gtag?: (...args: GtagArguments) => void;
  }
}

let initialized = false;

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const hasAnalyticsConsent = () => {
  try {
    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    // if (!storedConsent) return false;

    const consent = JSON.parse(storedConsent) as { analytics?: boolean };
    return consent.analytics === true;
  } catch {
    return true;
  }
};

export const initializeGoogleAnalytics = () => {
  // if (!measurementId || !hasAnalyticsConsent()) return false;
  if (!measurementId) return false;

  if (!initialized) {
    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (...args: GtagArguments) => {
      window.dataLayer?.push(args);
    };

    const script = document.createElement("script");
    script.async = true;
    script.id = "google-analytics";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      send_page_view: false,
    });
    initialized = true;
  }

  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  return true;
};
const updateAnalyticsConsent = () => {
  if (hasAnalyticsConsent()) {
    return initializeGoogleAnalytics();
  }

  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  return false;
};

const trackPageView = (path: string) => {
  if (!initializeGoogleAnalytics()) return;

  window.gtag?.("event", "page_view", {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  });
};
export const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    const path = `${location.pathname}${location.search}${location.hash}`;
    trackPageView(path);

    initializeGoogleAnalytics();
    const handleConsentUpdate = () => {
      if (updateAnalyticsConsent()) trackPageView(path);
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentUpdate);
  }, [location.pathname, location.search, location.hash]);

  return null;
};
