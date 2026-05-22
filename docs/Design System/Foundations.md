**C.W.W. Kannangara Central College, Mathugama** _Maintained by Kannangara ICT Society (KITS)_

---

## Philosophy

This is not a style guide. It is a behavioral specification for KCC's digital identity.

Every token in this document traces back to something physically real about the institution — the cream walls, the forest green uniform, the brass lamp in the crest, the aged stone of the main building. Nothing is decorative for its own sake.

**The single governing phrase:** Royal Institution.

Not modern. Not playful. Not startup. Not generic educational.

**The test for every design decision:** Could this appear on any other school's website? If yes, it must change.

---

## 01 — Color System

### Core Principle

Every color traces back to something real about KCC. No free colors are permitted anywhere in the system. Every value must reference a named token.

---

### 01.1 — Primary Palette

|Token|Hex|Origin|
|---|---|---|
|`color/green/base`|`#1A4A2E`|The school uniform, playing fields, "Men in Green"|
|`color/green/hover`|`#235C3A`|Hover state — slightly lighter forest green|
|`color/gold/base`|`#C9973A`|The lamp of knowledge in the crest|
|`color/gold/light`|`#E8B84B`|Highlights — shimmer of the lamp flame|
|`color/gold/pale`|`#F2D98A`|Subtle gold tints for decorative use|

**Note on naming:** `color/green/hover` follows the same behavior-semantic convention as `color/gold/hover` and `color/gold/active`. Shade descriptors (e.g. "light") are not used — every interactive state token is named for its role, not its appearance.

---

### 01.2 — Surface Palette

|Token|Hex|Origin|
|---|---|---|
|`surface/base`|`#F7F3EC`|Cream walls of the school building|
|`surface/default`|`#EDE8DF`|Cards and section backgrounds|
|`surface/deep`|`#E4DDD1`|Maximum contrast within the cream family|
|`surface/elevated`|`#F3EEE6`|Floating cards, dropdowns, modals|
|`surface/inverse`|`#22201B`|Dark sections, hero, footer|

---

### 01.3 — Text Palette

|Token|Hex|Usage|
|---|---|---|
|`text/primary`|`#1C1A16`|Primary text — near-black with warmth, never pure #000|
|`text/muted`|`#5C5647`|Body copy, captions, secondary text|
|`text/inverse`|`#F5EFE4`|Text on dark/inverse surfaces|

---

### 01.4 — Border Palette

|Token|Hex|Usage|
|---|---|---|
|`border/default`|`#D4C9B8`|Standard borders|
|`border/light`|`#E2D9CC`|Dividers, subtle separators|

---

### 01.5 — Interactive Gold States

|Token|Hex|Usage|
|---|---|---|
|`color/gold/hover`|`#D6A645`|Button hover, link hover, icon hover|
|`color/gold/active`|`#B7852F`|Pressed states, active navigation items|
|`color/gold/glow`|`rgba(201,151,58,0.28)`|Crest glow, hero highlights, loading screen only|

---

### 01.6 — Semantic Colors

All semantic colors are deliberately muted and warm. They must feel native to the palette — never imported Bootstrap or Material colors.

#### Success

|Token|Value|Usage|
|---|---|---|
|`semantic/success/base`|`#3F6B4B`|Muted institutional green|
|`semantic/success/surface`|`#E6F0E8`|Success alert background|

#### Error

|Token|Value|Usage|
|---|---|---|
|`semantic/error/base`|`#8A3B32`|Deep seal-wax red|
|`semantic/error/surface`|`#F6E8E5`|Error alert background|

#### Warning

|Token|Value|Usage|
|---|---|---|
|`semantic/warning/base`|`#B07A2B`|Amber-brass warning tone|
|`semantic/warning/surface`|`#FAF1DE`|Parchment warning background|

#### Info

|Token|Value|Usage|
|---|---|---|
|`semantic/info/base`|`#4A6475`|Muted slate-blue — use sparingly|
|`semantic/info/surface`|`#EAF0F4`|Info background|

---

### 01.7 — Overlay / Scrim System

Overlay base color is always `text/primary` (`#1C1A16`) — preserves warmth, never cold black.

|Token|Value|Usage|
|---|---|---|
|`overlay/light`|`rgba(28,26,22,0.32)`|Image readability, soft hero overlays|
|`overlay/medium`|`rgba(28,26,22,0.56)`|Modals, navigation drawers, gallery transitions|
|`overlay/heavy`|`rgba(28,26,22,0.78)`|Lightbox, cinematic intro states, dramatic hero moments|

---

### 01.8 — Approved Gradient Whitelist

**Critical rule: No gradients outside this whitelist are permitted. Ever.**

New gradients require a formal system update — not individual designer judgment.

|Token|Value|Usage|
|---|---|---|
|`gradient/gold/subtle`|`linear-gradient(135deg, rgba(201,151,58,0.18), rgba(26,74,46,0.0))`|Crest glow, section accents|
|`gradient/hero/deep`|`linear-gradient(180deg, rgba(26,74,46,0.0) 0%, rgba(26,74,46,0.72) 100%)`|Hero bottom fade, image overlays|
|`gradient/overlay/fade`|`linear-gradient(180deg, rgba(28,26,22,0.0) 0%, rgba(28,26,22,0.56) 100%)`|Card image overlays, gallery items|

---

### 01.9 — Color Usage Rules

**Gold Rule** Gold is accent and ceremony. Never use as a primary background color or body text color. If gold appears everywhere, it loses prestige. Reserve for: headings on dark surfaces, accents, borders on featured elements, animations.

**Green Rule** Forest green carries authority and institutional identity. Use for: primary navigation, hero sections, footer, ceremonial moments. Not for large body content areas.

**Cream Rule** Cream must dominate overall page surfaces. This preserves readability, elegance, and warmth. Never use pure white (#FFFFFF) anywhere in the system.

**Dark Mode** Full dark mode is not part of this system. The cream aesthetic is core to KCC's institutional identity. "Contextual darkness" is permitted — certain sections (hero, footer, about page moments) use `surface/inverse` atmospherically. The system remains light-first.

---

## 02 — Typography System

### Core Principle

Typography carries the weight of 153 years. It must feel editorial and authoritative, not decorative. Every decision optimizes for authoritative elegance, not luxury fragility.

**Absolute rule:** Never use Inter, Roboto, Arial, or any sans-serif as a primary typeface. Only serif carries this institutional weight.

---

### 02.1 — Font Stack

|Token|Typeface|Character|Load|
|---|---|---|---|
|`font/display`|Cormorant Garamond|Aristocratic, literary, the institutional voice|Google Fonts|
|`font/body`|Source Serif 4|Readable, editorial, never clinical|Google Fonts|
|`font/sinhala`|Noto Serif Sinhala|Serif-compatible Sinhala for tonal harmony|Google Fonts|

**DM Serif Display is explicitly removed from the system.** Cormorant Garamond carries all heading and display work. Two competing display serifs weaken identity cohesion.

---

### 02.2 — Type Scale

|Token|Size|Weight|Font|Tracking|Line Height|
|---|---|---|---|---|---|
|`type/display`|`clamp(4rem, 10vw, 9rem)`|600|Cormorant Garamond|-0.02em|0.92|
|`type/h1`|`clamp(3rem, 7vw, 6rem)`|600|Cormorant Garamond|-0.01em|0.98|
|`type/h2`|`clamp(2rem, 4vw, 3rem)`|500|Cormorant Garamond|0|1.05|
|`type/h3`|`clamp(1.35rem, 2.2vw, 1.85rem)`|500|Cormorant Garamond|0|1.1|
|`type/pullquote`|`clamp(1.2rem, 2vw, 1.6rem)`|500|Cormorant Garamond|0.01em|1.3|
|`type/body`|`1.05rem`|400|Source Serif 4|0|1.7|
|`type/body-sm`|`0.92rem`|400|Source Serif 4|0|1.6|
|`type/label`|`0.75rem`|500|Source Serif 4|0.15em|1.4|
|`type/eyebrow`|`0.72rem`|500|Source Serif 4|0.28em|1.4|
|`type/caption`|`0.7rem`|400|Source Serif 4|0.2em|1.4|

---

### 02.3 — Sinhala Typography Rules

Sinhala letterforms breathe differently from Latin. These rules are mandatory when Sinhala content is present.

|Rule|Latin|Sinhala|
|---|---|---|
|Body size|1.05rem|1.12rem minimum|
|Body line height|1.7|1.8|
|Small text line height|1.6|1.7|
|Minimum size|0.7rem|0.8rem|

**Font pairing:** Noto Serif Sinhala (`font/sinhala`) must always accompany Cormorant Garamond and Source Serif 4 in multilingual layouts. Never use a sans-serif Sinhala font — it breaks tonal continuity.

---

### 02.4 — Typography Rules

1. No per-component font overrides. Every typeface assignment comes from the token system.
2. Cormorant Garamond is locked for all heading and display work.
3. Source Serif 4 is locked for all body, label, and UI text.
4. Ultra-thin weights (100, 200) are forbidden — they collapse readability on mobile.
5. Weight 300 is only permitted for large decorative text, never for UI labels or body copy.
6. Uppercase text always carries positive tracking — never tight-tracked uppercase.

---

## 03 — Spacing System

### Core Principle

A single 4px base unit. Everything is a multiple. No arbitrary spacing values are permitted anywhere in the system.

4px maps cleanly to standard screen densities and Tailwind's default spacing scale.

---

### 03.1 — Spacing Scale

|Token|Value|Tailwind|Primary Usage|
|---|---|---|---|
|`space/1`|4px|`p-1`|Icon padding, tight internal gaps|
|`space/2`|8px|`p-2`|Inner element spacing|
|`space/3`|12px|`p-3`|Compact component padding|
|`space/4`|16px|`p-4`|Standard component padding|
|`space/5`|20px|`p-5`|Comfortable component padding|
|`space/6`|24px|`p-6`|Card padding, form fields|
|`space/8`|32px|`p-8`|Section sub-spacing|
|`space/10`|40px|`p-10`|Component separation|
|`space/12`|48px|`p-12`|Major component separation|
|`space/16`|64px|`p-16`|Section padding — mobile|
|`space/20`|80px|`p-20`|Section padding — tablet|
|`space/24`|96px|`p-24`|Section padding — desktop|
|`space/32`|128px|`p-32`|Hero breathing room|
|`space/40`|160px|`p-40`|Maximum editorial spacing|

---

### 03.2 — Spacing Behavioral Rules

**Rule 1 — Section rhythm** Every page section uses `space/24` vertical padding on desktop, `space/16` on mobile. No exceptions unless explicitly overridden for cinematic sections.

**Rule 2 — Component internal spacing** Components never use arbitrary padding. A card is always `space/6` internal padding. A button is always `space/4` horizontal, `space/3` vertical.

**Rule 3 — Editorial elevation** About page, hero sections, and Principal's message use one step up from standard — `space/32` where standard is `space/24`. This creates the slower, atmospheric pacing those pages require.

**Rule 4 — Contextual multipliers** Certain contexts are allowed to scale spacing upward by one step:

- Hero sections → +1 scale step
- About KCC page → +1 scale step
- Principal's message → +1 scale step
- Societies hub feature areas → +0.5–1 step selectively

Tokens remain unchanged — only usage rules change.

---

### 03.3 — Density Modes

The spacing token system is universal. Density is controlled by usage rules, not separate tokens.

**Default Mode (Public Site)**

- Generous spacing
- Editorial rhythm
- Atmospheric breathing room
- Maximum section spacing: `space/24`+

**Compact Mode (Admin Panel)**

- Same tokens
- Constrained usage rules
- Maximum section spacing: `space/12`
- Default component padding: `space/4` or `space/5`
- Reduced vertical rhythm

---

## 04 — Border Radius System

### Core Principle

KCC should not feel like an app. Sharp, architectural edges reflect the physical reality of the institution — stone, brass, aged wood. Rounded corners carry associations with consumer software.

The dominant radius is `radius/sm` and `radius/none`.

---

### 04.1 — Radius Scale

|Token|Value|Usage|
|---|---|---|
|`radius/none`|0px|Hero elements, crest containers, formal section borders, modal headers|
|`radius/sm`|2px|Buttons, form fields, chips, tags — primary interactive radius|
|`radius/md`|4px|Cards, panels, dropdowns — most common surface radius|
|`radius/lg`|8px|Image containers, modals, lightbox frames|
|`radius/full`|9999px|Pills, badges, avatar circles only|

**Note:** `radius/md` (4px) will become the most frequently used token in practice, as it applies to most cards and surface containers. This is acceptable — the system's architectural character comes from the absence of larger radii, not from avoiding `radius/md`.

---

## 05 — Elevation System

### Core Principle

Shadows are environmental depth cues, not decorative effects. Each elevation tier is tied to a specific behavioral use case. Shadows use `text/primary` as their base color to preserve warmth.

No colored shadows. No gold glow shadows. Those belong to the animation system, not elevation.

---

### 05.1 — Elevation Scale

|Token|Value|Usage|
|---|---|---|
|`elevation/0`|none|Flat sections, surface-on-surface, admin default|
|`elevation/1`|`0 1px 3px rgba(28,26,22,0.08)`|Cards at rest, input fields, subtle separation|
|`elevation/2`|`0 4px 12px rgba(28,26,22,0.10)`|Hovered cards, active dropdowns|
|`elevation/3`|`0 8px 24px rgba(28,26,22,0.12)`|Modals, floating panels|
|`elevation/4`|`0 16px 48px rgba(28,26,22,0.14)`|Hero elements, cinematic overlays|

---

### 05.2 — Elevation Usage Rules

**Public site:** Layered, atmospheric, controlled depth. Cards use `elevation/1` at rest, `elevation/2` on hover.

**Admin panel and Results portal:** Primarily `elevation/0` (infrastructure identity). Exceptions:

- Input fields: `elevation/1`
- Interactive cards: `elevation/1–2`
- Dropdown overlays: `elevation/2` only

**Announcement banners:** Flat — no elevation. Urgency comes from color, contrast, and positioning. Elevation is only used if a banner is a dismissible toast floating above layout.

**Separation of concerns:** Elevation is structural depth. Gold glows and lamp lighting are narrative lighting. These systems must never be mixed.

---

## 06 — Motion System

### Core Principle

Every animation should feel like something physical happening — not a UI transition. The lamp lighting. Pages turning. Time passing. Motion must serve the institution, not demonstrate technical capability.

**The sacred motion budget:** Only a few elements are allowed to speak loudly. Rarity is what gives cinematic moments their power.

---

### 06.1 — Duration Tokens

|Token|Value|Usage|
|---|---|---|
|`motion/instant`|80ms|State feedback — checkbox ticks, toggle switches|
|`motion/fast`|150ms|Hover states, button feedback, focus rings|
|`motion/standard`|300ms|Component transitions, dropdowns, navigation items|
|`motion/gentle`|500ms|Card reveals, page elements entering viewport|
|`motion/slow`|800ms|Section transitions, modal entry|
|`motion/ceremonial`|1200ms|Crest assembly, hero reveals, loading screen|
|`motion/epic`|2400ms|Full page intro sequences only|

---

### 06.2 — Easing Tokens

|Token|Value|Character|
|---|---|---|
|`ease/snap`|`cubic-bezier(0.25, 0, 0, 1)`|Quick settle — UI feedback|
|`ease/out`|`cubic-bezier(0.0, 0, 0.2, 1)`|Elements arriving — natural deceleration|
|`ease/in-out`|`cubic-bezier(0.4, 0, 0.2, 1)`|Elements moving through space|
|`ease/ceremonial`|`cubic-bezier(0.16, 1, 0.3, 1)`|Institutional reveals — slow start, confident settle|
|`ease/ember`|`cubic-bezier(0.34, 1.56, 0.64, 1)`|Organic overshoot — lamp glow, crest shimmer, ambient life|

**Note on `ease/ember`:** This is the most character-defining token in the motion system. It encodes organic institutional warmth. It defines lamp ignition, crest shimmer, and ambient environmental motion. It is not UI motion — it is environmental motion.

---

### 06.3 — Motion Behavioral Rules

**Rule 1 — Utility pages do not animate** Results portal, admin panel, and contact form fields use `motion/instant` and `motion/fast` only. No scroll reveals, no entrance animations. These pages are infrastructure.

**Rule 2 — Scroll reveals use one pattern** FadeIn + `translateY(24px)` → `translateY(0)`. Always `motion/gentle` + `ease/out`. Never scale, never rotate, never slide horizontally for scroll-driven content.

**Rule 3 — Ceremonial motion is protected** Loading screen, hero, and crest are the only elements permitted to use `motion/ceremonial` and above. Nothing else earns that duration. This rule protects the identity of these moments.

**Rule 4 — Hover is always fast** Every hover state uses `motion/fast` (150ms). Users must feel instant response. Slow hover is one of the fastest ways to make a system feel dated.

**Rule 5 — Continuous scroll motion is exempt from duration tokens** Components that loop indefinitely (Achievement Ticker, ambient ambient background elements) cannot map to the duration token system, which describes one-shot transitions. These components define their own `animation-duration` based on total content width to maintain consistent apparent speed. The speed target is approximately 40–60px per second. Hover pauses via `animation-play-state: paused`. This is the only class of animation not governed by a duration token.

**Rule 6 — Reduced motion fallback** All animations check `prefers-reduced-motion`. If reduced motion is preferred, everything falls back to opacity-only transitions at `motion/fast`. Continuous scroll components (Achievement Ticker) stop entirely. This is a system constraint, not an afterthought.

---

### 06.4 — Animation by Page Context

|Context|Permitted Animation Level|
|---|---|
|Homepage hero|Full suite — `motion/ceremonial` permitted|
|About KCC|Full suite — heritage page, animations carry history|
|Loading screen|Full suite — `motion/ceremonial` + `motion/epic` permitted|
|404 page|Ambient only — embers, slow pulse|
|Gallery, Societies, Facilities|`motion/gentle` scroll reveals + `motion/standard` interactions|
|News, Academics, Admissions|`motion/gentle` scroll reveals only|
|Contact, Administration|`motion/standard` interactions only|
|Results portal|`motion/fast` only — infrastructure|
|Admin panel|`motion/fast` and `motion/instant` only — never decorative|

---

### 06.5 — Component-Level Animation Specifications

The following animations are too contextually specific to be tokens. They live as component specs, not system tokens.

**About KCC Interactive Timeline** The timeline must feel like traveling through eras, not clicking cards. Requires a dedicated component specification covering: scroll behavior, parallax logic, era-specific atmospheric transitions, content choreography, and state sequencing. This component uses `motion/slow` + `ease/ceremonial` as its foundation but defines its own choreography above that. See Components document.

**Loading Screen** See Components document.

**Homepage Hero** See Components document.

**Crest Animation** The standalone crest assembly animation (distinct from its embedding in the Loading Screen) is a cinematic component used on the About KCC page and ceremonial moments. See Components document.

---

## 07 — Grid and Layout System

### Core Principle

The grid is not a preference — it is the invisible architecture of every page. No layout decisions are made outside these constraints. Consistent column structure is what separates a designed system from a collection of designed pages.

---

### 07.1 — Breakpoints

|Token|Value|Target Context|
|---|---|---|
|`breakpoint/xs`|`480px`|Small phones|
|`breakpoint/sm`|`640px`|Large phones, small tablets|
|`breakpoint/md`|`768px`|Tablets|
|`breakpoint/lg`|`1024px`|Small desktops, landscape tablets|
|`breakpoint/xl`|`1280px`|Standard desktop|
|`breakpoint/2xl`|`1536px`|Wide desktop|

---

### 07.2 — Container Widths

|Token|Max Width|Usage|
|---|---|---|
|`container/prose`|`680px`|News articles, long-form editorial content|
|`container/content`|`960px`|Standard page content — forms, about sections|
|`container/wide`|`1200px`|Most page layouts — cards, galleries, general|
|`container/full`|`100%`|Full-bleed sections — hero, footer, stats strip, announcement banner|

All containers center horizontally with `margin: 0 auto`. Horizontal padding is `space/6` on mobile, `space/8` on tablet, `space/10` on desktop.

---

### 07.3 — Column Grid

|Breakpoint|Columns|Gutter|
|---|---|---|
|xs (< 640px)|4|`space/4` (16px)|
|sm (640–767px)|4|`space/4` (16px)|
|md (768–1023px)|8|`space/6` (24px)|
|lg (1024–1279px)|12|`space/6` (24px)|
|xl (1280px+)|12|`space/8` (32px)|

---

### 07.4 — Common Layout Patterns

These are the canonical layout configurations. Components should not invent new column splits.

|Pattern|Desktop|Tablet|Mobile|Usage|
|---|---|---|---|---|
|Full width|12 col|8 col|4 col|Hero, stats strip, banners, footer|
|Two-thirds / one-third|8 + 4 col|5 + 3 col|Stack|Principal's message, facility detail|
|Half / half|6 + 6 col|4 + 4 col|Stack|Comparison layouts, feature pairs|
|Three-column|4 + 4 + 4 col|Stack (2+1)|Stack|News cards, society cards, staff grid|
|Four-column|3 + 3 + 3 + 3 col|2 + 2 col|Stack|Stats strip items, stream cards|
|Sidebar + content|3 + 9 col|Stack|Stack|Admin panel, Table of Contents + article|
|Centered prose|`container/prose` centered|Full width|Full width|Articles, policies, long-form content|

---

### 07.5 — Layout Rules

**Rule 1 — No orphan columns.** Every grid layout must degrade gracefully to full-width stacking on mobile. No component should require a minimum viewport to function.

**Rule 2 — Hero sections are always `container/full`.** No contained hero. The edge-to-edge treatment communicates institutional scale.

**Rule 3 — Article content is always `container/prose`.** Long-form body text at full page width becomes unreadable. The prose container protects line length.

**Rule 4 — Admin panel uses sidebar layout.** The `3 + 9` sidebar-content split applies to all admin views. The sidebar does not collapse to a drawer on tablet — it narrows. It collapses to a drawer only on mobile.

---

## 08 — Z-Index System

### Core Principle

Without a named z-index scale, layering becomes a guessing game of arbitrary numbers. Every element that can overlap another must reference a named tier. No free z-index values are permitted.

---

### 08.1 — Z-Index Scale

|Token|Value|Usage|
|---|---|---|
|`z/base`|0|Default flow — no stacking context|
|`z/raised`|10|Cards on hover, sticky section headers, in-flow overlapping elements|
|`z/dropdown`|100|Dropdown menus, select panels, autocomplete results|
|`z/sticky`|200|Sticky navigation bar|
|`z/overlay`|300|Modal backdrops, drawer backdrops|
|`z/modal`|400|Modal panels, drawer panels, lightbox frames|
|`z/toast`|500|Toast notifications — must always appear above modals|
|`z/loading`|900|Loading screen — always the topmost layer|

---

### 08.2 — Z-Index Rules

**Rule 1 — No free values.** `z-index: 9999`, `z-index: 10001`, and similar are system failures. Every value must reference a token.

**Rule 2 — Loading screen is always the ceiling.** Nothing sits above `z/loading`. The loading screen must be the last thing visible before content appears and must not be obscured by any component.

**Rule 3 — Toast above modal.** Confirmation toasts triggered by modal actions must remain visible. `z/toast` is intentionally above `z/modal` for this reason.

**Rule 4 — Dropdowns inside modals.** When a dropdown opens inside a modal, it inherits the modal's stacking context. Do not attempt to escape with absolute z-index values — this is a CSS stacking context issue to be resolved structurally, not numerically.

---

## 09 — Icon System

### Core Principle

Icons are functional glyphs, not decorative illustrations. They must be visually consistent with the serif, authoritative character of the system — never playful, never cartoon-like. Stroke weight and sizing must be uniform across every context.

---

### 09.1 — Icon Library

**Primary library:** Lucide Icons. Chosen for consistent 2px stroke weight, clean geometric forms, and comprehensive coverage.

**Stroke weight:** 2px at all sizes. Never adjust stroke weight per icon. Visual size variation comes from scaling only.

**Fill icons:** Not used. All icons are outline/stroke variants. The system's restraint comes from line, not fill.

---

### 09.2 — Icon Size Scale

|Token|Size|Tailwind|Usage|
|---|---|---|---|
|`icon/xs`|12px|`size-3`|Inline text indicators, mini badges|
|`icon/sm`|16px|`size-4`|Button icons, form field prefixes, captions|
|`icon/md`|20px|`size-5`|Navigation items, card actions, standard UI|
|`icon/lg`|24px|`size-6`|Section headers, standalone icon contexts|
|`icon/xl`|32px|`size-8`|Feature callouts, empty state illustrations|
|`icon/2xl`|48px|`size-12`|Hero-adjacent decorative icons — rare|

**Default size:** `icon/md` (20px) in all interactive UI contexts unless a specific variant specifies otherwise.

---

### 09.3 — Icon Color Rules

Icons always inherit color from the token system. They do not introduce new colors.

|Context|Token|
|---|---|
|Default UI icon|`text/muted`|
|Active / selected|`color/green/base`|
|Accent / featured|`color/gold/base`|
|On dark surface|`text/inverse`|
|Error state|`semantic/error/base`|
|Success state|`semantic/success/base`|
|Warning state|`semantic/warning/base`|
|Disabled|`text/muted` at 40% opacity|

---

### 09.4 — Icon Behavioral Rules

**Rule 1 — Icons never stand alone as the sole indicator.** Every icon in an interactive context (button, navigation, action) must be accompanied by either a visible label or an accessible `aria-label`. Ambiguity is an institutional failure.

**Rule 2 — No decorative icon proliferation.** Icons do not appear before every list item, every heading, or every card title. Used sparingly, they guide. Used freely, they become visual noise.

**Rule 3 — Crest is not an icon.** The school crest is a brand asset governed by its own usage rules. Never use it as a Lucide-style UI glyph or inline icon.

**Rule 4 — Social media icons are the exception.** Platform-specific social icons (Instagram, YouTube, Facebook) should use the official SVG marks from each platform at `icon/md`. These are identity marks, not UI icons, and stroke-weight consistency does not apply to them.

---

## 10 — Focus and Accessibility Baseline

### Core Principle

Accessibility is not a retrofit. The focus ring is part of the visual identity system. It must be as deliberately designed as any hover state.

---

### 10.1 — Focus Ring Specification

|Property|Value|Rationale|
|---|---|---|
|Color|`color/gold/base` (`#C9973A`)|Consistent with interactive gold system; high contrast on both cream and green|
|Style|`solid` outline|Outline, not box-shadow — survives all background contexts|
|Width|2px|Visible without being heavy|
|Offset|3px|Separates ring from element edge; prevents it feeling embedded|
|Border radius|Matches element — `radius/sm` for buttons, `radius/md` for cards|Ring conforms to the element it wraps|

**Implementation:** `outline: 2px solid #C9973A; outline-offset: 3px;`

**Focus-visible only:** Focus rings appear on `:focus-visible`, not `:focus`. This ensures keyboard users see rings while mouse users do not. Never suppress `:focus-visible` with `outline: none`.

---

### 10.2 — Contrast Requirements

All text in the system must meet WCAG AA minimum (4.5:1 for body text, 3:1 for large text). The color system is designed to meet these targets. Key validated pairs:

|Foreground|Background|Ratio|Level|
|---|---|---|---|
|`text/primary` (`#1C1A16`)|`surface/base` (`#F7F3EC`)|~16:1|AAA|
|`text/muted` (`#5C5647`)|`surface/base` (`#F7F3EC`)|~6.5:1|AA|
|`text/inverse` (`#F5EFE4`)|`surface/inverse` (`#22201B`)|~14:1|AAA|
|`color/gold/base` (`#C9973A`)|`surface/inverse` (`#22201B`)|~5.2:1|AA|
|`text/inverse` (`#F5EFE4`)|`color/green/base` (`#1A4A2E`)|~9.1:1|AAA|

**Critical note:** `color/gold/base` on `surface/base` does not meet AA for body text. Gold is used for eyebrow labels, headings, and accent elements — never for body copy or small text on cream backgrounds.

---

### 10.3 — ARIA and Structural Rules

These are system-level behavioral rules, not per-component specifications. Every component must comply.

1. **Landmark structure.** Every page has exactly one `<main>`, one `<header>`, one `<footer>`. Navigation uses `<nav>` with a descriptive `aria-label`.
2. **Heading hierarchy.** One `<h1>` per page. `<h2>` for section headings, `<h3>` for card headings and sub-sections. Never skip levels.
3. **Image alt text.** All informational images have descriptive `alt`. Decorative images (background textures, overlay elements) use `alt=""`.
4. **Interactive elements.** Every clickable element is either a native `<button>` or `<a>`. No `div` click handlers.
5. **Form labels.** Every input has a visible `<label>` or `aria-labelledby`. Placeholder text is supplementary, never the sole label.

---

# 11 — Responsive System

> _This document extends Foundations §07 (Grid and Layout System). The breakpoint scale, container widths, and column grid are defined there. This section covers everything §07 does not: mobile-first methodology, touch targets, component-level responsive rules, and Sri Lanka–specific mobile considerations. Both documents are mandatory reading before building any component or page._

---

## 11.1 — Philosophy

### Why mobile-first

The majority of KCC's audience — students, parents, prospective families — accesses the internet primarily on a mobile phone. Sri Lanka's mobile broadband penetration far exceeds fixed-line. A site that works perfectly on a MacBook but struggles on a mid-range Android phone has failed its core audience.

Mobile-first means every decision starts at the smallest viewport and adds capability upward. It does not mean building a separate mobile experience. One codebase, one design, progressive enhancement.

**The governing phrase for responsive decisions:** _Would a parent standing outside the school gate, checking admissions details on a 4G connection, be able to do what they came to do?_

If the answer is no, it is not shipped.

---

## 11.2 — Mobile-First CSS Strategy

### Tailwind breakpoint usage

All Tailwind responsive prefixes are min-width — they apply _at and above_ the named breakpoint. Write base styles for mobile first, then override for larger viewports.

```css
/* ✓ Correct — mobile first */
.card { padding: 16px; }              /* base: mobile */
.card { @apply md:p-6; }              /* tablet+ */
.card { @apply xl:p-8; }              /* desktop+ */

/* ✗ Wrong — desktop first, then shrink */
.card { padding: 32px; }
.card { @apply sm:p-4; }
```

### No `max-width` media queries in components

Component CSS must not use Tailwind's `max-md:` or any max-width breakpoint to hide or resize things. If a component needs to behave differently below a breakpoint, rethink the structure — don't patch it with a max-width override. The one exception is the admin sidebar (`max-md:hidden` on the sidebar, `md:hidden` on the drawer trigger) — this is a structural layout exception, documented in §07.5 Rule 4.

### Breakpoint reference (from §07.1)

|Token|Value|Tailwind prefix|
|---|---|---|
|`breakpoint/xs`|480px|`xs:` (custom — add to tailwind.config)|
|`breakpoint/sm`|640px|`sm:`|
|`breakpoint/md`|768px|`md:`|
|`breakpoint/lg`|1024px|`lg:`|
|`breakpoint/xl`|1280px|`xl:`|
|`breakpoint/2xl`|1536px|`2xl:`|

**Most-used breakpoints in practice:** `md:` for layout shifts (stacking → columns), `lg:` for nav changes and sidebar activation. `sm:` and `xl:` are used sparingly — `sm:` for minor compact adjustments, `xl:` only for max-width container clamping.

---

## 11.3 — Touch Targets

### Minimum size

Every interactive element — buttons, links, form controls, icon buttons, navigation items, accordion triggers, card click areas — must have a minimum touch target of **44 × 44px**. This is the Apple HIG minimum and aligns with WCAG 2.5.5 (AAA).

The visual size of an element can be smaller than 44px (e.g. a compact badge) as long as the _interactive area_ meets the minimum. Use `padding` to expand the hit area without changing the visual footprint.

```css
/* ✓ Icon button: visually 20px, touch target 44px */
.icon-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ✓ Small navigation link: visually compact, touch area extended */
.nav-link {
  padding: 12px 16px; /* total height ≥ 44px when combined with line-height */
}
```

### Minimum spacing between targets

Adjacent interactive elements must be separated by at least **8px** of non-interactive space. Targets that are too close together cause mis-taps. Navigation items, filter tabs, and pagination buttons are the most common failure points.

### Exceptions

Inline text links within body copy are exempt from the 44px rule — the surrounding text provides context and the paragraph-level line-height naturally extends the tappable area.

---

## 11.4 — Typography on Mobile

The type scale in §02.2 already uses `clamp()` for display and heading sizes — these handle mobile automatically. The following rules address what `clamp()` does not cover.

### Input field font size — prevent iOS zoom

Any `<input>`, `<select>`, or `<textarea>` with a font size below **16px** triggers automatic zoom on iOS Safari. This breaks layout and is jarring for users.

**Rule:** All form fields use `font-size: 1rem` (16px) as a minimum. The `type/body` token (1.05rem) already satisfies this. Never reduce form field text below 1rem for compact layouts — reduce padding instead.

### Body text minimum on mobile

`type/body-sm` (0.92rem ≈ 14.7px) is the smallest permitted size for any readable body content. On screens below 400px, `type/caption` (0.7rem) is only permitted for metadata (dates, categories, file sizes) — never for instructional or primary content.

### Sinhala on mobile

Sinhala text already requires 1.12rem minimum and 1.8 line height (§02.3). These rules are non-negotiable on mobile — Sinhala letterforms are even harder to read at small sizes on low-DPI screens common in mid-range Android devices.

### Line length on mobile

The `container/prose` (680px) container enforces good line length on desktop. On mobile, full-width prose is unavoidable — compensate by ensuring a minimum left/right padding of `space/4` (16px) on every side. Text must never touch the screen edge.

---

## 11.5 — Spacing on Mobile

§03.2 Rule 1 states that section padding is `space/24` (96px) on desktop and `space/16` (64px) on mobile. The full per-breakpoint reference:

|Context|Mobile (< 768px)|Tablet (768–1023px)|Desktop (1024px+)|
|---|---|---|---|
|Section vertical padding|`space/16` (64px)|`space/20` (80px)|`space/24` (96px)|
|Page horizontal gutter|`space/4` (16px)|`space/6` (24px)|`space/8` (32px)|
|Card internal padding|`space/5` (20px)|`space/6` (24px)|`space/6` (24px)|
|Form field internal padding|`space/3` v, `space/4` h|same|same|
|Between form fields|`space/4` (16px)|`space/5` (20px)|`space/6` (24px)|
|Between grid cards|`space/3` (12px)|`space/4` (16px)|`space/6` (24px)|

**Hero sections and About KCC** follow the editorial +1 step rule from §03.2 Rule 3, applied at each breakpoint rather than only at desktop.

---

## 11.6 — Images on Mobile

### Aspect ratios on mobile

Images must never distort on mobile. All image containers must maintain their defined aspect ratios using `aspect-ratio` CSS. The standard ratios:

|Context|Aspect ratio|
|---|---|
|News card — featured|`16/7`|
|News card — standard|`16/9`|
|Society card|`16/9`|
|Event card|`4/3` (compact) or `16/9` (featured)|
|Staff card portrait|`3/4`|
|Gallery album cover|`4/3`|
|Facility card|`16/9`|
|Hero — homepage|`100vw / 100vh`|
|Hero — subpage|`100vw / 60vh`|

On mobile, `16/9` cards that span full width will be taller in absolute pixels than their desktop counterparts — this is correct behavior, not a bug. If the resulting height feels excessive, use `max-height` to cap it (e.g. `max-h-72` on a compact card).

### `next/image` responsive sizes

Every `<Image>` using `fill` must have a `sizes` prop that reflects its actual rendered width at each breakpoint. Without `sizes`, Next.js downloads a full-desktop image for every device.

```tsx
/* ✓ Card image — full width on mobile, 1/3 width on desktop */
<Image
  src={src}
  alt={alt}
  fill
  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
/>

/* ✓ Featured news card — always full width */
<Image
  src={src}
  alt={alt}
  fill
  sizes="100vw"
/>

/* ✗ Missing sizes — downloads desktop image on mobile */
<Image src={src} alt={alt} fill />
```

### Hover effects on touch devices

Hover zoom on images (`group-hover:scale-[1.04]`) is a desktop behavior. On touch devices, hover states fire on tap and stay active — the image zooms but never unzooms until the user taps elsewhere. This is not a blocking issue for KCC's use case (it does not break functionality), but be aware that hover-only affordances (like the GalleryAlbumCard overlay) are invisible to touch users. The underlying `<a>` must be fully functional and labeled without relying on the hover state.

---

## 11.7 — Component Responsive Rules

This table defines the specific responsive behaviors for every built component. "Stack" means the component switches to a single-column, full-width layout. Breakpoint listed is where the change triggers (min-width).

### Global Components

|Component|Mobile (< 768px)|Tablet `md:` (768px)|Desktop `lg:` (1024px)|
|---|---|---|---|
|**Navigation**|Hidden — hamburger trigger visible|Hidden — hamburger trigger visible|Full horizontal nav visible|
|**Mobile Menu**|Full-screen overlay (`z/overlay`), `overlay/heavy` backdrop, links in `type/h3` with 56px touch targets, LanguageSwitcher below logo|— (not shown at md+)|—|
|**LanguageSwitcher**|Positioned below logo in header bar, above the hamburger overlay|Remains in header bar|Right side of nav bar|
|**Breadcrumb**|Hidden — space too limited. Consider omitting on mobile entirely|Visible|Visible|
|**Footer**|Single column stack. Nav columns stacked vertically. Social icons centered. Crest watermark hidden|2-column nav columns|4-column nav columns + crest|
|**AnnouncementBanner**|Full width, text wraps to 2 lines max. Dismiss button 44px tap target.|Full width|Full width|
|**QuickAccessPortal**|2×2 grid (2 columns, 2 rows)|4-column horizontal strip|4-column horizontal strip|
|**LoadingScreen**|Full screen — identical behavior at all sizes. Crest 80px on mobile, 120–160px on desktop|||
|**SectionHeader**|Left-aligned. Max-width full container width|Left-aligned|Left-aligned (centered only on hero-adjacent sections)|

### Atoms

|Component|Mobile behavior|
|---|---|
|**Button**|Full-width (`w-full`) when inside a form or card footer on mobile. Never full-width in navigation or inline text contexts. `size/sm` in space-constrained contexts.|
|**Input / Textarea / Select**|Full-width always (`w-full`). Font size minimum 1rem (see §11.4).|
|**Checkbox / Radio / Toggle**|Touch target expanded to 44px minimum. Label tap area includes the label text, not just the control.|
|**ProgressIndicator (steps)**|Labels hidden on mobile — show numbers only. At `md:` labels visible. At `lg:` full labels with connector lines.|
|**FileUploadZone**|Drop zone fills container width. Instruction text collapses to 2 lines. File list items scroll vertically.|
|**Tooltip**|Disabled on mobile — touch users cannot hover. Ensure any information conveyed by a tooltip has an alternative in the UI (visible text, label, or accessible description).|

### Cards

All cards follow one rule: **single column on mobile, defined grid at `md:` and above.**

|Component|Mobile|Tablet `md:`|Desktop `lg:`|
|---|---|---|---|
|**NewsCard (standard)**|1 col, full width|2 col|3 col|
|**NewsCard (featured)**|Full width always|Full width always|Full width always|
|**NewsCard (compact)**|Full width list|Full width list|Full width list|
|**EventCard**|1 col|2 col|3 col|
|**SocietyCard**|1 col|2 col|3 col|
|**StaffCard (principal)**|Stack: portrait on top, quote below|2-col (portrait + content)|2-col (portrait + content)|
|**StaffCard (grid)**|2 col (compact)|3 col|4 col|
|**AcademicStreamCard**|1 col|2 col|4 col (all 4 streams in one row)|
|**FacilityCard**|1 col|2 col|2 or 3 col depending on context|
|**GalleryAlbumCard**|2 col (album covers are compact)|3 col|4 col|
|**ExtracurricularCard**|1 col|2 col|3 col|
|**StatCard**|2 col (2×2 grid for 4 stats)|2 or 4 col|4 col|
|**AchievementCard (archive)**|1 col|2 col|3 col|

### Feedback & Navigation

|Component|Mobile behavior|
|---|---|
|**FilterBar (category-tabs)**|Horizontal scroll with `overflow-x: auto; scrollbar-width: none`. Tabs do not wrap.|
|**FilterBar (year-selector)**|Wraps to 2 rows if needed.|
|**Accordion**|Full width always. No behavior change.|
|**Toast**|Full width, bottom of screen (not bottom-right). Margin 16px from edges.|
|**Modal**|Full-screen on mobile — `width: 100%; height: 100%; border-radius: 0`. At `md:` reverts to centered panel.|
|**Pagination**|Show only prev/next arrows + current page number on mobile. Numbered buttons hidden. At `md:` full pagination visible.|
|**SearchInput**|Full width. Results dropdown full width of input.|
|**DropdownMenu**|Full width on mobile if triggered from a full-width context. Right-aligned dropdown reverts to left-aligned on small screens.|
|**TableOfContents**|Hidden on mobile — inline sticky behavior doesn't work on small screens. Either omit or collapse into a "jump to section" dropdown at the top of the content.|
|**Calendar (mini-strip)**|Horizontal scroll. No behavior change.|
|**Calendar (list-view)**|Full width always. No behavior change.|
|**Calendar (month-view)**|Cell height reduces. Day labels abbreviated to 1 letter (S/M/T/W/T/F/S). Event pills truncate more aggressively.|

### Page Sections

|Component|Mobile behavior|
|---|---|
|**StatsStrip**|2×2 grid (2 columns, 2 rows). Numbers reduce by one clamp step.|
|**AchievementTicker**|Unchanged — continuous scroll works at all widths.|
|**QuoteBlock (pull)**|Left border accent, full width. Padding reduces to `space/4`.|
|**QuoteBlock (ceremonial)**|Centered, full width. Font reduces to `type/pullquote` lower bound.|
|**Hero (homepage)**|`100vw × 100svh` (use `svh` not `vh` — iOS Safari `vh` includes browser chrome). School name drops by 1 clamp step. One CTA only — secondary CTA hidden below fold or removed.|
|**Hero (subpage)**|`100vw × 50svh` minimum. Breadcrumb visible.|
|**Hero (minimal)**|Auto height. Breadcrumb visible.|

---

## 11.8 — Navigation Mobile Specification

The Navigation component has the most complex responsive behavior in the system. This section fully specifies it.

### Breakpoint

Navigation transitions from horizontal to mobile at `md:` (768px). Below 768px the full nav is hidden and the hamburger is shown.

### Hamburger button

- Position: right side of header bar, vertically centered
- Size: 44×44px touch target
- Visual: Lucide `Menu` icon at `icon/lg` (24px), `text/inverse` on dark surfaces, `text/primary` on light
- Aria: `aria-label="Open navigation menu"` when closed, `aria-label="Close navigation menu"` when open
- `aria-expanded` toggles with state

### Mobile menu overlay

- Opens with `motion/standard` + `ease/out` — slides in from the right or fades in full-screen
- Background: `overlay/heavy` on the body. Menu panel: `surface/inverse`
- Z-index: `z/overlay` (backdrop) and `z/modal` (panel)
- Scroll lock: `body` scroll locked while menu is open (`overflow: hidden`)
- Close triggers: hamburger button, backdrop tap, Escape key
- Focus trap: keyboard focus must be trapped inside the open menu

### Mobile menu structure

```
[School Logo — gold on dark]         [× Close button — 44px]
─────────────────────────────────────────────────────────────
[LanguageSwitcher]
─────────────────────────────────────────────────────────────
Home
About KCC
Academics
Admissions
News
Events
Societies
Gallery
Results
Contact
─────────────────────────────────────────────────────────────
[Social icons row]
```

Nav links: `type/h3`, `text/inverse`, 56px minimum touch target per item. Active page: `color/gold/base`. Dividers: `border/light` at 20% opacity.

### LanguageSwitcher on mobile

The LanguageSwitcher appears in the header bar below the logo (above the hamburger button area) at all times on mobile — it must be accessible before the menu opens. It does not live inside the mobile overlay.

---

## 11.9 — Form Behavior on Mobile

Forms require special attention on mobile because the system keyboard significantly changes viewport height and layout behavior.

### Viewport resize on keyboard open

When a virtual keyboard opens, the viewport shrinks. Forms near the bottom of the screen can be obscured. Mitigate by:

1. Ensuring `<meta name="viewport" content="width=device-width, initial-scale=1">` is set (prevents scale issues)
2. Using `scroll-padding-top` on the `<html>` element to account for sticky nav height when fields scroll into focus
3. Never placing submit buttons at the very bottom of long forms — they may scroll off-screen when the keyboard is open

### Input behavior

- All inputs: `font-size: 1rem` minimum (§11.4 iOS zoom rule)
- All inputs: `w-full` on mobile
- Input labels: visible above the field, never as floating labels that animate on focus. Animated labels create uncertainty on touch where focus state is less obvious
- Autocomplete: always set `autocomplete` attributes on relevant fields (email, phone, name). iOS and Android keyboards use this to offer suggestions and correct keyboard types
- `type="email"` shows email keyboard. `type="tel"` shows numeric keyboard. `type="search"` shows search keyboard with Go/Search return key. Always use the correct input type

### Multi-step forms on mobile

The `ProgressIndicator` (steps variant) hides labels on mobile and shows numbers only. On mobile, each step should fill the full viewport height where possible — avoid half-visible next fields that suggest incomplete UI. The `FormSectionWrapper` stack-spaces naturally and works correctly on mobile without modification.

---

## 11.10 — Performance Considerations (Sri Lanka Context)

A responsive system is incomplete without acknowledging network reality. Nexus must function on 4G (common) and 3G (rural coverage, school areas outside Mathugama town) connections.

### Image loading

- All `<Image>` components: use `loading="lazy"` for below-fold images, `loading="eager"` for the hero only
- Hero images: provide a `blurDataURL` placeholder — prevents layout shift while image loads
- Gallery pages: never load full-resolution images in grid view. Load thumbnails (Sanity/R2 image transforms should serve appropriately sized variants)
- No autoplay video on mobile — hero video loop falls back to a poster image at `breakpoint/md` and below

### Font loading

All three fonts (Cormorant Garamond, Source Serif 4, Noto Serif Sinhala) are loaded from Google Fonts via Next.js's `next/font/google`. Use `display: 'swap'` to prevent invisible text during font load. Sinhala font only loads on pages where Sinhala content is present — do not load it globally.

### Bundle discipline

- No animation library (Framer Motion, etc.) is justified for this project. All animations use CSS transitions and keyframes as specified in §06. A full animation library adds 30–60KB gzipped for transitions that are achievable in CSS.
- Lucide icons: import individually (`import { Menu } from 'lucide-react'`), never the full package barrel import.

### Cumulative Layout Shift (CLS)

CLS is especially damaging on slow connections where content loads in stages. Prevent it by:

1. Always defining `width` and `height` (or `aspect-ratio`) on every image container before the image loads
2. Reserving space for the AnnouncementBanner if it may appear after page load — do not inject it above the nav without pre-reserved space
3. Loading screen covers initial paint — ensure it exits before CLS-prone content is visible

---

## 11.11 — Responsive Testing Checklist

Before any component or page is marked complete, it must be tested at these exact viewports:

|Viewport|Represents|
|---|---|
|**375 × 667**|iPhone SE — smallest common iOS device|
|**390 × 844**|iPhone 14 — most common iOS size 2024–2025|
|**412 × 915**|Samsung Galaxy A series — most common Android in Sri Lanka|
|**768 × 1024**|iPad (portrait) — tablet context|
|**1024 × 768**|Landscape tablet / small laptop|
|**1280 × 800**|Standard laptop|
|**1440 × 900**|Common desktop|

Test in Chrome DevTools device mode for layout. Test on a real Android device (mid-range — Redmi, Samsung A series) for touch behavior, font rendering, and scroll performance. iOS Safari has distinct behavior for `vh`, sticky positioning, and form zooming — test on a real iPhone if available.

### Checklist per viewport

- [ ] No horizontal scroll at any viewport
- [ ] No text touching screen edges (minimum 16px padding)
- [ ] All touch targets minimum 44px
- [ ] Navigation accessible and functional
- [ ] Forms usable with virtual keyboard open
- [ ] Images loading at appropriate sizes (check Network tab)
- [ ] No layout shift on load (check CLS in Lighthouse)
- [ ] Reduced motion preference honored (enable in OS settings)

---

## System Integrity Rule Addition

The following rule is added to the System Integrity Rules in Foundations §11:

**Rule 12 — No layout that breaks below 375px.** The system supports viewports down to 375px wide. Components that cannot function below 640px are system failures. If a component requires a minimum viewport wider than 375px to be usable, it must be redesigned, not hidden.

**Rule 13 — Touch targets are non-negotiable.** A 44×44px minimum touch target applies to every interactive element on every page. Compact visual design never excuses inaccessible touch areas. Expand padding if necessary.

**Rule 14 — Font size floor at form inputs is 1rem.** No exceptions. This prevents iOS Safari's automatic zoom behavior, which breaks layout and harms the user experience.

---

_Nexus Design System — Responsive System (§11)_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_
## System Integrity Rules

These rules govern the entire foundations layer. They are non-negotiable.

1. **No free colors.** Every color value must reference a named token.
2. **No free fonts.** Every typeface assignment comes from `font/display`, `font/body`, or `font/sinhala`.
3. **No arbitrary spacing.** Every spacing value maps to the 4px scale.
4. **No gradients outside the whitelist.** Three approved gradients exist. Nothing else.
5. **No decorative elevation.** Every shadow references an elevation token tied to a behavioral use case.
6. **No arbitrary animation durations.** Every duration comes from the motion token scale. The one exception — continuous loop animations — is governed by Rule 5 in §06.3.
7. **No free z-index values.** Every stacking context uses a named z-index token.
8. **No layout outside the grid.** Every page uses the column grid and container tokens. No freehand width values.
9. **No suppressed focus rings.** `outline: none` without a `:focus-visible` replacement is forbidden.
10. **Cream, not white.** `surface/base` (`#F7F3EC`) is the default page background. `#FFFFFF` never appears.
11. **Gold is ceremony, not decoration.** If gold appears on every element, it has lost its meaning.

---

_Nexus Design System — Foundations_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_