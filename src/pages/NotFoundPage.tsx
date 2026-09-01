import { Link } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { PageTransition } from '@/components/common/PageTransition';
import { SEO } from '@/components/common/SEO';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <SEO title="Page not found" />
      <PageTransition>
        <section className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            404
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950 dark:text-slate-50">
            Page not found
          </h1>
          <p className="mt-4 text-slate-700 dark:text-slate-300">
            The page you are looking for does not exist.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link to={routes.home}>Go home</Link>
            </Button>
          </div>
        </section>
      </PageTransition>
    </>
  );
}
