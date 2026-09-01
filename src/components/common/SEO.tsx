import { Helmet } from 'react-helmet-async';
import { env } from '@/config/env';

type SEOProps = {
  title: string;
  description?: string;
};

export function SEO({
  title,
  description = 'A production-ready Vite React TypeScript starter.',
}: SEOProps) {
  const fullTitle = `${title} | ${env.VITE_APP_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
