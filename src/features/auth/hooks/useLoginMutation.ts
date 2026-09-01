import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { routes } from '@/app/router/routes';
import { useAppDispatch } from '@/app/store/hooks';
import { login as loginRequest } from '@/features/auth/api/authApi';
import { setCredentials } from '@/features/auth/store/authSlice';
import type { LoginCredentials } from '@/features/auth/types/authTypes';

export function useLoginMutation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginRequest(credentials),
    onSuccess: (response) => {
      dispatch(setCredentials(response));
      toast.success(`Welcome back${response.user.name ? `, ${response.user.name}` : ''}!`);
      navigate(routes.dashboard);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
