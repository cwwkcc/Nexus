## Purpose

The Footer is the institutional grounding of every page. It closes the document with dignity, provides essential navigation, and reinforces the school’s identity. It must feel like the final paragraph of a historical record – not a utility dump.

---

## Variants

| Variant    | Description                                                                 | Used on                                      |
|------------|-----------------------------------------------------------------------------|----------------------------------------------|
| **Full**   | Logo + school name + motto + contact info + all nav columns + social icons + copyright. | All public pages (default)                   |
| **Compact**| Only nav columns + copyright bar. No logo, motto, contact, or social icons. | Admin panel, results portal, utility pages.  |

---

## Layout & Responsive Behavior

### Row Structure by Breakpoint

| Breakpoint       | Total Rows | Row Composition                                                                                 |
|------------------|------------|-------------------------------------------------------------------------------------------------|
| Mobile (<768px)  | 9          | 1 Logo, 2 Name+Motto, 3 Contact info, 4 Nav Col 1, 5 Nav Col 2, 6 Nav Col 3, 7 Nav Col 4, 8 Social Icons, 9 Copyright |
| Tablet (768–1023px) | 3      | Row 1: Logo + Name+Motto + Contact info (stacked left) + Nav columns (horizontal, right) and Social Icons (inline right) |
| Desktop (≥1024px)| 4          | Row 1: Logo + Name + Motto, Row 2: Contact info + Nav columns (5 columns), Row 3: Social Icons, Row 4: Copyright |

### Column Structure by Breakpoint

| Breakpoint          | Columns | Left Column                                           | Right Column(s)                                                                                                                    |
| ------------------- | ------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Mobile (<768px)     | 1       | (stacked vertically) – see rows above                 | –                                                                                                                                  |
| Tablet (768–1023px) | 2       | Logo + Name+Motto + Contact info (stacked vertically) | Nav columns arranged **horizontally** with `gap-space-8` between them. Social icons placed **below** the nav links, right‑aligned. |
| Desktop (≥1024px)   | 5       | Col 1: Contact info                                   | Col 2–5: Nav columns (one per column)                                                                                              |

### Visual Reference

**Desktop (5 columns, 4 rows):**
```
┌────────────────────────────────────────────────────────────────────┐
│  Logo                                                              │
│  C.W.W. Kannangara Central College                                 │
│  "Wisdom is All Wealth"                                            │
├────────────────────────────────────────────────────────────────────┤
│  Contact info    │ Nav Col 1 │ Nav Col 2 │ Nav Col 3 │ Nav Col 4   │
├────────────────────────────────────────────────────────────────────┤
│                     [Facebook] [Instagram] [YouTube] ...           │
├────────────────────────────────────────────────────────────────────┤
│  © 2026 ...                              Built by KITS · Privacy   │
└────────────────────────────────────────────────────────────────────┘
```

**Tablet (2 columns, 3 rows):**
```
┌─────────────────────────┬─────────────────────────────────────────┐
│ Logo                    │ Nav Col 1   Nav Col 2   Nav Col 3   Nav Col 4 │
│ C.W.W. Kannangara...    │                                         │
│ "Wisdom is All Wealth"  │                                         │
│ Contact info            │                                         │
├─────────────────────────┼─────────────────────────────────────────┤
│                         │              [Social Icons]             │
├─────────────────────────┼─────────────────────────────────────────┤
│                         │                                         │
│  © 2026 ...             │    Built by KITS · Privacy              │
└─────────────────────────┴─────────────────────────────────────────┘
```

**Mobile (1 column, 9 rows):**
```
Logo
C.W.W. Kannangara Central College
"Wisdom is All Wealth"
Contact info
Nav Column 1 (vertical list)
Nav Column 2 (vertical list)
Nav Column 3 (vertical list)
Nav Column 4 (vertical list)
[Social Icons]
© 2026 ... Built by KITS · Privacy
```

---

## Spacing Specifications

All values are tokens from the spacing system (`space-{1..40}`).  
**No arbitrary spacing values allowed.**

### Vertical Rhythm (between rows)

| Between                                                                    | Mobile (`<768px`) | Tablet (`768–1023px`) | Desktop (`≥1024px`) |
| -------------------------------------------------------------------------- | ----------------- | --------------------- | ------------------- |
| Top padding (above logo)                                                   | `space-16` (64px) | `space-20` (80px)     | `space-24` (96px)   |
| Logo → name+motto                                                          | `space-6` (24px)  | `space-8` (32px)      | `space-8` (32px)    |
| Name+motto → contact info                                                  | `space-6`         | `space-8`             | `space-8`           |
| Contact info → first nav column (mobile) / row separation (tablet/desktop) | `space-12` (48px) | `space-16` (64px)     | `space-20` (80px)   |
| Between nav columns (mobile)                                               | `space-8` (32px)  | (not applicable)      | (not applicable)    |
| Last nav column → social icons                                             | `space-8`         | `space-12`            | `space-12`          |
| Social icons → copyright bar                                               | `space-8`         | `space-12`            | `space-12`          |
| Copyright bar vertical padding                                             | `space-4` (16px)  | `space-4`             | `space-6` (24px)    |
| Bottom padding (below copyright)                                           | `space-8` (32px)  | `space-8`             | `space-12` (48px)   |

### Internal Spacing

| Component              | Gap / Padding                         | Token                                                   |
| ---------------------- | ------------------------------------- | ------------------------------------------------------- |
| **Nav column**         | Between links inside a column         | `space-3` (12px)                                        |
| **Contact info block** | Between lines (address, phone, email) | `space-2` (8px)                                         |
| **Social icons**       | Gap between icons                     | `space-4` (16px)                                        |
| **Copyright bar**      | Horizontal padding (left/right)       | `space-6` (24px) on mobile, `space-8` (32px) on desktop |
| **Container padding**  | All sides (content width wrapper)     | `space-4` (16px) on mobile, `space-8` (32px) on desktop |

---

## Token Usage

### Typography

| Element               | Token                     | Fallback / Notes                               |
|-----------------------|---------------------------|------------------------------------------------|
| School name           | `type/body` (1.05rem)     | `text-inverse`, uppercase, tracking `0.15em`   |
| Motto                 | `type/body-sm` (0.92rem)  | `text-inverse`, italic                         |
| Nav column heading    | `type/label` (0.75rem)    | `text-gold-base`, uppercase, tracking `0.15em` |
| Nav link              | `type/label-sm` (0.73rem) | `text-inverse`, hover → `text-gold-base`       |
| Contact info lines    | `type/body-sm` (0.92rem)  | `text-inverse`, no decoration                  |
| Email / phone (links) | `type/body-sm`            | Wrapped in `InlineLink` component              |
| Copyright text        | `type/caption` (0.7rem)   | `text-inverse`, uppercase, tracking `0.2em`    |

### Colors

| Element                        | Token                                |
| ------------------------------ | ------------------------------------ |
| Footer background              | `bg-green-base`                      |
| Text (all)                     | `text-inverse`                       |
| Gold accents (headings, hover) | `text-gold-base`                     |
| Border above copyright         | `border-border-light` at 20% opacity |
| Social icons (default)         | `text-text-inverse`                  |
| Social icons (hover)           | `text-gold-base`                     |

### Spacing & Layout

| Property              | Token / Class                                    |
| --------------------- | ------------------------------------------------ |
| All margins, paddings | `space-*` (e.g. `pt-space-16`)                   |
| Gaps between columns  | `gap-space-16` (desktop), `gap-space-8` (tablet) |
| Gap between nav links | `space-3`                                        |
| Icon size             | `icon/md` (20px) – via `w-5 h-5`                 |

### Components Used

| Component           | Import                                    |
| ------------------- | ----------------------------------------- |
| `SchoolLogo`        | `@nexus/ui` – variant="crest-only"        |
| `NavLink`           | `@nexus/ui` – for footer navigation links |
| `InlineLink`        | `@nexus/ui` – for email and phone         |
| `Container`         | `@nexus/ui` – to constrain max width      |
| `HStack` / `VStack` | `@nexus/ui` – optional layout helpers     |

---

## Logo in Footer

- **Variant:** Always `crest-only` (no lockup).  
- **Size:** `size="md"` (48px) on all viewports.  
- **Opacity:** 100% – **not** a watermark.  
- **Position:** Left‑aligned within the first column.  
- **Link:** **Not a link** – it’s decorative. Do not wrap with `<a>` or `Link`.  
- **Two‑variant note:** In the **Compact** footer, the logo is omitted entirely.

---

## Contact Info Block

- **Content:** Address (school location), phone number, email address.
- **Layout:** `VStack` with `space-2` between lines.
- **Address:** Plain text using `type/body-sm`, `text-inverse`, no decoration.
- **Phone & Email:** Use `InlineLink` component with `href="tel:..."` and `href="mailto:..."`.
- **Hover:** `text-gold-base` with `motion/fast` transition (handled by `InlineLink`).

---

## Social Icons

- **Icons:** Use provided icons from `@nexus/ui` (FacebookIcon, InstagramIcon, YouTubeIcon, GitHubIcon, LinkedInIcon).
- **Layout:** `HStack` with `gap-space-4`.
- **Size:** Icons are `w-5 h-5` (20px) – matches `icon/md`.
- **Hover:** `text-gold-base` with `motion/fast` transition.
- **Links:** Open in new tab (`target="_blank" rel="noopener noreferrer"`).
- **Placement:**  
  - **Desktop:** Separate row between Contact+Nav and Copyright.  
  - **Tablet:** Right column, below the horizontal nav links.  
  - **Mobile:** Their own row after all nav columns.

---

## Copyright Bar

- **Background:** Inherits from footer (`bg-green-base`).
- **Top border:** `border-t border-border-light/20` (20% opacity).
- **Text:** `type/caption`, uppercase, tracking `0.2em`, `text-inverse`.
- **Spacing:** `py-space-4` on mobile, `py-space-6` on desktop.
- **Layout:**  
  - Mobile: center‑aligned, stacked.  
  - Tablet/Desktop: flex with `justify-between` (left: copyright, right: "Built by KITS" + links).
- **Content:**
  - Left: `© {currentYear} C.W.W. Kannangara Central College. All rights reserved.`
  - Right: "Built by KITS" link (to `/societies/kits`), separated by middot (`·`), plus optional Privacy Policy and Terms links.

---

## Accessibility

- **Landmark:** Use `<footer role="contentinfo">` (or just `<footer>` – it has implicit `contentinfo`).
- **Navigation:** Each group of links must be wrapped in `<nav>` with an `aria-label` describing the group (e.g., `aria-label="School information"` for contact, `aria-label="Footer navigation – The School"` for columns).
- **Copyright:** No landmark needed; it’s not navigation.
- **Focus order:** Should be logical – logo (if interactive), contact links, nav columns, social icons, copyright links.
- **Skip link:** The footer should be reachable via the skip‑to‑content link (see `SkipToContent` component).

---

## Implementation Notes

1. **Use the `Container` component** from `@nexus/ui` to enforce max width (`max-w-content`).
2. **All spacing must use `space-*` tokens** – no `p-4`, `my-2`, etc. ESLint rule will enforce this.
3. **The logo is not a link** – do not wrap it in `<Link>`.
4. **Nav links must use the `NavLink` component** – not raw `next/Link`. `NavLink` provides consistent styling, active state detection, and token enforcement.
5. **Email and phone** use `InlineLink` – it provides the correct styling and external link icon.
6. **Responsive design** follows the breakpoints defined in Foundations (§07.1): `md:` for tablet (768px), `lg:` for desktop (1024px). Use `md:` prefix for tablet overrides.
7. **Reduced motion** – hover transitions already use `duration-fast` which respects `prefers-reduced-motion` (fallback to no transition).

---

## Related Components

- `SchoolLogo` – crest‑only variant.
- `NavLink` – for footer navigation links.
- `InlineLink` – for contact links.
- `Container` – content width wrapper.
- `VStack`, `HStack` – optional layout helpers.

---
_Nexus Design System – Footer Component_  
_C.W.W. Kannangara Central College, Mathugama_  
_Maintained by Kannangara ICT Society (KITS)_  
_© 2026_
