import Link from 'next/link';
import Image from 'next/image';
export interface FacilityScheduleSlot {
  day: string;
  time: string;
  group: string;
}

export type FacilityCardVariant = 'standard' | 'schedule';

export interface FacilityCardProps {
  variant?: FacilityCardVariant;
  name: string;
  description: string;
  features: string[];
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  schedule?: FacilityScheduleSlot[];
  className?: string;
}

export function FacilityCard({
  variant = 'standard',
  name,
  description,
  features,
  href,
  imageSrc,
  imageAlt,
  schedule,
  className,
}: FacilityCardProps) {
  const Wrapper = href ? Link : 'div';
  const wrapperProps = href
    ? {
        href,
        style: { textDecoration: 'none', display: 'block' },
        className: 'group',
      }
    : { className: 'group' };

  return (
    // @ts-expect-error polymorphic wrapper
    <Wrapper {...wrapperProps}>
      <div
        className={className}
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
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
        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'var(--color-green-base)',
            overflow: 'hidden',
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
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
        </div>

        <div style={{ padding: '24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '8px',
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
              marginBottom: '16px',
            }}
          >
            {description}
          </p>

          {/* Features */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom:
                variant === 'schedule' && schedule?.length ? '20px' : 0,
            }}
          >
            {features.map((feat) => (
              <li
                key={feat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span
                  style={{
                    color: 'var(--color-green-base)',
                    fontSize: '0.6rem',
                    flexShrink: 0,
                  }}
                >
                  ●
                </span>
                {feat}
              </li>
            ))}
          </ul>

          {/* Schedule table (schedule variant only) */}
          {variant === 'schedule' && schedule && schedule.length > 0 && (
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginBottom: '10px',
                }}
              >
                Schedule
              </p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {schedule.map((slot, i) => (
                    <tr
                      key={i}
                      style={{
                        background:
                          i % 2 === 0
                            ? 'var(--surface-base)'
                            : 'var(--surface-default)',
                      }}
                    >
                      <td
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: 'var(--color-gold-base)',
                          padding: '7px 10px',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {slot.day}
                      </td>
                      <td
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          padding: '7px 10px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {slot.time}
                      </td>
                      <td
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.78rem',
                          color: 'var(--text-primary)',
                          padding: '7px 10px',
                        }}
                      >
                        {slot.group}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
