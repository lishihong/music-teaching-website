export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  membershipLevel: 'basic' | 'premium' | 'vip';
  joinedDate: string;
  learningStats: {
    coursesCompleted: number;
    totalHours: number;
    certificates: number;
  };
}

export interface UserCourse {
  courseId: string;
  enrolledDate: string;
  progress: number;
  lastAccessedDate: string;
  completed: boolean;
}
