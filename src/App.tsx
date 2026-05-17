import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ExploreBlogs from "./pages/ExploreBlogs";
import SearchResults from "./pages/SearchResults";
import CategoryPage from "./pages/CategoryPage";
import BlogPage from "./pages/BlogPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <HelmetProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <CookieConsent />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/explore" element={<ExploreBlogs />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/blog/:slug" element={<BlogPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    </HelmetProvider>
  </Provider>
);

export default App;
