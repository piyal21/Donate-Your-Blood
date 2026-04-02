import apiClient from './client';
import type { Campaign, CampaignForm } from '../types/campaign';
import type { PaginatedResponse } from '../types/api';

export const campaignApi = {
  list: (params?: Record<string, string>) =>
    apiClient.get<PaginatedResponse<Campaign>>('/campaigns/', { params }),

  detail: (id: number) =>
    apiClient.get<Campaign>(`/campaigns/${id}/`),

  create: (data: CampaignForm) =>
    apiClient.post<Campaign>('/campaigns/', data),

  update: (id: number, data: Partial<CampaignForm>) =>
    apiClient.patch<Campaign>(`/campaigns/${id}/`, data),

  delete: (id: number) =>
    apiClient.delete(`/campaigns/${id}/`),

  my: () =>
    apiClient.get<PaginatedResponse<Campaign>>('/campaigns/my/'),

  upcoming: () =>
    apiClient.get<PaginatedResponse<Campaign>>('/campaigns/upcoming/'),
};
