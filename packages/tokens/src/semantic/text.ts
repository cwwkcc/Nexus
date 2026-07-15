// packages/tokens/src/semantic/text.ts

import { primitives } from '../primitives/colors';

export const text = {
  primary: primitives.forest[200], // #B8CDB8 — pale mint, primary readable text
  muted: primitives.forest[300], // #8FA898 — pale sage, secondary/meta text
  subtle: primitives.forest[400], // #6B8C7A — soft sage, tertiary/placeholder text
  inverse: primitives.forest[900], // #0A1F1C — dark text on light surfaces
  heading: primitives.forest[100], // #E8F0E8 — near-white, headings pop more than body
  gold: primitives.gold[80], // #E8B84B — accent/highlight text
} as const;

// Disabled/loading dimming applied to whole elements (text included), kept
// alongside text.ts rather than a dedicated file since these two values
// were the only entries in the old semantic.ts `opacity` key and didn't
// justify a fifth semantic/ file.
export const stateOpacity = {
  disabled: '0.5',
  loading: '0.6',
} as const;
