import { useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortFilter from "@/components/blog/SortFilter";
import AdSpace from "@/components/blog/AdSpace";
import {
  blogPosts,
  categories,
  getSortedPosts,
  SortOption,
} from "@/data/blogData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

const ExploreBlogs = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const { t } = useLanguage();
  const advertiseState = false;

  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter(
          (post) =>
            post.category.toLowerCase() ===
            categories
              .find((c) => c.slug === activeCategory)
              ?.name.toLowerCase(),
        );

  const sortedPosts = getSortedPosts(filteredPosts, sortBy);

  const { displayedItems, hasMore, isLoading, loaderRef, totalItems } =
    useInfiniteScroll({
      items: sortedPosts,
      itemsPerPage: 6,
    });

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

      {/* Top Ad Space */}
      <section className="container py-6">
        <AdSpace variant="horizontal" />
      </section>

      {/* Blog Grid with Infinite Scroll */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {displayedItems.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{totalItems}</span>{" "}
              articles
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className={advertiseState ? "lg:col-span-3":"lg:col-span-4"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeCategory}-${sortBy}`}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  animate="visible"
                >
                  {displayedItems.slice(0, 6).map((post, index) => (
                    <motion.div
                      key={post.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Mid-Content Ad */}
              {advertiseState && displayedItems.length > 6 && (
                <div className="my-8">
                  <AdSpace variant="horizontal" />
                </div>
              )}

              <div className={`grid md:grid-cols-2 "lg:grid-cols-3" gap-6`}>
                {displayedItems.slice(6).map((post, index) => (
                  <motion.div
                    key={post.id}
                    custom={index + 6}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar Ads */}
            {advertiseState && (
              <div className="lg:col-span-1 space-y-6">
                <AdSpace variant="square" />
                <AdSpace variant="vertical" />
              </div>
            )}
          </div>

          {/* Infinite Scroll Loader */}
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more articles...</span>
              </div>
            )}
            {!hasMore && displayedItems.length > 0 && (
              <p className="text-muted-foreground text-sm">
                You've reached the end
              </p>
            )}
          </div>

          {displayedItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Ad Space */}
      <section className="container pb-12">
        <AdSpace variant="horizontal" />
      </section>
    </Layout>
  );
};

export default ExploreBlogs;
