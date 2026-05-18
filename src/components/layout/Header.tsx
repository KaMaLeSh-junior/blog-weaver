import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Search, Home, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAppSettings } from "@/hooks/useAppSettings";
import BrandLogo from "@/components/BrandLogo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import gsap from "gsap";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { showSubscription } = useAppSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSheetOpen) {
      // Small delay to ensure sheet content is rendered
      const timer = setTimeout(() => {
        const menuItems = document.querySelectorAll(".sheet-menu-item");
        if (menuItems.length > 0) {
          gsap.fromTo(
            menuItems,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
          );
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isSheetOpen]);

  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.exploreBlogs, path: "/explore" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <BrandLogo textClassName="text-foreground" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 focus:bg-secondary/50 focus:outline-none ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = searchInput.trim();
                  if (q) {
                    navigate(`/search?q=${encodeURIComponent(q)}`);
                    setSearchInput("");
                  }
                }}
                className="hidden sm:flex items-center relative"
              >
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  ref={searchRef}
                  type="text"
                  placeholder={t.common.search}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-48 lg:w-64 h-9 pl-9 pr-8"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput("")}
                    className="absolute right-2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </form>

              <ThemeToggle />
              <LanguageSwitcher />

              <Link to="/signin" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  {t.nav.signIn}
                </Button>
              </Link>

              <Link to="/signup" className="hidden sm:block">
                <Button size="sm">{t.nav.subscribe}</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border shadow-lg">
        <div className="flex items-center justify-around h-16 px-2">
          {/* Home */}
          <Link
            to="/"
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
              isActive("/") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.home}</span>
          </Link>

          {/* Search */}
          <button
            onClick={() => navigate("/search")}
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
              location.pathname === "/search"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.search}</span>
          </button>

          {/* Blogs */}
          <Link
            to="/explore"
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
              isActive("/explore") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.blogs}</span>
          </Link>

          {/* Menu Sheet */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <button
                className="flex flex-col items-center justify-center gap-1 flex-1 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu className="h-5 w-5" />
                <span className="text-xs font-medium">{t.nav.menu}</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto max-h-[70vh] rounded-t-2xl">
              <SheetHeader className="pb-4">
                <SheetTitle className="text-left">{t.nav.menu}</SheetTitle>
              </SheetHeader>
              <div className="space-y-2 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`sheet-menu-item flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary/50"
                    }`}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
                
                <div className="border-t border-border my-4" />

                <div className="sheet-menu-item px-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">{t.nav.language}</span>
                    <LanguageSwitcher />
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>

                <div className="sheet-menu-item flex gap-3 px-4 pt-2">
                  <Link to="/signin" className="flex-1" onClick={() => setIsSheetOpen(false)}>
                    <Button variant="outline" className="w-full">{t.nav.signIn}</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={() => setIsSheetOpen(false)}>
                    <Button className="w-full">{t.nav.subscribe}</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="lg:hidden h-16" />
    </>
  );
};

export default Header;
