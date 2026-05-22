import { useState } from 'react';
export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Allow multiple open at once */
  allowMultiple?: boolean;
}

function AccordionSingle({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = `accordion-answer-${item.id}`;

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>
        <span
          aria-hidden="true"
          style={{
            color: 'var(--color-gold-base)',
            fontSize: '1rem',
            flexShrink: 0,
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
            lineHeight: 1,
          }}
        >
          ∨
        </span>
      </button>

      <div
        id={answerId}
        role="region"
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '800px' : '0',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: 'var(--text-muted)',
            lineHeight: 1.75,
            paddingBottom: '20px',
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div style={{ borderTop: '1px solid var(--border-default)' }}>
      {items.map((item) => (
        <AccordionSingle
          key={item.id}
          item={item}
          isOpen={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
