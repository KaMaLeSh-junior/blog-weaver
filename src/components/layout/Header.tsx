import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, Home, BookOpen, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSheetOpen) {
      gsap.fromTo(
        ".sheet-menu-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
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
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-primary-foreground font-heading font-bold text-lg">C</span>
              </div>
              <span className="font-heading font-bold text-xl text-foreground">Clarity</span>
            </Link>

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
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>

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
          <Link
            to="/explore"
            className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 transition-colors ${
              location.pathname.includes("search") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs font-medium">{t.nav.search}</span>
          </Link>

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
