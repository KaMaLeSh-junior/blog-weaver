import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("GA_MEASUREMENT_ID not found in environment variables");
    return;
  }

  const consent = localStorage.getItem("cookie-consent");
  if (consent) {
    const { analytics } = JSON.parse(consent);
    if (analytics) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      console.log("GA4 Initialized");
    }
  }
};

export const trackPageView = (path: string) => {
  const consent = localStorage.getItem("cookie-consent");
  if (consent) {
    const { analytics } = JSON.parse(consent);
    if (analytics) {
      ReactGA.send({ hitType: "pageview", page: path });
    }
  }
};
