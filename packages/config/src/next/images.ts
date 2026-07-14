// packages/config/src/next/images.ts

interface RemotePatternInput {
  protocol: 'http' | 'https';
  hostname: string;
  pathname?: string;
}

/**
 * next/image remotePatterns for Cloudflare R2 media. Without this,
 * <Image src={r2Url}> throws at runtime — see ImageFrame in @nexus/ui.
 */
export function r2RemotePatterns(): RemotePatternInput[] {
  const r2Url = process.env.R2_PUBLIC_URL;
  if (!r2Url) return []; // no R2 configured locally — skip, don't crash the build

  const { protocol, hostname } = new URL(r2Url);
  return [{ protocol: protocol.replace(':', '') as 'http' | 'https', hostname, pathname: '/**' }];
}
