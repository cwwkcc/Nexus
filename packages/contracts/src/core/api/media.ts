// packages/contracts/src/core/api/media.ts
//
// Input/output schemas for the media upload tRPC router.
//
// Should contain:
//   RequestUploadUrlInput  — fileName, contentType (MIME),
//                            folder ('images'|'documents'|'media'|'avatars')
//   RequestUploadUrlOutput — uploadUrl (presigned R2 PUT URL), key, expiresAt
//   ConfirmUploadInput     — key, title?, altText?
//   MediaAssetOutput       — key, url, contentType, size, title?, altText?, uploadedAt
//
// Notes:
//   Upload flow: admin requests presigned URL → uploads directly to R2 →
//   calls confirmUpload to register the asset in the DB.
//   Never stream file bytes through the tRPC server.



// TODO: implement

export type CoreMedia2 = unknown;
