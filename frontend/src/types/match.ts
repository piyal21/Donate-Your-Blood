import type { UserPublic } from './user';
import type { BloodRequest } from './announcement';

export interface DonorMatch {
  id: number;
  blood_request: BloodRequest;
  donor: UserPublic;
  status: 'pending' | 'notified' | 'accepted' | 'declined' | 'expired';
  notified_at: string | null;
  responded_at: string | null;
  created_at: string;
}
