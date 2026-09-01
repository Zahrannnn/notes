import { SEO } from '@/components/common/SEO';
import { useAppSelector } from '@/app/store/hooks';
import { PageTransition } from '@/components/common/PageTransition';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function DashboardPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <SEO title="Dashboard" />
      <PageTransition>
        <Card>
          <CardContent>
            <Badge variant="secondary">Protected route</Badge>
            <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-slate-50">Dashboard</h1>
            <p className="mt-3 text-slate-700 dark:text-slate-300">
              Welcome{user?.name ? `, ${user.name}` : ''}. This page is protected by Redux auth
              state.
            </p>
          </CardContent>
        </Card>
      </PageTransition>
    </>
  );
}
