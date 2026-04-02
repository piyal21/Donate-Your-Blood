import apiClient from './client';
import type { AuthResponse } from '../types/api';

export const authApi = {
  register: (data: Record<string, unknown>) =>
    apiClient.post('/auth/register/', data),

  login: (email: string, password: string) =>
    apiClient.post<AuthResponse>('/auth/login/', { email, password }),

  logout: (refresh: string) =>
    apiClient.post('/auth/logout/', { refresh }),

  refreshToken: (refresh: string) =>
    apiClient.post('/auth/token/refresh/', { refresh }),

  changePassword: (old_password: string, new_password: string) =>
    apiClient.post('/auth/password/change/', { old_password, new_password }),
};
