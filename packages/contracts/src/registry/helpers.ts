// packages/contracts/src/registry/helpers.ts
//
// Helper functions for querying the combined registry.
//
// Should contain:
//   getPageRegistry(page)            — PageRegistry | undefined
//   getSectionDefinition(page, key)  — SectionDefinition | undefined
//   getAllSectionSchemas()            — Record<sectionKey, ZodSchema>
//                                      merges all pages + globals
//   getGlobalSection(key)            — GlobalSectionDefinition | undefined
//   getGlobalSectionSchemas()        — Record<sectionKey, ZodSchema> for globals only
//
// Notes:
//   getAllSectionSchemas() is used by the API router to validate incoming writes
//   without knowing which page a sectionKey belongs to.
//   Migrate from current page-registry/index.ts and global-registry/index.ts.

// TODO: implement
