// packages/config/src/tokens/sizing.ts

export const sizing = {
  // Fine-grained (px – for strokes, small elements)
  'size-0': '0px',
  'size-px': '1px',
  'size-0p5': '2px',
  'size-1': '4px',
  'size-1p5': '6px',
  'size-2': '8px',
  'size-2p5': '10px',
  'size-3': '12px',
  'size-3p5': '14px',
  'size-4': '16px',
  'size-5': '20px',
  'size-6': '24px',
  'size-7': '28px',

  // Geometric progression (px)
  'size-8': '32px',
  'size-10': '40px',
  'size-12': '48px',
  'size-14': '56px',
  'size-16': '64px',
  'size-20': '80px',
  'size-24': '96px',
  'size-28': '112px',
  'size-32': '128px',
  'size-36': '144px',
  'size-40': '160px',
  'size-48': '192px',
  'size-56': '224px',
  'size-64': '256px',
  'size-72': '288px',
  'size-80': '320px',
  'size-96': '384px',

  // Semantic sizing
  'size-full': '100%',
  'size-screen-w': '100vw',
  'size-screen-h': '100vh',
  'size-min': 'min-content',
  'size-max': 'max-content',
  'size-fit': 'fit-content',
  'size-auto': 'auto',
} satisfies Record<string, string>;
