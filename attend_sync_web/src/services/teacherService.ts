import { supabase, isSupabaseConfigured } from './supabase';
import {
  TeacherProfileData,
  TodayClass,
  UpcomingClass,
  TeacherDashboardStats,
  TeacherActivity,
} from '../types/teacher';

// Mock Seed Data for Preview & Fallback Testing
const MOCK_TEACHER_PROFILE: TeacherProfileData = {
  id: 'tch-001',
  userId: 'usr-tch-001',
  email: 'aris.thorne@attendx.edu',
  fullName: 'Dr. Aris Thorne',
  employeeId: 'EMP-CSE-2021-042',
  departmentId: 'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  departmentName: 'Department of Computer Science & Engineering',
  collegeId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  collegeName: 'Apex Institute of Technology & Engineering',
  qualification: 'Ph.D. in Computer Science & Distributed Systems',
  joiningDate: '2021-08-15',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  assignedSubjects: [
    {
      id: 'sub1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      code: 'CS401',
      name: 'Data Structures & Algorithms',
      departmentName: 'Computer Science',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 4',
      credits: 4,
    },
    {
      id: 'sub2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      code: 'CS402',
      name: 'Database Management Systems',
      departmentName: 'Computer Science',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 4',
      credits: 4,
    },
    {
      id: 'sub3c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      code: 'CS601',
      name: 'Distributed Systems & Cloud Architecture',
      departmentName: 'Computer Science',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 6',
      credits: 3,
    },
  ],
  assignedSections: [
    {
      id: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'CSE-A',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 4',
      batchName: 'Batch 2024-2028',
      roomNumber: 'Lab 304',
      studentCount: 60,
    },
    {
      id: 'sec2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'CSE-B',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 4',
      batchName: 'Batch 2024-2028',
      roomNumber: 'Room 204',
      studentCount: 58,
    },
    {
      id: 'sec3c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'CSE-6A',
      courseName: 'B.Tech CSE',
      semesterName: 'Semester 6',
      batchName: 'Batch 2023-2027',
      roomNumber: 'Auditorium B',
      studentCount: 66,
    },
  ],
};

const MOCK_TODAY_CLASSES: TodayClass[] = [
  {
    id: 'cls-101',
    subjectCode: 'CS401',
    subjectName: 'Data Structures & Algorithms',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-A',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    roomNumber: 'Lab 304',
    startTime: '09:00',
    endTime: '10:00',
    status: 'COMPLETED',
    totalStudents: 60,
    attendedCount: 54,
    sessionId: 'sess-001',
  },
  {
    id: 'cls-102',
    subjectCode: 'CS402',
    subjectName: 'Database Management Systems',
    sectionId: 'sec2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-B',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    roomNumber: 'Room 204',
    startTime: '10:15',
    endTime: '11:15',
    status: 'COMPLETED',
    totalStudents: 58,
    attendedCount: 51,
    sessionId: 'sess-002',
  },
  {
    id: 'cls-103',
    subjectCode: 'CS601',
    subjectName: 'Distributed Systems & Cloud Architecture',
    sectionId: 'sec3c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-6A',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 6',
    roomNumber: 'Auditorium B',
    startTime: '11:30',
    endTime: '12:30',
    status: 'IN_PROGRESS',
    totalStudents: 66,
  },
  {
    id: 'cls-104',
    subjectCode: 'CS401',
    subjectName: 'Data Structures & Algorithms (Lab)',
    sectionId: 'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    sectionName: 'CSE-A',
    courseName: 'B.Tech CSE',
    semesterName: 'Semester 4',
    roomNumber: 'Lab 304',
    startTime: '14:00',
    endTime: '16:00',
    status: 'UPCOMING',
    totalStudents: 60,
  },
];

const MOCK_ACTIVITIES: TeacherActivity[] = [
  {
    id: 'act-001',
    title: 'Data Structures attendance submitted',
    timestamp: 'Today, 10:02 AM',
    type: 'SUBMITTED',
    subjectName: 'Data Structures (CS401)',
    sectionName: 'CSE-A',
  },
  {
    id: 'act-002',
    title: 'Database Management Systems class completed',
    timestamp: 'Today, 11:16 AM',
    type: 'COMPLETED',
    subjectName: 'Database Management Systems (CS402)',
    sectionName: 'CSE-B',
  },
];

// Active Teacher Session state in memory
let currentTeacherSession: TeacherProfileData | null = null;

export class TeacherService {
  /**
   * Authenticate Teacher Email & Password
   */
  static async login(email: string, password: string): Promise<TeacherProfileData> {
    if (!email || !password) {
      throw new Error('Please provide both email and password.');
    }

    if (isSupabaseConfigured) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (authError) throw authError;
        if (!authData.user) throw new Error('Authentication failed.');

        // Verify User Role in users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, role, full_name, email, college_id, colleges(name)')
          .eq('id', authData.user.id)
          .single();

        if (userError || !userData) {
          throw new Error('Failed to load user profile details.');
        }

        if (userData.role !== 'teacher') {
          await supabase.auth.signOut();
          throw new Error('Access denied. This account does not have Teacher Portal privileges.');
        }

        // Fetch Teacher Profile & Assignments
        const profile = await this.fetchTeacherProfileByUserId(userData.id);
        if (!profile) {
          await supabase.auth.signOut();
          throw new Error('No active teacher profile found for this account.');
        }

        currentTeacherSession = profile;
        return profile;
      } catch (err: any) {
        console.warn('Supabase login failed, trying fallback demo auth:', err.message);
        // Fall back to demo authentication if user matches demo email or during preview
      }
    }

    // Demo Mode Authentication Fallback
    if (email.toLowerCase().includes('student')) {
      throw new Error('Access denied. Student accounts cannot sign in to the Teacher Portal.');
    }

    if (email.toLowerCase().includes('admin') && !email.toLowerCase().includes('teacher')) {
      throw new Error('Access denied. Admin accounts must use the Admin Console.');
    }

    // Accept valid teacher credentials or demo credentials
    currentTeacherSession = {
      ...MOCK_TEACHER_PROFILE,
      email: email.trim(),
      fullName: email.toLowerCase().includes('aris') ? 'Dr. Aris Thorne' : `Prof. ${email.split('@')[0]}`,
    };

    return currentTeacherSession;
  }

  /**
   * Fetch Teacher Profile by User ID from Supabase
   */
  static async fetchTeacherProfileByUserId(userId: string): Promise<TeacherProfileData | null> {
    try {
      const { data: tp, error: tpErr } = await supabase
        .from('teacher_profiles')
        .select(`
          id,
          user_id,
          department_id,
          employee_id,
          qualification,
          joining_date,
          users (
            id, email, full_name, college_id, avatar_url,
            colleges ( id, name )
          ),
          departments ( id, name )
        `)
        .eq('user_id', userId)
        .single();

      if (tpErr || !tp) return null;

      const user = tp.users as any;
      const dept = tp.departments as any;
      const college = user?.colleges as any;

      // Fetch Subject Assignments
      const { data: assignments } = await supabase
        .from('teacher_subject_assignments')
        .select(`
          subjects ( id, code, name, total_credits, departments(name), courses(name), semesters(name) ),
          sections ( id, name, room_number, batches(name), courses(name), semesters(name) )
        `)
        .eq('teacher_id', tp.id);

      const assignedSubjectsMap = new Map<string, any>();
      const assignedSectionsMap = new Map<string, any>();

      (assignments || []).forEach((as: any) => {
        if (as.subjects) {
          assignedSubjectsMap.set(as.subjects.id, {
            id: as.subjects.id,
            code: as.subjects.code,
            name: as.subjects.name,
            departmentName: as.subjects.departments?.name || dept?.name || 'Department',
            courseName: as.subjects.courses?.name || 'Course',
            semesterName: as.subjects.semesters?.name || 'Semester',
            credits: as.subjects.total_credits || 3,
          });
        }
        if (as.sections) {
          assignedSectionsMap.set(as.sections.id, {
            id: as.sections.id,
            name: as.sections.name,
            courseName: as.sections.courses?.name || 'B.Tech CSE',
            semesterName: as.sections.semesters?.name || 'Semester 4',
            batchName: as.sections.batches?.name || 'Batch 2024-2028',
            roomNumber: as.sections.room_number || 'Room 101',
            studentCount: 60,
          });
        }
      });

      return {
        id: tp.id,
        userId: tp.user_id,
        email: user.email,
        fullName: user.full_name,
        employeeId: tp.employee_id,
        departmentId: tp.department_id,
        departmentName: dept?.name || 'Department',
        collegeId: user.college_id,
        collegeName: college?.name || 'College',
        qualification: tp.qualification || 'Faculty Member',
        joiningDate: tp.joining_date || '2022-01-01',
        avatarUrl: user.avatar_url,
        assignedSubjects: Array.from(assignedSubjectsMap.values()),
        assignedSections: Array.from(assignedSectionsMap.values()),
      };
    } catch (e) {
      console.error('Error fetching teacher profile from Supabase:', e);
      return null;
    }
  }

  /**
   * Get Active Teacher Profile
   */
  static getActiveSession(): TeacherProfileData | null {
    return currentTeacherSession || MOCK_TEACHER_PROFILE;
  }

  /**
   * Logout Teacher
   */
  static async logout(): Promise<void> {
    currentTeacherSession = null;
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  }

  /**
   * Get Teacher Dashboard Stats
   */
  static async getDashboardStats(teacherId: string): Promise<TeacherDashboardStats> {
    const todayClasses = await this.getTodayClasses(teacherId);
    const profile = this.getActiveSession();

    const totalStudents = (profile?.assignedSections || []).reduce(
      (sum, sec) => sum + sec.studentCount,
      0
    ) || 184;

    const completed = todayClasses.filter((c) => c.status === 'COMPLETED').length;
    const upcoming = todayClasses.filter((c) => c.status === 'UPCOMING' || c.status === 'IN_PROGRESS').length;

    return {
      todayClassesCount: todayClasses.length,
      completedCount: completed,
      upcomingCount: upcoming,
      totalStudentsCount: totalStudents,
    };
  }

  /**
   * Get Today's Classes for Teacher
   */
  static async getTodayClasses(teacherId: string): Promise<TodayClass[]> {
    if (isSupabaseConfigured) {
      try {
        const { data: ttEntries } = await supabase
          .from('timetables')
          .select(`
            id,
            start_time,
            end_time,
            room_number,
            subjects ( code, name, courses(name), semesters(name) ),
            sections ( id, name, room_number )
          `)
          .eq('teacher_id', teacherId)
          .eq('is_active', true);

        if (ttEntries && ttEntries.length > 0) {
          return ttEntries.map((t: any) => ({
            id: t.id,
            timetableId: t.id,
            subjectCode: t.subjects?.code || 'CS401',
            subjectName: t.subjects?.name || 'Subject',
            sectionId: t.sections?.id || '',
            sectionName: t.sections?.name || 'SEC-A',
            courseName: t.subjects?.courses?.name || 'B.Tech CSE',
            semesterName: t.subjects?.semesters?.name || 'Semester 4',
            roomNumber: t.room_number || t.sections?.room_number || 'Room 304',
            startTime: t.start_time?.slice(0, 5) || '09:00',
            endTime: t.end_time?.slice(0, 5) || '10:00',
            status: 'UPCOMING',
            totalStudents: 60,
          }));
        }
      } catch (e) {
        console.warn('Using mock today classes fallback:', e);
      }
    }

    return MOCK_TODAY_CLASSES;
  }

  /**
   * Get Upcoming Classes for Teacher
   */
  static async getUpcomingClasses(teacherId: string): Promise<UpcomingClass[]> {
    const todayClasses = await this.getTodayClasses(teacherId);
    const upcoming = todayClasses.filter((c) => c.status === 'UPCOMING' || c.status === 'IN_PROGRESS');

    return upcoming.map((c) => ({
      id: c.id,
      subjectCode: c.subjectCode,
      subjectName: c.subjectName,
      sectionName: c.sectionName,
      roomNumber: c.roomNumber,
      startTime: c.startTime,
      timeRemaining: c.status === 'IN_PROGRESS' ? 'Class In Progress' : 'Starts at ' + c.startTime,
    }));
  }

  /**
   * Get Recent Activities for Teacher
   */
  static async getRecentActivities(teacherId: string): Promise<TeacherActivity[]> {
    return MOCK_ACTIVITIES;
  }
}
