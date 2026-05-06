// API Configuration
// Override at build/runtime via Vite env vars (see .env.example).
// Never commit real production URLs or secrets to this file.

const LOCAL_API_URL = "http://localhost:3000/v1/api";
const LOCAL_IMAGE_URL = "http://localhost:3000/uploads";

// Production endpoints are injected via env vars to keep the public repo clean.
// Set VITE_API_BASE_URL and VITE_IMAGE_BASE_URL in .env.local (dev) or in your
// hosting provider's environment settings (production).
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || LOCAL_API_URL;

export const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || LOCAL_IMAGE_URL;

// Helper to build a full image URL from a stored image_name.
export const getImageUrl = (imageName: string): string => {
  return `${IMAGE_BASE_URL}/${imageName}`;
};

export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;
