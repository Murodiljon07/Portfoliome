export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string;
  demo_link: string;
  repo_link: string;
  order: number;
}

export interface ProjectListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
}
