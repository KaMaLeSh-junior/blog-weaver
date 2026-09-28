# Architecture Decisions

- Initialize browser analytics through `src/lib/analytics.ts` and only after stored analytics-cookie consent, so routing and privacy behavior remain centralized.
- Source all blog, category, article, and article-image content from the public API; never ship seeded content fallbacks.