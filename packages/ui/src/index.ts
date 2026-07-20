// packages/ui/src/index.ts

// ============================================================================
// ACCESSIBILITY (to be built — VisuallyHidden, SkipToContent)
// ============================================================================

// ============================================================================
// ATOMS
// ============================================================================
export { Avatar } from './components/atoms/Avatar';
export { Badge } from './components/atoms/Badge';
export { Button } from './components/atoms/Button';
export { ButtonLink } from './components/atoms/ButtonLink';
export { InlineHelpText } from './components/atoms/InlineHelpText';
export { ResultsGradeBadge } from './components/atoms/ResultsGradeBadge';
export { Tag } from './components/atoms/Tag';

// Spinners
export { BeatLoader } from './components/atoms/Spinners/BeatLoader';
export { ScaleLoader } from './components/atoms/Spinners/ScaleLoader';

// ============================================================================
// BRAND
// ============================================================================
// CrestAnimation, CrestDiagram, and SchoolLogo are re-exported via the
// icons barrel below (`export * from './components/icons'`) — kept here
// as a single source instead of duplicating the same three exports twice.

// ============================================================================
// CARDS
// ============================================================================
export { AcademicStreamCard } from './components/cards/AcademicStreamCard';
export { AchievementCard } from './components/cards/AchievementCard';
export { DownloadableDocumentItem } from './components/cards/DownloadableDocumentItem';
export { EventCard } from './components/cards/EventCard';
export { ExtracurricularCard } from './components/cards/ExtracurricularCard';
export { FacilityCard } from './components/cards/FacilityCard';
export { GalleryAlbumCard } from './components/cards/GalleryAlbumCard';
export { NewsCard } from './components/cards/NewsCard';
export { SocietyBanner } from './components/cards/SocietyBanner';
export { SocietyCard } from './components/cards/SocietyCard';
export { StaffCard } from './components/cards/StaffCard';
export { StatCard } from './components/cards/StatCard';

// ============================================================================
// DEV
// ============================================================================
export { SvgDebugGrid } from './components/dev/SvgDebugGrid';

// ============================================================================
// EFFECTS
// ============================================================================
export { AmbientEmbers } from './components/effects/AmbientEmbers';

// ============================================================================
// FEEDBACK
// ============================================================================
export { Alert } from './components/notifications/Alert';
export { Modal } from './components/overlays/Modal';
export { Toast } from './components/notifications/Toast';

// ============================================================================
// FORMS
// ============================================================================
export { Calendar } from './components/forms/Calendar';
export { Checkbox } from './components/forms/Checkbox';
export { ContactForm, buildContactSchema } from './components/forms/ContactForm';
export type { ContactFormProps, ContactFormLabels, ContactFormValues } from './components/forms/ContactForm';
export { FeedbackForm, buildFeedbackSchema } from './components/forms/FeedbackForm';
export type { FeedbackFormProps, FeedbackFormLabels, FeedbackFormValues, FeedbackCategory } from './components/forms/FeedbackForm';
export { FileUploadZone } from './components/forms/FileUploadZone';
export { FormErrorMessage } from './components/forms/FormErrorMessage';
export { FormFieldGroup } from './components/forms/FormFieldGroup';
export { FormSectionWrapper } from './components/forms/FormSectionWrapper';
export { FormValidationSummary } from './components/forms/FormValidationSummary';
export { Input } from './components/forms/Input';
export { ProgressIndicator } from './components/forms/ProgressIndicator';
export { Radio } from './components/forms/Radio';
export { RequirementsChecklist } from './components/forms/RequirementsChecklist';
export { Select } from './components/forms/Select';
export { Slider } from './components/forms/Slider';
export { Textarea } from './components/forms/Textarea';
export { Toggle } from './components/forms/Toggle';

// ============================================================================
// ICONS
// ============================================================================
export * from './components/icons';

// ============================================================================
// LAYOUT
// ============================================================================
export { Container } from './components/layout/Container';
export { Divider } from './components/layout/Divider';
export { Grid, GridItem } from './components/layout/Grid';
export { Hero } from './components/layout/Hero';
export { MasonryGrid } from './components/layout/MasonryGrid';
export { Navigation } from './components/navigation/Navigation';
export { QuickAccessPortal } from './components/layout/QuickAccessPortal';
export type { PortalLink, QuickAccessPortalProps } from './components/layout/QuickAccessPortal';
export { VStack, HStack } from './components/layout/Stack';

// ============================================================================
// MEDIA
// ============================================================================
export { AudioPlayer } from './components/media/AudioPlayer';
export { Caption } from './components/media/Caption';
export { ImageFrame } from './components/media/ImageFrame';
export { Lightbox, type LightboxImage } from './components/media/Lightbox';
export { MapEmbed } from './components/media/MapEmbed';
export { PanoramicFacilityViewer } from './components/media/PanoramicFacilityViewer';
export { VideoFrame } from './components/media/VideoFrame';

// ============================================================================
// NAVIGATION
// ============================================================================
export { Accordion } from './components/navigation/Accordion';
export { Breadcrumb } from './components/navigation/Breadcrumb';
export { FilterBar } from './components/navigation/FilterBar';
export { LanguageSwitcher } from './components/navigation/LanguageSwitcher';
export { MobileMenu } from './components/navigation/MobileMenu';
export { NavLink } from './components/navigation/NavLink';
export { Pagination } from './components/navigation/Pagination';
export { SearchInput } from './components/navigation/SearchInput';
export { TableOfContents } from './components/navigation/TableOfContents';
export { Tabs } from './components/navigation/Tabs';

// ============================================================================
// OVERLAYS
// ============================================================================
export { Drawer } from './components/overlays/Drawer';
export { DropdownMenu } from './components/overlays/DropDownMenu';
export { ShareSheet } from './components/overlays/ShareSheet';
export { ToolTip } from './components/overlays/ToolTip';

// ============================================================================
// SECTIONS
// ============================================================================
export { AchievementTicker } from './components/sections/AchievementTicker';
export { AdmissionsKeyDatesTimeline } from './components/sections/AdmissionsKeyDatesTimeline';
export { AdmissionsProcessSteps } from './components/sections/AdmissionsProcessSteps';
export { AlumniLegacyBlock } from './components/sections/AlumniLegacyBlock';
export { LifeAtKCCPhotoStrip } from './components/sections/LifeAtKCCPhotoStrip';
export { PrincipalMessage } from './components/sections/PrincipalMessage';
export { SectionSlider } from './components/sections/SectionSlider';
export { StatsStrip, type StatItem } from './components/sections/StatsStrip';
export { Timeline } from './components/sections/Timeline';

// ============================================================================
// SYSTEM
// ============================================================================
export { AnnouncementBanner } from './components/notifications/AnnouncementBanner';
export { CookieConsentBanner } from './components/page-states/CookieConsentBanner';
export { EmptyState } from './components/page-states/EmptyState';
export { ErrorState } from './components/page-states/ErrorState';
export { LoadingScreen } from './components/page-states/LoadingScreen';
export { LoadingSkeleton } from './components/page-states/LoadingSkeleton';
export { NotFoundPage } from './components/page-states/NotFound';
export type { NotFoundPageProps, QuickLink } from './components/page-states/NotFound';
export { OfflineBanner } from './components/page-states/OfflineBanner';
export { SectionErrorBoundary } from './components/SectionErrorBoundary';

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export { EyebrowLabel } from './components/typography/EyebrowLabel';
export { Heading } from './components/typography/Heading';
export { InlineLink } from './components/typography/InlineLink';
export { QuoteBlock } from './components/typography/QuoteBlock';
export { RichTextRenderer } from './components/typography/RichTextRenderer';
export { SectionHeader } from './components/typography/SectionHeader';
export { Text } from './components/typography/Text';

// ============================================================================
// UTILITIES
// ============================================================================
export { BackToTopButton } from './components/utilities/BackToTopButton';
export { CountdownTimer } from './components/utilities/CountdownTimer';
export { ScrollProgressBar } from './components/utilities/ScrollProgressBar';

// ============================================================================
// VISUALIZATION
// ============================================================================
export { ComparisonBar } from './components/visualization/ComparisonBar';
export { DataTable } from './components/visualization/DataTable';
export { ProcessSteps } from './components/visualization/ProcessSteps';
export { ProgressArc } from './components/visualization/ProgressArc';
export { ResultsDisplay } from './components/visualization/ResultsDisplay';
export { StreamComparisonTable } from './components/visualization/StreamComparisonTable';
export { StudentJourneyFlow } from './components/visualization/StudentJourneyFlow';
export { TimetableGrid } from './components/visualization/TimetableGrid';

// ============================================================================
// HOOKS
// ============================================================================
export { useActiveSection } from './hooks/useActiveSection';
export { useCountUp } from './hooks/useCountUp';
export { useFormField } from './hooks/useFormField';
export { useInView } from './hooks/useInView';
export { useLocalStorage } from './hooks/useLocalStorage';
export { useMediaQuery } from './hooks/useMediaQuery';
export { useScrollDirection } from './hooks/useScrollDirection';

// ============================================================================
// UTILITIES (cn)
// ============================================================================
export { cn } from './utilities/cn';
