export type Language = "en" | "fr" | "es";

export interface Translations {
  nav: {
    home: string;
    exploreBlogs: string;
    about: string;
    contact: string;
    signIn: string;
    subscribe: string;
    search: string;
    blogs: string;
    menu: string;
    language: string;
  };
  hero: {
    featured: string;
    readMore: string;
    minRead: string;
  };
  blog: {
    trending: string;
    mostViewed: string;
    relatedArticles: string;
    noArticles: string;
    all: string;
    views: string;
  };
  filters: {
    sortBy: string;
    latest: string;
    oldest: string;
    trending: string;
    mostViewed: string;
  };
  explore: {
    title: string;
    subtitle: string;
  };
  newsletter: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    categories: string;
    connect: string;
    copyright: string;
    privacyPolicy: string;
    sitemap: string;
  };
  common: {
    search: string;
    loading: string;
  };
  cookies: {
    title: string;
    description: string;
    acceptAll: string;
    rejectAll: string;
    manage: string;
    savePreferences: string;
    necessary: string;
    necessaryDesc: string;
    analytics: string;
    analyticsDesc: string;
    marketing: string;
    marketingDesc: string;
    functional: string;
    functionalDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      exploreBlogs: "Explore Blogs",
      about: "About",
      contact: "Contact",
      signIn: "Sign In",
      subscribe: "Subscribe",
      search: "Search",
      blogs: "Blogs",
      menu: "Menu",
      language: "Language",
    },
    hero: {
      featured: "Featured",
      readMore: "Read More",
      minRead: "min read",
    },
    blog: {
      trending: "Trending",
      mostViewed: "Most Viewed",
      relatedArticles: "Related Articles",
      noArticles: "No articles found",
      all: "All",
      views: "views",
    },
    filters: {
      sortBy: "Sort by",
      latest: "Latest",
      oldest: "Oldest",
      trending: "Trending",
      mostViewed: "Most Viewed",
    },
    explore: {
      title: "Explore All Articles",
      subtitle: "Discover stories, insights, and ideas from our community",
    },
    newsletter: {
      title: "Stay Updated",
      subtitle: "Subscribe to our newsletter for the latest articles and insights.",
      placeholder: "Enter your email",
      button: "Subscribe",
    },
    footer: {
      tagline: "Exploring ideas, sharing stories, and inspiring minds through quality content.",
      quickLinks: "Quick Links",
      categories: "Categories",
      connect: "Connect",
      copyright: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      sitemap: "Sitemap",
    },
    common: {
      search: "Search",
      loading: "Loading...",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      exploreBlogs: "Explorer les Blogs",
      about: "À Propos",
      contact: "Contact",
      signIn: "Connexion",
      subscribe: "S'abonner",
      search: "Rechercher",
      blogs: "Blogs",
      menu: "Menu",
      language: "Langue",
    },
    hero: {
      featured: "À la Une",
      readMore: "Lire Plus",
      minRead: "min de lecture",
    },
    blog: {
      trending: "Tendances",
      mostViewed: "Plus Vus",
      relatedArticles: "Articles Connexes",
      noArticles: "Aucun article trouvé",
      all: "Tous",
      views: "vues",
    },
    filters: {
      sortBy: "Trier par",
      latest: "Récent",
      oldest: "Ancien",
      trending: "Tendances",
      mostViewed: "Plus Vus",
    },
    explore: {
      title: "Explorer Tous les Articles",
      subtitle: "Découvrez des histoires, des idées et des inspirations de notre communauté",
    },
    newsletter: {
      title: "Restez Informé",
      subtitle: "Abonnez-vous à notre newsletter pour les derniers articles.",
      placeholder: "Entrez votre email",
      button: "S'abonner",
    },
    footer: {
      tagline: "Explorer des idées, partager des histoires et inspirer les esprits avec du contenu de qualité.",
      quickLinks: "Liens Rapides",
      categories: "Catégories",
      connect: "Connexion",
      copyright: "Tous droits réservés.",
      privacyPolicy: "Politique de Confidentialité",
      sitemap: "Plan du Site",
    },
    common: {
      search: "Rechercher",
      loading: "Chargement...",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      exploreBlogs: "Explorar Blogs",
      about: "Nosotros",
      contact: "Contacto",
      signIn: "Iniciar Sesión",
      subscribe: "Suscribirse",
      search: "Buscar",
      blogs: "Blogs",
      menu: "Menú",
      language: "Idioma",
    },
    hero: {
      featured: "Destacado",
      readMore: "Leer Más",
      minRead: "min de lectura",
    },
    blog: {
      trending: "Tendencias",
      mostViewed: "Más Vistos",
      relatedArticles: "Artículos Relacionados",
      noArticles: "No se encontraron artículos",
      all: "Todos",
      views: "vistas",
    },
    filters: {
      sortBy: "Ordenar por",
      latest: "Reciente",
      oldest: "Antiguo",
      trending: "Tendencias",
      mostViewed: "Más Vistos",
    },
    explore: {
      title: "Explorar Todos los Artículos",
      subtitle: "Descubre historias, ideas e inspiración de nuestra comunidad",
    },
    newsletter: {
      title: "Mantente Informado",
      subtitle: "Suscríbete a nuestro boletín para los últimos artículos.",
      placeholder: "Ingresa tu email",
      button: "Suscribirse",
    },
    footer: {
      tagline: "Explorando ideas, compartiendo historias e inspirando mentes con contenido de calidad.",
      quickLinks: "Enlaces Rápidos",
      categories: "Categorías",
      connect: "Conectar",
      copyright: "Todos los derechos reservados.",
      privacyPolicy: "Política de Privacidad",
      sitemap: "Mapa del Sitio",
    },
    common: {
      search: "Buscar",
      loading: "Cargando...",
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};
