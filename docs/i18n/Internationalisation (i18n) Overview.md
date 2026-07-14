# Nexus — Internationalisation (i18n) Overview

**Supporting English, Sinhala, and Tamil**

---

## Overview

Nexus is a trilingual platform supporting three languages:

| Locale | Language | Script  | Direction |
| ------ | -------- | ------- | --------- |
| `en`   | English  | Latin   | LTR       |
| `si`   | Sinhala  | Sinhala | LTR       |
| `ta`   | Tamil    | Tamil   | LTR       |

All three languages are supported across the entire platform — public website, admin panel, and all content types.

---

## Architecture

### Technology Stack

| Layer            | Technology                  | Purpose                                                      |
| ---------------- | --------------------------- | ------------------------------------------------------------ |
| **Routing**      | `next-intl`                 | Locale-aware routing (`/en/about`, `/si/about`, `/ta/about`) |
| **Translations** | JSON message files          | UI strings and static content                                |
| **Content**      | Database (`PageContent`)    | Editorial content (versioned, locale-aware)                  |
| **Fonts**        | `next/font` + CSS variables | Automatic script selection via unicode ranges                |
| **Date/Time**    | `Intl.DateTimeFormat`       | Locale-aware formatting                                      |

### Key Design Decisions

1. **Locale in URL path** — `/en/`, `/si/`, `/ta/` (not subdomain or query param)
2. **Unified font stack** — One CSS variable handles all three scripts (ADR-008)
3. **Content in database** — Editorial content lives in `PageContent`, not static files (ADR-009)
4. **UI strings in JSON** — Interface elements (navigation, labels, buttons) live in `messages/`

---

## Message File Structure

### Location

```
apps/web/src/i18n/messages/
├── en/                    # English
│   ├── common.json        # Shared UI strings
│   ├── navigation.json    # Navigation labels
│   ├── home.json          # Home page content
│   ├── about.json         # About page content
│   ├── news.json          # News page content
│   ├── events.json        # Events page content
│   ├── societies.json     # Societies page content
│   ├── facilities.json    # Facilities page content
│   ├── admissions.json    # Admissions page content
│   ├── results.json       # Results portal content
│   ├── contact.json       # Contact page content
│   └── gallery.json       # Gallery page content
├── si/                    # Sinhala
│   └── [same structure]
└── ta/                    # Tamil
    └── [same structure]
```

### Message Key Naming Convention

```
{feature}.{section}.{key}

# Examples
"home.hero.title"           → Home page hero title
"navigation.main.about"     → Navigation "About" link
"common.buttons.submit"     → Submit button text
"news.filter.category"      → News category filter label
```

### Example Message File

```json
// en/home.json
{
  "hero": {
    "title": "C.W.W. Kannangara Central College",
    "subtitle": "Sri Lanka's First Central College",
    "tagline": "Wisdom is All Wealth — Est. 1873"
  },
  "stats": {
    "students": "Students",
    "staff": "Staff",
    "years": "Years of Excellence",
    "entrances": "University Entrances"
  }
}
```

---

## Content vs UI Strings

| Type                  | Location                      | Who Edits                 |
| --------------------- | ----------------------------- | ------------------------- |
| **UI Strings**        | `messages/*.json`             | Developers (via code)     |
| **Editorial Content** | `PageContent` database        | Editors (via admin panel) |
| **Taxonomy Values**   | `messages/*.json` or database | Developers or Editors     |

### UI Strings (Static)

- Navigation labels
- Button text
- Form field labels
- Error messages
- Pagination labels
- Filter labels
- Breadcrumb labels
- Footer text

### Editorial Content (Database)

- About page story
- Principal's message
- Timeline items
- Hero messages
- Society descriptions
- Event descriptions
- News articles
- Gallery descriptions

### Taxonomy Values (Mixed)

- Society categories → Static (`messages/`)
- News categories → Static (`messages/`)
- Event categories → Static (`messages/`)
- Department names → Database (`Staff` table)

---

## Locale Fallback

If a translation key is missing for a locale, the system falls back to English.

```typescript
// Example: Missing Sinhala key falls back to English
// en: { "home.hero.title": "C.W.W. Kannangara Central College" }
// si: { } // empty
// Result: "C.W.W. Kannangara Central College" in Sinhala locale
```

This ensures the site never crashes due to missing translations, but all keys should be filled before launch.

---

## Development Workflow

### Adding a New Key

1. **Add to English message file**

   ```json
   // en/home.json
   {
     "newFeature": {
       "title": "New Feature Title"
     }
   }
   ```

2. **Add to Sinhala message file** (with placeholder)

   ```json
   // si/home.json
   {
     "newFeature": {
       "title": "[TO TRANSLATE] New Feature Title"
     }
   }
   ```

3. **Add to Tamil message file** (with placeholder)

   ```json
   // ta/home.json
   {
     "newFeature": {
       "title": "[TO TRANSLATE] New Feature Title"
     }
   }
   ```

4. **Use in code**

   ```tsx
   import { useTranslations } from 'next-intl';

   const t = useTranslations('home');
   <h1>{t('newFeature.title')}</h1>;
   ```

### Translating Content

1. Identify untranslated keys (search for `[TO TRANSLATE]`)
2. Send the key and English text to a native speaker
3. Receive translated text
4. Replace placeholder with translated text
5. Test the locale

---

## Testing i18n

### Local Development

```bash
# Start the development server
pnpm dev

# Visit different locales
http://localhost:3000/en
http://localhost:3000/si
http://localhost:3000/ta
```

### Testing Checklist

- [ ] All pages load in all three locales
- [ ] Navigation links preserve locale
- [ ] Language switcher works correctly
- [ ] Dates are formatted correctly for each locale
- [ ] Numbers are formatted correctly for each locale
- [ ] Text does not overflow containers (Sinhala/Tamil can be longer)
- [ ] Fonts render correctly for each script

---

## Font Architecture

### Unified Font Stack

```css
/* CSS variables for font families */
--font-family-display: 'Cormorant Garamond', 'Maname', 'Noto Serif Tamil', Georgia, serif;
--font-family-body: 'Inter', 'Noto Serif Sinhala', 'Noto Serif Tamil', system-ui, sans-serif;
```

### How It Works

1. All fonts are loaded via `next/font`
2. Each font is assigned to a CSS variable
3. The `--font-family-*` variables stack all fonts
4. The browser selects the correct font based on character unicode ranges
5. No per-component font management required

### Font Files (Self-Hosted)

| Font               | Script  | Path                         |
| ------------------ | ------- | ---------------------------- |
| Cormorant Garamond | English | `/fonts/CormorantGaramond-*` |
| Inter              | English | `/fonts/Inter-*`             |
| Maname             | Sinhala | `/fonts/Maname-*`            |
| Noto Serif Sinhala | Sinhala | `/fonts/NotoSerifSinhala-*`  |
| Noto Serif Tamil   | Tamil   | `/fonts/NotoSerifTamil-*`    |
| IBM Plex Mono      | Mono    | `/fonts/IBMPlexMono-*`       |

---

## Glossary

| Term      | English                           | Sinhala                | Tamil                   |
| --------- | --------------------------------- | ---------------------- | ----------------------- |
| School    | C.W.W. Kannangara Central College | කන්නන්ගර මධ්ය විද්යාලය | கன்னங்கர மத்திய கல்லூரி |
| Motto     | Wisdom is All Wealth              | සුඛෝ පඤ්ඤාය පඨිලාභෝ    | [Tamil translation]     |
| Principal | Principal                         | විදුහල්පති             | [Tamil translation]     |
| Teacher   | Teacher                           | ගුරුවරයා               | [Tamil translation]     |
| Student   | Student                           | ශිෂ්යයා                | [Tamil translation]     |
| Alumni    | Alumni                            | ආදි ශිෂ්ය              | [Tamil translation]     |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
