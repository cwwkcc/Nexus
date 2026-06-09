## Overview

This document defines the strategy for search engine optimisation (SEO) and internal site search. It covers metadata, structured data, sitemap, Open Graph, and search implementation.

---

## Metadata Standards

### Title

Pattern: `{Page specific title} | C.W.W. Kannangara Central College`

| Page | Title | Max 60 chars |
|------|-------|---------------|
| Home | `C.W.W. Kannangara Central College – Mathugama, Sri Lanka` | 52 |
| About | `About Us – History, Mission, Values | KCC` | 45 |
| Academics | `Academic Programmes – Science, Commerce, Arts, Technology | KCC` | 60 |
| Admissions | `Admissions – Apply to C.W.W. Kannangara Central College` | 52 |
| News | `News & Announcements | KCC` | 32 |
| Results | `Results Portal – Exam Results | KCC` | 39 |
| Facilities | `Facilities – Campus, Labs, Library, Sports, Pool | KCC` | 55 |
| Societies | `Societies – Clubs & Organisations | KCC` | 42 |
| Gallery | `Gallery – Moments at KCC` | 23 |
| Contact | `Contact Us – KCC` | 17 |

### Description

Length: 120–160 characters. Unique per page.

| Page | Description |
|------|-------------|
| Home | `Sri Lanka's first Central College — 153 years of shaping minds. Explore academics, admissions, results, and school life at KCC Mathugama.` |
| About | `Learn about our 153‑year history, founder Dr. C.W.W. Kannangara, mission, values, and alumni legacy.` |
| Academics | `Explore our A/L streams (Science, Commerce, Arts, Technology), subject offerings, career pathways, and outstanding exam results.` |
| Admissions | `Applications for Grade 1 and other classes. Process steps, key dates, requirements, and enquiry form.` |
| News | `Latest announcements, academic achievements, sports victories, and upcoming events at C.W.W. Kannangara Central College.` |
| Results | `View O/L, A/L, and Scholarship exam results securely using your index number. Download official result sheets.` |
| Facilities | `Explore our modern amenities – science labs, ICT labs, auditorium, swimming pool, library, and sports grounds.` |
| Societies | `Discover student clubs – academic, cultural, sports, and technology societies. Join KITS, Science Society, Drama Club, and more.` |
| Gallery | `Photo albums from prize givings, sports meets, cultural events, and everyday school life at KCC.` |
| Contact | `Get in touch with our departments, send a general enquiry, provide feedback, or find directions to our campus.` |

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

- Generated automatically using `next-sitemap`.
- **Included:** All public pages (`/en/*`), news articles, society pages, gallery albums.
- **Excluded:** Results search (query parameters), admin routes.

Configuration (`next-sitemap.config.js`):

```javascript
module.exports = {
  siteUrl: 'https://cwwkcc.lk',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: (config, path) => {
    const priorities = {
      '/': 1.0,
      '/en/about': 0.9,
      '/en/academics': 0.9,
      '/en/admissions': 0.9,
      '/en/news': 0.8,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
```

Submit to Google Search Console and Bing Webmaster Tools.

---

## Open Graph (Social Sharing)

Use `next/og` or static images. Required for all pages.

| Property | Value |
|----------|-------|
| `og:title` | Same as meta title |
| `og:description` | Same as meta description |
| `og:image` | Page‑specific image (1200×630px) or fallback |
| `og:url` | Canonical URL |
| `og:type` | `website` (home), `article` (news), `profile` (staff) |

**Fallback OG image:** `/images/og-fallback.jpg`

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

- **v1.1:** News search (client-side filter by title, excerpt, category).
- **Future:** MeiliSearch or Algolia for site-wide search.

**Search UI:** `SearchInput` component with autocomplete.

---

## Local Business SEO (Google My Business)

- Ensure school's GMB listing is verified and linked to website.

---

## Performance Impact on SEO

Good SEO requires good performance (Core Web Vitals). See [Performance Budgets](./Performance%20Budgets.md).

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms

---

## Monitoring & Reporting

| Tool | Purpose |
|------|---------|
| Google Search Console | Index coverage, search queries, Core Web Vitals |
| Umami | Page views, events, referrers |
| Lighthouse CI | Performance, SEO scores |

**Quarterly SEO audit:** Check broken links, duplicate content, missing metadata.

---

## Related Documents

- [Content Governance – SEO Content Standards](../governance/Content%20Governance.md#seo-content-standards)
- [Page Specifications – SEO Metadata Per Page](../Design%20System/Page%20Specifications.md)
- [Performance Budgets](./Performance%20Budgets.md)

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*
