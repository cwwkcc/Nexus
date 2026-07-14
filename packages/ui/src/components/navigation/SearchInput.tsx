'use client';
import type { SearchResultData } from '@nexus/contracts';
import { useState, useEffect, useRef, useId } from 'react';

export interface SearchInputProps {
  /** Clarifies scope, e.g. "Search news and announcements" */
  scopeLabel: string;
  placeholder?: string;
  onSearch: (query: string) => Promise<SearchResultData[]> | SearchResultData[];
  onResultClick?: (result: SearchResultData) => void;
  className?: string;
}

export function SearchInput({ scopeLabel, placeholder, onSearch, onResultClick, className }: SearchInputProps) {
  const id = useId();
  const listId = `${id}-results`;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultData[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await onSearch(query);
        setResults(res);
        setOpen(res.length > 0);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      onResultClick?.(results[activeIdx]);
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }}>
      <label
        htmlFor={id}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.68rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--text-muted)',
          display: 'block',
          marginBottom: '6px',
        }}
      >
        {scopeLabel}
      </label>

      <div style={{ position: 'relative' }}>
        {/* Search icon */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '0.875rem',
            color: open ? 'var(--color-gold-base)' : 'var(--text-muted)',
            pointerEvents: 'none',
            transition: 'color 0.15s ease',
            lineHeight: 1,
          }}
        >
          ⌕
        </span>

        <input
          ref={inputRef}
          id={id}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder ?? 'Search…'}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          style={{
            width: '100%',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            background: 'var(--surface-elevated)',
            border: `1px solid ${open ? 'var(--color-gold-base)' : 'var(--border-default)'}`,
            padding: '10px 40px 10px 38px',
            outline: 'none',
            transition: 'border-color 0.15s ease',
            borderRadius: '2px',
          }}
        />

        {/* Loading / clear */}
        {(loading || query) && (
          <button
            onClick={() => {
              setQuery('');
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              fontSize: '1rem',
              lineHeight: 1,
              padding: '2px',
            }}
          >
            {loading ? '…' : '×'}
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {open && (
        <ul
          id={listId}
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 50,
            background: 'var(--surface-elevated)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 8px 32px rgba(28,26,22,0.12)',
            listStyle: 'none',
            padding: '4px 0',
            margin: 0,
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {results.map((result, idx) => (
            <li key={result.id} role="option" aria-selected={activeIdx === idx}>
              <a
                href={result.href}
                onClick={(e) => {
                  e.preventDefault();
                  onResultClick?.(result);
                  setOpen(false);
                }}
                style={{
                  display: 'block',
                  padding: '10px 16px',
                  textDecoration: 'none',
                  background: activeIdx === idx ? 'var(--surface-default)' : 'transparent',
                  transition: 'background 0.1s ease',
                }}
                onMouseEnter={() => setActiveIdx(idx)}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    display: 'block',
                  }}
                >
                  {result.label}
                </span>
                {result.meta && (
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      display: 'block',
                      marginTop: '2px',
                    }}
                  >
                    {result.meta}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
