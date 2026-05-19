**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

Components are not UI elements. They are institutional behaviors encoded as reusable visual units. Every component must be derivable entirely from foundation tokens — no hardcoded values, no free colors, no arbitrary spacing.

**The mindset:** We are not designing screens. We are instantiating a system.

---

## Build Order

Components must be built in this exact order. Nothing in Tier 2 should be touched before Tier 1 is complete. Nothing in Tier 3 before Tier 2.

### Tier 1 — Foundation UI (everything depends on these)

Foundations → Atoms → Form System → Navigation → **Base Cards (News Card Standard + Society Card Hub)** → Section Header → Media Frame → System States

**Base Cards defined:** The News Card (Standard variant) and Society Card (Hub Grid variant) are the only Tier 1 cards. They establish the visual grammar — elevation, radius, hover behavior, badge placement, and typography hierarchy — that all other card types inherit. Build these two before any other card variant.

### Tier 2 — Page Construction

All remaining card variants → Hero Section → Filter Bar → Accordion → Timeline → Audio Player → Data Visualization → Typography Utilities → Language Switcher

### Tier 3 — Experience and Edge Systems

Admin Panel → Lightbox → Panoramic Viewer → Results Display → Cinematic Components (Loading Screen, Crest Animation) → 404 Page

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

### Language Switcher

Single compact component. Appears in the navigation bar — right side, before or after primary CTA.

|State|Visual|
|---|---|
|English active|`EN` in `type/label`, `color/gold/base`, active underline|
|Sinhala active|`සිං` in `font/sinhala` `type/label`, `color/gold/base`, active underline|
|Hover|`color/gold/hover`, `motion/fast` transition|

**Behavioral rules:**

- Switching language persists across navigation — stored in `localStorage` and applied on page load.
- In bilingual content contexts (cards, news headlines), both language versions are present in the DOM. The switcher toggles which is visible, not which is fetched.
- The Sinhala label uses `font/sinhala` — never a Latin transliteration.
- Do not place inside the mobile menu. The language switcher must be accessible before the menu opens.
- On mobile, position below the logo in the header bar — never inside the hamburger overlay.

**Bilingual content display rules:**

When a component contains bilingual content (headline, caption, card title), both versions are rendered in the markup. CSS hides the inactive language. The Sinhala version always follows Sinhala typography rules from Foundations §02.3 — minimum 1.12rem body, 1.8 line height. Never show both languages simultaneously in the same component unless it is a dedicated bilingual heading treatment (About KCC page only).

---

### Quick Access Portal Links

Prominent entry-point component. Appears on the homepage (below hero or in the header bar on desktop) and on the homepage mobile sticky bar.

|Link|Target|
|---|---|
|For Students|Student portal / timetable / results|
|For Parents|Admissions / fee info / contacts|
|For Staff|Admin panel / resources|
|Alumni|Alumni legacy block / contact|

**Visual:**

- Horizontal strip, `surface/deep` background, `border/light` bottom border
- Each link: `icon/sm` icon prefix + `type/label` uppercase label
- Hover: `color/gold/base` text, `motion/fast`
- Active/current context: `color/green/base` text, no background change

**Rules:**

- This is navigation infrastructure, not marketing. Keep it restrained — no color fills, no gradients, no elevation.
- On mobile, rendered as a 2×2 grid below the hero, not a horizontal strip.
- Do not duplicate links already prominent in the main navigation.

---

### Hero Section

The most important first-impression component in the system. Every variant is a cinematic threshold — the moment a visitor understands this is not a generic school site.

#### Variants

**Homepage Hero**

Full-viewport (`100vh`). Background: video loop or high-quality photograph. `overlay/heavy` gradient applied via `gradient/hero/deep`. School crest centered and prominent. School name in `type/display`, `text/inverse`. Tagline or motto in `type/pullquote` italic, `color/gold/base`. Primary CTA button and optional secondary CTA. Scroll indicator at bottom.

**Subpage Hero**

60–70vh. Background: photography or `color/green/base` solid. Page title in `type/h1`, `text/inverse`. Breadcrumb above title. No CTA required — the page itself is the destination. Crest watermark at low opacity in corner, optional.

**Minimal Hero**

Compact. 30–40vh or auto height. `surface/inverse` or `color/green/base` background. Page title in `type/h1`, `text/inverse`. Breadcrumb above. Used for: utility pages, contact, admissions, administration. No photography — this is infrastructure header treatment.

---

#### Crest Integration

- Homepage Hero: Crest rendered as a centered element above the school name. Gold (`color/gold/base`). May use the crest animation assembly on first load. Approximately 120–160px on desktop, 80px on mobile.
- Subpage Hero: Crest as a watermark — low opacity (`overlay/light`), positioned bottom-right or top-right. Does not compete with the title.
- Minimal Hero: No crest — too ceremonial for an infrastructure context.

---

#### Scroll Behavior

- Navigation begins transparent on all Hero variants.
- Transition to solid nav triggers when the user scrolls past the hero threshold (approximately the hero's natural bottom edge).
- Transition: `motion/standard` + `ease/out`. Background shifts from transparent to `surface/base` (light pages) or `surface/inverse` (admin).
- Scroll indicator on Homepage Hero: thin animated line or chevron at bottom center. `color/gold/base`. Fades out after first scroll event.

---

#### CTA Placement and Hierarchy

- Primary CTA: Button — Primary variant. Placed below tagline. Leads to the most important conversion action (e.g. "Explore the School" or "Apply for Admission").
- Secondary CTA: Button — Ghost variant, `color/gold/base` border and text. Below or beside primary. Optional.
- No more than two CTAs in a hero. If a third action is needed, it belongs in a section below the hero, not in it.

---

#### Background Treatment Rules

|Treatment|Permitted Variants|
|---|---|
|Video loop|Homepage Hero only. Silent, looped, no autoplay sound. Mobile falls back to poster image.|
|Photography|All variants. Image must be school-specific — no stock photography.|
|`color/green/base` solid|All variants. Used when no suitable photography is available or for certain institutional contexts.|
|`gradient/hero/deep`|Always applied over video and photography. Never used on solid color backgrounds.|
|Rainbow gradients, glassmorphism, generic stock|Forbidden. Permanently.|

---

#### Motion Specification

- Homepage Hero entry: `motion/ceremonial` + `ease/ceremonial`. Crest fades in first, then school name, then tagline, then CTAs — staggered 200ms per element.
- Subpage and Minimal Hero: `motion/slow` + `ease/out` fade-in on page load.
- Video/background: Always present immediately — no fade-in on the background itself. Only foreground elements animate in.
- Reduced motion fallback: All elements appear immediately at full opacity. No movement.

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
- Background: `green/base`
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
- Z-index: `z/loading` — always the topmost layer

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
|Hover|`motion/fast` — Primary uses `color/green/hover`, Secondary/Ghost use `color/gold/hover`|
|Active|`color/gold/active` — pressed feel|
|Disabled|40% opacity, no pointer cursor|
|Loading|Spinner replaces text, same dimensions maintained|
|Focus|`color/gold/base` outline, 2px, 3px offset — see Foundations §10.1|

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
|Focus|`color/gold/base` border, `elevation/1`, focus ring per Foundations §10.1|
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
|Open|Dropdown panel with `elevation/2`, `surface/elevated`, `z/dropdown`|
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

Single variant. `surface/inverse` background, `text/inverse` text. `type/caption`. `radius/sm`. `elevation/3`. `z/modal`. Appears on hover after 300ms delay.

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

**Base Card — Tier 1.** Establishes the foundational visual grammar for all card types.

|Variant|Usage|
|---|---|
|Featured (large)|Top of news feed — full width, large image, prominent|
|Standard|3-column grid — cover image, category badge, headline, date, excerpt|
|Compact|List view, sidebar, homepage preview — minimal layout|

**All variants:** `elevation/1` at rest, `elevation/2` on hover, `radius/md`, `motion/fast` hover transition.

---

### Event Card

|Variant|Usage|
|---|---|
|Standard|Events index — date prominent, event title, venue, time, category badge|
|Compact|Homepage upcoming events row, sidebar — minimal, date-forward|
|Featured|Top of events page — full width, extended description, RSVP/registration status|

**All variants:** `elevation/1` at rest, `elevation/2` on hover, `radius/md`, `motion/fast`.

**Date display:**

- Date is the dominant visual element. Day number in `type/h2`, `color/gold/base`. Month in `type/eyebrow`. Never buried in metadata.
- Upcoming events show relative time ("In 3 days", "Tomorrow") alongside the absolute date.

**Status indicators:**

|State|Visual|
|---|---|
|Upcoming|`semantic/info/base` badge|
|Today|`color/gold/base` badge — "Today"|
|Ongoing|`semantic/success/base` badge — "Happening Now"|
|Past|`text/muted` treatment, desaturated image — archived state|
|Registration open|`semantic/success/base` badge|
|Registration closed|`text/muted` badge|

**Key fields:** Event title, date and time, venue, organising society or department, brief description, RSVP/registration link if applicable.

---

### Society Card

**Base Card — Tier 1.** Peer to News Card Standard as one of the two foundational card patterns.

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
|Focus|Tab/keyboard|Gold outline per Foundations §10.1, no scale|

---

### Lightbox

Album navigation variant. Dark overlay (`overlay/heavy`). `z/modal`. Full-screen image. Navigation arrows. Caption overlay. Close button. Keyboard navigation (arrow keys, escape). Mobile swipe support.

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
|With results|Dropdown results panel below, `elevation/2`, `z/dropdown`|

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

Used on About KCC for section anchor navigation. Vertical list. Active section highlighted in `color/gold/base`. Sticky positioning on desktop — `z/sticky`. `type/label`.

---

### Calendar / Upcoming Events

Used on the homepage (compact) and Events index page (full).

|Variant|Usage|
|---|---|
|Mini strip|Homepage — horizontal row of next 3–5 upcoming events, compact cards|
|Month view|Events index — calendar grid, days with event indicators|
|List view|Events index — chronological list, filterable by category|

**Month view behavioral rules:**

- Current day: `color/gold/base` ring indicator
- Days with events: `color/green/base` dot below date number
- Selected day: `color/green/base` background, `text/inverse` date
- Past days: `text/muted`, reduced opacity
- Event count overflow (3+ events on one day): shows "+N more" in `type/caption`

**Data source:** Managed in Sanity CMS under an Events content type with: title, date/time, venue, category, description, registration URL, status. Updated without code changes.

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

`elevation/1`. `z/toast`. `radius/sm`. Auto-dismiss after 5s. Manual close button. Appears bottom-right. Entry: `motion/gentle` slide up. Exit: `motion/standard` fade.

---

### Progress Feedback

Used for file uploads, form submissions, save operations. Inline bar or spinner depending on context. `color/green/base` fill. Always accompanied by descriptive text.

---

### Modal

|Variant|Usage|
|---|---|
|Confirmation|Action confirmation — two buttons, concise message|
|Information|Content display — single close action|

Backdrop: `overlay/medium`. `z/overlay` on backdrop, `z/modal` on panel. Panel: `surface/elevated`, `elevation/3`, `radius/md`. Entry: `motion/slow` + `ease/ceremonial`. Exit: `motion/standard`.

---

### Dropdown Menu

|Variant|Usage|
|---|---|
|Navigation|Header nav secondary items|
|Filter|Sorting, category selection|

`surface/elevated`, `elevation/2`, `z/dropdown`, `radius/md`, `border/light`. Item hover: `surface/deep`.

---

## 08 — Data Visualization

All data rendering in the system must conform to these specifications. No ad-hoc charting libraries or inline SVG that doesn't trace to these patterns.

---

### Waveform Display

Used exclusively in the Anthem Audio Player. Represents audio amplitude over time.

**Visual:** Vertical bars, `color/gold/base`, variable height per amplitude sample. Bars not yet played: `color/gold/pale` at 60% opacity. Playhead position: thin `color/gold/base` vertical line. Bars are non-interactive — this is visualization, not a scrubbing interface. Scrubbing is handled by the progress bar below.

**Fallback:** If waveform data is unavailable, render a simplified animated pulse — 5–7 bars of varying height, `motion/gentle` loop — as an ambient visual placeholder.

---

### CountUp Animation

Used in: Stats Strip, Stat Cards. Numbers animate from 0 to their target value on first scroll into viewport.

**Rules:**

- Duration: 1800ms total. Ease: `ease/out` curve applied to the count progression, not CSS transition.
- Trigger: IntersectionObserver, threshold 0.3. Fires once per page load — never re-triggers on re-scroll.
- Number formatting: Thousand separators applied throughout animation (e.g. `1,247` not `1247`). Suffix (`+`, `%`, `Years`) appended statically — it does not animate in separately.
- Reduced motion fallback: Jump directly to final value. No animation.

---

### Comparison Bar

_(Defined in §07. Referenced here for completeness in the visualization inventory.)_

Horizontal bar chart for academic pass rates. Single series only — not for multi-series comparison. For multi-series academic data, use the Stream Comparison Table (§10).

---

### Progress Arc

Circular progress indicator for completion percentages. Used in: Admin Dashboard, Results summary.

**Visual:** SVG circle. Track: `border/light`. Filled arc: `color/green/base`. Percentage text in center: `type/h3`, `text/primary`. `elevation/0`.

**Usage note:** Only for single-metric completion. Never for multi-metric comparison.

---

### Data Table Rules

When rendering tabular data publicly (not admin), these rules apply in addition to the Admin Data Table component:

- Alternating rows: `surface/base` and `surface/default`
- No horizontal scroll on mobile — tables must either be responsive (collapsible rows) or replaced with a card list below `breakpoint/md`
- Numeric columns: right-aligned
- Text columns: left-aligned
- `type/body-sm` for all table content

---

## 09 — System States

These must be designed before any content-heavy page is assembled. Every data-driven section needs these states.

---

### Empty State Block

Used when: no search results, no news articles, no gallery photos, no data.

Contains: Centered icon (low opacity crest motif), heading in `type/h3`, description in `type/body-sm`, optional action button. Never shows raw "no results" text alone.

---

### Loading Skeleton

|Variant|Usage|
|---|---|
|Card skeleton|News cards, society cards, gallery albums, event cards|
|Table row skeleton|Admin data tables, results portal|
|Section skeleton|Full section placeholder during load|

Animation: Subtle shimmer from left to right, `color/gold/pale` at 30% opacity, `motion/gentle` loop. Not the page loading screen — this is inline content loading while the page is already interactive.

---

### Error State Block

|Variant|Usage|
|---|---|
|Inline|Below a specific failed section|
|Section-level|Full section replacement on fetch failure|

Contains: Error icon, message in `type/body-sm`, retry action. `semantic/error/surface` background. Never exposes technical error details to users.

---

### Offline Banner

Full-width strip at top of page. `surface/inverse` background. `text/inverse`. `z/sticky`. Simple message. No dismiss — persistent while offline. Flat — `elevation/0`.

---

## 10 — Typography Utilities

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

## 11 — Page-Specific Sections

These components appear on specific pages only. They use foundation tokens but contain unique layout and behavioral logic.

---

### Stats Strip (Homepage)

Four stat items: `5,000+ Students`, `200+ Staff`, `153 Years`, `200+ University Entrances Annually`.

Each item: Large number in `type/display` with `color/gold/base`, label in `type/eyebrow`. CountUp animation on first scroll into view — see §08 Data Visualization for CountUp specification. `color/green/base` background, `text/inverse`. Full-width strip.

---

### Principal's Message Block (Homepage, Administration)

Large portrait (Image Frame — Standard), name and tenure in `type/h3`, pull quote (Quote Block — Ceremonial variant), short paragraph in `type/body`, "Read Full Message" link. Two-column layout on desktop per Layout Pattern: two-thirds / one-third.

---

### Achievement Ticker (Homepage)

Slow, continuous horizontal scroll. Gold separators between items. Each item: achievement text in `type/body-sm`, year badge.

**Motion specification:** Continuous CSS `animation` — duration calculated at runtime as `(total content width in px) / 50` seconds, which produces a consistent apparent speed of approximately 50px/second regardless of content length. This is an exception to the duration token system — continuous loops cannot be expressed as one-shot transition durations. See Foundations §06.3 Rule 5.

Hover pauses scroll via `animation-play-state: paused`, `motion/fast` transition on opacity. Link to full achievements archive. Never styled like a stock ticker — elegant, not noisy.

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

### Crest Animation (About KCC, Ceremonial Moments)

**Standalone crest animation — distinct from the Loading Screen embedding.**

Used on: About KCC page header, Hero Section (Homepage), any ceremonial first-impression moment.

**Assembly sequence:**

1. Background atmosphere: `gradient/gold/subtle` expands softly — `motion/slow` + `ease/ember`
2. Crest outline appears — stroke draws in clockwise, `motion/ceremonial` + `ease/in-out`
3. Inner symbols (Lamp, Lotus, Dharmachakra, Laurel) resolve one at a time — 300ms staggered, `ease/ceremonial`
4. Gold fill floods into the crest — `motion/ceremonial` + `ease/ember`
5. Final state: `color/gold/glow` ambient pulse, 3-second loop, `motion/gentle` + `ease/ember`

**Reduced motion fallback:** Crest appears at full opacity immediately. No assembly. Ambient pulse is a static gold color.

**Usage rule:** This animation fires once per page visit. It must not fire on back-navigation or on subsequent route changes within the same session.

---

### Anthem Audio Player (About KCC)

Custom ceremonial audio component. Not a generic HTML5 player. Contains: Waveform Display (§08), play/pause control, progress bar in `color/gold/base`, lyrics displayed below in `type/body`, Sinhala script in `font/sinhala`. Feels like cultural heritage, not media playback.

---

### Alumni Legacy Block (About KCC)

Short profiles or quotes from distinguished alumni across generations. Conveys institutional continuity. Not full biographies — enough to communicate "this institution shaped real lives."

---

### Stream Comparison Table (Academics)

Four-column table — Science, Commerce, Arts, Technology. Rows: subjects, career paths, entry requirements, pass rates. `radius/md`. Alternating row colors using `surface/base` and `surface/default`. Responsive: collapses to a card-per-stream layout below `breakpoint/md`.

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

Printable checklist. Checkbox components. PDF-ready layout consideration — ensure no element bleeds across print page breaks.

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

### 404 Page

Not a browser default. A designed institutional moment.

**Concept:** A lamp that has gone dark — the user has wandered somewhere the school has not yet lit.

**Layout:**

- `surface/inverse` full-page background
- School crest centered, `color/gold/base`, at low opacity (approximately 40%) — present but dim
- Heading: `404` in `type/display`, `color/gold/base`
- Subheading: institutional tone, e.g. "This page has not been found" — `type/h3`, `text/inverse`
- Short body message in `type/body`, `text/muted` — warm, not clinical
- Single CTA: "Return to the School" — Button Ghost variant, `color/gold/base`

**Motion:** Ambient only. The crest pulses gently — `motion/gentle` + `ease/ember`, indefinite loop, low amplitude. No entrance animations on the text. The page feels still, like a room where the lights haven't been turned on yet.

**Reduced motion fallback:** Static layout. No pulse.

---

## 12 — Admin Panel Components

Admin panel uses the same token system on Compact density mode.

---

### Admin Sidebar

|State|Description|
|---|---|
|Expanded|Full labels + icons visible|
|Collapsed|Icons only — tooltip on hover|

`surface/inverse` background, `text/inverse`. Active item: `color/gold/base` accent. `type/label` for nav items. `z/sticky`.

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

Optional persistent bar at top of admin panel. Used for: ongoing uploads, save operations, background processes. `surface/inverse` background. Progress feedback component embedded. `z/sticky`.

---

_Nexus Design System — Components_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_

- add spinner component
- 