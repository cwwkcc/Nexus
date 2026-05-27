// packages/ui/src/components/layout/Footer.tsx

import { NavLink } from '../navigation/NavLink';
import { InlineLink } from '../typography/InlineLink';
import { Container } from './Container';
import { Grid, GridItem } from './Grid';
import { VStack, HStack } from './Stack';
import { SchoolLogo } from '../logos/SchoolLogo';
import {
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  GitHubIcon,
  LinkedInIcon,
} from '../icons';
import { Divider } from './Divider';

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}
type FooterVariants = 'compact' | 'full';

export interface FooterProps {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  variant?: FooterVariants;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    heading: 'The School',
    links: [
      { label: 'About KCC', href: '/about' },
      { label: 'Administration', href: '/administration' },
      { label: 'Facilities', href: '/facilities' },
    ],
  },
  {
    heading: 'Academics',
    links: [
      { label: 'Streams', href: '/academics' },
      { label: 'Results', href: '/results' },
      { label: 'Achievements', href: '/achievements' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'Societies', href: '/societies' },
      { label: 'Sports', href: '/extracurriculars' },
      { label: 'Scouts', href: '/scouts' },
      { label: 'KITS', href: '/societies/kits' },
    ],
  },
  {
    heading: 'Admissions',
    links: [
      { label: 'How to Apply', href: '/admissions' },
      { label: 'Key Dates', href: '/admissions#dates' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/cwwkcc',
    icon: <FacebookIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cwwkcc',
    icon: <InstagramIcon />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@cwwkcc',
    icon: <YoutubeIcon />,
  },
  { label: 'GitHub', href: 'https://github.com/cwwkcc', icon: <GitHubIcon /> },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/school/cwwkcc',
    icon: <LinkedInIcon />,
  },
];

export function Footer({
  columns = DEFAULT_COLUMNS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  variant = 'full',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-base text-text-inverse w-full min-w-0">
      <Container size="full" padding="md" className="pt-space-8 pb-space-8">
        {/* Row 1: Logo + school name + motto – always left-aligned */}
        {variant === 'full' && (
          <VStack align="center" className="mb-space-4">
            <SchoolLogo variant="crest-only" size="xl" />
            <h2 className="font-body text-body uppercase text-text-inverse">
              C.W.W. Kannangara Central College
            </h2>
            <p className="font-body text-body-sm italic text-text-inverse">
              “Wisdom is All Wealth”
            </p>
          </VStack>
        )}

        <Grid className="gap-x-space-8 gap-y-space-12 my-space-12 lg:grid-cols-5  lg:mb-space-16">
          {/* Contact info */}
          <GridItem>
            <VStack spacing={3} align="center">
              <address>
                <h3 className="text-body font-body uppercase text-gold-base text-center">
                  Contact Us
                </h3>
                <VStack align="center">
                  {[
                    { label: 'Mathugama' },
                    { label: 'Kalutara District' },
                    { label: 'Western Province' },
                    { label: 'Sri Lanka' },
                    {
                      label: '+94 123 456 789',
                      isLink: true,
                      href: 'tel:+94123456789',
                    },
                    {
                      label: 'info@cwwkcc.lk',
                      isLink: true,
                      href: 'mailto:info@cwwkcc.lk',
                    },
                  ].map((item) => (
                    <ul
                      key={item.label}
                      className="font-body text-label-sm uppercase text-center"
                    >
                      {item.isLink ? (
                        <a
                          href={item.href}
                          className="hover:text-gold-base transition-colors duration-fast"
                        >
                          {item.label}
                        </a>
                      ) : (
                        item.label
                      )}
                    </ul>
                  ))}
                </VStack>
              </address>
            </VStack>
          </GridItem>
          {/* NavLinks */}
          {columns.map((col) => (
            <GridItem key={col.heading}>
              <VStack spacing={3} align="center">
                <h3 className="text-body font-body uppercase text-gold-base text-center">
                  {col.heading}
                </h3>
                <VStack as="ul" align="center">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <NavLink
                        href={link.href}
                        className="font-body text-label-sm uppercase"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </VStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>

        {/*  Social icons */}
        <HStack justify="center" className="mb-space-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-inverse hover:text-gold-base transition-colors duration-fast"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </HStack>

        <Divider accentVariant="gold-accent" />
        {/* Copyright bar */}
        <HStack
          wrap
          className="font-body uppercase text-center text-caption"
          justify="between"
        >
          <p>
            © {currentYear} C.W.W. Kannangara Central College. All rights
            reserved.
          </p>
          <HStack spacing={1} justify="between" align="center">
            <NavLink href="/privacy-policy" className="text-text-inverse">
              Privacy Policy
            </NavLink>
            <NavLink href="/terms" className="text-text-inverse">
              <span className="px-space-5 text-pullquote">·</span>
              Terms
              <span className="px-space-5 text-pullquote">·</span>
            </NavLink>
            <NavLink href="/societies/kits" className="text-text-inverse">
              Built by
              <span className="text-gold-base">&nbsp; KITS</span>
            </NavLink>
          </HStack>
        </HStack>
      </Container>
    </footer>
  );
}
