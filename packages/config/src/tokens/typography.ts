export const fontFamily = {
  display: ['Cormorant Garamond', 'Georgia', 'serif'],
  body: ['IBM Plex Sans', 'system-ui', '-apple-system', 'sans-serif'],
  mono: ['IBM Plex Mono', 'Menlo', 'monospace'],
  sinhala: ['Noto Serif Sinhala', 'serif'],
} satisfies Record<string, string[]>;

export const fontSize = {
  // Display: hero heading
  display: [
    'clamp(3.86rem, 10vw, 4rem)',
    { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '600' },
  ],
  // H1: page/primary heading
  h1: [
    'clamp(3.2rem, 7vw, 3.36rem)',
    { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '600' },
  ],
  // H2: section heading
  h2: [
    'clamp(2.4rem, 4.5vw, 2.8rem)',
    { lineHeight: '1.08', letterSpacing: '0', fontWeight: '500' },
  ],
  // H3: subsection heading
  h3: [
    'clamp(1.9rem, 2.8vw, 2.33rem)',
    { lineHeight: '1.12', letterSpacing: '0', fontWeight: '500' },
  ],
  // H4: minor heading
  h4: [
    'clamp(1.55rem, 2vw, 1.94rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '500' },
  ],
  // Pullquote: featured quote/testimonial
  pullquote: [
    'clamp(1.35rem, 2.2vw, 1.6rem)',
    { lineHeight: '1.3', letterSpacing: '0.01em', fontWeight: '500' },
  ],
  // Body: default paragraph text
  body: [
    '1.05rem',
    { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' },
  ],
  // Body small: secondary/meta text
  'body-sm': [
    '0.87rem',
    { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
  ],
  // Label: form labels, badges
  label: [
    '0.83rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.15em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  // Label small: compact labels
  'label-sm': [
    '0.83rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.15em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  // Eyebrow: overline, category tags (uppercase)
  eyebrow: [
    '0.75rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.25em',
      fontWeight: '500',
      textTransform: 'uppercase',
    },
  ],
  // Caption: smallest text, fine print (uppercase)
  caption: [
    '0.69rem',
    {
      lineHeight: '1.4',
      letterSpacing: '0.08em',
      fontWeight: '400',
      textTransform: 'uppercase',
    },
  ],
  // Code/monospace
  code: ['0.9em', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
  // Sinhala headings (increased line-height for diacriticals)
  'sinhala-h1': [
    'clamp(3.2rem, 7vw, 3.36rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '600' },
  ],
  'sinhala-h2': [
    'clamp(2.4rem, 4.5vw, 2.8rem)',
    { lineHeight: '1.15', letterSpacing: '0', fontWeight: '500' },
  ],
  // Sinhala body (increased line-height for readability with diacriticals)
  'sinhala-body': [
    '1.05rem',
    { lineHeight: '1.8', letterSpacing: '0', fontWeight: '400' },
  ],
} satisfies Record<string, [string, object]>;

export const letterSpacing = {
  // Condensed: display/headings
  tight: '-0.02em',
  // Neutral: default spacing
  normal: '0em',
  // Open: labels, smaller text
  open: '0.08em',
  // Wide: standard uppercase labels
  wide: '0.15em',
  // Extended: eyebrow/category overlines
  extended: '0.25em',
  // Aliases for backward compatibility
  eyebrow: '0.25em',
  label: '0.15em',
  'label-sm': '0.15em',
  caption: '0.08em',
} satisfies Record<string, string>;

export const lineHeight = {
  // Tight: display & large headings
  tight: '1',
  // Snug: standard headings
  snug: '1.08',
  // Normal: body-sm
  normal: '1.6',
  // Relaxed: body text (default)
  relaxed: '1.7',
  // Loose: pull quotes, features
  loose: '1.3',
  // Aliases for backward compatibility
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
