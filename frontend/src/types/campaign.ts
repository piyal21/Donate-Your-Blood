import type { UserPublic } from './user';

export interface Campaign {
  id: number;
  user: UserPublic;
  name: string;
  organizer_name: string;
  contact_number: string;
  campaign_date: string;
  end_date: string | null;
  location: string;
  city: string;
  description: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CampaignForm {
  name: string;
  organizer_name: string;
  contact_number: string;
  campaign_date: string;
  end_date: string;
  location: string;
  city: string;
  description: string;
}
