import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import AdSpace from "@/components/blog/AdSpace";
import SortFilter from "@/components/blog/SortFilter";
import TrendingSidebar from "@/components/blog/TrendingSidebar";
import { useAllBlogs, useAllCategories } from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory, getSortedApiPosts, SortOption } from "@/utils/mappers";
import {
  categories as staticCategories,
  getBlogsByCategory,
  getTrendingPosts,
  getMostViewedPosts,
  getSortedPosts,
} from "@/data/blogData";
import gsap from "gsap";
import { SkeletonCard } from "@/components/ui/skeleton-card";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const { data: apiBlogs, isLoading: blogsLoading } = useAllBlogs();
  const { data: apiCategories } = useAllCategories();

  const posts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return apiBlogs.filter(b => b.status === 1).map(mapApiBlogToPost);
    }
    return [];
  }, [apiBlogs]);

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories
        .filter(c => c.status === 1)
        .map(c => mapApiCategoryToCategory(c, 0));
    }
    return staticCategories;
  }, [apiCategories]);

  const category = categories.find(c => c.slug === slug);

  const categoryPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return posts.filter(
        p => p.category.toLowerCase().replace(/\s+/g, "-") === slug
          || p.category.toLowerCase() === category?.name.toLowerCase()
      );
    }
    return getBlogsByCategory(slug || "");
  }, [posts, slug, category, apiBlogs]);

  const sortedPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return getSortedApiPosts(categoryPosts, sortBy);
    }
    return getSortedPosts(categoryPosts, sortBy);
  }, [categoryPosts, sortBy, apiBlogs]);

  const trendingPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) return posts.slice(0, 3);
    return getTrendingPosts(3);
  }, [apiBlogs, posts]);

  const mostViewedPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) return posts.slice(0, 3);
    return getMostViewedPosts(3);
  }, [apiBlogs, posts]);

  useEffect(() => {
    gsap.fromTo(
      ".category-header",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    gsap.fromTo(
      ".category-card",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );
  }, [slug, sortBy]);

  if (!blogsLoading && !category) {
    return (
      <Layout title="Category Not Found - Clarity Blog">
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${category?.name || "Category"} - Clarity Blog`}
      description={category?.description}
    >
      <section className="gradient-hero py-16 category-header">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {category?.name || "Loading..."}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {category?.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {sortedPosts.length} article{sortedPosts.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </section>

      <section className="container py-8">
        <AdSpace variant="horizontal" />
      </section>

      <section className="container pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="font-heading text-xl font-semibold">All Articles</h2>
          <SortFilter value={sortBy} onChange={setSortBy} />
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {blogsLoading ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
                </div>
              ) : sortedPosts.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedPosts.slice(0, 4).map(post => (
                      <div key={post.id} className="category-card">
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                  {sortedPosts.length > 4 && (
                    <div className="my-8">
                      <AdSpace variant="horizontal" />
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedPosts.slice(4).map(post => (
                      <div key={post.id} className="category-card">
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles in this category yet.</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-1 space-y-6">
              <TrendingSidebar trendingPosts={trendingPosts} mostViewedPosts={mostViewedPosts} />
              <AdSpace variant="square" />
              <AdSpace variant="vertical" />
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-12">
        <AdSpace variant="horizontal" />
      </section>
    </Layout>
  );
};

export default CategoryPage;
