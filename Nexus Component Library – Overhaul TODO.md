## Priority 1 – Atoms (used everywhere)

### Button
- [x] Replace inline `border` styles with Tailwind border classes.
- [x] Use `size-10` token for `size="icon"` (currently `w-10 h-10`).
- [ ] Add `aria-busy` when `loading`.
- [x] Ensure focus ring uses token `outline-gold-base`.
- [x] Test all variants: `primary`, `secondary`, `ghost`, `outline`, `destructive`, `link`.
- [x] Test all sizes: `sm`, `md`, `lg`, `icon`.
- [ ] Ensure `loading` shows spinner and disables clicks.
- [x] Verify `fullWidth` applies `w-full`.

### Input, Textarea, Select
- [ ] Replace inline border styles with conditional Tailwind classes (error vs default).
- [ ] Use token classes: `border-border-default`, `border-semantic-error-base`.
- [ ] Ensure labels use `text-label` + `tracking-label`.
- [ ] Add `aria-describedby` linking to helper/error text.
- [ ] iOS zoom fix: `font-size` minimum `1rem` (already `text-body` = 1.05rem).
- [ ] Test disabled state styling.

### Checkbox, Radio, Toggle
- [ ] Replace custom CSS with Tailwind peer‑based styling.
- [ ] Use token colors: `border-border-default`, `bg-green-base` for checked.
- [ ] Ensure focus ring on custom control, not hidden native input.
- [ ] Touch target minimum 44px (label + control area).
- [ ] Test `disabled` opacity.

### Badge
- [ ] Use token background and text colors.
- [ ] Ensure `status` variant maps to semantic tokens (`semantic-success-base`, etc.).
- [ ] Add `aria-label` for status variant.

### Tag (Chip)
- [ ] Use `bg-surface-default`, `text-text-muted`; active: `bg-green-base text-text-inverse`.
- [ ] Make interactive variant have proper focus ring.
- [ ] Ensure spacing uses `space-*` tokens.

### Avatar
- [ ] Use `size-*` tokens for dimensions.
- [ ] Use `bg-green-base`, `bg-gold-base`, `bg-surface-deep` variants.
- [ ] Ensure initials are generated correctly.
- [ ] Add `aria-label`.

### Tooltip
- [ ] Replace inline styles with Tailwind classes for positioning, background, text.
- [ ] Use `z-modal` token.
- [ ] Ensure appears on hover/focus, disappears on blur.
- [ ] Respect reduced motion (no animation if preferred).

### InlineHelpText
- [ ] Already simple, but ensure `text-caption` + token colors.

### Spinners (BeatLoader, ScaleLoader)
- [ ] Already token‑based, but verify `useReducedMotion` is used.
- [ ] Ensure `aria-label` is always present.

---

## Priority 2 – Layout & Navigation

### Container
- [ ] Already uses tokens? Review: `max-w-prose`, `max-w-content`, etc. Good.
- [ ] Ensure `padding` prop uses `space-*` tokens.

### Grid & GridItem
- [ ] Verify responsive columns map correctly (1→md:2→lg:3, etc.).
- [ ] Check that `gap` maps to `gap-space-*` tokens.
- [ ] Ensure `GridItem colSpan` works on mobile (caps at 6).

### VStack / HStack
- [ ] Replace inline styles with Tailwind flex classes.
- [ ] `spacing` prop must map to `gap-space-*`.
- [ ] Ensure `align`, `justify`, `wrap` work.
- [ ] Add semantic `as` prop (div, nav, ul, etc.).

### Navigation (Header)
- [ ] Remove inline styles for background, borders, shadows.
- [ ] Use `bg-surface-base`, `border-border-light`, `shadow-elevation-2` etc.
- [ ] Mobile menu: ensure focus trap, Escape key, `aria-expanded`.
- [ ] Use token motion: `duration-standard`, `ease-out`.
- [ ] Ensure active link uses `text-gold-base` + `border-gold-base`.

### MobileMenu
- [ ] Replace all inline styles with Tailwind classes.
- [ ] Ensure sub‑menu slide animation uses duration/easing tokens.
- [ ] Focus management when sub‑menu opens.
- [ ] Touch targets 44px minimum.

### Breadcrumb
- [ ] Use `text-caption` + token colors.
- [ ] Ensure `onDark` variant uses correct inverse colors.
- [ ] Separator uses `space-*` margins.

### Footer
- [ ] Replace inline styles with Tailwind (background, borders, spacing).
- [ ] Ensure responsive layout matches spec (mobile stacked, tablet 2‑col, desktop 5‑col).
- [ ] Use `NavLink` for all links.
- [ ] Social icons: use token hover `text-gold-base`.

### Hero
- [ ] Replace inline styles with Tailwind classes.
- [ ] Use token motion for animations.
- [ ] Ensure `variant` affects height, padding, overlay correctly.
- [ ] Scroll indicator respects reduced motion.
- [ ] Ken Burns effect uses token durations? (Currently hardcoded – move to `duration-slow`?).

### Drawer
- [ ] Use Tailwind for positioning, sizing, shadows.
- [ ] Ensure `persistent` variant works without backdrop.
- [ ] Focus trap when open.

### QuickAccessPortal
- [ ] Already mostly Tailwind. Verify spacing tokens.

---

## Priority 3 – Cards

### NewsCard
- [ ] **Complete rewrite** – replace all inline `style` objects with Tailwind classes.
- [ ] Use `shadow-elevation-1` resting, `shadow-elevation-3` on hover.
- [ ] Use `gap-space-*`, `p-space-*`.
- [ ] Image hover scale uses `duration-gentle`.
- [ ] Ensure responsive grid (1 col mobile, 2 tablet, 3 desktop) – handled by parent Grid.
- [ ] Featured variant aspect ratio `16/7` – use `aspect-[16/7]`.

### EventCard
- [ ] Same as NewsCard – inline styles → Tailwind.
- [ ] Status badges use semantic colors.
- [ ] Date block uses token typography.
- [ ] Compact variant border‑bottom uses `border-border-light`.

### SocietyCard
- [ ] Inline styles → Tailwind.
- [ ] Featured variant gold border `border-gold-base`.
- [ ] Hover transform `-translate-y-0.5`.

### StaffCard
- [ ] Principal variant: two‑column layout using Tailwind grid.
- [ ] Grid variant: `aspect-[3/4]` for portrait.
- [ ] Use token shadows and hover effects.

### StatCard
- [ ] Use `useCountUp` hook (already good). Verify token colors.
- [ ] Trend indicator uses semantic colors.

### AcademicStreamCard
- [ ] Already mostly Tailwind? Check spacing tokens.
- [ ] Hover effect left accent bar – use absolute positioning with Tailwind.

### AchievementCard
- [ ] Convert inline styles to Tailwind.
- [ ] `ticker-item` variant should be horizontal flex, not grid.

### FacilityCard
- [ ] Inline styles → Tailwind.
- [ ] Schedule table uses border tokens.
- [ ] Image hover scale.

### GalleryAlbumCard
- [ ] Inline styles → Tailwind.
- [ ] Overlay on hover uses `bg-overlay-medium`.

### DownloadableDocumentItem
- [ ] Use `flex`, `gap-space-4`, token backgrounds.
- [ ] File icon uses `text-gold-base`.

### ExtracurricularCard
- [ ] Convert inline styles.
- [ ] Accent strip use `bg-gold-base` or `bg-green-base`.

---

## Priority 4 – Forms & Feedback

### ContactForm, FeedbackForm
- [ ] Already uses `react-hook-form` + `zod`. Good.
- [ ] Ensure API endpoints exist (`/api/contact`, `/api/feedback`).
- [ ] Replace any inline styles in form fields (they use Input/Textarea components – fix those first).
- [ ] Add `aria-live` for submission status.

### FileUploadZone
- [ ] Inline styles → Tailwind classes.
- [ ] Drag state uses token background `bg-gold-pale`.
- [ ] Error styling uses semantic colors.
- [ ] Accessible labels and hints.

### ProgressIndicator
- [ ] Steps variant: use Tailwind for circles, lines.
- [ ] Bar variant: height `h-1` (or token `h-size-1`?).
- [ ] Use token colors `bg-green-base`.

### RequirementsChecklist
- [ ] Already uses Checkbox component – good.
- [ ] Print button style uses token borders and hover.

### Slider
- [ ] Inline styles → Tailwind.
- [ ] Use `bg-green-base` for filled portion.
- [ ] Thumb focus ring token.
- [ ] Ensure touch target size.

### Modal
- [ ] Replace backdrop styles with Tailwind `bg-overlay-medium`.
- [ ] Use `shadow-elevation-3`.
- [ ] Add focus trap (focus remains inside modal).
- [ ] Animation uses `duration-standard`, `ease-out`.
- [ ] Destructive variant uses semantic error colors.

### Toast
- [ ] Use token colors for variants.
- [ ] Animation uses `duration-gentle`, `ease-out`.
- [ ] Ensure `role="status"` or `alert`.

### Alert
- [ ] Use semantic background and border tokens.
- [ ] Icons from token set.

### Accordion
- [ ] Inline styles → Tailwind.
- [ ] Chevron rotation uses `transform transition-transform duration-standard`.
- [ ] Focus ring on button.

---

## Priority 5 – Media & Visualization

### ImageFrame
- [ ] Use `aspect-*` tokens for ratios.
- [ ] Overlay uses `bg-overlay-light/medium/heavy`.
- [ ] Caption uses `Caption` component.

### VideoFrame
- [ ] Use `aspect-*` tokens.
- [ ] Play button uses `Button` component.
- [ ] Poster image fallback.

### Lightbox
- [ ] Use Tailwind for positioning, backdrop `bg-overlay-heavy`.
- [ ] Navigation buttons use token hover.
- [ ] Keyboard navigation.

### PanoramicFacilityViewer
- [ ] Inline styles → Tailwind.
- [ ] Use token shadows.
- [ ] Thumbnail strip horizontal scroll.

### DataTable
- [ ] Use border tokens, `bg-surface-deep` for header.
- [ ] Sort icons use token colors.
- [ ] Responsive overflow scroll.

### StreamComparisonTable
- [ ] Mobile card view uses proper spacing tokens.
- [ ] Desktop table uses border tokens.
- [ ] Pass rate bars use `bg-green-base`.

### TimetableGrid
- [ ] Use border tokens, alternating row background `bg-surface-default/50`.
- [ ] Responsive overflow.

### ResultsDisplay
- [ ] PDF download button uses `Button` component.
- [ ] Seal icon uses token `fill-gold-base`.

### ComparisonBar, ProgressArc, ProcessSteps, StudentJourneyFlow
- [ ] Convert inline styles to Tailwind.
- [ ] Use token colors for bars, arcs.
- [ ] Ensure animations respect reduced motion.

---

## Priority 6 – System & Global

### LoadingScreen
- [ ] Use `bg-green-base`, token animation durations.
- [ ] Glow pulse uses `duration-ceremonial`.
- [ ] Reduced motion fallback.

### CookieConsentBanner
- [ ] Use Tailwind for positioning `fixed bottom-0`, background `bg-surface-inverse`.
- [ ] Buttons use `Button` component.
- [ ] Ensure `z-toast`.

### OfflineBanner
- [ ] Use `bg-surface-inverse text-text-inverse`.
- [ ] Position with `top: var(--nav-height)` – ensure CSS variable is defined.

### NotFoundPage
- [ ] Use `min-h-screen`, `bg-green-base`, token spacing.
- [ ] Links use `NavLink`.
- [ ] Embers effect (AmbientEmbers) – already good.

### AnnouncementBanner
- [ ] Use semantic background and border tokens.
- [ ] Dismiss button uses token colors.
- [ ] Ensure `aria-live`.

### LanguageSwitcher
- [ ] Use `text-gold-base` for active, `text-text-muted` for inactive.
- [ ] Sinhala/Tamil fonts use `font-sinhala`, `font-body`.

### CrestAnimation
- [ ] Use token durations for animation steps.
- [ ] Ensure reduced motion fallback.

### BackToTopButton
- [ ] Use `Button` component.
- [ ] Position `fixed bottom-6 right-6` with token spacing.
- [ ] Smooth scroll.

### ScrollProgressBar
- [ ] Use `bg-gold-base` for fill, `bg-gold-base/20` for track.
- [ ] Height `h-0.5` (2px).

### MasonryGrid
- [ ] Use Tailwind for column flex.
- [ ] Gap uses `space-*` tokens.

### MapEmbed
- [ ] Use border tokens, `rounded-lg`.

### ShareSheet
- [ ] Use Tailwind for modal bottom sheet.
- [ ] Animation `duration-gentle`, `ease-out`.
- [ ] Copy link button uses semantic colors.

---

## Priority 7 – Hooks & Utilities

### useCountUp
- [ ] Already good. Ensure respects reduced motion.

### useInView
- [ ] Good.

### useFormField
- [ ] Good.

### useActiveSection, useLocalStorage, useMediaQuery, useScrollDirection
- [ ] Good.

### cn utility
- [x] Already `clsx` + `twMerge` – perfect.

---

## Cross-cutting tasks

- [ ] **Remove all `style` imports** (e.g., `import { CSSProperties } from 'react'`) where not absolutely necessary.
- [ ] **Replace `any` types** with proper interfaces.
- [ ] **Add JSDoc comments** to all component props.
- [ ] **Ensure each component has a display name**.
- [ ] **Update demo pages** (`apps/web/src/app/[locale]/components/`) to reflect fixed components – remove inline styles in demos.
- [ ] **Run ESLint** and fix all warnings.
- [ ] **Test on real mobile devices** (Android, iOS) for touch and font rendering.
- [ ] **Verify all components pass Lighthouse accessibility** (after fixes).

---
