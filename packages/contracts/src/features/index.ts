// packages/contracts/src/features/index.ts
//
// Feature area contracts — the school's business entities.
//
// Features vs Editorial:
//   features/  — application business entities with logic and relationships
//   editorial/ — CMS-authored content rendered directly by the web app
//
// Areas:
//   school/           — identity, academic years, streams, timetables
//   people/           — staff, principal, students, alumni
//   academics/        — departments, subjects, curriculum
//   admissions/       — requirements, process, key dates, application forms
//   societies/        — society profiles, members, achievements
//   facilities/       — campus facilities, panoramic viewer
//   extracurriculars/ — informal activities outside societies
//   contact/          — contact and feedback forms
//   results/          — OL and AL exam results

export * from './school/index.js';
export * from './people/index.js';
export * from './academics/index.js';
export * from './admissions/index.js';
export * from './societies/index.js';
export * from './facilities/index.js';
export * from './extracurriculars/index.js';
export * from './contact/index.js';
export * from './results/index.js';
