/* eslint-disable @typescript-eslint/no-explicit-any */
// packages/contracts/src/index.ts

export * from './core/index.js';
export * from './blocks/index.js';
export * from './content-types/index.js';
export * from './features/index.js';
export * from './editorial/index.js';
export * from './global-registry/index.js';
export * from './page-registry/index.js';
export * from './registry/index.js';
export * from './site-settings/index.js';

export const LocaleSchema = {} as any;
export const getAllSectionSchemas = (): Record<string, any> => ({});
export const getGlobalSectionSchemas = (): Record<string, any> => ({});
