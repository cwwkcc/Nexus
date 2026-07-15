import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/next/index.ts', 'src/tailwind/preset.ts', 'src/fonts.ts', 'src/metadata.ts', 'src/paths.ts', 'src/cache.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  outDir: 'dist',
  external: ['next', 'tailwindcss', '@nexus/env', '@nexus/tokens', '@nexus/contracts'],
  tsconfig: 'tsconfig.lib.json',
  bundle: false,
});
