import { InstrumentType } from './course';

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialty: InstrumentType[];
  experience: number;
  bio: string;
  education: string[];
  achievements: string[];
  rating: number;
  studentsCount: number;
}
