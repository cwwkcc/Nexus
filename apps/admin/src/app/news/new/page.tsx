import { Button, Container, FormFieldGroup, Input, SectionHeader, Select, Textarea } from '@nexus/ui';

import { AdminShell } from '@/features/shell/AdminShell';

export default function Page() {
  return (
    <AdminShell title="New article">
      <Container size="lg" padding="none" className="space-y-8">
        <SectionHeader eyebrow="News" title="Create article" description="Add a new story, announcement, or feature update for the public website." variant="eyebrow-title-description" />

        <form className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
          <FormFieldGroup>
            <Input label="Title" name="title" placeholder="School wins district title" required />
            <Input label="Slug" name="slug" placeholder="school-wins-district-title" required />
            <Input label="Excerpt" name="excerpt" placeholder="A short summary for the listing and card views" />
            <Select
              label="Category"
              name="category"
              defaultValue="Academic"
              options={[
                { label: 'Academic', value: 'Academic' },
                { label: 'Sports', value: 'Sports' },
                { label: 'Events', value: 'Events' },
                { label: 'Achievements', value: 'Achievements' },
                { label: 'General', value: 'General' },
              ]}
            />
            <Select
              label="Status"
              name="status"
              defaultValue="draft"
              options={[
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ]}
            />
            <Textarea label="Content" name="content" rows={10} placeholder="Write the article body here…" />
          </FormFieldGroup>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary">
              Save draft
            </Button>
            <Button type="button" variant="secondary">
              Publish
            </Button>
          </div>
        </form>
      </Container>
    </AdminShell>
  );
}
