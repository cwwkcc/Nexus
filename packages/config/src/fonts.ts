// packages/config/src/fonts.ts

// Import via `@nexus/config/fonts` directly — NOT through the package root.
// next/font/google calls must be statically analyzed by Next's compiler
// (this package is already in transpilePackages, so that works here, but a
// non-Next consumer of the root barrel would break on this).

import { Cormorant_Garamond, Cormorant_Upright, Inter, IBM_Plex_Mono, Maname, Noto_Serif_Sinhala, Noto_Serif_Tamil } from 'next/font/google';

// Latin fonts — identical everywhere, always preloaded.
export const cormorantGaramond = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-display' });
export const cormorantUpright = Cormorant_Upright({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-quote' });
export const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
export const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-mono' });

// Non-latin — admin preloads eagerly (current behavior), web defers.
const manameEager = Maname({ subsets: ['sinhala'], weight: ['400'], variable: '--font-sinhala-display' });
const manameLazy = Maname({ subsets: ['sinhala'], weight: ['400'], variable: '--font-sinhala-display', preload: false });
const notoSerifSinhalaEager = Noto_Serif_Sinhala({ subsets: ['sinhala'], weight: ['400', '500', '600'], variable: '--font-sinhala-body' });
const notoSerifSinhalaLazy = Noto_Serif_Sinhala({ subsets: ['sinhala'], weight: ['400', '500', '600'], variable: '--font-sinhala-body', preload: false });
const notoSerifTamilDisplayEager = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['500', '600'], variable: '--font-tamil-display' });
const notoSerifTamilDisplayLazy = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['500', '600'], variable: '--font-tamil-display', preload: false });
const notoSerifTamilBodyEager = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['400', '500'], variable: '--font-tamil-body' });
const notoSerifTamilBodyLazy = Noto_Serif_Tamil({ subsets: ['tamil'], weight: ['400', '500'], variable: '--font-tamil-body', preload: false });

export const adminFontVariables = [cormorantGaramond.variable, cormorantUpright.variable, inter.variable, ibmPlexMono.variable, manameEager.variable, notoSerifSinhalaEager.variable, notoSerifTamilDisplayEager.variable, notoSerifTamilBodyEager.variable];

export const webFontVariables = [cormorantGaramond.variable, cormorantUpright.variable, inter.variable, ibmPlexMono.variable, manameLazy.variable, notoSerifSinhalaLazy.variable, notoSerifTamilDisplayLazy.variable, notoSerifTamilBodyLazy.variable];
