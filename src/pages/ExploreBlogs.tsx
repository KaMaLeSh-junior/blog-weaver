import { useState, useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortFilter from "@/components/blog/SortFilter";
import { blogPosts, categories, getSortedPosts, SortOption } from "@/data/blogData";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";

const ExploreBlogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const { t } = useLanguage();
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredPosts = activeCategory === "all"
    ? blogPosts
    : blogPosts.filter(
        (post) =>
          post.category.toLowerCase() === categories.find((c) => c.slug === activeCategory)?.name.toLowerCase()
      );

  const sortedPosts = getSortedPosts(filteredPosts, sortBy);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".blog-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [activeCategory, sortBy]);

  return (
    <Layout
      title="Explore Blogs - Clarity Blog"
      description="Browse all articles on technology, lifestyle, travel, health, and culture. Filter by category and sort by trending or most viewed."
    >
      {/* Page Header */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {t.explore.title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t.explore.subtitle}
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <div className="flex justify-center lg:justify-end">
              <SortFilter value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12" ref={cardsRef}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{sortedPosts.length}</span> articles
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          {sortedPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ExploreBlogs;
