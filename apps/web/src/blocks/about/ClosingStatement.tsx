import type { AboutClosingData } from '@nexus/contracts';
import { Container, Text, SectionHeader } from '@nexus/ui';

export default function ClosingStatement({
  closing,
}: {
  closing: AboutClosingData;
}) {
  return (
    <Container
      size="full"
      padding="lg"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <SectionHeader
        eyebrow={closing.eyebrow}
        title={closing.heading}
        align="center"
        withAccentRule
        className="mb-space-12"
      />
      <Text variant="body" color="primary" align="center">
        {closing.body}
      </Text>
      <Text
        variant="caption"
        color="muted"
        className="mt-space-2"
        align="center"
      >
        {closing.rule}
      </Text>
    </Container>
  );
}
