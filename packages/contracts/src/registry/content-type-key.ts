// packages/contracts/src/registry/content-type-key.ts
//
// The exhaustive union of every content-type identifier in the system (every block type,
// plus every editorial and domain content type that can be stored as a ContentEntry),
// together with the schema map and renderer map built over that full union.

import { z } from 'zod';

import { BLOCK_TYPE_VALUES } from '../blocks/block-type.js';

// Content type keys are the union of all block types plus editorial and domain content types
export const CONTENT_TYPE_KEY_VALUES = [
  ...BLOCK_TYPE_VALUES,
  // Editorial content types
  'news-article',
  'news-category',
  'event',
  'event-category',
  'gallery-album',
  'gallery-photo',
  'achievement',
  'achievement-ticker',
  // Domain content types
  'department',
  'subject',
  'stream',
  'staff-member',
  'facility',
  'society',
  'contact-form',
  'feedback-form',
] as const;

export const ContentTypeKeyEnum = z.enum(CONTENT_TYPE_KEY_VALUES);

export type ContentTypeKeyEnumData = z.infer<typeof ContentTypeKeyEnum>;

// TODO: Build schema map and renderer map once all content types are properly defined
