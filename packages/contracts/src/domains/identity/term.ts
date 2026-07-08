// packages/contracts/src/domains/identity/term.ts
//
// Academic term structure within a school year.

import { z } from 'zod';

export const TERM_VALUES = ['Term 1', 'Term 2', 'Term 3'] as const;

export const TermEnum = z.enum(TERM_VALUES);

export type TermEnumData = z.infer<typeof TermEnum>;

export const TermSchema = z.object({
  term: TermEnum,
  startDate: z.string(),
  endDate: z.string(),
  isExamTerm: z.boolean().optional(),
});

export type TermData = z.infer<typeof TermSchema>;
