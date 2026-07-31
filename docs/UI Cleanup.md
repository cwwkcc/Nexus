# `packages/ui` Cleanup TODO

144 components across 17 categories in `packages/ui/src/components/`. Use the criteria below to check off each one as it's cleaned up.

## Cleanup criteria (apply to every component)

- [ ] **i18n** — no hardcoded English strings; all copy routed through the trilingual (EN/SI/TA) system
- [ ] **No inline styles** — `style={{...}}` replaced with tokens/Tailwind classes
- [ ] **React anti-patterns** — no unnecessary re-renders, missing `key`s, unmemoized handlers passed to children, effects with wrong deps, etc.
- [ ] **Prop types / API** — props well-typed via `@nexus/contracts`, no `any`, sensible defaults
- [ ] **Accessibility** — semantic HTML, ARIA where needed, keyboard nav, focus states
- [ ] **Design tokens** — colors/spacing/typography/z-index pulled from `@nexus/tokens`, no magic numbers
- [ ] **Responsive** — behaves correctly across breakpoints

---

## Progress

| Category      | Count   | Done |
| ------------- | ------- | ---- |
| accessibility | 1       | ☐    |
| atoms         | 9       | ☐    |
| cards         | 12      | ☐    |
| dev           | 3       | ☐    |
| effects       | 1       | ☐    |
| forms         | 17      | ☐    |
| icons         | 33      | ☐    |
| layout        | 7       | ☐    |
| media         | 7       | ☐    |
| navigation    | 11      | ☐    |
| notifications | 3       | ☐    |
| overlays      | 5       | ☐    |
| page-states   | 7       | ☐    |
| sections      | 9       | ☐    |
| typography    | 7       | ☐    |
| utilities     | 3       | ☐    |
| visualization | 8       | ☐    |
| root-level    | 1       | ☐    |
| **Total**     | **144** |      |

---

## accessibility/ (1)

- [ ] SkipToContent.tsx

## atoms/ (9)

- [ ] Spinners/BeatLoader.tsx
- [ ] Spinners/ScaleLoader.tsx
- [ ] Avatar.tsx
- [ ] Badge.tsx
- [ ] Button.tsx
- [ ] ButtonLink.tsx
- [ ] InlineHelpText.tsx
- [ ] ResultsGradeBadge.tsx
- [ ] Tag.tsx

## cards/ (12)

- [ ] AcademicStreamCard.tsx
- [ ] AchievementCard.tsx
- [ ] DownloadableDocumentItem.tsx
- [ ] EventCard.tsx
- [ ] ExtracurricularCard.tsx
- [ ] FacilityCard.tsx
- [ ] GalleryAlbumCard.tsx
- [ ] NewsCard.tsx
- [ ] SocietyBanner.tsx
- [ ] SocietyCard.tsx
- [ ] StaffCard.tsx
- [ ] StatCard.tsx

## dev/ (3)

- [ ] ComponentPlayground.tsx
- [ ] SvgDebugGrid.tsx
- [ ] TokensViewer.tsx

## effects/ (1)

- [ ] AmbientEmbers.tsx

## forms/ (17)

- [ ] Calendar.tsx
- [ ] Checkbox.tsx
- [ ] ContactForm.tsx
- [ ] FeedbackForm.tsx
- [ ] FileUploadZone.tsx
- [ ] FormErrorMessage.tsx
- [ ] FormFieldGroup.tsx
- [ ] FormSectionWrapper.tsx
- [ ] FormValidationSummary.tsx
- [ ] Input.tsx
- [ ] ProgressIndicator.tsx
- [ ] Radio.tsx
- [ ] RequirementsChecklist.tsx
- [ ] Select.tsx
- [ ] Slider.tsx
- [ ] Textarea.tsx
- [ ] Toggle.tsx

## icons/ (33)

> Note: this folder is largely repetitive brand-mark variants (color/white/inline per platform). Worth deciding whether to keep as individual components or consolidate into a single `SocialIcon` component driven by props — flag during cleanup rather than fixing each one independently.

- [ ] brand/CrestAnimation.tsx
- [x] brand/CrestDiagram.tsx
- [ ] brand/SchoolLogo.tsx
- [x] Icon.tsx
- [ ] social/fb/FacebookColor.tsx
- [ ] social/fb/FacebookWhite.tsx
- [ ] social/github/GitHubInvertocatBlack.tsx
- [ ] social/github/GitHubInvertocatBlackClearspace.tsx
- [ ] social/github/GitHubInvertocatWhite.tsx
- [ ] social/github/GitHubInvertocatWhiteClearspace.tsx
- [ ] social/github/GitHubLockupBlack.tsx
- [ ] social/github/GitHubLockupBlackClearspace.tsx
- [ ] social/github/GitHubLockupWhite.tsx
- [ ] social/github/GitHubLockupWhiteClearspace.tsx
- [ ] social/instagram/InstagramGlyphBlack.tsx
- [ ] social/instagram/InstagramGlyphGradient.tsx
- [ ] social/instagram/InstagramGlyphWhite.tsx
- [ ] social/linkedin/LinkedInBlack.tsx
- [ ] social/linkedin/LinkedInColor.tsx
- [ ] social/linkedin/LinkedInInlineColor.tsx
- [ ] social/linkedin/LinkedInWhite.tsx
- [ ] social/whatsapp/WhatsAppGlyphBlack.tsx
- [ ] social/whatsapp/WhatsAppGlyphGreen.tsx
- [ ] social/whatsapp/WhatsAppGlyphWhite.tsx
- [ ] social/whatsapp/WhatsAppStackedBlack.tsx
- [ ] social/whatsapp/WhatsAppStackedGreen.tsx
- [ ] social/whatsapp/WhatsAppStackedWhite.tsx
- [ ] social/youtube/YouTubeBlack.tsx
- [ ] social/youtube/YouTubeColor.tsx
- [ ] social/youtube/YouTubeInlineBlack.tsx
- [ ] social/youtube/YouTubeInlineColor.tsx
- [ ] social/youtube/YouTubeInlineWhite.tsx
- [ ] social/youtube/YouTubeWhite.tsx

## layout/ (7)

- [ ] Container.tsx
- [ ] Divider.tsx
- [ ] Grid.tsx
- [ ] Hero.tsx
- [ ] MasonryGrid.tsx
- [ ] QuickAccessPortal.tsx
- [ ] Stack.tsx

## media/ (7)

- [ ] AudioPlayer.tsx
- [ ] Caption.tsx
- [ ] ImageFrame.tsx
- [ ] Lightbox.tsx
- [ ] MapEmbed.tsx
- [ ] PanoramicFacilityViewer.tsx
- [ ] VideoFrame.tsx

## navigation/ (11)

- [ ] Accordion.tsx
- [ ] Breadcrumb.tsx
- [ ] FilterBar.tsx
- [ ] LanguageSwitcher.tsx
- [ ] MobileMenu.tsx
- [ ] Navigation.tsx
- [ ] NavLink.tsx
- [ ] Pagination.tsx
- [ ] SearchInput.tsx
- [ ] TableOfContents.tsx
- [ ] Tabs.tsx

## notifications/ (3)

- [ ] Alert.tsx
- [ ] AnnouncementBanner.tsx
- [ ] Toast.tsx

## overlays/ (5)

- [ ] Drawer.tsx
- [ ] DropDownMenu.tsx
- [ ] Modal.tsx
- [ ] ShareSheet.tsx
- [ ] ToolTip.tsx

## page-states/ (7)

- [ ] CookieConsentBanner.tsx
- [ ] EmptyState.tsx
- [ ] ErrorState.tsx
- [ ] LoadingScreen.tsx
- [ ] LoadingSkeleton.tsx
- [ ] NotFound.tsx
- [ ] OfflineBanner.tsx

## sections/ (9)

- [ ] AchievementTicker.tsx
- [ ] AdmissionsKeyDatesTimeline.tsx
- [ ] AdmissionsProcessSteps.tsx
- [ ] AlumniLegacyBlock.tsx
- [ ] LifeAtKCCPhotoStrip.tsx
- [ ] PrincipalMessage.tsx
- [ ] SectionSlider.tsx
- [ ] StatsStrip.tsx
- [ ] Timeline.tsx

## typography/ (7)

- [ ] EyebrowLabel.tsx
- [ ] Heading.tsx
- [ ] InlineLink.tsx
- [ ] QuoteBlock.tsx
- [ ] RichTextRenderer.tsx
- [ ] SectionHeader.tsx
- [ ] Text.tsx

## utilities/ (3)

- [x] BackToTopButton.tsx
- [x] CountdownTimer.tsx
- [x] ScrollProgressBar.tsx

## visualization/ (8)

- [ ] ComparisonBar.tsx
- [ ] DataTable.tsx
- [ ] ProcessSteps.tsx
- [ ] ProgressArc.tsx
- [ ] ResultsDisplay.tsx
- [ ] StreamComparisonTable.tsx
- [ ] StudentJourneyFlow.tsx
- [ ] TimetableGrid.tsx

## root-level (1)

- [ ] SectionErrorBoundary.tsx
