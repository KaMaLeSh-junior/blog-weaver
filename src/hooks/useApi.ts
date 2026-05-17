import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchGeneralSettings,
  fetchAllBlogs,
  fetchBlogBySlug,
  fetchAllCategories,
  fetchCategoryById,
  fetchSubcategories,
  fetchSubcategoryById,
  fetchBlogHighlights,
  fetchFilteredSearch,
  type FilteredSearchParams,
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

export const useAllBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: fetchAllBlogs,
  });

export const useBlogHighlights = () =>
  useQuery({
    queryKey: ["blogHighlights"],
    queryFn: fetchBlogHighlights,
  });

/**
 * Single-page filtered search. Used by the home page category browser
 * where we don't need pagination — the API returns page 1.
 */
export const useFilteredSearch = (params: FilteredSearchParams, enabled = true) =>
  useQuery({
    queryKey: ["filteredSearch", params],
    queryFn: () => fetchFilteredSearch(params),
    enabled,
  });

/**
 * Infinite-scroll filtered search. Used by the master search results page
 * and the explore blogs page.
 */
export const useFilteredSearchInfinite = (
  params: Omit<FilteredSearchParams, "page">,
  enabled = true,
) =>
  useInfiniteQuery({
    queryKey: ["filteredSearchInfinite", params],
    queryFn: ({ pageParam = 1 }) =>
      fetchFilteredSearch({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled,
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
