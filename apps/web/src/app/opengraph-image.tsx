import { createDefaultOgImage, ogImageContentType, ogImageSize } from '../lib/default-og-image';

export const alt = 'CWW Kannangara Central College';
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return createDefaultOgImage();
}
