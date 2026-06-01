// ============================================
// Generic API Response
// ============================================

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// ============================================
// General Settings
// ============================================

export interface SocialLink {
  url: string;
  status: boolean;
}

export type SocialPlatform =
  | "github"
  | "threads"
  | "twitter"
  | "facebook"
  | "linkedin"
  | "instagram";

export type SocialLinks = Partial<Record<SocialPlatform, SocialLink>>;

/**
 * Raw shape returned by the API. `social_links` may arrive as a JSON-encoded
 * string, `logo` is an array of filenames, and the feature flags are booleans.
 */
export interface RawGeneralSettings {
  id: number;
  title: string;
  email?: string;
  phone?: string;
  address: string;
  logo?: string[] | null;
  social_links: SocialLinks | string;
  site_description: string;
  advertisment: boolean;
  subscription: boolean;
  banner_image_limit?: number;
}

/**
 * Normalized shape consumed by the UI. Derived from `RawGeneralSettings` in
 * the settings slice so consumers don't need to parse strings or arrays.
 */
export interface GeneralSettings {
  id: number;
  title: string;
  email?: string;
  phone?: string;
  address: string;
  logo: string[];
  logo_image: string | null;
  social_links: SocialLinks;
  site_description: string;
  advertisment: boolean;
  subscription: boolean;
  banner_image_limit: number;
}

// ============================================
// Blog
// ============================================

export interface BlogImage {
  image_name: string;
}

export interface BlogMetadata {
  title: string;
  description: string;
}

export interface BlogCategory {
  id?: number;
  name: string;
}

export interface BlogSubcategory {
  id?: number;
  name: string;
}

export interface ApiBlogPost {
  id: number;
  title: string;
  slug: string;
  small_description: string;
  large_description: string;
  status: number;
  created_date: string;
  metadata: BlogMetadata;
  category: BlogCategory;
  subcategory: BlogSubcategory;
  images: BlogImage[];
}

// ============================================
// Category
// ============================================

export interface ApiCategory {
  id: number;
  name: string;
  bloglimit: number | null;
  status: number;
}

export interface ApiCategoryDetail {
  id: number;
  name: string;
  blog_limit: number | null;
  blog_status: number;
  created_d: string;
  updated_d: string;
  deleted_d: string | null;
}

// ============================================
// Subcategory
// ============================================

export interface ApiSubcategory {
  id: number;
  category_id: number;
  name: string;
  status: number;
  category: {
    name: string;
  };
}

export interface ApiSubcategoryDetail {
  id: number;
  category_id: number;
  name: string;
  status: number;
  category: {
    name: string;
  };
}
