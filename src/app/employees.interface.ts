import { Project } from './projects.interface';

export interface Employee {
  id: number;
  name: string;
  company: string;
  birthday: Date;
  favoriteColor?: string;
  projectId?: number;
}
