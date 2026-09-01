import { Link } from 'react-router-dom';
import { routes } from '@/app/router/routes';
import { PageTransition } from '@/components/common/PageTransition';
import { SEO } from '@/components/common/SEO';
import { Card, CardContent } from '@/components/ui/Card';
import { LoginForm } from '@/features/auth/components/LoginForm';

export function LoginPage() {
  return (
    <>
      <SEO title="Sign in" />
      <PageTransition>
        <Card>
          <CardContent>
            <Link
              to={routes.home}
              className="text-sm font-semibold text-brand-700 hover:underline dark:text-brand-100"
            >
              Back home
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-slate-950 dark:text-slate-50">Sign in</h1>
            <p className="mt-2 text-slate-700 dark:text-slate-300">
              Use your client API endpoint to authenticate.
            </p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </CardContent>
        </Card>
      </PageTransition>
    </>
  );
}
