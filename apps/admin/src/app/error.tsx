'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-red-50">
      <div className="text-center space-y-6 max-w-md bg-white p-8 rounded-lg shadow">
        <div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">Error</h1>
          <p className="text-lg text-gray-700">An error occurred in the admin panel.</p>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <details className="bg-gray-100 p-4 rounded text-left text-sm text-gray-600 overflow-auto max-h-40">
            <summary className="font-semibold cursor-pointer mb-2">Error Details (Dev Only)</summary>
            <pre className="whitespace-pre-wrap break-words text-xs">{error.message}</pre>
            {error.digest && <p className="mt-2 text-xs">Digest: {error.digest}</p>}
          </details>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
            Try Again
          </button>
          <button onClick={() => (window.location.href = '/admin')} className="px-4 py-2 bg-gray-300 text-gray-900 rounded hover:bg-gray-400 transition">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
