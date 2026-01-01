import { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import CategoryFilter from "@/components/blog/CategoryFilter";
import AdSpace from "@/components/blog/AdSpace";
import { blogPosts, getFeaturedPosts, categories } from "@/data/blogData";
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
  const [useCarousel, setUseCarousel] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const featuredPosts = getFeaturedPosts(4);
  const filteredPosts = activeCategory === "all"
    ? blogPosts.filter((post) => !post.featured)
    : blogPosts.filter(
        (post) =>
          post.category.toLowerCase() === categories.find((c) => c.slug === activeCategory)?.name.toLowerCase()
      );

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".blog-card");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <Layout
      title="Clarity Blog - Insights on Technology, Lifestyle & More"
      description="Discover insightful articles on technology, lifestyle, travel, health, and culture. Stay informed with Clarity Blog."
    >
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16" ref={heroRef}>
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
      <section className="py-12 md:py-16">
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
          />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12" ref={cardsRef}>
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Ad Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
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
