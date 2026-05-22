import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../atoms/Badge';

export interface GalleryAlbumCardProps {
  title: string;
  year: string;
  photoCount: number;
  category?: string;
  href: string;
  coverSrc?: string;
  coverAlt?: string;
  className?: string;
}

export function GalleryAlbumCard({
  title,
  year,
  photoCount,
  category,
  href,
  coverSrc,
  coverAlt,
  className,
}: GalleryAlbumCardProps) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 32px rgba(28,26,22,0.12)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 8px rgba(28,26,22,0.04)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Cover */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/3',
            background: 'var(--color-green-base)',
            overflow: 'hidden',
          }}
        >
          {coverSrc ? (
            <Image
              src={coverSrc}
              alt={coverAlt ?? title}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              className="group-hover:scale-[1.04]"
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              }}
            />
          )}

          {/* Hover overlay */}
          <div
            className="group-hover:opacity-100"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(28,26,22,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.6)',
                padding: '8px 20px',
              }}
            >
              View Album
            </span>
          </div>

          {/* Category badge */}
          {category && (
            <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
              <Badge variant="category" label={category} />
            </div>
          )}

          {/* Photo count */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              background: 'rgba(28,26,22,0.7)',
              padding: '4px 10px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fff',
              }}
            >
              {photoCount} photos
            </span>
          </div>
        </div>

        {/* Info bar */}
        <div
          style={{
            padding: '14px 16px',
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
            borderTop: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s ease',
            }}
            className="group-hover:text-[var(--color-gold-active)]"
          >
            {title}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-gold-base)',
              flexShrink: 0,
            }}
          >
            {year}
          </span>
        </div>
      </div>
    </Link>
  );
}
