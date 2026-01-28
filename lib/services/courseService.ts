import { Course } from '@/types/course';
import coursesData from '@/data/courses.json';

export class CourseService {
  private courses: Course[] = coursesData as Course[];

  async getAllCourses(): Promise<Course[]> {
    return this.courses;
  }

  async getCourseById(id: string): Promise<Course | null> {
    const course = this.courses.find(c => c.id === id);
    return course || null;
  }

  async getCoursesByInstrument(instrument: string): Promise<Course[]> {
    return this.courses.filter(c => c.instrument === instrument);
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return this.courses.filter(c => c.level === level);
  }

  async searchCourses(keyword: string): Promise<Course[]> {
    const lowerKeyword = keyword.toLowerCase();
    return this.courses.filter(c => 
      c.title.toLowerCase().includes(lowerKeyword) ||
      c.description.toLowerCase().includes(lowerKeyword)
    );
  }

  async getFeaturedCourses(limit: number = 6): Promise<Course[]> {
    const sorted = [...this.courses].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, limit);
  }
}

export const courseService = new CourseService();
