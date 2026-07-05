import type { FooterSocialLink, Locale } from '@nexus/contracts';
import {
  Container,
  Divider,
  Grid,
  GridItem,
  VStack,
  HStack,
  FacebookColor,
  InstagramGlyphGradient,
  YouTubeColor,
  GitHubInvertocatBlack,
  LinkedInColor,
  SchoolLogo,
  NavLink,
  Heading,
  Text,
} from '@nexus/ui';

import { getFooterContent } from '@/server/content/global';

type IconName = FooterSocialLink['icon'];

const ICON_MAP: Record<IconName, React.ReactNode> = {
  facebook: <FacebookColor />,
  instagram: <InstagramGlyphGradient />,
  youtube: <YouTubeColor />,
  github: <GitHubInvertocatBlack />,
  linkedin: <LinkedInColor />,
};

// ─── Minimal Fallback ──────────────────────────────────────────────────────

function MinimalFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-surface-base border-t border-border-light py-space-4">
      <Container size="full" padding="sm">
        <Text variant="caption" color="muted" className="text-center">
          © {year} C.W.W. Kannangara Central College
        </Text>
      </Container>
    </footer>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface FooterProps {
  locale: Locale;
}

export async function Footer({ locale }: FooterProps) {
  const data = await getFooterContent(locale);

  if (!data) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(
        'Footer content missing from database. Run `pnpm db:seed`.',
      );
    }
    return <MinimalFooter />;
  }

  const {
    schoolName,
    tagline,
    contact,
    columns,
    socialLinks = [],
    copyright,
    legalLinks = [],
  } = data;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-base rounded-t-lg">
      <Container size="full" padding="sm" className="md:pb-space-2">
        <Grid columns={1} className="sm:grid-cols-5 lg:grid-cols-7">
          <GridItem className="sm:col-span-3">
            <GridItem>
              <VStack align="center" className="mb-space-4">
                <Container
                  size="full"
                  padding="md"
                  className="w-full xl:w-size-pct-80"
                >
                  <SchoolLogo />
                </Container>
                <Heading level="h4" color="gold" className="text-center">
                  {schoolName}
                </Heading>
                {tagline && (
                  <Text className="text-center" color="primary">
                    {tagline}
                  </Text>
                )}
              </VStack>
            </GridItem>

            <GridItem alignSelf="center">
              <VStack spacing={3} align="center">
                <address>
                  <Heading
                    level="h6"
                    color="gold"
                    className="mb-space-3 text-center"
                  >
                    {contact.title}
                  </Heading>
                  <VStack as="ul" align="center" spacing={0}>
                    {contact.lines?.map((item) => (
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
            {columns.map((col) => (
              <GridItem
                key={col.id}
                alignSelf="center"
                className="lg:my-space-40"
              >
                <VStack spacing={3} align="center">
                  <Heading level="h6" color="gold" className="mt-space-3">
                    {col.heading}
                  </Heading>
                  <ul className="list-none flex flex-col items-center gap-space-1">
                    {col.links.map((link) => (
                      <li key={link.id}>
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
              <HStack justify="center" className="mb-space-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
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

        <Divider accentVariant="gold-accent" className="my-space-2" />

        <VStack wrap align="center" className="lg:flex-row lg:justify-between">
          <Text variant="caption" className="text-center">
            © {currentYear} {copyright}
          </Text>

          <HStack spacing={1} justify="between">
            {legalLinks.map((link, i) => (
              <HStack key={link.id} spacing={1}>
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
