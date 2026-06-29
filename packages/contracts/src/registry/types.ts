import type { ZodTypeAny } from 'zod';

export interface SectionDefinition {
  key: string;
  blockKey: string;
  label: string;
  description?: string;
  schema: ZodTypeAny;
}

export interface PageRegistry {
  page: string;
  scope: string;
  label: string;
  description?: string;
  sections: SectionDefinition[];
}

export interface GlobalSectionDefinition {
  key: string;
  scope: string;
  contentType: string;
  label: string;
  description?: string;
  schema: ZodTypeAny;
}
