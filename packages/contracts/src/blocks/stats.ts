// packages/contracts/src/blocks/stats.ts
//
// Stats block — animated count-up statistics strip.
//
// Should contain:
//   StatItemSchema — id, target (number), label, suffix?, prefix?,
//                    description?, tooltip?, disableCountUp? (bool)
//   StatsSchema    — stats: StatItem[]
//   StatsData      — z.infer type
//   StatItem       — z.infer type
//
// Notes:
//   disableCountUp: true for values that should not animate (e.g. year '1873').
//   The useCountUp hook in @nexus/ui handles the animation.

import { z } from 'zod';

// TODO: implement (migrate from packages/validation/src/content-types/index.ts)
