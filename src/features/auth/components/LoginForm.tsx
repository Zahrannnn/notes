import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Alert } from '@/components/feedback/Alert';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { loginSchema } from '@/features/auth/schemas/loginSchema';
import { useLoginMutation } from '@/features/auth/hooks/useLoginMutation';
import type { LoginFormValues } from '@/features/auth/schemas/loginSchema';

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form className="grid gap-5" onSubmit={handleSubmit((values) => loginMutation.mutate(values))}>
      {loginMutation.error ? <Alert variant="error">{loginMutation.error.message}</Alert> : null}
      <TextField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
