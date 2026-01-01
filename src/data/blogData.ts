import heroImage from "@/assets/hero-01.jpg";
import techImage from "@/assets/blog-tech.jpg";
import travelImage from "@/assets/blog-travel.jpg";
import lifestyleImage from "@/assets/blog-lifestyle.jpg";
import healthImage from "@/assets/blog-health.jpg";
import cultureImage from "@/assets/blog-culture.jpg";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: Author;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Adrio Devid",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adrio",
    bio: "Senior content writer with 10+ years of experience in tech journalism.",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Travel enthusiast and lifestyle blogger sharing stories from around the world.",
  },
  {
    id: "3",
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    bio: "Health and wellness expert dedicated to helping people live better lives.",
  },
];

export const categories: Category[] = [
  { id: "1", name: "Technology", slug: "technology", description: "Latest tech news and innovations", count: 8 },
  { id: "2", name: "Lifestyle", slug: "lifestyle", description: "Tips for better living", count: 5 },
  { id: "3", name: "Travel", slug: "travel", description: "Explore the world with us", count: 7 },
  { id: "4", name: "Health", slug: "health", description: "Wellness and fitness tips", count: 6 },
  { id: "5", name: "Culture", slug: "culture", description: "Art, music, and creativity", count: 4 },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "begin-here-brief-summary-essential",
    title: "Begin here to obtain a brief summary encompassing all the essential",
    excerpt: "This comprehensive post serves as your cheat-sheet to swiftly familiarize yourself with Ghost. Packed with crucial information and insights.",
    content: `
      <p>Welcome to our comprehensive guide that will help you get started with everything you need to know. This article covers the fundamentals and provides you with actionable insights.</p>
      
      <h2>Getting Started</h2>
      <p>The first step is understanding the basics. We'll walk you through each concept carefully, ensuring you have a solid foundation to build upon.</p>
      
      <h2>Key Concepts</h2>
      <p>There are several important concepts you need to grasp. Let's explore each one in detail and see how they connect to form a complete picture.</p>
      
      <blockquote>
        "The journey of a thousand miles begins with a single step." - This ancient wisdom applies perfectly to learning new skills.
      </blockquote>
      
      <h2>Practical Applications</h2>
      <p>Now that you understand the theory, let's put it into practice. We'll show you real-world examples that demonstrate these principles in action.</p>
      
      <h2>Conclusion</h2>
      <p>By following this guide, you'll be well on your way to mastering these essential skills. Remember, practice makes perfect!</p>
    `,
    image: heroImage,
    category: "Lifestyle",
    author: authors[0],
    publishedAt: "2025-01-10",
    readTime: 5,
    featured: true,
  },
  {
    id: "2",
    slug: "innovative-architectural-designs",
    title: "14 Innovative Architectural Designs to Create a Vast Interior Space",
    excerpt: "Discover groundbreaking architectural concepts that maximize your living space while maintaining aesthetic appeal.",
    content: `<p>Architecture is evolving rapidly with new technologies and design philosophies...</p>`,
    image: techImage,
    category: "Technology",
    author: authors[0],
    publishedAt: "2025-01-08",
    readTime: 7,
  },
  {
    id: "3",
    slug: "traveller-visiting-ice-cave",
    title: "Traveller Visiting Ice Cave With Amazing Eye-catching View with Nature",
    excerpt: "Experience the breathtaking beauty of natural ice caves and discover the best destinations for adventure seekers.",
    content: `<p>Ice caves are among nature's most spectacular creations...</p>`,
    image: travelImage,
    category: "Travel",
    author: authors[1],
    publishedAt: "2025-01-05",
    readTime: 6,
  },
  {
    id: "4",
    slug: "modern-living-room-design",
    title: "Modern Living Room Design: Creating Your Perfect Space",
    excerpt: "Transform your living room into a modern sanctuary with these expert interior design tips.",
    content: `<p>Your living room is the heart of your home...</p>`,
    image: lifestyleImage,
    category: "Lifestyle",
    author: authors[1],
    publishedAt: "2025-01-03",
    readTime: 4,
  },
  {
    id: "5",
    slug: "healthy-eating-habits",
    title: "Healthy Eating Habits: A Complete Guide to Nutritious Living",
    excerpt: "Learn how to build sustainable eating habits that will transform your health and energy levels.",
    content: `<p>Good nutrition is the foundation of a healthy life...</p>`,
    image: healthImage,
    category: "Health",
    author: authors[2],
    publishedAt: "2025-01-01",
    readTime: 8,
  },
  {
    id: "6",
    slug: "art-and-creativity-modern-world",
    title: "Art and Creativity in the Modern World: Embracing Expression",
    excerpt: "Explore how art continues to evolve and inspire in our digital age, bridging traditional and contemporary forms.",
    content: `<p>Art has always been a reflection of society...</p>`,
    image: cultureImage,
    category: "Culture",
    author: authors[0],
    publishedAt: "2024-12-28",
    readTime: 5,
  },
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogsByCategory = (categorySlug: string): BlogPost[] => {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return blogPosts.filter((post) => post.category.toLowerCase() === category.name.toLowerCase());
};

export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find((post) => post.featured);
};

export const getFeaturedPosts = (count: number = 3): BlogPost[] => {
  const featured = blogPosts.filter((post) => post.featured);
  const remaining = blogPosts.filter((post) => !post.featured).slice(0, count - featured.length);
  return [...featured, ...remaining].slice(0, count);
};
