// components/atoms/InlineLink.tsx
import Link from 'next/link';
import { clsx } from 'clsx';

type Props = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

const styles = clsx(
  'font-body text-gold-base underline underline-offset-2',
  'transition-colors duration-fast ease-snap',
  'hover:text-gold-hover visited:text-gold-active',
  'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-[3px]',
);

export function InlineLink({
  href,
  children,
  external = false,
  className,
}: Props) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(styles, className)}
      >
        {children}
        <svg
          className="inline-block ml-space-1 w-3 h-3 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        {/* Screen readers announce this, sighted users don't see it */}
        <span className="sr-only">(opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={clsx(styles, className)}>
      {children}
    </Link>
  );
}

InlineLink.displayName = 'InlineLink';
