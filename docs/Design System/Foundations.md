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
|`color/green/light`|`#235C3A`|Hover state — slightly lighter forest green|
|`color/gold/base`|`#C9973A`|The lamp of knowledge in the crest|
|`color/gold/light`|`#E8B84B`|Highlights — shimmer of the lamp flame|
|`color/gold/pale`|`#F2D98A`|Subtle gold tints for decorative use|

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

**DM Serif Display is explicitly removed from the system.** Cormorant Garamond carries all heading work. Two competing display serifs weaken identity cohesion.

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

**Rule 5 — Reduced motion fallback** All animations check `prefers-reduced-motion`. If reduced motion is preferred, everything falls back to opacity-only transitions at `motion/fast`. This is a system constraint, not an afterthought.

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

**About KCC Interactive Timeline** The timeline must feel like traveling through eras, not clicking cards. Requires a dedicated component specification covering: scroll behavior, parallax logic, era-specific atmospheric transitions, content choreography, and state sequencing. This component uses `motion/slow` + `ease/ceremonial` as its foundation but defines its own choreography above that.

**Loading Screen** See component specification in `_design-system-components.md`.

**Homepage Hero** See component specification in `_design-system-components.md`.

---

## System Integrity Rules

These rules govern the entire foundations layer. They are non-negotiable.

1. **No free colors.** Every color value must reference a named token.
2. **No free fonts.** Every typeface assignment comes from `font/display`, `font/body`, or `font/sinhala`.
3. **No arbitrary spacing.** Every spacing value maps to the 4px scale.
4. **No gradients outside the whitelist.** Three approved gradients exist. Nothing else.
5. **No decorative elevation.** Every shadow references an elevation token tied to a behavioral use case.
6. **No arbitrary animation durations.** Every duration comes from the motion token scale.
7. **Cream, not white.** `surface/base` (`#F7F3EC`) is the default page background. `#FFFFFF` never appears.
8. **Gold is ceremony, not decoration.** If gold appears on every element, it has lost its meaning.

---

_Nexus Design System — Foundations_ _C.W.W. Kannangara Central College, Mathugama_ _Maintained by Kannangara ICT Society (KITS)_ _© 2026_