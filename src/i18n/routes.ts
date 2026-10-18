import type { Lang } from '@types';

// Optional: map posts with different slugs in Arabic and English.
// Example: { ar: 'عنوان-المقال', en: 'post-title' }.
// Posts without a counterpart will link to the other language's blog index.
export const translatedPosts: Record<Lang, string>[] = [];
