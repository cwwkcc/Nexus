import { useState } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time?: string;
  venue?: string;
  category?: string;
  href?: string;
  status?: 'upcoming' | 'today' | 'ongoing' | 'past';
}

export type CalendarVariant = 'mini-strip' | 'month-view' | 'list-view';

export interface CalendarProps {
  variant?: CalendarVariant;
  events: CalendarEvent[];
  /** For month-view: YYYY-MM */
  month?: string;
  onMonthChange?: (month: string) => void;
  className?: string;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_COLORS: Record<string, string> = {
  upcoming: 'var(--semantic-info-base)',
  today: 'var(--color-gold-base)',
  ongoing: 'var(--semantic-success-base)',
  past: 'var(--text-muted)',
};

export function Calendar({
  variant = 'list-view',
  events,
  month,
  onMonthChange,
  className,
}: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    month ??
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`,
  );

  const changeMonth = (delta: number) => {
    const [y, m] = currentMonth.split('-').map(Number);
    const d = new Date(y, m - 1 + delta, 1);
    const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    setCurrentMonth(next);
    onMonthChange?.(next);
  };

  // ── Mini strip ────────────────────────────────────────────────────────────
  if (variant === 'mini-strip') {
    const upcoming = events.filter((e) => e.status !== 'past').slice(0, 5);

    return (
      <div
        className={className}
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {upcoming.map((evt) => {
          const d = new Date(evt.date);
          return (
            <a
              key={evt.id}
              href={evt.href ?? '#'}
              style={{ textDecoration: 'none', flexShrink: 0 }}
              className="group"
            >
              <div
                style={{
                  width: '120px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-light)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(-2px)';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 6px 20px rgba(28,26,22,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                {/* Date block */}
                <div
                  style={{
                    background: 'var(--color-green-base)',
                    padding: '10px 0',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 500,
                      color: 'var(--color-gold-base)',
                      lineHeight: 1,
                    }}
                  >
                    {String(d.getDate()).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.58rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'rgba(255,255,255,0.7)',
                      marginTop: '2px',
                    }}
                  >
                    {MONTH_NAMES[d.getMonth()].slice(0, 3)}
                  </div>
                </div>
                {/* Title */}
                <div style={{ padding: '10px 10px 12px' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                    className="group-hover:text-[var(--color-gold-active)]"
                  >
                    {evt.title}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // ── List view ─────────────────────────────────────────────────────────────
  if (variant === 'list-view') {
    return (
      <div
        className={className}
        style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}
      >
        {events.map((evt) => {
          const d = new Date(evt.date);
          const statusColor = STATUS_COLORS[evt.status ?? 'upcoming'];
          return (
            <a
              key={evt.id}
              href={evt.href ?? '#'}
              style={{ textDecoration: 'none' }}
              className="group"
            >
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  padding: '18px 20px',
                  background: 'var(--surface-elevated)',
                  border: '1px solid var(--border-light)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'var(--color-gold-base)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    'var(--border-light)';
                }}
              >
                {/* Date column */}
                <div
                  style={{
                    flexShrink: 0,
                    textAlign: 'center',
                    width: '44px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--color-gold-base)',
                      lineHeight: 1,
                    }}
                  >
                    {String(d.getDate()).padStart(2, '0')}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.6rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    {MONTH_NAMES[d.getMonth()].slice(0, 3)}
                  </div>
                </div>

                {/* Event info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px',
                    }}
                  >
                    {evt.status && (
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: statusColor,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {evt.category && (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.62rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.12em',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {evt.category}
                      </span>
                    )}
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                      transition: 'color 0.15s ease',
                    }}
                    className="group-hover:text-[var(--color-gold-active)]"
                  >
                    {evt.title}
                  </h4>
                  {(evt.time || evt.venue) && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {[evt.time, evt.venue].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    );
  }

  // ── Month view ────────────────────────────────────────────────────────────
  const [year, monthNum] = currentMonth.split('-').map(Number);
  const firstDay = new Date(year, monthNum - 1, 1).getDay();
  const daysInMonth = new Date(year, monthNum, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to full rows
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsByDay: Record<number, CalendarEvent[]> = {};
  events.forEach((evt) => {
    const d = new Date(evt.date);
    if (d.getFullYear() === year && d.getMonth() + 1 === monthNum) {
      const day = d.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(evt);
    }
  });

  return (
    <div className={className}>
      {/* Month header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            transition: 'color 0.15s ease',
          }}
        >
          ←
        </button>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {MONTH_NAMES[monthNum - 1]} {year}
        </h3>
        <button
          onClick={() => changeMonth(1)}
          aria-label="Next month"
          style={{
            background: 'none',
            border: '1px solid var(--border-default)',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            transition: 'color 0.15s ease',
          }}
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          marginBottom: '4px',
        }}
      >
        {DAY_ABBR.map((d) => (
          <div
            key={d}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.62rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              textAlign: 'center',
              padding: '4px 0',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '2px',
        }}
      >
        {cells.map((day, idx) => {
          if (!day)
            return <div key={`empty-${idx}`} style={{ minHeight: '60px' }} />;
          const isToday =
            day === today.getDate() &&
            year === today.getFullYear() &&
            monthNum === today.getMonth() + 1;
          const isPast =
            new Date(year, monthNum - 1, day) <
            new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const dayEvents = eventsByDay[day] ?? [];

          return (
            <div
              key={day}
              style={{
                minHeight: '60px',
                padding: '6px',
                background: 'var(--surface-elevated)',
                border: `1px solid ${isToday ? 'var(--color-gold-base)' : 'var(--border-light)'}`,
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: isToday
                    ? 'var(--color-gold-base)'
                    : 'var(--text-muted)',
                  fontWeight: isToday ? 600 : 400,
                  marginBottom: '4px',
                }}
              >
                {day}
              </div>
              {dayEvents.slice(0, 2).map((evt) => (
                <a
                  key={evt.id}
                  href={evt.href ?? '#'}
                  title={evt.title}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.58rem',
                    color: '#fff',
                    background: STATUS_COLORS[evt.status ?? 'upcoming'],
                    padding: '2px 4px',
                    marginBottom: '2px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                  }}
                >
                  {evt.title}
                </a>
              ))}
              {dayEvents.length > 2 && (
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.55rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  +{dayEvents.length - 2} more
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
