import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchGeneralSettings,
  fetchAllBlogs,
  fetchBlogsPage,
  fetchBlogBySlug,
  fetchAllCategories,
  fetchCategoryById,
  fetchSubcategories,
  fetchSubcategoryById,
  fetchBlogHighlights,
  fetchFilteredSearch,
  fetchSearchBlogs,
  type FilteredSearchParams,
  type PaginatedBlogs,
} from "@/services/blogService";

// ============================================
// General Settings
// ============================================

export const useGeneralSettings = () =>
  useQuery({
    queryKey: ["generalSettings"],
    queryFn: fetchGeneralSettings,
    staleTime: 1000 * 60 * 10,
  });

// ============================================
// Blogs
// ============================================

/**
 * Flat list (page 1, large limit). Used by pages that only need related-post
 * lookups or category counts.
 */
export const useAllBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

/**
 * Paginated infinite-scroll list of all blogs. Used by Explore (unfiltered)
 * and the home page (when no category is selected).
 */
export const useAllBlogsInfinite = (limit = 10, enabled = true) =>
  useInfiniteQuery<PaginatedBlogs>({
    queryKey: ["blogsInfinite", limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchBlogsPage({ page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled,
  });

export const useBlogHighlights = () =>
  useQuery({
    queryKey: ["blogHighlights"],
    queryFn: fetchBlogHighlights,
  });

/** Single-page filtered search. */
export const useFilteredSearch = (params: FilteredSearchParams, enabled = true) =>
  useQuery({
    queryKey: ["filteredSearch", params],
    queryFn: () => fetchFilteredSearch(params),
    enabled,
  });

/** Infinite-scroll filtered search. */
export const useFilteredSearchInfinite = (
  params: Omit<FilteredSearchParams, "page">,
  enabled = true,
) =>
  useInfiniteQuery<PaginatedBlogs>({
    queryKey: ["filteredSearchInfinite", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchFilteredSearch({ ...params, page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled,
  });

/** Infinite-scroll master search (`/public/blogs/search?blog=`). */
export const useSearchBlogsInfinite = (
  blog: string,
  limit = 10,
  enabled = true,
) =>
  useInfiniteQuery<PaginatedBlogs>({
    queryKey: ["searchBlogsInfinite", blog, limit],
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchBlogs({ blog, page: pageParam as number, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: enabled && blog.trim().length > 0,
  });

export const useBlogBySlug = (slug: string) =>
  useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchBlogBySlug(slug),
    enabled: !!slug,
  });

// ============================================
// Categories
// ============================================

export const useAllCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

export const useCategoryById = (id: number) =>
  useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });

// ============================================
// Subcategories
// ============================================

export const useSubcategories = (categoryId: number) =>
  useQuery({
    queryKey: ["subcategories", categoryId],
    queryFn: () => fetchSubcategories(categoryId),
    enabled: !!categoryId,
  });

export const useSubcategoryById = (id: number) =>
  useQuery({
    queryKey: ["subcategory", id],
    queryFn: () => fetchSubcategoryById(id),
    enabled: !!id,
  });
