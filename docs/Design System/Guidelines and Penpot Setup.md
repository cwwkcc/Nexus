**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

A design system without discipline is just a collection of assets. This document governs how the system is used, how Penpot is structured, and how the system stays coherent as the project grows and new contributors join.

The key mindset shift: **We are not designing screens. We are instantiating a system.**

---

## 01 — Penpot File Structure

Before building anything, the Penpot file must be structured correctly. This prevents chaos as the project scales.

### Required Pages (in this order)

```
00 — Foundations
01 — Components
02 — Pages
03 — Prototypes
04 — System Notes
```

### 00 — Foundations

Contains visual reference sheets for:

- Color styles (complete token system, organized by group)
- Typography styles (full scale with live type samples)
- Spacing reference sheet (visual scale with labels)
- Elevation styles (shadow preview for each token)
- Border radius reference (all five values with examples)
- Motion notes (duration and easing values — annotated, not animated)
- Gradient whitelist (three approved gradients with visual preview)

### 01 — Components

All components organized by category matching this document:

- Global Components
- Atoms
- Form System
- Cards
- Media System
- Navigation and Filtering
- Data and Feedback
- System States
- Typography Utilities
- Page-Specific Sections
- Admin Panel

**Each component frame must include:**

- Component name as frame label
- All variants as separate sub-frames
- All states visible simultaneously (not hidden)
- Token annotations on at least one variant

### 02 — Pages

One frame per page. Built entirely from components in 01. No ad-hoc design at page level.

```
Homepage
About KCC
Administration
Academics
Admissions
News and Announcements
Results Portal
Facilities
Extracurriculars
Societies Hub
Gallery
Contact
404
```

### 03 — Prototypes

Interactive prototype connections. Linked from page frames in 02.

### 04 — System Notes

Documentation frames:

- Changelog (what changed, when, who)
- Deprecated components (what not to use and why)
- Open decisions (unresolved questions)
- Component-level animation specs (Timeline, Hero, Loading Screen)

---

## 02 — Penpot Setup Instructions

### Step 1 — Create Color Styles

In Penpot, every color must be a named style. No free hex values anywhere.

Create color styles in this exact grouping order. Use Penpot's forward-slash naming for automatic grouping:

**Primary group**

```
color/green/base
color/green/light
color/gold/base
color/gold/light
color/gold/pale
color/gold/hover
color/gold/active
color/gold/glow
```

**Surface group**

```
surface/base
surface/default
surface/deep
surface/elevated
surface/inverse
```

**Text group**

```
text/primary
text/muted
text/inverse
```

**Border group**

```
border/default
border/light
```

**Semantic group**

```
semantic/success/base
semantic/success/surface
semantic/error/base
semantic/error/surface
semantic/warning/base
semantic/warning/surface
semantic/info/base
semantic/info/surface
```

**Overlay group**

```
overlay/light
overlay/medium
overlay/heavy
```

**After creating all color styles:** Verify by selecting a rectangle and confirming every fill comes from a named style, never a raw hex value.

---

### Step 2 — Create Typography Styles

Create text styles in Penpot. Grouping:

```
type/display
type/h1
type/h2
type/h3
type/pullquote
type/body
type/body-sm
type/label
type/eyebrow
type/caption
```

For each style, configure:

- Font family (Cormorant Garamond or Source Serif 4)
- Font size (use the rem values — convert to px for Penpot: 1rem = 16px)
- Font weight
- Line height
- Letter spacing (tracking)

**Rem to px reference:**

|Token|Rem|Px equivalent|
|---|---|---|
|type/body|1.05rem|16.8px|
|type/body-sm|0.92rem|14.7px|
|type/label|0.75rem|12px|
|type/eyebrow|0.72rem|11.5px|
|type/caption|0.7rem|11.2px|

For display and heading tokens using `clamp()`, use the **middle value** as the Penpot fixed size (desktop reference):

|Token|Use in Penpot|
|---|---|
|type/display|96px|
|type/h1|72px|
|type/h2|48px|
|type/h3|36px|
|type/pullquote|28px|

---

### Step 3 — Create Elevation Styles (Shadows)

In Penpot, create shadow styles for each elevation token. Penpot uses box-shadow format.

|Style Name|X|Y|Blur|Spread|Color|Opacity|
|---|---|---|---|---|---|---|
|`elevation/0`|0|0|0|0|—|—|
|`elevation/1`|0|1|3|0|`#1C1A16`|8%|
|`elevation/2`|0|4|12|0|`#1C1A16`|10%|
|`elevation/3`|0|8|24|0|`#1C1A16`|12%|
|`elevation/4`|0|16|48|0|`#1C1A16`|14%|

---

### Step 4 — Build the Foundations Reference Sheet

Inside page `00 — Foundations`, create visual reference frames:

**Color reference frame:**

- One swatch per token
- Token name below swatch
- Group by category with headings

**Typography reference frame:**

- One text sample per token
- Show: token name, font name, size, weight, tracking, line height
- Use real sample text — not "Lorem Ipsum"
- Use: "Wisdom is All Wealth" for display/headings, actual body paragraph for body tokens

**Spacing reference frame:**

- One rectangle per spacing token showing the value visually
- Label: token name + px value

**Elevation reference frame:**

- One card silhouette per elevation token
- Shows shadow visually against `surface/base` background

---

### Step 5 — Begin Component Construction (Tier 1 only)

Do not proceed to Tier 2 or page design until every Tier 1 component is complete.

Tier 1 order:

1. Button (all variants, all states)
2. Input Field (all states)
3. Textarea
4. Select Dropdown
5. Checkbox, Radio, Toggle
6. Badge
7. Form Error Message + Inline Help Text
8. Tag/Chip
9. Eyebrow Label
10. Inline Link
11. Tooltip
12. Form Field Group
13. Section Header
14. Image Frame
15. Video Frame
16. Caption System
17. Empty State Block
18. Loading Skeleton
19. Error State Block
20. Navigation/Header
21. Mobile Menu
22. Footer

**Only after all 22 above are complete:** Begin Tier 2.

---

## 03 — Component Construction Rules

These rules apply to every component built in Penpot.

---

**Rule 1 — Tokens only** No component may contain a hardcoded color, font, size, spacing value, or shadow. Every value must reference a Penpot style. If a style doesn't exist yet, create it in Foundations first.

**Rule 2 — All states visible** When designing a component, all states must be visible in the same frame simultaneously. Not hidden. This prevents states from drifting over time when the component is modified.

**Rule 3 — Variants are real, not aesthetic** A variant exists because of a functional difference (Primary vs Secondary button), not because something "looks different." If two things look different but behave identically, they are not separate variants — they are instances with different token values.

**Rule 4 — Name precisely** Component names follow the exact naming in this document. No abbreviations, no colloquial names. `Navigation/Header — Transparent` not `nav-clear` or `header dark`.

**Rule 5 — Annotate at least once** Every component must have one annotated variant showing which token each property references. This is for future KITS members who join the project.

**Rule 6 — Spacing from scale only** Every padding, margin, and gap value in every component maps to a spacing token. If you are tempted to use 13px of padding, the answer is `space/3` (12px). Adjust the design to fit the scale.

---

## 04 — Page Design Rules

These rules apply when working in `02 — Pages`.

**Rule 1 — No ad-hoc design** Every visual element on a page must be an instance of a component from `01 — Components`. No new design happens at the page level. If you need something that doesn't exist, stop, go build the component in Tier 2 or 3, then return.

**Rule 2 — Section background rhythm** Page sections alternate between `surface/base` and `surface/default`. The pattern:

```
Hero          → color/green/base (dark, authoritative opening)
Section 1     → surface/base
Section 2     → surface/default
Section 3     → surface/base
Section 4     → surface/default
Final section → color/green/base (bookends the page)
```

**Rule 3 — Max width** All content is constrained to 1160px max width (`max-w-6xl`). Full-bleed sections (hero, certain imagery) extend to viewport width but content within them observes the 1160px constraint.

**Rule 4 — Mobile frames alongside desktop** Every page must have both a desktop frame (1440px wide) and a mobile frame (390px wide) designed simultaneously. Not after.

**Rule 5 — Real content only** No Lorem Ipsum. No placeholder images. Every frame uses real school content — real news headlines, real staff names, real statistics, real photography. This prevents the design from solving for fake content.

---

## 05 — Page Inventory Reference

Complete list of pages with routes and their section structure.

---

### Homepage (`/en`)

Hero → Stats Strip → Principal's Message → Latest News → Academic Streams → Life at KCC → Achievement Ticker → Societies Preview → Footer

**Emotional rhythm:** Identity → Proof → Authority → Activity → Structure → Humanity → Prestige → Culture → Grounding

---

### About KCC (`/en/about`)

Founding narrative (1873–present) → Dr. Kannangara and Free Education Act → Interactive Timeline → Vision/Mission/Values → Crest Explainer → Alumni Legacy → Spirit of Kannangara → Physical Heritage (archival photos) → Anthem Audio Player → Forward-looking closing statement

**Pacing note:** This page breathes slower than all others. Spacing at +1 scale step throughout. Less density. More atmosphere.

---

### Administration (`/en/administration`)

Institutional statement → Principal (large) → Deputy Principals (grid) → Assistant Principals (grid) → Head Prefects (current year) → School Development Society (visually separated subsection)

---

### Academics (`/en/academics`)

Academic culture intro → Four stream sections (Science, Commerce, Arts, Technology) → Stream Comparison Table → Student Journey Flow → Performance statistics → Real outcomes (top achievers, placements, competitions)

---

### Admissions (`/en/admissions`)

Process steps → Key dates timeline → Requirements checklist → Downloadable documents → FAQ Accordion → Enquiry form → Dedicated admissions contact → Transport and accessibility info

---

### News and Announcements (`/en/news`)

Announcement banner (if active) → Featured article → Filterable news feed (Academic / Sports / Events / Achievements) → Full article pages (`/en/news/[slug]`)

**Scoped search:** News and announcements only — never site-wide.

---

### Results Portal (`/en/results`)

Results search block → Results display card → Past results archive

**Design mandate:** Pure utility. No atmosphere. No cinematic effects. Infrastructure identity.

---

### Facilities (`/en/facilities`)

Each facility as a spatial experience section: Main building → Science labs → ICT labs → Auditorium → Sports grounds → Swimming pool (with schedule) → Library

---

### Extracurriculars (`/en/extracurriculars`)

Sports section → Performing Arts section → Scouts → Cadets

Each category has distinct visual personality while maintaining system consistency.

---

### Societies Hub (`/en/societies`)

Hub grid of all societies → KITS featured card

Individual society pages (`/en/societies/[slug]`): Banner → About → Leadership → Membership → Achievements → Recent events → Gallery → How to join

**KITS page (`/en/societies/kits`):** Premium featured treatment → overview, mission, achievements, featured projects, leadership → deep links to standalone KITS site

---

### Gallery (`/en/gallery`)

Featured albums grid → Filter bar (year, category) → Masonry photo grid → Lightbox

Albums: Annual Prize Giving, Big Match, Science Exhibition, Cultural Day, Founder's Celebration, and others. Progressive reveal — albums first, then photos within.

---

### Contact (`/en/contact`)

Department-specific contact table → Google Maps (elegantly integrated) → General enquiry form → Anonymous feedback and complaints form → Office hours → Transport and directions → Emergency contacts

---

### 404 (`/en/404`)

Loading screen animation plays on arrival → School crest centered → "Page not found" in `type/h2` → Dignified line below → Ambient embers → Homepage return link

---

## 06 — Content Management Reference

### Sanity CMS (external — not server load)

Manages: News articles, Gallery albums and photos, Society pages and events, Announcements, Staff profiles

### Database via Prisma/PostgreSQL

Stores: Admissions enquiries, Feedback submissions, Results metadata (PDFs in R2), Facility schedules

### Cloudflare R2 (external — not server load)

Stores: Gallery photos, Result PDFs, Staff profile photos, Society images

### Resend (external — not server load)

Handles: Admissions enquiry notifications, Feedback notifications, General contact form

---

## 07 — System Integrity Rules (Complete Reference)

These rules are non-negotiable. They govern every design and development decision.

**Color**

1. No free colors. Every color references a named token.
2. Cream (`surface/base`) is the default page background. `#FFFFFF` never appears.
3. Gold is ceremony, not decoration. Overuse destroys its prestige.
4. Forest green carries authority. Not for body content areas.
5. No gradients outside the approved whitelist of three.
6. Semantic colors must feel native — never imported from external design systems.

**Typography** 7. No per-component font overrides. 8. No sans-serif typefaces anywhere in the public site. 9. Weight 300 forbidden for UI labels, body copy, and anything below 20px. 10. Uppercase text always carries positive tracking. 11. Sinhala content follows multilingual spacing rules from Foundations.

**Spacing** 12. No arbitrary spacing values. Everything maps to the 4px scale. 13. Admin panel uses compact density rules, not a separate token system. 14. Editorial sections may use +1 scale step — documented exceptions, not new tokens.

**Elevation** 15. No decorative shadows. Every shadow references an elevation token tied to a use case. 16. Results portal and admin panel use `elevation/0` as default. 17. Announcement banners are always flat. 18. Gold glows and lamp lighting are animation system elements — never elevation tokens.

**Motion** 19. Utility pages (Results, Admin) use `motion/instant` and `motion/fast` only. 20. Scroll reveals use one pattern only: FadeIn + translateY(24px). 21. `motion/ceremonial` and `motion/epic` are reserved for: Loading screen, Hero, Crest only. 22. Hover states always use `motion/fast` (150ms). 23. All animations respect `prefers-reduced-motion` — fallback to opacity-only at `motion/fast`.

**Components** 24. No ad-hoc design at page level. Every element is a component instance. 25. All component states visible simultaneously in Penpot — never hidden. 26. Real content only in Penpot frames — no Lorem Ipsum.

---

## 08 — System Evolution Protocol

This system will be maintained by successive KITS members. These rules govern how it evolves.

**Adding a new token** Any new token requires: a clear institutional reason (what does it trace back to?), a documented use case (where is it used?), and a system review to confirm it doesn't duplicate an existing token.

**Adding a new component** Any new component requires: page or feature justification (which page needs this?), confirmation it cannot be composed from existing atoms, and annotation of all token usage.

**Modifying an existing token** Any token modification must be propagated to every component and page that references it. In Penpot, use the style system to ensure updates cascade. In code, CSS variables ensure the same.

**Deprecating a component** Move to `04 — System Notes → Deprecated`. Document why it was removed. Never delete — future contributors need to understand the history.

**Gradient whitelist additions** Require explicit justification and must be reviewed against the three existing approved gradients. The whitelist should remain as small as possible.

---

## 09 — Handoff to Development Reference

When design is complete and ready for development, the following mapping applies.

|Design Token|CSS Variable|Tailwind Config Key|
|---|---|---|
|`color/green/base`|`--color-green`|`green.base`|
|`color/gold/base`|`--color-gold`|`gold.base`|
|`surface/base`|`--surface-base`|`surface.base`|
|`text/primary`|`--text-primary`|`text.primary`|
|`space/4`|`--space-4`|default Tailwind `p-4`|
|`elevation/1`|`--shadow-1`|`shadow.sm`|
|`radius/sm`|`--radius-sm`|`rounded-sm`|
|`motion/fast`|`--duration-fast`|custom Tailwind|
|`ease/ceremonial`|`--ease-ceremonial`|custom Tailwind|

All tokens become CSS custom properties in `global.css`. Tailwind config extends the default theme with these custom values. No hardcoded values in component code.

---

_Nexus Design System — Guidelines and Penpot Setup_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_