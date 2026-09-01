import { PageTransition } from '@/components/common/PageTransition';
import { SEO } from '@/components/common/SEO';

export function AboutPage() {
  return (
    <>
      <SEO title="About" description="Architecture notes for the starter template." />
      <PageTransition>
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-slate-50">
            Feature-based architecture
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-300">
            Shared app infrastructure lives in <code>src/app</code>, reusable UI lives in
            <code> src/components</code>, and domain behavior belongs under{' '}
            <code>src/features</code>. This keeps project growth predictable without adding
            framework ceremony.
          </p>
        </section>
      </PageTransition>
    </>
  );
}
