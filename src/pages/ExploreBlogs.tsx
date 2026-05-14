import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import SortFilter from "@/components/blog/SortFilter";
import AdSpace from "@/components/blog/AdSpace";
import { useAllBlogs, useAllCategories } from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory, getSortedApiPosts, SortOption } from "@/utils/mappers";
import { blogPosts as staticPosts, categories as staticCategories, getSortedPosts } from "@/data/blogData";
import { useLanguage } from "@/contexts/LanguageContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const { t } = useLanguage();
  const advertiseState = false;

  const { data: apiBlogs, isLoading: blogsLoading } = useAllBlogs();
  const { data: apiCategories } = useAllCategories();

  const posts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return apiBlogs.filter(b => b.status === 1).map(mapApiBlogToPost);
    }
    return staticPosts;
  }, [apiBlogs]);

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

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryToggle = (slug: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory !== "all") {
      const cat = categories.find(c => c.slug === activeCategory);
      if (cat) {
        result = result.filter(
          p => p.category.toLowerCase() === cat.name.toLowerCase()
        );
      }
    }
    if (selectedSubcategories.length > 0) {
      result = result.filter(
        p =>
          p.subcategory &&
          selectedSubcategories.includes(
            p.subcategory.toLowerCase().replace(/\s+/g, "-")
          )
      );
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(query)) ||
          p.author.name.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeCategory, selectedSubcategories, posts, categories, searchQuery]);

  const sortedPosts = useMemo(() => {
    if (apiBlogs && apiBlogs.length > 0) {
      return getSortedApiPosts(filteredPosts, sortBy);
    }
    return getSortedPosts(filteredPosts, sortBy);
  }, [filteredPosts, sortBy, apiBlogs]);

  const { displayedItems, hasMore, isLoading, loaderRef, totalItems } =
    useInfiniteScroll({
      items: sortedPosts,
      itemsPerPage: 6,
    });

  return (
    <Layout
      title="Explore Blogs - ClarityMFG"
      description="Browse all articles on industrial automation, mechatronics, robotics, and connected mobility."
    >
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

      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
                categories={categories}
                selectedSubcategories={selectedSubcategories}
                onSubcategoryToggle={handleSubcategoryToggle}
                onClearSubcategories={() => setSelectedSubcategories([])}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setSearchParams({ search: searchQuery.trim() });
                  } else {
                    setSearchParams({});
                  }
                }}
                className="w-full sm:w-auto"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value.trim()) {
                        setSearchParams({});
                      }
                    }}
                    className="pl-9 pr-9 h-9 w-full sm:w-56 lg:w-72"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchParams({});
                      }}
                    >
                      <span className="sr-only">Clear search</span>
                      <span className="text-muted-foreground text-xs">✕</span>
                    </Button>
                  )}
                </div>
              </form>
            </div>
            <div className="flex justify-center lg:justify-end">
              <SortFilter value={sortBy} onChange={setSortBy} />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-6">
        <AdSpace variant="horizontal" />
      </section>

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

          {blogsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeCategory}-${sortBy}`}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                  >
                    {displayedItems.slice(0, 6).map((post, index) => (
                      <motion.div key={post.id} custom={index} variants={cardVariants} initial="hidden" animate="visible">
                        <BlogCard post={post} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {displayedItems.length > 6 && (
                  <div className="my-8">
                    <AdSpace variant="horizontal" />
                  </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.slice(6).map((post, index) => (
                    <motion.div key={post.id} custom={index + 6} variants={cardVariants} initial="hidden" animate="visible">
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <AdSpace variant="square" />
                <AdSpace variant="vertical" />
              </div>
            </div>
          )}

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

          {!blogsLoading && displayedItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No articles found for this category.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="container pb-12">
        <AdSpace variant="horizontal" />
      </section>
    </Layout>
  );
};

export default ExploreBlogs;
