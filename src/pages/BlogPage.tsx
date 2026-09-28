import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import gsap from "gsap";
import { Bookmark, Clock, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import Layout from "@/components/layout/Layout";
import AdSpace from "@/components/blog/AdSpace";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import ImageCarousel from "@/components/blog/ImageCarousel";
import SortFilter from "@/components/blog/SortFilter";
import SocialLinksList from "@/components/SocialLinksList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useAllBlogs, useAllCategories, useBlogBySlug } from "@/hooks/useApi";
import { formatDate } from "@/lib/utils";
import type { SortOption } from "@/types/blog";
import { getSortedApiPosts, mapApiBlogToPost, mapApiCategoryToCategory } from "@/utils/mappers";

const BlogPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const blogQuery = useBlogBySlug(slug);
  const blogsQuery = useAllBlogs();
  const categoriesQuery = useAllCategories();

  const post = useMemo(() => blogQuery.data ? mapApiBlogToPost(blogQuery.data) : null, [blogQuery.data]);
  const allPosts = useMemo(() => (blogsQuery.data ?? []).filter((item) => item.status === 1).map(mapApiBlogToPost), [blogsQuery.data]);
  const categories = useMemo(() => (categoriesQuery.data ?? []).filter((item) => item.status === 1).map((item) => mapApiCategoryToCategory(item, 0)), [categoriesQuery.data]);
  const relatedPosts = useMemo(() => {
    const filtered = activeCategory === "all"
      ? allPosts.filter((item) => item.id !== post?.id)
      : allPosts.filter((item) => {
          const category = categories.find((entry) => entry.slug === activeCategory);
          return item.id !== post?.id && category && item.category.toLowerCase() === category.name.toLowerCase();
        });
    return getSortedApiPosts(filtered, sortBy).slice(0, 6);
  }, [activeCategory, allPosts, categories, post?.id, sortBy]);
  const images = post?.images?.length ? post.images : post?.image ? [post.image] : [];

  useEffect(() => {
    if (post) gsap.fromTo(".blog-content", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
  }, [post]);

  if (blogQuery.isLoading) return <Layout title="Loading... - ClarityMFG"><div className="container py-20 space-y-6"><Skeleton className="w-full h-[40vh] rounded-xl" /><div className="max-w-3xl mx-auto space-y-4"><Skeleton className="h-8 w-32" /><Skeleton className="h-12 w-full" /><Skeleton className="h-6 w-2/3" /></div></div></Layout>;
  if (blogQuery.isError) return <Layout title="Article Unavailable - ClarityMFG"><div className="container py-20 text-center"><h1 className="font-heading text-3xl font-bold mb-4">Article unavailable</h1><p className="text-muted-foreground">This article could not be loaded. Please try again later.</p></div></Layout>;
  if (!post) return <Layout title="Post Not Found - ClarityMFG"><div className="container py-20 text-center"><h1 className="font-heading text-3xl font-bold mb-4">Post Not Found</h1><p className="text-muted-foreground">The article you're looking for doesn't exist.</p></div></Layout>;

  return (
    <Layout title={`${post.title} - ClarityMFG`} description={post.excerpt}>
      <div className="relative h-[40vh] w-full bg-muted md:h-[50vh]">{images.length > 0 ? <ImageCarousel images={images} alt={post.title} /> : <div className="flex h-full items-center justify-center text-muted-foreground">Image unavailable</div>}<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" /></div>
      <article className="container blog-content">
        <header className="relative z-10 mx-auto -mt-24 max-w-3xl rounded-2xl bg-card p-8 shadow-lg md:p-12">
          <Link to={`/category/${post.category.toLowerCase().replace(/\s+/g, "-")}`}><Badge className="mb-4">{post.category}</Badge></Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {post.author && <div className="flex items-center gap-3"><Avatar><AvatarImage src={post.author.avatar} alt={post.author.name} /><AvatarFallback>{post.author.name[0]}</AvatarFallback></Avatar><div><p className="font-medium">{post.author.name}</p><p className="text-muted-foreground">{formatDate(post.publishedAt)}</p></div></div>}
            {!post.author && <p className="text-muted-foreground">{formatDate(post.publishedAt)}</p>}
            <div className="flex items-center gap-1 text-muted-foreground"><Clock className="h-4 w-4" /><span>{post.readTime} min read</span></div>
          </div>
        </header>
        <div className="grid lg:grid-cols-12 gap-12 py-12">
          <aside className="hidden lg:block lg:col-span-1"><div className="sticky top-24 space-y-4"><Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button><Button variant="ghost" size="icon"><Bookmark className="h-5 w-5" /></Button><div className="border-t border-border pt-4 space-y-4"><Button variant="ghost" size="icon"><Facebook className="h-5 w-5" /></Button><Button variant="ghost" size="icon"><Twitter className="h-5 w-5" /></Button><Button variant="ghost" size="icon"><Linkedin className="h-5 w-5" /></Button></div></div></aside>
          <div className="lg:col-span-7"><div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }} /></div>
          <aside className="lg:col-span-4"><div className="sticky top-24 space-y-8">{post.author && <div className="rounded-xl bg-card p-6 shadow-card"><h3 className="font-heading font-semibold mb-4">About the Author</h3><div className="flex items-center gap-4"><Avatar className="h-16 w-16"><AvatarImage src={post.author.avatar} alt={post.author.name} /><AvatarFallback>{post.author.name[0]}</AvatarFallback></Avatar><div><p className="font-medium">{post.author.name}</p><p className="text-sm text-muted-foreground">{post.author.bio}</p></div></div></div>}<AdSpace variant="square" /></div></aside>
        </div>
        <div className="max-w-3xl mx-auto pb-12"><div className="rounded-2xl bg-card p-8 text-center shadow-card"><h3 className="font-heading text-xl font-bold mb-2">Stay Connected</h3><p className="text-muted-foreground text-sm mb-6">Follow us on social media for more articles like this.</p><SocialLinksList className="justify-center" /></div></div>
      </article>
      <section className="bg-secondary/30 py-16"><div className="container"><div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"><h2 className="font-heading text-2xl font-bold">Related Articles</h2><SortFilter value={sortBy} onChange={setSortBy} /></div><div className="mb-8"><CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} categories={categories} /></div>{blogsQuery.isLoading || categoriesQuery.isLoading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map((item) => <SkeletonCard key={item} />)}</div> : blogsQuery.isError || categoriesQuery.isError ? <p className="py-12 text-center text-muted-foreground">Related articles are unavailable right now.</p> : relatedPosts.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{relatedPosts.map((item) => <BlogCard key={item.id} post={item} />)}</div> : <p className="py-12 text-center text-muted-foreground">No related articles are available yet.</p>}</div></section>
    </Layout>
  );
};

export default BlogPage;