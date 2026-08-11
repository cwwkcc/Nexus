// apps/web/src/app/[locale]/gallery/page.tsx
//
// F-151: Gallery listing page. Albums sorted by year (newest first), each
// shown as a GalleryAlbumCard, year-based filtering. Was a comment-only
// stub with no default export at all — every request to this route would
// have failed to build.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, GalleryAlbumCard, Grid, Hero, Text } from '@nexus/ui';
import type { Metadata } from 'next';

import { GalleryListingControls } from './GalleryListingControls';
import { toGalleryAlbumCard } from '../../../lib/gallery-card';
import { GALLERY_STRINGS } from '../../../lib/gallery-i18n';
import { getGalleryAlbumList, getGalleryPageChrome } from '../../../server/gallery';

interface GalleryPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = GALLERY_STRINGS[safeLocale];
  return {
    title: `${strings.pageTitle} — C.W.W. Kannangara Central College`,
    description: strings.pageTitle,
  };
}

export default async function GalleryPage({ params, searchParams }: GalleryPageProps) {
  const { locale } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = GALLERY_STRINGS[safeLocale];

  const query = await searchParams;
  const yearParam = firstValue(query.year);

  const [{ hero }, allAlbums] = await Promise.all([getGalleryPageChrome(safeLocale), getGalleryAlbumList({ locale: safeLocale })]);

  const availableYears = Array.from(new Set(allAlbums.map((album) => album.year))).sort((a, b) => b - a);
  const albums = yearParam ? allAlbums.filter((album) => String(album.year) === yearParam) : allAlbums;

  return (
    <>
      <Hero variant="subpage" heading={hero.title} eyebrow={hero.eyebrow} subheading={hero.subtitle} breadcrumb={[{ label: 'Home', href: `/${safeLocale}` }, { label: strings.pageTitle }]} />

      <Container size="lg" padding="lg" as="section">
        <GalleryListingControls locale={safeLocale} strings={strings} currentYear={yearParam ?? 'all'} availableYears={availableYears} />

        <div className="mt-space-8">
          {albums.length === 0 ? (
            <Text color="muted" className="py-space-12 text-center">
              {strings.noResults}
            </Text>
          ) : (
            <Grid columns="repeat(auto-fit, minmax(280px, 1fr))" gap={7}>
              {albums.map((album) => (
                <GalleryAlbumCard key={album.id} {...toGalleryAlbumCard(album, safeLocale)} viewAlbumLabel={strings.viewAlbumLabel} getPhotoCountLabel={strings.photosLabel} />
              ))}
            </Grid>
          )}
        </div>
      </Container>
    </>
  );
}
