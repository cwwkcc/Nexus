export type SkeletonVariant = 'card' | 'table-row' | 'section';

export interface LoadingSkeletonProps {
  variant?: SkeletonVariant;
  /** Number of repeated skeleton items */
  count?: number;
}

function SkeletonBase({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      aria-hidden="true"
      style={{
        background: 'var(--surface-deep)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <style>{`
        @keyframes kcc-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kcc-shimmer { display: none !important; }
        }
      `}</style>
      <div
        className="kcc-shimmer"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(90deg, transparent, rgba(201,151,58,0.08), transparent)',
          animation: 'kcc-shimmer 1.6s ease-in-out infinite',
        }}
      />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
      }}
    >
      <SkeletonBase style={{ height: '200px' }} />
      <div
        style={{
          padding: '20px 22px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <SkeletonBase
          style={{ height: '12px', width: '30%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{ height: '22px', width: '85%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{ height: '14px', width: '100%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{ height: '14px', width: '75%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{
            height: '12px',
            width: '25%',
            borderRadius: '2px',
            marginTop: '4px',
          }}
        />
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        padding: '14px 0',
        borderBottom: '1px solid var(--border-light)',
        alignItems: 'center',
      }}
    >
      <SkeletonBase
        style={{
          height: '16px',
          width: '8%',
          borderRadius: '2px',
          flexShrink: 0,
        }}
      />
      <SkeletonBase
        style={{ height: '16px', width: '30%', borderRadius: '2px' }}
      />
      <SkeletonBase
        style={{ height: '16px', width: '20%', borderRadius: '2px' }}
      />
      <SkeletonBase
        style={{
          height: '16px',
          width: '15%',
          borderRadius: '2px',
          marginLeft: 'auto',
        }}
      />
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <SkeletonBase
          style={{ height: '12px', width: '15%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{ height: '36px', width: '40%', borderRadius: '2px' }}
        />
        <SkeletonBase
          style={{ height: '18px', width: '60%', borderRadius: '2px' }}
        />
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export function LoadingSkeleton({
  variant = 'card',
  count = 3,
}: LoadingSkeletonProps) {
  if (variant === 'section') return <SectionSkeleton />;

  const items = Array.from({ length: count });

  if (variant === 'table-row') {
    return (
      <div role="status" aria-label="Loading content">
        {items.map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Loading content"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}
    >
      {items.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
