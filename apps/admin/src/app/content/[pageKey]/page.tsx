// apps/admin/src/app/content/[pageKey]/page.tsx
//
// Registry-driven page editor. Reads PAGE_REGISTRY for structure;
// calls contentEntry.adminGetByScope for stored content (all statuses).
//
// URL: /admin/content/about  → About page editor
//      /admin/content/home   → Home page editor (etc.)
//
// Each section card shows:
//   - Section label + description
//   - Status badge (draft / published / archived / empty)
//   - Version number
//   - JSON textarea (temporary — DynamicFormFields is Phase 2)
//   - Save as Draft | Publish buttons
//
// Cache invalidation: revalidatePath() is called after every save so the
// Next.js Data Cache for apps/web is busted immediately.

import { createServerCaller } from '@nexus/api';
import {
  Badge,
  Button,
  Container,
  Heading,
  SectionHeader,
  Text,
  Textarea,
} from '@nexus/ui';
import { PAGE_REGISTRY, getPageRegistry } from '@nexus/validation';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface PageEditorProps {
  params: Promise<{ pageKey: string }>;
  searchParams: Promise<{ locale?: string }>;
}

// ── Server actions ────────────────────────────────────────────────────────────

async function saveSection(formData: FormData) {
  'use server';

  const scope = formData.get('scope')?.toString() ?? '';
  const sectionKey = formData.get('sectionKey')?.toString() ?? '';
  const contentType = formData.get('contentType')?.toString() ?? '';
  const locale = (formData.get('locale')?.toString() ?? 'en') as
    | 'en'
    | 'si'
    | 'ta';
  const rawData = formData.get('data')?.toString() ?? '{}';
  const statusAction = formData.get('statusAction')?.toString() ?? 'draft';

  if (!scope || !sectionKey || !contentType) {
    throw new Error('Missing required fields: scope, sectionKey, contentType');
  }

  let parsedData: unknown;
  try {
    parsedData = JSON.parse(rawData);
  } catch {
    throw new Error('Invalid JSON payload — check for syntax errors.');
  }

  const caller = createServerCaller();

  await caller.contentEntry.update({
    scope,
    sectionKey,
    contentType,
    locale,
    data: parsedData,
    status: statusAction as 'draft' | 'published',
  });

  // Bust the public site's data cache for this page so changes are visible
  // immediately after publish (Next.js 15 on-demand revalidation).
  const pageKey = scope.replace('page:', '');
  revalidatePath(`/[locale]/${pageKey}`, 'page');
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PageEditorPage({
  params,
  searchParams,
}: PageEditorProps) {
  const { pageKey } = await params;
  const { locale: localeParam } = await searchParams;
  const locale = (
    ['en', 'si', 'ta'].includes(localeParam ?? '') ? localeParam! : 'en'
  ) as 'en' | 'si' | 'ta';

  const registry = getPageRegistry(pageKey);
  if (!registry) notFound();

  const caller = createServerCaller();
  const stored = await caller.contentEntry.adminGetByScope({
    scope: registry.scope,
    locale,
  });

  const localeLabels = { en: 'English', si: 'Sinhala', ta: 'Tamil' };

  return (
    <Container size="full" padding="lg" className="space-y-10">
      <SectionHeader
        eyebrow="Content Editor"
        title={registry.label}
        description={registry.description}
      />

      {/* Locale tabs */}
      <nav className="flex gap-2 border-b border-slate-800 pb-4">
        {(['en', 'si', 'ta'] as const).map((loc) => (
          <a
            key={loc}
            href={`?locale=${loc}`}
            className={[
              'rounded-lg px-4 py-2 text-sm font-medium transition',
              locale === loc
                ? 'bg-slate-700 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
            ].join(' ')}
          >
            {localeLabels[loc]}
          </a>
        ))}
      </nav>

      <div className="space-y-8">
        {registry.sections.map((section) => {
          const entry = stored[section.key];
          const status = entry?.status ?? 'empty';
          const version = entry?.version;
          const existingData = entry?.data;

          const statusColors: Record<string, string> = {
            published: 'bg-green-900/40 text-green-300 border-green-800',
            draft: 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
            archived: 'bg-slate-800 text-slate-400 border-slate-700',
            empty: 'bg-slate-800 text-slate-500 border-slate-700',
          };

          return (
            <section
              key={section.key}
              className="rounded-3xl bg-slate-900 p-6 shadow-lg shadow-slate-950/30"
            >
              {/* Section header */}
              <div className="mb-1 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Heading level="h3">{section.label}</Heading>
                  {section.description && (
                    <Text color="muted" className="mt-1 text-sm">
                      {section.description}
                    </Text>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={[
                      'rounded-full border px-3 py-0.5 text-xs font-medium',
                      statusColors[status] ?? statusColors.empty,
                    ].join(' ')}
                  >
                    {status}
                  </span>
                  {version !== undefined && (
                    <Text
                      as="span"
                      color="muted"
                      className="text-xs tabular-nums"
                    >
                      v{version}
                    </Text>
                  )}
                </div>
              </div>

              {/* Section meta */}
              <Text color="muted" className="mb-4 font-mono text-xs">
                {section.key} · {section.contentType} · {locale}
              </Text>

              {/* Edit form */}
              <form action={saveSection} className="space-y-4">
                <input type="hidden" name="scope" value={registry.scope} />
                <input type="hidden" name="sectionKey" value={section.key} />
                <input
                  type="hidden"
                  name="contentType"
                  value={section.contentType}
                />
                <input type="hidden" name="locale" value={locale} />

                <Textarea
                  name="data"
                  defaultValue={
                    existingData !== undefined
                      ? JSON.stringify(existingData, null, 2)
                      : ''
                  }
                  rows={14}
                  placeholder={`Paste JSON content for ${section.label}…`}
                  className="min-h-[280px] w-full rounded-2xl bg-slate-950 p-4 font-mono text-sm text-slate-100 placeholder:text-slate-600"
                />

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    name="statusAction"
                    value="draft"
                    variant="secondary"
                  >
                    Save as Draft
                  </Button>
                  <Button
                    type="submit"
                    name="statusAction"
                    value="published"
                    variant="primary"
                  >
                    Publish
                  </Button>
                </div>
              </form>
            </section>
          );
        })}
      </div>
    </Container>
  );
}

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return PAGE_REGISTRY.map((r) => ({ pageKey: r.page }));
}
