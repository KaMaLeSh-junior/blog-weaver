import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  COOKIE_CONSENT_EVENT,
  initializeGoogleAnalytics,
} from "@/lib/analytics";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const { t } = useLanguage();

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });
  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ ...allAccepted, timestamp: Date.now() }),
    );
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setIsVisible(false);
  };
  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ ...onlyNecessary, timestamp: Date.now() }),
    );
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setIsVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ ...preferences, timestamp: Date.now() }),
    );
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-foreground/70 p-4 backdrop-blur-sm lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-xl ring-2 ring-primary/30">
        {/* Main banner */}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 id="cookie-consent-title" className="font-heading font-semibold text-foreground text-base mb-1">
                {t.cookies?.title || "We value your privacy"}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.cookies?.description ||
                  'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.'}
              </p>
            </div>
          </div>

          {/* Preferences panel */}
          {showPreferences && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              {[
                {
                  key: "necessary" as const,
                  label: t.cookies?.necessary || "Necessary",
                  desc:
                    t.cookies?.necessaryDesc ||
                    "Essential for the website to function",
                  disabled: true,
                },
                {
                  key: "analytics" as const,
                  label: t.cookies?.analytics || "Analytics",
                  desc:
                    t.cookies?.analyticsDesc ||
                    "Help us understand how visitors interact",
                },
                {
                  key: "marketing" as const,
                  label: t.cookies?.marketing || "Marketing",
                  desc:
                    t.cookies?.marketingDesc ||
                    "Used to deliver relevant advertisements",
                },
                {
                  key: "functional" as const,
                  label: t.cookies?.functional || "Functional",
                  desc:
                    t.cookies?.functionalDesc ||
                    "Enable personalized features and preferences",
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences[item.key]}
                    disabled={item.disabled}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        [item.key]: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                </label>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              onClick={acceptAll}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              {t.cookies?.acceptAll || "Accept All"}
            </Button>
            <Button
              onClick={rejectAll}
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none"
            >
              {t.cookies?.rejectAll || "Reject All"}
            </Button>
            {!showPreferences ? (
              <Button
                onClick={() => setShowPreferences(true)}
                variant="ghost"
                size="sm"
                className="flex-1 sm:flex-none text-muted-foreground"
              >
                <Shield className="h-3.5 w-3.5 mr-1.5" />
                {t.cookies?.manage || "Manage Preferences"}
              </Button>
            ) : (
              <Button
                onClick={savePreferences}
                variant="ghost"
                size="sm"
                className="flex-1 sm:flex-none text-primary"
              >
                {t.cookies?.savePreferences || "Save Preferences"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
