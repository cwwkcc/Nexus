// packages/contracts/src/features/contact/form.ts
//
// General contact form input contract.
//
// Should contain:
//   ContactFormSchema — name (min 2), email (valid), phone?,
//                       subject (min 5), message (min 20, max 2000),
//                       locale (Locale)
//   ContactFormInput  — z.infer type — used as tRPC procedure input
//
// Notes:
//   Used by apps/web ContactForm and the API router that sends the email.
//   .min() / .max() constraints are read by the UI for validation feedback.
//   Never store contact form submissions in the DB — email them directly.



// TODO: implement

export type Form = unknown;
