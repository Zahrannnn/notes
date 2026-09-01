import { Link } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function HomePage() {
  return (
    <>
      <SEO title="Home" />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            Vite React TypeScript
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-950 sm:text-5xl dark:text-slate-50">
            A practical starter for client projects.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Feature folders, typed state, validated forms, safe API defaults, accessible layouts,
            and testing tools are already wired together.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link to={routes.dashboard}>Open dashboard</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to={routes.about}>View architecture</Link>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Included defaults</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 text-slate-700 dark:text-slate-300">
              <li>Strict TypeScript with absolute imports.</li>
              <li>Redux Toolkit and TanStack Query providers.</li>
              <li>Accessible forms with React Hook Form and Zod.</li>
              <li>Testing with Vitest and Testing Library.</li>
              <li>Light and dark theme with no flash on load.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
