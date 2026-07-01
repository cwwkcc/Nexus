'use client';
import {
  Container,
  SectionHeader,
  AlumniLegacyBlock,
} from '@nexus/ui';
import { useTranslations } from 'next-intl';

interface AlumniProfile {
  id: string;
  name: string;
  graduationYear: number | string;
  position: string;
  quote: string;
  portraitSrc?: string;
  portraitAlt?: string;
}

export default function AlumniLegacy() {
  const t = useTranslations('about.alumni');

  const profiles = t.raw('profiles')
    ? Object.values(t.raw('profiles') as Record<string, AlumniProfile>)
    : [];

  return (
    <Container size="lg" padding="md" as="section">
      <SectionHeader
        eyebrow={t('eyebrow')}
        title={t('heading')}
        align="center"
        withAccentRule
        className="mb-space-2"
      />
      <AlumniLegacyBlock alumni={profiles} />
    </Container>
  );
}
