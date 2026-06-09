## Overview

This document defines editorial standards, writing guidelines, publishing workflows, and archiving rules for all content on Nexus. It applies to all content types: pages, news articles, society profiles, facility descriptions, and downloadable documents.

---

## Editorial Roles & Responsibilities

| Role | Responsibilities | Content types |
|------|------------------|----------------|
| **Principal** | Final approval for major announcements, vision statements | Homepage principal message, about page, institutional statements |
| **Head of Administration** | Approve staff profiles, facility descriptions, contact details | Staff, facilities, contact |
| **Head of Academics** | Approve academic content (streams, results, performance) | Academics pages |
| **Editorial Team (3‑5 members)** | Write, edit, publish news articles, events, announcements | News, events |
| **Society Advisor** | Approve society content, leadership changes | Society pages |
| **Media Unit** | Upload gallery albums, manage photography | Gallery |
| **KITS Lead** | Technical content, system announcements | Any |
| **Student Contributor** | Propose content (requires approval) | News, society updates (draft only) |

---

## Writing Tone & Style

### Voice

- **Formal but welcoming** – not academic, not casual. Write as a respected headmaster would speak to parents.
- **Educational** – inform and guide, never condescend.
- **Heritage‑focused** – proud of 153 years, but not arrogant.

### Tone examples

| Acceptable | Not acceptable |
|------------|----------------|
| "We are pleased to announce…" | "We're super excited to tell you…" |
| "Students achieved outstanding results." | "Our brilliant students smashed it again!" |
| "Dr. Kannangara’s vision changed the nation." | "Dr. Kannangara was a total legend." |
| "Please submit your application by 30 June." | "You better apply soon before it's too late!" |

### What to avoid

- Excessive exclamation marks (use one per article maximum).
- All‑caps titles or headings.
- Marketing jargon ("world‑class", "cutting‑edge", "unique").
- Corporate language ("leverage", "synergy", "optimise").
- Overly emotional pleas ("Don't miss out on this life‑changing opportunity!").

---

## Headline Conventions

| Content type | Max length | Example |
|--------------|------------|---------|
| News article title | 12 words / 80 characters | "KITS Wins Gold at SLIIT Codefest 2024" |
| Society name | 5 words / 50 characters | "Kannangara ICT Society" |
| Event title | 10 words / 70 characters | "Annual Prize Giving 2026" |
| Facility name | 5 words / 40 characters | "Science Laboratories" |

**Rule:** Never use clickbait or sensational headlines. Headlines must accurately reflect content.

---

## Image Standards

- All images must have meaningful `alt` text (max 120 characters). Decorative images may have empty `alt`.
- No text overlays on images (use caption component instead).
- Faces of students under 18 require parental consent (separate policy). Default to group shots or use blur faces if required.
- Image editing: crop, colour correction, exposure adjustment allowed. No heavy filters, artificial HDR, or added text.

**Alt text examples:**

| Good | Bad |
|------|-----|
| "Students conducting chemistry experiment in lab" | "Lab" |
| "Principal Mr. Rajapaksa addressing assembly" | "Principal" |
| "Aerial view of school main building and sports ground" | "School" |

---

## Publishing Workflow (Custom Admin Panel)

### News Articles

1. **Draft** – Author writes in the admin panel (`/admin`), saves as draft.
2. **Review** – Editorial team member reviews using the admin preview mode.
3. **Fact‑check** – Verify dates, names, quotes.
4. **Approve** – Head of editorial or administration approves via admin panel.
5. **Schedule** – Set `publishedAt` (future dates allowed).
6. **Publish** – Automatically published at scheduled time (cron job or server action).

**Slug:** Auto‑generated from title, can be overridden. Must be unique.

### Society Pages

1. **Proposal** – Student committee creates draft in admin panel.
2. **Advisor review** – Society advisor reviews.
3. **Approval** – Head of Administration or KITS Lead.
4. **Publish** – Immediate.

### Staff Profiles

- Only administration editors can create/update.
- Changes require photo upload (processed via Sharp to WebP) and title/portfolio verification.
- Published immediately after review.

### Gallery Albums

- Media unit uploads photos via admin panel (max 100 per album).
- Photos are automatically optimised (WebP, resized to max 1200px) before storage in R2.
- Albums must have cover image, title, year, category.
- Published immediately.

---

## Archiving Rules

| Content type | Archive after | Action |
|--------------|---------------|--------|
| News articles | 2 years | Remove from feeds, keep accessible via direct URL and archive page. |
| Events | 30 days after event date | Remove from feeds, move to past events section. |
| Staff profiles | When staff leaves | Keep in archive (hidden from public unless marked as alumnus). |
| Gallery albums | 5 years | Keep, but mark as archival. |
| Results | After next exam cycle | Move to archive section, keep PDFs. |

**Deletion:** Content is never hard‑deleted. Instead, set `status: "archived"` in the database. Archived content is not shown in listings but can be accessed via direct URL (for news) or admin panel.

---

## Fact‑Checking Process

Before publishing any factual claim:

| Claim type | Verifier |
|-------------|----------|
| Historical dates (e.g., founding year) | School archives / Administration |
| Examination results | Examinations Office |
| Student achievements | Teacher in charge / Sport unit |
| Event dates | Event organiser |
| Dr. Kannangara quotes | Verified sources (books, recorded speeches) |

**Unverified claims:** Must be marked as "preliminary" or "awaiting confirmation". Do not publish.

---

## SEO Content Standards

- Each page must have unique meta title and description (see [SEO & Search Strategy](./SEO%20%26%20Search%20Strategy.md)).
- Headings must be hierarchical (H1 → H2 → H3). Do not skip levels.
- Avoid duplicate content across pages (e.g., same text on home and about).
- Internal links: use descriptive anchor text ("Read more about our science stream" not "Click here").

---

## Publishing Calendar

| Content type | Frequency | Lead time |
|--------------|-----------|-----------|
| News (major) | As needed | 1 day review |
| News (routine) | Weekly (Monday) | 2 days |
| Events | 2 weeks before | 1 week |
| Results | Same day as release | 1 hour (pre‑prepared) |
| Staff profiles | As changes occur | 1 day |
| Gallery albums | Monthly | 3 days |

---

## Versioning & Revisions

- The admin panel automatically tracks revisions (stored in a `revisions` table).
- Every change must have a comment explaining the reason (required field if `editedBy` not equal to original author).
- Major content changes (e.g., mission statement) require principal approval and are logged in a separate change log.

---

## Content Removal & Unpublishing

To remove content (without deleting):

1. Change status to `archived` in admin panel.
2. Add reason in `archiveReason` field.
3. For sensitive content (e.g., incorrect exam results), add `redirectTo` URL.

Archived content is not indexed (noindex) and excluded from sitemap.

---

## Sponsored / External Content

- Nexus does not accept paid advertising.
- External links are allowed only to educational resources, partner institutions, or government bodies.
- All external links must open in new tab (`target="_blank"`) with `rel="noopener noreferrer"`.

---

## Editorial Calendar Template

| Week | Planned content | Author | Reviewer | Status |
|------|----------------|--------|----------|--------|
| 1 | Principal's message for new term | Administration | Principal | Draft |
| 2 | Science exhibition announcement | Science society | Editorial team | Review |
| 3 | Exam results release | Examinations Office | Administration | Pre‑prepared |

Maintained in shared drive or Trello.

---

## Training & Onboarding

New content editors must:

1. Read this document.
2. Complete a tutorial on using the admin panel (recorded video + written guide).
3. Write a test article (not published) and submit for review.
4. Receive approval from KITS Lead or editorial head.

---

## Related Documents

- [SEO & Search Strategy](./SEO%20%26%20Search%20Strategy.md)
- [Assets Inventory](./Assets%20Inventory.md)

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*