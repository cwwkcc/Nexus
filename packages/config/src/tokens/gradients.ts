export const backgroundImage = {
  'gradient-gold-subtle':
    'linear-gradient(135deg, rgba(201,151,58,0.18), rgba(26,74,46,0.0))',
  'gradient-hero-deep':
    'linear-gradient(180deg, rgba(26,74,46,0.0) 0%, rgba(26,74,46,0.72) 100%)',
  'gradient-overlay-fade':
    'linear-gradient(180deg, rgba(28,26,22,0.0) 0%, rgba(28,26,22,0.56) 100%)',
  'gradient-radial-gold':
    'radial-gradient(circle at center, rgba(201,151,58,0.18), transparent 70%)',
  'gradient-radial-canopy':
    'radial-gradient(ellipse 120% 120% at 50% 0%, var(--color-surface-canopy) 0%, var(--color-surface-elevated) 40%, var(--color-surface-deep) 70%, var(--color-surface-base) 100%)',
} satisfies Record<string, string>;
