export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'donor' | 'user';
  gender: string;
  date_of_birth: string | null;
  blood_group: string;
  address: string;
  city: string;
  contact_number: string;
  is_donor: boolean;
  is_available: boolean;
  created_at: string;
}

export interface UserPublic {
  id: number;
  first_name: string;
  last_name: string;
  blood_group: string;
  city: string;
  is_donor: boolean;
  is_available: boolean;
}
