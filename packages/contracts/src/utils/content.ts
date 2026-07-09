// packages/contracts/src/utils/content.ts

// Pure predicates/transforms over primitive shapes.

export function isLocalized(
  value: unknown,
): value is { en: string; si: string; ta: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'en' in value &&
    'si' in value &&
    'ta' in value &&
    typeof value.en === 'string' &&
    typeof value.si === 'string' &&
    typeof value.ta === 'string'
  );
}

export function normalizeRichText(text: unknown): string {
  if (typeof text === 'string') {
    return text.trim();
  }
  return '';
}
