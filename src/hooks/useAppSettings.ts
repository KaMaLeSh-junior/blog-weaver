import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useGeneralSettings } from "@/hooks/useApi";
import { setSettings } from "@/store/slices/settingsSlice";
import type {
  GeneralSettings,
  SocialLinks,
  SocialPlatform,
} from "@/types/api";

const FALLBACK: GeneralSettings = {
  id: 0,
  title: "ClarityMFG",
  email: "",
  phone: "",
  address: "",
  logo: [],
  logo_image: null,
  social_links: {},
  site_description:
    "Insights on industrial automation, mechatronics, robotics and connected mobility.",
  advertisment: false,
  subscription: false,
  banner_image_limit: 10,
};

/**
 * Reads normalized general settings from Redux. The actual fetch + dispatch
 * happens once at the app root via <SettingsSync />.
 */
export const useAppSettings = () => {
  const stored = useAppSelector((s) => s.settings.data);
  const isLoaded = useAppSelector((s) => s.settings.isLoaded);
  const settings: GeneralSettings = stored || FALLBACK;
  return {
    settings,
    isLoading: !isLoaded,
    showAds: settings.advertisment === true,
    showSubscription: settings.subscription === true,
  };
};

/**
 * Mount once at the app root. Fetches `/public/settings` via React Query and
 * hydrates the Redux settings slice so the rest of the app can read it.
 */
export const SettingsSync = () => {
  const dispatch = useAppDispatch();
  const { data } = useGeneralSettings();
  useEffect(() => {
    if (data) {
      dispatch(setSettings(data));
    }
  }, [data, dispatch]);
  return null;
};

export const getEnabledSocialLinks = (
  links: SocialLinks,
): Array<{ platform: SocialPlatform; url: string }> => {
  return (Object.entries(links) as Array<[SocialPlatform, { url: string; status: boolean }]>)
    .filter(([, v]) => v && v.status && v.url)
    .map(([platform, v]) => ({ platform, url: v.url }));
};
