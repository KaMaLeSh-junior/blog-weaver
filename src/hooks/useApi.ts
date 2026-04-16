import { useQuery } from "@tanstack/react-query";
import {
  fetchGeneralSettings,
  fetchAllBlogs,
  fetchBlogBySlug,
  fetchAllCategories,
  fetchCategoryById,
  fetchSubcategories,
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
