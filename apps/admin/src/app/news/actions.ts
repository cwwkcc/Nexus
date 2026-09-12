'use server';

// apps/admin/src/app/news/actions.ts
//
// Server actions for the News module. Called directly from client
// components (NewsListClient.tsx, NewsForm.tsx) as plain async functions —
// not bound to <form action={...}>, since the form's state (Tiptap JSON,
// locale, category, featured toggle) doesn't map cleanly onto FormData.
// Next.js supports calling a 'use server' export like a regular function
// from client code either way.
//
// Every action returns an ActionResult instead of throwing. A thrown error
// from a server action surfaces to the client as an opaque, unstyled
// Next.js error overlay/toast with no way to show it inline next to the
// field that caused it — returning {ok:false, error} instead lets the
// calling client component decide how to display it.

import { TRPCError } from '@trpc/server';
import { revalidatePath } from 'next/cache';

import type { NewsStatus } from '../../lib/entities/news.js';
import { getServerCaller } from '../../lib/server-caller.js';

export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export interface NewsArticleFormInput {
  locale: 'en' | 'si' | 'ta';
  slug: string;
  title: string;
  excerpt?: string | null;
  content: unknown;
  category: string;
  author?: string | null;
  status: NewsStatus;
  featured: boolean;
  imageUrl?: string | null;
  publishedAt?: string | null;
}

function messageFor(err: unknown): string {
  if (err instanceof TRPCError) {
    if (err.code === 'CONFLICT') return err.message;
    if (err.code === 'BAD_REQUEST') return err.message;
    if (err.code === 'UNAUTHORIZED' || err.code === 'FORBIDDEN') return "You don't have permission to do that.";
    return 'Something went wrong saving the article. Please try again.';
  }
  return 'Something went wrong saving the article. Please try again.';
}

export async function createNewsArticle(input: NewsArticleFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- input.content is validated server-side against TiptapNodeSchema; typing it precisely here would mean importing @tiptap/react's types into a server action file for no real benefit.
    const article = await caller.news.create(input as any);
    revalidatePath('/news');
    return { ok: true, data: { id: article.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function updateNewsArticle(id: string, input: NewsArticleFormInput): Promise<ActionResult<{ id: string }>> {
  try {
    const caller = await getServerCaller();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const article = await caller.news.update({ id, ...(input as any) });
    revalidatePath('/news');
    revalidatePath(`/news/${id}`);
    return { ok: true, data: { id: article.id } };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function setNewsArticleStatus(id: string, status: NewsStatus): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.news.setStatus({ id, status });
    revalidatePath('/news');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}

export async function bulkSetNewsArticleStatus(ids: string[], status: NewsStatus): Promise<ActionResult> {
  try {
    const caller = await getServerCaller();
    await caller.news.bulkSetStatus({ ids, status });
    revalidatePath('/news');
    return { ok: true, data: undefined };
  } catch (err) {
    return { ok: false, error: messageFor(err) };
  }
}
