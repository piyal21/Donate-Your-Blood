import apiClient from './client';
import type { BloodRequest, BloodRequestForm } from '../types/announcement';
import type { PaginatedResponse } from '../types/api';

export const bloodRequestApi = {
  list: (params?: Record<string, string>) =>
    apiClient.get<PaginatedResponse<BloodRequest>>('/blood-requests/', { params }),

  detail: (id: number) =>
    apiClient.get<BloodRequest>(`/blood-requests/${id}/`),

  create: (data: BloodRequestForm) =>
    apiClient.post<BloodRequest>('/blood-requests/', data),

  update: (id: number, data: Partial<BloodRequestForm>) =>
    apiClient.patch<BloodRequest>(`/blood-requests/${id}/`, data),

  delete: (id: number) =>
    apiClient.delete(`/blood-requests/${id}/`),

  my: () =>
    apiClient.get<PaginatedResponse<BloodRequest>>('/blood-requests/my/'),

  updateStatus: (id: number, status: string) =>
    apiClient.patch(`/blood-requests/${id}/status/`, { status }),

  findDonors: (id: number) =>
    apiClient.post(`/matches/find-donors/${id}/`),
};
