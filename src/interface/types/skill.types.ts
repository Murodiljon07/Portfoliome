export interface Skill {
  id: number;
  name: string;
  icon: string;
  percentage: number;
  order: number;
}

export interface SkillListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Skill[];
}
