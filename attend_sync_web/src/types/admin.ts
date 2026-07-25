export interface Department {
  id: string;
  collegeId: string;
  code: string;
  name: string;
  headOfDepartment: string;
  createdAt: string;
}

export interface Course {
  id: string;
  departmentId: string;
  departmentName?: string;
  code: string;
  name: string;
  durationYears: number;
  totalSemesters: number;
  createdAt: string;
}

export interface AcademicYear {
  id: string;
  collegeId: string;
  yearLabel: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface Semester {
  id: string;
  courseId: string;
  courseName?: string;
  academicYearId: string;
  yearLabel?: string;
  semesterNumber: number;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Batch {
  id: string;
  courseId: string;
  courseName?: string;
  name: string;
  startYear: number;
  endYear: number;
}

export interface Section {
  id: string;
  batchId: string;
  batchName?: string;
  semesterId: string;
  semesterName?: string;
  name: string;
  roomNumber: string;
}

export interface Subject {
  id: string;
  departmentId: string;
  courseId: string;
  semesterId: string;
  departmentName?: string;
  courseName?: string;
  semesterName?: string;
  code: string;
  name: string;
  subjectType: 'Theory' | 'Lab' | 'Elective' | 'Theory & Lab';
  totalCredits: number;
  minAttendancePercentage: number;
}

export interface Teacher {
  id: string;
  userId: string;
  departmentId: string;
  departmentName?: string;
  employeeId: string;
  fullName: string;
  email: string;
  phone?: string;
  qualification: string;
  joiningDate: string;
  isActive: boolean;
}

export interface Student {
  id: string;
  userId: string;
  sectionId: string;
  sectionName?: string;
  courseName?: string;
  batchName?: string;
  rollNumber: string;
  registrationNumber: string;
  fullName: string;
  email: string;
  phone?: string;
  admissionYear: number;
  guardianName?: string;
  guardianPhone?: string;
  isActive: boolean;
}

export interface TeacherAssignment {
  id: string;
  teacherId: string;
  teacherName?: string;
  subjectId: string;
  subjectName?: string;
  sectionId: string;
  sectionName?: string;
  academicYearId: string;
  yearLabel?: string;
  isPrimary: boolean;
}

export interface TimetableEntry {
  id: string;
  sectionId: string;
  sectionName?: string;
  subjectId: string;
  subjectName?: string;
  teacherId: string;
  teacherName?: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  startTime: string;
  endTime: string;
  roomNumber: string;
  isActive: boolean;
}

export interface AuditLog {
  id: string;
  collegeId: string;
  userId?: string;
  userName?: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entityName: string;
  entityId: string;
  oldData?: Record<string, any>;
  newData?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

export interface CSVStudentRow {
  student_id: string;
  name: string;
  email: string;
  department: string;
  course: string;
  batch: string;
  section: string;
  semester: string;
}

export interface CSVRowValidation {
  rowNumber: number;
  data: CSVStudentRow;
  isValid: boolean;
  errors: string[];
}
