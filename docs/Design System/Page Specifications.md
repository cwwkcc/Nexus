**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

Every page on Nexus serves a specific emotional and functional purpose. No page exists for its own sake. Each section within a page earns its place by serving a specific type of visitor — parent, student, alumni, or community member.

**The three visitor types every page must serve:**

- **Parent** — evaluating the school for their child. Needs trust, clarity, and operational information.
- **Student** — curious about life at KCC. Needs belonging, inspiration, and identity.
- **Alumni / Community** — reconnecting or engaging. Needs pride, continuity, and relevance.

---

## Route Structure

```
/en                          → Homepage
/en/about                    → About KCC
/en/administration           → Administration
/en/academics                → Academics
/en/admissions               → Admissions
/en/news                     → News & Announcements
/en/news/[slug]              → Full article page
/en/results                  → Results Portal
/en/facilities               → Facilities
/en/extracurriculars         → Extracurriculars
/en/societies                → Societies Hub
/en/societies/[slug]         → Individual society page
/en/societies/kits           → KITS dedicated page
/en/gallery                  → Gallery
/en/contact                  → Contact
```

All routes are prefixed with locale (`/en`, `/si`, `/ta`). English is the launch locale.

---

## 01 — Homepage (`/en`)

### Purpose

The entire school in one scroll. Every section earns its place. Three visitor types must all find a reason to continue scrolling.

### Emotional Rhythm

Identity → Proof → Authority → Activity → Structure → Humanity → Prestige → Culture → Grounding

### Section Map

---

#### Hero

**Purpose:** Establish emotional tone, prestige, and symbolism before a single fact is read. **Content:** Minimal. School identity — visual and typographic only. No CTA. **Design mandate:** Cinematic and restrained. Users must _feel_ KCC before learning about it. **Background:** `color/green/base` **Animation:** Full suite — `motion/ceremonial` permitted. See loading screen concept for animation language. **Status:** TBD — concept not yet finalised. Return to this after all other pages are complete.

---

#### Stats Strip

**Purpose:** Psychological stabilizer after cinematic hero. Immediately answers "is this institution significant?" **Content:**

- `5,000+` Students
- `200+` Staff
- `153` Years
- `200+` University Entrances Annually

**Design:** Clean, elegant, compact, confident. CountUp animation on first scroll into view. **Background:** `color/green/base` **Components:** `Stats Strip` → 4× `Stat Card (single metric)` **Data source:** Static — `apps/web/src/data/home.ts`

---

#### Principal's Message

**Purpose:** Humanise the institution. Authority through a real human face. **Content:** Principal portrait, name, tenure, pull quote, short paragraph, "Read Full Message" link to `/en/administration`. **Design:** Two-column desktop layout. Large portrait left, text right. Pull quote in Cormorant italic. **Background:** `surface/base` **Components:** `Principal's Message Block` **Data source:** Sanity CMS — staff profiles

---

#### Latest News

**Purpose:** Prove the school is alive and active. Parents check this regularly. **Content:** Three most recent news articles from CMS. Category badge, headline, date, excerpt per card. "All News →" link. **Design:** Editorial card layout. Dynamic, fresh. Never a boring blog grid. **Background:** `surface/default` **Components:** 3× `News Card (standard)`, `Section Header` **Data source:** Sanity CMS — news articles

---

#### Academic Streams

**Purpose:** Navigation aid for parents evaluating which stream suits their child. **Content:** Four cards — Science, Commerce, Arts, Technology. Icon, one-line description, link to `/en/academics`. **Design:** Strong grid. Disciplined, precise typography. Less cinematic — communicates academic rigour. **Background:** `surface/base` **Components:** 4× `Academic Stream Card`, `Section Header` **Data source:** Static — `apps/web/src/data/home.ts`

---

#### Life at KCC

**Purpose:** Visual proof of the Head, Heart, Hand philosophy. Emotional warmth. Shows the school is alive. **Content:** Curated campus photography — Sports, Events, Performances, Academic. Not a gallery link — a curated emotional glimpse. **Design:** Horizontal scroll mobile, arrow navigation desktop. Wider spacing. Softer transitions. Photography-forward. **Background:** `surface/default` **Components:** `Life at KCC Photo Strip` **Data source:** Sanity CMS — curated homepage gallery selection

---

#### Achievement Ticker

**Purpose:** Continuous institutional prestige. Never stops moving. **Content:** O/L results, A/L university entrances, Grade 5 scholarships, Scout awards, sports wins, competition results. Link to full achievements archive. **Design:** Slow, elegant horizontal scroll. Gold separators. Hover pauses scroll. Never a stock ticker. **Background:** `surface/base` **Components:** `Achievement Ticker`, multiple `Achievement Card (ticker item)` **Data source:** Sanity CMS — achievements

---

#### Societies Preview

**Purpose:** Communicate that KCC is not a monolith. Culture, individuality, opportunity. **Content:** Row of society cards — Scouts, Cadets, Science, Sports, Drama, Bands, KITS. Links to `/en/societies`. **Design:** Each card has personality. KITS visually featured. **Background:** `surface/default` **Components:** `Societies Preview Row`, multiple `Society Card (hub grid)`, `Society Card (featured — KITS)` **Data source:** Sanity CMS — societies

---

#### Footer

**Purpose:** Institutional grounding. The closing page of a historical document. **Content:** Crest watermark (low opacity), school name, founding year, motto, address, phone, email, quick nav columns, social links, "Built by KITS" credit, copyright. **Background:** `surface/inverse` **Components:** `Footer` **Data source:** Static + site settings (admin panel)

---

## 02 — About KCC (`/en/about`)

### Purpose

The soul of the entire website. Not "About Us" — institutional mythology. The most emotionally powerful page on the site.

### Pacing Note

This page breathes slower than all others. Spacing at +1 scale step throughout. Longer spacing. More atmospheric transitions. Less information density. Users must feel time.

### Section Map

---

#### Hero

**Content:** Eyebrow — "Est. 1873 · Mathugama, Sri Lanka". Heading — large typographic treatment. Subtitle — one sentence establishing historical gravity. **Background:** `color/green/base` **Animation:** Full suite.

---

#### Founding Narrative (1873 → Present)

**Purpose:** Establish age, continuity, and historical gravity immediately. **Content:** The story from 1873 to 2026. Not a list — prose with pull quotes. **Design:** Archival and living simultaneously. Generous spacing. **Components:** `Quote Block (pull quote)`, `Rich Text Renderer`

---

#### Dr. Kannangara and the Free Education Act

**Purpose:** Expand KCC from a school to a national educational movement. Reverential, transformative, ideological. **Content:** Portrait, biography, the Free Education Act story. Not a résumé — a story of conviction. **Design:** Large portrait, text flows beside it. Ceremonial quote treatment for key statements. **Components:** `Staff/Person Card (principal large variant)`, `Quote Block (ceremonial)` **Data source:** Static — content hardcoded

---

#### Interactive Timeline

**Purpose:** Make 153 years of history spatially tangible. Users travel through eras. **Content:** Key milestones from 1873 to 2026. Each milestone: year, title, description, archival image. **Design:** Horizontal scroll. Era-specific atmospheric transitions. Earlier eras: sepia tone, textured. Modern eras: cleaner, more vibrant. Feels like traveling through history, not clicking cards. **Animation:** Component-level specification — uses `motion/slow` + `ease/ceremonial` as foundation. Custom choreography above token level. **Components:** `Interactive Timeline` (component-level spec) **Data source:** Static — `apps/web/src/data/about.ts` (milestones array)

---

#### Vision, Mission, Core Values

**Purpose:** Institutional identity. Not bullet points — typographic statements. **Content:** Vision statement, Mission statement, Motto (Pali + translation), Three Core Values (Truth, Courage, Discipline), Three Pillars (Head, Heart, Hand). **Design:** Typographically treated. Each statement given space. Cormorant italic for the motto. **Components:** `Quote Block (ceremonial)`, `Section Header` **Data source:** Static + `messages/en.json`

---

#### The Crest Explained

**Purpose:** Make symbols intentional and philosophical. Most institutions waste their symbols. **Content:** Full crest image. Each symbol annotated: Lamp, Lotus, Dharmachakra, Laurel. **Design:** Interactive — hover/tap reveals annotation. Animated connection lines. Gold accent throughout. **Components:** `Crest Explainer` **Data source:** Static — `apps/web/src/data/about.ts` (crestSymbols array)

---

#### Alumni Legacy

**Purpose:** Convey institutional continuity across generations. "This institution shaped real lives." **Content:** Short profiles or quotes from distinguished alumni. Not full biographies — enough to communicate legacy. **Design:** Restrained, archival. Not a grid of headshots. **Components:** `Alumni Legacy Block` **Data source:** Sanity CMS — alumni profiles

---

#### Spirit of Kannangara

**Purpose:** Answer what it _feels_ like to belong here. Traditions, mindset, atmosphere. **Content:** What defines a Kannangarian. The values lived daily. The traditions that persist. **Design:** Atmospheric. Slower pace. Photography and type working together. **Components:** `Quote Block (pull quote)`, `Image Frame (featured)` **Data source:** Static + `messages/en.json`

---

#### Physical Heritage

**Purpose:** Make history physically real through places and archival photography. **Content:** Old building photographs, archival campus images, historical grounds. Evolution of the campus. **Design:** Full-bleed imagery. Sepia treatment on archival photos. Captions with years. **Components:** `Image Frame (full bleed)`, `Caption System` **Data source:** Sanity CMS — heritage gallery

---

#### School Anthem

**Purpose:** Sensory memory. Cultural heritage, not media playback. **Content:** Custom audio player, anthem lyrics in Sinhala, attribution. **Design:** Ceremonial. Not a generic HTML5 player. Subtle waveform or animated bars. Progress bar in `color/gold/base`. Lyrics in `font/sinhala`. **Components:** `Anthem Audio Player` **Data source:** Static — audio file in Cloudflare R2, lyrics in `messages/en.json`

---

#### Closing Statement

**Purpose:** End with legacy continuing forward, not nostalgia alone. **Content:** Forward-looking statement. Modern student imagery. Continuation of the light/lamp metaphor. **Design:** `color/green/base` background. Bookend matching the hero. Ceremonial tone. **Components:** `Quote Block (ceremonial)`, `Image Frame`

---

## 03 — Administration (`/en/administration`)

### Purpose

Human faces build trust. Hierarchy communicates legitimacy.

### Section Map

---

#### Institutional Statement

**Content:** Short statement of administrative philosophy. Not a wall of text — one or two sentences. **Components:** `Section Header`

---

#### Principal

**Content:** Large portrait, name, title, tenure ("Principal since [year]"), message excerpt, link to full message. **Design:** Dominant, anchoring. Principal is the symbolic center of administration. **Components:** `Staff/Person Card (principal large)` **Data source:** Sanity CMS — staff profiles

---

#### Deputy Principals

**Content:** Photo grid. Name, role, portfolio, tenure per person. **Design:** Professional photo grid. Compact but dignified. **Components:** Multiple `Staff/Person Card (grid)` **Data source:** Sanity CMS — staff profiles

---

#### Assistant Principals

**Content:** Same structure as Deputy Principals. **Components:** Multiple `Staff/Person Card (grid)` **Data source:** Sanity CMS — staff profiles

---

#### Head Prefects (Current Year)

**Content:** Current academic year head prefects. Photo, name, role. **Design:** Slightly lighter visual weight than staff — student leadership, not administrative authority. **Components:** Multiple `Staff/Person Card (compact)` **Data source:** Sanity CMS — staff profiles (prefects category)

---

#### School Development Society

**Purpose:** Visually separated from core administration — community governance, not institutional hierarchy. **Content:** President, Secretary, Treasurer. Names and roles. **Design:** Softer card style. Distinct subsection. **Components:** `Section Header`, multiple `Staff/Person Card (compact)` **Data source:** Sanity CMS — staff profiles (SDS category)

---

## 04 — Academics (`/en/academics`)

### Purpose

For prospective students and parents evaluating streams. Turns the page from informational to directional.

### Section Map

---

#### Academic Culture Intro

**Content:** What learning feels like at KCC. Not just what students study — the philosophy behind it. **Components:** `Section Header`, `Quote Block (pull quote)`

---

#### Four Stream Sections

Repeat for: Science, Commerce, Arts, Technology. **Content per stream:** Stream name, subjects list, career paths, entry requirements. **Design:** Strong visual identity per stream while maintaining system consistency. **Components:** 4× `Academic Stream Card`, expandable subject lists

---

#### Stream Comparison Table

**Content:** Side-by-side comparison — Science, Commerce, Arts, Technology. Rows: subjects, career paths, entry requirements, pass rates. **Components:** `Stream Comparison Table` **Data source:** Static

---

#### Student Journey Flow

**Content:** Visual flow diagram — progression pathways, subject combinations, future opportunities. **Purpose:** Shows where each stream leads. Directional, not just descriptive. **Components:** `Student Journey Flow` **Data source:** Static

---

#### Performance Statistics

**Content:** O/L pass rate (latest year), A/L university entrance count, Grade 5 Scholarship count. **Components:** `Stat Card (single metric)`, `Comparison Bar` **Data source:** Database — results statistics

---

#### Real Outcomes

**Content:** Top achievers, university placements, competition results, Olympiad participation. **Purpose:** Academic prestige felt emotionally, not just statistically. **Components:** `Achievement Card (archive post)` **Data source:** Sanity CMS — achievements (academic category)

---

## 05 — Admissions (`/en/admissions`)

### Purpose

Highest operational importance. Must reduce confusion, anxiety, and repetitive office calls. Clarity and trust above all else. No heavy animations.

### Section Map

---

#### Admissions Process Steps

**Content:** Step-by-step Grade 1 admissions process. Numbered. **Components:** `Admissions Process Steps` **Data source:** Static + `messages/en.json`

---

#### Key Dates Timeline

**Content:** Applications open → Submission deadline → Interview period → Selection release. **Design:** Visual timeline. Reduces cognitive load. **Components:** `Admissions Key Dates Timeline` **Data source:** Sanity CMS — updated annually without code changes

---

#### Requirements Checklist

**Content:** All required documents and criteria. Printable. **Components:** `Requirements Checklist` **Data source:** Static + `messages/en.json`

---

#### Downloadable Documents

**Content:** Application forms, ministry circulars, instruction PDFs. **Components:** Multiple `Downloadable Document Item` **Data source:** Cloudflare R2 — document uploads via admin panel

---

#### FAQ

**Content:** 8–10 most common parent questions. Expandable. **Components:** Multiple `Accordion/FAQ` **Data source:** Sanity CMS — FAQ entries

---

#### Enquiry Form

**Content:** Parent name, child name, date of birth, grade applying for, phone, email, message. **Behaviour:** Submit → Resend email to admissions office + stored in database. **Components:** `Form Section Wrapper`, multiple `Form Field Group`, `Button (primary)` **Data destination:** PostgreSQL + Resend

---

#### Dedicated Admissions Contact

**Content:** Admissions office name, dedicated phone, dedicated email, office hours. Specific — not generic school contact. **Components:** `Contact Table` **Data source:** Site settings (admin panel)

---

#### Transport and Accessibility

**Content:** Nearest transport links, landmarks, parking information. **Components:** `Rich Text Renderer` **Data source:** Static + `messages/en.json`

---

## 06 — News and Announcements (`/en/news`)

### Purpose

Prove the school is active. Parents check this regularly. Must never feel like a WordPress school blog.

### Section Map

---

#### Announcement Banner

**Content:** Active announcement if one exists. Warning/Info variant. **Behaviour:** Managed in admin panel with expiry date. Auto-hides when expired. Dismissible. **Components:** `Announcement Banner` **Data source:** Database — announcements table

---

#### Featured Article

**Content:** Most recent or manually pinned article. Large format. **Components:** `News Card (featured large)` **Data source:** Sanity CMS

---

#### Filter Bar

**Content:** Category tabs — Academic · Sports · Events · Achievements. Optional search (news-scoped only). **Components:** `Filter Bar (category tabs)`, `Search Input`

---

#### News Feed

**Content:** Filterable grid of all articles. Cover image, category badge, headline, date, excerpt per card. **Components:** Multiple `News Card (standard)`, `Pagination` **Data source:** Sanity CMS — news articles

---

#### Full Article Pages (`/en/news/[slug]`)

**Content:** Hero image, headline, date, category, body (rich text), related posts. **Design:** Editorial dignity. Not a narrow blog post. Pull quotes for important statements. **Components:** `Image Frame (featured)`, `Rich Text Renderer`, `Quote Block (pull quote)`, multiple `News Card (compact)` for related **Data source:** Sanity CMS

---

## 07 — Results Portal (`/en/results`)

### Purpose

Pure utility. Infrastructure, not experience. Must be lightning fast. Students and parents bookmark this forever.

### Design Mandate

No atmosphere. No cinematic effects. No scroll reveals. `motion/fast` interactions only. Mobile-first. Every element exists only to serve the search function.

### Section Map

---

#### Results Search Block

**Content:** Index number input, exam type selector (O/L / A/L / Scholarship), year selector. **Design:** Crystal-clear input UX. Large unambiguous labels. Users must immediately understand what to type and in what format. **Components:** `Results Search Block`

---

#### Results Display Card

**Content:** Student name, index number, exam type, year, subject results table, PDF download button, official seal/watermark. **Design:** Flat — `elevation/0`. Optimised for mobile-first. **Components:** `Results Display Card` **Data source:** Database + Cloudflare R2 (PDFs)

---

#### Past Results Archive

**Content:** List of all available results by year and exam type. Download links. **Components:** `Data Table`, multiple `Downloadable Document Item` **Data source:** Database + Cloudflare R2

---

## 08 — Facilities (`/en/facilities`)

### Purpose

Trust-building for parents evaluating the school. Every facility must feel like a _space_, not a bullet point.

### Design Note

Real photography is non-negotiable. Cinematic, clean, naturally lit, consistent colour grading.

### Section Map

One section per facility. Repeat structure for each:

---

#### Per Facility Structure

**Facilities covered:** Main Building and Grounds · Science Laboratories · ICT Laboratories · Auditorium · Sports Grounds and Stadium · Swimming Pool · Library

**Content per facility:**

- Large hero image
- Facility name
- Short atmospheric description
- Key features list
- Capacity/stats where relevant

**Components:** `Facility Card (with photo)`, `Section Header`, `Image Frame (featured)`, `Rich Text Renderer` **Data source:** Sanity CMS — facility pages

---

#### Swimming Pool — Special Treatment

**Purpose:** Serves both students and the wider community. Most practically used section. **Additional content:** Pool schedule module (not a PDF), today's session highlighted, public access hours distinct from training sessions, booking/contact info. **Components:** `Facility Card (schedule variant)`, `Pool Schedule Table` **Data source:** Database — pool schedules (managed in admin panel)

---

#### Panoramic Facility Viewer

**Content:** Panoramic images with subtle hover exploration and micro-parallax. **Design:** Not Google Street View — a curated spatial impression. Elevates facilities from description to experience. **Components:** `Panoramic Facility Viewer` **Data source:** Cloudflare R2 — panoramic images uploaded via admin panel

---

## 09 — Extracurriculars (`/en/extracurriculars`)

### Purpose

Whole-child development narrative. Head, Heart, Hand made visible.

### Design Note

Each category has a distinct visual personality while maintaining overall system consistency. Sports should not feel identical to Drama.

### Section Map

---

#### Sports Section

**Covers:** Cricket · Athletics · Football · Netball · Swimming · Table Tennis · Badminton · Chess **Content per activity:** Photo, description, recent achievements, teacher in charge, student quote, active season indicator. **Design:** Bold imagery, energy-forward. Distinct from performing arts. **Components:** Multiple `Extracurricular Card (sport)`, `Video Embed Block` **Data source:** Sanity CMS — extracurricular pages

---

#### Performing Arts Section

**Covers:** Boys Brass Band · Western Bands · Fine Arts · Drama **Content per activity:** Same structure as sports. **Design:** Softer, atmospheric, wider spacing. **Components:** Multiple `Extracurricular Card (performing arts)`, `Video Embed Block` **Data source:** Sanity CMS

---

#### Scouts Section

**Content:** Founded 1952 by Hilary Silva. 35+ President's Scout Award winners. History, current membership, how to join, achievements, teacher in charge, student quote. **Design:** Structured, disciplined. **Components:** `Extracurricular Card (leadership)`, `Video Embed Block` **Data source:** Sanity CMS

---

#### National Cadet Corps Section

**Content:** Same structure as Scouts. **Components:** `Extracurricular Card (leadership)` **Data source:** Sanity CMS

---

## 10 — Societies Hub (`/en/societies`)

### Purpose

Every student society has a home. Discovery, diversity, individuality within institutional structure.

### Design Note

Hub should feel more energetic and diverse than the rest of the site — more colour variation, more expressive imagery, richer motion, stronger personality. This section represents student individuality.

### Hub Page Section Map

---

#### Hub Grid

**Content:** All societies — Scouts, Cadets, Science Society, Sports Clubs, Drama, Fine Arts, Bands, KITS, and any others added via admin panel. **Design:** KITS card visually featured. Each card: badge, name, tagline, link. **Components:** Multiple `Society Card (hub grid)`, `Society Card (featured — KITS)` **Data source:** Sanity CMS — societies

---

### Individual Society Pages (`/en/societies/[slug]`)

---

#### Per Society Structure

|Section|Content|
|---|---|
|Banner|Full-width banner image, society name, founding year|
|About|What this society does, who it is for|
|Leadership|Current committee — photo, name, role, tenure|
|Membership|How many active members, how to join|
|Achievements|Notable wins, awards, records|
|Recent Events|Last 3 events with photos and recap|
|Gallery|Photo grid from society events|
|How to Join|Process, contact person|

**Components:** `Image Frame (full bleed)`, `Staff/Person Card (compact)` for leadership, `Gallery Album Card`, `Video Embed Block` **Data source:** Sanity CMS — society pages, all managed via admin panel

---

### KITS Page (`/en/societies/kits`)

**Special treatment — premium featured.**

|Section|Content|
|---|---|
|Hero|Cinematic — distinct from other societies|
|Overview + Mission|KITS purpose and role in KCC's digital identity|
|Featured Projects|Nexus, Paideon, and other KITS projects|
|Leadership|Current KITS committee|
|Achievements|Competition wins, recognitions|
|External Links|Deep links to standalone KITS site|

**Design:** More technical, more modern in feel — while still respecting the institutional design system. **Data source:** Sanity CMS + static content

---

## 11 — Gallery (`/en/gallery`)

### Purpose

Visual proof of school life. Archival and prestigious, not a Facebook dump.

### Design Note

Memory pacing — albums first, photos within. Progressive reveal. Each album feels intentional.

### Section Map

---

#### Featured Albums Grid

**Albums include:** Annual Prize Giving · Pasdun Cricket Battle · Science Exhibition · Cultural Day · Founder's Celebration · Sports Day · and others. **Content per album:** Cover image, event title, year, photo count, category badge. **Components:** Multiple `Gallery Album Card` **Data source:** Sanity CMS — gallery albums

---

#### Filter Bar

**Content:** Category filter (Sports / Events / Academic / Cultural / Societies), Year selector. **Components:** `Filter Bar (category tabs + year selector)`

---

#### Photo Grid

**Content:** Responsive masonry grid within selected album/filter. **Design:** Progressive load. Not a dump. **Components:** `Image Frame (standard)`, `Caption System (overlay)` **Data source:** Sanity CMS / Cloudflare R2

---

#### Lightbox

**Behaviour:** Full-screen image on click. Album navigation. Caption overlay. Keyboard and swipe support. **Components:** `Lightbox`

---

#### Video Section

**Content:** Curated video clips — max 1–3 per category. Event recaps, performances, sports moments. **Design:** Feels curated, not a YouTube feed. **Components:** `Video Frame (16:9)`, `Caption System` **Data source:** Sanity CMS — curated video links

---

## 12 — Contact (`/en/contact`)

### Purpose

Pure utility. Reduce friction. Every design decision serves the person trying to reach the school.

### Section Map

---

#### Department Contacts Table

**Content:** All contacts — Principal's Office, General, Admissions, Academics, Sports, ICT, Primary, Fax, Pool. Role, name, phone, email per row. **Components:** `Contact Table` **Data source:** Site settings (admin panel)

---

#### Google Maps Embed

**Content:** School location map. Nearby landmarks note. **Design:** Elegantly integrated — not a raw iframe. Framed in `surface/default` with `border/default`. **Components:** `Map Embed Block`

---

#### General Enquiry Form

**Content:** Name, email, subject, message. Submit → Resend email + database storage. **Components:** `Form Section Wrapper`, multiple `Form Field Group`, `Button (primary)` **Data destination:** PostgreSQL + Resend

---

#### Feedback and Complaints Form

**Content:** Name (optional — anonymous allowed), Category (Academic / Facilities / Administration / General), Message. Clear anonymity indication. **Behaviour:** Submit → Resend to designated email + stored in database with no required PII. **Components:** `Form Section Wrapper`, multiple `Form Field Group`, `Toggle Switch` (anonymous), `Button (primary)` **Data destination:** PostgreSQL + Resend

---

#### Office Hours and Emergency Contacts

**Content:** Office hours table. Emergency/priority contacts clearly separated. **Components:** `Contact Table` **Data source:** Site settings (admin panel)

---

#### Transport and Directions

**Content:** Nearest bus routes, landmarks, parking information. **Components:** `Rich Text Renderer` **Data source:** Static + `messages/en.json`

---

## 13 — 404 Page

### Purpose

Dignified interruption. Not a gimmick. Consistent with the site's identity language.

### Content

- Crest centered — loading screen animation plays on arrival
- `type/h2` — "Page Not Found"
- `type/body-sm` — "The path appears to have faded."
- Ambient embers rising
- Homepage return link — `Button (ghost)`

### Design

Same animation language as the loading screen. Continuous subtle embers. Slow glow pulse. No humor, no quirky messages. The school's 153-year identity does not break on a 404.

**Background:** `color/green/base` **Animation:** Ambient only — embers, slow pulse. No `motion/ceremonial` or above.

---

## CMS Content Ownership Map

|Content Type|Managed By|System|
|---|---|---|
|News articles|KITS admins|Sanity CMS|
|Gallery albums + photos|KITS admins|Sanity CMS + Cloudflare R2|
|Society pages + events|KITS admins|Sanity CMS|
|Staff profiles|KITS admins|Sanity CMS|
|Announcements|KITS admins|Database (admin panel)|
|Alumni profiles|KITS admins|Sanity CMS|
|FAQ entries|KITS admins|Sanity CMS|
|Results PDFs|KITS admins|Cloudflare R2 (admin panel)|
|Pool schedule|KITS admins|Database (admin panel)|
|Facility photos|KITS admins|Sanity CMS + Cloudflare R2|
|Downloadable documents|KITS admins|Cloudflare R2 (admin panel)|
|Key dates (admissions)|KITS admins|Sanity CMS|
|Site settings + contacts|KITS admins|Database (admin panel)|
|Page copy (static)|Developers|`messages/en.json`|
|Structural data|Developers|`apps/web/src/data/*.ts`|

---

_Nexus Design System — Page Specifications_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_