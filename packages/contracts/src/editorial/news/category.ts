// packages/contracts/src/editorial/news/category.ts
//
// News category definitions.
//
// Should contain:
//   NEWS_CATEGORIES    — as const object mapping key → label
//   NewsCategoryKey    — keyof typeof NEWS_CATEGORIES
//   NewsCategorySchema — z.enum of category keys
//   NewsCategoryMeta   — { key, label, description? }[] for admin filter UI

import { z } from 'zod';

export const NEWS_CATEGORIES = {
  academic: 'Academic',
  sports: 'Sports',
  cultural: 'Cultural',
  community: 'Community',
  general: 'General',
} as const;

export type NewsCategoryKey = keyof typeof NEWS_CATEGORIES;

export const NewsCategorySchema = z.enum(
  Object.keys(NEWS_CATEGORIES) as [NewsCategoryKey, ...NewsCategoryKey[]],
);

export type NewsCategoryMeta = {
  key: NewsCategoryKey;
  label: string;
  description?: string;
};

export const NEWS_CATEGORY_META: NewsCategoryMeta[] = Object.entries(
  NEWS_CATEGORIES,
).map(([key, label]) => ({
  key: key as NewsCategoryKey,
  label,
}));

export type Category = NewsCategoryKey;
