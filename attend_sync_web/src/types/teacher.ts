export type ClassStatus = 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';

export type AttendanceRecordStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' | 'NOT_MARKED';

export type SessionStatus = 'DRAFT' | 'IN_PROGRESS' | 'SUBMITTED' | 'CANCELLED';

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
  subjectId?: string;
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

// PHASE 3B ATTENDANCE ENGINE TYPES
export interface StudentRosterItem {
  studentId: string;
  rollNumber: string;
  registrationNumber: string;
  fullName: string;
  avatarUrl?: string;
  status: AttendanceRecordStatus;
  recordId?: string;
  remarks?: string;
}

export interface AttendanceSessionDetails {
  id: string;
  collegeId: string;
  teacherId: string;
  teacherName: string;
  timetableId?: string;
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  sectionId: string;
  sectionName: string;
  courseName: string;
  semesterName: string;
  roomNumber: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  isSubmitted: boolean;
  submittedAt?: string;
  roster: StudentRosterItem[];
}

export interface AttendanceSummaryData {
  totalStudents: number;
  markedCount: number;
  notMarkedCount: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number; // percentage (0-100)
}
