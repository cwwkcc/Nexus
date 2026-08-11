// apps/web/src/app/[locale]/gallery/[albumSlug]/page.tsx
//
// F-152: individual gallery album page. Was a comment-only stub with no
// default export — every request to this route would have failed to
// build. Statically generated (generateStaticParams below) — F-112
// explicitly lists gallery albums for static generation, same as News and
// Societies.

import { SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Container, Heading, Text } from '@nexus/ui';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PhotoGrid } from './PhotoGrid';
import { GALLERY_STRINGS } from '../../../../lib/gallery-i18n';
import { getGalleryAlbumBySlug } from '../../../../server/gallery';

interface AlbumDetailPageProps {
  params: Promise<{ locale: string; albumSlug: string }>;
}

function resolveLocale(locale: string): LocaleEnumData {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale) ? (locale as LocaleEnumData) : 'en';
}

export async function generateStaticParams(): Promise<Array<{ locale: string; albumSlug: string }>> {
  const { createServerCaller } = await import('@nexus/api');
  const caller = createServerCaller();

  const perLocale = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const albums = await caller.gallery.list({ locale });
      return albums.map((album) => ({ locale, albumSlug: album.slug }));
    }),
  );

  return perLocale.flat();
}

export async function generateMetadata({ params }: AlbumDetailPageProps): Promise<Metadata> {
  const { locale, albumSlug } = await params;
  const safeLocale = resolveLocale(locale);
  const album = await getGalleryAlbumBySlug(safeLocale, albumSlug);

  if (!album) {
    return { title: 'Album not found' };
  }

  return {
    title: `${album.title} — C.W.W. Kannangara Central College`,
    description: album.description ?? album.title,
    openGraph: {
      title: album.title,
      description: album.description ?? undefined,
      type: 'website',
      images: album.coverPhoto ? [{ url: album.coverPhoto.src }] : undefined,
    },
  };
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  const { locale, albumSlug } = await params;
  const safeLocale = resolveLocale(locale);
  const strings = GALLERY_STRINGS[safeLocale];

  const album = await getGalleryAlbumBySlug(safeLocale, albumSlug);
  if (!album) {
    notFound();
  }

  return (
    <Container size="lg" padding="lg" as="article">
      <Link href={`/${safeLocale}/gallery`} className="font-body text-caption uppercase tracking-caption text-gold-base hover:text-gold-hover">
        ← {strings.backToGallery}
      </Link>

      <header className="mt-space-6 flex flex-col gap-space-2">
        <Heading level="h1">{album.title}</Heading>
        <div className="flex flex-wrap items-center gap-space-3 font-body text-caption uppercase tracking-caption text-text-muted">
          <span>{album.year}</span>
          {album.category && <span>· {album.category}</span>}
          <span>· {strings.photosLabel(album.photos.length)}</span>
        </div>
        {album.description && (
          <Text as="p" className="mt-space-2 text-body-lg text-text-muted">
            {album.description}
          </Text>
        )}
      </header>

      <div className="mt-space-8">
        {album.photos.length === 0 ? (
          <Text color="muted" className="py-space-12 text-center">
            {strings.noResults}
          </Text>
        ) : (
          <PhotoGrid photos={album.photos} closeLabel="Close" prevLabel="Previous" nextLabel="Next" />
        )}
      </div>
    </Container>
  );
}
