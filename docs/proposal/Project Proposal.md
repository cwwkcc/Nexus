# Nexus – The Digital Institution of C.W.W. Kannangara Central College

**To:** The Principal, C.W.W. Kannangara Central College, Mathugama  
**From:** Kannangara ICT Society (KITS)  
**Date:** June 2026  
**Subject:** Implementation of the "Nexus" Digital Web Platform

---

## 1. Executive Summary

C.W.W. Kannangara Central College – Sri Lanka's first Central College, founded in 1873 – deserves a modern, official digital presence that reflects its heritage, scale, and educational excellence.

**Nexus** is a proposal to build a complete, professional, and sustainable digital institution for KCC. It will encompass:

- A polished public website (`cwwkcc.lk`) covering school information, news, society hub, gallery, admissions, and contact tools.
- A secure, custom admin panel enabling staff and KITS editors to update content without technical knowledge.
- A robust technical foundation – a design system, database, and image storage architecture – built to serve the school for the next decade.
- An official, managed social media presence across key platforms.

Nexus will be designed and developed entirely **by the Kannangara ICT Society (KITS)** under staff guidance, using industry-standard open-source tools. There are no recurring software licensing fees. The only operational cost is hosting and domain renewal at approximately **LKR 2,500 per month**.

---

## 2. Project Objectives

1. **Modernize** the school's digital presence to reflect its 153-year heritage and prestige.
2. **Improve communication** with parents and students through timely news, announcements, and downloadable resources.
3. **Centralize institutional information** into a single, authoritative platform.
4. **Increase visibility** of student achievements, school activities, and extracurricular opportunities.
5. **Establish a scalable, sustainable foundation** for future digital services.

---

## 3. The Case for Change

- Fragmented visual identity and inconsistent user experience.
- Poor mobile performance and accessibility.
- Security risks of unmaintained legacy systems.
- Administrative friction – updates require technical intervention.

Nexus solves all these with a modern, secure, and easy-to-manage platform.

---

## 4. Proposed Solution: Nexus

**Design Philosophy:** "Stepping Into the Forest" – light‑dominant, glass‑based UI, reflecting KCC's natural environment.

**Core Features (Phase 1 – Launch):**

| Feature | Description |
|---------|-------------|
| Public Website | Home, About, Academics, Admissions, News, Societies, Gallery, Facilities, Extracurriculars, Contact. Fully responsive. |
| News & Announcements | Editors publish articles, events, achievements via custom admin panel. |
| Admissions Hub | Process steps, key dates, requirements, downloadable forms, enquiry form. |
| Admin Panel | Custom dashboard for staff to manage all content – no coding required. |
| Design System | Unified colours, typography, components (see Foundations.md). |
| Privacy Analytics | Self-hosted Umami – no personal data collected. |

> **Note:** The exam results portal is excluded from Phase 1; it will be assessed separately in a future phase.

---

## 5. Expected Benefits

- Improved communication with parents and students.
- Enhanced school reputation for prospective families.
- Increased student engagement through society and achievement visibility.
- Reduced administrative burden – centralised, self-service content.
- Long-term sustainability – full school ownership of code and infrastructure.

---

## 6. Technical Approach

Nexus uses modern open-source technologies, all self-hosted on a single **Hetzner VPS** (no cloud vendor lock-in).

| Component | Technology | Purpose |
|-----------|------------|---------|
| Web framework | Next.js (App Router) | Fast, SEO-friendly, supports Sinhala/Tamil. |
| Admin panel | Custom Next.js app | Tailored exactly to KCC workflows. |
| Database | PostgreSQL | News, pages, society data, user accounts. |
| File storage | Cloudflare R2 | Images, PDFs – 10GB free, zero egress fees. |
| Web server | Caddy | Reverse proxy, automatic HTTPS (Let's Encrypt). |
| Email | Resend | Contact form notifications (free tier, 3k/month). |
| Analytics | Umami (self-hosted) | Privacy-first, runs on same VPS. |
| Error tracking | Sentry (free tier) | Optional – can be omitted. |

All code is stored in a **school-owned GitHub repository**. KITS members are trained to maintain the system. Full documentation is provided.

**Accessibility & Performance:** WCAG 2.1 Level AA, Lighthouse score ≥90 on mobile.

---

## 7. Governance, Ownership & Content Policy

| Role | Responsibility |
|------|----------------|
| Technical Ownership | KITS – development, deployment, maintenance. |
| Content Ownership | School administration and designated staff editors. |
| Institutional Ownership | School retains full ownership of GitHub repo and all code. |
| Staff Advisor | Mrs. Tharindrie Perera, Teacher-in-Charge (ICT). |

**Content Approval:** All content remains subject to school policies. The Principal or any designated staff may request modification or removal at any time.

**Long-Term Continuity:** Full technical documentation ensures future KITS members or external developers can maintain the platform. No vendor lock-in.

**Data Privacy:** No student records or PII are stored without separate approval. Student photos published only with consent.

---

## 8. Development Team

| Role | Responsibility |
|------|----------------|
| Project Lead / Lead Developer (KITS) | Full-stack development, architecture, deployment. |
| Principal | Final institutional approval. |
| Staff Advisor | Administration liaison, content verification. |
| Content Editors (teachers/KITS) | Writing news, updating pages. |
| Media Unit | Supplying photographs. |
| Student Data Entry Assistants (optional) | Supporting data population under supervision. |

---

## 9. Budget & Resources

| Item | Cost | Notes |
|------|------|-------|
| Domain (`cwwkcc.lk`) | ≈ LKR 1,000/year | Renewal |
| Hetzner VPS (CX22) | ≈ LKR 1,500/month | 2 vCPU, 4GB RAM, 40GB SSD |
| Cloudflare R2 | Free (10GB) | Object storage |
| Resend (email) | Free (3k/month) | Transactional emails |
| SSL Certificate | Free (Let's Encrypt) | Via Caddy |
| Umami (self-hosted) | Free | On same VPS |
| **Total Monthly** | **≈ LKR 2,500** | No additional licences |
| **One-Time Setup** | **Zero** | All tools open source |

> **Commercial equivalent:** A comparable platform would cost LKR 800,000–2,500,000 to build plus LKR 15,000–50,000/month maintenance. Nexus delivers at zero development cost and minimal monthly expense.

---

## 10. Phased Implementation Roadmap

| Phase | Period | Deliverables |
|-------|--------|---------------|
| Approvals & Pre-Production | June – July 2026 | Formal approvals, asset inventory, social media setup, dev environment. |
| Core Development | July – September 2026 | Design system, admin dashboard, CMS, all public pages. |
| Content Collection & Data Entry | September – October 2026 | Photography, historical photos, society data, staff info, alumni content. |
| Testing, Population & Training | October 2026 | Accessibility testing, performance tuning, content population, editor training. |
| **Public Launch** | **Before November 2026** | Live deployment at `cwwkcc.lk`. |

Monthly progress reviews with Staff Advisor; demo to Principal at milestones.

---

## 11. Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|-------------|
| Senior students graduate | Medium | Documentation + junior training before handover. |
| Content not ready | Medium | Structured collection period Sep–Oct. |
| Hosting downtime | Low | Reliable VPS + UptimeRobot alerts. |
| Security incident | Very Low | HTTPS, env vars, input validation, regular updates. |

---

## 12. Success Criteria

1. Public website live at `cwwkcc.lk`, meets WCAG 2.1 AA.
2. At least two staff editors can independently publish a news article.
3. All existing student societies have a dedicated page.
4. School identity (history, motto, leadership) clearly presented.
5. Site loads efficiently on mobile networks (Lighthouse ≥90).

---

## 13. Approvals & Permissions

**Required Approvals:**
1. Approval to proceed with development and launch.
2. Monthly operational budget ≈ LKR 2,500.
3. Appointment of Mrs. Tharindrie Perera as Staff Advisor.
4. Recognition of Nexus as school's primary digital platform.
5. GitHub repository and code as school property.

**Requested Permissions:**
- Photograph school premises, events, Principal, Vice Principals.
- Collect historical photos from alumni.
- Establish official social media accounts (Facebook, Instagram, YouTube, LinkedIn, WhatsApp Channel).
- Use school name, crest, motto, branding.
- Collect and publish institutional data, society details.
- Brief Principal's Statement for website.
- Assign student data entry assistants (supervised).

> Student privacy: No personal data published without consent and school policy.

---

## 14. Next Steps (Upon Approval)

1. Principal formally approves proposal.
2. Staff Advisor appointed.
3. Social media accounts created.
4. Development environment configured; work continues on school-owned repository.
5. Asset inventory finalised; photography scheduled.
6. Monthly demos to Staff Advisor.
7. Beta presented to Principal.
8. Public launch before November 2026.

---

## 15. Development Progress

Active development is underway. The design system, information architecture, page specifications, and technical documentation are complete. Over 100 UI components built. GitHub repository available for review.

---

## 16. Closing Statement

> *Nexus is more than a website. It is the digital gateway to C.W.W. Kannangara Central College – preserving 153 years of heritage while building the technological foundation for the next generation.*

---

## 17. Approval

| | |
|---|---|
| **Approved By** | |
| Principal | C.W.W. Kannangara Central College |
| **Signature** | _____________________________ |
| **Date** | _____________________________ |

| | |
|---|---|
| **Noted By** | |
| Staff Advisor | Mrs. Tharindrie Perera, Teacher-in-Charge (ICT) |
| **Signature** | _____________________________ |
| **Date** | _____________________________ |

---

## Appendices

- **Appendix A:** Technical Architecture Overview (self-hosted Hetzner stack)
- **Appendix B:** Design System Summary (matches Foundations & Tokens)
- **Appendix C:** Asset Inventory

---

**Prepared by:** Kannangara ICT Society (KITS), C.W.W. Kannangara Central College, Mathugama  
**Date:** June 2026  

*"Wisdom is All Wealth" – Est. 1873*