export type NewsCategory =
  | 'academic'
  | 'sports'
  | 'arts'
  | 'community'
  | 'announcement'
  | 'achievement';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt?: string;
  category: NewsCategory | string;
  date: string; // ISO yyyy-mm-dd
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  readTime?: string;
  author?: string;
}
