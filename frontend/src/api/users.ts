import apiClient from './client';
import type { User } from '../types/user';

export const userApi = {
  me: () =>
    apiClient.get<User>('/users/me/'),

  updateMe: (data: Partial<User>) =>
    apiClient.patch<User>('/users/me/', data),
};
