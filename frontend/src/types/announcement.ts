import type { UserPublic } from './user';

export interface BloodRequest {
  id: number;
  user: UserPublic;
  title: string;
  blood_type_needed: string;
  units_needed: number;
  urgency: 'normal' | 'urgent' | 'critical';
  status: 'open' | 'matched' | 'fulfilled' | 'expired' | 'cancelled';
  hospital_name: string;
  location: string;
  needed_date: string;
  details: string;
  contact_number: string;
  created_at: string;
  updated_at: string;
}

export interface BloodRequestForm {
  title: string;
  blood_type_needed: string;
  units_needed: number;
  urgency: string;
  hospital_name: string;
  location: string;
  needed_date: string;
  details: string;
  contact_number: string;
}
