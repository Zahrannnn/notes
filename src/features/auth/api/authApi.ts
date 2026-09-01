import { apiClient } from '@/lib/apiClient';
import type { LoginCredentials, LoginResponse } from '@/features/auth/types/authTypes';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return data;
}
