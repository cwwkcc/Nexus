// packages/api/src/modules/media/r2-client.ts
//
// A thin wrapper around @aws-sdk/client-s3 scoped to exactly what the media
// module needs against Cloudflare R2 (ADR-006) — not a general storage
// abstraction other modules are expected to grow into.
//
// This deliberately does NOT go through @nexus/transport: that package is a
// fetch-based HTTP client for plain REST endpoints (Resend, reCAPTCHA,
// etc.) — see its own README's "what this is not for". R2/S3 requires AWS
// SigV4 request signing, which @aws-sdk/client-s3 already implements
// correctly; routing it through a generic fetch wrapper would mean
// reimplementing SigV4 signing by hand for no benefit.

import { CopyObjectCommand, DeleteObjectCommand, DeleteObjectsCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import type { ApiConfig } from '../../config.js';

/** 5 minutes — long enough for a real upload over a slow connection, short enough that a leaked presigned URL isn't a standing liability. */
export const PRESIGNED_UPLOAD_EXPIRY_SECONDS = 5 * 60;

export interface R2Settings {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl: string;
}

/**
 * Narrows `ApiConfig['r2']` to a fully-configured `R2Settings`, or throws a
 * clear configuration error. Every function below calls this first, rather
 * than letting the AWS SDK fail deep inside a signed request with a
 * confusing "Resolved credential object is not valid" error.
 */
export function requireR2Settings(config: ApiConfig): R2Settings {
  const { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl } = config.r2;
  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName || !publicUrl) {
    throw new Error('R2 is not configured — R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL must all be set.');
  }
  return { accountId, accessKeyId, secretAccessKey, bucketName, publicUrl };
}

let cachedClient: { cacheKey: string; client: S3Client } | null = null;

/**
 * One S3Client per set of credentials, cached at module scope — cheap to
 * reuse across requests within the same server process. Re-created
 * automatically if the credentials change (e.g. between test cases that
 * mutate process.env), since the cache key is derived from them.
 */
function getClient(settings: R2Settings): S3Client {
  const cacheKey = `${settings.accountId}:${settings.accessKeyId}`;
  if (cachedClient && cachedClient.cacheKey === cacheKey) {
    return cachedClient.client;
  }
  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${settings.accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: settings.accessKeyId, secretAccessKey: settings.secretAccessKey },
  });
  cachedClient = { cacheKey, client };
  return client;
}

/** The public CDN URL for an object key — never stored (see schema.prisma's MediaAsset comment), always derived at read time. */
export function objectUrl(settings: R2Settings, key: string): string {
  return `${settings.publicUrl}/${key}`;
}

/**
 * S3's CopySource must be `bucket/key`, with the key portion percent-encoded
 * (AWS's own docs call this out explicitly for keys containing anything
 * beyond unreserved characters). Encoding each `/`-separated segment
 * individually keeps folder-style keys ("tmp/abc123-my file.png") readable
 * in the request while still escaping spaces and other special characters
 * within a segment.
 */
function encodeCopySource(bucketName: string, key: string): string {
  const encodedKey = key.split('/').map(encodeURIComponent).join('/');
  return `${bucketName}/${encodedKey}`;
}

/**
 * Presigned PUT URL the browser uploads directly to (F-067) — the Next.js
 * server never sees the raw file bytes for this step. `contentType` must
 * match exactly what the client sends as its own `Content-Type` header, or
 * R2 rejects the request with a signature mismatch.
 */
export async function createPresignedUploadUrl(settings: R2Settings, key: string, contentType: string): Promise<string> {
  const client = getClient(settings);
  const command = new PutObjectCommand({ Bucket: settings.bucketName, Key: key, ContentType: contentType });
  return getSignedUrl(client, command, { expiresIn: PRESIGNED_UPLOAD_EXPIRY_SECONDS });
}

/**
 * Downloads an object's full body as a Buffer. Used only for images, which
 * `confirmUpload` must load into memory anyway to run through Sharp — never
 * used for documents/audio/video, which use `copyObject` instead so their
 * bytes never pass through this Node process at all.
 */
export async function getObjectBuffer(settings: R2Settings, key: string): Promise<Buffer> {
  const client = getClient(settings);
  const result = await client.send(new GetObjectCommand({ Bucket: settings.bucketName, Key: key }));
  const body = result.Body;
  if (!body) {
    throw new Error(`R2 object "${key}" has no body.`);
  }
  const chunks: Uint8Array[] = [];
  // The SDK's Body type is a union across runtimes (Node Readable | web
  // ReadableStream | Blob) because @aws-sdk/client-s3 supports all three.
  // In the Node runtime this app actually runs in, it's always an
  // async-iterable Readable.
  const nodeStream = body as AsyncIterable<Uint8Array>;
  for await (const chunk of nodeStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function putObject(settings: R2Settings, key: string, body: Buffer, contentType: string): Promise<void> {
  const client = getClient(settings);
  await client.send(new PutObjectCommand({ Bucket: settings.bucketName, Key: key, Body: body, ContentType: contentType }));
}

/**
 * Server-side copy within the same bucket (staging key -> final key) for
 * non-image assets — the object's bytes never pass through this Node
 * process, unlike getObjectBuffer + putObject.
 */
export async function copyObject(settings: R2Settings, sourceKey: string, destinationKey: string): Promise<void> {
  const client = getClient(settings);
  await client.send(new CopyObjectCommand({ Bucket: settings.bucketName, CopySource: encodeCopySource(settings.bucketName, sourceKey), Key: destinationKey }));
}

/**
 * Reads back an object's real size and content type after a server-side
 * copy. Used only for non-image assets (documents/audio/video): the client
 * declares `fileSize`/`mimeType` when it requests the upload, but nothing
 * forces the bytes it actually PUTs to match that declaration, so
 * `confirmUpload` re-reads the ground truth from R2 itself rather than
 * trusting the client's numbers for what gets stored in MediaAsset.
 */
export async function headObject(settings: R2Settings, key: string): Promise<{ contentLength: number | null; contentType: string | null }> {
  const client = getClient(settings);
  const result = await client.send(new HeadObjectCommand({ Bucket: settings.bucketName, Key: key }));
  return {
    contentLength: result.ContentLength ?? null,
    contentType: result.ContentType ?? null,
  };
}

export async function deleteObject(settings: R2Settings, key: string): Promise<void> {
  const client = getClient(settings);
  await client.send(new DeleteObjectCommand({ Bucket: settings.bucketName, Key: key }));
}

/** Bulk delete (F-169's "bulk delete") — one request instead of N sequential DeleteObjectCommands. */
export async function deleteObjects(settings: R2Settings, keys: string[]): Promise<void> {
  if (keys.length === 0) return;
  const client = getClient(settings);
  await client.send(new DeleteObjectsCommand({ Bucket: settings.bucketName, Delete: { Objects: keys.map((Key) => ({ Key })) } }));
}
