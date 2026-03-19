## C.W.W. Kannangara Central College — Official Website

### Complete Project Plan

**Repo:** `nexus` (school GitHub organization) 
**Domain:** cwwkcc.lk 
**Built by:** Kannangara ICT Society (KITS)

---

## What This Is

The current cwwkcc.lk is a WordPress site built by KITS students. Staff cannot update it without a developer. It breaks on mobile. It does not reflect what this school actually is — the first Central College in Sri Lanka, founded 1873, with 5,000+ students, a nationally competitive ICT society, and over a dozen active student societies.

Nexus replaces it entirely. It is the school's digital institution — public face, news engine, results portal, admissions funnel, societies hub, and feedback channel. It is managed by 2–3 KITS members through a visual admin panel. No developer needed for day-to-day content.

KITS gets its own completely separate website and repo. All other societies live within Nexus. Nexus links out to the KITS site.

---

## Repo Structure

```
nexus/
├── apps/
│   ├── web/                     ← public school website (Next.js 14)
│   └── admin/                   ← KITS admin dashboard (Next.js 14)
├── packages/
│   ├── ui/                      ← shared design system components
│   ├── db/                      ← Prisma schema + client
│   ├── api/                     ← tRPC routers
│   └── config/                  ← shared tailwind, eslint, tsconfig
├── infra/
│   ├── docker-compose.yml
│   └── Caddyfile
├── .github/
│   └── workflows/
│       └── deploy.yml
├── nx.json
└── pnpm-workspace.yaml
```

---

## Tech Stack

|Layer|Technology|Notes|
|---|---|---|
|Framework|Next.js 14 (App Router)|SSG/SSR, SEO, image optimization|
|Monorepo|Nx + pnpm|Consistent with Paideon|
|Styling|Tailwind CSS|Utility-first, consistent|
|CMS|Sanity.io|Free tier, best visual editing experience for staff|
|i18n|next-intl|English only at launch, infrastructure ready for SI + TA|
|API|tRPC|Type-safe, no REST boilerplate|
|Database|PostgreSQL|Separate DB on same Hetzner server as Paideon|
|ORM|Prisma|Consistent with Paideon|
|Auth|NextAuth.js|KITS admin login — migrates to Paideon SSO later|
|File Storage|Cloudflare R2|Free tier, files served from Cloudflare edge not server|
|Email|Resend|Free tier — admissions + feedback notifications|
|Hosting|Hetzner CX32|Shared with Paideon, separate Docker containers|
|Reverse Proxy|Caddy|Auto HTTPS, all domain routing|
|Containers|Docker Compose|Reproducible deployments|
|CI/CD|GitHub Actions|Auto deploy on push to main|

### Why Sanity over Payload CMS

Sanity gives better output for content editors. The visual editing experience is more polished, image handling is smoother, and real-time preview works better. For 2–3 KITS members managing news, gallery, and announcements, Sanity feels like a product rather than a developer tool. Free tier covers 3 users and unlimited content — sufficient permanently at this scale.

If a full self-hosted setup is ever needed, migration to Payload takes a weekend. Schema rebuild + content export/import. The application code barely changes.

### Why Cloudflare R2 over MinIO

R2 files are served from Cloudflare's global edge network — not your Hetzner box. Large file uploads (gallery photos, result PDFs) don't consume server CPU or RAM. Free tier: 10GB storage, 1M requests/month. More than enough at launch.

If self-hosted storage is ever needed, MinIO is S3-compatible and so is R2. Migration is one sync command and one environment variable change. Zero code changes.

---

## Design System

### Direction: Royal Institution

The school is 153 years old. It is the first Central College in Sri Lanka. Its physical identity — cream walls, green lawns, brass crests on blazers, natural light through tall windows — is warm, authoritative, and institutional.

This website is **light mode**. Not bright white. Warm cream. The difference matters.

Dark mode communicates tech startups, gaming, nightlife. Warm cream + forest green + gold communicates: we have been here for 150 years, and we will be here for 150 more.

### Color Palette

```
Base:           #F7F3EC   ← warm cream, aged paper — not white
Surface:        #EDE8DF   ← slightly darker cream for cards and sections
Forest Green:   #1A4A2E   ← school primary — deep, authoritative
Gold:           #C9973A   ← school accent — lamp flame, lotus, crest
Gold Light:     #E8B84B   ← highlights, hover states
Dark Text:      #1C1A16   ← near-black with warmth, not pure #000
Muted Text:     #5C5647   ← secondary text, captions
Border:         #D4C9B8   ← subtle, warm grey-cream
```

### Typography

```
Display / Hero:    Cormorant Garamond — aristocratic, literary, carries 150-year weight
Subheadings:       DM Serif Display — modern serif with personality
Body:              Source Serif 4 — readable, editorial, not clinical
Mono:              JetBrains Mono — only where needed (IDs, codes)
Sinhala (future):  Noto Serif Sinhala
Tamil (future):    Noto Serif Tamil
```

Never use Inter, Roboto, or any sans-serif as the primary face on this website. The typography must carry the weight of 153 years. Only serif does that.

### The Signature Visual Language

**The crest is the center of everything.** Every visual decision radiates outward from the school crest. The crest symbols appear as motifs throughout — the lamp flame as the gold accent color, the laurel as a subtle border pattern, the dharmachakra as a section divider. Nothing is decorative for its own sake. Everything references something real about this school.

**Texture and depth.** A subtle paper grain texture overlays the entire site — barely visible but felt. Cards are cream on cream, separated by shadow not color. The site should feel printed, not emitted from a screen.

**Typography as structure.** Large Cormorant numerals — "1873", "5000+", "200+" — serve as structural layout elements, not just data labels. The year the school was founded is part of the visual architecture.

---

## Signature Animations

Each animation is tied to something specific about this school. None of these can be replicated by another school without looking stolen.

### 1. The Crest Page Transition (signature)

Every page transition blooms from the school crest. A radial gold glow expands from the center of the screen — the crest shape briefly illuminated, like it is the source of everything — then fades as the new page arrives. The logo is the light. Not a lamp. Not a generic fade. The school crest itself.

### 2. The Orbital Hero

The school crest sits at the center of the hero — fully visible, completely still, proud. Around it, the carousel panels orbit like satellites, like the laurel wreath that circles the crest itself. The panels rotate around the logo rather than the logo being inside them. The crest never moves. The world moves around it.

On mouse move, the orbital speed slows slightly — the user can feel that they have influence over the motion without directly controlling it. On mobile, the orbit continues automatically at a slower pace.

The crest has a subtle parallax on its internal elements — the lion shifts slightly, the lotus rises, the dharmachakra wheels rotate slowly at their own pace.

### 3. The 1873 Ghost Layer

A giant near-invisible "1873" in Cormorant Garamond sits in the background of the hero section. Opacity: 0.04. It is not meant to be read. It is meant to be felt — the age of the institution literally present behind everything. On scroll it drifts upward at 0.3x speed. It fades in 2 seconds after load so it does not compete with the hero content.

### 4. The Achievement Ticker

A vertical stack of achievement cards rises continuously — looping — like a scoreboard that never stops. National wins, O/L pass rates, scholarship counts, university entrances. Cards materialize from the bottom, rise slowly, and dissolve at the top. Speed: slow enough to read each card completely. It communicates without anyone having to click anything.

### 5. CountUp on Scroll

Stats — 1873, 5,000+, 200+, 153 years — count up from zero when they enter the viewport. Paired with Cormorant Garamond numerals at large sizes, the numbers feel earned as they arrive rather than simply displayed.

### 6. Staggered Section Reveal

Every section's content enters with a staggered upward fade — heading first, then subheading, then body, then supporting elements. Delay: 80ms between each element. Fast enough to feel alive, slow enough to feel considered.

### 7. The Gold Shimmer on Crest

The gold elements of the crest — lamp, lotus, lion's mane — have a subtle shimmer animation. A thin highlight sweeps across them on a slow loop. Like light catching metal. The effect is barely there. Unmistakable once noticed.

### 8. Scroll-Linked Warmth

As the user scrolls down the homepage, the background very subtly warms — from #F7F3EC toward #F5EDD8. Like moving toward a light source. Reverses on scroll up. Implemented via scroll listener updating a CSS variable. The effect is subliminal — nobody will articulate it, but the page feels alive.

---

## Language Strategy

**English only at launch.**

next-intl is configured from day one with the routing structure:

```
cwwkcc.lk/en   ← default (cwwkcc.lk redirects here)
cwwkcc.lk/si   ← Sinhala (future)
cwwkcc.lk/ta   ← Tamil (future)
```

All UI strings go into `messages/en.json` from the start. Adding Sinhala and Tamil later means writing translation files — zero architecture changes.

Sanity content fields are structured for three languages from day one: `titleEn`, `titleSi`, `titleTa` — only En fields required at launch.

---

## Complete Page Map — 15 Public Pages

---

### 1. Homepage

The entire school in one scroll. Every section earns its place.

**Hero**

- School crest — centered, fully visible, static and proud
- Orbital carousel panels rotate around it (see animation section)
- Internal crest parallax on mouse move
- Gold shimmer on crest symbols
- "1873 Ghost" layer in background
- School name: C.W.W. Kannangara Central College
- Tagline: "Sri Lanka's First Central College — Est. 1873"
- Two CTAs: "Explore the School" · "Apply for Admissions"
- Paper grain texture

**Stats Strip**

- Four stats with CountUp: Founded 1873 · 5,000+ Students · 200+ Staff · 153 Years
- Large Cormorant Garamond numerals

**Principal's Message**

- Portrait, name, tenure
- Pull quote in Cormorant italic
- Short paragraph, link to full message on About page

**Latest News**

- Three cards from Sanity CMS
- Category badge, headline, date, excerpt
- "All News →"

**Academic Streams**

- Four cards: Science · Commerce · Arts · Technology
- Icon, one-line description, link to Academics page

**Life at KCC** _(the orbital carousel content, also presented as a section)_

- Photo cards — real campus photos organized by category
- Sports day, prize giving, lab work, performances, cultural events
- Horizontal scroll on mobile, arrow navigation on desktop

**Achievement Ticker**

- Continuous vertical rise — national wins, O/L stats, scholarship counts
- Loops indefinitely

**Societies Preview**

- Row of society cards: Scouts · Cadets · Science · Sports · Drama · Bands · KITS
- Each card: logo/badge, name, one-line description, link to society page
- KITS card links out to KITS standalone site

**Quick Links Strip**

- Admissions · Results · Facilities · Contact
- High contrast, always scannable

**Footer**

- Address, phone, email
- Quick navigation links
- Social links
- "Built by KITS" → links to KITS site
- Copyright

---

### 2. About KCC

The most emotionally powerful page. Heritage and soul.

- The Story — founding narrative 1873 to present
- Dr. C.W.W. Kannangara — portrait, biography, the Free Education Act
- Interactive Timeline — horizontal scroll, key milestones from 1873 onward
- Vision, Mission, Core Values — typographically treated, not bullet lists
- The Crest Explained — each symbol annotated with its meaning
- School Anthem — embedded audio player, lyrics below

---

### 3. Administration

Human faces build more trust than any text.

- Principal — portrait, name, tenure, brief message
- Deputy Principals — photo grid, name, portfolio
- Assistant Principals
- Head Prefects — current academic year
- School Development Society — President, Secretary, Treasurer

All content managed through admin panel. Photos stored in R2.

---

### 4. Academics

For prospective students and parents evaluating which stream to choose.

- Four stream sections: Science · Commerce · Arts · Technology
- Per stream: subjects, career paths, entry requirements
- O/L pass rate — latest year from database
- A/L university entrance count — latest year
- Grade 5 Scholarship performance
- Stream comparison table

---

### 5. Admissions

High-traffic. Parents bookmark this during application season.

- Grade 1 admissions process — step by step, numbered
- Key dates — managed in Sanity, updated annually
- Requirements checklist
- FAQ — expandable, 8–10 most common questions
- Online Enquiry Form:
    - Parent name, child name, date of birth
    - Grade applying for, phone, email, message
    - Submit → Resend email to admissions office + stored in DB
- Direct contact: phone, email, office hours

---

### 6. News & Announcements

Proves the school is active. Parents check this regularly.

- Urgent announcement banner — site-wide, from admin panel, with expiry
- News feed — filterable: Academic · Sports · Events · Achievements
- Cover image, category badge, headline, date, excerpt per card
- Full article pages — cover, headline, body, date
- Search bar

---

### 7. Results Portal

Students and parents bookmark this forever. Must be fast.

- Search by index number
- Filter: Exam type (O/L / A/L / Scholarship) · Year
- Results display — summary stats + PDF download from R2
- Past results archive — all years available

PDFs served directly from R2 via Cloudflare edge. Server not involved in delivery.

---

### 8. Facilities

Convinces prospective parents the school is worth choosing.

- Main building and grounds
- Science and ICT laboratories
- Auditorium
- Sports grounds and stadium
- Swimming pool + current schedule (managed in admin panel)
- Library — description + link to Paideon (post-launch)

---

### 9. Extracurriculars

Whole-child development narrative.

- Sports: Cricket · Athletics · Football · Netball · Swimming Table Tennis · Badminton · Chess
- Performing Arts: Boys Brass Band · Western Band · Fine Arts · Drama
- Scouts — founded 1952, 35+ President's Award winners
- Cadets
- Per section: photo, description, recent achievements, teacher in charge

---

### 10. Societies Hub

Every student society has a home here. KITS links out. All others live here.

**Hub Page** (`/societies`)

- Grid of all societies — Scouts, Cadets, Science Society, Sports Clubs, Drama, Fine Arts, Bands, KITS, and any others
- Each card: badge/logo, name, tagline, link
- KITS card is visually featured and links to the KITS standalone site

**Per-Society Page** (`/societies/scouts`, `/societies/cadets`, etc.) Each society gets its own dedicated page containing:

- Banner image, society name, founding year if notable
- About — what this society does, who it is for
- Current committee/leadership — photo, name, role
- Membership — how many active members, how to join
- Achievements — notable wins, awards, records
- Recent events — last 3 events with photos and recap
- Gallery — photo grid from society events
- How to join — what to do, who to contact

**Content managed entirely through admin panel.** KITS admins can update any society's page. Societies do not need their own admin access — they provide content to KITS who publishes it.

**Adding a new society** takes one admin panel entry — no code changes.

---

### 11. KITS Page

One page. Links out to the KITS standalone site.

- What KITS is — one paragraph
- Paideon featured — what it is, who uses it, link to paideon.lk
- 2–3 other notable projects
- Recent achievement
- Large CTA: "Visit the KITS Website →"

The real KITS experience lives at its own domain. This page acknowledges KITS within the school website and points people there.

---

### 12. Gallery

Visual proof of school life.

- Filter: Year · Category (Sports / Events / Academic / Cultural / Societies)
- Responsive masonry grid
- Lightbox on click — full image, caption, event
- Admin uploads and tags photos through admin panel

---

### 13. Contact

Pure utility.

- All contacts in one table: Principal, General, IT Lab, Primary, Fax, Pool
- Google Maps embed
- General enquiry form → Resend email
- Feedback & Complaints form:
    - Name (optional — anonymous submissions allowed)
    - Category: Academic · Facilities · Administration · General
    - Message
    - Submit → Resend to designated email, stored in DB with no required PII
- Office hours

---

### 14. 404 Page

Custom, on-brand. School crest centered. "Page Not Found" in Cormorant Garamond. The crest page transition plays on arrival. Navigation back to homepage.

---

### 15. Search Results Page

Site-wide search covering news articles, society pages, staff, and facilities. Powered by Sanity's built-in search for CMS content + tRPC for DB content.

---

## Admin Panel — Complete Specification

### Who Uses It

2–3 KITS members. One role: full access to everything. Login: email + password via NextAuth.js. Later: migrates to Paideon SSO.

### Admin Panel Pages

---

#### Dashboard

- Summary cards: unread enquiries · unread feedback · unpublished drafts · active announcements
- Quick actions: New Post · Upload Results · New Announcement · Upload Gallery
- Recent activity feed — last 10 actions with timestamp and admin name

---

#### News Manager

- List view: all posts, status badge (Draft / Published / Archived), date
- Create/edit:
    - Title, body (rich text with image embed support)
    - Cover image upload → R2
    - Category selector
    - Publish immediately or set future publish date
- Publish / Unpublish / Archive / Delete (soft delete)

---

#### Announcements

- Active announcements list with expiry date and status
- Create: message text, optional expiry date/time, active toggle
- One click to deactivate without deleting
- Expired announcements automatically hidden from public site

---

#### Results Manager

- List: exam type, year, uploaded date, PDF filename
- Upload: select exam type, enter year, upload PDF → R2
- Add summary text (e.g. "95% pass rate — 2025")
- Delete

---

#### Admissions Enquiries

- List: parent name, grade, date, status (Unread / Read / Responded)
- Click to view full submission
- Mark as read / responded
- Export to CSV
- Response via external email (not within panel)

---

#### Feedback & Complaints

- List: category, date, anonymous flag, reviewed status
- Click to read full message
- Mark as reviewed
- No PII stored for anonymous submissions

---

#### Gallery Manager

- Drag-and-drop bulk upload → R2
- Tag each image: category + year + optional caption
- Reorder photos within a category
- Delete

---

#### Facility Schedules

- Swimming pool schedule: editable table (day, time, group)
- Add / remove rows
- Other facilities added as needed

---

#### Staff Profiles

- List with visibility toggle
- Add/edit: name, role, department, photo → R2, display order
- Toggle visible/hidden without deleting

---

#### Societies Manager

- List of all societies
- Add new society: name, badge image, tagline, about text, founding year
- Edit per-society content: leadership, achievements, recent events
- Toggle society visible/hidden on public site
- Separate tab per society — clean, not one massive form

---

#### Site Settings

- School contact information
- Social media links
- Admissions destination email
- Feedback/complaint destination email
- Footer text
- "Built by KITS" link toggle

---

## Database Models (Prisma)

```prisma
model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
}

model NewsPost {
  id          String    @id @default(cuid())
  titleEn     String
  titleSi     String?
  titleTa     String?
  bodyEn      String    @db.Text
  bodySi      String?   @db.Text
  bodyTa      String?   @db.Text
  category    String    // Academic | Sports | Events | Achievements
  coverImage  String?
  status      String    @default("DRAFT") // DRAFT | PUBLISHED | ARCHIVED
  publishedAt DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Announcement {
  id        String    @id @default(cuid())
  messageEn String
  messageSi String?
  messageTa String?
  active    Boolean   @default(true)
  expiresAt DateTime?
  createdAt DateTime  @default(now())
}

model Result {
  id        String   @id @default(cuid())
  examType  String   // OL | AL | SCHOLARSHIP
  year      Int
  pdfUrl    String
  summary   String?
  createdAt DateTime @default(now())
}

model AdmissionsEnquiry {
  id          String    @id @default(cuid())
  parentName  String
  childName   String
  dateOfBirth DateTime?
  grade       String
  phone       String
  email       String
  message     String?   @db.Text
  status      String    @default("UNREAD") // UNREAD | READ | RESPONDED
  submittedAt DateTime  @default(now())
}

model Feedback {
  id          String   @id @default(cuid())
  name        String?  // null = anonymous
  category    String   // Academic | Facilities | Administration | General
  message     String   @db.Text
  reviewed    Boolean  @default(false)
  submittedAt DateTime @default(now())
}

model GalleryImage {
  id         String   @id @default(cuid())
  url        String
  caption    String?
  category   String   // Sports | Events | Academic | Cultural | Societies
  year       Int
  societyId  String?  // optional link to a society
  uploadedAt DateTime @default(now())
}

model FacilitySchedule {
  id       String @id @default(cuid())
  facility String
  day      String
  timeSlot String
  group    String
  order    Int    @default(0)
}

model StaffMember {
  id         String  @id @default(cuid())
  nameEn     String
  nameSi     String?
  role       String
  department String?
  photo      String?
  visible    Boolean @default(true)
  order      Int     @default(0)
}

model Society {
  id          String          @id @default(cuid())
  slug        String          @unique // scouts | cadets | science | etc.
  nameEn      String
  badge       String?         // image URL
  tagline     String?
  aboutEn     String?         @db.Text
  foundedYear Int?
  visible     Boolean         @default(true)
  order       Int             @default(0)
  leadership  SocietyMember[]
  events      SocietyEvent[]
  createdAt   DateTime        @default(now())
}

model SocietyMember {
  id        String  @id @default(cuid())
  societyId String
  society   Society @relation(fields: [societyId], references: [id])
  name      String
  role      String
  photo     String?
  order     Int     @default(0)
}

model SocietyEvent {
  id          String   @id @default(cuid())
  societyId   String
  society     Society  @relation(fields: [societyId], references: [id])
  title       String
  date        DateTime
  description String?  @db.Text
  photos      String[] // array of R2 URLs
  createdAt   DateTime @default(now())
}

model SiteSettings {
  id               String  @id @default("singleton")
  contactPhone     String?
  contactEmail     String?
  admissionsEmail  String?
  feedbackEmail    String?
  address          String?
  facebookUrl      String?
  youtubeUrl       String?
  footerText       String?
}
```

---

## Paideon Connection — Three Phases

### Phase 1: At Nexus Launch

- KITS page links to paideon.lk
- No live data, manual stats only
- No auth connection

### Phase 2: After Paideon v1 Ships

Paideon exposes one public read-only endpoint:

```
GET https://api.paideon.lk/public/stats
→ { students: 4198, books: 15000, vaultResources: 240 }
```

Nexus fetches this at build time with ISR (revalidate every hour). Shown on the KITS page and the KITS standalone site as live proof of impact.

### Phase 3: Paideon SSO (future)

OAuth2 — "Login with Paideon" on Nexus. Students access results portal with Paideon credentials. Admin panel login migrates from NextAuth to Paideon.

---

## Hosting

Same Hetzner CX32 as Paideon. Separate containers. Caddy handles all routing.

```
Hetzner CX32 (4 vCPU, 8GB RAM)
└── Docker Compose
    ├── paideon-api       → api.paideon.lk
    ├── paideon-portal    → paideon.lk
    ├── nexus-web         → cwwkcc.lk
    ├── nexus-admin       → admin.cwwkcc.lk
    ├── postgres          (paideon_db + nexus_db — separate databases)
    └── caddy             (HTTPS + routing for all domains)

File storage: Cloudflare R2 (external, served from CF edge — not server load)
CMS: Sanity.io (external, free tier — not server load)
Email: Resend (external, free tier — not server load)
```

The three external services (R2, Sanity, Resend) all take load off the Hetzner box. The server runs application code only. File serving, CMS editing, and email delivery happen outside the server entirely.

Performance risk: results day traffic spike. Mitigation: PDFs served directly from R2 via Cloudflare edge. Next.js ISR caches the results listing page. The server handles the initial render; subsequent requests are served from cache.

Scaling path: one-click Hetzner resize to CX42 (8 vCPU, 16GB RAM) if monitoring shows consistent pressure. No migration required.

---

## Build Phases — Post April 30

|Phase|Work|
|---|---|
|0|Nx monorepo scaffold, pnpm, shared configs, Docker Compose, Caddy|
|1|Design system — Tailwind tokens, CSS variables, grain texture, typography|
|2|Shared UI components — Button, Card, Badge, Input, Section, Crest|
|3|Layout shell — Header, Footer, Navbar, mobile menu|
|4|Homepage Hero — orbital carousel around crest, parallax, 1873 ghost, shimmer|
|5|Homepage remaining sections — stats, principal, news, streams, ticker|
|6|Sanity CMS setup — schemas for news, gallery, societies|
|7|Admin panel shell — NextAuth, layout, dashboard|
|8|News system — Sanity CRUD in admin, public feed + article pages|
|9|Announcements — admin toggle, site-wide banner component|
|10|About page — timeline component, crest explainer, anthem player|
|11|Administration page — staff profiles from DB|
|12|Admissions page — form, Resend email, DB storage|
|13|Results portal — admin upload to R2, public search by index|
|14|Gallery — admin bulk upload to R2, public grid + lightbox|
|15|Facility schedules — pool timetable, admin editable|
|16|Societies system — hub page, per-society pages, admin CRUD|
|17|Academics, Extracurriculars, Facilities, KITS, Contact pages|
|18|Feedback/complaint form — Resend, DB storage, admin viewer|
|19|Search results page — Sanity + tRPC combined search|
|20|Hetzner deploy — Docker + Caddy + GitHub Actions CI/CD|
|21|i18n infrastructure — next-intl routing, EN messages file|
|22|Paideon Phase 2 — public stats API + ISR integration|
|23|SEO — metadata, OG images, sitemap.xml, robots.txt|
|24|Performance — Lighthouse audit, Core Web Vitals, image optimization|

---

## What Makes This Unforgettable

The crest orbits nothing. Everything orbits it. The school's age is in the background of every page. The transition between pages comes from the logo itself. The gold that appears throughout the site is the same gold as the lamp in the crest.

No other school website in the world can replicate this without it looking stolen — because every decision is tied to symbols that belong specifically to this school. The orbital hero, the 1873 ghost, the crest page transition — all of it is inseparable from C.W.W. Kannangara Central College.

That is the point.

---

_Nexus — cwwkcc.lk_ _Built by Kannangara ICT Society_ _C.W.W. Kannangara Central College — Mathugama_ _© 2026_