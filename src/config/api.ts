// API Configuration
// Switch between local and production by setting VITE_API_BASE_URL in .env

const LOCAL_API_URL = "http://localhost:3000/v1/api";
const PRODUCTION_API_URL = "https://your-production-domain.com/v1/api"; // TODO: Replace with actual production URL

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || LOCAL_API_URL;

// Image base URL for blog images
const LOCAL_IMAGE_URL = "http://localhost:3000/uploads";
const PRODUCTION_IMAGE_URL = "https://your-production-domain.com/uploads"; // TODO: Replace with actual production URL

export const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || LOCAL_IMAGE_URL;

// Helper to get full image URL from image_name
export const getImageUrl = (imageName: string): string => {
  return `${IMAGE_BASE_URL}/${imageName}`;
};

// Environment info
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;
