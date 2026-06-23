'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error (root layout):', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: '#f9fafb',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '28rem',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <h1
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  margin: '0 0 0.5rem 0',
                }}
              >
                Critical Error
              </h1>
              <p style={{ fontSize: '1.125rem', color: '#374151', margin: 0 }}>
                The application encountered a critical error and cannot continue. Please try
                refreshing the page.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && error.message && (
              <details
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  textAlign: 'left',
                  marginBottom: '1rem',
                  maxHeight: '160px',
                  overflow: 'auto',
                }}
              >
                <summary style={{ fontWeight: '600', cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Error Details (Dev Only)
                </summary>
                <pre
                  style={{
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: '0.75rem',
                  }}
                >
                  {error.message}
                </pre>
                {error.digest && (
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem' }}>
                    Digest: {error.digest}
                  </p>
                )}
              </details>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={reset}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#e5e7eb',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
