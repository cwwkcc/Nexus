import { useTranslations } from 'next-intl';
import { Container, SectionHeader, AudioPlayer, Text } from '@nexus/ui';

export default function SchoolAnthem() {
  const t = useTranslations('about.anthem');

  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        align="center"
        withAccentRule
        className="mb-space-12"
      />

      {/* Added mb-space-8 to create separation between the intro text and the audio player UI */}
      <Text className="mb-space-8 text-center max-w-prose mx-auto">
        {t('paragraph')}
      </Text>

      <AudioPlayer
        src={t('anthemSrc')}
        title={t('playerTitle')}
        subtitle={t('playerSubtitle')}
        lyrics={t('lyrics')}
        lyricsSinhala={t('lyricsSinhala')}
      />
    </Container>
  );
}
