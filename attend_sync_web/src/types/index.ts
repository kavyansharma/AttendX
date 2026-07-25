export type UserRole = 'student' | 'teacher' | 'admin' | 'super_admin';

export interface SubjectAttendance {
  id: string;
  code: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
  minRequired: number;
  status: 'safe' | 'warning' | 'low';
}

export interface StudentDashboardData {
  studentName: string;
  rollNumber: string;
  course: string;
  section: string;
  overallPercentage: number;
  totalClassesAttended: number;
  totalClassesMissed: number;
  subjects: SubjectAttendance[];
  recentUpdate: {
    subject: string;
    teacher: string;
    status: string;
    timestamp: string;
  };
}

export interface DemoFormData {
  name: string;
  institutionName: string;
  email: string;
  phone: string;
  role: string;
  studentCount: string;
  message: string;
}
