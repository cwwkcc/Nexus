import { Container, Heading, Text } from '@nexus/ui';

interface AdminPlaceholderProps {
  title: string;
  description?: string;
}

export function AdminPlaceholder({
  title,
  description = 'This admin module is under construction.',
}: AdminPlaceholderProps) {
  return (
    <Container size="lg" padding="lg">
      <Heading level="h1" className="mb-space-4">
        {title}
      </Heading>
      <Text color="muted">{description}</Text>
    </Container>
  );
}
