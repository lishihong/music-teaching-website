export type InstrumentType = 'piano' | 'guitar' | 'violin' | 'drum';
export type LevelType = 'beginner' | 'intermediate' | 'advanced';

export interface Course {
  id: string;
  title: string;
  instrument: InstrumentType;
  level: LevelType;
  price: number;
  duration: number;
  teacherId: string;
  videoUrl: string;
  description: string;
  thumbnail: string;
  syllabus: string[];
  rating: number;
  studentsCount: number;
  features: string[];
}
