'use client';

import { Button } from '@nexus/ui';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div>
          <h1 className="text-4xl font-bold text-red-600 mb-space-2">Error</h1>
          <p className="text-lg text-gray-700">Something went wrong. Our team has been notified.</p>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="bg-gray-100 p-space-4 rounded text-left text-sm text-gray-600 overflow-auto max-h-size-40">
            <summary className="font-semibold cursor-pointer mb-space-2">Error Details (Dev Only)</summary>
            <pre className="whitespace-pre-wrap break-words">{error.message}</pre>
            {error.digest && <p className="mt-space-2 text-xs">Digest: {error.digest}</p>}
          </details>
        )}

        <div className="flex gap-space-3 justify-center flex-wrap">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button onClick={() => (window.location.href = '/')} variant="secondary">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
