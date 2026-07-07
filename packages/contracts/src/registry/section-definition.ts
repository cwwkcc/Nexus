// packages/contracts/src/registry/section-definition.ts
//
// The atomic unit of page/global composition (section key, scope, content-type identifier, order, locale-required flag).

import { z } from 'zod';

export const SectionDefinitionSchema = z.object({
  sectionKey: z.string(),
  scope: z.string(), // 'global' or 'page:<pageKey>'
  contentTypeKey: z.string(),
  order: z.number(),
  localeRequired: z.boolean(),
});

export type SectionDefinitionData = z.infer<typeof SectionDefinitionSchema>;
