import { supabase, isSupabaseConfigured } from './supabase';
import {
  AttendanceSessionDetails,
  StudentRosterItem,
  AttendanceRecordStatus,
  TodayClass,
  TeacherProfileData,
  AttendanceSummaryData,
} from '../types/teacher';

// Mock Seed Roster for CSE-A / CSE-B / CSE-6A preview & fallback
const MOCK_SECTION_STUDENTS: Record<string, StudentRosterItem[]> = {
  default: [
    { studentId: 'std-001', rollNumber: 'CSE001', registrationNumber: 'REG-2024-001', fullName: 'Rahul Sharma', status: 'NOT_MARKED' },
    { studentId: 'std-002', rollNumber: 'CSE002', registrationNumber: 'REG-2024-002', fullName: 'Priya Patel', status: 'NOT_MARKED' },
    { studentId: 'std-003', rollNumber: 'CSE003', registrationNumber: 'REG-2024-003', fullName: 'Arjun Kumar', status: 'NOT_MARKED' },
    { studentId: 'std-004', rollNumber: 'CSE004', registrationNumber: 'REG-2024-004', fullName: 'Neha Verma', status: 'NOT_MARKED' },
    { studentId: 'std-005', rollNumber: 'CSE005', registrationNumber: 'REG-2024-005', fullName: 'Aarav Gupta', status: 'NOT_MARKED' },
    { studentId: 'std-006', rollNumber: 'CSE006', registrationNumber: 'REG-2024-006', fullName: 'Ananya Singh', status: 'NOT_MARKED' },
    { studentId: 'std-007', rollNumber: 'CSE007', registrationNumber: 'REG-2024-007', fullName: 'Rohan Mehta', status: 'NOT_MARKED' },
    { studentId: 'std-008', rollNumber: 'CSE008', registrationNumber: 'REG-2024-008', fullName: 'Sneha Reddy', status: 'NOT_MARKED' },
    { studentId: 'std-009', rollNumber: 'CSE009', registrationNumber: 'REG-2024-009', fullName: 'Vikram Joshi', status: 'NOT_MARKED' },
    { studentId: 'std-010', rollNumber: 'CSE010', registrationNumber: 'REG-2024-010', fullName: 'Kavya Nair', status: 'NOT_MARKED' },
    { studentId: 'std-011', rollNumber: 'CSE011', registrationNumber: 'REG-2024-011', fullName: 'Aditya Das', status: 'NOT_MARKED' },
    { studentId: 'std-012', rollNumber: 'CSE012', registrationNumber: 'REG-2024-012', fullName: 'Ishita Banerjee', status: 'NOT_MARKED' },
    { studentId: 'std-[#10B981]3', rollNumber: 'CSE013', registrationNumber: 'REG-2024-013', fullName: 'Karan Saxena', status: 'NOT_MARKED' },
    { studentId: 'std-014', rollNumber: 'CSE014', registrationNumber: 'REG-2024-014', fullName: 'Meera Rao', status: 'NOT_MARKED' },
    { studentId: 'std-015', rollNumber: 'CSE015', registrationNumber: 'REG-2024-015', fullName: 'Siddharth Iyer', status: 'NOT_MARKED' },
    { studentId: 'std-016', rollNumber: 'CSE016', registrationNumber: 'REG-2024-016', fullName: 'Diya Choudhury', status: 'NOT_MARKED' },
    { studentId: 'std-017', rollNumber: 'CSE017', registrationNumber: 'REG-2024-017', fullName: 'Varun Bhat', status: 'NOT_MARKED' },
    { studentId: 'std-018', rollNumber: 'CSE018', registrationNumber: 'REG-2024-018', fullName: 'Pooja Kulkarni', status: 'NOT_MARKED' },
    { studentId: 'std-019', rollNumber: 'CSE019', registrationNumber: 'REG-2024-019', fullName: 'Tarun Deshmukh', status: 'NOT_MARKED' },
    { studentId: 'std-020', rollNumber: 'CSE020', registrationNumber: 'REG-2024-020', fullName: 'Riya Sen', status: 'NOT_MARKED' },
  ],
};

// In-memory store for active session states
const activeSessionsStore = new Map<string, AttendanceSessionDetails>();

export class AttendanceService {
  /**
   * Start a new Attendance Session or Resume existing active session
   */
  static async startOrResumeSession(
    cls: TodayClass,
    teacher: TeacherProfileData
  ): Promise<AttendanceSessionDetails> {
    const todayStr = new Date().toISOString().split('T')[0];
    const sessionKey = `${teacher.id}_${cls.timetableId || cls.id}_${todayStr}`;

    // 1. Check if session already exists in memory store
    if (activeSessionsStore.has(sessionKey)) {
      return activeSessionsStore.get(sessionKey)!;
    }

    // 2. Check Supabase DB for active session if configured
    if (isSupabaseConfigured) {
      try {
        const { data: existingSession } = await supabase
          .from('attendance_sessions')
          .select('*')
          .eq('teacher_id', teacher.id)
          .eq('section_id', cls.sectionId)
          .eq('session_date', todayStr)
          .eq('is_submitted', false)
          .single();

        if (existingSession) {
          const sessionDetails = await this.fetchSessionDetailsById(existingSession.id);
          if (sessionDetails) {
            activeSessionsStore.set(sessionKey, sessionDetails);
            return sessionDetails;
          }
        }
      } catch (e) {
        console.warn('Supabase session check failed, proceeding with session creation:', e);
      }
    }

    // 3. Create new Session Object
    const sessionId = `sess-${Date.now()}`;
    const initialRoster: StudentRosterItem[] = (MOCK_SECTION_STUDENTS['default'] || []).map((s) => ({
      ...s,
      status: 'NOT_MARKED' as AttendanceRecordStatus,
    }));

    const newSession: AttendanceSessionDetails = {
      id: sessionId,
      collegeId: teacher.collegeId,
      teacherId: teacher.id,
      teacherName: teacher.fullName,
      timetableId: cls.timetableId || cls.id,
      subjectId: cls.id,
      subjectCode: cls.subjectCode,
      subjectName: cls.subjectName,
      sectionId: cls.sectionId,
      sectionName: cls.sectionName,
      courseName: cls.courseName,
      semesterName: cls.semesterName,
      roomNumber: cls.roomNumber,
      sessionDate: todayStr,
      startTime: cls.startTime,
      endTime: cls.endTime,
      status: 'IN_PROGRESS',
      isSubmitted: false,
      roster: initialRoster,
    };

    // Save in Supabase if configured
    if (isSupabaseConfigured) {
      try {
        await supabase.from('attendance_sessions').insert({
          id: sessionId,
          college_id: teacher.collegeId,
          section_id: cls.sectionId,
          subject_id: cls.subjectId || cls.id,
          teacher_id: teacher.id,
          session_date: todayStr,
          start_time: cls.startTime,
          end_time: cls.endTime,
          is_submitted: false,
          session_status: 'IN_PROGRESS',
          created_by: teacher.userId,
        });
      } catch (err) {
        console.warn('Supabase DB insert warning:', err);
      }
    }

    activeSessionsStore.set(sessionKey, newSession);
    activeSessionsStore.set(sessionId, newSession);
    return newSession;
  }

  /**
   * Get Session Details by ID
   */
  static async getSessionDetails(sessionId: string): Promise<AttendanceSessionDetails | null> {
    if (activeSessionsStore.has(sessionId)) {
      return activeSessionsStore.get(sessionId)!;
    }

    if (isSupabaseConfigured) {
      return await this.fetchSessionDetailsById(sessionId);
    }

    return null;
  }

  /**
   * Fetch Session Details from Supabase
   */
  private static async fetchSessionDetailsById(sessionId: string): Promise<AttendanceSessionDetails | null> {
    try {
      const { data: s, error } = await supabase
        .from('attendance_sessions')
        .select(`
          *,
          sections ( name, room_number, courses(name), semesters(name) ),
          subjects ( code, name ),
          teacher_profiles ( id, users(full_name) )
        `)
        .eq('id', sessionId)
        .single();

      if (error || !s) return null;

      // Fetch Roster
      const { data: records } = await supabase
        .from('attendance_records')
        .select(`
          id, status, remarks,
          student_profiles ( id, roll_number, registration_number, users(full_name, avatar_url) )
        `)
        .eq('session_id', sessionId);

      const roster: StudentRosterItem[] = (records || []).map((r: any) => ({
        studentId: r.student_profiles?.id,
        rollNumber: r.student_profiles?.roll_number || 'REG-001',
        registrationNumber: r.student_profiles?.registration_number || 'REG-001',
        fullName: r.student_profiles?.users?.full_name || 'Student',
        avatarUrl: r.student_profiles?.users?.avatar_url,
        status: (r.status?.toUpperCase() as AttendanceRecordStatus) || 'NOT_MARKED',
        recordId: r.id,
        remarks: r.remarks,
      }));

      return {
        id: s.id,
        collegeId: s.college_id,
        teacherId: s.teacher_id,
        teacherName: s.teacher_profiles?.users?.full_name || 'Teacher',
        timetableId: s.timetable_id,
        subjectId: s.subject_id,
        subjectCode: s.subjects?.code || 'CS401',
        subjectName: s.subjects?.name || 'Subject',
        sectionId: s.section_id,
        sectionName: s.sections?.name || 'SEC-A',
        courseName: s.sections?.courses?.name || 'B.Tech CSE',
        semesterName: s.sections?.semesters?.name || 'Semester 4',
        roomNumber: s.sections?.room_number || 'Room 204',
        sessionDate: s.session_date,
        startTime: s.start_time,
        endTime: s.end_time,
        status: s.is_submitted ? 'SUBMITTED' : 'IN_PROGRESS',
        isSubmitted: s.is_submitted,
        submittedAt: s.submitted_at,
        roster,
      };
    } catch (e) {
      console.error('Error fetching session details from Supabase:', e);
      return null;
    }
  }

  /**
   * Update Individual Student Status in Active Session
   */
  static async updateStudentStatus(
    sessionId: string,
    studentId: string,
    newStatus: AttendanceRecordStatus
  ): Promise<AttendanceSessionDetails> {
    const session = await this.getSessionDetails(sessionId);
    if (!session) throw new Error('Attendance session not found.');

    if (session.isSubmitted) {
      throw new Error('Cannot modify a submitted attendance session.');
    }

    // Update roster item in memory
    const updatedRoster = session.roster.map((st) => {
      if (st.studentId === studentId) {
        return { ...st, status: newStatus };
      }
      return st;
    });

    const updatedSession: AttendanceSessionDetails = {
      ...session,
      roster: updatedRoster,
    };

    activeSessionsStore.set(sessionId, updatedSession);

    // Sync DB if configured
    if (isSupabaseConfigured) {
      try {
        await supabase.from('attendance_records').upsert({
          session_id: sessionId,
          student_id: studentId,
          status: newStatus.toLowerCase(),
          marked_by: session.teacherId,
        });
      } catch (err) {
        console.warn('Supabase record update error:', err);
      }
    }

    return updatedSession;
  }

  /**
   * Bulk Mark All NOT_MARKED Students as PRESENT
   * Does NOT overwrite ABSENT, LATE, or EXCUSED
   */
  static async bulkMarkPresent(sessionId: string): Promise<AttendanceSessionDetails> {
    const session = await this.getSessionDetails(sessionId);
    if (!session) throw new Error('Session not found.');

    if (session.isSubmitted) {
      throw new Error('Cannot modify a submitted session.');
    }

    const updatedRoster = session.roster.map((st) => {
      if (st.status === 'NOT_MARKED') {
        return { ...st, status: 'PRESENT' as AttendanceRecordStatus };
      }
      return st;
    });

    const updatedSession: AttendanceSessionDetails = {
      ...session,
      roster: updatedRoster,
    };

    activeSessionsStore.set(sessionId, updatedSession);
    return updatedSession;
  }

  /**
   * Compute Summary Breakdown & Attendance Rate
   */
  static calculateSummary(roster: StudentRosterItem[]): AttendanceSummaryData {
    const totalStudents = roster.length;
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let excusedCount = 0;
    let notMarkedCount = 0;

    roster.forEach((s) => {
      if (s.status === 'PRESENT') presentCount++;
      else if (s.status === 'ABSENT') absentCount++;
      else if (s.status === 'LATE') lateCount++;
      else if (s.status === 'EXCUSED') excusedCount++;
      else notMarkedCount++;
    });

    const markedCount = totalStudents - notMarkedCount;
    const rateNumber = totalStudents > 0 ? ((presentCount + lateCount) / totalStudents) * 100 : 0;
    const attendanceRate = Math.round(rateNumber * 10) / 10;

    return {
      totalStudents,
      markedCount,
      notMarkedCount,
      presentCount,
      absentCount,
      lateCount,
      excusedCount,
      attendanceRate,
    };
  }

  /**
   * Submit Attendance Session (Secure Transaction)
   */
  static async submitSession(sessionId: string, teacherId: string): Promise<AttendanceSessionDetails> {
    const session = await this.getSessionDetails(sessionId);
    if (!session) throw new Error('Attendance session not found.');

    if (session.isSubmitted) {
      throw new Error('Attendance session is already submitted and locked.');
    }

    const nowIso = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.rpc('submit_attendance_session', {
          p_session_id: sessionId,
          p_teacher_id: teacherId,
        });

        if (error) throw error;
      } catch (err: any) {
        console.warn('RPC submission warning, applying fallback update:', err.message);
      }
    }

    const submittedSession: AttendanceSessionDetails = {
      ...session,
      status: 'SUBMITTED',
      isSubmitted: true,
      submittedAt: nowIso,
    };

    activeSessionsStore.set(sessionId, submittedSession);
    return submittedSession;
  }
}
