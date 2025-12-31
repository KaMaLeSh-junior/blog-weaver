import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { categories, blogPosts } from "@/data/blogData";
import { ChevronRight } from "lucide-react";

const Sitemap = () => {
  return (
    <Layout
      title="Sitemap - Clarity Blog"
      description="Complete sitemap of Clarity Blog. Navigate all our pages and content."
    >
      <section className="py-16">
        <div className="container max-w-4xl">
          <h1 className="font-heading text-4xl font-bold mb-12">Sitemap</h1>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Main Pages */}
            <div>
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-primary" />
                Main Pages
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/signin" className="text-muted-foreground hover:text-primary transition-colors">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="text-muted-foreground hover:text-primary transition-colors">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-primary" />
                Categories
              </h2>
              <ul className="space-y-3">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {category.name} ({category.count})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog Posts */}
            <div className="md:col-span-2">
              <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
                <ChevronRight className="h-5 w-5 text-primary" />
                Articles
              </h2>
              <ul className="grid sm:grid-cols-2 gap-3">
                {blogPosts.map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sitemap;
