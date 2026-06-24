**Date:** June 2026  
**Status:** Accepted

---

## Context

The Nexus platform supports three languages: English, Sinhala, and Tamil. Each script requires different typefaces:

| Script  | Display Font       | Body Font          |
| ------- | ------------------ | ------------------ |
| English | Cormorant Garamond | Inter              |
| Sinhala | Maname             | Noto Serif Sinhala |
| Tamil   | Noto Serif Tamil   | Noto Serif Tamil   |

The challenge is applying the correct font to the correct script without manual per-component class management.

The options considered:

1. **CSS variable stacking** — One font-family with multiple fallbacks
2. **Per-component font classes** — Different classes for different scripts
3. **Runtime script detection** — Detect script and apply font
4. **Unicode range in @font-face** — Browser selects based on characters

---

## Decision

Use **CSS variable stacking** with `@font-face` unicode ranges.

### Implementation

```css
/* CSS custom properties with font stacking */
:root {
  --font-family-display: 'Cormorant Garamond', 'Maname', 'Noto Serif Tamil', Georgia, serif;
  --font-family-body: 'Inter', 'Noto Serif Sinhala', 'Noto Serif Tamil', system-ui, sans-serif;
}

/* Next.js font configuration */
const displayFont = CormorantGaramond({
  variable: '--font-display',
  subsets: ['latin'],
});

const sinhalaDisplay = Maname({
  variable: '--font-sinhala-display',
});

const sinhalaBody = NotoSerifSinhala({
  variable: '--font-sinhala-body',
});

const tamilBody = NotoSerifTamil({
  variable: '--font-tamil-body',
});
```

### How It Works

1. Each font is loaded via `next/font` with a CSS variable
2. The `--font-family-display` variable stacks all fonts
3. The browser selects the correct font based on character unicode ranges
4. No per-component script detection required

---

## Alternatives Considered

### 1. Per-Component Font Classes (Rejected)

**Pros:**

- Explicit control

**Cons:**

- Every component needs script detection
- Verbose
- Error-prone

### 2. Runtime Script Detection (Rejected)

**Pros:**

- Works with any content

**Cons:**

- Runtime overhead
- Must handle dynamic content
- Complex logic

### 3. Unicode Range in @font-face (Rejected)

**Pros:**

- Browser handles selection

**Cons:**

- Must define ranges for every script
- Complex to configure
- Font loading may be suboptimal

---

## Consequences

### Positive

- Zero per-component font management
- Automatic script selection
- Trivial to add a fourth language
- Consistent across all components

### Negative

- Requires understanding of CSS variable stacking
- Font loading order matters

### Mitigations

- Document the approach
- Use `next/font` for optimal loading
- Test across all three scripts
