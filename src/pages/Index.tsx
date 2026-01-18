import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AdSpace from "@/components/blog/AdSpace";
import TrendingSidebar from "@/components/blog/TrendingSidebar";
import { blogPosts, getFeaturedPosts, getTrendingPosts, getMostViewedPosts, categories } from "@/data/blogData";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Loader2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [useCarousel] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  const featuredPosts = getFeaturedPosts(4);
  const filteredPosts = activeCategory === "all"
    ? blogPosts.filter((post) => !post.featured)
    : blogPosts.filter(
        (post) =>
          post.category.toLowerCase() === categories.find((c) => c.slug === activeCategory)?.name.toLowerCase()
      );

  const { displayedItems, hasMore, isLoading, loaderRef } = useInfiniteScroll({
    items: filteredPosts,
    itemsPerPage: 6,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation with stagger
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );

        // Parallax effect on hero
        gsap.to(heroRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Categories section animation
      if (categoriesRef.current) {
        gsap.fromTo(
          categoriesRef.current.querySelector(".section-header"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 85%",
            },
          }
        );

        gsap.fromTo(
          categoriesRef.current.querySelectorAll(".category-btn"),
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Trending section animation
      if (trendingRef.current) {
        gsap.fromTo(
          trendingRef.current.querySelectorAll(".trending-card"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: trendingRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Newsletter section animation
      if (newsletterRef.current) {
        gsap.fromTo(
          newsletterRef.current,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: newsletterRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate new cards when they load
  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".blog-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );
    }
  }, [displayedItems, activeCategory]);

  return (
    <Layout
      title="Clarity Blog - Insights on Technology, Lifestyle & More"
      description="Discover insightful articles on technology, lifestyle, travel, health, and culture. Stay informed with Clarity Blog."
    >
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16 overflow-hidden" ref={heroRef}>
        <div className="container">
          {useCarousel && featuredPosts.length > 1 ? (
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
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
      </section>

      {/* Ad Space */}
      <section className="container py-8">
        <AdSpace variant="horizontal" />
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16" ref={categoriesRef}>
        <div className="container">
          <div className="text-center mb-10 section-header">
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
          />
        </div>
      </section>

      {/* Trending & Most Viewed Section */}
      <section className="py-12 bg-secondary/20" ref={trendingRef}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="trending-card">
              <TrendingSidebar
                trendingPosts={getTrendingPosts(4)}
                mostViewedPosts={[]}
                title="Trending Now"
              />
            </div>
            <div className="trending-card">
              <TrendingSidebar
                trendingPosts={[]}
                mostViewedPosts={getMostViewedPosts(4)}
                title="Most Viewed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid with Infinite Scroll */}
      <section className="py-12">
        <div className="container">
          <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.slice(0, 3).map((post) => (
              <div key={post.id} className="blog-card">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
          
          {/* Mid-Content Ad */}
          {displayedItems.length > 3 && (
            <div className="my-8">
              <AdSpace variant="horizontal" />
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.slice(3).map((post) => (
              <div key={post.id} className="blog-card">
                <BlogCard post={post} />
              </div>
            ))}
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
              <p className="text-muted-foreground text-sm">You've reached the end</p>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter & Ad Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8" ref={newsletterRef}>
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-card">
                <h3 className="font-heading text-2xl font-bold mb-4">
                  Stay Updated
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join our community and never miss an article. Get the latest
                  insights delivered to your inbox weekly.
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
      </section>
    </Layout>
  );
};

export default Index;
