import Link from 'next/link';
export interface AcademicStreamCardProps {
  stream: 'science' | 'commerce' | 'arts' | 'technology';
  name: string;
  description: string;
  careerPaths: string[];
  href: string;
  subjectCount?: number;
  className?: string;
}

const STREAM_ICONS: Record<AcademicStreamCardProps['stream'], string> = {
  science: '⚗',
  commerce: '◎',
  arts: '◈',
  technology: '⌬',
};

export function AcademicStreamCard({
  stream,
  name,
  description,
  careerPaths,
  href,
  subjectCount,
  className,
}: AcademicStreamCardProps) {
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
          height: '100%',
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          padding: '28px 24px 24px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 8px 32px rgba(28,26,22,0.10)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 8px rgba(28,26,22,0.04)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Green left accent that reveals on hover */}
        <div
          className="group-hover:opacity-100"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '3px',
            height: '100%',
            background: 'var(--color-green-base)',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
        />

        {/* Icon */}
        <div
          style={{
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--surface-deep)',
            border: '1px solid var(--border-light)',
            marginBottom: '16px',
            fontSize: '1.25rem',
            color: 'var(--color-green-base)',
          }}
        >
          {STREAM_ICONS[stream]}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-gold-base)',
            marginBottom: '6px',
          }}
        >
          A/L Stream
          {subjectCount ? ` · ${subjectCount} subjects` : ''}
        </p>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '10px',
            transition: 'color 0.2s ease',
          }}
          className="group-hover:text-[var(--color-gold-active)]"
        >
          {name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            lineHeight: 1.65,
            marginBottom: '18px',
          }}
        >
          {description}
        </p>

        {/* Career path tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
          }}
        >
          {careerPaths.map((path) => (
            <span
              key={path}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '4px 10px',
                background: 'var(--surface-deep)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-light)',
                borderRadius: '999px',
              }}
            >
              {path}
            </span>
          ))}
        </div>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-gold-base)',
            transition: 'letter-spacing 0.2s ease',
          }}
          className="group-hover:tracking-widest"
        >
          Explore stream →
        </span>
      </div>
    </Link>
  );
}
