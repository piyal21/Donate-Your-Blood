import apiClient from './client';
import type { DonorMatch } from '../types/match';
import type { PaginatedResponse } from '../types/api';

export const matchApi = {
  myMatches: () =>
    apiClient.get<PaginatedResponse<DonorMatch>>('/matches/'),

  detail: (id: number) =>
    apiClient.get<DonorMatch>(`/matches/${id}/`),

  accept: (id: number) =>
    apiClient.post<DonorMatch>(`/matches/${id}/accept/`),

  decline: (id: number) =>
    apiClient.post<DonorMatch>(`/matches/${id}/decline/`),

  byRequest: (requestId: number) =>
    apiClient.get<PaginatedResponse<DonorMatch>>(`/matches/by-request/${requestId}/`),
};
