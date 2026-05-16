import { API_BASE_URL } from "@/config/api";
import type {
  ApiResponse,
  GeneralSettings,
  ApiBlogPost,
  ApiCategory,
  ApiCategoryDetail,
  ApiSubcategory,
  ApiSubcategoryDetail,
} from "@/types/api";

// Generic fetch helper
async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const json: ApiResponse<T> = await response.json();

  if (json.status !== 1) {
    throw new Error(json.message || "Unknown API error");
  }

  return json.data;
}

// ============================================
// General Settings
// ============================================

export const fetchGeneralSettings = (): Promise<GeneralSettings[]> =>
  apiFetch<GeneralSettings[]>(`${API_BASE_URL}/public/settings`);

// ============================================
// Blogs
// ============================================

export const fetchAllBlogs = (): Promise<ApiBlogPost[]> =>
  apiFetch<ApiBlogPost[]>(`${API_BASE_URL}/public/blogs`);

export const fetchBlogHighlights = (): Promise<ApiBlogPost[]> =>
  apiFetch<ApiBlogPost[]>(`${API_BASE_URL}/public/blogs/blogHighlights`);

export const fetchBlogBySlug = (slug: string): Promise<ApiBlogPost> =>
  apiFetch<ApiBlogPost>(`${API_BASE_URL}/public/blogs/getOneBlog`, {
    method: "POST",
    body: JSON.stringify({ slug }),
  });

export const fetchBlogsByCategory = (
  category: string,
  subcategory?: string[],
): Promise<ApiBlogPost[]> => {
  const params = new URLSearchParams({ category });
  if (subcategory && subcategory.length > 0) {
    params.set("subcategory", subcategory.join(","));
  }
  return apiFetch<ApiBlogPost[]>(
    `${API_BASE_URL}/public/blogs/blogByCategory?${params.toString()}`,
  );
};

// ============================================
// Categories
// ============================================

export const fetchAllCategories = (): Promise<ApiCategory[]> =>
  apiFetch<ApiCategory[]>(`${API_BASE_URL}/public/category/all`);

export const fetchCategoryById = (id: number): Promise<ApiCategoryDetail> =>
  apiFetch<ApiCategoryDetail>(`${API_BASE_URL}/public/category/${id}`);

// ============================================
// Subcategories
// ============================================

export const fetchSubcategories = (
  categoryId: number,
): Promise<ApiSubcategory[]> =>
  apiFetch<ApiSubcategory[]>(
    `${API_BASE_URL}/public/subcategory/all?cat_id=${categoryId}`,
  );

export const fetchSubcategoryById = (
  id: number,
): Promise<ApiSubcategoryDetail> => {
  // This endpoint returns the raw object directly (not wrapped in ApiResponse)
  return fetch(`${API_BASE_URL}/public/subcategory/${id}`, {
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
    return res.json();
  });
};
