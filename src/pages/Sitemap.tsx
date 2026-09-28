import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllBlogs, useAllCategories } from "@/hooks/useApi";
import { mapApiBlogToPost, mapApiCategoryToCategory } from "@/utils/mappers";

const Sitemap = () => {
  const blogsQuery = useAllBlogs();
  const categoriesQuery = useAllCategories();
  const categories = useMemo(() => (categoriesQuery.data ?? []).filter((item) => item.status === 1).map((item) => mapApiCategoryToCategory(item, 0)), [categoriesQuery.data]);
  const posts = useMemo(() => (blogsQuery.data ?? []).filter((item) => item.status === 1).map(mapApiBlogToPost), [blogsQuery.data]);

  return (
    <Layout title="Sitemap - ClarityMFG" description="Complete sitemap of ClarityMFG. Navigate all our pages and content.">
      <section className="py-16"><div className="container max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-12">Sitemap</h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div><h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2"><ChevronRight className="h-5 w-5 text-primary" />Main Pages</h2><ul className="space-y-3"><li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li><li><Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore Blogs</Link></li><li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li><li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li><li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li></ul></div>
          <div><h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2"><ChevronRight className="h-5 w-5 text-primary" />Categories</h2>{categoriesQuery.isLoading ? <div className="space-y-3">{[1,2,3,4].map((item) => <Skeleton key={item} className="h-5 w-40" />)}</div> : categoriesQuery.isError ? <p className="text-muted-foreground">Categories are unavailable.</p> : categories.length > 0 ? <ul className="space-y-3">{categories.map((category) => <li key={category.id}><Link to={`/category/${category.slug}`} className="text-muted-foreground hover:text-primary transition-colors">{category.name}</Link></li>)}</ul> : <p className="text-muted-foreground">No categories available.</p>}</div>
          <div className="md:col-span-2"><h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2"><ChevronRight className="h-5 w-5 text-primary" />Articles</h2>{blogsQuery.isLoading ? <div className="grid sm:grid-cols-2 gap-3">{[1,2,3,4,5,6].map((item) => <Skeleton key={item} className="h-5 w-full" />)}</div> : blogsQuery.isError ? <p className="text-muted-foreground">Articles are unavailable.</p> : posts.length > 0 ? <ul className="grid sm:grid-cols-2 gap-3">{posts.map((post) => <li key={post.id}><Link to={`/blog/${post.slug}`} className="text-muted-foreground hover:text-primary transition-colors line-clamp-1">{post.title}</Link></li>)}</ul> : <p className="text-muted-foreground">No articles available.</p>}</div>
        </div>
      </div></section>
    </Layout>
  );
};

export default Sitemap;