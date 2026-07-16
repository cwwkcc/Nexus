// packages/tokens/src/generators/json.ts

// Flattens every token group into a single {name, value, category} list
// for documentation and dev tooling — e.g. packages/ui's TokensViewer.tsx,
// or a future static docs page. Pure data, no filesystem access.

import { blur, opacity, aspectRatio, zIndex, backgroundImage } from '../primitives/effects';
import { transitionDuration, transitionTimingFunction, transformScale } from '../primitives/motion';
import { borderRadius } from '../primitives/radius';
import { boxShadow } from '../primitives/shadows';
import { sizing, borderWidth } from '../primitives/sizing';
import { spacing } from '../primitives/spacing';
import { fontFamily } from '../primitives/typography';
import { semantic } from '../semantic';

export interface TokenMetadata {
  name: string;
  value: string;
  category: string;
}

function flatten(obj: Record<string, unknown>, category: string, prefix = ''): TokenMetadata[] {
  const out: TokenMetadata[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out.push(...flatten(value as Record<string, unknown>, category, name));
    } else {
      out.push({ name, value: String(value), category });
    }
  }
  return out;
}

export function getAllTokenMetadata(): TokenMetadata[] {
  return [...flatten(semantic, 'color'), ...flatten(spacing, 'spacing'), ...flatten(sizing, 'sizing'), ...flatten(borderWidth, 'border-width'), ...flatten(borderRadius, 'radius'), ...flatten(boxShadow, 'shadow'), ...flatten(transitionDuration, 'motion-duration'), ...flatten(transitionTimingFunction, 'motion-easing'), ...flatten(transformScale, 'scale'), ...flatten(zIndex, 'z-index'), ...flatten(opacity, 'opacity'), ...flatten(blur, 'blur'), ...flatten(aspectRatio, 'aspect-ratio'), ...flatten(backgroundImage, 'gradient'), ...Object.entries(fontFamily).map(([name, value]) => ({ name, value: value.join(', '), category: 'font-family' }))];
}
