'use client';

// apps/admin/src/app/news/NewsForm.tsx
//
// Shared create/edit form (F-164). A client component because its state
// (Tiptap JSON, several selects, a toggle) doesn't map onto a plain HTML
// <form action> the way the content module's raw-JSON-textarea form does —
// there's real client state here, not just field values passed straight
// through to FormData.

import { NEWS_CATEGORIES, LOCALE_LABELS, SUPPORTED_LOCALES, type LocaleEnumData } from '@nexus/contracts';
import { Badge, Button, Input, Select, Textarea, Toggle } from '@nexus/ui';
import type { JSONContent } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createNewsArticle, updateNewsArticle, type NewsArticleFormInput } from './actions.js';
import { RichTextEditor } from '../../features/editor/RichTextEditor.js';
import { MediaLibraryPicker } from '../../features/media/MediaLibraryPicker.js';
import type { AdminMediaAsset } from '../../lib/entities/media.js';
import type { AdminNewsArticle, NewsCategory, NewsStatus } from '../../lib/entities/news.js';
import { slugify } from '../../lib/entities/news.js';

const categoryOptions = Object.entries(NEWS_CATEGORIES).map(([value, label]) => ({ value, label }));
const localeOptions = SUPPORTED_LOCALES.map((value) => ({ value, label: LOCALE_LABELS[value] }));
const statusOptions: Array<{ value: NewsStatus; label: string }> = [
  { value: 'draft', label: 'Draft' },
  { value: 'review', label: 'In Review' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const emptyDoc: JSONContent = { type: 'doc', content: [{ type: 'paragraph' }] };

interface NewsFormProps {
  mode: 'create' | 'edit';
  initial?: AdminNewsArticle;
}

export function NewsForm({ mode, initial }: NewsFormProps) {
  const router = useRouter();

  const [locale, setLocale] = useState<LocaleEnumData>(initial?.locale ?? 'en');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [content, setContent] = useState<JSONContent>((initial?.content as JSONContent | undefined) ?? emptyDoc);
  const [category, setCategory] = useState<NewsCategory>(initial?.category ?? 'general');
  const [author, setAuthor] = useState(initial?.author ?? '');
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '');
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [status, setStatus] = useState<NewsStatus>(initial?.status ?? 'draft');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSlugError(null);

    const normalizedSlug = slugify(slug);
    if (!normalizedSlug) {
      setSlugError('Slug is required.');
      return;
    }
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setSubmitting(true);

    const payload: NewsArticleFormInput = {
      locale,
      slug: normalizedSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || null,
      content,
      category,
      author: author.trim() || null,
      status,
      featured,
      imageUrl: imageUrl.trim() || null,
      publishedAt: status === 'published' ? (initial?.publishedAt ?? new Date().toISOString()) : null,
    };

    const result = mode === 'create' ? await createNewsArticle(payload) : await updateNewsArticle(initial!.id, payload);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    router.push('/news');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-8">
      {error && (
        <div role="alert" className="rounded-md border border-semantic-error-base bg-surface-elevated px-space-4 py-space-3 text-body text-semantic-error-base">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Select label="Locale" required options={localeOptions} value={locale} onChange={(e) => setLocale(e.target.value as LocaleEnumData)} disabled={mode === 'edit'} helperText={mode === 'edit' ? 'Locale cannot be changed after creation — create a separate article for another language instead.' : 'Which language this article is written in.'} />
        <Select label="Category" required options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value as NewsCategory)} />
      </div>

      <Input label="Title" required value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. Sports Day 2026 draws record crowd" />

      <Input
        label="Slug"
        required
        value={slug}
        error={slugError ?? undefined}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(e.target.value);
        }}
        helperText="Used in the article's URL — lowercase letters, numbers, and hyphens only."
      />

      <Textarea label="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} helperText="Short summary shown on the listing page and in link previews (up to 280 characters)." />

      {/* F-164 "SEO preview" — a read-only mockup of Title/Slug/Excerpt, not
          a separate data field: the real NewsArticle model dropped the old
          deprecated schema's `seo` override object in M3, so title/excerpt
          already *are* the meta title/description (see [slug]/page.tsx's
          generateMetadata) — nothing else to preview against. The domain
          below is a plain display string, not resolved from an env var —
          the admin app has no NEXT_PUBLIC_SITE_URL of its own the way the
          web app's clientEnv does, and this is illustrative only, never a
          real link. */}
      <div className="flex flex-col gap-space-1 rounded-md border border-border-default bg-surface-default p-space-4">
        <span className="font-body text-label uppercase tracking-label text-text-muted">Search preview</span>
        <span className="truncate font-body text-body text-semantic-info-base">{title.trim() ? `${title.trim()} — C.W.W. Kannangara Central College` : 'C.W.W. Kannangara Central College'}</span>
        <span className="font-body text-caption text-text-muted">
          cwwkcc.lk/{locale}/news/{slug ? slugify(slug) : 'your-slug-here'}
        </span>
        <span className="line-clamp-2 font-body text-caption text-text-muted">{excerpt.trim() || 'No excerpt yet — search engines will generate a snippet automatically instead.'}</span>
      </div>

      <div className="flex flex-col gap-space-2">
        <label className="font-body text-label uppercase tracking-label text-text-primary">
          Content
          <span className="ml-space-1 text-semantic-error-base" aria-hidden="true">
            *
          </span>
        </label>
        <RichTextEditor value={content} onChange={setContent} disabled={submitting} />
      </div>

      <div className="grid grid-cols-1 gap-space-6 md:grid-cols-2">
        <Input label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="e.g. Ms. Perera, ICT Society" helperText="Optional byline." />

        <div className="flex flex-col gap-space-2">
          <span className="font-body text-label uppercase tracking-label text-text-primary">Cover image</span>
          {imageUrl ? (
            <div className="flex items-center gap-space-4">
              <div className="relative h-space-16 w-space-16 shrink-0 overflow-hidden rounded-md border border-border-default">
                {/* eslint-disable-next-line @next/next/no-img-el -- imageUrl may still hold an arbitrary external URL saved before this field used the Media Library (it used to be a free-text URL input); next/image would throw for any host outside next.config's remotePatterns, which only covers R2. */}
                <img src={imageUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-space-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setImagePickerOpen(true)}>
                  Change image
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => setImageUrl('')}>
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Button type="button" variant="outline" onClick={() => setImagePickerOpen(true)}>
              Choose from Media Library
            </Button>
          )}
          <span className="font-body text-caption text-text-muted">Shown on the listing page and in link previews.</span>
        </div>
      </div>

      <MediaLibraryPicker
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(asset: AdminMediaAsset) => {
          setImageUrl(asset.url);
          setImagePickerOpen(false);
        }}
        folder="images"
        title="Choose cover image"
      />

      <div className="flex flex-wrap items-center gap-space-6">
        <Select label="Status" required options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value as NewsStatus)} className="w-full max-w-xs" />
        <Toggle label="Pin as featured article" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        {initial && <Badge variant="status" status={initial.status} />}
      </div>

      <div className="flex items-center gap-space-4 border-t border-border-default pt-space-6">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving…' : mode === 'create' ? 'Create article' : 'Save changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/news')} disabled={submitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
