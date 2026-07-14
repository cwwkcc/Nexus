import { nexusPreset } from '@nexus/config/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [nexusPreset],
  content: [
    './src/**/*.{ts,tsx,js,jsx,html}',
    '!./src/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};
