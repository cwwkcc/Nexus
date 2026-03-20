/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    '!./src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#F7F3EC',
        surface: '#EDE8DF',
        'surface-deep': '#E4DDD1',
        green: {
          DEFAULT: '#1A4A2E',
          light: '#235C3A',
        },
        gold: {
          DEFAULT: '#C9973A',
          light: '#E8B84B',
          pale: '#F2D98A',
        },
        text: {
          dark: '#1C1A16',
          muted: '#5C5647',
        },
        border: {
          DEFAULT: '#D4C9B8',
          light: '#E2D9CC',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        heading: ['DM Serif Display', 'Georgia', 'serif'],
        body: ['Source Serif 4', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': [
          'clamp(3rem, 8vw, 7rem)',
          { lineHeight: '1.05', letterSpacing: '-0.03em' },
        ],
        'display-lg': [
          'clamp(2.4rem, 5vw, 5rem)',
          { lineHeight: '1.1', letterSpacing: '-0.02em' },
        ],
        'display-md': [
          'clamp(1.8rem, 3.5vw, 3rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em' },
        ],
      },
      borderColor: {
        DEFAULT: '#D4C9B8',
      },
    },
  },
  plugins: [],
};
