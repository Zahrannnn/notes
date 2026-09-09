import { Link } from 'react-router-dom';
import { postPath } from '@/app/router/routes';
import { findTwinSlug } from '../twinSlugs';

type LanguageToggleProps = {
  /** slug of the current post */
  slug: string;
  /** all known post slugs */
  allSlugs: string[];
  /** language of the CURRENT post */
  lang: 'en' | 'ar';
};

/**
 * Cross-link between EN/AR versions of the same post.
 * Renders nothing when no twin exists.
 */
export function LanguageToggle({ slug, allSlugs, lang }: LanguageToggleProps) {
  const twinSlug = findTwinSlug(slug, allSlugs);
  if (!twinSlug) return null;
  return (
    <Link
      to={postPath(twinSlug)}
      hrefLang={lang === 'en' ? 'ar' : 'en'}
      className="tag-pill"
      dir={lang === 'en' ? 'rtl' : 'ltr'}
    >
      {lang === 'en' ? 'اقرأها بالعربية' : 'Read in English'}
    </Link>
  );
}
