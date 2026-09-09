export type PostFrontmatter = {
  title: string;
  description: string;
  date: string; // ISO 8601
  tags: string[];
  lang?: 'en' | 'ar';
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTimeMinutes: number;
  Component: unknown; // lazy MDX/markdown component
};

export type PostMeta = Omit<Post, 'Component'>;
