# Clarity — A Modern Blog Platform for the Industrial Automation Era

> A fast, multilingual, theme-aware publishing front-end built with React, TypeScript and Tailwind — designed as the public face for engineers, makers and integrators working on the future of industrial automation, mechatronics, robotics and connected mobility.

---

## ✨ The Idea

Industrial automation is moving out of the factory.

What used to live behind locked PLC cabinets — robotic arms, vision systems, autonomous vehicles, mechatronic actuators, sensor fusion — is now reshaping logistics, agriculture, healthcare, energy and everyday consumer products. The people building this future are scattered across disciplines: mechanical engineers, embedded developers, ML researchers, control-systems specialists, OEM integrators.

**Clarity is a publishing platform built for that audience.** A place to:

- Document real-world automation projects (robots, EV systems, smart factories, IoT fleets)
- Share field notes from mechatronics and control-systems work
- Make deeply technical writing approachable to a wider, design-conscious audience
- Build a credible long-form presence that an engineering portfolio or company blog can grow into

The goal is not "another blog." It's a clean, modern reading experience that gives technical content the same visual quality the consumer web takes for granted — so the ideas travel further.

---

## 🚀 What's Implemented

### Reading experience
- **Responsive, content-first layout** with a magazine-style landing page, dedicated category pages, and a powerful Explore view
- **Light & dark themes** via `next-themes`, with a fully tokenised design system in `index.css` + `tailwind.config.ts` (no hard-coded colors in components)
- **Smooth motion** using Framer Motion + GSAP for page transitions and scroll reveals
- **Image carousels** on blog cards and hero sections for multi-image articles
- **Loading skeletons** and **infinite scroll** on listing pages for a snappy feel

### Content discovery
- **Category navigation** sourced live from the backend
- **Hover-dropdown subcategory filter** with multi-select chips on the Explore page — pick "Automotives → Car + EV", or any combination across categories
- **Sort + filter controls** (latest, popular, etc.)
- **Trending sidebar** and curated landing-page sections

### Internationalisation
- Custom `LanguageContext` supporting **English / French / Spanish** out of the box
- Language switcher in the header; translations live in `src/i18n/translations.ts`

### Mobile-first navigation
- Fixed bottom nav bar + slide-in side sheet for thumb-friendly browsing
- Layout breakpoints tuned for phones, tablets and desktops

### Privacy & compliance
- **GDPR-style cookie consent banner** with granular toggles
- **DOMPurify** sanitisation on all rendered blog HTML (XSS-safe)
- Strict cookie flags and a Privacy Policy page

### State & data layer
- **Redux Toolkit** for global UI / auth / blog state
- **TanStack Query** for server state, caching and request deduplication
- Clean separation: `services/` (HTTP) → `hooks/` (Query wrappers) → `pages/` (UI)
- Type-safe API contracts in `src/types/api.ts`
- Mappers in `src/utils/mappers.ts` translate the backend shape into the internal `BlogPost` model

### Backend integration
- Talks to a REST backend exposing settings, blogs, categories and subcategories
- Switchable **local ↔ production** base URLs via env vars (no URLs hardcoded into the bundle)
- Image URLs are resolved through a configurable `IMAGE_BASE_URL` so the storage host can change without touching code

### Auth scaffolding
- Sign-in / Sign-up pages and Redux auth slice in place, ready to wire to a provider (Lovable Cloud / Supabase / custom JWT)

---

## 🧱 Tech Stack

| Layer | Choice |
|---|---|
| Framework | **React 18** + **Vite 5** |
| Language | **TypeScript 5** |
| Styling | **Tailwind CSS v3** + shadcn/ui (Radix primitives) |
| State | **Redux Toolkit**, **TanStack Query** |
| Routing | **React Router v6** |
| Animation | **Framer Motion**, **GSAP** |
| Forms / Validation | **react-hook-form** + **zod** |
| Security | **DOMPurify** |
| i18n | Custom React Context |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── blog/          # BlogCard, CategoryFilter, SubcategoryFilter, ImageCarousel...
│   ├── layout/        # Header, Footer, Layout, PageTransition
│   └── ui/            # shadcn/ui primitives
├── config/api.ts      # API base URL + image URL config (env-driven)
├── contexts/          # LanguageContext
├── hooks/             # useApi (Query hooks), useInfiniteScroll, ...
├── i18n/              # EN / FR / ES translations
├── pages/             # Index, ExploreBlogs, BlogPage, CategoryPage, About, ...
├── services/          # HTTP layer (blogService.ts)
├── store/             # Redux slices
├── types/api.ts       # Backend response types
└── utils/mappers.ts   # API → internal model
```

---

## ⚙️ Configuration

This repo is **safe to publish publicly** — no API keys, tokens or production URLs are committed. All environment-specific values are loaded from Vite env vars at build time.

### 1. Copy the env template

```bash
cp .env.example .env.local
```

### 2. Fill in your own values

```env
# Local backend
VITE_API_BASE_URL=http://localhost:3000/v1/api
VITE_IMAGE_BASE_URL=http://localhost:3000/uploads

# Production backend (set in your hosting provider's env settings)
# VITE_API_BASE_URL=https://api.your-domain.com/v1/api
# VITE_IMAGE_BASE_URL=https://api.your-domain.com/uploads
```

`.env.local` and all `.env*` files are gitignored.

---

## 🛠️ Getting Started

Requires Node.js 18+ (install via [nvm](https://github.com/nvm-sh/nvm)).

```bash
# Install
npm install

# Run the dev server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

The app expects a REST backend exposing the endpoints documented in `src/services/blogService.ts`:

| Endpoint | Purpose |
|---|---|
| `GET  /user/settings` | Site general settings |
| `GET  /user/blogs` | List all blogs |
| `POST /user/blogs/getOneBlog` | Fetch a blog by `slug` |
| `GET  /user/category/all` | List categories |
| `GET  /user/category/:id` | Category detail |
| `GET  /public/subcategory/all?cat_id=:id` | Subcategories of a category |
| `GET  /public/subcategory/:id` | Subcategory detail |

---

## 🗺️ Where This Is Heading

A few directions the platform is built to grow into:

- **Author dashboards** for engineers to publish field reports without a CMS team
- **Project showcases** — interactive embeds for CAD, schematics, telemetry charts
- **Inline code & math** rendering for deeper technical writing
- **Community layer** — comments, reactions, follow-an-author
- **AI-assisted summaries & translations** so a Spanish field engineer can read an English white paper instantly
- **Search across all content** with semantic matching

The bigger bet: as industrial automation, robotics and electrified mobility become the backbone of every industry, the people building them need a publishing surface as polished as anything in consumer tech. Clarity is that surface.

---

## 📄 License

This project is open for learning and personal exploration. If you fork it or use parts of it commercially, please give credit.
