# Nexus — Font Configuration

**Multilingual font setup for English, Sinhala, and Tamil**

---

## Overview

Nexus supports three scripts with automatic font selection via CSS variable stacking and unicode ranges. This document explains the font configuration and how to maintain it.

---

## Architecture

### Unified Font Stack

```css
/* CSS custom properties */
--font-family-display: 'Cormorant Garamond', 'Maname', 'Noto Serif Tamil', Georgia, serif;
--font-family-body: 'Inter', 'Noto Serif Sinhala', 'Noto Serif Tamil', system-ui, sans-serif;
--font-family-mono: 'IBM Plex Mono', 'Noto Serif Tamil', monospace;
--font-family-quote: 'Cormorant Upright', 'Cormorant Garamond', 'Maname', serif;
```

### How Font Selection Works

1. All fonts are loaded via `next/font`
2. Each font is assigned to a CSS variable
3. The `--font-family-*` variables stack all fonts
4. The browser selects the correct font based on character unicode ranges
5. Fallback fonts ensure the site works even if a font fails to load

### Unicode Ranges

| Script | Unicode Range | Font |
|--------|---------------|------|
| Latin | U+0000-007F, U+0080-024F, etc. | Cormorant Garamond, Inter |
| Sinhala | U+0D80-0DFF | Maname, Noto Serif Sinhala |
| Tamil | U+0B80-0BFF | Noto Serif Tamil |

---

## Font Loading (next/font)

### Configuration

```typescript
// apps/web/src/app/layout.tsx (or similar)

// English fonts
const displayFont = CormorantGaramond({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const monoFont = IBMPlexMono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

// Sinhala fonts
const sinhalaDisplay = Maname({
  variable: '--font-sinhala-display',
  weight: '400',
});

const sinhalaBody = NotoSerifSinhala({
  variable: '--font-sinhala-body',
  weight: ['400', '500', '600', '700'],
});

// Tamil font
const tamilBody = NotoSerifTamil({
  variable: '--font-tamil-body',
  weight: ['400', '500', '600', '700'],
});
```

### CSS Variable Composition

```css
/* tokens.css or global.css */
:root {
  --font-family-display: var(--font-display), var(--font-sinhala-display), var(--font-tamil-body), Georgia, serif;
  --font-family-body: var(--font-body), var(--font-sinhala-body), var(--font-tamil-body), system-ui, sans-serif;
  --font-family-mono: var(--font-mono), var(--font-tamil-body), monospace;
}
```

---

## Self-Hosting Fonts

### Why Self-Host

1. No dependency on Google Fonts CDN
2. Works offline
3. Faster loading (no external DNS lookup)
4. Privacy (no external requests)

### Font Files Location

```
apps/web/public/fonts/
├── CormorantGaramond-Regular.woff2
├── CormorantGaramond-Medium.woff2
├── CormorantGaramond-SemiBold.woff2
├── CormorantGaramond-Bold.woff2
├── Inter-Regular.woff2
├── Inter-Medium.woff2
├── Inter-SemiBold.woff2
├── Maname-Regular.woff2
├── NotoSerifSinhala-Regular.woff2
├── NotoSerifSinhala-Medium.woff2
├── NotoSerifSinhala-SemiBold.woff2
├── NotoSerifSinhala-Bold.woff2
├── NotoSerifTamil-Regular.woff2
├── NotoSerifTamil-Medium.woff2
├── NotoSerifTamil-SemiBold.woff2
├── NotoSerifTamil-Bold.woff2
├── IBMPlexMono-Regular.woff2
└── IBMPlexMono-Medium.woff2
```

### Adding a New Font

1. Download the font file (WOFF2 format)
2. Place it in `apps/web/public/fonts/`
3. Add to `next/font` configuration
4. Update the font stack in CSS variables
5. Test in all locales

---

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Labels, captions |
| SemiBold | 600 | Subheadings |
| Bold | 700 | Headings |

### Display Font Weights

| Weight | Usage |
|--------|-------|
| Regular | Default display text |
| SemiBold | Headings, hero text |
| Bold | Emphasis, large headings |

### Body Font Weights

| Weight | Usage |
|--------|-------|
| Regular | Body text, paragraphs |
| Medium | Labels, UI elements |
| SemiBold | Subheadings |
| Bold | Emphasis |

---

## Font Rendering

### Performance

- **Preload** critical fonts (display, body)
- **Display: swap** ensures text is visible while fonts load
- **Self-host** fonts for faster loading
- **WOFF2** format for compression

### Testing Font Rendering

```bash
# Test all three scripts
https://cwwkcc.lk/en
https://cwwkcc.lk/si
https://cwwkcc.lk/ta

# Check fonts are loaded in DevTools
# Network tab → Fonts
# Should show all font files loaded from the same domain
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Font not loading | Check file path and extension |
| Wrong font selected | Check CSS variable order |
| Characters not displaying | Check unicode range, add fallback |
| Slow loading | Check font size, convert to WOFF2 |

---

## Fallback Fonts

### System Fallbacks

```css
/* Display fallback */
Georgia, serif

/* Body fallback */
system-ui, -apple-system, sans-serif

/* Mono fallback */
Menlo, monospace
```

### Script-Specific Fallbacks

```css
/* English fallback */
'Cormorant Garamond', Georgia, serif

/* Sinhala fallback */
'Maname', 'Noto Serif Sinhala', serif

/* Tamil fallback */
'Noto Serif Tamil', serif
```

---

## Development Tips

### Testing Fonts Locally

```bash
# Start the development server
pnpm dev

# Add a test page that shows all scripts
http://localhost:3000/font-test
```

### Font Test Component

```tsx
// apps/web/src/app/font-test/page.tsx
export default function FontTestPage() {
  return (
    <div>
      <h1 className="font-display">English Heading</h1>
      <h1 className="font-display" lang="si">සිංහල ශීර්ෂය</h1>
      <h1 className="font-display" lang="ta">தமிழ் தலைப்பு</h1>
      <p className="font-body">English body text</p>
      <p className="font-body" lang="si">සිංහල ශරීර පාඨය</p>
      <p className="font-body" lang="ta">தமிழ் உடல் உரை</p>
    </div>
  );
}
```

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

