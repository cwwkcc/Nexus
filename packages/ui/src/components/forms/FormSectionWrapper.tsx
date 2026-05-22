export interface FormSectionWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSectionWrapper({
  title,
  description,
  children,
  className,
}: FormSectionWrapperProps) {
  return (
    <div className={className} style={{ marginBottom: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: description ? '6px' : 0,
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        )}
        <div
          aria-hidden="true"
          style={{
            marginTop: '14px',
            height: '1px',
            background: 'var(--border-light)',
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {children}
      </div>
    </div>
  );
}
