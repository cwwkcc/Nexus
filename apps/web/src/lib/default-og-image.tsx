import { ImageResponse } from 'next/og';

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = 'image/png';

export function createDefaultOgImage(title = 'CWW Kannangara Central College') {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 56,
          background: '#1a472a',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          textAlign: 'center',
        }}
      >
        {title}
      </div>
    ),
    { ...ogImageSize },
  );
}
