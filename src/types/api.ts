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

export interface GeneralSettings {
  id: number;
  title: string;
  email?: string;
  phone?: string;
  address: string;
  social_links: SocialLinks;
  site_description: string;
  advertisment: number;
  subscription?: number;
  logo_image?: string | null;
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
