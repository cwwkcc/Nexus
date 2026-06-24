import { createServerCaller } from '@nexus/api';
import { Button, Container, Heading, SectionHeader, Text, Textarea } from '@nexus/ui';
import { ABOUT_SECTION_SCHEMAS, LocaleSchema, type AboutSectionKey } from '@nexus/validation';

const defaultLocale = 'en' as const;

async function updateSection(formData: FormData) {
  'use server';
  const sectionKey = formData.get('sectionKey')?.toString() ?? '';
  const locale = (formData.get('locale')?.toString() ?? defaultLocale) as typeof defaultLocale;
  const rawData = formData.get('data')?.toString() ?? '{}';

  if (!sectionKey || !(sectionKey in ABOUT_SECTION_SCHEMAS)) {
    throw new Error('Invalid section key');
  }

  let parsedData;
  try {
    parsedData = JSON.parse(rawData);
  } catch (error) {
    throw new Error('Invalid JSON payload');
  }

  await createServerCaller().pageContent.update({
    page: 'about',
    sectionKey: sectionKey as AboutSectionKey,
    locale,
    data: parsedData,
  });
}

export default async function PageContentAdmin() {
  const caller = createServerCaller();
  const sections = await caller.pageContent.getByPage({ page: 'about', locale: defaultLocale });

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Page Content"
        title="About Page Sections"
        description="Edit the content stored in the database for the About page."
      />
      <Text color="muted">
        This interface edits the About page content directly. Each section is validated against the
        configured page content schema.
      </Text>

      <div className="space-y-8">
        {Object.entries(sections).map(([sectionKey, data]) => (
          <section key={sectionKey} className="rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Heading level="h3">{sectionKey}</Heading>
              <Text color="muted">locale: {defaultLocale}</Text>
            </div>
            <form action={updateSection} className="space-y-4">
              <input type="hidden" name="sectionKey" value={sectionKey} />
              <input type="hidden" name="locale" value={defaultLocale} />
              <Textarea
                name="data"
                defaultValue={JSON.stringify(data, null, 2)}
                rows={14}
                className="min-h-[320px] w-full rounded-3xl bg-slate-950 p-4 font-mono text-sm text-slate-100"
              />
              <Button type="submit">Save {sectionKey}</Button>
            </form>
          </section>
        ))}
      </div>
    </Container>
  );
}
