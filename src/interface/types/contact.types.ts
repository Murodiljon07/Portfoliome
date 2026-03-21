export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface ContactListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Contact[];
}
