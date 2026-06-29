import type { AboutAnthemData } from '@nexus/contracts';
import { Container, SectionHeader, AudioPlayer, Text } from '@nexus/ui';

export default function SchoolAnthem({ anthem }: { anthem: AboutAnthemData }) {
  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={anthem.eyebrow}
        title={anthem.heading}
        align="center"
        withAccentRule
        className="mb-space-12"
      />

      <Text className="mb-space-8 text-center max-w-prose mx-auto">
        {anthem.paragraph}
      </Text>

      <AudioPlayer
        src={anthem.anthemSrc}
        title={anthem.playerTitle}
        subtitle={anthem.playerSubtitle}
        lyricsSinhala={anthem.lyricsSinhala}
      />
    </Container>
  );
}
