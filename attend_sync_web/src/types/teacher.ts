export type ClassStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export interface AssignedSubject {
  id: string;
  code: string;
  name: string;
  departmentName: string;
  courseName: string;
  semesterName: string;
  credits: number;
}

export interface AssignedSection {
  id: string;
  name: string;
  courseName: string;
  semesterName: string;
  batchName: string;
  roomNumber: string;
  studentCount: number;
}

export interface TeacherProfileData {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  employeeId: string;
  departmentId: string;
  departmentName: string;
  collegeId: string;
  collegeName: string;
  qualification: string;
  joiningDate: string;
  avatarUrl?: string;
  assignedSubjects: AssignedSubject[];
  assignedSections: AssignedSection[];
}

export interface TodayClass {
  id: string;
  timetableId?: string;
  subjectCode: string;
  subjectName: string;
  sectionId: string;
  sectionName: string;
  courseName: string;
  semesterName: string;
  roomNumber: string;
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  status: ClassStatus;
  totalStudents: number;
  attendedCount?: number;
  sessionId?: string;
}

export interface UpcomingClass {
  id: string;
  subjectCode: string;
  subjectName: string;
  sectionName: string;
  roomNumber: string;
  startTime: string;
  timeRemaining: string; // e.g. "24 minutes"
}

export interface TeacherDashboardStats {
  todayClassesCount: number;
  completedCount: number;
  upcomingCount: number;
  totalStudentsCount: number;
}

export interface TeacherActivity {
  id: string;
  title: string;
  timestamp: string;
  type: 'SUBMITTED' | 'COMPLETED' | 'NOTICE';
  subjectName?: string;
  sectionName?: string;
}
