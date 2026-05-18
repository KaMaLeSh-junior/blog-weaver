import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  AtSign,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/blogData";
import { useAppSettings, getEnabledSocialLinks } from "@/hooks/useAppSettings";
import { getImageUrl } from "@/config/api";
import type { SocialPlatform } from "@/types/api";

const ICONS: Record<SocialPlatform, typeof Facebook> = {
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  threads: AtSign,
};

const Footer = () => {
  const { settings, showSubscription } = useAppSettings();
  const socials = getEnabledSocialLinks(settings.social_links);
  const title = settings.title || "ClarityMFG";
  const initial = title.trim().charAt(0).toUpperCase() || "C";
  const logoSrc = settings.logo_image ? getImageUrl(settings.logo_image) : null;

  return (
    <footer className="bg-foreground text-primary-foreground dark:bg-card dark:text-card-foreground">
      {/* Newsletter Section */}
      {showSubscription && (
        <div className="border-b border-primary-foreground/10">
          <div className="container py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="font-heading text-3xl font-bold mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-primary-foreground/70 mb-6">
                Get the latest articles, insights, and updates delivered straight to your inbox.
              </p>
              <form className="flex gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
                {logoSrc ? (
                  <img src={logoSrc} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-primary-foreground font-heading font-bold text-lg">
                    {initial}
                  </span>
                )}
              </div>
              <span className="font-heading font-bold text-xl">{title}</span>
            </Link>
            <p className="text-primary-foreground/70 mb-6 text-sm leading-relaxed">
              {settings.site_description}
            </p>
            {socials.length > 0 && (
              <div className="flex gap-3">
                {socials.map(({ platform, url }) => {
                  const Icon = ICONS[platform];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              {settings.address && <li>{settings.address}</li>}
              {settings.email && (
                <li>
                  <a href={`mailto:${settings.email}`} className="hover:text-primary transition-colors">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.phone && (
                <li>
                  <a href={`tel:${settings.phone}`} className="hover:text-primary transition-colors">
                    {settings.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} {title}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link to="/sitemap" className="hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
