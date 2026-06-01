import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  GeneralSettings,
  RawGeneralSettings,
  SocialLinks,
} from "@/types/api";

interface SettingsState {
  data: GeneralSettings | null;
  isLoaded: boolean;
}

const initialState: SettingsState = {
  data: null,
  isLoaded: false,
};

const parseSocialLinks = (input: SocialLinks | string | undefined): SocialLinks => {
  if (!input) return {};
  if (typeof input === "string") {
    try {
      return JSON.parse(input) as SocialLinks;
    } catch {
      return {};
    }
  }
  return input;
};

export const normalizeSettings = (raw: RawGeneralSettings): GeneralSettings => {
  const logo = Array.isArray(raw.logo) ? raw.logo.filter(Boolean) : [];
  return {
    id: raw.id,
    title: raw.title,
    email: raw.email,
    phone: raw.phone,
    address: raw.address,
    logo,
    logo_image: logo[0] || null,
    social_links: parseSocialLinks(raw.social_links),
    site_description: raw.site_description,
    advertisment: Boolean(raw.advertisment),
    subscription: Boolean(raw.subscription),
    banner_image_limit: raw.banner_image_limit ?? 10,
  };
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<RawGeneralSettings>) => {
      state.data = normalizeSettings(action.payload);
      state.isLoaded = true;
    },
    clearSettings: (state) => {
      state.data = null;
      state.isLoaded = false;
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
