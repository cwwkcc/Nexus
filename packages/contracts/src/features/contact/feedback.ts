// packages/contracts/src/features/contact/feedback.ts
//
// Feedback form input contract.
//
// Should contain:
//   FeedbackCategory   — z.enum(['website','academic','facilities','staff','other'])
//   FeedbackFormSchema — category, rating? (1–5), message (min 10),
//                        isAnonymous? (bool), email? (required if not anonymous)
//   FeedbackFormInput  — z.infer type
//
// Notes:
//   Used by the FeedbackForm component in @nexus/ui.
//   Unlike contact form submissions, feedback may be stored in the DB.



// TODO: implement

export type Feedback = unknown;
