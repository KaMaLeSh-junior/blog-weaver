import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogData";
import { TrendingUp, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrendingSidebarProps {
  trendingPosts: BlogPost[];
  mostViewedPosts: BlogPost[];
}

const TrendingSidebar = ({ trendingPosts, mostViewedPosts }: TrendingSidebarProps) => {
  return (
    <aside className="space-y-8">
      {/* Trending Section */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-heading font-bold text-lg">Trending Now</h3>
        </div>
        <div className="space-y-4">
          {trendingPosts.map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group flex gap-3 items-start"
            >
              <span className="text-2xl font-bold text-muted-foreground/50 group-hover:text-primary transition-colors">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                  {post.views && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Most Viewed Section */}
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-primary" />
          <h3 className="font-heading font-bold text-lg">Most Viewed</h3>
        </div>
        <div className="space-y-4">
          {mostViewedPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="flex items-center gap-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Eye className="h-3 w-3" />
                    {(post.views || 0).toLocaleString()} views
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default TrendingSidebar;
