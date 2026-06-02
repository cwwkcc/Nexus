## Purpose

This checklist ensures that all technical, content, and operational requirements are met before the public launch of `v1.0`. Each item must be verified by the responsible owner.

---

## 1. Content Readiness

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| All English page content complete (i18n files) | KITS | ☐ | `messages/en/*.json` filled |
| All Sinhala page content complete | Translation team | ☐ | `messages/si/*.json` filled |
| CMS populated with news (≥ 5 articles) | Editorial Team | ☐ | Includes at least one featured article |
| CMS populated with societies (≥ 4) | Society Advisor | ☐ | Includes KITS as featured |
| CMS populated with staff profiles (principal, deputies, head prefects) | Administration | ☐ | Minimum 6 profiles |
| CMS populated with facilities (≥ 5) | Administration | ☐ | Main building, labs, library, sports, pool |
| CMS populated with gallery albums (≥ 3) | Media Unit | ☐ | Cover images and at least 10 photos each |
| Asset inventory fulfilled (see [Assets Inventory](./Assets%20Inventory.md)) | KITS + respective owners | ☐ | All checkboxes in that document |
| OG images generated for all page types | KITS | ☐ | Home, about, news, society, facilities |
| No placeholder text (“Lorem ipsum”) anywhere | All | ☐ | Manual review |

---

## 2. Technical Readiness

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| All pages pass Lighthouse ≥90 on mobile (simulated 3G) | KITS | ☐ | Use Lighthouse CI |
| Accessibility audit (axe) passes WCAG AA | KITS | ☐ | Manual + automated |
| Performance budgets met (see [Performance Budgets](Performance%20Budgets.md)) | KITS | ☐ | Verified via Lighthouse CI |
| Forms (contact, admissions enquiry, feedback) tested and sending emails | KITS | ☐ | Resend API connected |
| Results portal tested with sample data (O/L, A/L) | Examinations Office + KITS | ☐ | Secure, no PII leakage |
| 404 page tested and styled | KITS | ☐ | Includes crest animation |
| Sitemap.xml generated and accessible | KITS | ☐ | `/sitemap.xml` returns 200 |
| `robots.txt` allows indexing | KITS | ☐ | `Allow: /` |
| No console errors or warnings | KITS | ☐ | Chrome DevTools |
| All internal links work (no broken links) | KITS | ☐ | Crawl with `next/link` checker |

---

## 3. Security & Privacy

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| HTTPS enforced, HSTS configured | DevOps / KITS | ☐ | Vercel default |
| Environment variables set (no secrets in client) | KITS | ☐ | `NEXT_PUBLIC_*` only for public |
| Sanity API token secured (server‑side only) | KITS | ☐ | Not exposed to client |
| Cookie consent banner implemented and functional | KITS | ☐ | `CookieConsentBanner` component |
| No PII sent to analytics | KITS | ☐ | Verify Umami events |
| Form submissions rate‑limited | KITS | ☐ | Use Next.js server actions with rate limiting |

---

## 4. Editorial & Access

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| Content editors trained on Sanity | KITS | ☐ | Minimum 2 editors |
| Admin authentication working (password + email) | KITS | ☐ | Auth.js configured |
| KITS members have access to GitHub and Vercel | KITS Lead | ☐ | Teams invited |
| Sanity preview mode functional | KITS | ☐ | `preview.cwwkcc.lk` or similar |

---

## 5. Launch Operations

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| DNS configured (cwwkcc.lk, admin.cwwkcc.lk, etc.) | Administration / ISP | ☐ | |
| Vercel production domain set | KITS | ☐ | |
| Analytics (Umami) configured and events firing | KITS | ☐ | Verify in dashboard |
| Uptime monitoring active (UptimeRobot) | KITS | ☐ | At least 5 endpoints |
| Error tracking (Sentry) configured | KITS | ☐ | Test error reported |
| Backup of CMS content (Sanity dataset export) | KITS | ☐ | Stored securely |
| Post‑launch support rota defined | KITS Lead | ☐ | On‑call for first 72 hours |

---

## 6. Post‑Launch (within 1 week)

| Item | Owner | Status | Notes |
|------|-------|--------|-------|
| Submit sitemap to Google Search Console | KITS | ☐ | |
| Monitor Core Web Vitals in Search Console | KITS | ☐ | Address issues |
| Collect user feedback (via contact form) | Administration | ☐ | Create feedback loop |
| Run first content audit (broken links, outdated info) | Editorial Team | ☐ | |

---

## Sign‑Off

All items checked and approved by:

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Principal | | | |
| Head of KITS | | | |
| Lead Developer | | | |
| Head of Administration | | | |

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*
