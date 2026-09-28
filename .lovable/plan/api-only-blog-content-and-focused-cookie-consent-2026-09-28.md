# API-only blog content and focused cookie consent

## Goal
Remove seeded blog/category/author content and bundled blog imagery from the visible application. Every blog view will render API results, API-empty states, API-error states, or loading skeletons. Make cookie consent a focused foreground decision without accidental rejection.

## Changes

### Blog data and images
- Move shared frontend blog/category type definitions out of the seeded data module, then remove the seeded blog data module and its bundled demo images once no imports remain.
- Remove static fallbacks from Home, Explore, category, article, footer, sitemap, and any hidden About-page content.
- Use the existing blog, category, highlight, filtered-search, and single-article APIs as the only content sources.
- Keep API-provided image URLs only; when an article has no image, show a neutral non-image media state rather than a bundled placeholder.

### Loading, empty, and error states
- Keep or add stable skeleton layouts while blog, category, article, related-content, footer-category, and sitemap requests are pending.
- Show clear empty or unavailable states after requests finish instead of substituting demo content.
- Preserve infinite scrolling on Home, Explore, and master Search, including their loading-more indicators.
- Update the category page to request its slug through the filtered API rather than loading a static or broad local list.

### Cookie consent focus
- Add a full-screen dimmed backdrop below the consent panel and raise the panel above all page navigation/content.
- Remove the close control that currently records “Reject all” when dismissed.
- Keep explicit Accept all, Reject all, and preference controls so consent remains a deliberate choice; prevent backdrop clicks from dismissing it.
- Keep analytics disabled unless analytics consent is explicitly granted.

### Verification
- Confirm no production code imports seeded blog data or bundled demo blog images.
- Check Home, Explore, Search, category, article, footer, and sitemap loading/empty behavior.
- Verify the consent backdrop and panel on desktop and mobile, and confirm analytics consent behavior remains unchanged.
- Check the latest preview build and runtime diagnostics.

## Technical details
- Reuse React Query API hooks and the existing card skeleton components.
- Add a shared blog model type module so presentation components remain typed without depending on seeded data.
- Retain explicit cookie rejection for privacy compliance; only the accidental close-to-reject behavior is removed.
