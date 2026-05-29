// packages/config/src/tokens/sizing.ts

export const sizing = {
  // ── Zero ──────────────────────────────────────────────────────────────────
  'size-0': '0px',

  // ── Sub-pixel / stroke scale (1–14px) ────────────────────────────────────
  'size-px': '1px',
  'size-0p5': '2px',
  'size-1': '4px',
  'size-1p5': '6px',
  'size-2': '8px',
  'size-2p5': '10px',
  'size-3': '12px',
  'size-3p5': '14px',

  // ── Component scale (16–64px) ─────────────────────────────────────────────
  'size-4': '16px',
  'size-5': '20px',
  'size-6': '24px',
  'size-7': '28px',
  'size-8': '32px',
  'size-9': '36px',
  'size-10': '40px',
  'size-11': '44px',
  'size-12': '48px',
  'size-13': '52px',
  'size-14': '56px',
  'size-15': '60px',
  'size-16': '64px',

  // ── Block scale (80–192px) ────────────────────────────────────────────────
  'size-20': '80px',
  'size-22': '88px',
  'size-24': '96px',
  'size-26': '104px',
  'size-28': '112px',
  'size-30': '120px',
  'size-32': '128px',
  'size-34': '136px',
  'size-36': '144px',
  'size-38': '152px',
  'size-40': '160px',
  'size-44': '176px',
  'size-48': '192px',

  // ── Section scale (224–384px) ─────────────────────────────────────────────
  'size-56': '224px',
  'size-60': '240px',
  'size-64': '256px',
  'size-68': '272px',
  'size-72': '288px',
  'size-76': '304px',
  'size-80': '320px',
  'size-84': '336px',
  'size-88': '352px',
  'size-92': '368px',
  'size-96': '384px',

  // ── Layout scale (400–768px) ──────────────────────────────────────────────
  'size-100': '400px',
  'size-104': '416px',
  'size-108': '432px',
  'size-112': '448px',
  'size-116': '464px',
  'size-120': '480px',
  'size-128': '512px',
  'size-136': '544px',
  'size-144': '576px',
  'size-152': '608px',
  'size-160': '640px',
  'size-168': '672px',
  'size-176': '704px',
  'size-180': '720px',
  'size-192': '768px',

  // ── Container scale (800–1536px) ──────────────────────────────────────────
  'size-200': '800px',
  'size-210': '840px',
  'size-220': '880px',
  'size-225': '900px',
  'size-240': '960px',
  'size-256': '1024px',
  'size-280': '1120px',
  'size-300': '1200px',
  'size-320': '1280px',
  'size-360': '1440px',
  'size-384': '1536px',

  // ── Semantic ──────────────────────────────────────────────────────────────
  'size-full': '100%',
  'size-screen-w': '100vw',
  'size-screen-h': '100vh',
  'size-min': 'min-content',
  'size-max': 'max-content',
  'size-fit': 'fit-content',
  'size-auto': 'auto',
} satisfies Record<string, string>;

export const borderWidth = {
  'border-none': '0px',
  'border-sm': '1px',
  'border-md': '2px',
  'border-lg': '4px',
  'border-xl': '6px',
  'border-2xl': '8px',
} satisfies Record<string, string>;
