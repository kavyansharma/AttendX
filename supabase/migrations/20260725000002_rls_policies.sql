-- AttendSync Database Row Level Security (RLS) Migration
-- Migration File: 20260725000002_rls_policies.sql

-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_subject_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE correction_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- SECURITY HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS user_role AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_current_user_college_id()
RETURNS UUID AS $$
  SELECT college_id FROM users WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_current_student_id()
RETURNS UUID AS $$
  SELECT id FROM student_profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_current_teacher_id()
RETURNS UUID AS $$
  SELECT id FROM teacher_profiles WHERE user_id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. COLLEGES POLICIES
CREATE POLICY "Super admins full access to colleges" ON colleges
    FOR ALL USING (get_current_user_role() = 'super_admin');

CREATE POLICY "Users read own college" ON colleges
    FOR SELECT USING (id = get_current_user_college_id());

-- 2. USERS POLICIES
CREATE POLICY "Admins manage college users" ON users
    FOR ALL USING (
        get_current_user_role() IN ('super_admin', 'college_admin') 
        AND college_id = get_current_user_college_id()
    );

CREATE POLICY "Users read self profile" ON users
    FOR SELECT USING (id = auth.uid());

-- 3. STUDENT PROFILES POLICIES
CREATE POLICY "Admins manage student profiles" ON student_profiles
    FOR ALL USING (
        get_current_user_role() IN ('super_admin', 'college_admin')
    );

CREATE POLICY "Students view self profile" ON student_profiles
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Teachers view assigned students" ON student_profiles
    FOR SELECT USING (
        get_current_user_role() = 'teacher' AND section_id IN (
            SELECT section_id FROM teacher_subject_assignments WHERE teacher_id = get_current_teacher_id()
        )
    );

-- 4. TEACHER PROFILES POLICIES
CREATE POLICY "Admins manage teacher profiles" ON teacher_profiles
    FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));

CREATE POLICY "Teachers view self profile" ON teacher_profiles
    FOR SELECT USING (user_id = auth.uid());

-- 5. ACADEMIC STRUCTURE (Departments, Courses, Years, Semesters, Batches, Sections, Subjects)
CREATE POLICY "Admins manage departments" ON departments FOR ALL USING (college_id = get_current_user_college_id() AND get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All college users view departments" ON departments FOR SELECT USING (college_id = get_current_user_college_id());

CREATE POLICY "Admins manage courses" ON courses FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view courses" ON courses FOR SELECT USING (true);

CREATE POLICY "Admins manage academic years" ON academic_years FOR ALL USING (college_id = get_current_user_college_id() AND get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view academic years" ON academic_years FOR SELECT USING (college_id = get_current_user_college_id());

CREATE POLICY "Admins manage semesters" ON semesters FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view semesters" ON semesters FOR SELECT USING (true);

CREATE POLICY "Admins manage batches" ON batches FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view batches" ON batches FOR SELECT USING (true);

CREATE POLICY "Admins manage sections" ON sections FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view sections" ON sections FOR SELECT USING (true);

CREATE POLICY "Admins manage subjects" ON subjects FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "All users view subjects" ON subjects FOR SELECT USING (true);

-- 6. TEACHER SUBJECT ASSIGNMENTS POLICIES
CREATE POLICY "Admins manage subject assignments" ON teacher_subject_assignments FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "Teachers view assigned subjects" ON teacher_subject_assignments FOR SELECT USING (teacher_id = get_current_teacher_id());

-- 7. TIMETABLES POLICIES
CREATE POLICY "Admins manage timetables" ON timetables FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "Students view own timetable" ON timetables FOR SELECT USING (
    section_id IN (SELECT section_id FROM student_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Teachers view assigned timetable" ON timetables FOR SELECT USING (
    teacher_id = get_current_teacher_id()
);

-- 8. ATTENDANCE SESSIONS POLICIES
CREATE POLICY "Admins manage attendance sessions" ON attendance_sessions FOR ALL USING (college_id = get_current_user_college_id() AND get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "Teachers manage own sessions" ON attendance_sessions FOR ALL USING (teacher_id = get_current_teacher_id());
CREATE POLICY "Students view own section sessions" ON attendance_sessions FOR SELECT USING (
    section_id IN (SELECT section_id FROM student_profiles WHERE user_id = auth.uid())
);

-- 9. ATTENDANCE RECORDS POLICIES
CREATE POLICY "Admins manage attendance records" ON attendance_records FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));
CREATE POLICY "Teachers manage records for assigned sessions" ON attendance_records FOR ALL USING (
    session_id IN (SELECT id FROM attendance_sessions WHERE teacher_id = get_current_teacher_id())
);
CREATE POLICY "Students view ONLY own attendance records" ON attendance_records FOR SELECT USING (
    student_id = get_current_student_id()
);

-- 10. CORRECTION REQUESTS POLICIES
CREATE POLICY "Students create and view own correction requests" ON correction_requests
    FOR ALL USING (student_id = get_current_student_id());

CREATE POLICY "Teachers review correction requests for assigned subjects" ON correction_requests
    FOR ALL USING (
        attendance_record_id IN (
            SELECT ar.id FROM attendance_records ar
            JOIN attendance_sessions s ON ar.session_id = s.id
            WHERE s.teacher_id = get_current_teacher_id()
        )
    );

CREATE POLICY "Admins manage all correction requests" ON correction_requests
    FOR ALL USING (get_current_user_role() IN ('super_admin', 'college_admin'));

-- 11. NOTIFICATIONS POLICIES
CREATE POLICY "Users read and update own notifications" ON notifications
    FOR ALL USING (user_id = auth.uid());

-- 12. AUDIT LOGS POLICIES
CREATE POLICY "Admins view college audit logs" ON audit_logs
    FOR SELECT USING (college_id = get_current_user_college_id() AND get_current_user_role() IN ('super_admin', 'college_admin'));
