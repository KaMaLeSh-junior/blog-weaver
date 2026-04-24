import type { ApiBlogPost, ApiCategory } from "@/types/api";
import type { BlogPost, Category } from "@/data/blogData";
import { getImageUrl } from "@/config/api";

// Default author when API doesn't provide one
const defaultAuthor = {
  id: "api",
  name: "Editorial Team",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Editorial",
  bio: "Our editorial team covers a wide range of topics.",
};

/**
 * Convert an API blog post to the frontend BlogPost format.
 */
export const mapApiBlogToPost = (api: ApiBlogPost): BlogPost => ({
  id: String(api.id),
  slug: api.slug,
  title: api.title,
  excerpt: api.small_description,
  content: api.large_description,
  image: api.images?.[0]
    ? getImageUrl(api.images[0].image_name)
    : "/placeholder.svg",
  images: api.images?.length
    ? api.images.map((img) => getImageUrl(img.image_name))
    : undefined,
  category: api.category?.name || "Uncategorized",
  subcategory: api.subcategory?.name,
  author: defaultAuthor,
  publishedAt: api.created_date,
  readTime: Math.max(1, Math.ceil(api.large_description.replace(/<[^>]+>/g, "").split(/\s+/).length / 200)),
  featured: false,
  views: 0,
  trending: false,
});

/**
 * Convert an API category to the frontend Category format.
 */
export const mapApiCategoryToCategory = (
  api: ApiCategory,
  blogCount?: number
): Category => ({
  id: String(api.id),
  name: api.name,
  slug: api.name.toLowerCase().replace(/\s+/g, "-"),
  description: `Articles about ${api.name}`,
  count: blogCount ?? 0,
});

/**
 * Sort mapped BlogPosts (mirrors getSortedPosts from blogData)
 */
export type SortOption = "latest" | "oldest" | "trending" | "most-viewed";

export const getSortedApiPosts = (posts: BlogPost[], sortBy: SortOption): BlogPost[] => {
  switch (sortBy) {
    case "latest":
      return [...posts].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    case "oldest":
      return [...posts].sort(
        (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case "trending":
      return [...posts].sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    case "most-viewed":
      return [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));
    default:
      return posts;
  }
};
