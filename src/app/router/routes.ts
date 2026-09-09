export const routes = {
  home: '/',
  post: '/posts/:slug',
  tag: '/tags/:tag',
  about: '/about',
} as const;

export function postPath(slug: string) {
  return `/posts/${slug}`;
}

export function tagPath(tag: string) {
  return `/tags/${encodeURIComponent(tag.toLowerCase())}`;
}
