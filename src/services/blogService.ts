import { API_BASE_URL } from "@/config/api";
import type {
  ApiResponse,
  RawGeneralSettings,
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

export const fetchGeneralSettings = (): Promise<RawGeneralSettings> =>
  apiFetch<RawGeneralSettings>(`${API_BASE_URL}/public/settings`);

// ============================================
// Blogs
// ============================================

export interface PaginatedBlogs {
  data: ApiBlogPost[];
  pagination: { total: number; currentPage: number; totalPages: number };
}

const DEFAULT_PAGE_SIZE = 10;

async function fetchPaginatedBlogs(url: string): Promise<PaginatedBlogs> {
  const res = await fetch(url, { headers: { "Content-Type": "application/json" } });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  if (json.status !== 1) throw new Error(json.message || "Unknown API error");
  const data: ApiBlogPost[] = json.data || [];
  return {
    data,
    pagination: json.pagination || {
      total: data.length,
      currentPage: 1,
      totalPages: 1,
    },
  };
}

export interface BlogListParams {
  page?: number;
  limit?: number;
}

export const fetchBlogsPage = ({
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
}: BlogListParams = {}): Promise<PaginatedBlogs> => {
  const qs = new URLSearchParams({ page: String(page), limit: String(limit) });
  return fetchPaginatedBlogs(`${API_BASE_URL}/public/blogs?${qs.toString()}`);
};

/**
 * Backwards-compatible "fetch everything" helper used by pages that just need
 * a flat list (related posts, counts, etc.). Pulls a large first page.
 */
export const fetchAllBlogs = async (): Promise<ApiBlogPost[]> => {
  const res = await fetchBlogsPage({ page: 1, limit: 100 });
  return res.data;
};

export const fetchBlogHighlights = (): Promise<ApiBlogPost[]> =>
  apiFetch<ApiBlogPost[]>(`${API_BASE_URL}/public/blogs/blogHighlights`);

export const fetchBlogBySlug = (slug: string): Promise<ApiBlogPost> =>
  apiFetch<ApiBlogPost>(`${API_BASE_URL}/public/blogs/getOneBlog`, {
    method: "POST",
    body: JSON.stringify({ slug }),
  });

export interface SearchBlogsParams {
  blog: string;
  page?: number;
  limit?: number;
}

export const fetchSearchBlogs = ({
  blog,
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
}: SearchBlogsParams): Promise<PaginatedBlogs> => {
  const qs = new URLSearchParams({
    blog,
    page: String(page),
    limit: String(limit),
  });
  return fetchPaginatedBlogs(
    `${API_BASE_URL}/public/blogs/search?${qs.toString()}`,
  );
};

export interface FilteredSearchParams {
  category?: string;
  subcategory?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchFilteredSearch = ({
  category,
  subcategory,
  search,
  page,
  limit = DEFAULT_PAGE_SIZE,
}: FilteredSearchParams): Promise<PaginatedBlogs> => {
  const qs = new URLSearchParams();
  if (category && category !== "all") qs.set("category", category);
  if (subcategory && subcategory.length > 0) {
    qs.set("subcategory", subcategory.join(","));
  }
  if (search && search.trim()) qs.set("search", search.trim());
  if (page) qs.set("page", String(page));
  qs.set("limit", String(limit));
  return fetchPaginatedBlogs(
    `${API_BASE_URL}/public/blogs/filteredSearch?${qs.toString()}`,
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
  return fetch(`${API_BASE_URL}/public/subcategory/${id}`, {
    headers: { "Content-Type": "application/json" },
  }).then(async (res) => {
    if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
    return res.json();
  });
};
