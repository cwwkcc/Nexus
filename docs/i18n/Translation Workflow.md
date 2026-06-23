# Translation Workflow

## Overview

Nexus is a trilingual platform supporting English, Sinhala (සිංහල), and Tamil (தமிழ்). All content is managed through JSON message files organized by feature area.

---

## Message File Structure

```
apps/web/messages/
  en/              # English (complete, master translations)
    navigation.json
    common.json
    home.json
    about.json
    academics.json
    ...
  si/              # Sinhala (සිංහල)
    [same files as en/]
  ta/              # Tamil (தமிழ்)
    [same files as en/]
```

### Locale Routing

- `/en/` → English
- `/si/` → Sinhala
- `/ta/` → Tamil

Users can switch between locales using the language switcher in the navigation.

---

## Adding a New Translation Key

When adding new UI text, follow these steps:

### 1. Identify the Feature Area

Determine which message file the key belongs to:

- `navigation.json` — Navigation menu, links, labels
- `common.json` — Shared terminology, buttons, UI labels
- `home.json` — Homepage content
- `about.json` — About page, school info
- `academics.json` — Academics, streams, courses
- `admissions.json` — Admissions process, deadlines
- `news.json` — News section headings, labels
- `events.json` — Events section (planned)
- `societies.json` — Societies, clubs, student groups
- `gallery.json` — Gallery, albums, captions
- `facilities.json` — Facilities page, building info
- `extracurriculars.json` — Extracurricular activities
- `results.json` — Exam results portal
- `contact.json` — Contact page, forms

### 2. Add to English File

Edit `apps/web/messages/en/[feature].json`:

```json
{
  "section": {
    "existingKey": "Existing value",
    "newKey": "Your new English text here"
  }
}
```

**Guidelines:**

- Use camelCase for keys
- Group related keys under objects (e.g., all homepage headings under `home.hero`)
- Keep English text clear and concise
- Avoid idioms or colloquialisms

### 3. Add to Sinhala and Tamil Files

Edit `apps/web/messages/si/[feature].json` and `apps/web/messages/ta/[feature].json`:

```json
{
  "section": {
    "existingKey": "පවතින අනුවාද",
    "newKey": "[Sinhala translation pending]"
  }
}
```

**Must include all keys** from the English file, even if untranslated. Missing keys cause runtime crashes.

### 4. Mark for Review

Add a comment to the GitHub PR:

```
@[translator-username] Sinhala/Tamil translations needed for [feature].json:
- newKey
- anotherNewKey
```

---

## Requesting Translations

### Sinhala

- **Native speaker:** Request from school staff or community members
- **Translator:** [To be assigned by KITS lead]
- **Review:** Check with admin staff for institutional terminology accuracy

### Tamil

- **Native speaker:** Request from school staff or community members
- **Translator:** [To be assigned by KITS lead]
- **Review:** Check with admin staff for institutional terminology accuracy

### Translation Review Checklist

Before merging a translation:

- [ ] All keys in English file have corresponding entries
- [ ] No keys are missing (would cause runtime errors)
- [ ] Terminology matches the institutional glossary (see below)
- [ ] Grammar and formatting are correct
- [ ] Special characters (ශ්‍ර, ஞ) render correctly
- [ ] Tested in browser with locale switch

---

## Handling Untranslatable Strings

Some strings have no direct equivalent in all three languages. Examples:

- School names and abbreviations (KCC, KITS) — use English
- Titles of institutional roles — use glossary entry (below)
- Technical terms — use closest equivalent + glossary note

**Example:**

```json
{
  "schoolName": "C.W.W. Kannangara Central College",
  "abbreviation": "KCC"
}
```

Same in all three locales.

---

## Institutional Glossary

Maintain consistent terminology across all feature areas and locales. All contributors should reference this glossary to avoid drift.

### English

| Term | Context |
|------|---------|
| C.W.W. Kannangara Central College | Official school name (no translation) |
| KCC | Abbreviation (no translation) |
| Kannangara ICT Society (KITS) | Society name (no translation) |
| Principal | Head of school |
| Deputy Principal | Deputy head |
| Head of Department | Department leader |
| Academic Stream | Curriculum track (Science, Commerce, Arts) |
| Extracurricular | Activities outside core curriculum |

### Sinhala (සිංහල)

| Term | Sinhala | Context |
|------|---------|---------|
| C.W.W. Kannangara Central College | C.W.W. Kannangara මධ්‍ය විද්‍යාලය | Official school name |
| KCC | KCC | Abbreviation |
| Principal | ප්‍රිංසිපල් | Head of school |
| Deputy Principal | උපප්‍රිංසිපල් | Deputy head |
| Head of Department | বिभाग के प्रमुख | Department leader |
| Academic Stream | වේදයා / වාණිජ්‍ය / කලා ධාරාව | Curriculum track |
| Extracurricular | පාඩමට නොවැඩි ක්‍රියා | Activities outside core curriculum |

### Tamil (தமிழ்)

| Term | Tamil | Context |
|------|-------|---------|
| C.W.W. Kannangara Central College | C.W.W. Kannangara மைய கல்லூரி | Official school name |
| KCC | KCC | Abbreviation |
| Principal | அதிபர் | Head of school |
| Deputy Principal | துணை அதிபர் | Deputy head |
| Head of Department | பிரிவுத் தலைவர் | Department leader |
| Academic Stream | கல்வி நெறி | Curriculum track |
| Extracurricular | பாடப்புற செயல்பாடு | Activities outside core curriculum |

**Maintaining the glossary:**

- Keep this table updated as new terminology is introduced
- Consult before translating similar terms in new feature areas
- When adding new entries, verify with native speakers and school administration

---

## Testing Translations Locally

### Switch Locale

1. Click the language selector in the top navigation
2. Select `සිංහල` (Sinhala) or `தமிழ்` (Tamil)
3. The page reloads in that locale (URL changes to `/si/...` or `/ta/...`)

### Check for Missing Keys

If a key is missing, you'll see the key path in curly braces:

```
{[feature].missingKey}
```

This is a runtime error — fix it immediately by adding the key to all three message files.

### Test Message Files

From the project root:

```bash
# Run type check to catch schema violations
npm run typecheck

# Or manually validate JSON syntax
node -c apps/web/messages/en/navigation.json
node -c apps/web/messages/si/navigation.json
node -c apps/web/messages/ta/navigation.json
```

---

## Workflow for Contributors

### I'm adding a new feature with new text:

1. Add keys to `apps/web/messages/en/[feature].json`
2. Add the same keys with `[Sinhala translation pending]` to `si/[feature].json`
3. Add the same keys with `[Tamil translation pending]` to `ta/[feature].json`
4. Create a PR and tag native speakers for review
5. Don't merge until all three locales have content (even if placeholders)

### I'm reviewing a translation PR:

1. Check the glossary (above) for terminology consistency
2. Verify all keys exist in all three files
3. Test locally by switching locales
4. Confirm special characters render correctly
5. Ask author to fix any missing keys before merging

### I'm native speaker reviewing translations:

1. Verify grammar and phrasing sound natural
2. Check institutional terminology against glossary
3. Suggest corrections by commenting on specific JSON keys
4. After approval, maintainer merges and deploys

---

## Common Issues

### "missing key errors"

**Cause:** A key exists in English but not in Sinhala or Tamil.

**Fix:** Add the missing key to all message files:

```json
{
  "section": {
    "missingKey": "[Sinhala translation pending]"
  }
}
```

### Character encoding errors (rendered as `?`)

**Cause:** File saved without UTF-8 encoding.

**Fix:** Ensure `apps/web/messages/**/*.json` are saved as UTF-8:

```bash
file -i apps/web/messages/si/navigation.json
# Should show: charset=utf-8
```

### Locale doesn't switch in browser

**Cause:** Message files not loaded or application not restarted.

**Fix:**

1. Clear browser cache
2. Restart dev server: `npm run dev`
3. Test again

---

## Deployment

Translations are committed with code and deployed on every release. No separate translation deployment process exists.

**Before release:**

- [ ] All three locales complete (no placeholders)
- [ ] No missing keys across any file
- [ ] Glossary updated with new terminology
- [ ] QA tested locale switching in all three languages

---

## Contact & Support

- **KITS Lead (Project Owner):** [To be assigned]
- **Sinhala Translation Lead:** [To be assigned]
- **Tamil Translation Lead:** [To be assigned]

For questions about the workflow, reach out to the KITS lead.
