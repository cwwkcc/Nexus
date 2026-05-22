'use client';

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
        focus:z-[500] focus:px-4 focus:py-3
        focus:bg-gold-base focus:text-green-base
        focus:font-body focus:text-label focus:uppercase focus:tracking-wider
        focus:rounded-sm focus:shadow-lg focus:outline-none
      `}
    >
      Skip to main content
    </a>
  );
}
