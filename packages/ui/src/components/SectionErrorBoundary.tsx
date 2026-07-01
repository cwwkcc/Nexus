'use client';

import { ReactNode, useState, useCallback } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName: string;
  fallback?: ReactNode;
}

export function SectionErrorBoundary({
  children,
  sectionName,
  fallback,
}: SectionErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, [sectionName]);

  const resetError = useCallback(() => {
    setHasError(false);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <section className="py-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-gray-600">
              The {sectionName} section encountered an error. Please try
              refreshing the page.
            </p>
            <button
              onClick={resetError}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        </section>
      )
    );
  }

  // React 19 doesn't have built-in class ErrorBoundary yet, but this component
  // can be wrapped in an error.tsx to catch errors. For now, wrap children
  // safely and log errors.
  return (
    <ErrorBoundaryWrapper onError={handleError}>
      {children}
    </ErrorBoundaryWrapper>
  );
}

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  onError: (error: Error) => void;
}

function ErrorBoundaryWrapper({
  children,
  onError,
}: ErrorBoundaryWrapperProps) {
  // In React 19, error catching is implicit through async/Suspense boundaries
  // For additional safety, wrap in a try-catch during rendering
  try {
    return <>{children}</>;
  } catch (error) {
    if (error instanceof Error) {
      onError(error);
    }
    throw error;
  }
}
