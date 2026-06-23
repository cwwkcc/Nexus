import { db } from '@nexus/db';
import { Button, Container, Heading, SectionHeader, Text, TextInput } from '@nexus/ui';

const defaultPage = 'about';
const defaultSections = [
  'about.hero',
  'about.story',
  'about.aboutKannangara',
  'about.timeline',
  'about.ethos',
  'about.values',
  'about.crest',
  'about.legacy',
  'about.anthem',
  'about.closing',
];

async function updateConfig(formData: FormData) {
  'use server';
  const sectionKey = formData.get('sectionKey')?.toString() ?? '';
  const enabled = formData.get('enabled') === 'on';
  const order = Number(formData.get('order')) || 0;
  await db.pageConfig.upsert({
    where: { page_sectionKey: { page: defaultPage, sectionKey } },
    create: { page: defaultPage, sectionKey, enabled, order },
    update: { enabled, order },
  });
}

async function ensureConfig() {
  const existing = await db.pageConfig.findMany({ where: { page: defaultPage } });
  if (existing.length > 0) return existing.sort((a, b) => a.order - b.order);
  const created = await Promise.all(
    defaultSections.map((sectionKey, index) =>
      db.pageConfig.create({
        data: {
          page: defaultPage,
          sectionKey,
          enabled: true,
          order: index,
        },
      }),
    ),
  );
  return created;
}

export default async function PageConfigAdmin() {
  const entries = await ensureConfig();

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Page Configuration"
        title="About page sections"
        description="Reorder and enable page sections for the About page."
      />
      <Text color="muted">
        Changes here are stored in the PageConfig table and control the page composition for the selected page.
      </Text>
      <div className="space-y-6">
        {entries.map((entry) => (
          <section key={entry.sectionKey} className="rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <Heading level="h4">{entry.sectionKey}</Heading>
              <Text color="muted">enabled: {entry.enabled ? 'yes' : 'no'}</Text>
            </div>
            <form action={updateConfig} className="grid gap-4 sm:grid-cols-[1.5fr_1fr_auto] items-end">
              <TextInput name="sectionKey" type="hidden" value={entry.sectionKey} />
              <label className="block">
                <Text as="span" className="block text-sm text-slate-400">
                  Order
                </Text>
                <TextInput
                  type="number"
                  name="order"
                  defaultValue={String(entry.order)}
                  className="mt-1 w-full rounded-2xl bg-slate-950 p-3 text-slate-100"
                />
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="enabled"
                  defaultChecked={entry.enabled}
                  className="h-5 w-5 rounded border-slate-700 bg-slate-800 text-slate-100"
                />
                <Text color="muted">Enabled</Text>
              </label>
              <Button type="submit">Save</Button>
            </form>
          </section>
        ))}
      </div>
    </Container>
  );
}
