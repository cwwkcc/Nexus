# Nexus — Translation Workflow

**How to add, manage, and review translations**

---

## Overview

This document defines the workflow for managing translations across English, Sinhala, and Tamil. All translations must be completed by native speakers — machine translation is only for drafts.

---

## Roles and Responsibilities

| Role                        | Responsibility                                   |
| --------------------------- | ------------------------------------------------ |
| **Translation Coordinator** | Manages the translation process, tracks progress |
| **English Editor**          | Writes and maintains English source text         |
| **Sinhala Translator**      | Translates from English to Sinhala               |
| **Tamil Translator**        | Translates from English to Tamil                 |
| **Reviewer**                | Reviews translations for accuracy and tone       |

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

| Key                         | English Text                              | Translation |
| --------------------------- | ----------------------------------------- | ----------- |
| home.newFeature.title       | New Feature Title                         |             |
| home.newFeature.description | This is a description of the new feature. |             |
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

This table previously gave overall percentage estimates (English 100%, Sinhala 85%, Tamil 70%) without saying what they measured. Here's what's actually verifiable in the repo right now, split by the two different things this workflow covers:

| System                                               | English                                                                              | Sinhala                                                               | Tamil                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| UI message files (`messages/*.json`)                 | Doesn't exist yet — see `Locale Management.md` and the Internationalisation Overview | Doesn't exist yet                                                     | Doesn't exist yet                                                                                  |
| Institutional Glossary (`Institutional Glossary.md`) | Complete (source language)                                                           | Nearly complete — real translations for essentially every listed term | Mostly outstanding — only the school name has a real translation; every other term still needs one |

---

**C.W.W. Kannangara Central College, Est. 1873. "Wisdom is All Wealth."**

---
