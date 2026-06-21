## Purpose

This checklist ensures that all technical, content, and operational requirements are met before the public launch of `v1.0`. Each item must be verified by the responsible owner.

---

## 1. Content Readiness

|Item|Owner|Status|Notes|
|---|---|---|---|
|All English page content complete (i18n files)|KITS|☐|`messages/en/*.json` filled|
|All Sinhala page content complete|Translation team|☐|`messages/si/*.json` filled|
|Admin panel populated with news (≥ 5 articles)|Editorial Team|☐|Includes at least one featured article|
|Admin panel populated with societies (≥ 4)|Society Advisor|☐|Includes KITS as featured|
|Admin panel populated with staff profiles (principal, deputies, head prefects)|Administration|☐|Minimum 6 profiles|
|Admin panel populated with facilities (≥ 5)|Administration|☐|Main building, labs, library, sports, pool|
|Admin panel populated with extracurricular activities (≥ 3)|Administration|☐|Sports teams and co-curricular activities — distinct from societies|
|Academic Programs content filled for all five streams|Administration|☐|Bio Science, Physical Science, Commerce, Arts, Technology|
|Admin panel populated with initial alumni profiles (≥ 10)|Alumni Coordinator|☐|Builds the directory before public submissions open|
|Admin panel populated with achievement records (≥ 5)|Administration|☐|Spanning academic, sports, and arts categories|
|Digital archive populated with initial historical items (≥ 10)|KITS + Administration|☐|Photographs, a magazine, or a prefect list to start the collection|
|Admin panel populated with gallery albums (≥ 3)|Media Unit|☐|Cover images and at least 10 photos each|
|Asset inventory fulfilled (see [Assets Inventory](https://claude.ai/chat/Assets%20Inventory.md))|KITS + respective owners|☐|All checkboxes in that document|
|OG images generated for all page types|KITS|☐|Home, about, news, society, facilities|
|No placeholder text (“Lorem ipsum”) anywhere|All|☐|Manual review|

---

## 2. Technical Readiness

|Item|Owner|Status|Notes|
|---|---|---|---|
|All pages pass Lighthouse ≥90 on mobile (simulated 3G)|KITS|☐|Use Lighthouse CI|
|Accessibility audit (axe) passes WCAG AA|KITS|☐|Manual + automated|
|Performance budgets met (see [Performance Budgets](https://claude.ai/chat/Performance%20Budgets.md))|KITS|☐|Verified via Lighthouse CI|
|Forms (contact, admissions enquiry, feedback) tested and sending emails|KITS|☐|Resend API connected|
|Results portal tested with sample data (O/L, A/L)|Examinations Office + KITS|☐|Secure, no PII leakage|
|404 page tested and styled|KITS|☐|Includes crest animation|
|Sitemap.xml generated and accessible|KITS|☐|`/sitemap.xml` returns 200|
|`robots.txt` allows indexing|KITS|☐|`Allow: /`|
|No console errors or warnings|KITS|☐|Chrome DevTools|
|All internal links work (no broken links)|KITS|☐|Crawl with `next/link` checker|
|Admin panel authentication works (Google OAuth, `@cwwkcc.lk`)|KITS|☐|Auth.js configured; break-glass account TOTP-protected (not optional for that one account)|
|Database backups configured (daily `pg_dump` to R2)|KITS|☐|Cron job tested|

---

## 3. Security & Privacy

|Item|Owner|Status|Notes|
|---|---|---|---|
|HTTPS enforced, HSTS configured|KITS|☐|Caddy auto HTTPS|
|Environment variables set (no secrets in client)|KITS|☐|`NEXT_PUBLIC_*` only for public|
|Database credentials secured (not in code)|KITS|☐|Via `.env` on server|
|Cookie consent banner implemented and functional|KITS|☐|`CookieConsentBanner` component|
|No PII sent to analytics|KITS|☐|Verify both the primary collector's events and the secondary Umami events|
|Form submissions rate‑limited|KITS|☐|5 per hour per IP|
|Break-glass admin password hashed with bcrypt (no other admin has a password)|KITS|☐|Verified|
|R2 bucket access restricted (private by default, presigned URLs)|KITS|☐|No public listing|

---

## 4. Editorial & Access

|Item|Owner|Status|Notes|
|---|---|---|---|
|Content editors trained on admin panel|KITS|☐|Minimum 2 editors|
|Admin authentication working (Google OAuth, `@cwwkcc.lk`)|KITS|☐|Auth.js configured|
|KITS members have access to GitHub and Hetzner server|KITS Lead|☐|SSH keys and repository access|
|Admin panel preview mode functional|KITS|☐|Draft content visible to editors only|

---

## 5. Launch Operations

|Item|Owner|Status|Notes|
|---|---|---|---|
|DNS configured (cwwkcc.lk, admin.cwwkcc.lk – optional subdomain)|Administration / ISP|☐|Point A record to Hetzner VPS IP|
|Caddy server configured and running|KITS|☐|Reverse proxy, SSL auto-renewal|
|Analytics configured and events firing (primary collector + secondary Umami)|KITS|☐|Verify in both dashboards|
|Uptime monitoring active (UptimeRobot)|KITS|☐|At least 5 endpoints|
|Error tracking (Sentry – optional) configured|KITS|☐|Test error reported|
|Backup of database (PostgreSQL) verified|KITS|☐|Test restore to staging|
|Backup of R2 assets (optional)|KITS|☐|Replication enabled|
|Post‑launch support rota defined|KITS Lead|☐|On‑call for first 72 hours|

---

## 6. Post‑Launch (within 1 week)

|Item|Owner|Status|Notes|
|---|---|---|---|
|Submit sitemap to Google Search Console|KITS|☐||
|Monitor Core Web Vitals in Search Console|KITS|☐|Address issues|
|Collect user feedback (via contact form)|Administration|☐|Create feedback loop|
|Run first content audit (broken links, outdated info)|Editorial Team|☐||

---

## Sign‑Off

All items checked and approved by:

|Role|Name|Signature|Date|
|---|---|---|---|
|Principal||||
|Head of KITS||||
|Lead Developer||||
|Head of Administration||||

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_