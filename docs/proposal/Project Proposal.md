**To:** The Principal, C.W.W. Kannangara Central College, Mathugama **From:** Kannangara ICT Society (KITS) **Date:** July 2026 **Subject:** Implementation of the "Nexus" Digital Institution

---

## 1. Executive Summary

Nexus will become the school's official digital institution: a complete, unified digital face that improves communication, strengthens public reputation, preserves school history, supports student activities, and provides a sustainable foundation for future digital services.

C.W.W. Kannangara Central College – founded in 1873 and recognised in 1941 as Sri Lanka's first Central College – deserves a modern, official digital presence that reflects its heritage, scale, and educational excellence.

**Nexus** is a proposal to build the school's permanent digital institution. It will encompass:

- A fully trilingual public website (`cwwkcc.lk`, English / Sinhala / Tamil) covering school information, news, society hub, gallery, admissions, and contact tools.
- A secure, custom admin panel enabling staff and KITS editors to update content without technical knowledge.
- Official, professionally managed social media presence across Facebook, Instagram, YouTube, LinkedIn, and WhatsApp Channel.
- A robust technical foundation – a design system, database, and image storage architecture – built to serve the school for the next decade.

Nexus will be designed and developed entirely **by the Kannangara ICT Society (KITS)** under staff guidance, using industry-standard open-source tools. There are no recurring software licensing fees. The only operational cost is hosting and domain renewal at approximately **LKR 10,000–12,000 per month**.

---

## 2. Project Objectives

1. **Modernize** the school's digital presence to reflect its 153-year heritage and prestige.
2. **Improve communication** with parents and students through timely news, announcements, and downloadable resources.
3. **Centralize institutional information** into a single, authoritative platform.
4. **Increase visibility** of student achievements, school activities, and extracurricular opportunities.
5. **Establish a scalable, sustainable foundation** for future digital services.

---

## 3. The Case for Change

- The school’s digital presence does not fully reflect its heritage, reputation, and educational excellence.
- Information is distributed across multiple platforms, making it difficult to maintain a single authoritative source.
- Existing digital channels lack a consistent visual identity and institutional branding.
- Content updates depend on technical assistance, creating unnecessary administrative overhead.
- The school’s achievements, history, societies, and activities are not showcased through a unified digital platform.
- Parents, students, alumni, and prospective families increasingly expect accurate, accessible, and mobile-friendly online information.
- A modern, secure, and sustainable digital platform is essential to strengthen communication, preserve institutional heritage, and support the school’s long-term digital growth.

Nexus solves all these with a modern, secure, and easy-to-manage digital institution.

---

### Why Now?

The school already possesses the student talent, technical planning, and organisational structure required to execute this project successfully. The majority of the research, architecture design, component development, and planning work has already been completed by KITS at no cost to the school. Approval now allows that momentum to be converted into a permanent institutional asset.

---

## 4. Proposed Solution: Nexus

**Design Philosophy:** "Royal Institution" — warm parchment surfaces, forest green identity, gold accents, and deliberate motion. Every design decision reflects the dignity of a school that has stood since 1873.

**Core Components (Launch Scope):**

| Component                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Public Website**        | Home, About, Administration, Academics, Admissions, News, School Calendar, Societies, Gallery, Facilities, Extracurriculars, Alumni, Digital Archive, Achievement Database, Contact. Fully responsive, available in English, Sinhala, and Tamil.                                                                                                                                                                                                                                                                     |
| **News & Announcements**  | Editors publish articles and achievements via custom admin panel.                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **School Calendar**       | One calendar is the single source of every date on the site — exam dates, holidays, sports fixtures, cultural events, staff meetings. Every entry starts the same way: pick a date, a title, a category. The editor then chooses whether that's the whole entry, or whether it should also get a full public listing — a description, photo, venue, and registration link — which is what turns a calendar date into a page visitors can open. No date-bearing item reaches the public site through any other route. |
| **Admissions Hub**        | Process steps, key dates, requirements, downloadable forms, enquiry form.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Admin Panel**           | Custom dashboard for staff to manage all content – no coding required.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Design System**         | Unified colours, typography, components, and motion language.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Privacy Analytics**     | Self-hosted Umami – no personal data collected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Official Social Media** | Managed presence on Facebook, Instagram, YouTube, LinkedIn, and WhatsApp Channel. Where unofficial accounts already exist, KITS will coordinate the transfer of administration to bring them under school oversight and align them with the school's official visual identity.                                                                                                                                                                                                                                       |
| **Technical Foundation**  | Infrastructure, database, and architecture that allows the school to grow its digital presence for the next decade.                                                                                                                                                                                                                                                                                                                                                                                                  |

> **Scope note:** The table above describes what stakeholders will see and interact with at launch. It is not the full technical scope. The complete engineering build — including infrastructure, design system internals, accessibility, performance, and administrative tooling — is defined in `Feature Registry.md`, the single authoritative list of all **200 features** Nexus will include. Approving this proposal approves that full scope.

> **Scope note (Social Media):** Social media is a core component of Nexus, not an add-on. Official account creation, management, and the coordinated transfer of any existing unofficial accounts (where appropriate and approved by the school) are approved as part of this proposal (see Section 13.3). Social media _management_ is an operational activity and is not listed in the Feature Registry, which covers the web platform only.

---

## 5. Expected Benefits

- Improved communication with parents and students across web and social media.
- Enhanced school reputation for prospective families.
- Increased student engagement through society and achievement visibility.
- Reduced administrative burden – centralised, self-service content.
- Long-term sustainability – full school ownership of code and infrastructure.
- Consistent, professional digital identity across all platforms.

### 5.1 Educational Value

Nexus is not only a digital platform for the school; it is also a long-term educational initiative. Through participation in Nexus, members of the Kannangara ICT Society gain practical experience in software engineering, cybersecurity, user experience design, database systems, technical documentation, project management, accessibility, and collaborative development practices used throughout the modern technology industry. This transforms Nexus from a simple website project into a real-world learning platform that directly supports the school's mission of preparing students for higher education and professional careers.

---

## 6. Technical Approach

Nexus uses modern open-source technologies, all self-hosted on a single **Hetzner VPS** (no cloud vendor lock-in). The table below is included for transparency; full specifications are in Appendix A. In plain terms: everything runs on infrastructure the school fully owns, with no recurring software licence fees.

| Component      | Technology                      | Purpose                                                                                                                                                                                            |
| -------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Web framework  | Next.js                         | Fast, SEO-friendly, full trilingual routing (English/Sinhala/Tamil).                                                                                                                               |
| Admin panel    | Custom-built                    | Tailored exactly to KCC workflows.                                                                                                                                                                 |
| Staff sign-in  | Google Workspace (`@cwwkcc.lk`) | Staff sign in with their existing school Google account; no separate password system to maintain. **Requires Google Workspace admin cooperation to configure** — see Section 13.4. See Appendix A. |
| Database       | PostgreSQL                      | News, pages, society data, user accounts.                                                                                                                                                          |
| File storage   | Cloudflare R2                   | Images, PDFs – 10 GB free, zero egress fees.                                                                                                                                                       |
| Web server     | Caddy                           | Reverse proxy, automatic HTTPS (Let's Encrypt).                                                                                                                                                    |
| Email          | Resend                          | Contact form notifications (free tier, 3k/month).                                                                                                                                                  |
| Analytics      | Umami (self-hosted)             | Privacy-first, runs on same VPS.                                                                                                                                                                   |
| Error tracking | Sentry (free tier)              | Optional – can be omitted.                                                                                                                                                                         |

All code is stored in a **school-owned GitHub repository**. KITS members are trained to maintain the system. Full documentation is provided.

**Accessibility & Performance:** WCAG 2.1 Level AA, Lighthouse score ≥ 90 on mobile.

---

## 7. Governance, Ownership & Content Policy

| Role                    | Responsibility                                                                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technical Stewardship   | KITS – development, deployment, maintenance. Operational responsibility only; the school holds legal ownership (see Institutional Ownership, below, and Section 13.2). |
| Content Ownership       | School administration and designated staff editors.                                                                                                                    |
| Institutional Ownership | School retains full ownership of GitHub repo and all code.                                                                                                             |
| Staff Advisor           | Mrs. Tharindrie Perera, Teacher-in-Charge (ICT).                                                                                                                       |

**Content Approval:** All content remains subject to school policies. The Principal or any designated staff may request modification or removal at any time.

**Long-Term Continuity:** Full technical documentation ensures future KITS members or external developers can maintain the platform. No vendor lock-in.

**Data Privacy:** No student records or PII are stored without separate approval. Student photos published only with consent.

---

## 8. Development Team

| Role                                     | Responsibility                                    |
| ---------------------------------------- | ------------------------------------------------- |
| Project Lead / Lead Developer (KITS)     | Full-stack development, architecture, deployment. |
| Principal                                | Final institutional approval.                     |
| Staff Advisor                            | Administration liaison, content verification.     |
| Content Editors (teachers/KITS)          | Writing news, updating pages.                     |
| Media Unit                               | Supplying photographs.                            |
| Student Data Entry Assistants (optional) | Supporting data population under supervision.     |

---

## 9. Budget & Resources

The school receives the complete Nexus platform at **zero development cost**. The only recurring expenses are the infrastructure and services required to operate it reliably.

| Item                          |              Monthly Cost | What It Provides                                                                                                                                  |
| ----------------------------- | ------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hetzner CPX22 Server          |               ≈ LKR 7,450 | Main application server running the website, admin panel, database, and supporting services (2 vCPU, 4 GB RAM, 80 GB NVMe SSD).                   |
| Hetzner Storage Box (1 TB)    |               ≈ LKR 1,550 | Secure off-site backup storage for encrypted database backups, media backups, and disaster recovery.                                              |
| Cloudflare R2 (Media Storage) |             ≈ LKR 0–1,200 | Storage for gallery photos, staff portraits, documents, and other media assets. Initial usage is expected to remain within or near the free tier. |
| Domain (`cwwkcc.lk`)          |                 ≈ LKR 533 | Averaged over a 5-year renewal period (≈ LKR 32,000 ÷ 60 months).                                                                                 |
| Cloudflare CDN & Security     |             ≈ LKR 0–2,000 | Global CDN, DDoS protection, caching, and SSL. Free plan is sufficient at launch; Pro plan is optional.                                           |
| Buffer / Miscellaneous        |                 ≈ LKR 500 | Small reserve for minor renewals, operational tools, or future infrastructure adjustments.                                                        |
| Resend (Email)                |                      Free | Contact form notifications and transactional email delivery (free tier).                                                                          |
| SSL Certificates              |                      Free | Automatic HTTPS certificates via Let's Encrypt, managed by Caddy.                                                                                 |
| Umami Analytics               |                      Free | Self-hosted privacy-friendly analytics running on the same VPS.                                                                                   |
| **Total Monthly (Expected)**  |   **≈ LKR 10,000–12,000** | Typical operating cost under projected usage.                                                                                                     |
| **Total Annual Cost**         | **≈ LKR 120,000–144,000** | Expected yearly infrastructure expenditure.                                                                                                       |
| **One-Time Setup Cost**       |                 **LKR 0** | No software licence fees or commercial development costs.                                                                                         |

> **Commercial equivalent:** The software itself represents hundreds of hours of student engineering effort. A comparable custom-built platform would typically cost between LKR 800,000 and 2,500,000 to commission commercially. Through KITS, the school receives this development at no cost and pays only the infrastructure required to operate it.

> **Value proposition:** For approximately **LKR 10,000–12,000 per month**, the school gains a modern trilingual digital institution serving over **5,000 students, staff, parents, prospective applicants, and alumni worldwide**, while retaining full ownership of its software, data, and infrastructure.

### Additional Operational Dependencies (No Current Cost)

The following services are part of the operational stack and currently operate within their free tiers:

| Service                   | Purpose                                                 |
| ------------------------- | ------------------------------------------------------- |
| GitHub                    | School-owned source code repository and version control |
| GitHub Actions            | Automated testing, building, and deployment pipeline    |
| GitHub Container Registry | Docker image hosting for deployments                    |
| Sentry (Optional)         | Error monitoring and diagnostics                        |

These services currently carry no recurring cost but depend on the continued availability of their respective free tiers.

---

## 10. Phased Implementation Roadmap

Preliminary research, architecture design, component development, and technical planning have been completed internally by KITS, at no cost to the school. The table below shows that preparation work alongside what comes next — full task-level detail is in `Engineering Roadmap.md`.

| Stage                                  | Status / Period              | What it delivers                                                                                                          |
| -------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Research & planning                    | Complete (internal, no cost) | Project scope, site map, technology choices, this proposal.                                                               |
| Developer workspace setup              | Complete (internal, no cost) | The automated build and testing pipeline every other stage relies on.                                                     |
| Visual identity & design system        | Complete (internal, no cost) | Colours, typography, spacing, and motion — the consistent "look" of the school's brand online.                            |
| Reusable page components               | Complete (internal, no cost) | 100+ building blocks (cards, forms, navigation, etc.) used to assemble every page.                                        |
| Reliability & trilingual foundation    | Complete (internal, no cost) | Safeguards against crashes/broken pages; the English/Sinhala/Tamil framework built in from the start.                     |
| **Principal presentation & approval**  | **July 2026 — now**          | This proposal: formal mandate to proceed, plus administration's cooperation on content, photography, and alumni outreach. |
| Database & content infrastructure      | June – July 2026             | Secure database and content-management infrastructure; staff sign-in via existing school Google accounts.                 |
| Admin Panel                            | July 2026                    | Staff dashboard for managing News, Staff, Societies, Calendar & Events, Gallery, and Media — no coding required.          |
| Public pages go live with real content | July – August 2026           | Every public page connected to real content.                                                                              |
| Content Collection & Data Entry        | September – October 2026     | Photography, historical photos, society data, staff info, alumni content — runs alongside the work below.                 |
| Offline-friendly experience            | August 2026                  | Website stays usable on poor mobile connections; can be installed like an app.                                            |
| Search visibility                      | August – September 2026      | Optimisation so the school appears correctly in Google search results.                                                    |
| Hosting goes live                      | September 2026               | Hosting, automated backups, and uptime monitoring switched on.                                                            |
| Launch preparation                     | October 2026                 | Accessibility audit, performance tuning, content population, editor training.                                             |
| **Public Launch**                      | **Target: October 2026**     | Live deployment at `cwwkcc.lk`.                                                                                           |
| Stabilisation                          | November 2026                | First weeks of real usage — fix issues, close translation gaps, tune performance.                                         |
| Long-term handover                     | Ongoing                      | Documentation handover, next KITS generation onboarding.                                                                  |

Monthly progress reviews with Staff Advisor; demo to Principal at milestones.

---

## 11. Risk Assessment

| Risk                     | Likelihood | Mitigation                                          |
| ------------------------ | ---------- | --------------------------------------------------- |
| Senior students graduate | Medium     | Documentation + junior training before handover.    |
| Content not ready        | Medium     | Structured collection period Sep–Oct.               |
| Hosting downtime         | Low        | Reliable VPS + UptimeRobot alerts.                  |
| Security incident        | Very Low   | HTTPS, env vars, input validation, regular updates. |

---

## 12. Success Criteria

1. Public website live at `cwwkcc.lk`, meets WCAG 2.1 AA.
2. Full functionality in English, Sinhala, and Tamil at launch — not a partial or "infrastructure-only" rollout.
3. At least two staff editors can independently publish a news article.
4. All existing student societies have a dedicated page.
5. School identity (history, motto, leadership) clearly presented.
6. Site loads efficiently on mobile networks (Lighthouse ≥ 90).
7. Official social media accounts created and aligned with the school's visual identity.

---

## 13. Approvals & Permissions

This section defines exactly what the Principal's signature authorizes. It is split into four parts so there is no ambiguity later about what was approved, what the school owns, what KITS is permitted to do, and what KITS needs from the school in return.

### 13.1 Project Approval

The Principal is requested to approve:

- Nexus as the official digital institution of C.W.W. Kannangara Central College.
- Development and deployment of the Nexus platform under KITS supervision.
- A monthly operational budget of approximately **LKR 10,000–12,000** (hosting and domain renewal).
- Progression from the current preparation work into the remaining build stages described in Section 10.
- Recognition of Nexus as the school's primary digital presence upon launch.
- Authorization for future approved KITS members to be granted the same infrastructure and administrative access as the current team, under continued school and Staff Advisor supervision, as part of the documented handover process (see Section 7, Long-Term Continuity, and Section 11, Risk Assessment).

### 13.2 Institutional Ownership

To avoid any future dispute, the school retains full ownership of:

- The domain name (`cwwkcc.lk`).
- The source code, held in a school-owned GitHub repository.
- All design assets and design system.
- All content published on the platform.
- The database and all data it contains.
- All technical and operational documentation.
- Any social media accounts created or taken over under Nexus.

KITS acts solely as developer and maintainer on behalf of the school — never as owner.

### 13.3 Operational Permissions

Authorization for KITS to:

**Branding**

- Use the school name, crest, motto, and approved school colours and identity assets.

**Photography & Media**

- Photograph school buildings, facilities, events, official ceremonies, and staff for institutional pages (including the Principal and Vice Principals).

**Content Collection**

- Collect society, club, and sports information; school history materials; historical photographs; and achievement records.

**Communication**

- Contact alumni and the Old Boys'/Old Girls' Association for historical materials, and coordinate with teachers regarding content.

**Digital Platforms**

- Create and manage official school accounts on Facebook, Instagram, YouTube, LinkedIn, and WhatsApp Channel, subject to school oversight.
- Where any of these accounts already exist unofficially, coordinate the transfer of administration of existing school-related accounts where appropriate and approved by the school, and bring them up to the school's official visual identity and content standards.
- **Reason:** Most existing accounts predate any defined branding and do not follow one. Aligning them under Nexus ensures a consistent, professional digital face for the school.

**Publication Authority**

- Publish content on the public website and official social media accounts on the school's behalf, within the bounds of the Content Governance policy and subject to the approval workflow defined in Section 13.4.

> **Student privacy:** No personal data published without consent and school policy.

### 13.4 School Support Requirements

A project like this cannot succeed on KITS effort alone. The school is requested to provide:

**Administration**

- Appointment of Mrs. Tharindrie Perera as Staff Advisor.
- Designation of content approvers and an approval workflow for published content.

**Content**

- Principal's message, school history information, staff directory, academic information, society information, and existing photographs and media.

**Technical**

- Access to official domain registration and DNS management for `cwwkcc.lk`.
- Access to the school's Cloudflare account (or creation of one under school ownership) for DNS and R2 storage configuration.
- Access to official Google Workspace administration (for staff sign-in setup) — this requires admin cooperation to configure OAuth and is not available out of the box; see Section 6.
- Approval to create required email addresses.

**Operations**

- Permission to conduct photography sessions and to meet teachers for content collection.
- Permission to recruit student volunteers for data entry, under supervision.

---

## 14. Next Steps (Upon Approval)

1. Principal formally approves proposal.
2. Staff Advisor appointed.
3. Immediate content collection begins: Principal's biography and portrait, full staff list, seed news articles, crest in vector format, historical photographs, school anthem audio.
4. Social media accounts created (or coordinated transfer of existing unofficial accounts, where appropriate and approved).
5. Database and backend development begins on the existing school-owned repository.
6. Monthly demos to Staff Advisor as development continues.
7. Beta presented to Principal ahead of launch.
8. Public launch — target November 2026.

---

## 15. Development Progress

Preliminary research, architecture design, component development, and technical planning have been completed internally by KITS. No school resources or funding were required during these preparation stages. The platform's visual identity, content-management framework, and over 100 reusable interface components are built and ready to be connected to live school data following approval. Information architecture, page specifications, and technical documentation are complete. GitHub repository available for review.

---

## 16. Closing Statement

> _Nexus is more than a website. It is the digital gateway to C.W.W. Kannangara Central College – the school's complete digital institution, preserving 153 years of heritage while building the technological foundation for the next generation._

---

## 17. Recommendation

The Kannangara ICT Society respectfully recommends approval of Nexus. The project presents a low financial commitment, zero software licensing costs, full institutional ownership, significant educational value, and a long-term digital foundation for the school. Approval will allow development to proceed immediately toward a public launch targeted for October–November 2026.

---

## 18. Approval

By approving this proposal, the school authorizes the development and deployment of Nexus and grants the permissions listed in Section 13. Operational activities shall remain subject to school policies and administrative oversight.

| **Approved By** |     |
| --------------- | --- |
| Principal       |     |
| **Signature**   |     |
| **Date**        |     |

| **Noted By**  |                         |
| ------------- | ----------------------- |
| Staff Advisor | Mrs. Tharindrie Perera, |
| **Signature** |                         |
| **Date**      |                         |

---

## Appendices

- **Appendix A:** Technical Architecture Overview (self-hosted Hetzner stack)
- **Appendix B:** Design System Summary (matches Foundations & Tokens)
- **Appendix C:** Asset Inventory

---

**Prepared by:** Kannangara ICT Society (KITS), C.W.W. Kannangara Central College, Mathugama **Date:** July 2026

_"Wisdom is All Wealth" – Est. 1873_
