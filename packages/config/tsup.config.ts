import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/next/index.ts', 'src/next/base.ts', 'src/next/web.ts', 'src/next/admin.ts', 'src/next/images.ts', 'src/next/redirects.ts', 'src/tailwind/preset.ts', 'src/fonts.ts', 'src/metadata.ts', 'src/paths.ts', 'src/cache.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['next', 'tailwindcss', '@nexus/env', '@nexus/tokens', '@nexus/contracts'],
  tsconfig: 'tsconfig.lib.json',
  bundle: false,
});
