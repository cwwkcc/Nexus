import { Button, Container, FormFieldGroup, Input, SectionHeader, Select, Textarea } from '@nexus/ui';

import { AdminShell } from '@/features/shell/AdminShell';

export default function Page() {
  return (
    <AdminShell title="Edit article">
      <Container size="lg" padding="none" className="space-y-8">
        <SectionHeader eyebrow="News" title="Edit article" description="Update the article content, categories, and publication status." variant="eyebrow-title-description" />

        <form className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-slate-950/30">
          <FormFieldGroup>
            <Input label="Title" defaultValue="School wins district sports title" required />
            <Input label="Slug" defaultValue="school-wins-district-sports-title" required />
            <Input label="Excerpt" defaultValue="Students celebrated a memorable finish after a strong season across all major fixtures." />
            <Select
              label="Category"
              defaultValue="Sports"
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
              defaultValue="published"
              options={[
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
              ]}
            />
            <Textarea label="Content" rows={10} defaultValue="<p>Students celebrated a memorable finish after a strong season across all major fixtures.</p>" />
          </FormFieldGroup>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary">
              Save changes
            </Button>
            <Button type="button" variant="secondary">
              Save as draft
            </Button>
          </div>
        </form>
      </Container>
    </AdminShell>
  );
}
