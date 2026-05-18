import { useGeneralSettings } from "@/hooks/useApi";
import type { GeneralSettings, SocialLinks, SocialPlatform } from "@/types/api";

const FALLBACK: GeneralSettings = {
  id: 0,
  title: "ClarityMFG",
  email: "",
  phone: "",
  address: "",
  social_links: {},
  site_description:
    "Insights on industrial automation, mechatronics, robotics and connected mobility.",
  advertisment: 0,
  subscription: 0,
  logo_image: null,
};

/**
 * Convenience hook that exposes the app's general settings with sensible
 * defaults so consumers never need to null-check the API response.
 */
export const useAppSettings = () => {
  const { data, isLoading, error } = useGeneralSettings();
  const settings: GeneralSettings = data || FALLBACK;
  return {
    settings,
    isLoading,
    error,
    showAds: settings.advertisment === 1,
    showSubscription: settings.subscription === 1,
  };
};

export const getEnabledSocialLinks = (
  links: SocialLinks,
): Array<{ platform: SocialPlatform; url: string }> => {
  return (Object.entries(links) as Array<[SocialPlatform, { url: string; status: boolean }]>)
    .filter(([, v]) => v && v.status && v.url)
    .map(([platform, v]) => ({ platform, url: v.url }));
};
