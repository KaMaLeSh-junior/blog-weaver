import { useEffect, useRef, useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AdSpace from "@/components/blog/AdSpace";
import {
  useAllBlogsInfinite,
  useAllCategories,
  useBlogHighlights,
  useFilteredSearchInfinite,
} from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory } from "@/utils/mappers";
import {
  blogPosts as staticPosts,
  getFeaturedPosts,
  categories as staticCategories,
} from "@/data/blogData";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { motion } from "framer-motion";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [useCarousel] = useState(true);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const { data: apiBlogHighlights, isLoading: highlightsLoading } =
    useBlogHighlights();

  // Infinite list when no category is selected
  const allInfinite = useAllBlogsInfinite(10, activeCategory === "all");
  // Infinite list when a category is selected
  const categoryInfinite = useFilteredSearchInfinite(
    { category: activeCategory },
    activeCategory !== "all",
  );

  const active = activeCategory === "all" ? allInfinite : categoryInfinite;

  const { data: apiCategories } = useAllCategories();

  const heroPosts = useMemo(() => {
    if (apiBlogHighlights && apiBlogHighlights.length > 0) {
      return apiBlogHighlights.filter((b) => b.status === 1).map(mapApiBlogToPost);
    }
    return staticPosts;
  }, [apiBlogHighlights]);

  const gridPosts = useMemo(() => {
    if (active.data) {
      const flat = active.data.pages
        .flatMap((p) => p.data)
        .filter((b) => b.status === 1)
        .map(mapApiBlogToPost);
      if (flat.length > 0) return flat;
    }
    return activeCategory === "all" ? staticPosts : [];
  }, [active.data, activeCategory]);

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories
        .filter((c) => c.status === 1)
        .map((c) => mapApiCategoryToCategory(c, 0));
    }
    return staticCategories;
  }, [apiCategories]);

  const featuredPosts = useMemo(() => {
    if (heroPosts.length > 0) return heroPosts.slice(0, 4);
    return getFeaturedPosts(4);
  }, [heroPosts]);

  const blogsLoading = active.isLoading;
  const hasMore = active.hasNextPage;
  const isLoadingMore = active.isFetchingNextPage;

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          active.fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, active]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <Layout
      title="ClarityMFG - Clarity Manufacturing"
      description="Discover insightful articles on industrial automation, mechatronics, robotics, and connected mobility. Stay informed with ClarityMFG."
    >
      {/* Hero Section */}
      <motion.section
        className="gradient-hero py-12 md:py-16 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container">
          {highlightsLoading ? (
            <SkeletonCard variant="featured" />
          ) : useCarousel && featuredPosts.length > 1 ? (
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {featuredPosts.map((post) => (
                  <CarouselItem key={post.id}>
                    <BlogCard post={post} variant="featured" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-6">
                <CarouselPrevious className="static translate-y-0 bg-card hover:bg-accent" />
                <CarouselNext className="static translate-y-0 bg-card hover:bg-accent" />
              </div>
            </Carousel>
          ) : (
            featuredPosts[0] && <BlogCard post={featuredPosts[0]} variant="featured" />
          )}
        </div>
      </motion.section>

      <motion.section
        className="container py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AdSpace variant="horizontal" />
      </motion.section>

      <motion.section
        className="py-12 md:py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select a category to see more related content
            </p>
          </div>
          <CategoryFilter
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
          />
        </div>
      </motion.section>

      <section className="py-12">
        <div className="container">
          {blogsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {gridPosts.slice(0, 3).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>

              {gridPosts.length > 3 && (
                <motion.div
                  className="my-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <AdSpace variant="horizontal" />
                </motion.div>
              )}

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {gridPosts.slice(3).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoadingMore && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more articles...</span>
              </div>
            )}
            {!hasMore && gridPosts.length > 0 && (
              <p className="text-muted-foreground text-sm">You've reached the end</p>
            )}
          </div>
        </div>
      </section>

      <motion.section
        className="py-16 bg-secondary/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8" ref={newsletterRef}>
            <div style={{ display: "none" }} className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-heading text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6">
                  Join our community and never miss an article. Get the latest insights delivered to your inbox weekly.
                </p>
              </div>
            </div>
            <div>
              <AdSpace variant="vertical" />
            </div>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default Index;
