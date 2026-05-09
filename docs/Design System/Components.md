**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

Components are not UI elements. They are institutional behaviors encoded as reusable visual units. Every component must be derivable entirely from foundation tokens — no hardcoded values, no free colors, no arbitrary spacing.

**The mindset:** We are not designing screens. We are instantiating a system.

---

## Build Order

Components must be built in this exact order. Nothing in Tier 2 should be touched before Tier 1 is complete. Nothing in Tier 3 before Tier 2.

### Tier 1 — Foundation UI (everything depends on these)

Foundations → Atoms → Form System → Navigation → Base Cards → Section Header → Media Frame → System States

### Tier 2 — Page Construction

All page-specific sections → Filter Bar → Accordion → Timeline → Audio Player → Data Visualization → Typography Utilities

### Tier 3 — Experience and Edge Systems

Admin Panel → Lightbox → Panoramic Viewer → Results Display → Cinematic Components (Loading Screen, Crest Animation)

---

## 01 — Global Components

Components that appear across multiple pages.

---

### Navigation / Header

|Variant|Description|
|---|---|
|Transparent overlay|Used on hero sections — sits over dark background|
|Solid|Used on all inner pages — `surface/base` background|
|Sticky-scroll transition|Transparent → Solid transition triggered on scroll past hero|
|Active section state|Highlights current section during homepage scroll|
|Current page highlight|Highlights active page in nav links|

**Behavioral notes:**

- Navigation is a reactive system element, not static UI
- Scroll-triggered background shift must use `motion/standard` + `ease/out`
- Mobile submenu depth state must be explicitly designed
- Logo: school crest + name lockup, always `color/green/base` on light, `color/gold/base` on dark
- Nav links: `type/label` — uppercase, tracked

---

### Mobile Menu

|Variant|Description|
|---|---|
|Closed|Hidden — hamburger icon visible|
|Open|Full overlay using `overlay/heavy`, links in `type/h3`|
|Submenu depth|Secondary nav level state|

---

### Footer

Single variant. Contains:

- School crest watermark (low opacity `color/gold/pale`)
- School name and founding year
- Motto in Cormorant italic
- Address, phone, email
- Quick navigation columns
- Social media links
- "Built by KITS" credit link
- Copyright line
- Background: `surface/inverse`
- Text: `text/inverse`

**Design intent:** Footer should feel like the closing page of a historical document, not a utility dump.

---

### Announcement Banner

|Variant|Token Usage|
|---|---|
|Warning|`semantic/warning/base` + `semantic/warning/surface`|
|Error|`semantic/error/base` + `semantic/error/surface`|
|Info|`semantic/info/base` + `semantic/info/surface`|

**Available as:** Dismissible (with close icon), Static (persistent)

**Rules:**

- Always flat — `elevation/0`. No shadows.
- Full-width positioning.
- Urgency comes from color and contrast, never from floating depth.
- Use sparingly — if overused, users stop respecting it.
- Toast variant (floating, dismissible) may use `elevation/1` only.

---

### Loading Screen

**Concept: The Lamp Awakens**

1. Deep forest green background (`color/green/base`)
2. School crest centered — gold (`color/gold/base`), initially unlit
3. Gold shine sweeps from top-left to bottom-right across the crest
4. Shine loops every ~3 seconds while loading continues
5. School name below in `type/label` — `color/gold/base` at 50% opacity
6. Three pulsing dots below name — `motion/gentle` pulse

**Animation spec:**

- Shine sweep: `motion/ceremonial` (1200ms) + `ease/in-out`
- Dot pulse: `motion/gentle` with staggered 200ms delay per dot
- Entry: fade in at `motion/slow`
- Exit: fade out at `motion/standard`

**Usage:** Applied to any animation-heavy or slow-loading page before content is ready.

---

### Section Header

|Variant|Elements|
|---|---|
|Eyebrow + Title|`type/eyebrow` label above `type/h2` heading|
|Eyebrow + Title + Description|Above + `type/body` description below|

**Rules:**

- Eyebrow always uppercase, `color/gold/base`, `type/eyebrow`
- Title in `type/h2`, `text/primary`
- Never center-aligned on utility pages — left-align only
- Center alignment permitted on hero-adjacent sections only

---

### Divider

|Variant|Description|
|---|---|
|Horizontal|Full width, `border/light`, 1px|
|Gold accent|Short centered line, `color/gold/base`, 2px, used after section headers|

---

### Breadcrumb

Single variant. `type/caption`, `text/muted`. Chevron separator. Current page in `text/primary`.

---

## 02 — Atoms

Smallest reusable units. Every component in the system is built from these.

---

### Button

|Variant|Description|
|---|---|
|Primary|`color/green/base` background, `text/inverse` text|
|Secondary|`surface/base` background, `color/green/base` border, `text/primary` text|
|Ghost|Transparent background, `color/gold/base` border, `color/gold/base` text|

**States for all variants:**

|State|Behavior|
|---|---|
|Default|Base appearance|
|Hover|`motion/fast` — Primary darkens, Secondary/Ghost use `color/gold/hover`|
|Active|`color/gold/active` — pressed feel|
|Disabled|40% opacity, no pointer cursor|
|Loading|Spinner replaces text, same dimensions maintained|

**Sizing:**

- Padding: `space/4` horizontal, `space/3` vertical
- Border radius: `radius/sm`
- Label: `type/label` — uppercase, tracked

---

### Badge

|Variant|Usage|
|---|---|
|Category|News categories, stream tags — `surface/default` background|
|Status|Admin status — uses semantic colors|
|Achievement|Gold accent — `color/gold/pale` background, `color/gold/active` text|

**All badges:** `type/caption`, `radius/full`, `space/2` horizontal padding

---

### Input Field

|State|Visual|
|---|---|
|Default|`border/default` border, `surface/elevated` background|
|Focus|`color/gold/base` border, `elevation/1`|
|Error|`semantic/error/base` border, error message below|
|Disabled|`surface/deep` background, `text/muted` text, no cursor|

**Rules:** `radius/sm`, `type/body`, `space/4` padding, `elevation/1` on focus

---

### Textarea

Same states as Input Field. Min height 120px. Resize: vertical only.

---

### Select Dropdown

|State|Visual|
|---|---|
|Default|Same as Input Field|
|Open|Dropdown panel with `elevation/2`, `surface/elevated`|
|Error|Same as Input Field error state|

---

### Checkbox

|State|Visual|
|---|---|
|Unchecked|`border/default` border, `surface/elevated` fill|
|Checked|`color/green/base` fill, white checkmark|
|Disabled|`surface/deep` fill, 40% opacity|

---

### Radio Button

Same states as Checkbox. Circle form factor.

---

### Toggle Switch

|State|Visual|
|---|---|
|Off|`surface/deep` track, white thumb|
|On|`color/green/base` track, white thumb|
|Disabled|40% opacity|

Transition: `motion/fast` + `ease/snap`

---

### Form Error Message

`type/caption`, `semantic/error/base` color, error icon prefix. Appears below field on error state.

---

### Inline Help Text

|Variant|Color|
|---|---|
|Default|`text/muted`|
|Success|`semantic/success/base`|
|Error|`semantic/error/base`|

`type/caption`. Appears below field. Only one state visible at a time.

---

### Eyebrow Label

`type/eyebrow`, uppercase, tracked, `color/gold/base`. Used above section titles.

---

### Tag / Chip

|State|Visual|
|---|---|
|Default|`surface/default` background, `text/muted` text|
|Active|`color/green/base` background, `text/inverse` text|

`radius/full`, `type/caption`, `space/2` vertical `space/3` horizontal

---

### Tooltip

Single variant. `surface/inverse` background, `text/inverse` text. `type/caption`. `radius/sm`. `elevation/3`. Appears on hover after 300ms delay.

---

### Inline Link

|State|Visual|
|---|---|
|Default|`color/gold/base`, underline|
|Hover|`color/gold/hover`, transition `motion/fast`|
|Visited|`color/gold/active`|

---

## 03 — Form System

---

### Form Field Group

Wraps a label + input + help text + error message as a single unit.

|Variant|Description|
|---|---|
|Standard|Vertical — label above, field below, help/error below field|
|Inline|Label left, field right — for compact admin contexts|

**Spacing:** `space/6` between field groups in a form section.

---

### Form Section Wrapper

Groups related form fields with a section heading. Separated by `space/10` from adjacent sections. Heading in `type/h3`.

---

### Form Validation Summary

Appears above the submit button when multiple errors exist.

|State|Visual|
|---|---|
|Error list|`semantic/error/surface` background, bulleted error list|
|Success|`semantic/success/surface` background, confirmation message|

---

### Progress Indicator

|Variant|Usage|
|---|---|
|Steps|Admissions process — numbered steps with completion states|
|Completion bar|File upload progress, form completion|

Steps variant: `type/label`, `color/green/base` for completed, `color/gold/base` for active, `text/muted` for upcoming.

---

### File Upload Zone

|State|Visual|
|---|---|
|Default|Dashed `border/default` border, upload icon, instruction text|
|Dragging|`color/gold/pale` background, `color/gold/base` border|
|Uploaded|File name + size, remove button, `semantic/success/base` accent|
|Error|`semantic/error/base` border, error message|

---

## 04 — Cards

---

### News Card

|Variant|Usage|
|---|---|
|Featured (large)|Top of news feed — full width, large image, prominent|
|Standard|3-column grid — cover image, category badge, headline, date, excerpt|
|Compact|List view, sidebar, homepage preview — minimal layout|

**All variants:** `elevation/1` at rest, `elevation/2` on hover, `radius/md`, `motion/fast` hover transition.

---

### Society Card

|Variant|Usage|
|---|---|
|Hub grid|Standard society grid card — badge, name, tagline|
|Featured (KITS)|Visually elevated — larger, gold accent border, prominent placement|

---

### Staff / Person Card

|Variant|Usage|
|---|---|
|Principal (large)|Full portrait, name, title, tenure, pull quote|
|Grid (deputies)|Photo + name + role + portfolio — compact grid item|
|Compact (prefects)|Photo + name + role — minimal|

---

### Academic Stream Card

Single variant. Stream icon, name, one-line description, career paths hint, link. `color/green/base` icon accent.

---

### Facility Card

|Variant|Usage|
|---|---|
|With photo|Large image, facility name, description, key features|
|Schedule variant|Pool — includes embedded schedule table|

---

### Achievement Card

|Variant|Usage|
|---|---|
|Ticker item|Compact — achievement text, year, category badge|
|Archive post|Full card — achievement, context, date, photo if available|

---

### Extracurricular Card

|Variant|Visual Personality|
|---|---|
|Sport|Bold imagery, energy-forward layout|
|Performing Arts|Softer, atmospheric — wider spacing|
|Leadership (Scouts/Cadets)|Structured, disciplined layout|

**All include:** Photo, description, recent achievements, teacher in charge, student quote, season indicator.

---

### Gallery Album Card

Album cover image, event title, year, photo count, category badge. Hover: `overlay/light` with centered icon. `radius/md`.

---

### Stat Card

|Variant|Elements|
|---|---|
|Single metric|Large number in `type/display`, label in `type/eyebrow`|
|With trend indicator|Number + Mini Trend Indicator component|

---

## 05 — Media System

All media in the system must pass through these frames. No ad-hoc image or video embedding.

---

### Image Frame

|Variant|Usage|
|---|---|
|Standard|Default — defined aspect ratio, `radius/md`|
|Featured|Full-width section images, hero adjacents — `radius/none`|
|Full bleed|Edge-to-edge — no radius, no padding, `overlay/light` available|

---

### Video Frame

|Variant|Ratio|Usage|
|---|---|---|
|16:9|16:9|Standard video embeds|
|Cinematic|21:9|Hero video, atmospheric background video|
|Embedded|Variable|Third-party embeds (YouTube, Vimeo)|

All video frames: `radius/md`, black letterbox fill, custom play button using `color/gold/base`.

---

### Caption System

|Variant|Position|
|---|---|
|Below image|Full width below frame, `type/caption`, `text/muted`|
|Overlay|Bottom of frame, `overlay/medium` background, `text/inverse`|

---

### Media Overlay Behavior

|Behavior|Trigger|Animation|
|---|---|---|
|Hover zoom|Mouse enter|Image scales 1.04, `motion/standard`|
|Lightbox trigger|Click|See Lightbox component|
|Focus|Tab/keyboard|Gold outline, no scale|

---

### Lightbox

Album navigation variant. Dark overlay (`overlay/heavy`). Full-screen image. Navigation arrows. Caption overlay. Close button. Keyboard navigation (arrow keys, escape). Mobile swipe support.

---

## 06 — Navigation and Filtering

---

### Filter Bar

|Variant|Usage|
|---|---|
|Category tabs|News, Gallery, Extracurriculars filtering|
|Year selector|Gallery, Results archive|

Active tab: `color/green/base` background, `text/inverse`. Inactive: `surface/default`, `text/muted`.

---

### Pagination

Standard numbered pagination. `radius/sm`. Current page: `color/green/base`. Arrows for prev/next.

---

### Search Input

|State|Visual|
|---|---|
|Default|Input with search icon prefix|
|Active|`color/gold/base` border, expanded|
|With results|Dropdown results panel below, `elevation/2`|

Scoped to page context only. Never site-wide. Label must clarify scope (e.g. "Search news and announcements").

---

### Accordion / FAQ

|State|Visual|
|---|---|
|Collapsed|Question + chevron down icon|
|Expanded|Question + chevron up + answer revealed|

Transition: `motion/standard` + `ease/out` height reveal. Border: `border/default`. `space/6` padding.

---

### Table of Contents

Used on About KCC for section anchor navigation. Vertical list. Active section highlighted in `color/gold/base`. Sticky positioning on desktop. `type/label`.

---

## 07 — Data and Feedback

---

### Comparison Bar

Horizontal progress-style bar for academic stream pass rates. Label left, percentage right, filled bar using `color/green/base`. `radius/sm`.

---

### Mini Trend Indicator

Compact up/down/neutral indicator. Up: `semantic/success/base` arrow. Down: `semantic/error/base` arrow. Neutral: `text/muted` dash. Used inline with stat cards.

---

### Toast Notification

|Variant|Color|
|---|---|
|Success|`semantic/success/base` + `semantic/success/surface`|
|Error|`semantic/error/base` + `semantic/error/surface`|
|Warning|`semantic/warning/base` + `semantic/warning/surface`|

`elevation/1`. `radius/sm`. Auto-dismiss after 5s. Manual close button. Appears bottom-right. Entry: `motion/gentle` slide up. Exit: `motion/standard` fade.

---

### Progress Feedback

Used for file uploads, form submissions, save operations. Inline bar or spinner depending on context. `color/green/base` fill. Always accompanied by descriptive text.

---

### Modal

|Variant|Usage|
|---|---|
|Confirmation|Action confirmation — two buttons, concise message|
|Information|Content display — single close action|

Backdrop: `overlay/medium`. Panel: `surface/elevated`, `elevation/3`, `radius/md`. Entry: `motion/slow` + `ease/ceremonial`. Exit: `motion/standard`.

---

### Dropdown Menu

|Variant|Usage|
|---|---|
|Navigation|Header nav secondary items|
|Filter|Sorting, category selection|

`surface/elevated`, `elevation/2`, `radius/md`, `border/light`. Item hover: `surface/deep`.

---

## 08 — System States

These must be designed before any content-heavy page is assembled. Every data-driven section needs these states.

---

### Empty State Block

Used when: no search results, no news articles, no gallery photos, no data.

Contains: Centered icon (low opacity crest motif), heading in `type/h3`, description in `type/body-sm`, optional action button. Never shows raw "no results" text alone.

---

### Loading Skeleton

|Variant|Usage|
|---|---|
|Card skeleton|News cards, society cards, gallery albums|
|Table row skeleton|Admin data tables, results portal|
|Section skeleton|Full section placeholder during load|

Animation: Subtle shimmer from left to right, `color/gold/pale` at 30% opacity, `motion/gentle` loop. Not the page loading screen — this is inline content loading.

---

### Error State Block

|Variant|Usage|
|---|---|
|Inline|Below a specific failed section|
|Section-level|Full section replacement on fetch failure|

Contains: Error icon, message in `type/body-sm`, retry action. `semantic/error/surface` background. Never exposes technical error details to users.

---

### Offline Banner

Full-width strip at top of page. `surface/inverse` background. `text/inverse`. Simple message. No dismiss — persistent while offline. Flat — `elevation/0`.

---

## 09 — Typography Utilities

---

### Quote Block

|Variant|Usage|
|---|---|
|Pull quote|Editorial callout within articles, about page|
|Ceremonial|Principal's message, anthem section, historical excerpts|

Pull quote: Left gold border (`color/gold/base`, 3px), `space/6` left padding, `type/pullquote`, `text/muted`.

Ceremonial: Centered, `type/pullquote` italic, `color/gold/base`, wider tracking. Used for moments of institutional weight.

---

### Rich Text Renderer

Rules for CMS-generated content (news articles, society descriptions, admin editor output):

|Element|Token|
|---|---|
|Paragraph|`type/body`, `text/primary`|
|H2 in article|`type/h2`|
|H3 in article|`type/h3`|
|Blockquote|Quote Block — Pull quote variant|
|Links|Inline Link component|
|Lists|`type/body`, `space/2` item gap|
|Bold|Weight 600, same font|
|Images|Image Frame — Standard variant|

**Critical rule:** CMS output must never introduce free font sizes, free colors, or arbitrary spacing. The renderer applies tokens only.

---

### Highlight / Emphasis System

Used for key phrases within body text. `color/gold/pale` background, `color/gold/active` text. `radius/sm`. `space/1` horizontal padding. Used sparingly.

---

## 10 — Page-Specific Sections

These components appear on specific pages only. They use foundation tokens but contain unique layout and behavioral logic.

---

### Stats Strip (Homepage)

Four stat items: `5,000+ Students`, `200+ Staff`, `153 Years`, `200+ University Entrances Annually`.

Each item: Large number in `type/display` with `color/gold/base`, label in `type/eyebrow`. CountUp animation on first scroll into view. `color/green/base` background, `text/inverse`. Full-width strip.

---

### Principal's Message Block (Homepage, Administration)

Large portrait (Image Frame — Standard), name and tenure in `type/h3`, pull quote (Quote Block — Ceremonial variant), short paragraph in `type/body`, "Read Full Message" link. Two-column layout on desktop.

---

### Achievement Ticker (Homepage)

Slow, continuous horizontal scroll. Gold separators between items. Each item: achievement text in `type/body-sm`, year badge. Hover pauses scroll. Link to full achievements archive. Never styled like a stock ticker — elegant, not noisy.

---

### Life at KCC Photo Strip (Homepage)

Curated campus photography. Horizontal scroll on mobile, arrow navigation on desktop. Categories: Sports, Events, Performances, Academic. Not a gallery link — a curated emotional glimpse.

---

### Societies Preview Row (Homepage)

Row of society cards — Scouts, Cadets, Science, Sports, Drama, Bands, KITS. Hub grid variant cards. KITS visually featured. Links to Societies Hub page.

---

### Interactive Timeline (About KCC)

**Component-level animation specification — not a token.**

Horizontal scroll through historical milestones. Each milestone: year, event title, description, archival image.

Behavioral requirements:

- Feels like traveling through eras, not clicking cards
- Era-specific atmospheric transitions (earlier eras: sepia tone, more textured; modern eras: cleaner, more vibrant)
- Subtle ambient shift per era
- Smooth parallax between content layers
- Uses `motion/slow` + `ease/ceremonial` as foundation
- Custom choreography defined above token level

---

### Crest Explainer (About KCC)

Each crest symbol (Lamp, Lotus, Dharmachakra, Laurel) annotated with meaning. Interactive — hover/tap reveals annotation. Animated connection lines. `color/gold/base` accent throughout.

---

### Anthem Audio Player (About KCC)

Custom ceremonial audio component. Not a generic HTML5 player. Contains: waveform visualization (or subtle animated bars), play/pause, progress bar in `color/gold/base`, lyrics displayed below in `type/body`, Sinhala script in `font/sinhala`. Feels like cultural heritage, not media playback.

---

### Alumni Legacy Block (About KCC)

Short profiles or quotes from distinguished alumni across generations. Conveys institutional continuity. Not full biographies — enough to communicate "this institution shaped real lives."

---

### Stream Comparison Table (Academics)

Four-column table — Science, Commerce, Arts, Technology. Rows: subjects, career paths, entry requirements, pass rates. `radius/md`. Alternating row colors using `surface/base` and `surface/default`.

---

### Student Journey Flow (Academics)

Visual flow diagram showing progression pathways and subject combinations per stream. Turns the page from informational to directional.

---

### Admissions Process Steps (Admissions)

Numbered step-by-step process. Each step: number in large `type/h2` `color/gold/base`, step title in `type/h3`, description in `type/body`. Visual connector between steps.

---

### Admissions Key Dates Timeline (Admissions)

Visual timeline of: Applications open → Submission deadline → Interview period → Selection release. Reduces cognitive load. Managed in Sanity CMS — updated annually without code changes.

---

### Requirements Checklist (Admissions)

Printable checklist. Checkbox components. PDF-ready layout consideration.

---

### Downloadable Document Item (Admissions)

File icon, document name, file type badge, download button. `surface/default` background. Used for application forms and ministry circulars.

---

### Results Search Block (Results Portal)

Prominent search input (index number), exam type selector, year selector. Crystal-clear input UX — users must immediately understand what to type and in what format. Large, unambiguous labels.

---

### Results Display Card (Results Portal)

Student name, index number, exam type, year, subject results table, PDF download button. Official seal/watermark for authenticity. Flat — `elevation/0`. Optimized for mobile-first.

---

### Pool Schedule Table (Facilities)

Elegant schedule module (not a PDF). Day columns, time rows. Today's date highlighted. Public access hours visually distinct from training sessions. Managed in admin panel.

---

### Panoramic Facility Viewer (Facilities)

Panoramic images with subtle hover exploration and micro-parallax. Not full Google Street View — a curated spatial impression. Elevates facilities from descriptions to experiences.

---

### Video Embed Block (Extracurriculars, Societies)

Video Frame component + caption + context text. Max 1–3 videos per section. Curated, not a feed.

---

### Map Embed Block (Contact)

Google Maps embed visually integrated into the design system. Not a raw iframe dropped onto the page. Framed in `surface/default` with `border/default`, `radius/md`. Nearby landmarks note below map.

---

### Contact Table (Contact)

All contacts in a structured table: role, name, phone, email. `type/body-sm`. Alternating rows. Department-specific contacts clearly labeled.

---

### Feedback Form Block (Contact)

Anonymous submission support. Fields: Name (optional), Category (Academic/Facilities/Administration/General), Message. Submit stores in DB + sends via Resend. No PII required for anonymous submissions. Clear anonymity indication.

---

## 11 — Admin Panel Components

Admin panel uses the same token system on Compact density mode.

---

### Admin Sidebar

|State|Description|
|---|---|
|Expanded|Full labels + icons visible|
|Collapsed|Icons only — tooltip on hover|

`surface/inverse` background, `text/inverse`. Active item: `color/gold/base` accent. `type/label` for nav items.

---

### Admin Dashboard Card

|Variant|Usage|
|---|---|
|Stat|Metric + label + trend indicator|
|Quick action|Icon + action label + arrow|

`elevation/1`. `radius/md`. Compact density.

---

### Data Table

|Variant|Features|
|---|---|
|Default|Column headers, row data, `border/light` dividers|
|Sortable|Clickable headers with sort direction indicator|
|With actions|Row-level action buttons (view, edit, delete)|

Alternating row: `surface/base` and `surface/default`. Header: `surface/deep`. `type/body-sm`.

---

### Status Badge

|Variant|Color|
|---|---|
|Draft|`semantic/warning/base`|
|Published|`semantic/success/base`|
|Archived|`text/muted`|
|Unread|`semantic/info/base`|
|Reviewed|`semantic/success/base`|

`radius/full`. `type/caption`. Used in data tables and list views.

---

### Rich Text Editor Wrapper

Visual frame for the Sanity CMS editor embedded in admin. Styled to match system, not raw browser defaults.

---

### Admin Form Section

Groups related admin form fields with a clear heading. Compact density spacing. `border/light` separator between sections.

---

### Global Status Bar

Optional persistent bar at top of admin panel. Used for: ongoing uploads, save operations, background processes. `surface/inverse` background. Progress feedback component embedded.

---

_Nexus Design System — Components_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_