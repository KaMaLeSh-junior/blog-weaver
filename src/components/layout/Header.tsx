import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categories } from "@/data/blogData";
import gsap from "gsap";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.fromTo(
        ".mobile-menu-item",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories", hasDropdown: true },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
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
            <NavigationMenu>
              <NavigationMenuList>
                {navLinks.map((link) =>
                  link.hasDropdown ? (
                    <NavigationMenuItem key={link.name}>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-secondary/50">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {categories.map((category) => (
                            <li key={category.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={`/category/${category.slug}`}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary focus:bg-secondary"
                                >
                                  <div className="text-sm font-medium leading-none">{category.name}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {category.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={link.name}>
                      <Link
                        to={link.path}
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 focus:bg-secondary/50 focus:outline-none ${
                          isActive(link.path) ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/signin" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>

            <Link to="/signup" className="hidden sm:block">
              <Button size="sm">Subscribe</Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="container py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name} className="mobile-menu-item">
                {link.hasDropdown ? (
                  <div className="space-y-2">
                    <span className="font-medium text-foreground flex items-center gap-1">
                      {link.name} <ChevronDown className="h-4 w-4" />
                    </span>
                    <div className="pl-4 space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/category/${category.slug}`}
                          className="block text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className={`block font-medium transition-colors ${
                      isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mobile-menu-item pt-4 flex gap-3">
              <Link to="/signin" className="flex-1">
                <Button variant="outline" className="w-full">Sign In</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full">Subscribe</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
