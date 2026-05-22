export const fontFamily = {
  display: ['Cormorant Garamond', 'Georgia', 'serif'],
  body: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
  sinhala: ['Noto Serif Sinhala', 'serif'],
} satisfies Record<string, string[]>;

export const fontSize = {
  display: [
    'clamp(4rem, 10vw, 9rem)',
    { lineHeight: '0.92', letterSpacing: '-0.02em', fontWeight: '600' },
  ],
  h1: [
    'clamp(3rem, 7vw, 6rem)',
    { lineHeight: '0.98', letterSpacing: '-0.01em', fontWeight: '600' },
  ],
  h2: [
    'clamp(2rem, 4vw, 3rem)',
    { lineHeight: '1.05', letterSpacing: '0', fontWeight: '500' },
  ],
  h3: [
    'clamp(1.35rem, 2.2vw, 1.85rem)',
    { lineHeight: '1.1', letterSpacing: '0', fontWeight: '500' },
  ],
  pullquote: [
    'clamp(1.2rem, 2vw, 1.6rem)',
    { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '500' },
  ],
  body: [
    '1.05rem',
    { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' },
  ],
  'body-sm': [
    '0.92rem',
    { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
  ],
  label: [
    '0.75rem',
    { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '500' },
  ],
  'label-sm': [
    '0.73rem',
    { lineHeight: '1.5', letterSpacing: '0.15em', fontWeight: '500' },
  ],
  eyebrow: [
    '0.72rem',
    { lineHeight: '1.4', letterSpacing: '0.28em', fontWeight: '500' },
  ],
  caption: [
    '0.7rem',
    { lineHeight: '1.4', letterSpacing: '0.2em', fontWeight: '400' },
  ],
} satisfies Record<string, [string, object]>;

export const letterSpacing = {
  eyebrow: '0.28em',
  label: '0.15em',
  'label-sm': '0.15em',
  caption: '0.2em',
} satisfies Record<string, string>;

export const lineHeight = {
  display: '0.92',
  h1: '0.98',
  h2: '1.05',
  h3: '1.1',
  pullquote: '1.3',
  body: '1.7',
  'body-sm': '1.6',
  label: '1.4',
  'label-sm': '1.5',
  eyebrow: '1.4',
  caption: '1.4',
} satisfies Record<string, string>;
