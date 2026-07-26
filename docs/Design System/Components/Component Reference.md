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
4. [Web App Pages — `apps/web/src/app/[locale]`]
5. [Admin Panel — UI Components]
6. [Admin Panel — Pages]
7. [Accessibility & Infrastructure]

---

## 1. Shared UI Library — `packages/ui`

> Every category below is named to match its real folder under `packages/ui/src/components/` exactly. If a category name in this document and the folder name on disk ever disagree, the folder is right and this document is stale — rename the doc, not the folder.

### Atoms

| Status | Component        | Notes                                                                                                    |
| ------ | ---------------- | -------------------------------------------------------------------------------------------------------- |
| ✅     | `BeatLoader`     | 3‑dot bounce loader. Sizes: `sm/md/lg`. Variants: `green/gold/muted`. Respects `prefers-reduced-motion`. |
| ✅     | `ScaleLoader`    | 5‑bar wave loader. Same API as BeatLoader.                                                               |
| ✅     | `Avatar`         | Circular avatar with image + initials fallback. Sizes: `xs/sm/md/lg/xl`.                                 |
| ✅     | `Badge`          | Inline label. Variants: `category`, `status` (draft/published/archived/unread/reviewed), `achievement`.  |
| ✅     | `Button`         | Primary action element — variants, sizes, loading state, icon slots, `href` for links.                   |
| ✅     | `InlineHelpText` | Helper text below form fields.                                                                           |
| ✅     | `Tag`            | Pill label for subjects, career paths, categories.                                                       |

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
| ✅     | `Footer`            | Site‑wide footer: logo, nav links, social icons, copyright, "Built by KITS".                                       |
| ✅     | `Grid` / `GridItem` | CSS Grid wrapper with column/gap presets and responsive span utilities.                                            |
| ✅     | `Hero`              | Full‑viewport / tall hero section wrapper with bg image/video support. Variants: `homepage`, `subpage`, `minimal`. |
| ✅     | `MasonryGrid`       | Variable‑height masonry layout (gallery).                                                                          |
| ✅     | `Navigation`        | Top nav bar: logo, nav links, language switcher, CTA. Responsive mobile menu.                                      |
| ✅     | `QuickAccessPortal` | Floating quick‑access dock (Apply, Contact, etc.).                                                                 |
| ✅     | `VStack` / `HStack` | Vertical/horizontal flex stack with gap presets.                                                                   |
| 🔨     | `PageLayout`        | Standard page wrapper: `<Navigation>` + `{children}` + `<Footer>`.                                                 |
| 🔨     | `SectionWrapper`    | Section with consistent top/bottom padding and optional `id`.                                                      |
| 🔨     | `TwoColumnLayout`   | Main content + sidebar layout (news article, society detail).                                                      |
| ⭐     | `StickyAside`       | Sticky sidebar for TableOfContents on long‑form pages.                                                             |

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

| Status | Component          | Notes                                                                                               |
| ------ | ------------------ | --------------------------------------------------------------------------------------------------- |
| ✅     | `Accordion`        | Expand/collapse for FAQ sections.                                                                   |
| ✅     | `Breadcrumb`       | Hierarchical page path with home link.                                                              |
| ✅     | `FilterBar`        | Horizontal pill/tab filter row (news, gallery, events). Variants: `category‑tabs`, `year‑selector`. |
| ✅     | `LanguageSwitcher` | EN / සිං / தமி locale toggle.                                                                       |
| ✅     | `MobileMenu`       | Full‑screen mobile nav overlay.                                                                     |
| ✅     | `NavLink`          | Internal/external link with active state (supports `onDark`, prefetch).                             |
| ✅     | `Pagination`       | Page number controls with ellipsis and sibling count.                                               |
| ✅     | `SearchInput`      | Search bar with icon, placeholder, clear, and dropdown results.                                     |
| ✅     | `TableOfContents`  | Sticky in‑page section jump links.                                                                  |
| ✅     | `Tabs`             | Horizontal tab group for content panels. Variants: `line`, `pills`.                                 |
| ⭐     | `DropdownNav`      | Mega‑menu or grouped dropdown for desktop nav.                                                      |
| ⭐     | `CommandPalette`   | Cmd+K style global search/navigation palette.                                                       |

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

| Status | Component                 | Notes                                                                 |
| ------ | ------------------------- | --------------------------------------------------------------------- |
| ✅     | `ComparisonBar`           | Horizontal bar comparing two values (e.g. pass rates).                |
| ✅     | `DataTable`               | Sortable/filterable table with pagination.                            |
| ✅     | `ProcessSteps`            | Numbered step sequence (admissions, how to apply).                    |
| ✅     | `ProgressArc`             | Circular arc progress for performance stats.                          |
| ✅     | `StreamComparisonTable`   | Side‑by‑side A/L stream comparison (subjects, careers, requirements). |
| ✅     | `StudentJourneyFlow`      | Visual flow: Grade 10 → Grade 11 → A/L (interactive diagram).         |
| ✅     | `TimetableGrid`           | Weekly timetable display grid.                                        |
| ⭐     | `PassRateChart`           | Bar/line chart for historical O/L and A/L pass rates.                 |
| ⭐     | `UniversityEntranceChart` | Yearly university entrance count chart.                               |
| ⭐     | `SubjectPopularityBar`    | Horizontal bar chart of subject enrolment by stream.                  |

---

## 2. Hooks — `packages/ui/src/hooks`

| Status | Hook                  | Description                                                               |
| ------ | --------------------- | ------------------------------------------------------------------------- |
| ✅     | `useActiveSection`    | Tracks which page section is in viewport (TableOfContents).               |
| ✅     | `useCountUp`          | Animates a number from 0 to target. Supports easing, pause/resume, delay. |
| ✅     | `useFormField`        | Generates IDs and described‑by attributes for form fields.                |
| ✅     | `useInView`           | Returns `true` when element enters viewport (IntersectionObserver).       |
| ✅     | `useLocalStorage`     | Persistent state via localStorage (cookie consent, locale pref).          |
| ✅     | `useMediaQuery`       | Reactive CSS media query matcher.                                         |
| ✅     | `useScrollDirection`  | Returns `'up'` or `'down'` for nav hide/show.                             |
| ⭐     | `useDebounce`         | Debounces a value. Used in SearchInput and admin filtering.               |
| ⭐     | `useClickOutside`     | Fires callback when click outside a ref element (dropdowns, modals).      |
| ⭐     | `useOnlineStatus`     | Boolean `isOnline` — drives OfflineBanner.                                |
| ⭐     | `useCopyToClipboard`  | Copy text, returns `{ copied, copy }`.                                    |
| ⭐     | `usePagination`       | Page number, offset, limit calculations.                                  |
| ⭐     | `useThrottle`         | Throttles a value or function call (scroll events).                       |
| ⭐     | `usePrevious`         | Returns the previous render's value.                                      |
| ⭐     | `useResizeObserver`   | Observes element dimension changes.                                       |
| ⭐     | `useKeyboardShortcut` | Registers a keyboard shortcut with a callback.                            |

---

## 3. Page Blocks — `apps/web/src/blocks`

> Each folder corresponds to a page’s sections. Files are composed from `packages/ui` primitives + page‑specific data.

---

### Home Blocks

`apps/web/src/blocks/home/`

| Status | Block                   | Description                                                                                                                     |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 🔨     | `HomeHero`              | Full‑viewport hero: carousel panels, CrestAnimation, AmbientEmbers, tagline, established year, dual CTAs ("Explore" + "Apply"). |
| 🔨     | `HomeStatsStrip`        | Wraps `StatsStrip` with live counts: students, staff, years, university entrances.                                              |
| 🔨     | `HomePrincipalMessage`  | Wraps `PrincipalMessage` section with CMS data.                                                                                 |
| 🔨     | `HomeLatestNews`        | SectionHeader + NewsCard grid (3 latest) + "All News →" link.                                                                   |
| 🔨     | `HomeAcademicStreams`   | SectionHeader + 4× AcademicStreamCard grid.                                                                                     |
| 🔨     | `HomeLifeAtKCC`         | SectionHeader + LifeAtKCCPhotoStrip.                                                                                            |
| 🔨     | `HomeAchievementTicker` | SectionHeader + AchievementTicker (auto‑scrolling).                                                                             |
| 🔨     | `HomeSocietiesPreview`  | SectionHeader + 4 SocietyCard grid + "All Societies →".                                                                         |
| 🔨     | `HomeUpcomingEvents`    | SectionHeader + 3 EventCard row + "View All Events →".                                                                          |
| 🔨     | `HomeQuickLinks`        | QuickAccessPortal visible block: Apply, Contact, Gallery.                                                                       |
| ⭐     | `HomeAnnouncements`     | Inline announcement cards for active school notices.                                                                            |

---

### About Blocks

`apps/web/src/blocks/about/` — **All 12 blocks built.**

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

`apps/web/src/blocks/academics/`

| Status | Block                            | Description                                                                                   |
| ------ | -------------------------------- | --------------------------------------------------------------------------------------------- |
| 🔨     | `AcademicsHero`                  | Hero: eyebrow "Academic Excellence", title, subtitle.                                         |
| 🔨     | `AcademicsCurriculumOverview`    | O/L (Grade 6–11) and A/L (Grade 12–13) structure overview.                                    |
| 🔨     | `AcademicsStreamsGrid`           | 4× AcademicStreamCard: Science / Commerce / Arts / Technology.                                |
| 🔨     | `AcademicsStreamDetail`          | Per‑stream deep dive: subjects, career paths, requirements, entry criteria.                   |
| 🔨     | `AcademicsComparisonSection`     | Wraps StreamComparisonTable with heading and context copy.                                    |
| 🔨     | `AcademicsStudentJourneySection` | Wraps StudentJourneyFlow with explanatory text.                                               |
| 🔨     | `AcademicsPerformanceSection`    | Historical O/L & A/L pass rates, university entrance stats. Uses PassRateChart + ProgressArc. |
| 🔨     | `AcademicsSubjectList`           | Per‑stream subject grid with Tag pills.                                                       |
| ⭐     | `AcademicsTeachingPhilosophy`    | Short section on the school's academic approach.                                              |

---

### Admissions Blocks

`apps/web/src/blocks/admissions/`

| Status | Block                           | Description                                                                          |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------ |
| 🔨     | `AdmissionsHero`                | Hero: eyebrow "Join the Legacy", title "Admissions".                                 |
| 🔨     | `AdmissionsOverview`            | Grade‑level entry points: Grade 1 / Grade 6 / Other. Links to relevant sub‑sections. |
| 🔨     | `AdmissionsProcessSection`      | Wraps AdmissionsProcessSteps with section heading.                                   |
| 🔨     | `AdmissionsKeyDatesSection`     | Wraps AdmissionsKeyDatesTimeline.                                                    |
| 🔨     | `AdmissionsRequirementsSection` | Wraps RequirementsChecklist — per grade level.                                       |
| 🔨     | `AdmissionsFAQSection`          | Accordion FAQ — common admissions questions.                                         |
| 🔨     | `AdmissionsEnquirySection`      | ContactForm variant with "Enquiry" heading + submission handling.                    |
| 🔨     | `AdmissionsDownloadsSection`    | DownloadableDocumentItem list: application forms, prospectus, circulars.             |
| ⭐     | `AdmissionsCountdownBanner`     | CountdownTimer for application deadline within page.                                 |

---

### News Blocks

`apps/web/src/blocks/news/`

| Status | Block                 | Description                                                                  |
| ------ | --------------------- | ---------------------------------------------------------------------------- |
| 🔨     | `NewsHero`            | Minimal hero: eyebrow "Stay Informed", title "News & Announcements".         |
| 🔨     | `NewsFeaturedArticle` | Large hero card for pinned/featured article — top of news listing.           |
| 🔨     | `NewsFilterSearchBar` | FilterBar (All / Academic / Sports / Events / Achievements) + SearchInput.   |
| 🔨     | `NewsGrid`            | Responsive NewsCard grid — 3 col desktop, 2 tablet, 1 mobile.                |
| 🔨     | `NewsPagination`      | Pagination controls below grid.                                              |
| 🔨     | `ArticleHero`         | Single‑article hero: large image, title, category badge, date, read time.    |
| 🔨     | `ArticleMeta`         | Inline author, date, category, read time. Appears below hero.                |
| 🔨     | `ArticleBody`         | RichTextRenderer in a `max‑w‑prose` two‑column layout with optional sidebar. |
| 🔨     | `ArticleShareSection` | ShareSheet + CopyToClipboardButton.                                          |
| 🔨     | `ArticleRelated`      | "More from KCC" — 3× RelatedArticleCard.                                     |

---

### Events Blocks

`apps/web/src/blocks/events/`

| Status | Block                  | Description                                                         |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| 🔨     | `EventsHero`           | Minimal hero with filter tabs inline.                               |
| 🔨     | `EventsNextHighlight`  | Featured next major event: large card with CountdownTimer.          |
| 🔨     | `EventsFilterBar`      | FilterBar: Upcoming / Past / category tabs.                         |
| 🔨     | `EventsGrid`           | Responsive EventCard grid with Pagination.                          |
| 🔨     | `EventDetailHero`      | Single event: large banner, title, date/time, venue.                |
| 🔨     | `EventDetailBody`      | RichTextRenderer for event description.                             |
| 🔨     | `EventDetailMeta`      | Structured meta: organiser, location (MapEmbed), registration link. |
| 🔨     | `EventDetailShare`     | ShareSheet for event URL.                                           |
| 🔨     | `EventDetailRelated`   | 3× EventCard — other upcoming events.                               |
| ⭐     | `EventsCalendarToggle` | Toggle between grid view and calendar view (Calendar component).    |

---

### Societies Blocks

`apps/web/src/blocks/societies/`

| Status | Block                      | Description                                                       |
| ------ | -------------------------- | ----------------------------------------------------------------- |
| 🔨     | `SocietiesHero`            | Hero: eyebrow "Beyond the Classroom", title "Societies at KCC".   |
| 🔨     | `SocietiesFeaturedBanner`  | KITS society SocietyBanner with tagline + join CTA.               |
| 🔨     | `SocietiesHub`             | FilterBar + SocietyCard grid for all societies.                   |
| 🔨     | `SocietyDetailHero`        | Individual society page hero: logo, name, tagline, founding year. |
| 🔨     | `SocietyAboutSection`      | About section with RichTextRenderer.                              |
| 🔨     | `SocietyActivitiesSection` | Regular activities / projects grid.                               |
| 🔨     | `SocietyTeamSection`       | Advisor StaffCard + student leader Avatar list.                   |
| 🔨     | `SocietyGallerySection`    | GalleryAlbumCard grid (society‑specific albums).                  |
| 🔨     | `SocietyEventsSection`     | Upcoming EventCard list for the society.                          |
| ⭐     | `SocietyJoinForm`          | Inline expression‑of‑interest form.                               |

---

### Facilities Blocks

`apps/web/src/blocks/facilities/`

| Status | Block                      | Description                                                         |
| ------ | -------------------------- | ------------------------------------------------------------------- |
| 🔨     | `FacilitiesHero`           | Hero: eyebrow "Campus & Infrastructure", title "Facilities".        |
| 🔨     | `FacilitiesGrid`           | FacilityCard grid — all 7 named facilities.                         |
| 🔨     | `FacilitySpotlightSection` | Featured facility with PanoramicFacilityViewer or large ImageFrame. |
| 🔨     | `FacilitiesMapSection`     | MapEmbed (campus map) + transport/directions text.                  |
| ⭐     | `FacilitiesVirtualTour`    | Linked CTA or embed for a full virtual campus tour.                 |

---

### Extracurriculars Blocks

`apps/web/src/blocks/extracurriculars/`

| Status | Block                                   | Description                                                         |
| ------ | --------------------------------------- | ------------------------------------------------------------------- |
| 🔨     | `ExtracurricularsHero`                  | Hero: eyebrow "Head, Heart, Hand", title "Extracurriculars".        |
| 🔨     | `ExtracurricularsSportsSection`         | ExtracurricularCard grid for all sports.                            |
| 🔨     | `ExtracurricularsPerformingArtsSection` | ExtracurricularCard grid for performing arts (dance, drama, music). |
| 🔨     | `ExtracurricularsScoutsSection`         | Scouts group info, activities, achievements.                        |
| 🔨     | `ExtracurricularsCadetsSection`         | NCC (National Cadet Corps) info, parades, achievements.             |
| 🔨     | `ExtracurricularsAchievementsSection`   | Combined achievements ticker / grid.                                |
| ⭐     | `ExtracurricularsJoinCTA`               | Join / express interest CTA block.                                  |

---

### Gallery Blocks

`apps/web/src/blocks/gallery/`

| Status | Block                  | Description                                                |
| ------ | ---------------------- | ---------------------------------------------------------- |
| 🔨     | `GalleryHero`          | Hero: eyebrow "Moments in Time", title "Gallery".          |
| 🔨     | `GalleryFilterSection` | FilterBar: All / Events / Sports / Academic / Cultural.    |
| 🔨     | `GalleryAlbumsGrid`    | Responsive GalleryAlbumCard grid + Pagination.             |
| 🔨     | `AlbumHero`            | Individual album hero: title, category, date, photo count. |
| 🔨     | `AlbumMasonrySection`  | MasonryGrid of ImageFrame + Lightbox integration.          |
| 🔨     | `AlbumRelatedSection`  | "More Albums" — 3× GalleryAlbumCard.                       |

---

### Contact Blocks

`apps/web/src/blocks/contact/`

| Status | Block                          | Description                                              |
| ------ | ------------------------------ | -------------------------------------------------------- |
| 🔨     | `ContactHero`                  | Hero: eyebrow "Get in Touch", title "Contact Us".        |
| 🔨     | `ContactDepartmentsSection`    | Department contact grid — StaffCard per department head. |
| 🔨     | `ContactGeneralEnquirySection` | ContactForm + submission feedback.                       |
| 🔨     | `ContactFeedbackSection`       | FeedbackForm for complaints / feedback.                  |
| 🔨     | `ContactOfficeHoursSection`    | Office hours structured display.                         |
| 🔨     | `ContactEmergencySection`      | Emergency contacts: principal, admin, security.          |
| 🔨     | `ContactDirectionsSection`     | MapEmbed + written transport / bus route instructions.   |

---

### Administration Blocks

`apps/web/src/blocks/administration/`

| Status | Block                     | Description                                                |
| ------ | ------------------------- | ---------------------------------------------------------- |
| 🔨     | `AdministrationHero`      | Hero: eyebrow "School Leadership", title "Administration". |
| 🔨     | `PrincipalProfileSection` | Large featured StaffCard for principal with extended bio.  |
| 🔨     | `DeputyPrincipalsSection` | StaffCard grid for deputy principals.                      |
| 🔨     | `DepartmentHeadsSection`  | StaffCard grid for HODs per department.                    |
| 🔨     | `SchoolStructureSection`  | Org chart or text‑based authority structure.               |
| ⭐     | `AdvisoryBoardSection`    | School development advisory board members.                 |

---

## 4. Web App Pages

`apps/web/src/app/[locale]/`

| Status | Route               | Notes                                                                                                         |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| 🔨     | `/`                 | **Home** — HomeHero, StatsStrip, PrincipalMessage, LatestNews, AcademicStreams, LifeAtKCC, Ticker, Societies. |
| ✅     | `/about`            | **About KCC** — All 12 blocks built.                                                                          |
| 🔨     | `/academics`        | **Academics** — All academics blocks.                                                                         |
| 🔨     | `/admissions`       | **Admissions** — All admissions blocks.                                                                       |
| 🔨     | `/news`             | **News Listing** — Hero, FilterSearch, FeaturedArticle, Grid, Pagination.                                     |
| 🔨     | `/news/[slug]`      | **News Article** — ArticleHero, Meta, Body, Share, Related.                                                   |
| 🔨     | `/events`           | **Events Listing** — Hero, NextHighlight, FilterBar, Grid, Pagination.                                        |
| 🔨     | `/events/[slug]`    | **Event Detail** — DetailHero, Body, Meta, Share, Related.                                                    |
| 🔨     | `/societies`        | **Societies Hub** — Hero, Featured (KITS), Hub grid.                                                          |
| 🔨     | `/societies/[slug]` | **Society Detail** — All society detail blocks.                                                               |
| 🔨     | `/facilities`       | **Facilities** — Hero, Grid, Spotlight, MapSection.                                                           |
| 🔨     | `/extracurriculars` | **Extracurriculars** — Hero + 4 category sections + Achievements.                                             |
| 🔨     | `/gallery`          | **Gallery Hub** — Hero, FilterSection, AlbumsGrid.                                                            |
| 🔨     | `/gallery/[album]`  | **Album View** — AlbumHero, MasonrySection, RelatedSection.                                                   |
| 🔨     | `/contact`          | **Contact** — Hero, Departments, Enquiry form, Feedback form, Hours, Emergency, Map.                          |
| 🔨     | `/administration`   | **Administration** — Hero, Principal profile, Deputies, HODs.                                                 |
| ⭐     | `/search`           | **Unified Search** — Single query across all content types, results grouped by type, ranked by relevance.     |
| ⭐     | `/achievements`     | **Achievements Archive** — Full archive of AchievementCard posts.                                             |
| ⭐     | `/alumni`           | **Alumni** — AlumniCard grid, submission form, legacy stories.                                                |
| ⭐     | `/digital-archive`  | **Digital Archive** — Historical photographs, archived magazines (searchable PDF metadata), prefect lists.    |
| ⭐     | `/privacy-policy`   | **Privacy Policy** — RichTextRenderer on a CMS‑authored doc.                                                  |
| ⭐     | `/terms`            | **Terms** — RichTextRenderer on a CMS‑authored doc.                                                           |

---

## 5. Admin Panel — UI Components

`apps/admin/src/components/`

> These are admin‑specific — not in `packages/ui`. Not needed by the public web app.

| Status | Component                 | Notes                                                                                      |
| ------ | ------------------------- | ------------------------------------------------------------------------------------------ |
| 🔨     | `AdminLayout`             | Root layout: `AdminSidebar` + `AdminTopBar` + `{children}`.                                |
| 🔨     | `AdminSidebar`            | Left nav with section groups: Content, Media, Settings. Collapsible.                       |
| 🔨     | `AdminTopBar`             | Top bar: breadcrumb, notification bell, user avatar + dropdown.                            |
| 🔨     | `AdminPageHeader`         | Page‑level header: title + primary action button (e.g. "New Article").                     |
| 🔨     | `AdminStatCard`           | Dashboard KPI card: icon, metric, label, trend indicator.                                  |
| 🔨     | `AdminDataTable`          | Extended DataTable with: row checkboxes, actions column, bulk‑select, inline status badge. |
| 🔨     | `AdminBulkActionsBar`     | Slides up when rows selected: count + Publish / Archive / Delete.                          |
| 🔨     | `AdminFilterSidebar`      | Left filter panel for list pages (status, date range, category).                           |
| 🔨     | `AdminSearchBar`          | Debounced search for admin list pages.                                                     |
| 🔨     | `AdminEmptyState`         | Admin‑specific empty state (no content yet / no search results).                           |
| 🔨     | `AdminConfirmDialog`      | Destructive‑action confirm modal (wraps `ConfirmDialog`).                                  |
| 🔨     | `AdminBreadcrumb`         | Path breadcrumb for admin pages.                                                           |
| 🔨     | `ContentStatusBar`        | Draft / Published / Archived switcher + schedule timestamp.                                |
| 🔨     | `RichTextEditor`          | WYSIWYG editor built on Tiptap, outputs Tiptap JSON.                                       |
| 🔨     | `MediaLibrary`            | Browse/search all uploaded assets. Grid + list toggle. Select for insertion.               |
| 🔨     | `MediaUploader`           | File upload zone → Cloudflare R2 (S3‑compatible API). Progress indicator, preview.         |
| 🔨     | `ImageCropper`            | Crop tool for uploaded images (staff portraits, hero images).                              |
| 🔨     | `SEOMetaPanel`            | SEO sidebar panel: meta title, description, OG image, canonical.                           |
| 🔨     | `SlugInput`               | Auto‑generates slug from title. Editable, validates uniqueness.                            |
| 🔨     | `SchedulePublishPanel`    | Calendar date picker to schedule future publish.                                           |
| 🔨     | `AdminUserAvatar`         | Top‑right user avatar dropdown: profile, settings, logout.                                 |
| ⭐     | `ActivityLog`             | Audit trail feed for content changes (who changed what, when).                             |
| ⭐     | `VersionHistoryPanel`     | Sidebar showing previous saves of a content item with restore option.                      |
| ⭐     | `AdminNotificationDrawer` | In‑app notifications (new enquiry, new feedback, alumni profile submitted).                |
| ⭐     | `ContentLockBanner`       | "Currently being edited by [user]" warning to prevent conflicts.                           |
| ⭐     | `PreviewButton`           | Opens a draft preview of the public page in a new tab.                                     |

---

## 6. Admin Panel — Pages

`apps/admin/src/app/`

| Status | Route               | Description                                                                                                                                                                                                                                        |
| ------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔨     | `/login`            | Admin login page. "Sign in with Google" restricted to `@cwwkcc.lk`, with a clear rejection message for other domains. A separate, deliberately unadvertised path leads to the break‑glass credentials login, used only for bootstrap and recovery. |
| 🔨     | `/` (dashboard)     | Dashboard: 6× AdminStatCard, recent activity feed, quick links.                                                                                                                                                                                    |
| 🔨     | `/news`             | News listing: AdminDataTable with filter + search + bulk actions.                                                                                                                                                                                  |
| 🔨     | `/news/new`         | New article editor: title, slug, body (RichTextEditor), hero image, SEO panel, status.                                                                                                                                                             |
| 🔨     | `/news/[id]`        | Edit article — same as new, pre‑filled. VersionHistory panel.                                                                                                                                                                                      |
| 🔨     | `/events`           | Events listing: AdminDataTable.                                                                                                                                                                                                                    |
| 🔨     | `/events/new`       | New event: title, slug, date/time, venue, body, registration link, hero image.                                                                                                                                                                     |
| 🔨     | `/events/[id]`      | Edit event.                                                                                                                                                                                                                                        |
| 🔨     | `/staff`            | Staff listing: AdminDataTable (name, role, department, status).                                                                                                                                                                                    |
| 🔨     | `/staff/new`        | New staff member: name, designation, department, portrait upload, bio.                                                                                                                                                                             |
| 🔨     | `/staff/[id]`       | Edit staff member.                                                                                                                                                                                                                                 |
| 🔨     | `/societies`        | Societies listing: AdminDataTable.                                                                                                                                                                                                                 |
| 🔨     | `/societies/new`    | New society: name, slug, description, logo, advisor (StaffCard select), events.                                                                                                                                                                    |
| 🔨     | `/societies/[id]`   | Edit society.                                                                                                                                                                                                                                      |
| 🔨     | `/gallery`          | Gallery albums: AdminDataTable + cover thumbnail.                                                                                                                                                                                                  |
| 🔨     | `/gallery/new`      | New album: title, category, date, cover, photos upload (MediaUploader multi).                                                                                                                                                                      |
| 🔨     | `/gallery/[id]`     | Edit album / manage photos: reorder, delete individual photos.                                                                                                                                                                                     |
| 🔨     | `/admissions`       | Admissions enquiry inbox: table of ContactForm submissions with status.                                                                                                                                                                            |
| 🔨     | `/admissions/[id]`  | Individual enquiry: full details + status update + notes.                                                                                                                                                                                          |
| 🔨     | `/announcements`    | Announcement list: text, start date, end date, priority, active toggle.                                                                                                                                                                            |
| 🔨     | `/settings`         | Site settings: contact info, social links, office hours, footer text.                                                                                                                                                                              |
| 🔨     | `/settings/users`   | User management: invite, role (admin/editor), deactivate.                                                                                                                                                                                          |
| ⭐     | `/analytics`        | Traffic dashboard: page views, top pages, search queries — pulled from self-hosted Umami, not GA4.                                                                                                                                                 |
| ⭐     | `/achievements`     | Achievements management: add/edit achievement ticker items.                                                                                                                                                                                        |
| ⭐     | `/alumni`           | Alumni submissions management: pending/approved/rejected queue, plus direct entry.                                                                                                                                                                 |
| ⭐     | `/academics`        | Academic Programs admin screen: edit stream descriptions and subject lists. Fixed set of streams — no add or remove.                                                                                                                               |
| ⭐     | `/extracurriculars` | Extracurriculars listing: AdminDataTable. Full CRUD — add, edit, and retire activities and teams.                                                                                                                                                  |
| ⭐     | `/facilities`       | Facilities listing: AdminDataTable. Full CRUD — add, edit, and reorder facilities.                                                                                                                                                                 |
| ⭐     | `/archive`          | Digital Archive: upload and catalogue historical photographs, magazines, and prefect lists by year and category.                                                                                                                                   |

---

## 7. Accessibility & Infrastructure

| Status | Component / Item         | Notes                                                                                         |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------- |
| ⭐     | `SkipToContent`          | Hidden `<a href="#main-content">` that appears on focus — WCAG requirement.                   |
| ⭐     | `A11yLiveRegion`         | `aria‑live` region for screen reader announcements (search results, form feedback).           |
| 🔨     | `FocusTrap`              | Traps focus inside active modal/drawer — built into `Modal` and `Drawer`, verify is complete. |
| ⭐     | `SchemaMarkup`           | JSON‑LD components: `Organization`, `School`, `Event`, `Article`. Injected per page.          |
| ⭐     | `OpenGraphMeta`          | Per‑page OG: title, description, image, locale. Uses `next/head` or metadata API.             |
| ⭐     | `LocaleAwareDateDisplay` | Formats dates per active locale (EN/SI/TA) using `Intl.DateTimeFormat`.                       |
| ⭐     | `SinhalaFontLoader`      | Loads Noto Sans Sinhala + Iskola Pota on SI locale activation.                                |
| ⭐     | `TamilFontLoader`        | Loads Noto Sans Tamil on TA locale activation.                                                |
| ⭐     | `ColorSchemeScript`      | Prevents flash of wrong colour scheme on load.                                                |
| ⭐     | `ServiceWorker`          | PWA offline caching — static assets + last‑visited pages.                                     |
| ⭐     | `WebVitalsReporter`      | Sends Core Web Vitals to analytics (LCP, CLS, FID).                                           |
| ⭐     | `RobotsAndSitemap`       | Auto‑generated `robots.txt` and `sitemap.xml` from page/content data.                         |
| ⭐     | `ErrorBoundary`          | React error boundary wrapping major page sections — shows ErrorState, not blank screen.       |

---

_Last updated: June 2026 · Nexus monorepo — CWWKCC school website project._
