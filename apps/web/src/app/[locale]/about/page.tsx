'use client';

import { useTranslations } from 'next-intl';
import {
  Hero,
  StatsStrip,
  QuoteBlock,
  Timeline,
  SectionHeader,
  AlumniLegacyBlock,
  AudioPlayer,
  ImageFrame,
  CrestAnimation,
  Grid,
  GridItem,
  Container,
  VStack,
  Text,
  Heading,
  EyebrowLabel,
  Divider,
} from '@nexus/ui';

export default function AboutPage() {
  const t = useTranslations('about');

  // Safe fallbacks for missing arrays
  const milestones = t.raw('timeline.milestones') ?? [];
  const crestSymbols = t.raw('crest.symbols')
    ? Object.values(t.raw('crest.symbols'))
    : [];
  const values = t.raw('vmv.values') ? Object.values(t.raw('vmv.values')) : [];
  const stats = t.raw('stats') ?? [];
  const alumniProfiles = t.raw('alumni.profiles') ?? [];

  const kannangaraQuote =
    t('kannangara.quote') ||
    'Education is not a privilege of the few. It is the birthright of every child born in this country.';
  const anthemSrc = '/audio/anthem.mp3';
  const anthemLyrics = t('anthem.lyrics') || '';

  return (
    <main>
      <Hero
        variant="subpage"
        heading={t('hero.title')}
        subheading={t('hero.subtitle')}
        eyebrow={t('hero.eyebrow')}
        imageSrc="/images/about-hero.jpg"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <StatsStrip stats={stats} />

      {/* Founding narrative + Kannangara */}
      <Container size="lg" padding="md" as="section" className="py-space-16">
        <Grid columns={2} gap={12}>
          <GridItem>
            <VStack spacing={6}>
              <EyebrowLabel>{t('story.eyebrow')}</EyebrowLabel>
              <Heading level="h2">
                {t('story.heading')}{' '}
                <span className="text-gold-base">{t('story.headingEm')}</span>
              </Heading>
              <Text variant="body" color="muted">
                {t('story.p1')}
              </Text>
              <Text variant="body" color="muted">
                {t('story.p2')}
              </Text>
              <Text variant="body" color="muted">
                {t('story.p3')}
              </Text>
              <QuoteBlock
                variant="pull-quote"
                quote={t('story.quote')}
                attribution={t('story.quoteAuthor')}
              />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing={6}>
              <ImageFrame
                src="/images/kannangara-portrait.jpg"
                alt="Dr. C.W.W. Kannangara"
                aspectRatio="3/4"
                variant="featured"
                overlay="light"
              />
              <div>
                <EyebrowLabel>{t('kannangara.eyebrow')}</EyebrowLabel>
                <Heading level="h3">
                  {t('kannangara.heading1')}{' '}
                  <span className="text-gold-base">
                    {t('kannangara.heading2')}
                  </span>
                </Heading>
                <Text variant="label" color="gold">
                  {t('kannangara.role')}
                </Text>
                <Text variant="body" color="muted" className="mt-4">
                  {t('kannangara.p1')}
                </Text>
                <Text variant="body" color="muted" className="mt-4">
                  {t('kannangara.p2')}
                </Text>
                <Text variant="body" color="muted" className="mt-4">
                  {t('kannangara.p3')}
                </Text>
                <QuoteBlock
                  variant="ceremonial"
                  quote={kannangaraQuote}
                  attribution="— Dr. C.W.W. Kannangara"
                  className="mt-6"
                />
              </div>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Timeline */}
      <Container
        size="lg"
        padding="md"
        as="section"
        className="py-space-16 bg-surface-default"
      >
        <SectionHeader
          eyebrow={t('timeline.eyebrow')}
          title={t('timeline.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <Timeline events={milestones} />
        <Text variant="caption" color="muted" className="text-center mt-6">
          {t('timeline.hint')}
        </Text>
      </Container>

      {/* Vision, Mission, Values */}
      <Container size="lg" padding="md" as="section" className="py-space-16">
        <Grid columns={3} gap={12}>
          <GridItem>
            <VStack spacing={4}>
              <EyebrowLabel>{t('vmv.visionEyebrow')}</EyebrowLabel>
              <QuoteBlock variant="pull-quote" quote={t('vmv.visionText')} />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing={4}>
              <EyebrowLabel>{t('vmv.missionEyebrow')}</EyebrowLabel>
              <QuoteBlock variant="pull-quote" quote={t('vmv.missionText')} />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing={4}>
              <EyebrowLabel>Our Motto</EyebrowLabel>
              <div className="text-center">
                <Heading level="h3" className="text-gold-base">
                  {t('vmv.motto')}
                </Heading>
                <Text variant="caption" color="muted">
                  {t('vmv.mottoTranslation')}
                </Text>
              </div>
            </VStack>
          </GridItem>
        </Grid>

        <Divider accentVariant="gold-accent-short" className="my-space-16" />

        <SectionHeader
          eyebrow={t('vmv.valuesEyebrow')}
          title="Core Values"
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <Grid columns={4} gap={8}>
          {values.map((value) => (
            <GridItem key={value.english}>
              {' '}
              {/* ✅ added key */}
              <VStack spacing={3} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold-pale flex items-center justify-center mx-auto">
                  <span className="font-display text-gold-base text-2xl font-semibold">
                    {value.latin?.charAt(0) || value.english.charAt(0)}
                  </span>
                </div>
                <Heading level="h3">{value.english}</Heading>
                <Text variant="body-sm" color="muted">
                  {value.desc}
                </Text>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      </Container>

      {/* Crest explained */}
      <Container
        size="lg"
        padding="md"
        as="section"
        className="py-space-16 bg-surface-default"
      >
        <SectionHeader
          eyebrow={t('crest.eyebrow')}
          title={t('crest.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 flex justify-center">
            <CrestAnimation
              size="lg"
              animateOnMount={false}
              className="w-64 h-64"
            />
          </div>
          <div className="md:w-1/2">
            <Grid columns={2} gap={6}>
              {crestSymbols.map((symbol) => (
                <GridItem key={symbol.id}>
                  {' '}
                  {/* ✅ added key */}
                  <VStack spacing={2}>
                    <Heading level="h4" className="text-gold-base">
                      {symbol.name}
                    </Heading>
                    <Text variant="body-sm" color="muted">
                      {symbol.meaning}
                    </Text>
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </div>
        </div>
      </Container>

      {/* Alumni Legacy */}
      <Container size="lg" padding="md" as="section" className="py-space-16">
        <SectionHeader
          eyebrow="Generations of Excellence"
          title={t('alumni.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <AlumniLegacyBlock alumni={alumniProfiles} />{' '}
        {/* ✅ component handles keys internally */}
      </Container>

      {/* Spirit of Kannangara & Physical Heritage – static section, no keys needed */}
      <Container
        size="lg"
        padding="md"
        as="section"
        className="py-space-16 bg-surface-default"
      >
        <Grid columns={2} gap={12}>
          <GridItem>
            <VStack spacing={6}>
              <EyebrowLabel>Spirit of Kannangara</EyebrowLabel>
              <Heading level="h2">What it means to be a Kannangarian</Heading>
              <Text variant="body" color="muted">
                The spirit of Kannangara is not about academic achievement
                alone. It is about carrying the torch of free education, the
                belief that every child deserves a chance, and the obligation to
                give back. Kannangarians are found in every corner of Sri Lanka
                and the world – doctors, engineers, teachers, entrepreneurs –
                but they all share one thing: the understanding that wisdom is
                all wealth.
              </Text>
              <QuoteBlock
                variant="ceremonial"
                quote="Once a Kannangarian, always a Kannangarian."
                attribution="— School Proverb"
              />
            </VStack>
          </GridItem>
          <GridItem>
            <VStack spacing={6}>
              <EyebrowLabel>Physical Heritage</EyebrowLabel>
              <Heading level="h2">The Campus Through Time</Heading>
              <div className="grid grid-cols-2 gap-4">
                <ImageFrame
                  src="/images/heritage-1.jpg"
                  alt="Old building 1920s"
                  aspectRatio="4/3"
                />
                <ImageFrame
                  src="/images/heritage-2.jpg"
                  alt="School hall 1950s"
                  aspectRatio="4/3"
                />
                <ImageFrame
                  src="/images/heritage-3.jpg"
                  alt="Main building 2020s"
                  aspectRatio="4/3"
                  className="col-span-2"
                />
              </div>
              <Text variant="caption" color="muted" className="text-center">
                From vernacular school in 1873 to digital institution in 2026 –
                our campus has evolved, but our mission has not.
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* School Anthem */}
      <Container size="md" padding="md" as="section" className="py-space-16">
        <SectionHeader
          eyebrow={t('anthem.eyebrow')}
          title={t('anthem.heading')}
          align="center"
          withAccentRule
          className="mb-space-12"
        />
        <AudioPlayer
          src={anthemSrc}
          title={t('anthem.playerTitle')}
          subtitle={t('anthem.playerSubtitle')}
          lyrics={anthemLyrics}
          lyricsSinhala={anthemLyrics}
        />
      </Container>

      {/* Closing Statement */}
      <Container
        size="lg"
        padding="md"
        as="section"
        className="py-space-20 bg-green-base text-center"
      >
        <div className="max-w-2xl mx-auto">
          <CrestAnimation
            size="md"
            animateOnMount={false}
            className="mx-auto mb-8 opacity-80"
          />
          <Heading level="h2" color="inverse" className="mb-4">
            The light continues.
          </Heading>
          <Text variant="body" color="inverse" className="text-white/75">
            From 1873 to 2026 and beyond, C.W.W. Kannangara Central College
            remains what it has always been: a place where futures are built,
            character is forged, and excellence is not aspired to — it is
            expected.
          </Text>
          <Divider
            accentVariant="gold-accent-short"
            className="my-8 bg-gold-base/30"
          />
          <Text variant="caption" color="inverse" className="text-white/50">
            Wisdom is All Wealth · Truth, Courage, Discipline · Head, Heart,
            Hand
          </Text>
        </div>
      </Container>
    </main>
  );
}
