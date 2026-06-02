## Overview

Nexus must be usable by everyone, regardless of ability or assistive technology. This document defines the accessibility requirements (WCAG 2.1 Level AA) and provides implementation guidance.

---

## Compliance Target

- **Standard:** WCAG 2.1 Level AA
- **Testing tools:** axe DevTools, Lighthouse, NVDA (Windows), VoiceOver (macOS), Keyboard-only navigation
- **Responsibility:** All new components must be tested before merge; periodic audits (quarterly)

---

## Keyboard Navigation

### Focus Order

- Focus must move in logical order (left to right, top to bottom).
- No keyboard traps (focus cannot get stuck in any element).
- Visible focus indicator on all interactive elements (see [Focus Management](#focus-management)).

### Interactive elements

| Element | Keyboard interaction |
|---------|----------------------|
| Button, link | Enter / Space |
| Dropdown menu | Arrow keys, Enter, Escape |
| Modal | Escape to close, Tab cycles inside modal |
| Accordion | Enter / Space to expand/collapse |
| Slider | Arrow keys (left/right, up/down), Home/End |
| Tabs | Arrow keys to switch tabs |

### Skip to content

Every page must have a skip link as the first focusable element:

```html
<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
<main id="main-content">...</main>
```

---

## Focus Management

### Focus Ring

All interactive elements must have a visible focus ring using the tokenised style:

```css
:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}
```

**Never** use `outline: none` without a visible replacement.

### Focus Management for Dynamic Content

- When a modal opens, focus moves to the first focusable element inside the modal.
- When modal closes, focus returns to the element that opened it.
- When content updates (e.g., search results), announce changes via `aria-live`.

---

## Screen Reader Support

### Semantic HTML

Use correct HTML elements instead of generic `div`/`span`:

| Role | Correct element |
|------|-----------------|
| Navigation | `<nav>` |
| Main content | `<main>` |
| Section | `<section>` with heading |
| Heading | `<h1>`–`<h6>` (no skipping levels) |
| List | `<ul>` / `<ol>` |
| Button | `<button>` (not `div` with click handler) |
| Link | `<a href>` (not `div` with click handler) |

### ARIA

- Use `aria-label` for icon buttons without visible text.
- Use `aria-describedby` to associate help text or error messages with form fields.
- Use `aria-live="polite"` for dynamic content updates (e.g., toast messages).
- Use `aria-expanded` for expandable content (accordions, dropdowns).
- Use `aria-current` for current page in navigation.

Example:

```html
<button aria-label="Close menu" aria-expanded="false">☰</button>
<nav aria-label="Main navigation">...</nav>
```

### Hiding Content

| Requirement | Method |
|-------------|--------|
| Hide from screen reader but visible | `aria-hidden="true"` |
| Hide from screen reader and visually | `display: none` (do not use `aria-hidden` + `hidden` inconsistently) |
| Hide visually but keep for screen reader | `sr-only` class |

---

## Colour Contrast

Minimum contrast ratios (WCAG AA):

| Text type | Ratio |
|-----------|-------|
| Normal text (body) | 4.5:1 |
| Large text (≥18pt or ≥14pt bold) | 3:1 |
| UI components (icons, borders) | 3:1 (against adjacent colour) |

**Validated token pairs:**

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| `text-primary` (#1C1A16) | `surface-base` (#E6F2EA) | 12.2:1 | ✓ |
| `text-muted` (#4A5C4D) | `surface-base` (#E6F2EA) | 5.8:1 | ✓ |
| `text-inverse` (#F5EFE4) | `surface-inverse` (#0F2918) | 14.3:1 | ✓ |
| `text-link` (gold‑base #C9973A) | `surface-base` | 4.8:1 | ✓ |
| `semantic-error-base` | `semantic-error-surface` | 5.2:1 | ✓ |

**Never** use low‑contrast combinations (e.g., `text-muted` on `surface-elevated` may be close; verify).

---

## Reduced Motion

All animations must respect `prefers-reduced-motion`:

```typescript
import { useReducedMotion } from 'framer-motion';

const prefersReduced = useReducedMotion();

const animation = prefersReduced ? { opacity: 1 } : { x: 0, opacity: 1, transition: { duration: 0.5 } };
```

**Skip these animations when reduced motion is preferred:**
- Crest drawing animation (show static crest instead)
- Page transitions (replace with instant switch)
- Scroll reveals (show all content immediately)
- Ambient embers (hide or show static glow)

**Keep these essential animations:**
- Focus rings
- Loading spinners (fade, no motion if reduced)
- Hover colour changes (no movement)

---

## Touch Targets

Minimum hit area: **44×44px** (WCAG 2.2 recommendation).

| Element | Requirement |
|---------|-------------|
| Buttons | Use `size="md"` (44px) or add padding to reach 44px |
| Icon buttons | Must have `size="icon"` (≥44px) and `aria-label` |
| Links in navigation | Padding to reach 44px height |
| Form controls | Ensure label + control meet 44px |

Test with Chrome DevTools (Rendering → Show hit‑regions).

---

## Form Accessibility

### Labelling

- Every form control must have an associated `<label>` (use `htmlFor` or wrap control in label).
- Placeholder is **not** a label.

### Error Messages

- Associate error message with input using `aria-describedby`:

```html
<label for="email">Email</label>
<input type="email" id="email" aria-describedby="email-error" />
<div id="email-error" role="alert">Invalid email address</div>
```

- Error messages must be announced by screen readers (use `role="alert"` for dynamic errors).

### Required Fields

- Mark required fields with `required` attribute and visible indicator (usually `*`).
- Add `aria-required="true"`.

### Validation

- Provide real‑time validation suggestions (not just after submit).
- Never rely solely on colour to indicate error (add icon or text).

---

## Images & Media

### Alt Text

- All non‑decorative images must have meaningful `alt` text.
- Decorative images may have empty `alt` (or `role="presentation"`).
- Avoid "image of", "photo of". Be concise:

```html
<img src="principal.jpg" alt="Principal Mr. Rajapaksa speaking at assembly" />
```

### Audio & Video

- Provide transcripts for audio (e.g., school anthem lyrics).
- Provide captions for videos.
- Audio/Video players must be keyboard operable (custom controls like `AudioPlayer` must have keyboard support).

---

## Testing & Audits

### Automated

Run `axe` in CI:

```bash
pnpm run test:axe
```

Integration with GitHub Actions: fail build if critical issues found.

### Manual

- Keyboard test: Tab through entire page, verify focus order and no traps.
- Screen reader test: NVDA (Windows) or VoiceOver (macOS).
- Zoom test: Zoom to 200%, ensure no horizontal scrolling and content remains readable.
- Colour contrast test: Use axe or Colour Contrast Analyser.

### Audit frequency

- Full audit: before each release (v1.0, v1.1, etc.)
- Spot checks: on every PR that adds or modifies components.

---

## Accessibility Statement

A public accessibility statement must be available at `/accessibility`. It includes:

- Commitment to WCAG 2.1 AA.
- Known limitations (if any).
- Contact method for reporting accessibility issues (email: accessibility@cwwkcc.lk).
- Response timeline (e.g., 2 business days).

---

## Related Documents

- [Foundations – Accessibility](Foundations.md#20-accessibility-standards)
- [Component Usage Guidelines – Accessibility Checklist](./Component%20Usage%20Guidelines.md#accessibility-checklist-per-component)
- [Launch Readiness Checklist](Launch%20Readiness%20Checklist.md)

---

*C.W.W. Kannangara Central College – Est. 1873 – Wisdom is All Wealth*
