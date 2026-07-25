import { 
  Department, Course, AcademicYear, Semester, Batch, Section, 
  Subject, Teacher, Student, TeacherAssignment, AuditLog 
} from '../types/admin';

// Initial Mock Administrative State (Synchronized with seed data)
const mockDepartments: Department[] = [
  {
    id: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    code: 'CSE',
    name: 'Department of Computer Science & Engineering',
    headOfDepartment: 'Dr. Aris Thorne',
    createdAt: '2026-01-01',
  },
  {
    id: 'dept-mech-002',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    code: 'MECH',
    name: 'Department of Mechanical Engineering',
    headOfDepartment: 'Dr. Rajesh Sharma',
    createdAt: '2026-01-01',
  },
  {
    id: 'dept-ece-003',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    code: 'ECE',
    name: 'Department of Electronics & Communication',
    headOfDepartment: 'Dr. Neha Verma',
    createdAt: '2026-01-01',
  },
];

const mockCourses: Course[] = [
  {
    id: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    code: 'BTECH-CSE',
    name: 'B.Tech in Computer Science & Engineering',
    durationYears: 4,
    totalSemesters: 8,
    createdAt: '2026-01-01',
  },
  {
    id: 'course-mech-002',
    departmentId: 'dept-mech-002',
    departmentName: 'Mechanical Engineering',
    code: 'BTECH-MECH',
    name: 'B.Tech in Mechanical Engineering',
    durationYears: 4,
    totalSemesters: 8,
    createdAt: '2026-01-01',
  },
];

const mockAcademicYears: AcademicYear[] = [
  {
    id: 'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    yearLabel: '2025-2026',
    startDate: '2025-08-01',
    endDate: '2026-06-30',
    isCurrent: true,
  },
];

const mockSemesters: Semester[] = [
  {
    id: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseName: 'B.Tech CSE',
    academicYearId: 'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    yearLabel: '2025-2026',
    semesterNumber: 4,
    name: 'Semester 4 (Spring 2026)',
    startDate: '2026-01-10',
    endDate: '2026-06-15',
    isActive: true,
  },
];

const mockBatches: Batch[] = [
  {
    id: 'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseName: 'B.Tech CSE',
    name: 'Batch 2024-2028',
    startYear: 2024,
    endYear: 2028,
  },
];

const mockSections: Section[] = [
  {
    id: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    batchId: 'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    batchName: '2024-2028',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterName: 'Semester 4',
    name: 'CSE-2A',
    roomNumber: 'Lab 304',
  },
  {
    id: 'sec2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    batchId: 'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    batchName: '2024-2028',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterName: 'Semester 4',
    name: 'CSE-2B',
    roomNumber: 'Lab 305',
  },
];

const mockSubjects: Subject[] = [
  {
    id: 'sub1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    code: 'CS401',
    name: 'Data Structures & Algorithms',
    subjectType: 'Theory',
    totalCredits: 4,
    minAttendancePercentage: 75.0,
  },
  {
    id: 'sub2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    code: 'CS402',
    name: 'Database Management Systems',
    subjectType: 'Theory & Lab',
    totalCredits: 4,
    minAttendancePercentage: 75.0,
  },
  {
    id: 'sub3c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    code: 'CS403',
    name: 'Operating Systems',
    subjectType: 'Theory',
    totalCredits: 3,
    minAttendancePercentage: 75.0,
  },
  {
    id: 'sub4c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    courseId: 'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    semesterId: 's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    code: 'HU401',
    name: 'Technical Communication Skills',
    subjectType: 'Theory',
    totalCredits: 2,
    minAttendancePercentage: 75.0,
  },
];

const mockTeachers: Teacher[] = [
  {
    id: 'tch-001',
    userId: 'u-tch-001',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    employeeId: 'EMP-CSE-101',
    fullName: 'Dr. Aris Thorne',
    email: 'dr.thorne@apextech.edu',
    phone: '+91 98765 11111',
    qualification: 'Ph.D. in Computer Science',
    joiningDate: '2020-07-15',
    isActive: true,
  },
  {
    id: 'tch-002',
    userId: 'u-tch-002',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    employeeId: 'EMP-CSE-102',
    fullName: 'Dr. Kumar',
    email: 'dr.kumar@apextech.edu',
    phone: '+91 98765 22222',
    qualification: 'M.Tech, Ph.D.',
    joiningDate: '2021-08-01',
    isActive: true,
  },
  {
    id: 'tch-003',
    userId: 'u-tch-003',
    departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    departmentName: 'Computer Science',
    employeeId: 'EMP-CSE-103',
    fullName: 'Prof. Sarah Jenkins',
    email: 'sarah.j@apextech.edu',
    phone: '+91 98765 33333',
    qualification: 'M.Tech in Software Systems',
    joiningDate: '2022-01-10',
    isActive: true,
  },
];

const mockStudents: Student[] = [
  {
    id: 'std-042',
    userId: 'u-std-042',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    courseName: 'B.Tech CSE',
    batchName: '2024-2028',
    rollNumber: '2024-CSE-042',
    registrationNumber: 'REG-2024-0042',
    fullName: 'Rahul Verma',
    email: 'rahul.verma@apextech.edu',
    phone: '+91 98765 44444',
    admissionYear: 2024,
    guardianName: 'Sanjay Verma',
    guardianPhone: '+91 98765 44400',
    isActive: true,
  },
  {
    id: 'std-001',
    userId: 'u-std-001',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    courseName: 'B.Tech CSE',
    batchName: '2024-2028',
    rollNumber: '2024-CSE-001',
    registrationNumber: 'REG-2024-0001',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@apextech.edu',
    phone: '+91 98765 55555',
    admissionYear: 2024,
    isActive: true,
  },
  {
    id: 'std-002',
    userId: 'u-std-002',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    courseName: 'B.Tech CSE',
    batchName: '2024-2028',
    rollNumber: '2024-CSE-002',
    registrationNumber: 'REG-2024-0002',
    fullName: 'Ananya Gupta',
    email: 'ananya.gupta@apextech.edu',
    phone: '+91 98765 66666',
    admissionYear: 2024,
    isActive: true,
  },
  {
    id: 'std-003',
    userId: 'u-std-003',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    courseName: 'B.Tech CSE',
    batchName: '2024-2028',
    rollNumber: '2024-CSE-003',
    registrationNumber: 'REG-2024-0003',
    fullName: 'Devansh Patel',
    email: 'devansh.patel@apextech.edu',
    phone: '+91 98765 77777',
    admissionYear: 2024,
    isActive: true,
  },
];

const mockAssignments: TeacherAssignment[] = [
  {
    id: 'asg-001',
    teacherId: 'tch-001',
    teacherName: 'Dr. Aris Thorne',
    subjectId: 'sub1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    subjectName: 'Data Structures (CS401)',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    academicYearId: 'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    yearLabel: '2025-2026',
    isPrimary: true,
  },
  {
    id: 'asg-002',
    teacherId: 'tch-002',
    teacherName: 'Dr. Kumar',
    subjectId: 'sub2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    subjectName: 'Database Systems (CS402)',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-2A',
    academicYearId: 'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    yearLabel: '2025-2026',
    isPrimary: true,
  },
];

const mockAuditLogs: AuditLog[] = [
  {
    id: 'log-001',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    userName: 'Admin (admin@apextech.edu)',
    action: 'CREATE',
    entityName: 'student_profiles',
    entityId: 'std-042',
    newData: { rollNumber: '2024-CSE-042', fullName: 'Rahul Verma' },
    ipAddress: '192.168.1.100',
    createdAt: '2026-07-25 10:15:32',
  },
  {
    id: 'log-002',
    collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    userName: 'Admin (admin@apextech.edu)',
    action: 'CREATE',
    entityName: 'teacher_subject_assignments',
    entityId: 'asg-002',
    newData: { teacher: 'Dr. Kumar', subject: 'CS402', section: 'CSE-2A' },
    ipAddress: '192.168.1.100',
    createdAt: '2026-07-25 11:40:10',
  },
];

export class AdminService {
  // Departments
  static async getDepartments(): Promise<Department[]> {
    return [...mockDepartments];
  }
  static async createDepartment(dept: Partial<Department>): Promise<Department> {
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      code: dept.code || '',
      name: dept.name || '',
      headOfDepartment: dept.headOfDepartment || '',
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockDepartments.push(newDept);
    this.logAudit('CREATE', 'departments', newDept.id, newDept);
    return newDept;
  }

  // Courses
  static async getCourses(): Promise<Course[]> {
    return [...mockCourses];
  }
  static async createCourse(course: Partial<Course>): Promise<Course> {
    const dept = mockDepartments.find(d => d.id === course.departmentId);
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      departmentId: course.departmentId || '',
      departmentName: dept?.name || 'Department',
      code: course.code || '',
      name: course.name || '',
      durationYears: course.durationYears || 4,
      totalSemesters: course.totalSemesters || 8,
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockCourses.push(newCourse);
    this.logAudit('CREATE', 'courses', newCourse.id, newCourse);
    return newCourse;
  }

  // Academic Years
  static async getAcademicYears(): Promise<AcademicYear[]> {
    return [...mockAcademicYears];
  }

  // Semesters
  static async getSemesters(): Promise<Semester[]> {
    return [...mockSemesters];
  }

  // Batches
  static async getBatches(): Promise<Batch[]> {
    return [...mockBatches];
  }

  // Sections
  static async getSections(): Promise<Section[]> {
    return [...mockSections];
  }

  // Subjects
  static async getSubjects(): Promise<Subject[]> {
    return [...mockSubjects];
  }
  static async createSubject(sub: Partial<Subject>): Promise<Subject> {
    const newSub: Subject = {
      id: `sub-${Date.now()}`,
      departmentId: sub.departmentId || '',
      courseId: sub.courseId || '',
      semesterId: sub.semesterId || '',
      code: sub.code || '',
      name: sub.name || '',
      subjectType: sub.subjectType || 'Theory',
      totalCredits: sub.totalCredits || 3,
      minAttendancePercentage: sub.minAttendancePercentage || 75.0,
    };
    mockSubjects.push(newSub);
    this.logAudit('CREATE', 'subjects', newSub.id, newSub);
    return newSub;
  }

  // Teachers
  static async getTeachers(): Promise<Teacher[]> {
    return [...mockTeachers];
  }
  static async createTeacher(tch: Partial<Teacher>): Promise<Teacher> {
    const dept = mockDepartments.find(d => d.id === tch.departmentId);
    const newTch: Teacher = {
      id: `tch-${Date.now()}`,
      userId: `u-tch-${Date.now()}`,
      departmentId: tch.departmentId || '',
      departmentName: dept?.name || 'Computer Science',
      employeeId: tch.employeeId || `EMP-${Date.now()}`,
      fullName: tch.fullName || '',
      email: tch.email || '',
      phone: tch.phone || '',
      qualification: tch.qualification || 'M.Tech',
      joiningDate: new Date().toISOString().split('T')[0],
      isActive: true,
    };
    mockTeachers.push(newTch);
    this.logAudit('CREATE', 'teachers', newTch.id, newTch);
    return newTch;
  }

  // Students
  static async getStudents(): Promise<Student[]> {
    return [...mockStudents];
  }
  static async createStudent(std: Partial<Student>): Promise<Student> {
    const sec = mockSections.find(s => s.id === std.sectionId);
    const newStd: Student = {
      id: `std-${Date.now()}`,
      userId: `u-std-${Date.now()}`,
      sectionId: std.sectionId || mockSections[0].id,
      sectionName: sec?.name || 'CSE-2A',
      courseName: 'B.Tech CSE',
      batchName: '2024-2028',
      rollNumber: std.rollNumber || '',
      registrationNumber: std.registrationNumber || `REG-${Date.now()}`,
      fullName: std.fullName || '',
      email: std.email || '',
      phone: std.phone || '',
      admissionYear: std.admissionYear || 2024,
      isActive: true,
    };
    mockStudents.push(newStd);
    this.logAudit('CREATE', 'student_profiles', newStd.id, newStd);
    return newStd;
  }

  static async bulkInsertStudents(students: Partial<Student>[]): Promise<number> {
    let count = 0;
    for (const std of students) {
      await this.createStudent(std);
      count++;
    }
    return count;
  }

  // Teacher Subject Assignments
  static async getAssignments(): Promise<TeacherAssignment[]> {
    return [...mockAssignments];
  }
  static async createAssignment(asg: Partial<TeacherAssignment>): Promise<TeacherAssignment> {
    const tch = mockTeachers.find(t => t.id === asg.teacherId);
    const sub = mockSubjects.find(s => s.id === asg.subjectId);
    const sec = mockSections.find(s => s.id === asg.sectionId);
    const newAsg: TeacherAssignment = {
      id: `asg-${Date.now()}`,
      teacherId: asg.teacherId || '',
      teacherName: tch?.fullName || 'Faculty',
      subjectId: asg.subjectId || '',
      subjectName: sub?.name || 'Subject',
      sectionId: asg.sectionId || '',
      sectionName: sec?.name || 'Section',
      academicYearId: 'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      yearLabel: '2025-2026',
      isPrimary: true,
    };
    mockAssignments.push(newAsg);
    this.logAudit('CREATE', 'teacher_subject_assignments', newAsg.id, newAsg);
    return newAsg;
  }

  // Audit Logs
  static async getAuditLogs(): Promise<AuditLog[]> {
    return [...mockAuditLogs];
  }

  private static logAudit(action: 'CREATE' | 'UPDATE' | 'DELETE', entityName: string, entityId: string, data: any) {
    mockAuditLogs.unshift({
      id: `log-${Date.now()}`,
      collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      userName: 'Admin (admin@apextech.edu)',
      action,
      entityName,
      entityId,
      newData: data,
      ipAddress: '192.168.1.100',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    });
  }
}
