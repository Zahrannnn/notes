import { Link } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { SEO } from '@/components/common/SEO';

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-10">
      <SEO
        title="About"
        description="About notes.mzahran.tech — engineering notes by Mohamed Osama Zahran, in English and Arabic."
      />
      <h1 className="text-3xl font-bold text-slate-50">About</h1>
      <div className="mt-6 space-y-5 text-slate-300">
        <p>
          This is the engineering notebook of <strong>Mohamed Osama Zahran</strong> — full-stack
          engineer at RICOH Europe (CORELIA), working across React/Next.js, .NET, and applied AI.
        </p>
        <p>
          Posts are real debugging stories and build-in-public write-ups, each with the actual root
          cause and the actual fix — in <strong>English and Arabic</strong>. When I write a PR, the
          mechanism goes in the PR body; when it deserves a wider audience, it becomes a note here.
        </p>
        <p>
          The site itself follows the same rules I ship at work: feature-first structure, typed
          content with build-time validation, accessible components, and{' '}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-sky-300">
            npm run verify
          </code>{' '}
          before anything is called done.
        </p>
        <p>
          Find me on{' '}
          <a className="text-sky-300 hover:underline" href="https://github.com/Zahrannnn">
            GitHub
          </a>
          ,{' '}
          <a
            className="text-sky-300 hover:underline"
            href="https://www.linkedin.com/in/zahran-numberone"
          >
            LinkedIn
          </a>
          , or the{' '}
          <Link className="text-sky-300 hover:underline" to={routes.home}>
            notes
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
