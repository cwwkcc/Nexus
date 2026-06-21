## Overview

This document defines the strategy for search engine optimisation (SEO) and internal site search. It covers metadata, structured data, sitemap, Open Graph, and search implementation.

---

## Metadata Standards

### Title

Pattern: `{Page specific title} | C.W.W. Kannangara Central College`

|Page|Title|Max 60 chars|
|---|---|---|
|Home|`C.W.W. Kannangara Central College – Mathugama, Sri Lanka`|52|
|About|`About Us – History, Mission, Values|KCC`|
|Academics|`Academic Programmes – Science, Commerce, Arts, Technology|KCC`|
|Admissions|`Admissions – Apply to C.W.W. Kannangara Central College`|52|
|News|`News & Announcements|KCC`|
|Results|`Results Portal – Exam Results|KCC`|
|Facilities|`Facilities – Campus, Labs, Library, Sports, Pool|KCC`|
|Societies|`Societies – Clubs & Organisations|KCC`|
|Gallery|`Gallery – Moments at KCC`|23|
|Contact|`Contact Us – KCC`|17|

### Description

Length: 120–160 characters. Unique per page.

|Page|Description|
|---|---|
|Home|`Sri Lanka's first Central College — 153 years of shaping minds. Explore academics, admissions, results, and school life at KCC Mathugama.`|
|About|`Learn about our 153‑year history, founder Dr. C.W.W. Kannangara, mission, values, and alumni legacy.`|
|Academics|`Explore our A/L streams (Science, Commerce, Arts, Technology), subject offerings, career pathways, and outstanding exam results.`|
|Admissions|`Applications for Grade 1 and other classes. Process steps, key dates, requirements, and enquiry form.`|
|News|`Latest announcements, academic achievements, sports victories, and upcoming events at C.W.W. Kannangara Central College.`|
|Results|`View O/L, A/L, and Scholarship exam results securely using your index number. Download official result sheets.`|
|Facilities|`Explore our modern amenities – science labs, ICT labs, auditorium, swimming pool, library, and sports grounds.`|
|Societies|`Discover student clubs – academic, cultural, sports, and technology societies. Join KITS, Science Society, Drama Club, and more.`|
|Gallery|`Photo albums from prize givings, sports meets, cultural events, and everyday school life at KCC.`|
|Contact|`Get in touch with our departments, send a general enquiry, provide feedback, or find directions to our campus.`|

---

## Structured Data (Schema.org)

Implement JSON‑LD in `<head>` using Next.js `generateMetadata`.

### Homepage – `School`

```json
{
  "@context": "https://schema.org",
  "@type": "School",
  "name": "C.W.W. Kannangara Central College",
  "alternateName": "KCC Mathugama",
  "foundingDate": "1873",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mathugama",
    "addressRegion": "Kalutara",
    "addressCountry": "LK"
  },
  "url": "https://cwwkcc.lk",
  "logo": "https://cwwkcc.lk/logo.svg",
  "sameAs": [
    "https://facebook.com/cwwkcc",
    "https://instagram.com/cwwkcc"
  ]
}
```

### News Article – `NewsArticle`

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "KITS Wins Gold at SLIIT Codefest 2024",
  "datePublished": "2024-10-15",
  "author": {
    "@type": "Organization",
    "name": "KITS"
  },
  "image": "https://cwwkcc.lk/images/news/codefest-winners.jpg"
}
```

### Society – `Organization`

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kannangara ICT Society",
  "url": "https://cwwkcc.lk/societies/kits",
  "parentOrganization": {
    "@type": "School",
    "name": "C.W.W. Kannangara Central College"
  }
}
```

---

## Sitemap

- Generated using Next.js's native `sitemap.ts` route convention (`app/sitemap.ts`) — no third-party package.
- **Included:** All public pages (`/en/*`, `/si/*`), news articles, society pages, gallery albums.
- **Excluded:** Results search (query parameters), admin routes.

Implementation (`apps/web/src/app/sitemap.ts`):

```typescript
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    { url: 'https://cwwkcc.lk/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: 'https://cwwkcc.lk/en/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: 'https://cwwkcc.lk/en/academics', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: 'https://cwwkcc.lk/en/admissions', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: 'https://cwwkcc.lk/en/news', priority: 0.8, changeFrequency: 'daily' as const },
  ];
  const newsArticles = await getPublishedNewsSlugs(); // queries the database directly
  const dynamicRoutes = newsArticles.map((slug) => ({
    url: `https://cwwkcc.lk/en/news/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...staticRoutes, ...dynamicRoutes];
}
```

Querying the database directly inside `sitemap.ts` means dynamic routes (news articles, events, society pages) are always current — there is no separate config file to keep in sync with what's actually published.

Submit to Google Search Console and Bing Webmaster Tools.

---

## Open Graph (Social Sharing)

Generated programmatically via `next/og` (`ImageResponse`) in an `opengraph-image.tsx` per route — not static images. Required for all pages.

|Property|Value|
|---|---|
|`og:title`|Same as meta title|
|`og:description`|Same as meta description|
|`og:image`|Generated at request time from the page title, category, and the school crest|
|`og:url`|Canonical URL|
|`og:type`|`website` (home), `article` (news), `profile` (staff)|

**Fallback:** if a route has no `opengraph-image.tsx` of its own, Next.js falls back to the nearest parent route's generated image — there is no separate static fallback file to keep updated.

---

## Robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Sitemap: https://cwwkcc.lk/sitemap.xml
```

---

## Canonical URLs

Every page must have `rel="canonical"` to itself. Next.js `generateMetadata` handles this when `metadataBase` is set.

---

## Site Search (Internal)

Unified, server-side search across all content types — news, events, staff, societies, gallery albums, archive records, achievement records — powered by PostgreSQL full-text search with support for Sinhala, Tamil, and English (Feature Registry F‑134, Roadmap Task 8.14). Not a client-side filter limited to one content type, and not deferred to a third-party search service — every new content type added to the platform is automatically searchable because the index is built from the database itself.

**Search UI:** `SearchInput` component with autocomplete, plus a dedicated results page grouping matches by content type.

---

## Local Business SEO (Google My Business)

- Ensure school's GMB listing is verified and linked to website.

---

## Performance Impact on SEO

Good SEO requires good performance (Core Web Vitals). See [Performance Budgets](https://claude.ai/chat/Performance%20Budgets.md).

- LCP < 2.5s
- CLS < 0.1
- INP < 200ms

---

## Monitoring & Reporting

|Tool|Purpose|
|---|---|
|Google Search Console|Index coverage, search queries, Core Web Vitals|
|Umami (secondary cross-check)|Page views, events, referrers|
|Lighthouse CI|Performance, SEO scores|

**Quarterly SEO audit:** Check broken links, duplicate content, missing metadata.

---

## Related Documents

- [Content Governance – SEO Content Standards](https://claude.ai/governance/Content%20Governance.md#seo-content-standards)
- [Page Specifications – SEO Metadata Per Page](https://claude.ai/Design%20System/Page%20Specifications.md)
- [Performance Budgets](https://claude.ai/chat/Performance%20Budgets.md)

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_