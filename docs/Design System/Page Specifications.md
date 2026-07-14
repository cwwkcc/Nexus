# Nexus – Page Specifications

**C.W.W. Kannangara Central College, Mathugama**  
_Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

Every page on Nexus serves a specific emotional and functional purpose. No page exists for its own sake. Each section within a page earns its place by serving a distinct visitor type – parent, student, alumni, or community member.

**The three visitor types every page must serve:**

| Visitor                | Primary need                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **Parent**             | Evaluating the school for their child. Needs trust, clarity, and operational information. |
| **Student**            | Curious about life at KCC. Needs belonging, inspiration, and identity.                    |
| **Alumni / Community** | Reconnecting or engaging. Needs pride, continuity, and relevance.                         |

---

> **Note on terminology:** Everywhere this document says "CMS," it means the custom admin panel (`apps/admin`), backed by PostgreSQL via Prisma (`packages/database`) and tRPC (`packages/api`) — never a third-party content platform. There is no Sanity, Contentful, or any external CMS anywhere in this stack.

## Route Structure

```
/en                    → Homepage
/en/about              → About KCC
/en/administration     → Administration
/en/academics          → Academics
/en/admissions         → Admissions
/en/news               → News & Announcements
/en/news/[slug]        → Full article page
/en/facilities         → Facilities
/en/extracurriculars   → Extracurriculars
/en/societies          → Societies Hub
/en/societies/[slug]   → Individual society page
/en/gallery            → Gallery
/en/contact            → Contact
/en/search             → Unified Search
/en/achievements       → Achievement Database
/en/alumni             → Alumni Directory
/en/digital-archive    → Digital Archive
```

All routes are prefixed with locale (`/en`, `/si`, `/ta`). English is the launch locale; Sinhala and Tamil infrastructure are ready.

---

## Design System Integration

All pages must follow the **[Foundations](https://claude.ai/chat/Foundations.md)** and use components from `@nexus/ui`. Key principles applied to every page:

- **Forest theme** – background gradient (radial white at top, darkening on scroll), glass panels, no backdrop‑filter.
- **Motion** – respectful of reduced motion; page transitions fade to dark and back.
- **Accessibility** – WCAG AA, focus rings, keyboard navigation, touch targets ≥44px.
- **Responsive** – mobile‑first, breakpoints at 768px, 1024px, 1280px.

---

## Standard Hero Requirements

All pages use the `Hero` component from `@nexus/ui`. The following fields are available; each page specifies which are used.

```typescript
interface HeroProps {
  variant: 'homepage' | 'subpage' | 'minimal';
  heading: string;
  subheading?: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
  videoSrc?: string;
  breadcrumb?: { label: string; href?: string }[];
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
  parallax?: boolean;
  overlayOpacity?: number;
}
```

---

## Sitemap Priority (for `sitemap.xml`)

| Route                               | Priority | Change frequency       |
| ----------------------------------- | -------- | ---------------------- |
| `/` (Home)                          | `1.0`    | weekly                 |
| `/about`                            | `0.9`    | monthly                |
| `/academics`                        | `0.9`    | monthly                |
| `/admissions`                       | `0.9`    | weekly (during intake) |
| `/news`                             | `0.8`    | daily                  |
| `/societies/*` (individual society) | `0.7`    | monthly                |
| `/gallery`                          | `0.6`    | monthly                |
| `/contact`                          | `0.5`    | yearly                 |

---

## Page Status Tracking

| Page             | Status        | Owner                               | Target completion |
| ---------------- | ------------- | ----------------------------------- | ----------------- |
| Home             | Complete      | Administration + KITS               | v1.0              |
| About            | Complete      | Administration                      | v1.0              |
| Administration   | Planned       | Administration                      | v1.1              |
| Academics        | Planned       | Academic Section Heads              | v1.1              |
| Admissions       | Planned       | Admissions Office                   | v1.0              |
| News             | Planned (CMS) | Editorial Team                      | v1.0              |
| Facilities       | Planned       | Administration                      | v1.1              |
| Extracurriculars | Planned       | Sports / Cultural units             | v1.2              |
| Societies Hub    | Planned       | Society Advisor + Student Committee | v1.1              |
| Gallery          | Planned       | Media Unit                          | v1.2              |
| Contact          | Complete      | Administration                      | v1.0              |

---

## 01 – Homepage (`/en`)

**Purpose:** The entire school in one scroll. Each section earns its place; three visitor types must all find a reason to continue scrolling.

**Emotional rhythm:** Identity → Proof → Authority → Activity → Structure → Humanity → Prestige → Environment → Culture → Grounding

**Owner:** Administration + KITS

**SEO metadata:**

- Title pattern: `C.W.W. Kannangara Central College – Mathugama, Sri Lanka`
- Description: `Sri Lanka's first Central College — 153 years of shaping the minds that shaped a nation.`
- Open Graph image: Hero background or crest + school building

**Data sources:** Custom CMS (principal message, news, societies preview, stats), static assets (images, anthem). Revalidation: ISR every hour for news, on‑demand for others.

**i18n keys:** `home.hero`, `home.stats`, `home.principal`, `home.news`, `home.academicStreams`, `home.lifeAtKCC`, `home.achievements`, `home.societies`

**Loading / empty / error states:**

- Loading: Skeleton screens for news grid, society preview, stats (count‑up waits for visibility).
- Empty: "No news at the moment. Check back soon." for news; society preview hides if no societies.
- Error: `ErrorState` with retry for CMS‑fetched sections.

### Section Map

| Section             | Component                                           | Content / Data                                                        | Visitor focus      |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------------------- | ------------------ |
| Hero                | `Hero` (homepage variant)                           | Eyebrow, tagline, CTA buttons, optional video background              | All                |
| Stats Strip         | `StatsStrip`                                        | Students, staff, years, university entrances (auto‑counting)          | Parents, alumni    |
| Principal's Message | `PrincipalMessage`                                  | Portrait, name, tenure, quote, full message link                      | Parents, community |
| Latest News         | `NewsCard` (featured + standard)                    | Latest 3 news items from CMS, linked to `/news`                       | All                |
| Academic Streams    | `AcademicStreamCard` (grid of 4)                    | Science, Commerce, Arts, Technology – name, description, career paths | Students, parents  |
| Life at KCC         | `LifeAtKCCPhotoStrip`                               | Horizontal scroll of photos (sports, events, performances, academic)  | Students, parents  |
| Campus Showcase     | `PanoramicFacilityViewer` or `FacilityPreviewStrip` | Highlights of main building, library, swimming pool, sports ground    | Parents, alumni    |
| Achievement Ticker  | `AchievementTicker`                                 | Marquee of recent achievements (e.g., “Gold Medal – SLIIT Codefest”)  | Alumni, parents    |
| Societies Preview   | `SocietyCard` (hub‑grid, 3–4 featured)              | Society name, tagline, category, image                                | Students, alumni   |
| Footer              | `Footer`                                            | Contact, links, social icons, copyright, built‑by KITS                | All                |

---

## 02 – About KCC (`/en/about`)

**Purpose:** Establish heritage, mission, and the story of Dr. Kannangara. Build emotional connection and institutional trust.

**Owner:** Administration

**SEO metadata:**

- Title pattern: `About C.W.W. Kannangara Central College – History, Mission, Values`
- Description: `Sri Lanka's first Central College — 153 years of shaping the minds that shaped a nation. Meet our founder, explore our timeline, and understand our ethos.`
- Open Graph image: Crest or Dr. Kannangara portrait.

**i18n keys:** `about.hero`, `about.stats`, `about.story`, `about.aboutKannangara`, `about.timeline`, `about.ethos`, `about.values`, `about.crest`, `about.alumni`, `about.legacy`, `about.anthem`, `about.closing`

**Loading / empty / error states:** Mostly static; only alumni profiles come from CMS. If CMS fails, hide carousel and show a fallback message.

### Section Map

| Section                                  | Component                          | Content / Data                                                                | Notes                                    |
| ---------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------- |
| Hero                                     | `Hero` (subpage variant)           | Eyebrow, title, subtitle, breadcrumb                                          | Glass overlay, optional background image |
| Stats Strip                              | `StatsStrip`                       | Founded, students, staff, years – static stats                                | Count‑up animation on scroll             |
| Founding Narrative                       | `OurStory` (custom block)          | Paragraph, quote (Dr. Kannangara)                                             | Uses `QuoteBlock`                        |
| Dr. Kannangara                           | `OurNameSake` (custom block)       | Portrait, biography, quote                                                    | Two‑column layout                        |
| Interactive Timeline                     | `Timeline`                         | Milestones from 1873 to present with era‑based image treatments               | Scroll‑snap horizontal                   |
| Vision, Mission, Values                  | `Ethos` + `Values` (custom blocks) | Vision, mission, motto, core values (Wisdom, Integrity, Excellence, Service)  | Use `QuoteBlock`, `Grid`                 |
| Crest Explained                          | `CrestDiagram`                     | Interactive annotated crest with hotspots (Lamp, Lotus, Dharmachakra, Laurel) | Mobile fallback to grid                  |
| Alumni Legacy                            | `AlumniLegacyBlock`                | Carousel of alumni quotes, optional portrait, graduation year, position       | Filter by year                           |
| Spirit of Kannangara / Physical Heritage | `Legacy` (custom block)            | Text + heritage photo grid                                                    | Two‑column on desktop                    |
| School Anthem                            | `AudioPlayer`                      | Audio player with visualiser, lyrics (English + Sinhala), download link       | Ceremonial                               |
| Closing Statement                        | `ClosingStatement` (custom block)  | Final reflective paragraph, gold rule, motto                                  | Centred, minimal                         |

---

## 03 – Administration (`/en/administration`)

**Purpose:** Human faces build trust. Hierarchy communicates legitimacy.

**Owner:** Administration

**SEO metadata:**

- Title pattern: `Administration – C.W.W. Kannangara Central College`
- Description: `Meet our principal, deputy principals, assistant principals, and head prefects.`
- Open Graph image: Group photo of administration team.

**Data source:** Staff Module (`packages/database` `Staff` model), filtered by role/department and ordered by hierarchy (principal first, then deputies, assistants, head prefects). This page has no admin module of its own — administrators are entered as staff like anyone else; this page is a filtered query, not a separate content type. Revalidate on‑demand.

**Loading / empty / error states:**

- Loading: Staff card skeletons.
- Empty: “Staff profiles being updated. Please check back soon.”
- Error: `ErrorState` with retry.

**i18n keys:** `administration.hero`, `administration.institutional`, `administration.principal`, `administration.deputyPrincipals`, `administration.assistantPrincipals`, `administration.headPrefects`, `administration.sds`

### Section Map

| Section                      | Component                           | Content / Data                                          |
| ---------------------------- | ----------------------------------- | ------------------------------------------------------- |
| Hero                         | `Hero` (subpage)                    | Eyebrow, title, subtitle, breadcrumb                    |
| Institutional Statement      | `Text` (centred, short)             | One‑sentence philosophy of administration               |
| Principal                    | `StaffCard` (principal variant)     | Portrait, name, title, tenure, quote, full message link |
| Deputy Principals            | `StaffCard` (grid variant, 2‑3)     | Portrait, name, title, portfolio, tenure                |
| Assistant Principals         | `StaffCard` (grid variant, up to 6) | Portrait, name, title, portfolio                        |
| Head Prefects (Current Year) | `StaffCard` (compact variant, 2‑3)  | Name, title, portrait (optional)                        |
| School Development Society   | `Text` + `Button`                   | Description, contact, link to SDS page                  |

---

## 04 – Academics (`/en/academics`)

**Purpose:** Demonstrate academic rigour and success. Reassure parents and inspire students.

**Owner:** Academic Section Heads

**SEO metadata:**

- Title pattern: `Academic Programmes – Science, Commerce, Arts, Technology`
- Description: `Explore our A/L streams, subject offerings, career pathways, and academic excellence.`
- Open Graph image: Students in lab or classroom.

**Data sources:** Academic Programs admin screen for stream descriptions and subject lists — a fixed set of streams (Bio Science, Physical Science, Commerce, Arts, Technology) defined by the national A/L system, editable content only, no create/delete. There is no live performance-statistics feed (no pass rates, no university-entrance counts) — the exam results portal that would have backed such numbers was cut from scope entirely. Revalidate daily.

**Loading / empty / error states:**

- Loading: Card skeletons for streams, table skeleton.
- Empty: “Stream details are being updated. Please contact academic office.”
- Error: `ErrorState` with retry.

**i18n keys:** `academics.hero`, `academics.streams`, `academics.comparisonTable`, `academics.studentJourney`, `academics.performance`

### Section Map

| Section                 | Component                        | Content / Data                                                                             |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------------------------------ |
| Hero                    | `Hero` (subpage)                 | Eyebrow, title, subtitle, breadcrumb                                                       |
| Academic Culture Intro  | `Text` (short)                   | Brief statement on holistic education (Head, Heart, Hand)                                  |
| Four Stream Sections    | `AcademicStreamCard` (grid of 4) | Science, Commerce, Arts, Technology – each with subjects, career paths, entry requirements |
| Stream Comparison Table | `StreamComparisonTable`          | Responsive table comparing streams (subjects, career paths, pass rates)                    |
| Student Journey Flow    | `StudentJourneyFlow`             | Diagram from Grade 6 to A/L, showing streams and transitions                               |
| Performance Statistics  | `StatsStrip` + `ProgressArc`     | Pass rates, university entrances, district ranking                                         |
| Real Outcomes           | `AchievementCard` (archive‑post) | Testimonials or notable alumni outcomes (optional)                                         |

---

## 05 – Admissions (`/en/admissions`)

**Purpose:** Guide parents through application process, build trust with transparency, capture enquiries.

**Owner:** Admissions Office

**SEO metadata:**

- Title pattern: `Admissions – Apply to C.W.W. Kannangara Central College`
- Description: `Applications for Grade 1 and other classes. Process steps, key dates, requirements, and enquiry form.`
- Open Graph image: School entrance or students in uniform.

**Data sources:** Static content (process steps, dates, FAQ), CMS for documents, form submissions to Resend. Revalidate on‑demand for dates.

**Loading / empty / error states:** Mostly static; form submission errors displayed inline. If CMS documents fail, hide downloadable documents section and show fallback message.

**i18n keys:** `admissions.hero`, `admissions.processSteps`, `admissions.keyDates`, `admissions.requirements`, `admissions.faq`, `admissions.enquiryForm`

### Section Map

| Section                      | Component                         | Content / Data                                                               |
| ---------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| Hero                         | `Hero` (subpage)                  | Eyebrow, title, subtitle, breadcrumb                                         |
| Admissions Process Steps     | `AdmissionsProcessSteps`          | 4–5 steps (Apply Online → Interview → Documents → Acceptance)                |
| Key Dates Timeline           | `AdmissionsKeyDatesTimeline`      | Vertical timeline with dates (applications open, deadline, interview dates)  |
| Requirements Checklist       | `RequirementsChecklist`           | Printable checklist of required documents, with required/optional indicators |
| Downloadable Documents       | `DownloadableDocumentItem` (list) | Application form, prospectus, fee structure (PDFs from R2)                   |
| FAQ                          | `Accordion`                       | Common questions (age limits, scholarships, transport)                       |
| Enquiry Form                 | `ContactForm` (or custom)         | Name, email, phone, message → Resend to admissions office                    |
| Dedicated Admissions Contact | `Text` + `InlineLink`             | Phone, email, office hours                                                   |
| Transport and Accessibility  | `Text` + `MapEmbed`               | School transport routes, accessibility features                              |

---

## 06 – News and Announcements (`/en/news`)

**Purpose:** Keep community informed about achievements, events, and notices. Build currency and trust.

**Owner:** Editorial Team (selected staff + KITS)

**SEO metadata:**

- Title pattern: `News – C.W.W. Kannangara Central College`
- Description: `Latest announcements, academic achievements, sports victories, and upcoming events.`
- Open Graph image: School logo or featured article image.

**Data source:** Custom CMS (news posts, categories, featured flag). Revalidate every hour (ISR). Static generation for individual posts.

**Search strategy:** Title + excerpt + body (via CMS text search). Implement with `SearchInput` component.

**Loading / empty / error states:**

- Loading: Skeleton cards grid (6 items).
- Empty: “No news published yet. Check back later.”
- Error: `ErrorState` with retry.

**i18n keys:** `news.hero`, `news.filter`, `news.search`

### Section Map

| Section                               | Component                                      | Content / Data                                                                           |
| ------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Announcement Banner                   | `AnnouncementBanner` (optional, dismissible)   | Urgent notice (e.g., “School reopens 5 May”) – controlled by CMS flag                    |
| Featured Article                      | `NewsCard` (featured variant)                  | Latest post with `featured = true`, large image, excerpt                                 |
| Filter Bar                            | `FilterBar` (category tabs)                    | Categories: All, Academic, Sports, Events, Achievements                                  |
| Search Input                          | `SearchInput`                                  | Client‑side search on title + excerpt; results link to full article                      |
| News Feed                             | `NewsCard` (standard variant) – paginated grid | 6–12 posts per page, with infinite scroll or pagination                                  |
| Full Article Page (`/en/news/[slug]`) | `RichTextRenderer`                             | Tiptap JSON from the custom CMS; includes heading, body, images, captions, share buttons |

---

## 07 – Facilities (`/en/facilities`)

**Purpose:** Trust‑building for parents evaluating the school. Every facility must feel like a _space_, not a bullet point.

**Owner:** Administration

**SEO metadata:**

- Title pattern: `Facilities – Campus, Labs, Library, Sports Grounds, Swimming Pool`
- Description: `Explore our modern amenities – science labs, ICT labs, auditorium, swimming pool, library, and sports grounds.`
- Open Graph image: Panoramic of main building or swimming pool.

**Data source:** CMS (facility name, description, features, images, schedule). Revalidate daily.

**Loading / empty / error states:**

- Loading: Card skeletons for each facility.
- Empty: “Facility details are being updated. Please contact administration.”
- Error: `ErrorState` with retry.

**Search strategy:** Facility name + description (client‑side filter). Not a primary search target but nice to have.

**i18n keys:** `facilities.hero`, plus each facility name (e.g., `facilities.mainBuilding`)

### Section Map

One section per facility, repeated. Use `FacilityCard` (standard or schedule variant).

| Facility                   | Special treatment                                             |
| -------------------------- | ------------------------------------------------------------- |
| Main Building and Grounds  | Standard card                                                 |
| Science Laboratories       | Standard card                                                 |
| ICT Laboratories           | Standard card                                                 |
| Auditorium                 | Standard card                                                 |
| Sports Grounds and Stadium | Standard card                                                 |
| Swimming Pool              | `FacilityCard` (schedule variant) + `PanoramicFacilityViewer` |
| Library                    | Standard card                                                 |

Each card includes: hero image, name, description, key features list, capacity/stats where relevant, link to detail page (optional).

---

## 08 – Extracurriculars (`/en/extracurriculars`)

**Purpose:** Whole‑child development – Head, Heart, Hand made visible.

**Owner:** Sports / Cultural units

**SEO metadata:**

- Title pattern: `Extracurriculars – Sports, Performing Arts, Scouts, Cadets`
- Description: `Beyond the classroom – develop character, leadership, and teamwork through our vibrant extracurricular programmes.`
- Open Graph image: Action shot from sports or scouts.

**Data source:** CMS (extracurricular activity profiles). Revalidate daily.

**Loading / empty / error states:**

- Loading: Card skeletons for each activity.
- Empty: “Extracurricular details are being updated. Please contact the sports or cultural unit.”
- Error: `ErrorState` with retry.

**i18n keys:** `extracurriculars.hero`, `extracurriculars.sports`, `extracurriculars.performingArts`, `extracurriculars.scouts`, `extracurriculars.cadets`

### Section Map

| Category             | Component                                                     | Notes                                                 |
| -------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Hero                 | `Hero` (subpage)                                              | Eyebrow, title, subtitle, breadcrumb                  |
| Sports               | `ExtracurricularCard` (sport variant) + `LifeAtKCCPhotoStrip` | Cricket, athletics, volleyball, etc.                  |
| Performing Arts      | `ExtracurricularCard` (performing‑arts variant)               | Western band, Eastern band, drama, etc.               |
| Scouts               | `ExtracurricularCard` (leadership variant)                    | History, President’s Award winners, teacher in charge |
| National Cadet Corps | `ExtracurricularCard` (leadership variant)                    | Annual camps, achievements                            |

---

## 09 – Societies Hub (`/en/societies`)

**Purpose:** Showcase student‑led organisations. Encourage participation and belonging.

**Owner:** Society Advisor + Student Committee

**SEO metadata:**

- Hub page title: `Societies – Clubs & Organisations at C.W.W. Kannangara Central College`
- Hub description: `Discover your passion – academic, cultural, sports, and technology societies. Join, participate, lead.`
- Individual society page title: `{Society Name} – C.W.W. Kannangara Central College`
- Open Graph image: Society banner or group photo.

**Data source:** CMS (society profiles – name, tagline, category, founding year, member count, leadership, gallery). Revalidate daily.

**Search strategy:** Society name + category + tagline (client‑side filter on hub).

**Loading / empty / error states:**

- Loading: Skeleton cards for society grid.
- Empty: “No societies have been added yet. Check back soon.”
- Error: `ErrorState` with retry.

**i18n keys:** `societies.hero`, `societies.hub`

### Hub Page Section Map

| Section          | Component                        | Content                                                                    |
| ---------------- | -------------------------------- | -------------------------------------------------------------------------- |
| Hero             | `Hero` (subpage)                 | Eyebrow, title, subtitle, breadcrumb                                       |
| Society Grid     | `SocietyCard` (hub‑grid variant) | All societies, filterable by category (Academic, Sports, Arts, Technology) |
| Featured Society | `SocietyCard` (featured variant) | KITS – highlighted at top or bottom of grid                                |

### Individual Society Pages (`/en/societies/[slug]`)

Mandatory sections (canonical order):

| Section       | Component                                       | Content / Data                                |
| ------------- | ----------------------------------------------- | --------------------------------------------- |
| Banner        | `SocietyBanner`                                 | Full‑width image, society name, founding year |
| About         | `Text` (rich)                                   | Purpose, activities, meeting schedule         |
| Leadership    | `StaffCard` (grid variant)                      | Current committee – photo, name, role, tenure |
| Membership    | `StatCard` (single)                             | Number of active members + how to join        |
| Achievements  | `AchievementCard` (ticker‑item or archive‑post) | Notable wins, awards, records                 |
| Recent Events | `EventCard` (compact or standard)               | Last 3 events with photos and recap           |
| Gallery       | `MasonryGrid` + `Lightbox`                      | Photo grid from society events                |
| How to Join   | `Text` + `Button` (link to form or contact)     | Process, contact person                       |

**KITS page special treatment:** Featured society card on hub, dedicated page with additional emphasis on tech achievements and Nexus.

---

## 10 – Gallery (`/en/gallery`)

**Purpose:** Visual storytelling of school life. Celebratory and archival.

**Owner:** Media Unit

**SEO metadata:**

- Title pattern: `Gallery – Moments at C.W.W. Kannangara Central College`
- Description: `Explore our photo albums – prize givings, sports meets, cultural events, and everyday school life.`
- Open Graph image: Featured album cover.

**Data source:** CMS for albums (title, year, cover, photo count, photos in R2). Instagram embed widget for recent/casual photos (no API dependency). Revalidate daily for albums.

**Search strategy:** Album title + year + category (client‑side filter on grid).

**Loading / empty / error states:**

- Loading: Skeleton cards for album grid.
- Empty: “No albums have been added yet. Check back later.”
- Error: `ErrorState` with retry.

**i18n keys:** `gallery.hero`, `gallery.albums`, `gallery.filter`

### Section Map

| Section              | Component                    | Content                                                                     |
| -------------------- | ---------------------------- | --------------------------------------------------------------------------- |
| Hero                 | `Hero` (subpage)             | Eyebrow, title, subtitle, breadcrumb                                        |
| Featured Albums Grid | `GalleryAlbumCard` (grid)    | Curated albums, filterable by category (Events, Sports, Academic, Cultural) |
| Filter Bar           | `FilterBar` (category tabs)  | All, Events, Sports, Academic, Cultural                                     |
| Photo Grid           | `MasonryGrid` + `ImageFrame` | Thumbnails from selected album, clicking opens `Lightbox`                   |
| Lightbox             | `Lightbox`                   | Full‑screen image viewer with captions and navigation                       |
| Video Section        | `VideoFrame` (embed)         | YouTube playlist embed of school event videos (optional)                    |

---

## 11 – Contact (`/en/contact`)

**Purpose:** Provide clear, accessible contact information for all stakeholders. Encourage enquiries and feedback.

**Owner:** Administration

**SEO metadata:**

- Title pattern: `Contact Us – C.W.W. Kannangara Central College`
- Description: `Get in touch with our departments, send a general enquiry, provide feedback, or find directions to our campus.`
- Open Graph image: Map or school entrance.

**Data source:** Static content (department contacts, office hours, transport) + form submissions via Resend. Revalidate on‑demand for emergency contacts.

**Loading / empty / error states:** Forms show inline validation and submission errors. Static content is always present.

**i18n keys:** `contact.hero`, `contact.departments`, `contact.generalEnquiry`, `contact.feedback`, `contact.officeHours`, `contact.emergency`, `contact.transport`

### Section Map

| Section                             | Component             | Content                                                                           |
| ----------------------------------- | --------------------- | --------------------------------------------------------------------------------- |
| Hero                                | `Hero` (subpage)      | Eyebrow, title, subtitle, breadcrumb                                              |
| Department Contacts Table           | `DataTable`           | Department name, phone, email, extension                                          |
| Google Maps Embed                   | `MapEmbed`            | Location of school, optional nearby note                                          |
| General Enquiry Form                | `ContactForm`         | Name, email, subject, message → sent to info@cwwkcc.lk                            |
| Feedback and Complaints Form        | `FeedbackForm`        | Name (optional), category, message, anonymous toggle → sent to principal's office |
| Office Hours and Emergency Contacts | `Text` + `InlineLink` | Timings, emergency numbers, after‑hours protocol                                  |
| Transport and Directions            | `Text`                | Bus routes, train station, parking, accessibility                                 |

---

## 12 – 404 Page

**Purpose:** Dignified interruption – consistent with identity, not a gimmick.

**Owner:** KITS (no content updates needed)

**SEO metadata:** Noindex. Title: `Page Not Found – C.W.W. Kannangara Central College`

**Component:** `NotFoundPage` (already implemented)

**Content:**

- Crest animation plays on arrival (`CrestAnimation` inside page)
- Animated 404 heading (`useCountUp`)
- Eyebrow: "Page not found"
- Friendly message: "The path appears to have faded."
- Ambient embers (`AmbientEmbers`) rising
- Return to homepage button (`Button` as link)
- Quick links grid

**Background:** Forest gradient (matching theme), no glass panels – just the forest.

---

## CMS Content Models Reference

The following content types must be defined in the custom CMS (PostgreSQL via Prisma, `packages/database`) to support the pages above:

| Content type         | Used on pages                                                        |
| -------------------- | -------------------------------------------------------------------- |
| `newsArticle`        | Home, News                                                           |
| `society`            | Home, Societies Hub, Society detail                                  |
| `staffProfile`       | Administration, Society detail (leadership), About (alumni optional) |
| `achievement`        | Home, About (alumni), Society detail                                 |
| `facility`           | Facilities                                                           |
| `extracurricular`    | Extracurriculars                                                     |
| `galleryAlbum`       | Gallery                                                              |
| `announcementBanner` | Home, News (optional)                                                |

Each content type must include appropriate fields (title, slug, body (Tiptap JSON), images, categories, dates, relationships). Detailed schemas are documented in `packages/contracts` and `packages/database/prisma/schema.prisma`.

---

## Dynamic Content & Data Fetching Notes

| Page             | Data source                                                  | Revalidation strategy                                  |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| Home             | Custom CMS (principal message, news, societies) + static     | ISR 1 hour, on‑demand for updates                      |
| About            | `ContentEntry` (editorial content) + CMS for alumni profiles | Static (build‑time), tag-based revalidation on publish |
| Administration   | Staff Module (filtered query, no separate content type)      | On‑demand                                              |
| Academics        | Admin config (streams only — no live results-derived stats)  | Daily                                                  |
| Admissions       | Static + CMS (documents)                                     | On‑demand for dates                                    |
| News             | CMS                                                          | ISR 1 hour                                             |
| Facilities       | CMS                                                          | Daily                                                  |
| Extracurriculars | CMS                                                          | Daily                                                  |
| Societies        | CMS                                                          | Daily                                                  |
| Gallery          | CMS + R2                                                     | Daily                                                  |
| Contact          | Static + form handler                                        | N/A                                                    |

---

## Figma / Penpot Wireframes

Placeholder links to design mockups (to be added once available):

- [Homepage wireframe](https://claude.ai/chat/bd3a2f4a-fada-4cad-b465-362d416d5b50#)
- [About page wireframe](https://claude.ai/chat/bd3a2f4a-fada-4cad-b465-362d416d5b50#)
- [Admissions process](https://claude.ai/chat/bd3a2f4a-fada-4cad-b465-362d416d5b50#)
- [Society page template](https://claude.ai/chat/bd3a2f4a-fada-4cad-b465-362d416d5b50#)

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_

---

## Changelog

**This revision** — audited against Feature Registry F-001–F-196 (source of truth):

- Removed the entire "07 – Results Portal" page specification section. Sections 08–13 renumbered to 07–12.
- Removed `/en/results` from the Route Structure list and the Results row from Page Status Tracking and the Dynamic Content & Data Fetching Notes table.
- Fixed the Academics page spec (`## 04`) — removed the claim that performance statistics are "computed live from `ExamResult` data"; there is no live results feed. Softened the SEO description accordingly.
- Fixed the About page's data-source description in the fetching notes table to say `ContentEntry` instead of "Static (i18n)," matching ADR-009.
- Fixed a `packages/validation` reference to `packages/contracts`.
- Removed the "Results portal" placeholder wireframe link.
- Added routes for pages that exist in the Feature Registry but had no entry here: `/en/search`, `/en/achievements`, `/en/alumni`, `/en/digital-archive`. **Note:** these four pages still have no full page-specification section (Purpose/Owner/SEO/Data sources/Section Map) in this document — only Results had one, now removed. Writing those four from scratch wasn't attempted here since it means authoring new design decisions, not correcting stale ones; flagging as a follow-up.
