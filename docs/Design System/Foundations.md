## Table of Contents

1. [Design Principles]
2. [Thematic Concept – Stepping Into the Forest]
3. [Theme Architecture]
4. [Token Naming Convention]
5. [Colour System]
6. [Typography]
7. [Responsive Typography Rules]
8. [Internationalisation Rules]
9. [Spacing & Layout Grid]
10. [Sizing & Container Tokens]
11. [Border Radius]
12. [Elevation & Shadows]
13. [Glass System & Tokens]
14. [Z-Index Layering]
15. [Icon System]
16. [Touch Target Specification]
17. [Motion & Animation]
18. [Image Standards]
19. [Empty, Error & Loading Philosophy]
20. [Accessibility Standards]
21. [Component States & Tokens]
22. [Forms Specification]
23. [Data Display Patterns]
24. [Content Guidelines]
25. [SEO & Metadata Standards]
26. [Security & Privacy Guidelines]
27. [Performance Rules]
28. [Architecture Boundary & Ownership]
29. [Component Inventory]
30. [Browser Support]
31. [System Integrity Rules]
32. [Governance & Versioning]

---

## 1. Design Principles

| Principle                     | Meaning                                                                |
| ----------------------------- | ---------------------------------------------------------------------- |
| **Heritage Before Trend**     | Built for a 153‑year institution. Timeless over fashionable.           |
| **Forest Before Interface**   | Atmosphere guides layout. Interface serves the experience.             |
| **Glass Before Weight**       | Light, translucent, floating panels. No heavy blocks.                  |
| **Clarity Before Decoration** | Readability and usability first. Decoration only to reinforce meaning. |
| **Motion With Purpose**       | Animation communicates transitions, never distracts.                   |

---

## 2. Thematic Concept – Stepping Into the Forest

An immersive journey from **sunlit canopy** to **deep forest floor**.

- **Light‑dominant** – forest is full of light.
- **Glass‑dominant** – panels float like morning mist.
- **Background never flat** – radial glow at `50% 0%` (sunlight from above), darkens on scroll (moving deeper).

| Page Section     | Atmosphere        | Gradient Behaviour            |
| ---------------- | ----------------- | ----------------------------- |
| Hero (top)       | Bright canopy     | Radial white glow at `50% 0%` |
| Content (middle) | Filtered light    | Gradient deepens              |
| Footer (bottom)  | Deep forest floor | Full dark green               |

---

## 3. Theme Architecture

Four layers of tokens for scalability:

| Layer                                          | Purpose                                                                   | Example                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Foundation Tokens**                          | Raw primitives (colours, spacing, fonts)                                  | `green-base`                                                                                                          |
| **Semantic Tokens**                            | Purpose‑bound (surface, text, border)                                     | `surface-base`, `text-muted`                                                                                          |
| **Component Tokens** _(rare, exception‑based)_ | Component‑specific overrides — only when semantic tokens are insufficient | See [Component State Tokens](https://claude.ai/chat/fe3d0a5e-5192-4270-832b-0a40a831e5e1#21-component-states--tokens) |
| **Theme Overrides**                            | For variations (Alumni Portal, Admin)                                     | `--theme-alumni-accent`                                                                                               |

**Theme overrides may adjust:**

- Accent colours (within the same palette family)
- Content modules
- Navigation structure

**Theme overrides may NOT change:**

- Typography (font families, scale, line‑heights)
- Spacing scale (baseline 4px)
- Motion system (durations, easings)
- Accessibility requirements
- Core colour tokens (green, gold, surfaces)

---

## 4. Token Naming Convention

All tokens follow a consistent **hierarchical naming pattern**.

**CSS Custom Property format:**  
`--{category}-{subcategory}-{variant}`

**JavaScript / Tailwind format:**  
**Design token names** (shorthand form, used in Tailwind utilities and throughout this documentation):  
`{category}-{subcategory}-{variant}` e.g. `green-base`, `shadow-elevation-2`

> **Note on naming layers:** Token names appear in two forms depending on context:
>
> - **CSS custom property** (in `.css` / `tokens.css`): `--color-green-base`, `--shadow-elevation-2` — prefixed with the category.
> - **Design token shorthand** (in this documentation, Tailwind config, and component code): `green-base`, `shadow-elevation-2` — the category prefix is dropped because Tailwind's utility class already supplies it (e.g. `shadow-elevation-2` → `shadow-elevation-2` class, `green-base` → `text-[var(--color-green-base)]`).
>
> When the two forms appear together, the shorthand is always the token's _name_; the `--prefixed` form is its _CSS variable_.

**Examples:**

| Category | CSS Custom Property    | Token Shorthand (Tailwind / docs) |
| -------- | ---------------------- | --------------------------------- |
| Colour   | `--color-green-base`   | `green-base`                      |
| Space    | `--space-4`            | `space-4`                         |
| Sizing   | `--size-10`            | `size-10`                         |
| Shadow   | `--shadow-elevation-2` | `shadow-elevation-2`              |
| Duration | `--duration-fast`      | `duration-fast`                   |
| Scale    | `--scale-press`        | `scale-press`                     |

---

## 5. Colour System

All colours must be referenced via **design tokens** – no raw hex codes.  
Actual colour values are listed in the **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.

| Role            | Token             |
| --------------- | ----------------- |
| Forest Green    | `green-base`      |
| Gold            | `gold-base`       |
| Surface Base    | `surface-base`    |
| Surface Inverse | `surface-inverse` |
| Text Primary    | `text-primary`    |
| Text Muted      | `text-muted`      |
| Text Inverse    | `text-inverse`    |

### Semantic Colours (States)

| State   | Base Token              | Surface Token              |
| ------- | ----------------------- | -------------------------- |
| Success | `semantic-success-base` | `semantic-success-surface` |
| Error   | `semantic-error-base`   | `semantic-error-surface`   |
| Warning | `semantic-warning-base` | `semantic-warning-surface` |
| Info    | `semantic-info-base`    | `semantic-info-surface`    |

### Overlay Tokens

| Role           | Token            |
| -------------- | ---------------- |
| Light overlay  | `overlay-light`  |
| Medium overlay | `overlay-medium` |
| Heavy overlay  | `overlay-heavy`  |

---

## 6. Typography

### English Font Stack

| Role      | Token          | Foundry            |
| --------- | -------------- | ------------------ |
| Headings  | `font-display` | Christian Thalmann |
| Body / UI | `font-body`    | Rasmus Andersson   |
| Quotes    | `font-quote`   | Christian Thalmann |

### Sinhala Font Stack

| Role      | Token                  | Foundry |
| --------- | ---------------------- | ------- |
| Headings  | `font-sinhala-display` | Mooniak |
| Body / UI | `font-sinhala-body`    | Google  |
| Quotes    | `font-sinhala-display` | Mooniak |

### Type Scale (Key Tokens)

| Token          | Usage           |
| -------------- | --------------- |
| `text-display` | Hero heading    |
| `text-h1`      | Page title      |
| `text-h2`      | Section heading |
| `text-body`    | Paragraphs      |
| `text-caption` | Fine print      |

Complete type scale (sizes, line heights, letter spacing) in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.

---

## 7. Responsive Typography Rules

| Rule                                         | Implementation                                                                                                            |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Never manually shrink headings on mobile** | Use tokenised `clamp()` values only.                                                                                      |
| **Body text minimum**                        | Minimum `1rem` — `text-body` value is in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#font-sizes)**. |
| **Sinhala body line‑height**                 | Must be `leading-relaxed` — see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#line-heights)**.        |
| **Letter‑spacing**                           | Only use `tracking-*` tokens.                                                                                             |

---

## 8. Internationalisation Rules

| Rule                       | Implementation                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Sinhala line‑height**    | `leading-relaxed` for body text — see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#line-heights)**. |
| **Mixed‑language content** | Wrap each segment with `lang` attribute and appropriate font class.                                                      |
| **Date formatting**        | Use `next-intl` locale‑aware formatters.                                                                                 |
| **Number formatting**      | Use `toLocaleString(locale)`.                                                                                            |
| **Text expansion**         | Assume Sinhala is 30–40% longer; design containers with padding and wrapping.                                            |

---

## 9. Spacing & Layout Grid

### Baseline & Spacing Tokens

- **Baseline:** 4px.
- All spacing tokens: `space-{n}` where n = number of 4px units.
- Use `p-space-*`, `m-space-*`, `gap-space-*`.
- **No arbitrary values** – `mt-[22px]` forbidden.  
   Complete spacing list in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.

### Breakpoint System (Mobile‑first)

| Breakpoint     | Min width | Columns |
| -------------- | --------- | ------- |
| `sm` (default) | `0px`     | 4       |
| `md`           | `768px`   | 8       |
| `lg`           | `1024px`  | 12      |
| `xl`           | `1280px`  | 12      |
| `2xl`          | `1536px`  | 12      |

### Grid System

- Use `Grid` component from `@nexus/ui`.
- Default gutter: `gap-space-6` (24px).
- Container max‑widths are defined as tokens (see [Sizing & Container Tokens](https://claude.ai/chat/fe3d0a5e-5192-4270-832b-0a40a831e5e1#10-sizing--container-tokens)).

---

## 10. Sizing & Container Tokens

| Token           | Usage                                      |
| --------------- | ------------------------------------------ |
| `size-11`       | Minimum touch target                       |
| `max-w-prose`   | Reading width (articles, long‑form)        |
| `max-w-content` | Default container                          |
| `max-w-wide`    | Large containers (hero, featured sections) |

Complete sizing tokens in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.

---

## 11. Border Radius

| Token          | Usage               |
| -------------- | ------------------- |
| `rounded-sm`   | Buttons, cards      |
| `rounded-md`   | Modals, large cards |
| `rounded-lg`   | Hero containers     |
| `rounded-full` | Avatars, badges     |

Values are intentionally larger than typical to support the soft‑glass aesthetic. For exact pixel values, see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#7-border-radius-tokens)**.

---

## 12. Elevation & Shadows

| Token                | Usage                 |
| -------------------- | --------------------- |
| `shadow-elevation-1` | Buttons, chips        |
| `shadow-elevation-2` | Cards                 |
| `shadow-elevation-3` | Modals, dropdowns     |
| `shadow-elevation-5` | Hero glass containers |

Complete shadow tokens in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.

---

## 13. Glass System & Tokens

**Rule:** No `backdrop-filter` ever. Glass is achieved through dedicated tokens:

| Token                  | Usage                               |
| ---------------------- | ----------------------------------- |
| `glass-surface-light`  | Light floating panels (white‑based) |
| `glass-surface-medium` | Medium translucency                 |
| `glass-border`         | Border for glass panels             |
| `glass-shadow`         | Shadow for glass panels             |

These tokens are defined in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**.  
Blur filters are **never** used for glass – they are reserved for image effects, glows, and loading states.

---

## 14. Z-Index Layering

| Token        | Layer              |
| ------------ | ------------------ |
| `z-base`     | Default            |
| `z-raised`   | Slightly raised    |
| `z-sticky`   | Sticky headers     |
| `z-dropdown` | Dropdown menus     |
| `z-overlay`  | Backdrops          |
| `z-modal`    | Modals, lightboxes |
| `z-toast`    | Toasts             |
| `z-loading`  | Full‑page loading  |

---

## 15. Icon System

- **Library:** Lucide React.
- **Sizes:** `icon-sm`, `icon-md`, `icon-lg`, `icon-xl` — see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#17-icon-size-tokens)** for values.
- **Stroke width:** `1.5px` (Lucide default).
- **Colour:** Inherits current text colour unless overridden with token.

---

## 16. Touch Target Specification

**All interactive elements must have a minimum hit area of 44×44px** (see `size-11` in **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md#4-sizing-tokens)**).

| Element             | Requirement                                                          |
| ------------------- | -------------------------------------------------------------------- |
| Buttons             | Minimum 44×44px. Use `size="md"` (maps to `size-11`) or add padding. |
| Icon buttons        | Must have `size="icon"` (≥44px) and `aria-label`.                    |
| Links in navigation | Padding to reach 44px height.                                        |
| Menu items          | Minimum 44px height.                                                 |
| Form controls       | Ensure label click area + control meet 44px.                         |

**Exception:** Inline links within body text may be smaller but must have sufficient spacing around them.

---

## 17. Motion & Animation

Two libraries with clear boundaries:

| Library           | Responsibility                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Framer Motion** | Component‑level: scroll reveals, hover effects, layout animations, micro‑interactions, state transitions.                 |
| **GSAP**          | Timeline‑based, cinematic sequences: crest drawing, page‑level ambient animations, coordinated multi‑element transitions. |

All durations, easings, and transform scales must use tokens (see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)**).  
No custom inline timings or scale values.

| Transform Token    | Value  | Usage               |
| ------------------ | ------ | ------------------- |
| `scale-press`      | `0.98` | Button active state |
| `scale-card-hover` | `1.02` | Card hover lift     |

### Loading Screen (Crest Animation)

- **Trigger:** Only on selected pages (home, about, alumni).
- **Behaviour:** Crest draws (GSAP), gold flood fades in, continuous pulse (Framer Motion).
- **Dismissal:** Only when **content is fully ready** (images loaded, data fetched, hydration complete).

### Page Transitions (Client‑Side Navigation)

- **Animation:** Fade to dark (dark overlay, `duration-standard`), then fade back to light with new content.
- **Implementation:** `AnimatePresence` + `usePathname`.
- **Dark overlay uses** `overlay-heavy` token.

### Micro‑interactions

- Buttons: `active:scale-press` with `duration-fast`.
- Cards: `hover:scale-card-hover` with `duration-gentle`.
- All animations respect `prefers-reduced-motion` (`useReducedMotion`).

---

## 18. Image Standards

### Photography Guidelines

| Guideline                 | Implementation                                   |
| ------------------------- | ------------------------------------------------ |
| **Natural lighting**      | Prefer outdoor, candid shots. Avoid flash.       |
| **Real students**         | Use actual school photos, not stock photography. |
| **Showcase campus**       | Highlight buildings, grounds, classrooms, labs.  |
| **Avoid over‑processing** | No heavy filters or artificial HDR.              |

### Aspect Ratios (Tokens)

| Context            | Token                   |
| ------------------ | ----------------------- |
| Hero               | `aspect-hero` (16:9)    |
| News cards         | `aspect-news` (16:9)    |
| Staff profiles     | `aspect-portrait` (3:4) |
| Gallery thumbnails | `aspect-square` (1:1)   |
| Event featured     | `aspect-event` (16:7)   |

### Technical Standards

- Use `next/image` for all images.
- Provide `width`, `height`, and `sizes` attributes.
- Lazy load below‑the‑fold images (`loading="lazy"`).
- Use WebP format with fallback.

---

## 19. Empty, Error & Loading Philosophy

| State           | Standard                                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Loading**     | Prefer **skeleton screens** over spinners for page content. Use spinners only for small, inline actions (buttons, form submission). |
| **Empty State** | Explain **why** data is absent. Provide a **next action** (e.g., “No news yet. Check back later.”).                                 |
| **Error State** | Explain **what happened** in plain language. Explain **how to recover** (e.g., “Failed to load results. Refresh the page.”).        |

Use `EmptyState`, `ErrorState`, `LoadingSkeleton` components from `@nexus/ui`.

---

## 20. Accessibility Standards

Nexus must meet **WCAG 2.1 Level AA**.

| Area                    | Standard                                                                                                                    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Focus ring**          | Use `focus-ring-color` (gold), `focus-ring-width` (2px), `focus-ring-offset` (2px). No `outline: none` without replacement. |
| **Keyboard navigation** | All interactive elements reachable and operable with keyboard.                                                              |
| **Screen readers**      | Semantic HTML, `aria-label`/`aria-labelledby`, `sr-only` utility.                                                           |
| **Colour contrast**     | Normal text ≥4.5:1, large text ≥3:1.                                                                                        |
| **Reduced motion**      | Use `useReducedMotion` hook; skip non‑essential animations.                                                                 |

---

## 21. Component States & Tokens

Every interactive component must define and use the following state tokens (see **[Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)** for values):

| State        | Tokens                                                      |
| ------------ | ----------------------------------------------------------- |
| **Default**  | base styles                                                 |
| **Hover**    | `surface-hover`, `text-link-hover`, etc.                    |
| **Focus**    | `focus-ring-color`, `focus-ring-width`, `focus-ring-offset` |
| **Active**   | `scale-press`, `surface-active`                             |
| **Disabled** | `opacity-disabled` (0.5), `surface-disabled`                |
| **Loading**  | `opacity-loading` (0.6), skeleton colours                   |

All state styles use tokens – no custom colours or scales.

Component‑specific token overrides (e.g., `button-primary-bg`) are **discouraged** unless absolutely necessary. If used, they must be documented and approved by maintainers.

---

## 22. Forms Specification

| Element                        | Standard                                                                                                                                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inputs, Selects, Textareas** | Use the `input-base` CSS utility class (shared base styles) and the `border-error` token for errors. `input-base` is a **component utility class**, not a design token. |
| **Checkboxes & Radios**        | Custom‑styled with `peer` pattern, native behaviour.                                                                                                                    |
| **Validation messages**        | Use `FormErrorMessage`; linked with `aria-describedby`.                                                                                                                 |
| **Layout**                     | Use `FormFieldGroup` and `FormSectionWrapper` **components** from `@nexus/ui`. These are layout wrappers, not tokens.                                                   |
| **Required fields**            | Mark with `*` and `required` attribute.                                                                                                                                 |

---

## 23. Data Display Patterns

| Pattern       | Component                | Usage                            |
| ------------- | ------------------------ | -------------------------------- |
| Tables        | `DataTable`              | Results, staff lists, timetables |
| Timelines     | `Timeline`               | History, admissions dates        |
| Statistics    | `StatsStrip`, `StatCard` | Student numbers, pass rates      |
| Results       | `ResultsDisplay`         | O/L, A/L, Scholarship            |
| Announcements | `NewsCard` (compact)     | Latest news                      |
| FAQs          | `Accordion`              | Long lists of requirements       |

All available in `@nexus/ui`.

---

## 24. Content Guidelines

### Voice & Tone

- **Formal but welcoming** – like a respected headmaster.
- **Educational** – informs and guides.
- **Heritage‑focused** – proud but not arrogant.

### Avoid

- Marketing jargon (“world‑class”, “cutting‑edge”).
- Excessive exclamation marks.
- Corporate language (“leverage”, “synergy”).
- Overly emotional pleas.

### Language‑Specific

- Sinhala uses full stops (।) where appropriate.
- Mixed English–Sinhala sentences maintain LTR direction.
- Date format: `2026 මැයි 30` (Sinhala), `May 30, 2026` (English).

---

## 25. SEO & Metadata Standards

Every page **must** include:

| Element              | Requirement                                      |
| -------------------- | ------------------------------------------------ |
| **Title**            | Unique, descriptive, ≤60 characters.             |
| **Description**      | Unique, descriptive, ≤160 characters.            |
| **Open Graph image** | 1200×630px, representative of page.              |
| **Canonical URL**    | Self‑referencing, absolute.                      |
| **Structured data**  | Where applicable (School, Article, Event, etc.). |

Use Next.js `generateMetadata` pattern.

---

## 26. Security & Privacy Guidelines

**Critical for admissions and results portals:**

| Rule                                                                                                                       | Implementation |
| -------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Never expose student identifiers** without authorisation.                                                                |                |
| **Examination data** accessible only to the authenticated user or via secure, time‑limited token.                          |                |
| **Internal admin information** never leaked to client.                                                                     |                |
| **Form validation** must occur on both client and server.                                                                  |                |
| **No sensitive data in URLs.**                                                                                             |                |
| **Use HTTPS everywhere.**                                                                                                  |                |
| **Secrets, API keys, and credentials must never be exposed to the client.** (Use environment variables, server‑side only.) |                |

---

## 27. Performance Rules

| Rule                                     | Target       |
| ---------------------------------------- | ------------ |
| Use `next/image` for all images.         | Mandatory    |
| Prefer SVGs over PNG/JPG.                | Mandatory    |
| Avoid client components unless required. | Guideline    |
| Lighthouse performance score (mobile).   | ≥ 90         |
| Cumulative Layout Shift (CLS).           | < 0.1        |
| Largest Contentful Paint (LCP).          | < 2.5s       |
| Total bundle size (initial load).        | < 200KB (JS) |

---

## 28. Architecture Boundary & Ownership

| Package         | Ownership         | Responsibility                                                                                                 |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------- |
| `@nexus/config` | KITS              | **Tokens only** – colours, spacing, typography, motion, etc. No components.                                    |
| `@nexus/ui`     | KITS              | **Reusable components** – all UI building blocks. Depends on `@nexus/config`.                                  |
| `apps/web`      | KITS              | **Composition only** – pages, data fetching, routing. Must not redefine tokens or duplicate shared components. |
| `apps/admin`    | KITS (restricted) | **Admin Panel** – same rule: composition only, no token redefinition.                                          |

**Rule:** Apps must not define their own tokens or duplicate components from `@nexus/ui`. Component overrides are forbidden.

---

## 29. Component Inventory

All approved components are in `@nexus/ui`. Full catalogue in `Component Reference.md` (or Storybook).

| Category        | Components                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Foundations** | (covered in this document)                                                                                                 |
| **Navigation**  | Navbar, Footer, Breadcrumb, MobileMenu, NavLink, LanguageSwitcher                                                          |
| **Layout**      | Container, Grid, GridItem, Stack, Drawer, Hero                                                                             |
| **Cards**       | AcademicStreamCard, AchievementCard, EventCard, FacilityCard, GalleryAlbumCard, NewsCard, SocietyCard, StaffCard, StatCard |
| **Forms**       | Input, Textarea, Select, Checkbox, Radio, Toggle, FileUploadZone, Slider, FormValidationSummary, RequirementsChecklist     |
| **Feedback**    | Alert, Modal, Toast, ProgressIndicator, EmptyState, ErrorState, LoadingSkeleton                                            |
| **Data**        | DataTable, Timeline, StatsStrip, ResultsDisplay, StreamComparisonTable, TimetableGrid, StudentJourneyFlow                  |
| **Media**       | ImageFrame, VideoFrame, Lightbox, PanoramicFacilityViewer, AudioPlayer                                                     |
| **Typography**  | Heading, Text, EyebrowLabel, QuoteBlock, SectionHeader, InlineLink, RichTextRenderer                                       |
| **Utility**     | CountdownTimer, ShareSheet, BackToTopButton, ScrollProgressBar                                                             |

Every component must have:

- Documentation (props, usage)
- Accessibility review
- Storybook example
- Unit tests where applicable

---

## 30. Browser Support

| Browser           | Supported Versions       |
| ----------------- | ------------------------ |
| Chrome            | Latest 2 stable versions |
| Edge              | Latest 2 stable versions |
| Safari            | Latest 2 stable versions |
| Firefox           | Latest 2 stable versions |
| Internet Explorer | **Not supported**        |

All CSS features used must be compatible with the supported browser set. `backdrop-filter` is already banned.

---

## 31. System Integrity Rules

These rules are **enforced** in every PR.

| Rule                                                              | Enforcement Method             |
| ----------------------------------------------------------------- | ------------------------------ |
| No raw colours (only token references)                            | ESLint rule                    |
| No arbitrary spacing values                                       | ESLint rule                    |
| No `backdrop-filter` property                                     | ESLint rule                    |
| No Tailwind grey classes (`text-gray-*`)                          | ESLint rule                    |
| All animation durations and easings must use tokens               | ESLint rule                    |
| All transform scales must use tokens (e.g., `scale-press`)        | ESLint rule                    |
| Blur tokens only for image effects/glows/loading, never for glass | Manual review                  |
| Reduced motion respected                                          | Manual review + automated test |
| Minimum touch target 44×44px                                      | Manual review (Lighthouse)     |
| Semantic HTML and ARIA requirements                               | Axe / Lighthouse               |
| Colour contrast passes WCAG AA                                    | Axe / Lighthouse               |

---

## 32. Governance & Versioning

### Versioning

Follow **Semantic Versioning** (MAJOR.MINOR.PATCH).

- **MAJOR** – Breaking token/component API changes.
- **MINOR** – New components/tokens/features.
- **PATCH** – Bug fixes, documentation.

### Change Management

1. **Proposal** – GitHub issue.
2. **Design review** – Maintainer approval.
3. **Implementation** – PR with tokens, components, docs, tests.
4. **Changelog** – Update `CHANGELOG.md`.

### Release Criteria

A release is considered complete when:

- Tokens are documented in `Tokens Reference.md`
- Components are documented in `Component Reference.md` (or Storybook)
- Storybook is updated
- Changelog is updated
- Accessibility checks pass (axe, Lighthouse)
- Performance benchmarks pass (Lighthouse ≥90 on mobile)
- All tests pass

### Deprecation

- Mark `@deprecated` in JSDoc.
- Provide migration path.
- Remove after two major releases.

### PR Approval Requirements

- Code must pass lint, typecheck, and tests.
- At least one maintainer must approve.
- Design changes require visual review (screenshots or Storybook).

---

## Related Documentation

- **[Design Tokens Reference](https://claude.ai/chat/Tokens%20Reference.md)** – Complete listing of all token values.
- **Component Reference.md** – Full component catalogue and usage.
- **[Page Specifications](https://claude.ai/chat/Page%20Specifications.md)** – Page layouts and content requirements.

---

_C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth_
