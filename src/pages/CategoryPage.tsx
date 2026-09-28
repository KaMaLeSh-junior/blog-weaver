import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import gsap from "gsap";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import AdSpace from "@/components/blog/AdSpace";
import SortFilter from "@/components/blog/SortFilter";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useAllCategories, useFilteredSearchInfinite } from "@/hooks/useApi";
import { getSortedApiPosts, mapApiBlogToPost, mapApiCategoryToCategory } from "@/utils/mappers";
import type { SortOption } from "@/types/blog";

const CategoryPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const loaderRef = useRef<HTMLDivElement>(null);
  const { data: apiCategories, isLoading: categoriesLoading, isError: categoriesError } = useAllCategories();
  const blogs = useFilteredSearchInfinite({ category: slug, limit: 10 }, Boolean(slug));

  const categories = useMemo(
    () => (apiCategories ?? [])
      .filter((item) => item.status === 1)
      .map((item) => mapApiCategoryToCategory(item, 0)),
    [apiCategories],
  );
  const category = categories.find((item) => item.slug === slug);
  const posts = useMemo(
    () => getSortedApiPosts(
      (blogs.data?.pages ?? [])
        .flatMap((page) => page.data)
        .filter((item) => item.status === 1)
        .map(mapApiBlogToPost),
      sortBy,
    ),
    [blogs.data, sortBy],
  );
  const total = blogs.data?.pages[0]?.pagination.total ?? posts.length;

  useEffect(() => {
    gsap.fromTo(".category-header", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
  }, [slug]);

  useEffect(() => {
    const target = loaderRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && blogs.hasNextPage && !blogs.isFetchingNextPage) blogs.fetchNextPage();
    }, { threshold: 0.1, rootMargin: "200px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, [blogs.fetchNextPage, blogs.hasNextPage, blogs.isFetchingNextPage]);

  if (!categoriesLoading && !categoriesError && !category) {
    return <Layout title="Category Not Found - ClarityMFG"><div className="container py-20 text-center"><h1 className="font-heading text-3xl font-bold mb-4">Category Not Found</h1><p className="text-muted-foreground">The category you're looking for doesn't exist.</p></div></Layout>;
  }

  return (
    <Layout title={`${category?.name || "Category"} - ClarityMFG`} description={category?.description}>
      <section className="gradient-hero py-16 category-header">
        <div className="container text-center">
          {categoriesLoading ? <div className="mx-auto h-12 w-64 animate-pulse rounded-md bg-muted" /> : <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{category?.name || "Category"}</h1>}
          {category && <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{category.description}</p>}
          {!blogs.isLoading && !blogs.isError && <p className="mt-4 text-sm text-muted-foreground">{total} article{total !== 1 ? "s" : ""} in this category</p>}
        </div>
      </section>
      <section className="container py-8"><AdSpace variant="horizontal" /></section>
      <section className="container pb-4"><div className="flex items-center justify-between flex-wrap gap-4"><h2 className="font-heading text-xl font-semibold">All Articles</h2><SortFilter value={sortBy} onChange={setSortBy} /></div></section>
      <section className="py-8"><div className="container">
        {categoriesError || blogs.isError ? <p className="py-16 text-center text-muted-foreground">This category could not be loaded. Please try again later.</p> : blogs.isLoading || categoriesLoading ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3,4,5,6].map((item) => <SkeletonCard key={item} />)}</div> : posts.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{posts.map((post) => <BlogCard key={post.id} post={post} />)}</div> : <p className="py-16 text-center text-muted-foreground">No articles in this category yet.</p>}
        <div ref={loaderRef} className="flex justify-center py-8">{blogs.isFetchingNextPage && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin" /><span>Loading more articles...</span></div>}{!blogs.hasNextPage && posts.length > 0 && <p className="text-sm text-muted-foreground">You've reached the end</p>}</div>
      </div></section>
      <section className="container pb-12"><AdSpace variant="horizontal" /></section>
    </Layout>
  );
};

export default CategoryPage;