/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        // Primary
        green: {
          base: '#1A4A2E',
          light: '#235C3A',
        },
        gold: {
          base: '#C9973A',
          light: '#E8B84B',
          pale: '#F2D98A',
          hover: '#D6A645',
          active: '#B7852F',
        },

        // Surfaces
        surface: {
          base: '#F7F3EC',
          default: '#EDE8DF',
          deep: '#E4DDD1',
          elevated: '#F3EEE6',
          inverse: '#22201B',
        },

        // Text
        text: {
          primary: '#1C1A16',
          muted: '#5C5647',
          inverse: '#F5EFE4',
        },

        // Borders
        border: {
          default: '#D4C9B8',
          light: '#E2D9CC',
        },

        // Semantic
        semantic: {
          success: {
            base: '#3F6B4B',
            surface: '#E6F0E8',
          },
          error: {
            base: '#8A3B32',
            surface: '#F6E8E5',
          },
          warning: {
            base: '#B07A2B',
            surface: '#FAF1DE',
          },
          info: {
            base: '#4A6475',
            surface: '#EAF0F4',
          },
        },
      },

      // ── Typography ──────────────────────────────────────────
      // Admin uses same fonts — no Sinhala needed
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
      },

      fontSize: {
        h2: [
          'clamp(2rem, 4vw, 3rem)',
          { lineHeight: '1.05', letterSpacing: '0', fontWeight: '500' },
        ],
        h3: [
          'clamp(1.35rem, 2.2vw, 1.85rem)',
          { lineHeight: '1.1', letterSpacing: '0', fontWeight: '500' },
        ],
        body: [
          '1.05rem',
          { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' },
        ],
        'body-sm': [
          '0.92rem',
          { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' },
        ],
        label: [
          '0.75rem',
          { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '500' },
        ],
        eyebrow: [
          '0.72rem',
          { lineHeight: '1.4', letterSpacing: '0.28em', fontWeight: '500' },
        ],
        caption: [
          '0.7rem',
          { lineHeight: '1.4', letterSpacing: '0.2em', fontWeight: '400' },
        ],
      },

      // ── Spacing ─────────────────────────────────────────────
      spacing: {
        'space-1': '4px',
        'space-2': '8px',
        'space-3': '12px',
        'space-4': '16px',
        'space-5': '20px',
        'space-6': '24px',
        'space-8': '32px',
        'space-10': '40px',
        'space-12': '48px',
      },
      // Admin compact density — max section spacing is space-12 (48px)

      // ── Border Radius ────────────────────────────────────────
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        full: '9999px',
      },

      // ── Elevation ────────────────────────────────────────────
      // Admin defaults to elevation-0. Micro-elevation only for inputs and dropdowns.
      boxShadow: {
        'elevation-0': 'none',
        'elevation-1': '0 1px 3px rgba(28,26,22,0.08)',
        'elevation-2': '0 4px 12px rgba(28,26,22,0.10)',
        'elevation-3': '0 8px 24px rgba(28,26,22,0.12)',
      },

      // ── Motion ───────────────────────────────────────────────
      // Admin uses instant, fast, and standard only — never ceremonial or epic
      transitionDuration: {
        instant: '80ms',
        fast: '150ms',
        standard: '300ms',
      },

      transitionTimingFunction: {
        snap: 'cubic-bezier(0.25, 0, 0, 1)',
        'ease-out': 'cubic-bezier(0.0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ── Max Width ────────────────────────────────────────────
      maxWidth: {
        content: '1160px',
      },
    },
  },
  plugins: [],
};
