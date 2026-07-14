'use client';

import { motion, useTransform } from 'framer-motion';

import { useCountUp } from '../../hooks/useCountUp';
import { cn } from '../../utilities/cn';
import { ButtonLink } from '../atoms/ButtonLink';
import { SchoolLogo } from '../icons/brand/SchoolLogo';
import { Divider } from '../layout/Divider';
import { NavLink } from '../navigation/NavLink';
import { EyebrowLabel } from '../typography/EyebrowLabel';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

const QUICK_LINKS = [
  { href: '/', label: 'Homepage' },
  { href: '/news', label: 'News' },
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About KCC' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/contact', label: 'Contact' },
];

export function NotFoundPage() {
  const { value: animated404 } = useCountUp(404);
  const display404 = useTransform(animated404, Math.round);

  return (
    <main className="min-h-screen bg-green-base flex flex-col items-center justify-center py-space-16 px-space-6 relative overflow-hidden">
      <div className="relative z-10 text-center max-w-prose">
        {/* School crest */}
        <div className="mb-space-8 flex justify-center">
          <SchoolLogo variant="crest-only" size="lg" />
        </div>

        {/* Animated 404 heading */}
        <Heading level="h1" color="inverse" className="mb-space-4">
          <motion.span>{display404}</motion.span>
        </Heading>

        {/* Eyebrow label */}
        <EyebrowLabel className="mb-space-6 text-white/45">Page not found</EyebrowLabel>

        {/* Message – using Text component */}
        <Text variant="body" color="inverse" className="text-white/55 mb-space-8 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved, renamed, or removed.
        </Text>

        {/* Primary CTA – using Button component */}
        <ButtonLink href="/" variant="primary" className="bg-gold-base text-green-base hover:bg-transparent hover:text-gold-base border-gold-base" leftIcon={<span aria-hidden="true">←</span>}>
          Return to homepage
        </ButtonLink>

        {/* Divider */}
        <Divider accentVariant="gold-accent-narrow" />

        {/* Quick links section */}
        <Text variant="caption" color="inverse" className="text-white/35 mb-space-4">
          Or jump to
        </Text>

        <nav aria-label="Quick navigation links">
          <ul className="flex flex-wrap gap-space-2 justify-center">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} className={cn('font-body text-caption uppercase tracking-caption', 'text-white/55 px-space-3 py-space-1.5', 'border border-white/15 rounded-sm', 'transition-colors duration-fast ease-snap', 'hover:text-gold-base hover:border-gold-base/40', 'focus-visible:outline-2 focus-visible:outline-gold-base focus-visible:outline-offset-2')} activeClassName="text-gold-base border-gold-base">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer line – using Text component */}
        <Text variant="body-sm" color="inverse" className="text-white/20 mt-space-12 italic font-display">
          C.W.W. Kannangara Central College, Mathugama — Est. 1873
        </Text>
      </div>
    </main>
  );
}
