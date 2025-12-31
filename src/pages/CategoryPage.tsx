import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BlogCard from "@/components/blog/BlogCard";
import AdSpace from "@/components/blog/AdSpace";
import { categories, getBlogsByCategory } from "@/data/blogData";
import { useEffect } from "react";
import gsap from "gsap";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);
  const posts = getBlogsByCategory(slug || "");

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
  }, [slug]);

  if (!category) {
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
      title={`${category.name} - Clarity Blog`}
      description={category.description}
    >
      {/* Header */}
      <section className="gradient-hero py-16 category-header">
        <div className="container text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {category.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {posts.length} article{posts.length !== 1 ? "s" : ""} in this category
          </p>
        </div>
      </section>

      {/* Ad Space */}
      <section className="container py-8">
        <AdSpace variant="horizontal" />
      </section>

      {/* Posts Grid */}
      <section className="py-12">
        <div className="container">
          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div key={post.id} className="category-card">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
