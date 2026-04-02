import apiClient from './client';
import type { UserPublic } from '../types/user';
import type { PaginatedResponse } from '../types/api';

export const donorApi = {
  list: (params?: Record<string, string>) =>
    apiClient.get<PaginatedResponse<UserPublic>>('/donors/', { params }),

  detail: (id: number) =>
    apiClient.get<UserPublic>(`/donors/${id}/`),

  toggleAvailability: () =>
    apiClient.post('/donors/toggle-availability/'),

  stats: () =>
    apiClient.get('/donors/stats/'),
};
