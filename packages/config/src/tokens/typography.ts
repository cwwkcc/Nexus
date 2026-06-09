export const fontFamily = {
  display: ['Cormorant Garamond', 'Georgia', 'serif'],
  body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
  quote: ['Cormorant Upright', 'Cormorant Garamond', 'serif'],
  mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
  'sinhala-display': ['Maname', 'Noto Serif Sinhala', 'serif'],
  'sinhala-body': ['Noto Serif Sinhala', 'serif'],
} satisfies Record<string, string[]>;

export const fontSize = {
  display: [
    'clamp(3.86rem, 10vw, 4rem)',
    { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' },
  ],
  h1: [
    'clamp(3.2rem, 7vw, 3.36rem)',
    { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '600' },
  ],
  h2: [
    'clamp(2.4rem, 4.5vw, 2.8rem)',
    { lineHeight: '1.08', letterSpacing: '0', fontWeight: '500' },
  ],
  h3: [
    'clamp(1.9rem, 2.8vw, 2.33rem)',
    { lineHeight: '1.12', letterSpacing: '0', fontWeight: '500' },
  ],
  h4: [
    'clamp(1.55rem, 2vw, 1.94rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '500' },
  ],
  h5: [
    'clamp(1.25rem, 1.6vw, 1.55rem)',
    { lineHeight: '1.2', letterSpacing: '0', fontWeight: '500' },
  ],
  h6: [
    'clamp(1rem, 1.25vw, 1.25rem)',
    { lineHeight: '1.3', letterSpacing: '0', fontWeight: '500' },
  ],
  pullquote: [
    'clamp(1.35rem, 2.2vw, 1.6rem)',
    { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '500' },
  ],
  body: [
    '1.05rem',
    { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' },
  ],
  'body-sm': [
    '0.87rem',
    { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
  ],
  label: [
    '0.83rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.15em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  'label-sm': [
    '0.83rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.15em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  eyebrow: [
    '0.75rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.25em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  caption: [
    '0.69rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.08em',
      fontWeight: '400',
      textTransform: 'uppercase',
    },
  ],
  code: ['0.9em', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
  'sinhala-h1': [
    'clamp(3.2rem, 7vw, 3.36rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '600' },
  ],
  'sinhala-h2': [
    'clamp(2.4rem, 4.5vw, 2.8rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '500' },
  ],
  'sinhala-body': [
    '1.05rem',
    { lineHeight: '1.8', letterSpacing: '0', fontWeight: '400' },
  ],
} satisfies Record<string, [string, object]>;

export const letterSpacing = {
  tight: '-0.02em',
  normal: '0em',
  open: '0.08em',
  wide: '0.15em',
  extended: '0.25em',
  eyebrow: '0.25em',
  label: '0.15em',
  'label-sm': '0.15em',
  caption: '0.08em',
} satisfies Record<string, string>;

export const lineHeight = {
  tight: '1',
  snug: '1.08',
  normal: '1.6',
  relaxed: '1.7',
  loose: '1.3',
  display: '1',
  h1: '1.05',
  h2: '1.08',
  h3: '1.12',
  h4: '1.15',
  pullquote: '1.3',
  body: '1.7',
  'body-sm': '1.6',
  label: '1.4',
  'label-sm': '1.4',
  eyebrow: '1.4',
  caption: '1.4',
} satisfies Record<string, string>;
