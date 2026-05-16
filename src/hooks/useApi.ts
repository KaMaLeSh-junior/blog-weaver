import { useQuery } from "@tanstack/react-query";
import {
  fetchGeneralSettings,
  fetchAllBlogs,
  fetchBlogBySlug,
  fetchAllCategories,
  fetchCategoryById,
  fetchSubcategories,
  fetchSubcategoryById,
  fetchBlogHighlights,
  fetchBlogsByCategory,
  fetchBlogsBySubcategory,
} from "@/services/blogService";

// ============================================
// General Settings
// ============================================

export const useGeneralSettings = () =>
  useQuery({
    queryKey: ["generalSettings"],
    queryFn: fetchGeneralSettings,
    staleTime: 1000 * 60 * 10, // 10 minutes
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

export const useBlogsByCategory = (category: string) =>
  useQuery({
    queryKey: ["blogsByCategory", category],
    queryFn: () => fetchBlogsByCategory(category),
    enabled: !!category,
  });

export const useBlogsBySubcategory = (
  categorySlug: string,
  subcategorySlug: string[],
) =>
  useQuery({
    queryKey: ["blogsBySubcategory", categorySlug, subcategorySlug],
    queryFn: () => fetchBlogsBySubcategory(categorySlug, subcategorySlug),
    enabled: subcategorySlug.length > 0,
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
