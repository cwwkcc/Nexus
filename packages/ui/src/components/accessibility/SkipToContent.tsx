'use client';

import { useEffect, useRef } from 'react';

interface SkipToContentProps {
  /**
   * Custom ID of the main content element.
   * @default "main-content"
   */
  contentId?: string;
  /**
   * Offset in pixels for fixed headers.
   * @default 80
   */
  scrollOffset?: number;
  /**
   * Label for screen readers.
   * @default "Skip to main content"
   */
  label?: string;
  /**
   * Whether to add a temporary outline to the target element.
   * @default true
   */
  showFocusOutline?: boolean;
}

export function SkipToContent({
  contentId = 'main-content',
  scrollOffset = 80,
  label = 'Skip to main content',
  showFocusOutline = true,
}: SkipToContentProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Add an event listener to handle the skip link manually for smooth scroll + offset
    const handleSkip = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('a')?.href?.endsWith(`#${contentId}`)) return;

      e.preventDefault();
      const element = document.getElementById(contentId);
      if (!element) return;

      // Smooth scroll with offset for fixed header
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - scrollOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Move focus to the content element
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });

      // Optional: temporary focus outline for visual feedback
      if (showFocusOutline) {
        const originalOutline = element.style.outline;
        element.style.outline = '2px solid var(--color-gold-base)';
        element.style.outlineOffset = '2px';
        setTimeout(() => {
          element.style.outline = originalOutline;
        }, 2000);
      }

      // Remove tabindex after blur so it's not permanently focusable
      element.addEventListener(
        'blur',
        () => {
          element.removeAttribute('tabindex');
          element.style.outline = '';
        },
        { once: true },
      );
    };

    document.addEventListener('click', handleSkip);
    return () => document.removeEventListener('click', handleSkip);
  }, [contentId, scrollOffset, showFocusOutline]);

  return (
    <a
      ref={linkRef}
      href={`#${contentId}`}
      className={`
        sr-only focus:not-sr-only focus:absolute
        focus:top-space-4 focus:left-space-4
        focus:z-toast
        focus:px-space-4 focus:py-space-3
        focus:bg-gold-base focus:text-green-base
        focus:font-body focus:text-label
        focus:uppercase focus:tracking-wider
        focus:rounded-sm focus:shadow-elevation-3
        focus:outline-none
        transition-all duration-fast
      `}
    >
      {label}
    </a>
  );
}
