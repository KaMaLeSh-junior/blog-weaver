import { Link } from "react-router-dom";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import ImageCarousel from "./ImageCarousel";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "horizontal" | "featured";
}

// Helper to get all images from a post
const getPostImages = (post: BlogPost): string[] => {
  if (post.images && post.images.length > 0) {
    return post.images;
  }
  return post.image ? [post.image] : [];
};

const ArticleMedia = ({ images, title }: { images: string[]; title: string }) =>
  images.length > 0 ? (
    <ImageCarousel images={images} alt={title} />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Image unavailable
    </div>
  );

const BlogCard = ({ post, variant = "default" }: BlogCardProps) => {
  const images = getPostImages(post);

  if (variant === "featured") {
    return (
      <article className="group grid md:grid-cols-2 gap-8 bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="overflow-hidden h-64 md:h-80 relative">
          <ArticleMedia images={images} title={post.title} />
          <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-0" />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8 md:pr-12">
          <Link to={`/category/${post.category.toLowerCase()}`}>
            <Badge
              variant="secondary"
              className="w-fit mb-4 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {post.category}
            </Badge>
          </Link>
          <Link to={`/blog/${post.slug}`}>
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors leading-tight">
              {post.title}
            </h2>
          </Link>
          <p className="text-muted-foreground cursor-pointer mb-6 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex cursor-pointer items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium text-foreground text-primary transition-colors">
                {post.author.name}
              </p>
              <p className="text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="group flex gap-4 bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
        <div className="w-1/3 min-w-[120px] overflow-hidden relative">
          <ArticleMedia images={images} title={post.title} />
          <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-0" />
        </div>
        <div className="flex-1 py-4 pr-4">
          <Link to={`/category/${post.category.toLowerCase()}`}>
            <Badge variant="outline" className="mb-2 text-xs">
              {post.category}
            </Badge>
          </Link>
          <Link to={`/blog/${post.slug}`}>
            <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">
            {post.author.name} • {formatDate(post.publishedAt)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="block overflow-hidden h-48 relative">
        <ArticleMedia images={images} title={post.title} />
        <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-0" />
      </div>
      <div className="p-5">
        <Link to={`/category/${post.category.toLowerCase()}`}>
          <Badge
            variant="secondary"
            className="mb-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {post.category}
          </Badge>
        </Link>
        <Link to={`/blog/${post.slug}`}>
          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground cursor-pointer line-clamp-2 mb-4">
          {post.excerpt}
        </p>
        <div className="flex cursor-pointer items-center gap-2 text-sm">
          <span className="text-muted-foreground">By</span>
          <p className="font-medium text-foreground text-primary transition-colors">
            {post.author.name}
          </p>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
