import type { AboutStoryData } from '@nexus/contracts';
import { VStack, Text, QuoteBlock, SectionHeader, Container } from '@nexus/ui';

export default function OurStory({ story }: { story: AboutStoryData }) {
  return (
    <Container
      size="full"
      padding="md"
      as="section"
      className="m-space-6 md:m-space-12 lg:m-space-16"
    >
      <VStack spacing={6}>
        <SectionHeader
          eyebrow={story.eyebrow}
          title={story.heading}
          titleEm={story.headingEm}
          withAccentRule
          headingLevel="h2"
          marginBottom="mb-space-6"
        />
        <Text variant="body" color="muted">
          {story.paragraph}
        </Text>
        {story.quote && (
          <QuoteBlock
            variant="pull-quote"
            quote={story.quote}
            attribution={story.quoteAuthor}
          />
        )}
      </VStack>
    </Container>
  );
}
