## Table of Contents

1. [Shared UI Library — `packages/ui`
   - [Atoms]
   - [Brand]
   - [Cards]
   - [Forms]
   - [Icons]
   - [Layout]
   - [Media]
   - [Navigation Components]
   - [Notifications]
   - [Overlays]
   - [Page States]
   - [Sections]
   - [Typography]
   - [Utilities]
   - [Visualization]
2. [Hooks — `packages/ui/src/hooks`]
3. [Page Blocks — `apps/web/src/blocks`
   - [Home Blocks]
   - [About Blocks]
   - [Academics Blocks]
   - [Admissions Blocks]
   - [News Blocks]
   - [Events Blocks]
   - [Societies Blocks]
   - [Facilities Blocks]
   - [Extracurriculars Blocks]
   - [Gallery Blocks]
   - [Contact Blocks]
   - [Administration Blocks]
   - [Alumni Blocks]
4. [Web App Pages — `apps/web/src/app/[locale]`]
5. [Admin Panel — UI Components]
6. [Admin Panel — Pages]
7. [Accessibility & Infrastructure]

---

## 1. Shared UI Library — `packages/ui`

> Every category below is named to match its real folder under `packages/ui/src/components/` exactly. If a category name in this document and the folder name on disk ever disagree, the folder is right and this document is stale — rename the doc, not the folder.

### Atoms

| Status | Component           | Notes                                                                                                                                       |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅     | `BeatLoader`        | 3‑dot bounce loader. Sizes: `sm/md/lg`. Variants: `green/gold/muted`. Respects `prefers-reduced-motion`.                                    |
| ✅     | `ScaleLoader`       | 5‑bar wave loader. Same API as BeatLoader.                                                                                                  |
| ✅     | `Avatar`            | Circular avatar with image + initials fallback. Sizes: `xs/sm/md/lg/xl`.                                                                    |
| ✅     | `Badge`             | Inline label. Variants: `category`, `status` (draft/published/archived/unread/reviewed), `achievement`.                                     |
| ✅     | `Button`            | Primary action element — variants, sizes, loading state, icon slots, `href` for links.                                                      |
| ✅     | `InlineHelpText`    | Helper text below form fields.                                                                                                              |
| ✅     | `ResultsGradeBadge` | Grade display badge (A/B/C/S/F style). For school-level aggregate pass-rate statistics only — not the abandoned per-student results lookup. |
| ✅     | `Tag`               | Pill label for subjects, career paths, categories.                                                                                          |

---

### Brand

> Lives at `packages/ui/src/components/brand/` — top‑level, a sibling of `icons/`, not nested inside it. At the time of this audit the actual folder was `icons/brand/`; that's a code‑side fix still owed, not a doc error — this section reflects the locked decision, the folder needs to move to match it.

| Status | Component        | Notes                                                                                 |
| ------ | ---------------- | ------------------------------------------------------------------------------------- |
| ✅     | `CrestAnimation` | Animated KCC crest — hero/splash use. Framer Motion.                                  |
| ✅     | `CrestDiagram`   | Static annotated crest diagram with element labels (About page).                      |
| ✅     | `SchoolLogo`     | KCC logo. Variants: `crest‑only`, `wordmark‑only`, `lockup`, `horizontal`, `stacked`. |

---

### Cards

| Status | Component                  | Notes                                                                                                     |
| ------ | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| ✅     | `AcademicStreamCard`       | Science/Commerce/Arts/Technology. Name, description, career path tags, subject count, href.               |
| ✅     | `AchievementCard`          | Variants: `ticker‑item` (inline ticker) · `archive‑post` (full card with image).                          |
| ✅     | `DownloadableDocumentItem` | File row: title, type (pdf/doc/xls/zip), size, download button.                                           |
| ✅     | `EventCard`                | Variants: `standard` · `compact` · `featured`. Date, title, location, category badge, optional image.     |
| ✅     | `ExtracurricularCard`      | Sports/performing‑arts/leadership. Teacher‑in‑charge, achievements, student quote.                        |
| ✅     | `FacilityCard`             | Variants: `standard` · `schedule` (with embedded timetable). Features list.                               |
| ✅     | `GalleryAlbumCard`         | Cover image, photo count overlay, category badge, year, hover CTA.                                        |
| ✅     | `NewsCard`                 | Variants: `standard` · `compact` · `featured`. Headline, date, category badge, excerpt, hero image, href. |
| ✅     | `SocietyBanner`            | Wide featured‑society banner (used for KITS spotlight).                                                   |
| ✅     | `SocietyCard`              | Variants: `hub‑grid` · `featured`. Compact society grid card.                                             |
| ✅     | `StaffCard`                | Variants: `principal` · `grid` · `compact`. Portrait, name, designation, department, optional contact.    |
| ✅     | `StatCard`                 | Single KPI metric with animated count‑up; optional trend indicator.                                       |
| ⭐     | `AlumniCard`               | Notable alumni: portrait, name, year, achievement summary.                                                |
| ⭐     | `TestimonialCard`          | Student/parent/alumni quote card for use across site.                                                     |
| ⭐     | `MiniEventCard`            | Compact event row for sidebars or society detail pages.                                                   |
| ⭐     | `RelatedArticleCard`       | Minimal news card for "Related" sections (image, title, date only).                                       |

---

### Effects

| Status | Component             | Notes                                                            |
| ------ | --------------------- | ---------------------------------------------------------------- |
| ✅     | `AmbientEmbers`       | Floating particle animation for hero backgrounds. Framer Motion. |
| ⭐     | `HeroVideoBackground` | Muted autoplay video layer for hero sections.                    |
| ⭐     | `ParallaxLayer`       | CSS‑transform parallax scroll wrapper.                           |

---

### Forms

| Status | Component               | Notes                                                                             |
| ------ | ----------------------- | --------------------------------------------------------------------------------- |
| ✅     | `Calendar`              | Variants: `mini‑strip` · `month‑view` · `list‑view`. Date‑picker calendar widget. |
| ✅     | `Checkbox`              | Styled checkbox with label + help text.                                           |
| ✅     | `ContactForm`           | Full general enquiry form: name, email, subject, message.                         |
| ✅     | `FeedbackForm`          | Feedback & complaints with category select.                                       |
| ✅     | `FileUploadZone`        | Drag‑and‑drop upload area for admissions documents.                               |
| ✅     | `FormErrorMessage`      | Per‑field error text.                                                             |
| ✅     | `FormFieldGroup`        | Groups labels, inputs, help text, and errors.                                     |
| ✅     | `FormSectionWrapper`    | Groups related fields under a heading inside a form.                              |
| ✅     | `FormValidationSummary` | Top‑of‑form error list.                                                           |
| ✅     | `Input`                 | Text / email / tel / number / search / url input.                                 |
| ✅     | `ProgressIndicator`     | Variants: `bar` · `steps`. Multi‑step form stepper (admissions flow).             |
| ✅     | `Radio`                 | Styled radio button group.                                                        |
| ✅     | `RequirementsChecklist` | Interactive admissions requirements checklist.                                    |
| ✅     | `Select`                | Styled dropdown with options.                                                     |
| ✅     | `Slider`                | Range slider with optional value display.                                         |
| ✅     | `Textarea`              | Multi‑line text with resize.                                                      |
| ✅     | `Toggle`                | On/off switch (role="switch").                                                    |
| ⭐     | `SearchForm`            | Standalone search form: input + submit. Used on the site-wide Search page.        |
| ⭐     | `DateRangePicker`       | Start + end date selector (events filter, alumni search).                         |
| ⭐     | `PhoneInput`            | Formatted phone number input with Sri Lanka country code default.                 |

---

### Icons

| Status | Component                                      | Notes                                                     |
| ------ | ---------------------------------------------- | --------------------------------------------------------- |
| ✅     | `Icon`                                         | Typed Lucide icon component with size tokens (`xs`–`xl`). |
| ✅     | `FacebookColor` / `FacebookWhite`              | Social icons.                                             |
| ✅     | `GitHubInvertocat*` / `GitHubLockup*`          | GitHub variants.                                          |
| ✅     | `InstagramGlyph*`                              | Instagram variants (black, white, gradient).              |
| ✅     | `LinkedIn*`                                    | LinkedIn variants (black, white, colour, inline colour).  |
| ✅     | `WhatsApp*`                                    | WhatsApp variants (glyph, stacked, green/black/white).    |
| ✅     | `YouTube*`                                     | YouTube variants (inline, colour, black, white).          |
| ✅     | `CrestAnimation`, `CrestDiagram`, `SchoolLogo` | Brand icons (see Brand section).                          |

---

### Layout

| Status | Component           | Notes                                                                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ✅     | `Container`         | Max‑width centred wrapper with responsive padding.                                                                 |
| ✅     | `Divider`           | Horizontal/vertical separator with gold accent variants.                                                           |
| ✅     | `Grid` / `GridItem` | CSS Grid wrapper with column/gap presets and responsive span utilities.                                            |
| ✅     | `Hero`              | Full‑viewport / tall hero section wrapper with bg image/video support. Variants: `homepage`, `subpage`, `minimal`. |
| ✅     | `MasonryGrid`       | Variable‑height masonry layout (gallery).                                                                          |
| ✅     | `QuickAccessPortal` | Floating quick‑access dock (Apply, Contact, etc.).                                                                 |
| ✅     | `VStack` / `HStack` | Vertical/horizontal flex stack with gap presets.                                                                   |
| 🔨     | `PageLayout`        | Standard page wrapper: `<Navigation>` + `{children}` + `<Footer>`.                                                 |
| 🔨     | `SectionWrapper`    | Section with consistent top/bottom padding and optional `id`.                                                      |
| 🔨     | `TwoColumnLayout`   | Main content + sidebar layout (news article, society detail).                                                      |
| ⭐     | `StickyAside`       | Sticky sidebar for TableOfContents on long‑form pages.                                                             |

> **Footer isn't listed above.** Unlike everything else in this document, `Footer` doesn't live in `packages/ui` — it's composed directly in `apps/web/src/components/layout/Footer.tsx`, since it isn't reused anywhere else in the platform. It's built (✅) — just not a shared-library component.

---

### Media

| Status | Component                 | Notes                                                                                |
| ------ | ------------------------- | ------------------------------------------------------------------------------------ |
| ✅     | `AudioPlayer`             | Inline audio player — school anthem with visualiser and lyrics.                      |
| ✅     | `Caption`                 | Image/video caption with optional credit line. Variants: `inline`, `overlay`.        |
| ✅     | `ImageFrame`              | Aspect‑ratio‑enforced image container with loading state, overlay, corner badge.     |
| ✅     | `Lightbox`                | Full‑screen image overlay with prev/next navigation and caption.                     |
| ✅     | `MapEmbed`                | Google Maps / OpenStreetMap embed with optional nearby note.                         |
| ✅     | `PanoramicFacilityViewer` | 360° / wide panoramic viewer for campus facilities (draggable).                      |
| ✅     | `VideoFrame`              | YouTube / Vimeo embed with aspect ratio enforcement; optional poster for direct MP4. |
| 🔨     | `OptimizedImage`          | `next/image` wrapper with blur placeholder and R2 CDN URL handling.                  |
| ⭐     | `BeforeAfterSlider`       | Before/after drag slider (campus renovation comparisons).                            |
| ⭐     | `ImageCarousel`           | Auto‑playing image carousel with dot indicators.                                     |

---

### Navigation Components

| Status | Component          | Notes                                                                                                                                                                                              |
| ------ | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅     | `Accordion`        | Expand/collapse for FAQ sections.                                                                                                                                                                  |
| ✅     | `Breadcrumb`       | Hierarchical page path with home link.                                                                                                                                                             |
| ✅     | `FilterBar`        | Horizontal pill/tab filter row (news, gallery, events). Variants: `category‑tabs`, `year‑selector`.                                                                                                |
| ✅     | `LanguageSwitcher` | EN / සිං / தமி locale toggle.                                                                                                                                                                      |
| ✅     | `MobileMenu`       | Full‑screen mobile nav overlay.                                                                                                                                                                    |
| ✅     | `NavLink`          | Internal/external link with active state (supports `onDark`, prefetch).                                                                                                                            |
| ✅     | `Navigation`       | Top nav bar: logo, nav links, language switcher, CTA. Responsive mobile menu. (Listed under Layout in some earlier drafts — it actually lives in `navigation/`, alongside the rest of this table.) |
| ✅     | `Pagination`       | Page number controls with ellipsis and sibling count.                                                                                                                                              |
| ✅     | `SearchInput`      | Search bar with icon, placeholder, clear, and dropdown results.                                                                                                                                    |
| ✅     | `TableOfContents`  | Sticky in‑page section jump links.                                                                                                                                                                 |
| ✅     | `Tabs`             | Horizontal tab group for content panels. Variants: `line`, `pills`.                                                                                                                                |
| ⭐     | `DropdownNav`      | Mega‑menu or grouped dropdown for desktop nav.                                                                                                                                                     |
| ⭐     | `CommandPalette`   | Cmd+K style global search/navigation palette.                                                                                                                                                      |

---

### Notifications

| Status | Component            | Notes                                                                |
| ------ | -------------------- | -------------------------------------------------------------------- |
| ✅     | `Alert`              | Inline alert: `info / success / warning / error`. Dismissible.       |
| ✅     | `AnnouncementBanner` | Dismissible top‑of‑page announcement strip.                          |
| ✅     | `Toast`              | Ephemeral notification stack. Variants: `success / error / warning`. |

---

### Overlays

| Status | Component           | Notes                                                                                         |
| ------ | ------------------- | --------------------------------------------------------------------------------------------- |
| ✅     | `Drawer`            | Side‑panel overlay (slide in from right/left). Supports persistent mode.                      |
| ✅     | `DropDownMenu`      | Contextual dropdown triggered by a button (navigation or filter variant).                     |
| ✅     | `Modal`             | Accessible dialog. Focus‑trapped. Backdrop dismiss. Variants: `information` · `confirmation`. |
| ✅     | `ShareSheet`        | Share panel: URL copy + social share links (WhatsApp, Facebook, copy).                        |
| ✅     | `ToolTip`           | Hover/focus tooltip (position: top/bottom/left/right).                                        |
| ⭐     | `AnnouncementPopup` | Modal that appears on first visit for important notices (exams, events).                      |
| ⭐     | `ConfirmDialog`     | Destructive action confirmation prompt (wraps Modal with OK/Cancel).                          |

---

### Page States

| Status | Component               | Notes                                                                   |
| ------ | ----------------------- | ----------------------------------------------------------------------- |
| ✅     | `CookieConsentBanner`   | Cookie consent footer bar.                                              |
| ✅     | `EmptyState`            | Empty list/search with illustration and message.                        |
| ✅     | `ErrorState`            | Section/page‑level error with retry. Variants: `inline` / `section`.    |
| ✅     | `LoadingScreen`         | Full‑viewport loading (initial / route transitions). Animated crest.    |
| ✅     | `LoadingSkeleton`       | Shimmer placeholder skeleton. Variants: `card`, `table‑row`, `section`. |
| ✅     | `NotFoundPage`          | 404 component with back‑to‑home navigation and animated 404 count‑up.   |
| ✅     | `OfflineBanner`         | Banner when user loses network.                                         |
| ⭐     | `MaintenancePage`       | Full‑page maintenance mode screen.                                      |
| ⭐     | `UpdateAvailableBanner` | PWA "new version available" banner with reload prompt.                  |

---

### Sections

| Status | Component                    | Notes                                                                                       |
| ------ | ---------------------------- | ------------------------------------------------------------------------------------------- |
| ✅     | `AchievementTicker`          | Horizontal auto‑scrolling achievement ticker.                                               |
| ✅     | `AdmissionsKeyDatesTimeline` | Vertical timeline of admissions key dates.                                                  |
| ✅     | `AdmissionsProcessSteps`     | "How to Apply" step sequence with icons.                                                    |
| ✅     | `AlumniLegacyBlock`          | Featured notable alumni grid/highlight block with carousel.                                 |
| ✅     | `LifeAtKCCPhotoStrip`        | Horizontal scrollable campus life photo strip with category filters.                        |
| ✅     | `PrincipalMessage`           | Principal portrait + pull quote + "Read Full Message" CTA.                                  |
| ✅     | `SectionSlider`              | Carousel/slider wrapper for rotating section content (supports slides or scrollable strip). |
| ✅     | `StatsStrip`                 | Full‑width horizontal strip with key school stats (auto‑counting).                          |
| ✅     | `Timeline`                   | Generic vertical/horizontal timeline component.                                             |
| 🔨     | `CTABanner`                  | Full‑width call‑to‑action banner (Apply Now, Contact Us). Used across multiple pages.       |
| 🔨     | `LatestNewsSummary`          | "Latest News" preview strip showing 3 recent NewsCards + View All link.                     |
| 🔨     | `UpcomingEventsStrip`        | Horizontal strip of the next 3 upcoming events.                                             |
| 🔨     | `SocietiesPreviewStrip`      | Horizontal preview of SocietyCards with "View All" CTA.                                     |
| ⭐     | `QuoteCarousel`              | Rotating testimonial/quote carousel (staff, alumni, parents).                               |
| ⭐     | `AwardsShowcase`             | Awards and accreditations logo strip.                                                       |

---

### Typography

| Status | Component              | Notes                                                                                                |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| ✅     | `EyebrowLabel`         | All‑caps small label above headings.                                                                 |
| ✅     | `Heading`              | `h1–h6` mapped to design‑system type scale with colour tokens.                                       |
| ✅     | `InlineLink`           | Styled anchor for body copy (supports external links with new‑tab hint).                             |
| ✅     | `QuoteBlock`           | Styled `<blockquote>`. Variants: `pull‑quote`, `ceremonial`.                                         |
| ✅     | `RichTextRenderer`     | Renders Tiptap JSON / MDX with token‑matched typography.                                             |
| ✅     | `SectionHeader`        | Eyebrow + Heading + optional subtitle combo. Variants: `eyebrow-title`, `eyebrow-title-description`. |
| ✅     | `Text`                 | Body copy, captions, labels — mapped to type scale with colour tokens.                               |
| ⭐     | `HighlightedText`      | Inline text with gold/green highlight mark for hero callouts.                                        |
| ⭐     | `KannadaScriptDisplay` | Sinhala / Tamil typeface showcase wrapper for i18n testing.                                          |

---

### Utilities

| Status | Component               | Notes                                                                   |
| ------ | ----------------------- | ----------------------------------------------------------------------- |
| ✅     | `BackToTopButton`       | Floating scroll‑to‑top after scrolling down.                            |
| ✅     | `CountdownTimer`        | Live countdown to event/deadline (supports days/hours/minutes/seconds). |
| ✅     | `ScrollProgressBar`     | Thin page‑top progress bar showing scroll depth.                        |
| ⭐     | `PrintButton`           | Triggers browser print (timetables).                                    |
| ⭐     | `CopyToClipboardButton` | Copies text to clipboard (URL sharing, index number).                   |
| ⭐     | `FloatingCTA`           | Floating bottom‑right "Apply Now" / "Contact Us" button on mobile.      |
| ⭐     | `KeyboardShortcutHint`  | Small UI hint showing keyboard shortcuts (Cmd+K, Esc).                  |

---

### Visualization

| Status | Component                 | Notes                                                                                                                |
| ------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ✅     | `ComparisonBar`           | Horizontal bar comparing two values (e.g. pass rates).                                                               |
| ✅     | `ResultsDisplay`          | School-level aggregate O/L and A/L pass-rate display. Not the abandoned per-student results lookup — see note below. |
| ✅     | `DataTable`               | Sortable/filterable table with pagination.                                                                           |
| ✅     | `ProcessSteps`            | Numbered step sequence (admissions, how to apply).                                                                   |
| ✅     | `ProgressArc`             | Circular arc progress for performance stats.                                                                         |
| ✅     | `StreamComparisonTable`   | Side‑by‑side A/L stream comparison (subjects, careers, requirements).                                                |
| ✅     | `StudentJourneyFlow`      | Visual flow: Grade 10 → Grade 11 → A/L (interactive diagram).                                                        |
| ✅     | `TimetableGrid`           | Weekly timetable display grid.                                                                                       |
| ⭐     | `PassRateChart`           | Bar/line chart for historical O/L and A/L pass rates.                                                                |
| ⭐     | `UniversityEntranceChart` | Yearly university entrance count chart.                                                                              |
| ⭐     | `SubjectPopularityBar`    | Horizontal bar chart of subject enrolment by stream.                                                                 |

> **On "results":** the per-student results lookup portal (search by index number, view individual grades) was cut from scope entirely, and stays out of this document. That's a different thing from school-level aggregate pass-rate statistics (O/L and A/L pass rates as static, editable content) — `domains/results/` in `packages/contracts` still defines that, and `ResultsGradeBadge` / `ResultsDisplay` are its real, existing components. An earlier revision of this document removed both while removing the portal; that was an overcorrection, now fixed.

---

## 2. Hooks — `packages/ui/src/hooks`

| Status | Hook                  | Description                                                                                     |
| ------ | --------------------- | ----------------------------------------------------------------------------------------------- |
| ✅     | `useActiveSection`    | Tracks which page section is in viewport (TableOfContents).                                     |
| ✅     | `useCountUp`          | Animates a number from 0 to target. Supports easing, pause/resume, delay.                       |
| ✅     | `useFormField`        | Generates IDs and described‑by attributes for form fields.                                      |
| ✅     | `useInView`           | Returns `true` when element enters viewport (IntersectionObserver).                             |
| ✅     | `useLocalStorage`     | Persistent state via localStorage (cookie consent, locale pref).                                |
| ✅     | `useLockBodyScroll`   | Locks `document.body` scroll while active — used by `Modal`/`Drawer` to stop background scroll. |
| ✅     | `useMediaQuery`       | Reactive CSS media query matcher.                                                               |
| ✅     | `useScrollDirection`  | Returns `'up'` or `'down'` for nav hide/show.                                                   |
| ⭐     | `useDebounce`         | Debounces a value. Used in SearchInput and admin filtering.                                     |
| ⭐     | `useClickOutside`     | Fires callback when click outside a ref element (dropdowns, modals).                            |
| ⭐     | `useOnlineStatus`     | Boolean `isOnline` — drives OfflineBanner.                                                      |
| ⭐     | `useCopyToClipboard`  | Copy text, returns `{ copied, copy }`.                                                          |
| ⭐     | `usePagination`       | Page number, offset, limit calculations.                                                        |
| ⭐     | `useThrottle`         | Throttles a value or function call (scroll events).                                             |
| ⭐     | `usePrevious`         | Returns the previous render's value.                                                            |
| ⭐     | `useResizeObserver`   | Observes element dimension changes.                                                             |
| ⭐     | `useKeyboardShortcut` | Registers a keyboard shortcut with a callback.                                                  |

---

## 3. Page Blocks — `apps/web/src/blocks`

> **Status note:** an earlier revision of this document described a granular, per-page block breakdown (10–11 separately named blocks per page — `HomeHero`, `HomeStatsStrip`, `HomePrincipalMessage`, and so on) that reads as a target composition plan rather than a record of what's actually in the repo. In several folders (News, Events, Societies, Extracurriculars, Gallery) **no block files exist at all yet** — those pages are still placeholder-sized `page.tsx` stubs (see `Page Specifications.md`'s Page Status Tracking table). Where a folder does exist, the real files are fewer and differently named than previously documented. This revision lists what's actually in `apps/web/src/blocks/` today, and keeps the original per-page composition plan as a **Target composition** note wherever it still reflects real intent — worth keeping for whoever builds these next, just not presented as already-built.

---

### Home Blocks

`apps/web/src/blocks/home/` — 4 files, each 90–200 chars (placeholder-sized, matching the homepage's own placeholder status).

| Status | Block                 | Notes |
| ------ | --------------------- | ----- |
| 🔨     | `HeroBlock`           | Stub. |
| 🔨     | `LatestNewsBlock`     | Stub. |
| 🔨     | `QuickAccessBlock`    | Stub. |
| 🔨     | `UpcomingEventsBlock` | Stub. |

**Target composition** (not yet broken out into separate files): full-viewport hero, stats strip, principal's message, latest news grid, academic streams grid, Life at KCC photo strip, achievement ticker, societies preview, quick-access links, and an announcements block.

---

### About Blocks

`apps/web/src/blocks/about/` — 12 real, substantial blocks (267–1684 chars each), plus **4 orphaned stub files that appear to be dead code**: `EthosBlock.tsx` (77 chars), `NamesakeBlock.tsx` (129 chars), `SchoolAnthemBlock.tsx` (114 chars), and `SchoolStoryBlock.tsx` (110 chars) sit alongside the real, working `Ethos.tsx`, `OurNameSake.tsx`, `SchoolAnthem.tsx`, and `OurStory.tsx` — same concept, "Block"-suffixed name, a fraction of the size. These look like leftovers from a rename that were never deleted; worth a cleanup PR.

| Status | Block              | Description                                                                 |
| ------ | ------------------ | --------------------------------------------------------------------------- |
| ✅     | `AboutHero`        | Full‑viewport hero: CrestAnimation, school name, established year, tagline. |
| ✅     | `OurStory`         | School origin narrative from 1873. RichText + archival imagery.             |
| ✅     | `OurNameSake`      | Dr. C.W.W. Kannangara biography: portrait, life story, education legacy.    |
| ✅     | `CrestExplained`   | CrestDiagram with annotated copy for each element.                          |
| ✅     | `TimeLine`         | Illustrated history milestone timeline (1873 → present).                    |
| ✅     | `Values`           | Core school values: Head, Heart, Hand.                                      |
| ✅     | `Ethos`            | Guiding philosophy and institutional ethos section.                         |
| ✅     | `Legacy`           | National legacy and impact narrative.                                       |
| ✅     | `AlumniLegacy`     | Notable alumni highlights with portraits and achievements.                  |
| ✅     | `AboutStatsStrip`  | Key stats in context of About page.                                         |
| ✅     | `SchoolAnthem`     | Sinhala lyrics display + AudioPlayer.                                       |
| ✅     | `ClosingStatement` | Closing inspirational statement + CTA at page bottom.                       |

---

### Academics Blocks

`apps/web/src/blocks/academics/` — 5 real files, reasonably built out (334–2079 chars).

| Status | Block                | Notes                                                                       |
| ------ | -------------------- | --------------------------------------------------------------------------- |
| ✅     | `AcademicsHero`      | Hero section.                                                               |
| ✅     | `AcademicsCTA`       | Call-to-action block.                                                       |
| ✅     | `DepartmentContacts` | Department contact listing — the largest file in this folder (2,079 chars). |
| ✅     | `StreamCards`        | Stream (Science/Commerce/Arts/Technology) card grid.                        |
| ✅     | `StreamComparison`   | Stream comparison section.                                                  |

**Target composition** (not yet separate files): a curriculum overview (O/L vs A/L structure), per-stream deep-dive detail, and a dedicated performance-statistics section — currently these live folded into the five blocks above rather than as their own files.

---

### Admissions Blocks

`apps/web/src/blocks/admissions/` — 2 files, both tiny stubs.

| Status | Block               | Notes             |
| ------ | ------------------- | ----------------- |
| 🔨     | `ProcessBlock`      | Stub (120 chars). |
| 🔨     | `RequirementsBlock` | Stub (69 chars).  |

**Target composition**: hero, grade-level entry-point overview, process steps (wraps `AdmissionsProcessSteps`), key dates (wraps `AdmissionsKeyDatesTimeline`), requirements checklist, FAQ accordion, enquiry form, and a downloadable-documents section.

---

### News Blocks

`apps/web/src/blocks/news/` — **this folder doesn't exist yet.** `/en/news` and `/en/news/[slug]` are both placeholder-sized `page.tsx` stubs today.

**Target composition**: hero, featured-article block, filter/search bar, paginated news grid, and — for the article page — hero, meta line, rich-text body, share section, and a related-articles block.

---

### Events Blocks

`apps/web/src/blocks/events/` — **this folder doesn't exist yet.** `/en/events` and `/en/events/[slug]` are both placeholder-sized stubs.

**Target composition**: hero with inline filter tabs, a next-event highlight with countdown, filterable event grid, and — for the detail page — hero, rich-text body, structured meta (organiser/venue/map), share section, and related events.

---

### Societies Blocks

`apps/web/src/blocks/societies/` — **this folder doesn't exist yet.** `/en/societies` and `/en/societies/[slug]` are both placeholder-sized stubs.

**Target composition**: hub hero, featured-society banner, filterable society grid, and — for the detail page — hero, about section, activities grid, team section, gallery section, and upcoming events.

---

### Facilities Blocks

`apps/web/src/blocks/facilities/` — 4 real files, reasonably built out (257–1065 chars).

| Status | Block             | Notes                           |
| ------ | ----------------- | ------------------------------- |
| ✅     | `FacilitiesHero`  | Hero section.                   |
| ✅     | `FacilitiesGrid`  | Facility card grid.             |
| ✅     | `FacilitiesCTA`   | Call-to-action block.           |
| ✅     | `FacilitiesStats` | Facilities-related stats block. |

**Target composition** (not yet separate files): a featured-facility spotlight (using `PanoramicFacilityViewer`) and a dedicated map/directions section.

---

### Extracurriculars Blocks

`apps/web/src/blocks/extracurriculars/` — **this folder doesn't exist yet.** `/en/extracurriculars` is a placeholder-sized stub.

**Target composition**: hero, and grouped sections for sports, performing arts, scouts, and the National Cadet Corps, each built from `ExtracurricularCard`.

---

### Gallery Blocks

`apps/web/src/blocks/gallery/` — **this folder doesn't exist yet.** `/en/gallery` and `/en/gallery/[albumSlug]` are both placeholder-sized stubs.

**Target composition**: hero, filter bar, album grid, and — for the individual album page — an album hero, masonry photo grid with lightbox, and a related-albums section.

---

### Contact Blocks

`apps/web/src/blocks/contact/` — 3 real files, well built out (330–4312 chars).

| Status | Block                | Notes                                                                                                                                                                                       |
| ------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅     | `ContactHero`        | Hero section.                                                                                                                                                                               |
| ✅     | `ContactCTA`         | Call-to-action block.                                                                                                                                                                       |
| ✅     | `ContactInfoSection` | The largest block in the whole `blocks/` tree (4,312 chars) — department contacts, map, forms, office hours, and transport info combined into one section rather than split across several. |

---

### Administration Blocks

`apps/web/src/blocks/administration/` — 5 real files, well built out (344–1416 chars).

| Status | Block                   | Notes                                      |
| ------ | ----------------------- | ------------------------------------------ |
| ✅     | `AdministrationHero`    | Hero section.                              |
| ✅     | `PrincipalSection`      | Principal profile block.                   |
| ✅     | `AdvisoryBoardSection`  | School development advisory board section. |
| ✅     | `StaffGridSection`      | Deputy/assistant principal and staff grid. |
| ✅     | `AdministrationContact` | Contact block for the administration page. |

---

### Alumni Blocks

`apps/web/src/blocks/alumni/` — 1 file, a tiny stub. **This folder existed in the codebase but had no entry anywhere in this document's Table of Contents — added here.**

| Status | Block                | Notes                                                                                                 |
| ------ | -------------------- | ----------------------------------------------------------------------------------------------------- |
| 🔨     | `SubmitProfileBlock` | Stub (106 chars) — an alumni profile submission form, matching `/en/alumni`'s own placeholder status. |

## 4. Web App Pages

`apps/web/src/app/[locale]/`

| Status | Route                  | Notes                                                                                                                                                                                                     |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔨     | `/`                    | **Home** — placeholder page (`HeroBlock`, `LatestNewsBlock`, `QuickAccessBlock`, `UpcomingEventsBlock`, all stub-sized). See Page Blocks §Home for the target composition.                                |
| ✅     | `/about`               | **About KCC** — All 12 blocks built.                                                                                                                                                                      |
| ✅     | `/academics`           | **Academics** — built (`AcademicsHero`, `AcademicsCTA`, `DepartmentContacts`, `StreamCards`, `StreamComparison`).                                                                                         |
| 🔨     | `/admissions`          | **Admissions** — placeholder page; blocks folder has only two stub files.                                                                                                                                 |
| 🔨     | `/news`                | **News Listing** — placeholder page; no blocks folder exists yet.                                                                                                                                         |
| 🔨     | `/news/[slug]`         | **News Article** — placeholder page.                                                                                                                                                                      |
| 🔨     | `/events`              | **Events Listing** — placeholder page; no blocks folder exists yet.                                                                                                                                       |
| 🔨     | `/events/[slug]`       | **Event Detail** — placeholder page.                                                                                                                                                                      |
| 🔨     | `/societies`           | **Societies Hub** — placeholder page; no blocks folder exists yet.                                                                                                                                        |
| 🔨     | `/societies/[slug]`    | **Society Detail** — placeholder page.                                                                                                                                                                    |
| ✅     | `/facilities`          | **Facilities** — built (`FacilitiesHero`, `FacilitiesGrid`, `FacilitiesCTA`, `FacilitiesStats`).                                                                                                          |
| 🔨     | `/extracurriculars`    | **Extracurriculars** — placeholder page; no blocks folder exists yet.                                                                                                                                     |
| 🔨     | `/gallery`             | **Gallery Hub** — placeholder page; no blocks folder exists yet.                                                                                                                                          |
| 🔨     | `/gallery/[albumSlug]` | **Album View** — placeholder page.                                                                                                                                                                        |
| ✅     | `/contact`             | **Contact** — built (`ContactHero`, `ContactCTA`, `ContactInfoSection`).                                                                                                                                  |
| ✅     | `/administration`      | **Administration** — built (`AdministrationHero`, `PrincipalSection`, `AdvisoryBoardSection`, `StaffGridSection`, `AdministrationContact`).                                                               |
| 🔨     | `/search`              | **Unified Search** — placeholder page. Target: single query across all content types, results grouped by type, ranked by relevance.                                                                       |
| 🔨     | `/achievements`        | **Achievements Archive** — placeholder page. Target: full archive of `AchievementCard` posts.                                                                                                             |
| 🔨     | `/alumni`              | **Alumni** — placeholder page; blocks folder has one stub file (`SubmitProfileBlock`). Target: `AlumniCard` grid, submission form, legacy stories.                                                        |
| 🔨     | `/archive`             | **Digital Archive** — placeholder page (route is `archive`, not `digital-archive`). Target: historical photographs, archived magazines (searchable PDF metadata), prefect lists.                          |
| ⭐     | `/privacy-policy`      | **Privacy Policy** — no route exists yet. Target: RichTextRenderer on a CMS‑authored doc. Not yet listed in `Page Specifications.md`'s Route Structure either — worth adding there when this gets scoped. |
| ⭐     | `/terms`               | **Terms** — no route exists yet. Target: RichTextRenderer on a CMS‑authored doc. Same gap as above.                                                                                                       |

---

## 5. Admin Panel — UI Components

> **Status note:** `apps/admin/src/components/` — the folder this section was originally documenting — is actually **empty** (just a `.gitkeep`). The real admin-specific components live in `apps/admin/src/features/`, organized by feature domain (`auth/`, `content-preview/`, `editor/`, `media/`, `page-content/`, `shell/`) rather than as a flat, "Admin"-prefixed component list. Every real file here is small (67–465 chars) — skeleton-level, not fully built out. The previously-documented component set below is kept as a **Target** list since the naming still communicates real intent, mapped to its closest real counterpart where one exists.

`apps/admin/src/features/`

| Status | Component                                 | Notes                                                                                                                                                               |
| ------ | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔨     | `SessionProvider` _(auth/)_               | Auth session context provider. Skeleton (141 chars).                                                                                                                |
| 🔨     | `PreviewButton` _(content-preview/)_      | Opens a draft preview of the public page in a new tab. Skeleton (179 chars).                                                                                        |
| 🔨     | `MediaPickerPlugin` _(editor/)_           | Tiptap plugin for inserting media into rich text. Skeleton (129 chars).                                                                                             |
| 🔨     | `RichTextEditor` _(editor/)_              | WYSIWYG editor built on Tiptap. Skeleton (197 chars).                                                                                                               |
| 🔨     | `MediaLibraryPicker` _(media/)_           | Browse/select uploaded assets for insertion. Skeleton (204 chars).                                                                                                  |
| 🔨     | `UploadZone` _(media/)_                   | File upload zone. Skeleton (197 chars).                                                                                                                             |
| 🔨     | `PageContentEditor` _(page-content/)_     | Editor for a page's `ContentEntry` sections — the real engine behind `/content`. Skeleton (201 chars).                                                              |
| 🔨     | `SectionVersionHistory` _(page-content/)_ | Previous-saves panel for a content section. Skeleton (122 chars).                                                                                                   |
| 🔨     | `AdminShell` _(shell/)_                   | Root admin layout. Skeleton (203 chars).                                                                                                                            |
| 🔨     | `AdminPlaceholder` _(shell/)_             | Generic placeholder shown on not-yet-built admin pages — the largest file in `features/` (465 chars), and likely what most stub pages in Section 6 actually render. |
| 🔨     | `Sidebar` _(shell/)_                      | Left nav. Skeleton (128 chars).                                                                                                                                     |
| 🔨     | `Topbar` _(shell/)_                       | Top bar. Skeleton (79 chars).                                                                                                                                       |
| 🔨     | `Breadcrumb` _(shell/)_                   | Path breadcrumb. Skeleton (67 chars).                                                                                                                               |

**Target components** (named in an earlier revision, no matching file exists yet): `AdminPageHeader`, `AdminStatCard`, `AdminDataTable`, `AdminBulkActionsBar`, `AdminFilterSidebar`, `AdminSearchBar`, `AdminEmptyState`, `AdminConfirmDialog`, `ContentStatusBar`, `ImageCropper`, `SEOMetaPanel`, `SlugInput`, `SchedulePublishPanel`, `AdminUserAvatar`, `ActivityLog`, `AdminNotificationDrawer`, `ContentLockBanner`.

---

## 6. Admin Panel — Pages

`apps/admin/src/app/`

| Status | Route                                                                  | Notes                                                                                                                                                                                                                 |
| ------ | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔨     | `/login`                                                               | Admin login page (390 chars — skeleton). "Sign in with Google" restricted to `@cwwkcc.lk` is the design intent; a separate, deliberately unadvertised break-glass credentials path is planned for bootstrap/recovery. |
| 🔨     | `/` (dashboard)                                                        | Dashboard (351 chars — skeleton).                                                                                                                                                                                     |
| ✅     | `/content`                                                             | Page-content list — real and substantial (3,739 chars). This is the actual CMS entry point: pick one of the 13 registered pages to edit its sections.                                                                 |
| ✅     | `/content/[pageKey]`                                                   | Edit a page's sections — the largest real admin page (6,436 chars), built on `PageContentEditor`.                                                                                                                     |
| 🔨     | `/news`, `/news/new`, `/news/[id]`                                     | Skeleton pages (326–344 chars each).                                                                                                                                                                                  |
| 🔨     | `/events`, `/events/new`, `/events/[id]`                               | Skeleton pages (188–243 chars each).                                                                                                                                                                                  |
| 🔨     | `/staff`, `/staff/new`, `/staff/[id]`                                  | Skeleton pages (209–266 chars each).                                                                                                                                                                                  |
| 🔨     | `/societies`, `/societies/new`, `/societies/[id]`                      | Skeleton pages (193–214 chars each).                                                                                                                                                                                  |
| 🔨     | `/gallery`, `/gallery/new`, `/gallery/[albumId]`                       | Skeleton pages (226–282 chars each). Route param is `[albumId]`, not `[id]`.                                                                                                                                          |
| 🔨     | `/announcements`, `/announcements/new`, `/announcements/[id]`          | Skeleton pages (197–243 chars each).                                                                                                                                                                                  |
| 🔨     | `/extracurriculars`, `/extracurriculars/new`, `/extracurriculars/[id]` | Skeleton pages (203–211 chars each).                                                                                                                                                                                  |
| 🔨     | `/facilities`, `/facilities/new`, `/facilities/[id]`                   | Skeleton pages (190–222 chars each).                                                                                                                                                                                  |
| 🔨     | `/achievements`, `/achievements/new`, `/achievements/[id]`             | Skeleton pages (195–226 chars each).                                                                                                                                                                                  |
| 🔨     | `/alumni`, `/alumni/[id]`                                              | Skeleton pages (220–334 chars each).                                                                                                                                                                                  |
| 🔨     | `/archive`, `/archive/new`, `/archive/[id]`                            | Skeleton pages (192–245 chars each).                                                                                                                                                                                  |
| 🔨     | `/academic-programs`                                                   | Academic Programs admin screen (440 chars). Route is `academic-programs`, not `academics` as an earlier revision had it.                                                                                              |
| 🔨     | `/analytics`                                                           | Traffic dashboard (314 chars — skeleton). Target: pulled from self-hosted Umami, not GA4.                                                                                                                             |
| 🔨     | `/audit`                                                               | Audit log (307 chars — skeleton). Wasn't listed in an earlier revision at all.                                                                                                                                        |
| 🔨     | `/auth/setup-totp`                                                     | Two-factor auth setup (341 chars — skeleton). Wasn't listed in an earlier revision at all.                                                                                                                            |
| 🔨     | `/pages`                                                               | Listing across the 13 registered pages (220 chars — skeleton). Wasn't listed in an earlier revision at all.                                                                                                           |
| 🔨     | `/media`                                                               | Media library (317 chars — skeleton).                                                                                                                                                                                 |
| 🔨     | `/settings`                                                            | Site settings (328 chars — skeleton).                                                                                                                                                                                 |
| 🔨     | `/users`, `/users/[id]`                                                | User management (202–300 chars). This is a top-level route, not nested under `/settings/users` as an earlier revision had it.                                                                                         |

There is **no `/admissions` route** in the admin app — an earlier revision documented an admissions-enquiry inbox here that doesn't exist in the codebase.

---

## 7. Accessibility & Infrastructure

| Status | Component / Item         | Notes                                                                                                                                 |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| ✅     | `SkipToContent`          | Hidden `<a href="#main-content">` that appears on focus — WCAG requirement. Real file in `packages/ui/src/components/accessibility/`. |
| ⭐     | `A11yLiveRegion`         | `aria‑live` region for screen reader announcements (search results, form feedback).                                                   |
| ✅     | `FocusTrap`              | Traps focus inside active modal/drawer — a real focus trap is implemented in `Modal`.                                                 |
| ⭐     | `SchemaMarkup`           | JSON‑LD components: `Organization`, `School`, `Event`, `Article`. Injected per page.                                                  |
| ✅     | `OpenGraphMeta`          | Per‑page OG image generation — built, via `default-og-image.tsx` and per-route `opengraph-image.tsx` files.                           |
| ⭐     | `LocaleAwareDateDisplay` | Formats dates per active locale (EN/SI/TA) using `Intl.DateTimeFormat`.                                                               |
| ⭐     | `SinhalaFontLoader`      | Loads Noto Sans Sinhala + Iskola Pota on SI locale activation.                                                                        |
| ⭐     | `TamilFontLoader`        | Loads Noto Sans Tamil on TA locale activation.                                                                                        |
| ⭐     | `ColorSchemeScript`      | Prevents flash of wrong colour scheme on load. Moot for now — theme switching itself isn't implemented (see `Tokens Reference.md`).   |
| ✅     | `ServiceWorker`          | PWA offline caching — a real TypeScript service worker exists at `apps/web/src/service-worker/sw.ts`.                                 |
| ⭐     | `WebVitalsReporter`      | Sends Core Web Vitals to analytics (LCP, CLS, FID).                                                                                   |
| ✅     | `RobotsAndSitemap`       | `robots.ts` and `sitemap.ts` (with hreflang cross-references) both exist and are built.                                               |
| ✅     | `ErrorBoundary`          | Real as `SectionErrorBoundary`, a class-based error boundary — see Page Sections in the Foundations component inventory.              |

---

_Last updated: July 2026 · Nexus monorepo — CWWKCC school website project._

---

## Changelog

**This revision** — full cross-check against the actual repo, not just the Feature Registry:

- Restored `ResultsGradeBadge` and `ResultsDisplay` — the previous revision removed both while removing the abandoned per-student results portal, but both files are real, substantial, and serve the separate, still-live aggregate pass-rate statistics feature. See the note in the Visualization section.
- Rewrote the entire Page Blocks section (§3): the previous granular per-page breakdown didn't match the repo. Five block folders (News, Events, Societies, Extracurriculars, Gallery) don't exist at all; where folders do exist, real files use different names and are far fewer. Kept the original breakdown as a "Target composition" note in each section rather than deleting it outright. Also surfaced 4 apparently-orphaned dead stub files in `blocks/about/`.
- Fixed the Web App Pages table (§4) to match real `page.tsx` sizes: `/academics`, `/facilities`, `/contact`, and `/administration` are genuinely built (were marked 🔨); `/search`, `/achievements`, `/alumni`, and the archive route are stub pages that exist in code (were marked ⭐, which implied no file at all). Fixed `/digital-archive` → `/archive` (route name already corrected once in `Page Specifications.md`, hadn't propagated here) and `/gallery/[album]` → `/gallery/[albumSlug]`.
- Rewrote the Admin Panel sections (§5, §6): `apps/admin/src/components/` — the folder §5 claimed to document — is actually empty. Real admin components live in `apps/admin/src/features/`, organized differently and named differently, and every real file is skeleton-level. §6's page table had a fictional `/admissions` enquiry inbox that doesn't exist, `/settings/users` where the real route is top-level `/users`, `/academics` where the real route is `/academic-programs`, and was missing `/content`/`/content/[pageKey]` (the actual, and only substantially-built, admin pages), plus `/audit`, `/auth/setup-totp`, and `/pages`.
- Fixed §7 (Accessibility & Infrastructure): `SkipToContent`, `FocusTrap`, `OpenGraphMeta`, `ServiceWorker`, `RobotsAndSitemap`, and `ErrorBoundary` (as `SectionErrorBoundary`) are all real and built — the previous revision marked all six as not-yet-started.
- Fixed `Footer`/`Navigation` categorization: `Footer` isn't in `packages/ui` at all (it's in `apps/web`); `Navigation` lives in the `navigation/` folder, not `layout/`.
- Added `useLockBodyScroll`, a real hook that existed in code but wasn't documented.

**Previous revision** — audited against Feature Registry F-001–F-196 (source of truth):

- Removed the entire "Results Blocks" section (`ResultsHero`, `ResultsSearchSection`, `ResultsOutputSection`, `ResultsDownloadsSection`, `ResultsAggregateStatsSection`) and its Table of Contents entry — the exam results portal was cut from scope entirely.
- Removed `ResultsGradeBadge` (Atoms) and `ResultsDisplay` (Visualization) components.
- Removed the `/results` rows from both the Web App Pages table and the Admin Panel — Pages table.
- Fixed descriptions that referenced Results Portal in passing: `SearchForm` (now tied to the site-wide Search page, F-157), `QuickAccessPortal`, `PrintButton`, `HomeQuickLinks`, `AdminNotificationDrawer`.
- Fixed `/analytics` admin page description — Umami (self-hosted, F-101/F-102), not "GA4 embed or custom."
- Added missing Web App Pages rows for pages that exist in the Feature Registry but were never listed here: `/search` (F-157), `/digital-archive` (F-155). `/academics` was already present.
