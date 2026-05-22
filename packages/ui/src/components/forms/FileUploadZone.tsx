import { useState, useRef, useCallback } from 'react';
export interface FileUploadZoneProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
  /** Called whenever the accepted file list changes */
  onChange?: (files: File[]) => void;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadZone({
  accept,
  multiple = false,
  maxSizeMb,
  onChange,
  label = 'Upload file',
  hint,
  error: externalError,
  disabled = false,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [internalError, setInternalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const error = externalError ?? internalError;

  const processFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setInternalError(null);

      const arr = Array.from(incoming);

      if (maxSizeMb) {
        const oversized = arr.filter((f) => f.size > maxSizeMb * 1024 * 1024);
        if (oversized.length > 0) {
          setInternalError(
            `${oversized[0].name} exceeds the ${maxSizeMb} MB limit.`,
          );
          return;
        }
      }

      const next = multiple ? [...files, ...arr] : arr;
      setFiles(next);
      onChange?.(next);
    },
    [files, maxSizeMb, multiple, onChange],
  );

  const removeFile = (idx: number) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    onChange?.(next);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {label && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-primary)',
            marginBottom: '8px',
          }}
        >
          {label}
        </p>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`${label}. Click or drag files here.`}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled)
            inputRef.current?.click();
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '36px 24px',
          border: `2px dashed ${
            error
              ? 'var(--semantic-error-base)'
              : isDragging
                ? 'var(--color-gold-base)'
                : 'var(--border-default)'
          }`,
          background: isDragging
            ? 'var(--color-gold-pale)'
            : error
              ? 'var(--semantic-error-surface)'
              : 'var(--surface-elevated)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          outline: 'none',
        }}
        onFocus={(e) => {
          if (!disabled)
            e.currentTarget.style.outline = '2px solid var(--color-gold-base)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <span
          aria-hidden="true"
          style={{
            fontSize: '1.75rem',
            color: 'var(--color-gold-base)',
            lineHeight: 1,
          }}
        >
          ↑
        </span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-primary)',
            textAlign: 'center',
          }}
        >
          Drag &amp; drop{multiple ? ' files' : ' a file'} here, or{' '}
          <span
            style={{
              color: 'var(--color-gold-base)',
              textDecoration: 'underline',
            }}
          >
            browse
          </span>
        </span>
        {hint && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
            }}
          >
            {hint}
          </span>
        )}
        {maxSizeMb && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
            }}
          >
            Max {maxSizeMb} MB
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={(e) => processFiles(e.target.files)}
      />

      {/* Error */}
      {error && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'var(--semantic-error-base)',
            marginTop: '6px',
          }}
        >
          {error}
        </p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '10px 0 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {files.map((file, idx) => (
            <li
              key={`${file.name}-${idx}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '10px 14px',
                background: 'var(--surface-default)',
                border: '1px solid var(--border-light)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  minWidth: 0,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--semantic-success-base)',
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {file.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    flexShrink: 0,
                  }}
                >
                  {formatBytes(file.size)}
                </span>
              </div>
              <button
                onClick={() => removeFile(idx)}
                aria-label={`Remove ${file.name}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: '1rem',
                  lineHeight: 1,
                  padding: '2px 4px',
                  flexShrink: 0,
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'var(--semantic-error-base)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    'var(--text-muted)';
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
