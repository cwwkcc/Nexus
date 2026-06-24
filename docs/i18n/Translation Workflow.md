# Nexus — Translation Workflow

**How to add, manage, and review translations**

---

## Overview

This document defines the workflow for managing translations across English, Sinhala, and Tamil. All translations must be completed by native speakers — machine translation is only for drafts.

---

## Roles and Responsibilities

| Role | Responsibility |
|------|----------------|
| **Translation Coordinator** | Manages the translation process, tracks progress |
| **English Editor** | Writes and maintains English source text |
| **Sinhala Translator** | Translates from English to Sinhala |
| **Tamil Translator** | Translates from English to Tamil |
| **Reviewer** | Reviews translations for accuracy and tone |

---

## Adding New Translation Keys

### Step 1: Add to English Source

1. Identify the feature area (home, about, news, etc.)
2. Open the corresponding English JSON file
3. Add the new key with a clear, descriptive name
4. Add the English text

```json
// en/home.json
{
  "newFeature": {
    "title": "New Feature Title",
    "description": "This is a description of the new feature."
  }
}
```

### Step 2: Add Placeholders to Other Locales

Add the same key to Sinhala and Tamil files with a placeholder:

```json
// si/home.json
{
  "newFeature": {
    "title": "[TO TRANSLATE] New Feature Title",
    "description": "[TO TRANSLATE] This is a description of the new feature."
  }
}
```

### Step 3: Send for Translation

1. Extract all keys with `[TO TRANSLATE]` placeholders
2. Create a translation request document
3. Send to native speakers

### Translation Request Template

```markdown
# Translation Request

## Language: [Sinhala / Tamil]
## Date: YYYY-MM-DD
## Feature Area: [home / about / news / etc.]

### Keys to Translate

| Key | English Text | Translation |
|-----|--------------|-------------|
| home.newFeature.title | New Feature Title | |
| home.newFeature.description | This is a description of the new feature. | |
```

### Step 4: Review and Commit

1. Receive translations from native speakers
2. Replace placeholders with translations
3. Review for consistency with glossary terms
4. Commit changes
5. Test the locale

---

## Translation Quality Guidelines

### Accuracy

- Translate the meaning, not word-for-word
- Maintain the same tone (formal but welcoming)
- Use appropriate cultural references where needed

### Consistency

- Use the same translation for the same term throughout
- Refer to the glossary for institutional terms
- Maintain consistent style across all translations

### Readability

- Use natural language, not literal translations
- Consider sentence length (Sinhala/Tamil can be longer)
- Use appropriate punctuation for each script

---

## Translation Review Process

### Before Review

1. Translator completes the translation
2. Translator self-checks for errors
3. Placeholder replaced with translation

### Review Process

1. Reviewer reads the translation
2. Checks for accuracy against English source
3. Checks for consistency with glossary
4. Checks for readability and naturalness
5. Provides feedback or approves

### Review Checklist

- [ ] All keys translated (no `[TO TRANSLATE]` placeholders)
- [ ] Translation matches the English meaning
- [ ] Tone is consistent with the school's voice
- [ ] Grammar is correct
- [ ] Spelling is correct
- [ ] Institutional terms match the glossary
- [ ] The text fits within the UI (no overflow)

---

## Testing Translations

### Local Development

```bash
# Start the development server
pnpm dev

# Visit the locale to test
http://localhost:3000/si
http://localhost:3000/ta
```

### Testing Checklist

- [ ] All pages load in the locale
- [ ] All translated text is displayed correctly
- [ ] No English text appears where it shouldn't
- [ ] No `[TO TRANSLATE]` placeholders are visible
- [ ] Text fits within UI containers (no overflow)
- [ ] Fonts render correctly for the script
- [ ] Dates are formatted correctly
- [ ] Numbers are formatted correctly

---

## Translation Tools

### JSON Editor

Use a JSON editor with syntax highlighting:
- VS Code (built-in)
- VS Code with i18n Ally extension (recommended)
- Online JSON editors

### i18n Ally Features

- Shows missing translations
- Shows unused translations
- Inline preview of translations
- Quick navigation between locales

### Installation

```bash
# Install i18n Ally in VS Code
# Extensions → Search for "i18n Ally" → Install
```

---

## Common Translation Issues

### Issue 1: Text Overflow

**Symptom:** Translated text is longer than the container, causing layout issues.

**Solution:**
- Use responsive design with `min-width` and `max-width`
- Allow text to wrap naturally
- Use shorter phrases where possible
- Adjust container padding or font size

### Issue 2: Missing Keys

**Symptom:** A page shows English text when it should show Sinhala/Tamil.

**Solution:**
- Check the translation file contains the key
- Check the key name matches exactly
- Run the type check to identify missing keys

### Issue 3: Incorrect Font Rendering

**Symptom:** Characters are not displayed correctly (� or boxes).

**Solution:**
- Verify the font is installed and loaded
- Check the font stack includes the correct fallbacks
- Check the font is included in `next/font` configuration

---

## Translation Status Tracking

| Locale | Progress | Status | Last Updated |
|--------|----------|--------|--------------|
| English | 100% | Complete | June 2026 |
| Sinhala | 85% | In Progress | June 2026 |
| Tamil | 70% | In Progress | June 2026 |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---

# i18n/Glossary.md

# Nexus — Institutional Glossary

**Consistent translations for school terminology**

---

## Purpose

This glossary defines how institutional terms are translated across all three languages. Using consistent translations prevents confusion and maintains the school's professional identity.

---

## School Identity

| English | Sinhala | Tamil |
|---------|---------|-------|
| C.W.W. Kannangara Central College | කන්නන්ගර මධ්ය විද්යාලය | கன்னங்கர மத்திய கல்லூரி |
| KCC | කේ.සී.සී | கே.சி.சி |
| Kannangara | කන්නන්ගර | கன்னங்கர |
| Central College | මධ්ය විද්යාලය | மத்திய கல்லூரி |
| Mathugama | මතුගම | மதுகம |

---

## Motto and Philosophy

| English | Sinhala | Tamil |
|---------|---------|-------|
| Wisdom is All Wealth | සුඛෝ පඤ්ඤාය පඨිලාභෝ | [Tamil translation] |
| Head, Heart, Hand | හිස, හදවත, අත | [Tamil translation] |
| Truth, Courage, Discipline | සත්යය, ධෛර්යය, විනය | [Tamil translation] |
| Established 1873 | ආරම්භ කරන ලද්දේ 1873 දී | [Tamil translation] |

---

## Roles and Titles

| English | Sinhala | Tamil |
|---------|---------|-------|
| Principal | විදුහල්පති | [Tamil translation] |
| Deputy Principal | සහාය විදුහල්පති | [Tamil translation] |
| Assistant Principal | සහකාර විදුහල්පති | [Tamil translation] |
| Head of Department | අංශ ප්රධානී | [Tamil translation] |
| Teacher | ගුරුවරයා | [Tamil translation] |
| Staff | කාර්ය මණ්ඩලය | [Tamil translation] |
| Administration | පරිපාලනය | [Tamil translation] |

---

## Students

| English | Sinhala | Tamil |
|---------|---------|-------|
| Student | ශිෂ්යයා | [Tamil translation] |
| Kannangarian | කන්නන්ගරියන් | [Tamil translation] |
| Alumni | ආදි ශිෂ්ය | [Tamil translation] |
| Old Boys' Association | පැරණි ශිෂ්ය සංගමය | [Tamil translation] |
| Head Prefect | ප්රධාන ශිෂ්ය නායක | [Tamil translation] |

---

## Academic

| English | Sinhala | Tamil |
|---------|---------|-------|
| Science Stream | විද්යා අංශය | [Tamil translation] |
| Commerce Stream | වාණිජ අංශය | [Tamil translation] |
| Arts Stream | කලා අංශය | [Tamil translation] |
| Technology Stream | තාක්ෂණ අංශය | [Tamil translation] |
| O/L (Ordinary Level) | සාමාන්ය පෙළ | [Tamil translation] |
| A/L (Advanced Level) | උසස් පෙළ | [Tamil translation] |
| Scholarship | ශිෂ්යත්ව | [Tamil translation] |
| Results | ප්රතිඵල | [Tamil translation] |

---

## Facilities

| English | Sinhala | Tamil |
|---------|---------|-------|
| Library | පුස්තකාලය | [Tamil translation] |
| Auditorium | ශ්‍රවණාගාරය | [Tamil translation] |
| Laboratory | විද්‍යාගාරය | [Tamil translation] |
| Swimming Pool | පිහිනුම් තටාකය | [Tamil translation] |
| Sports Ground | ක්‍රීඩා පිටිය | [Tamil translation] |
| Main Building | ප්රධාන ගොඩනැගිල්ල | [Tamil translation] |

---

## Extracurricular

| English | Sinhala | Tamil |
|---------|---------|-------|
| Societies | සමාජ | [Tamil translation] |
| Sports | ක්‍රීඩා | [Tamil translation] |
| Scouts | බාලදක්ෂ | [Tamil translation] |
| Cadets | ශිෂ්‍ය භට | [Tamil translation] |
| Band | සංගීත කණ්ඩායම | [Tamil translation] |
| Culture | සංස්කෘතික | [Tamil translation] |

---

## Technology

| English | Sinhala | Tamil |
|---------|---------|-------|
| ICT | තොරතුරු හා සන්නිවේදන තාක්ෂණය | [Tamil translation] |
| Website | වෙබ් අඩවිය | [Tamil translation] |
| Digital | ඩිජිටල් | [Tamil translation] |
| Platform | වේදිකාව | [Tamil translation] |
| Results Portal | ප්‍රතිඵල ද්වාරය | [Tamil translation] |

---

## Common UI Terms

| English | Sinhala | Tamil |
|---------|---------|-------|
| Home | මුල් පිටුව | [Tamil translation] |
| About | ගැන | [Tamil translation] |
| News | පුවත් | [Tamil translation] |
| Events | සිදුවීම් | [Tamil translation] |
| Contact | සම්බන්ධ වන්න | [Tamil translation] |
| Gallery | ඡායාරූප ගැලරිය | [Tamil translation] |
| Admissions | ඇතුළත් කිරීම් | [Tamil translation] |
| Academics | අධ්‍යාපනික | [Tamil translation] |
| Facilities | පහසුකම් | [Tamil translation] |

---

## Using the Glossary

### For Translators

1. Check the glossary first when translating a term
2. Use the exact translation from the glossary
3. If a term is not in the glossary, add it
4. Maintain consistency across all files

### For Developers

1. Use the English term consistently in code
2. Do not change the English source text without updating translations
3. When adding a new feature, update the glossary

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**
