// packages/contracts/src/core/cms/field.ts
//
// Field-level metadata for the admin panel's dynamic form builder.
// When a content editor opens a section, the admin reads the block schema
// and maps each Zod field to a FieldDefinition to decide which input to render.
//
// Should contain:
//   FieldType        — union: 'text' | 'textarea' | 'richtext' | 'number' |
//                      'boolean' | 'select' | 'multiselect' | 'image' |
//                      'date' | 'url' | 'email' | 'array' | 'object'
//   FieldDefinition  — { type: FieldType, label: string, hint?: string,
//                        required?: boolean, min?: number, max?: number,
//                        options?: { label: string, value: string }[] }
//   FieldMeta        — Record<string, FieldDefinition>
//                      maps field path to definition:
//                      e.g. { 'items[].title': { type: 'text', label: 'Title' } }
//
// Notes:
//   This is the bridge between Zod schemas and the admin form UI.
//   Start simple — add FieldType variants as the form builder grows.

// TODO: implement
