// packages/ui/src/components/layout/Footer.tsx

import { NavLink } from '../navigation/NavLink';
import { Container } from './Container';
import { Grid, GridItem } from './Grid';
import { VStack, HStack } from './Stack';
import { SchoolLogo } from '../icons/brand/SchoolLogo';
import {
  FacebookColor,
  InstagramGlyphGradient,
  YouTubeColor,
  GitHubInvertocatBlack,
  LinkedInColor,
} from '../icons';
import { Divider } from './Divider';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterProps {
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
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
    icon: <FacebookColor />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/cwwkcc',
    icon: <InstagramGlyphGradient />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@cwwkcc',
    icon: <YouTubeColor />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cwwkcc',
    icon: <GitHubInvertocatBlack />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/school/cwwkcc',
    icon: <LinkedInColor />,
  },
];

const CONTACT_LINES: {
  label: string;
  isLink?: boolean;
  href?: string;
}[] = [
  { label: 'Mathugama' },
  { label: 'Kalutara District' },
  { label: 'Western Province' },
  { label: 'Sri Lanka' },
  { label: '+94 123 456 789', isLink: true, href: 'tel:+94123456789' },
  { label: 'info@cwwkcc.lk', isLink: true, href: 'mailto:info@cwwkcc.lk' },
];

export function Footer({
  columns = DEFAULT_COLUMNS,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" bg-surface-inverse/80 rounded-t-lg  ">
      <Container size="full" padding="sm" className="md:pb-space-2">
        <Grid columns={1} className="sm:grid-cols-5 lg:grid-cols-7 ">
          <GridItem className="sm:col-span-3">
            <GridItem>
              {/*  Logo + school name + motto */}
              <VStack align="center" className="mb-space-4">
                <Container
                  size="full"
                  padding="md"
                  className=" w-size-60 md:w-size-68 lg:w-size-92"
                >
                  <SchoolLogo />
                </Container>
                <Heading level="h4" color="gold" className="text-center">
                  C.W.W. Kannangara Central College
                </Heading>
                <Text className="text-center" color="inverse">
                  "Wisdom is All Wealth"
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
                    {CONTACT_LINES.map((item) => (
                      <li key={item.label}>
                        {item.isLink ? (
                          <a href={item.href}>
                            <Text
                              variant="body-sm"
                              color="inverse"
                              className="hover:text-gold-base transition-colors duration-fast"
                            >
                              {item.label}
                            </Text>
                          </a>
                        ) : (
                          <Text variant="body-sm" color="inverse">
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
                            color="inverse"
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
                    {link.icon}
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
            © {currentYear} C.W.W. Kannangara Central College. All rights
            reserved.
          </Text>

          <HStack spacing={1} justify="between">
            <NavLink href="/privacy-policy">
              <Text variant="caption">Privacy Policy</Text>
            </NavLink>
            <Text className="px-space-2">·</Text>
            <NavLink href="/terms">
              <Text variant="caption">Terms</Text>
            </NavLink>
            <Text className="px-space-2">·</Text>
            <NavLink href="/societies/kits">
              <Text variant="caption">
                Built by
                <span className="text-gold-base hover:text-gold-light">
                  &nbsp; KITS
                </span>
              </Text>
            </NavLink>
          </HStack>
        </VStack>
      </Container>
    </footer>
  );
}
