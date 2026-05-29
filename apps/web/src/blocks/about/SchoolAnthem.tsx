import { useTranslations } from 'next-intl';
import { Container, SectionHeader, AudioPlayer, Text } from '@nexus/ui';

export default function AlumniLegacy() {
  const t = useTranslations('about.anthem');
  return (
    <Container size="md" padding="md" as="section" className="py-space-16">
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        align="center"
        withAccentRule
        className="mb-space-12"
      />
      <Text>{t('paragraph')}</Text>
      <AudioPlayer
        src={t('anthemSrc')}
        title={t('playerTitle')}
        subtitle={t('playerSubtitle')}
        lyrics={t('lyrics')}
        lyricsSinhala={t('lyrics')}
      />
    </Container>
  );
}
