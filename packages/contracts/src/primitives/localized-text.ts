// packages/contracts/src/primitives/localized-text.ts
//
// Field-level locale scoping for short translatable strings.

import { z } from 'zod';

import { SUPPORTED_LOCALES } from './locale.ts';

export const LocalizedTextSchema = SUPPORTED_LOCALES;

export type LocalizedTextData = z.infer<typeof LocalizedTextSchema>;
