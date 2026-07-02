import {
  createDefaultOgImage,
  ogImageContentType,
  ogImageSize,
} from '../../../../lib/default-og-image';

export const alt = 'CWW Kannangara Central College — News';
export const size = ogImageSize;
export const contentType = ogImageContentType;

interface NewsOgImageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function Image({ params }: NewsOgImageProps) {
  const { slug } = await params;
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return createDefaultOgImage(title);
}
