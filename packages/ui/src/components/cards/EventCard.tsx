import { InlineLink } from '../typography/InlineLink';
import Image from 'next/image';
import { Badge } from '../atoms/Badge';

// ─── Types ────────────────────────────────────────────────────────────────────

export type EventStatus =
  | 'upcoming'
  | 'today'
  | 'ongoing'
  | 'past'
  | 'registration-open'
  | 'registration-closed';

export type EventCardVariant = 'standard' | 'compact' | 'featured';

export interface EventCardProps {
  variant?: EventCardVariant;
  title: string;
  description?: string;
  /** ISO date string or pre-formatted date */
  date: string;
  /** e.g. "9:00 AM" */
  time?: string;
  venue?: string;
  category?: string;
  status?: EventStatus;
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  /** e.g. "In 3 days" */
  relativeTime?: string;
  registrationHref?: string;
}

// ─── Status badge map ─────────────────────────────────────────────────────────

const STATUS_LABELS: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  today: 'Today',
  ongoing: 'Happening Now',
  past: 'Past',
  'registration-open': 'Registration Open',
  'registration-closed': 'Registration Closed',
};

function EventStatusBadge({ status }: { status: EventStatus }) {
  const colorMap: Record<EventStatus, { bg: string; text: string }> = {
    upcoming: {
      bg: 'var(--semantic-info-surface, #EAF0F4)',
      text: 'var(--semantic-info-base, #4A6475)',
    },
    today: {
      bg: 'var(--color-gold-pale, #F2D98A)',
      text: 'var(--color-gold-active, #B7852F)',
    },
    ongoing: {
      bg: 'var(--semantic-success-surface, #E6F0E8)',
      text: 'var(--semantic-success-base, #3F6B4B)',
    },
    past: { bg: 'var(--surface-deep)', text: 'var(--text-muted)' },
    'registration-open': {
      bg: 'var(--semantic-success-surface, #E6F0E8)',
      text: 'var(--semantic-success-base, #3F6B4B)',
    },
    'registration-closed': {
      bg: 'var(--surface-deep)',
      text: 'var(--text-muted)',
    },
  };

  const c = colorMap[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        borderRadius: '999px',
        background: c.bg,
        color: c.text,
        fontFamily: 'var(--font-body)',
        fontSize: '0.62rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        lineHeight: 1,
      }}
    >
      {status === 'ongoing' && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: c.text,
            display: 'inline-block',
          }}
        />
      )}
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Date block ───────────────────────────────────────────────────────────────

function DateBlock({
  date,
  isPast = false,
}: {
  date: string;
  isPast?: boolean;
}) {
  // Try to parse for day/month display
  let day = '';
  let month = '';

  try {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      day = d.getDate().toString();
      month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
    } else {
      // Pre-formatted — just show as-is
      day = date;
    }
  } catch {
    day = date;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '56px',
        padding: '10px 12px',
        background: isPast ? 'var(--surface-deep)' : 'var(--color-green-base)',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.75rem',
          fontWeight: 500,
          color: isPast ? 'var(--text-muted)' : 'var(--color-gold-base)',
          lineHeight: 1,
        }}
      >
        {day}
      </span>
      {month && (
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: isPast ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)',
            marginTop: '3px',
          }}
        >
          {month}
        </span>
      )}
    </div>
  );
}

// ─── Standard variant ─────────────────────────────────────────────────────────

function EventCardStandard({
  title,
  description,
  date,
  time,
  venue,
  category,
  status = 'upcoming',
  href,
  imageSrc,
  imageAlt,
  relativeTime,
}: EventCardProps) {
  const isPast = status === 'past';

  return (
    <InlineLink
      href={href}
      style={{ textDecoration: 'none', display: 'block' }}
      className="group"
    >
      <div
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-light)',
          overflow: 'hidden',
          opacity: isPast ? 0.7 : 1,
          boxShadow: '0 2px 8px rgba(28,26,22,0.04)',
          transition: 'box-shadow 0.25s ease, transform 0.25s ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 6px 24px rgba(28,26,22,0.10)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            '0 2px 8px rgba(28,26,22,0.04)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        {/* Image */}
        {imageSrc && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/7',
              overflow: 'hidden',
              background: 'var(--color-green-base)',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              style={{
                objectFit: 'cover',
                filter: isPast ? 'grayscale(0.4) saturate(0.7)' : 'none',
                transition: 'transform 0.45s ease',
              }}
              className="group-hover:scale-[1.03]"
            />
          </div>
        )}

        {/* Content */}
        <div
          style={{ padding: '20px 22px 24px', display: 'flex', gap: '16px' }}
        >
          <DateBlock date={date} isPast={isPast} />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {status && <EventStatusBadge status={status} />}
              {category && <Badge variant="category" label={category} />}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '8px',
                transition: 'color 0.2s ease',
              }}
            >
              {title}
            </h3>

            {description && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {description}
              </p>
            )}

            <div
              className="flex flex-wrap gap-4"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {time && <span>⏱ {time}</span>}
              {venue && <span>📍 {venue}</span>}
              {relativeTime && (
                <span style={{ color: 'var(--color-gold-base)' }}>
                  {relativeTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </InlineLink>
  );
}

// ─── Compact variant ──────────────────────────────────────────────────────────

function EventCardCompact({
  title,
  date,
  time,
  venue,
  status = 'upcoming',
  href,
  relativeTime,
}: EventCardProps) {
  const isPast = status === 'past';

  return (
    <InlineLink
      href={href}
      style={{
        textDecoration: 'none',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
      }}
      className="group"
    >
      <DateBlock date={date} isPast={isPast} />

      <div
        style={{
          flex: 1,
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          {status && status !== 'past' && <EventStatusBadge status={status} />}
        </div>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            marginBottom: '5px',
            transition: 'color 0.2s ease',
          }}
        >
          {title}
        </p>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {time && <span>{time}</span>}
          {venue && <span>{venue}</span>}
          {relativeTime && (
            <span style={{ color: 'var(--color-gold-base)' }}>
              {relativeTime}
            </span>
          )}
        </div>
      </div>
    </InlineLink>
  );
}

// ─── Featured variant ─────────────────────────────────────────────────────────

function EventCardFeatured({
  title,
  description,
  date,
  time,
  venue,
  category,
  status = 'upcoming',
  href,
  imageSrc,
  imageAlt,
  relativeTime,
  registrationHref,
}: EventCardProps) {
  const isPast = status === 'past';

  return (
    <div
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-light)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* Left — image */}
      <div
        style={{
          position: 'relative',
          minHeight: '360px',
          background: 'var(--color-green-base)',
        }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            style={{
              objectFit: 'cover',
              filter: isPast ? 'grayscale(0.4) saturate(0.7)' : 'none',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, var(--color-green-base) 0%, #0d2e1a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Large date display on image */}
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '6rem',
                  fontWeight: 500,
                  color: 'var(--color-gold-base)',
                  lineHeight: 1,
                  opacity: 0.4,
                }}
              >
                {date.split('-')[2] ?? date}
              </p>
            </div>
          </div>
        )}
        {/* Gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(28,26,22,0) 60%, rgba(28,26,22,0.25) 100%)',
          }}
        />
      </div>

      {/* Right — content */}
      <div
        style={{
          padding: '40px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {status && <EventStatusBadge status={status} />}
          {category && <Badge variant="category" label={category} />}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <DateBlock date={date} isPast={isPast} />
          <div>
            {time && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginBottom: '4px',
                }}
              >
                {time}
              </p>
            )}
            {relativeTime && (
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--color-gold-base)',
                  fontWeight: 500,
                }}
              >
                {relativeTime}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
              }}
            >
              {description}
            </p>
          )}
        </div>

        {venue && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
            }}
          >
            📍 {venue}
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <InlineLink
            href={href}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '10px 24px',
              background: 'var(--color-green-base)',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View Details
          </InlineLink>
          {registrationHref && status === 'registration-open' && (
            <InlineLink
              href={registrationHref}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '10px 24px',
                border: '1px solid var(--color-gold-base)',
                color: 'var(--color-gold-base)',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              Register
            </InlineLink>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function EventCard({ variant = 'standard', ...props }: EventCardProps) {
  if (variant === 'featured')
    return <EventCardFeatured {...props} variant={variant} />;
  if (variant === 'compact')
    return <EventCardCompact {...props} variant={variant} />;
  return <EventCardStandard {...props} variant={variant} />;
}
