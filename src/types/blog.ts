export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  images?: string[];
  category: string;
  subcategory?: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  views?: number;
  trending?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export type SortOption = "latest" | "oldest" | "trending" | "most-viewed";