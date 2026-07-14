# Nexus — Locale Management

**Adding and managing locales**

---

## Overview

This document covers how to add a new locale to the Nexus platform. Currently supported locales are English (`en`), Sinhala (`si`), and Tamil (`ta`).

---

## Current Locales

| Locale | Language | Script  | Status      |
| ------ | -------- | ------- | ----------- |
| `en`   | English  | Latin   | Complete    |
| `si`   | Sinhala  | Sinhala | In Progress |
| `ta`   | Tamil    | Tamil   | In Progress |

---

## Adding a New Locale

### Step 1: Update Routing Configuration

Edit `apps/web/src/i18n/routing.ts`:

```typescript
// apps/web/src/i18n/routing.ts
export const locales = ['en', 'si', 'ta', 'new-locale'] as const;
export const defaultLocale = 'en';
```

### Step 2: Create Message Files

Create the new locale's message files:

```bash
# Copy English message files
cp -r apps/web/src/i18n/messages/en apps/web/src/i18n/messages/new-locale

# Rename and edit message files
# Translate all keys from English to the new locale
```

### Step 3: Add Font Support

If the new script requires a different font:

```typescript
// apps/web/src/app/layout.tsx
const newFont = NewFont({
  variable: '--font-new',
  weight: ['400', '500', '600', '700'],
});

// Add to font stack
const displayFontStack = ['var(--font-display)', 'var(--font-sinhala-display)', 'var(--font-tamil-body)', 'var(--font-new)', 'Georgia, serif'].join(', ');
```

### Step 4: Update Language Switcher

Add the new locale to the LanguageSwitcher component:

```tsx
// apps/web/src/components/LanguageSwitcher.tsx
const languages = [
  { code: 'en', name: 'English' },
  { code: 'si', name: 'සිංහල' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'new-locale', name: 'New Language' },
];
```

### Step 5: Add to the Glossary

Add translations for the new locale to the glossary.

### Step 6: Test

Test all pages in the new locale:

- [ ] All pages load
- [ ] All translations are complete
- [ ] Fonts render correctly
- [ ] Dates format correctly
- [ ] Numbers format correctly
- [ ] RTL if applicable

---

## Locale-Specific Considerations

### Text Direction

All current locales are LTR. If adding an RTL locale:

```css
/* Add RTL support */
[dir='rtl'] {
  /* RTL-specific styles */
}
```

### Date Formatting

```typescript
// Use next-intl's date formatter
const date = new Date();
const formatted = format(date, 'PPPP');
// en: "Sunday, June 30, 2026"
// si: "2026 ජූනි 30, ඉරිදා"
// ta: "30 ஜூன் 2026, ஞாயிறு"
```

### Number Formatting

```typescript
// Use next-intl's number formatter
const number = 12345.67;
const formatted = formatNumber(number);
// en: "12,345.67"
// si: "12,345.67"
// ta: "12,345.67"
```

---

## Locale Fallback Configuration

```typescript
// apps/web/src/i18n/index.ts
export const localeConfig = {
  defaultLocale: 'en',
  fallbackLocale: 'en',
  localeDetection: true,
};
```

### Fallback Behavior

1. If a translation key is missing → fallback to English
2. If a page doesn't exist in the locale → fallback to English
3. If a user's browser locale is not supported → use default

---

## Locale Detection

### Browser Detection

```typescript
// next-intl automatically detects browser locale
// If the browser locale is 'si-LK', it will try 'si' then fallback to default
```

### Manual Override

```typescript
// Users can manually switch locale
// The LanguageSwitcher component stores the preference in localStorage
```

---

## Testing New Locales

### Local Testing

```bash
# Start the development server
pnpm dev

# Visit the new locale
http://localhost:3000/new-locale
```

### Testing Checklist

- [ ] All pages load
- [ ] All translations are complete
- [ ] No English text appears
- [ ] No placeholder text appears
- [ ] Fonts render correctly
- [ ] Dates format correctly
- [ ] Numbers format correctly
- [ ] Language switcher works
- [ ] Navigation preserves locale
- [ ] Forms work correctly

---

## Removing a Locale

### Step 1: Remove from Configuration

```typescript
// apps/web/src/i18n/routing.ts
export const locales = ['en', 'si', 'ta'] as const; // remove 'new-locale'
```

### Step 2: Remove Message Files

```bash
rm -rf apps/web/src/i18n/messages/new-locale
```

### Step 3: Remove Font Support

Remove the font from the configuration.

### Step 4: Remove from Language Switcher

Remove the locale from the LanguageSwitcher component.

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**
