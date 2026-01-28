import { Teacher } from '@/types/teacher';
import teachersData from '@/data/teachers.json';

export class TeacherService {
  private teachers: Teacher[] = teachersData as Teacher[];

  async getAllTeachers(): Promise<Teacher[]> {
    return this.teachers;
  }

  async getTeacherById(id: string): Promise<Teacher | null> {
    const teacher = this.teachers.find(t => t.id === id);
    return teacher || null;
  }

  async getFeaturedTeachers(limit: number = 4): Promise<Teacher[]> {
    const sorted = [...this.teachers].sort((a, b) => b.rating - a.rating);
    return sorted.slice(0, limit);
  }
}

export const teacherService = new TeacherService();
