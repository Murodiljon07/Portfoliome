export interface Experience {
  id: number;
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface ExperienceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Experience[];
}

export interface ExperienceFormData {
  role: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}
