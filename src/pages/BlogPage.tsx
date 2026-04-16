import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import DOMPurify from "dompurify";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AdSpace from "@/components/blog/AdSpace";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortFilter from "@/components/blog/SortFilter";
import ImageCarousel from "@/components/blog/ImageCarousel";
import { useBlogBySlug, useAllBlogs, useAllCategories } from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory, getSortedApiPosts, SortOption } from "@/utils/mappers";
import { getBlogBySlug, blogPosts as staticPosts, getSortedPosts, categories as staticCategories } from "@/data/blogData";
import { formatDate } from "@/lib/utils";
import gsap from "gsap";
import { Clock, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  // API data
  const { data: apiBlog, isLoading: blogLoading } = useBlogBySlug(slug || "");
  const { data: apiBlogs } = useAllBlogs();
  const { data: apiCategories } = useAllCategories();

  // Map single blog
  const post = useMemo(() => {
    if (apiBlog) return mapApiBlogToPost(apiBlog);
    return getBlogBySlug(slug || "") || null;
  }, [apiBlog, slug]);

  // Map all blogs for related posts
  const allPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return apiBlogs.filter(b => b.status === 1).map(mapApiBlogToPost);
    }
    return staticPosts;
  }, [apiBlogs]);

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories
        .filter(c => c.status === 1)
        .map(c => mapApiCategoryToCategory(c, 0));
    }
    return staticCategories;
  }, [apiCategories]);

  // Related posts
  const relatedPosts = useMemo(() => {
    const filtered = activeCategory === "all"
      ? allPosts.filter(p => p.id !== post?.id)
      : allPosts.filter(p => {
          const cat = categories.find(c => c.slug === activeCategory);
          return p.id !== post?.id && cat && p.category.toLowerCase() === cat.name.toLowerCase();
        });
    
    const sorted = apiBlogs && apiBlogs.length > 0
      ? getSortedApiPosts(filtered, sortBy)
      : getSortedPosts(filtered, sortBy);
    
    return sorted.slice(0, 6);
  }, [activeCategory, sortBy, allPosts, post, categories, apiBlogs]);

  // Helper for images
  const getPostImages = (p: typeof post): string[] => {
    if (!p) return ["/placeholder.svg"];
    if (p.images && p.images.length > 0) return p.images;
    return [p.image];
  };

  useEffect(() => {
    if (post) {
      gsap.fromTo(
        ".blog-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [post]);

  if (blogLoading) {
    return (
      <Layout title="Loading... - Clarity Blog">
        <div className="container py-20 space-y-6">
          <Skeleton className="w-full h-[40vh] rounded-xl" />
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Post Not Found - Clarity Blog">
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The article you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${post.title} - Clarity Blog`}
      description={post.excerpt}
    >
      {/* Hero Image Carousel */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <ImageCarousel images={getPostImages(post)} alt={post.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
      </div>

      <article className="container blog-content">
        {/* Article Header */}
        <header className="-mt-24 relative z-10 max-w-3xl mx-auto bg-card rounded-2xl shadow-lg p-8 md:p-12">
          <Link to={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}>
            <Badge className="mb-4">{post.category}</Badge>
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link
                  to={`/author/${post.author.id}`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {post.author.name}
                </Link>
                <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="grid lg:grid-cols-12 gap-12 py-12">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bookmark className="h-5 w-5" />
              </Button>
              <div className="border-t border-border pt-4 space-y-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Facebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h3 className="font-heading font-semibold mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  </div>
                </div>
              </div>
              <AdSpace variant="square" />
            </div>
          </aside>
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="font-heading text-2xl font-bold">Related Articles</h2>
            <SortFilter value={sortBy} onChange={setSortBy} />
          </div>
          <div className="mb-8">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={categories}
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map((relPost) => (
              <BlogCard key={relPost.id} post={relPost} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
