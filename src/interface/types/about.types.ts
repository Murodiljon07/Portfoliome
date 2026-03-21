export interface About {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  cv_link: string;
}

export interface AboutListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: About[];
}
