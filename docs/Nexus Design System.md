# Nexus Design System

**The official digital identity of C.W.W. Kannangara Central College** _Built by Kannangara ICT Society (KITS)_

---

## Why This Document Exists

Nexus is not a student project. It is the digital face of Sri Lanka's first Central College — a 153-year-old National School that changed the educational destiny of this nation. Every design decision must be worthy of that institution.

This document exists so that any KITS member, at any time, can open it and understand not just _how_ the design works, but _why_ every decision was made. The "why" always traces back to the school's identity, history, and values.

---

## The Design Direction — Royal Institution

The single phrase that governs all visual decisions: **Royal Institution.**

Not modern. Not playful. Not startup. Not generic educational.

**Royal Institution** means:

- Warm, not clinical
- Authoritative, not imposing
- Timeless, not trendy
- Specific to KCC, not replicable by any other school

The physical school — cream walls, green lawns, warm light through tall windows, brass crests on blazers — is the reference point. The website should feel like walking into that environment, not opening a web app.

**The test for every design decision:** Could this design element appear on any other school's website? If yes, it needs to change.

---

## Brand Foundation

Before touching any color or font, understand these five things about KCC:

1. **The motto is** _Panna Naranam Ratanam_ — Wisdom is All Wealth. Gold in the design is the visual expression of this wisdom.
    
2. **The crest is the center of everything.** The lamp, the lotus, the dharmachakra, the laurel — these symbols appear as motifs throughout. Nothing is decorative for its own sake.
    
3. **Green is earned, not chosen.** The "Men in Green" identity in sports, the green uniform, the forest green of the school grounds — it is a color the school has claimed through 153 years of history.
    
4. **The school is warm, not cold.** The physical campus is warm cream and natural wood and aged stone. The website should feel the same. Never pure white. Never cold grey.
    
5. **Dr. Kannangara's story is always present.** The year 1873 lives in the background of the hero section. The ghost layer. The founding year as structural architecture. It is never decorative — it is always meaningful.
    

---

## Color System

Every color in this palette traces back to something real about KCC.

### Primary Palette

|Token|Hex|Origin|
|---|---|---|
|`green`|`#1A4A2E`|The school's forest — the uniform, the playing fields, the "Men in Green"|
|`green-light`|`#235C3A`|Hover state — slightly lighter forest green|
|`gold`|`#C9973A`|The lamp of knowledge in the crest. Earned achievement.|
|`gold-light`|`#E8B84B`|Highlights — the shimmer of the lamp flame|
|`gold-pale`|`#F2D98A`|Subtle gold tints for decorative use|

### Surface Palette

|Token|Hex|Origin|
|---|---|---|
|`base`|`#F7F3EC`|The cream walls of the school building — warm, aged paper|
|`surface`|`#EDE8DF`|Slightly deeper cream for cards and sections|
|`surface-deep`|`#E4DDD1`|Deepest surface — for maximum contrast within the cream family|

### Text Palette

|Token|Hex|Notes|
|---|---|---|
|`text-dark`|`#1C1A16`|Near-black with warmth — never pure `#000`|
|`text-muted`|`#5C5647`|Body copy, captions — warm mid-grey|

### Border Palette

|Token|Hex|Notes|
|---|---|---|
|`border`|`#D4C9B8`|Standard borders — subtle, warm grey-cream|
|`border-light`|`#E2D9CC`|Dividers — even subtler|

### Scroll-Linked Warmth

As the user scrolls, the page background subtly warms — like moving toward a light source. Implemented via:

```css
background-color: hsl(38, 47%, calc(94% - calc(var(--scroll-warmth) * 0.25%)));
```

`--scroll-warmth` is set (0–20) via a passive scroll listener. The effect is subliminal. Nobody will articulate it — but the page feels alive.

### What We Don't Use

The school's previous digital palette — Ottoman (`#f3fcf4`), Dove Gray (`#6a6a6a`), White (`#ffffff`) — is a generic palette with no connection to the institution. Nexus replaces it entirely.

---

## Typography

Typography carries the weight of 153 years. This is the most important design decision in the system.

**The rule:** Never use Inter, Roboto, Arial, or any sans-serif as the primary face. Only serif carries this weight.

### Font Stack

|Token|Font|Character|
|---|---|---|
|`font-display`|**Cormorant Garamond**|Aristocratic, literary, the voice of the institution. Used for all hero text, large headings, pull quotes, and the large numerals (1873, 5000+).|
|`font-heading`|**DM Serif Display**|Modern serif with personality. Used for section headings and card titles.|
|`font-body`|**Source Serif 4**|Readable, editorial, never clinical. Used for all body copy, labels, and UI elements.|

All three are Google Fonts, loaded in `global.css`.

### Why Cormorant Garamond?

When you see "1873" set in Cormorant Garamond at 400px, it doesn't look like a date. It looks like a founding. The font was chosen because it carries the weight of the institution without performing it.

### Type Scale

|Usage|Size|Weight|Font|
|---|---|---|---|
|Hero title|`clamp(4rem, 10vw, 9rem)`|600|`font-display`|
|Page heading|`clamp(3rem, 7vw, 6rem)`|600|`font-display`|
|Section title|`clamp(2rem, 4vw, 3rem)`|500|`font-display`|
|Facility heading|`clamp(1.8rem, 3vw, 2.8rem)`|500|`font-display`|
|Eyebrow|`0.72rem`|300|`font-body` · `tracking-[0.28em]` · uppercase|
|Body|`1.05rem`|300|`font-body` · `leading-[1.9]`|
|Body small|`0.92rem`|300|`font-body`|
|UI label|`0.7rem`|300|`font-body` · `tracking-[0.15em]` · uppercase|
|Caption|`0.65rem`|300|`font-body` · `tracking-[0.2em]` · uppercase|

### The Eyebrow Pattern

Every section on every page begins with an eyebrow label — small, uppercase, gold, wide tracking. This creates a consistent visual rhythm across the entire site.

```tsx
<span className="block font-body text-[0.72rem] font-light tracking-[0.28em] uppercase text-gold mb-4">
  Our Story
</span>
```

---

## The Ghost Layer

The most distinctive visual element of the Nexus design. Large, near-invisible text in the background of hero sections — opacity ~3–4%. Not meant to be read. Meant to be felt.

On the homepage hero: `1873` — the founding year of the institution, literally present behind everything. On the About page: `1873` again — the age of the institution as structural architecture. On Contact and Facilities hero sections: `KCC` — the institution's presence in its own spaces.

```tsx
<div
  className="absolute font-display font-bold text-white/[0.03] pointer-events-none whitespace-nowrap select-none"
  style={{
    fontSize: 'clamp(18vw, 28vw, 360px)',
    letterSpacing: '-0.06em',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
  }}
>
  1873
</div>
```

This cannot be replicated by any other school without looking stolen — because `1873` belongs to KCC.

---

## Layout System

### Max Width

`max-w-6xl` (1160px) — wide enough to breathe, narrow enough to feel composed.

### Section Padding

`py-24 px-8` — generous vertical rhythm, modest horizontal padding.

### Background Rhythm

Sections alternate between `bg-base` and `bg-surface` to create visual rhythm without hard borders:

```
Hero          → bg-green  (dark, authoritative opening)
Section 1     → bg-base
Section 2     → bg-surface
Section 3     → bg-base
Section 4     → bg-surface
Final section → bg-green  (dark, closing — bookends the page)
```

### Grid Patterns

|Pattern|Tailwind|
|---|---|
|Two column equal|`grid-cols-1 lg:grid-cols-2`|
|Content weighted right|`grid-cols-1 lg:grid-cols-[1fr_1.5fr]`|
|Content weighted left|`grid-cols-1 lg:grid-cols-[1.5fr_1fr]`|
|Portrait + biography|`grid-cols-1 md:grid-cols-[320px_1fr]`|
|Four equal columns|`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`|

---

## Animation Principles

### Tools

- **Framer Motion** — all animations. No raw CSS keyframes.
- `@nexus/ui` hooks — `useInView`, `useCountUp`, `useOrbit`, `useMouseParallax`
- `FadeIn` component — standard scroll-triggered reveal

### The Rule

**Animations serve the institution — not the user, not the developer.**

Every animation on Nexus is tied to something specific about KCC:

- The 1873 ghost layer — the founding year, always present
- The orbital carousel — the crest at the center; everything orbits it
- The gold shimmer — the lamp flame, catching light
- The CountUp numbers — 1873, 5000+, 153 — earned through history, not just displayed

None of these animations can be replicated by another school without looking stolen. That is the point.

### Animation by Page Type

|Page Type|Animation Level|Reasoning|
|---|---|---|
|Homepage hero|Full suite|This is where KCC makes its first impression|
|About hero|Full suite|Heritage page — the animations carry history|
|Utility pages (Contact, Facilities)|FadeIn only|User came for information, not spectacle|
|Forms|Transition states only|Never animate something a user is trying to complete|

### Standard Entrance

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
/>
```

### Scroll Reveal (FadeIn component)

```tsx
<FadeIn delay={100} direction="up">
  {/* content */}
</FadeIn>
```

### CountUp (milestone numbers)

```tsx
<StatItem target={1873} label="Year Founded" />
<StatItem target={5000} suffix="+" label="Students" />
```

---

## Component Library — `@nexus/ui`

Shared across `apps/web` and `apps/admin`. Located at `packages/ui/src/`.

### Hooks

|Hook|Signature|Usage|
|---|---|---|
|`useInView`|`(threshold?) → { ref, inView }`|Triggers when element enters viewport|
|`useCountUp`|`(target, inView, duration?) → count`|Animates number from 0 to target|
|`useOrbit`|`({ speed?, paused? }) → angle`|Continuous angle for orbital animations|
|`useMouseParallax`|`({ stiffness?, damping? }) → { springX, springY, handlers }`|Mouse-driven spring parallax|

### Components

|Component|Key Props|Usage|
|---|---|---|
|`FadeIn`|`delay`, `direction`, `className`|Scroll-triggered fade reveal|
|`StatItem`|`target`, `suffix`, `label`|CountUp number with label|
|`OrbitalPanel`|`index`, `total`, `angle`, `panel`, `orbitRadius`|Single panel in homepage orbital carousel|
|`FormField`|`label`, `name`, `type`, `value`, `onChange`, `error`|Styled input with label and error state|
|`FormSelect`|`label`, `name`, `value`, `options`, `onChange`, `error`|Styled select with label and error state|

---

## Forms & Security

All forms on Nexus follow a five-layer security model:

|Layer|Implementation|
|---|---|
|Validation|Zod schema — `apps/web/src/lib/schemas/`|
|Rate limiting|Upstash Redis — 5 submissions / IP / hour|
|Bot protection|Honeypot hidden field|
|Server execution|Next.js Server Actions (`'use server'`)|
|Env validation|`apps/web/src/lib/env.ts` — crashes loudly on missing keys|

### Form Styling

```tsx
// Input
"px-4 py-3 border border-border bg-base font-body font-light text-text-dark text-[0.92rem] placeholder:text-border focus:outline-none focus:border-green transition-colors duration-150"

// Submit button
"px-10 py-3.5 bg-green text-white font-body font-normal text-[0.85rem] tracking-[0.12em] uppercase hover:bg-green-light transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
```

---

## Data Architecture

```
apps/web/src/
  data/           ← structural data (IDs, keys, numbers, URLs — never translatable)
    about.ts
    home.ts
    contact.ts
    facilities.ts
  lib/
    env.ts        ← environment variable validation
    ratelimit.ts  ← Upstash rate limiter instance
    schemas/      ← Zod validation schemas
  app/
    actions/      ← Next.js Server Actions
messages/
  en.json         ← all English translations (structured by page → section → key)
```

### The Split Rule

- **`data/*.ts`** — anything structural: IDs, ordering, numbers, image paths, URLs, constants
- **`messages/en.json`** — anything a user reads: titles, descriptions, labels, quotes

This split means adding Sinhala or Tamil in the future requires only creating `messages/si.json` — zero code changes.

---

## i18n

|Setting|Value|
|---|---|
|Package|`next-intl` v4|
|Locales|`en` (live), `si` (future), `ta` (future)|
|Default|`en`|
|URL pattern|`cwwkcc.lk/en/about`, `cwwkcc.lk/si/about`|
|Middleware|`apps/web/src/proxy.ts`|
|Config|`apps/web/src/i18n/request.ts`|
|Routing|`apps/web/src/i18n/routing.ts`|

Usage in pages:

```tsx
const t = useTranslations('about');
t('hero.heading')          // "About"
t('timeline.milestones.founding.title')  // "The First Central College"
```

---

## Page Inventory

|Page|Route|Status|
|---|---|---|
|Homepage|`/en`|Hero done · remaining sections in progress|
|About|`/en/about`|Done|
|Contact|`/en/contact`|Done|
|Facilities|`/en/facilities`|Done|
|Admissions|`/en/admissions`|Planned|
|Academics|`/en/academics`|Planned|
|News|`/en/news`|Planned|
|Results Portal|`/en/results`|Planned|
|Extracurriculars|`/en/extracurriculars`|Planned|
|Societies Hub|`/en/societies`|Planned|
|KITS|`/en/societies/kits`|Planned|
|Gallery|`/en/gallery`|Planned|
|Administration|`/en/administration`|Planned|
|404|—|Planned|

---

## Tech Stack

|Layer|Technology|Notes|
|---|---|---|
|Framework|Next.js 16 (App Router)|SSG/SSR, image optimization|
|Monorepo|Nx + pnpm|Consistent tooling|
|Styling|Tailwind CSS|Utility-first, design tokens in config|
|Animations|Framer Motion|All motion — no raw CSS keyframes|
|i18n|next-intl v4|EN live, SI/TA infrastructure ready|
|Forms|Zod + Server Actions|Validated, rate-limited, secure|
|Email|Resend|Form submissions|
|Rate Limiting|Upstash Redis|Bot and spam protection|
|Database|PostgreSQL + Prisma|On Hetzner, separate from Paideon DB|
|API|tRPC|Type-safe, no REST boilerplate|
|Auth|NextAuth.js|Admin panel — migrates to Paideon SSO later|
|File Storage|Cloudflare R2|Served from CF edge — no server load|
|CMS|Sanity.io|News, gallery, societies — visual editing|
|Hosting|Hetzner CX32|Shared with Paideon, separate Docker containers|
|Reverse Proxy|Caddy|Auto HTTPS, all domain routing|
|CI/CD|GitHub Actions|Auto deploy on push to main|

---

## Monorepo Structure

```
nexus/
├── apps/
│   ├── web/              ← public school website
│   │   ├── src/
│   │   │   ├── app/[locale]/   ← all pages
│   │   │   ├── data/           ← structural data
│   │   │   ├── lib/            ← env, ratelimit, schemas
│   │   │   └── i18n/           ← next-intl config
│   │   └── messages/en.json    ← translations
│   └── admin/            ← KITS admin dashboard
├── packages/
│   ├── ui/               ← shared components and hooks
│   ├── api/              ← tRPC routers
│   ├── database/         ← Prisma schema
│   └── config/           ← shared configs
└── docs/
    ├── KCC_BRAND.md      ← school identity reference
    ├── DESIGN.md         ← this document
    └── Nexus Plan.md     ← original project plan
```

---

## The Standard

> _"Nexus is itself proof of the Head, Heart, Hand philosophy. Students applying their technical skills (Hand), their intellectual rigour (Head), and their commitment to the institution (Heart) to serve the community."_

Every component we build, every page we design, every animation we write — it should be worthy of the institution it represents. The school that started the Free Education movement in Sri Lanka deserves a digital home that reflects 153 years of that commitment.

Build accordingly.

---

_Maintained by Kannangara ICT Society_ _C.W.W. Kannangara Central College, Mathugama_ _© 2026_