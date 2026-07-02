// packages/ui/src/components/layout/Footer.tsx

import { Container } from './Container';
import { Divider } from './Divider';
import { Grid, GridItem } from './Grid';
import { VStack, HStack } from './Stack';
import {
  FacebookColor,
  InstagramGlyphGradient,
  YouTubeColor,
  GitHubInvertocatBlack,
  LinkedInColor,
} from '../icons';
import { SchoolLogo } from '../icons/brand/SchoolLogo';
import { NavLink } from '../navigation/NavLink';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

// Social icons are stored as a string key in ContentEntry (JSON can't hold
// a component reference) — this map resolves the key to the actual icon.
// Keep in sync with FooterSocialLinkSchema's `icon` enum in @nexus/contracts.
const ICON_MAP: Record<string, React.ReactNode> = {
  facebook: <FacebookColor />,
  instagram: <InstagramGlyphGradient />,
  youtube: <YouTubeColor />,
  github: <GitHubInvertocatBlack />,
  linkedin: <LinkedInColor />,
};

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: keyof typeof ICON_MAP;
}

interface ContactLine {
  label: string;
  href?: string;
}

interface FooterProps {
  schoolName?: string;
  tagline?: string;
  contactLines?: ContactLine[];
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyright?: string;
  legalLinks?: FooterLink[];
}

const DEFAULT_SCHOOL_NAME = 'C.W.W. Kannangara Central College';
const DEFAULT_TAGLINE = '"Wisdom is All Wealth"';

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
  { label: 'Facebook', href: 'https://facebook.com/cwwkcc', icon: 'facebook' },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cwwkcc',
    icon: 'instagram',
  },
  { label: 'YouTube', href: 'https://youtube.com/@cwwkcc', icon: 'youtube' },
  { label: 'GitHub', href: 'https://github.com/cwwkcc', icon: 'github' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/school/cwwkcc',
    icon: 'linkedin',
  },
];

const DEFAULT_CONTACT_LINES: ContactLine[] = [
  { label: 'Mathugama' },
  { label: 'Kalutara District' },
  { label: 'Western Province' },
  { label: 'Sri Lanka' },
  { label: '+94 123 456 789', href: 'tel:+94123456789' },
  { label: 'info@cwwkcc.lk', href: 'mailto:info@cwwkcc.lk' },
];

const DEFAULT_COPYRIGHT =
  'C.W.W. Kannangara Central College. All rights reserved.';

const DEFAULT_LEGAL_LINKS: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'KITS', href: '/societies/kits' },
];

export function Footer({
  schoolName = DEFAULT_SCHOOL_NAME,
  tagline = DEFAULT_TAGLINE,
  contactLines = DEFAULT_CONTACT_LINES,
  columns = DEFAULT_COLUMNS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  copyright = DEFAULT_COPYRIGHT,
  legalLinks = DEFAULT_LEGAL_LINKS,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-surface-base rounded-t-lg  ">
      <Container size="full" padding="sm" className="md:pb-space-2">
        <Grid columns={1} className="sm:grid-cols-5 lg:grid-cols-7 ">
          <GridItem className="sm:col-span-3">
            <GridItem>
              {/*  Logo + school name + motto */}
              <VStack align="center" className="mb-space-4">
                <Container
                  size="full"
                  padding="md"
                  className=" w-full xl:w-size-pct-80"
                >
                  <SchoolLogo />
                </Container>
                <Heading level="h4" color="gold" className="text-center">
                  {schoolName}
                </Heading>
                <Text className="text-center" color="primary">
                  {tagline}
                </Text>
              </VStack>
            </GridItem>
            {/* Contact info */}
            <GridItem alignSelf="center">
              <VStack spacing={3} align="center">
                <address>
                  <Heading
                    level="h6"
                    color="gold"
                    className="mb-space-3 text-center"
                  >
                    Contact Us
                  </Heading>

                  <VStack as="ul" align="center" spacing={0}>
                    {contactLines.map((item) => (
                      <li key={item.label}>
                        {item.href ? (
                          <a href={item.href}>
                            <Text
                              variant="body-sm"
                              color="primary"
                              className="hover:text-gold-base transition-colors duration-fast"
                            >
                              {item.label}
                            </Text>
                          </a>
                        ) : (
                          <Text variant="body-sm" color="primary">
                            {item.label}
                          </Text>
                        )}
                      </li>
                    ))}
                  </VStack>
                </address>
              </VStack>
            </GridItem>
          </GridItem>

          <Grid
            columns={1}
            gapX={10}
            className="sm:grid-cols-2 lg:grid-cols-4 sm:col-span-2 lg:col-span-4"
          >
            {/* NavLink columns */}
            {columns.map((col) => (
              <GridItem
                key={col.heading}
                alignSelf="center"
                className="lg:my-space-40"
              >
                <VStack spacing={3} align="center">
                  <Heading level="h6" color="gold" className="mt-space-3">
                    {col.heading}
                  </Heading>
                  <ul className="list-none flex flex-col items-center gap-space-1">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <NavLink href={link.href}>
                          <Text
                            variant="caption"
                            color="primary"
                            className="hover:text-gold-base transition-colors duration-fast"
                          >
                            {link.label}
                          </Text>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </VStack>
              </GridItem>
            ))}
            <GridItem className="sm:col-span-2 lg:col-span-4 mt-space-3">
              {/* Social icons */}
              <HStack justify="center" className="mb-space-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-gold-base transition-colors duration-fast"
                    aria-label={link.label}
                  >
                    {ICON_MAP[link.icon]}
                  </a>
                ))}
              </HStack>
            </GridItem>
          </Grid>
        </Grid>

        <Divider accentVariant="gold-accent" className=" my-space-2" />

        {/* Copyright bar */}
        <VStack wrap align="center" className="lg:flex-row lg:justify-between">
          <Text variant="caption" className="text-center">
            © {currentYear} {copyright}
          </Text>

          <HStack spacing={1} justify="between">
            {legalLinks.map((link, i) => (
              <HStack key={link.href} spacing={1}>
                {i > 0 && <Text className="px-space-2">·</Text>}
                <NavLink href={link.href}>
                  <Text variant="caption">{link.label}</Text>
                </NavLink>
              </HStack>
            ))}
          </HStack>
        </VStack>
      </Container>
    </footer>
  );
}
