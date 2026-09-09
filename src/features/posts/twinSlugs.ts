/**
 * Cross-link logic between EN/AR versions of the same post.
 * Heuristic twin matching: AR twin = same slug with `-ar` suffix.
 */
export function findTwinSlug(slug: string, allSlugs: string[]): string | undefined {
  const m = /^(.*)-ar$/.exec(slug);
  if (m) return allSlugs.find((s) => s === m[1]);
  const candidate = `${slug}-ar`;
  return allSlugs.includes(candidate) ? candidate : undefined;
}
