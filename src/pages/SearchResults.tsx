import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Search, Loader2, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useSearchBlogsInfinite } from "@/hooks/useApi";
import { mapApiBlogToPost } from "@/utils/mappers";
import { motion } from "framer-motion";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Keep local input synced when URL changes (e.g. back/forward navigation).
  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  // Autofocus the search input on first mount.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useSearchBlogsInfinite(initialQuery, 10, initialQuery.trim().length > 0);

  const posts = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((p) => p.data)
      .filter((b) => b.status === 1)
      .map(mapApiBlogToPost);
  }, [data]);

  const total = data?.pages[0]?.pagination.total ?? 0;

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "200px" },
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout
      title={
        initialQuery
          ? `Search: ${initialQuery} - ClarityMFG`
          : "Search - ClarityMFG"
      }
      description="Search articles across all topics on ClarityMFG."
    >
      <section className="gradient-hero py-10 md:py-14">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-center">
            Search Articles
          </h1>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, categories, topics..."
                className="h-12 pl-12 pr-24 text-base"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="container py-10">
        {!initialQuery ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Type something above to start searching.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Something went wrong. Please try again.
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No articles found for &ldquo;{initialQuery}&rdquo;.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => navigate("/explore")}
            >
              Browse all articles
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              Showing{" "}
              <span className="font-medium text-foreground">
                {posts.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">{total}</span>{" "}
              result{total === 1 ? "" : "s"} for{" "}
              <span className="font-medium text-foreground">
                &ldquo;{initialQuery}&rdquo;
              </span>
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>

            <div ref={loaderRef} className="flex justify-center py-10">
              {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more results...</span>
                </div>
              )}
              {!hasNextPage && posts.length > 0 && (
                <p className="text-muted-foreground text-sm">
                  You&rsquo;ve reached the end
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default SearchResults;
