import { useEffect, useRef, useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AdSpace from "@/components/blog/AdSpace";
import TrendingSidebar from "@/components/blog/TrendingSidebar";
import { useAllBlogs, useAllCategories, useBlogHighlights } from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory } from "@/utils/mappers";
import { blogPosts as staticPosts, getFeaturedPosts, getTrendingPosts, getMostViewedPosts, categories as staticCategories } from "@/data/blogData";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
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

  // API data
  // const { data: apiBlogs, isLoading: blogsLoading } = useAllBlogs();
  const { data: apiBlogHighlights, isLoading: blogsLoading } = useBlogHighlights();
  const { data: apiCategories } = useAllCategories();

  // Map API data to frontend types, fallback to static
  const posts = useMemo(() => {
    if (apiBlogHighlights && apiBlogHighlights.length > 0) {
      return apiBlogHighlights.filter(b => b.status === 1).map(mapApiBlogToPost);
    }
    return staticPosts;
  }, [apiBlogHighlights]);

  const categories = useMemo(() => {
    if (apiCategories && apiCategories.length > 0) {
      return apiCategories
        .filter(c => c.status === 1)
        .map(c => {
          const count = posts.filter(
            p => p.category.toLowerCase() === c.name.toLowerCase()
          ).length;
          return mapApiCategoryToCategory(c, count);
        });
    }
    return staticCategories;
  }, [apiCategories, posts]);

  // Featured = first 4 posts (API has no featured flag)
  const featuredPosts = useMemo(() => {
    if (useBlogHighlights && useBlogHighlights.length > 0) return posts.slice(0, 4);
    return getFeaturedPosts(4);
  }, [useBlogHighlights, posts]);

  const filteredPosts = useMemo(() => {
    const nonFeatured = apiBlogHighlights && apiBlogHighlights.length > 0
      ? posts.slice(4)
      : staticPosts.filter(p => !p.featured);

    if (activeCategory === "all") return nonFeatured;
    const cat = categories.find(c => c.slug === activeCategory);
    if (!cat) return nonFeatured;
    return nonFeatured.filter(
      p => p.category.toLowerCase() === cat.name.toLowerCase()
    );
  }, [activeCategory, posts, categories, apiBlogHighlights]);

  // const trendingPosts = useMemo(() => {
  //   if (apiBlogs && apiBlogs.length > 0) return posts.slice(0, 4);
  //   return getTrendingPosts(4);
  // }, [apiBlogs, posts]);

  // const mostViewedPosts = useMemo(() => {
  //   if (apiBlogs && apiBlogs.length > 0) return posts.slice(0, 4);
  //   return getMostViewedPosts(4);
  // }, [apiBlogs, posts]);

  const { displayedItems, hasMore, isLoading, loaderRef } = useInfiniteScroll({
    items: filteredPosts,
    itemsPerPage: 6,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
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
          {blogsLoading ? (
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

      {/* Ad Space */}
      <motion.section 
        className="container py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AdSpace variant="horizontal" />
      </motion.section>

      {/* Categories Section */}
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

      {/* Trending & Most Viewed Section */}
      <motion.section 
        className="py-12 bg-secondary/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <motion.div 
            className="grid lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* <motion.div variants={itemVariants}>
              <TrendingSidebar
                trendingPosts={trendingPosts}
                mostViewedPosts={[]}
                title="Trending Now"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <TrendingSidebar
                trendingPosts={[]}
                mostViewedPosts={mostViewedPosts}
                title="Most Viewed"
              />
            </motion.div> */}
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Grid with Infinite Scroll */}
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
                {displayedItems.slice(0, 3).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
              
              {displayedItems.length > 3 && (
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
                {displayedItems.slice(3).map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
          
          <div ref={loaderRef} className="flex justify-center py-8">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading more articles...</span>
              </div>
            )}
            {!hasMore && displayedItems.length > 0 && (
              <p className="text-muted-foreground text-sm">You've reached the end</p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter & Ad Section */}
      <motion.section 
        className="py-16 bg-secondary/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8" ref={newsletterRef}>
            <div style={{display:"none"}} className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-heading text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-6">
                  Join our community and never miss an article. Get the latest insights delivered to your inbox weekly.
                </p>
                <form className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
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
