-- AttendSync Database Seed Script
-- File: supabase/seed.sql

-- 1. SEED DEMO COLLEGE
INSERT INTO colleges (id, code, name, logo_url, address, contact_email)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'APEX-TECH',
    'Apex Institute of Technology',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=500',
    '123 University Drive, Tech City',
    'contact@apextech.edu'
) ON CONFLICT (code) DO NOTHING;

-- 2. SEED DEPARTMENT
INSERT INTO departments (id, college_id, code, name, head_of_department)
VALUES (
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'CSE',
    'Department of Computer Science & Engineering',
    'Dr. Aris Thorne'
) ON CONFLICT (college_id, code) DO NOTHING;

-- 3. SEED COURSE
INSERT INTO courses (id, department_id, code, name, duration_years, total_semesters)
VALUES (
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'BTECH-CSE',
    'Bachelor of Technology in Computer Science',
    4,
    8
) ON CONFLICT (department_id, code) DO NOTHING;

-- 4. SEED ACADEMIC YEAR
INSERT INTO academic_years (id, college_id, year_label, start_date, end_date, is_current)
VALUES (
    'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    '2025-2026',
    '2025-08-01',
    '2026-06-30',
    TRUE
) ON CONFLICT DO NOTHING;

-- 5. SEED SEMESTER
INSERT INTO semesters (id, course_id, academic_year_id, semester_number, name, start_date, end_date, is_active)
VALUES (
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'y1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    4,
    'Semester 4 (Spring 2026)',
    '2026-01-10',
    '2026-06-15',
    TRUE
) ON CONFLICT DO NOTHING;

-- 6. SEED BATCH
INSERT INTO batches (id, course_id, name, start_year, end_year)
VALUES (
    'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'Batch 2024-2028',
    2024,
    2028
) ON CONFLICT DO NOTHING;

-- 7. SEED SECTION
INSERT INTO sections (id, batch_id, semester_id, name, room_number)
VALUES (
    'sec1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'b1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'CSE-2A',
    'Lab Building - Room 304'
) ON CONFLICT DO NOTHING;

-- 8. SEED SUBJECTS
INSERT INTO subjects (id, department_id, course_id, semester_id, code, name, subject_type, min_attendance_percentage)
VALUES 
(
    'sub1c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'CS401',
    'Data Structures & Algorithms',
    'Theory',
    75.00
),
(
    'sub2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'CS402',
    'Database Management Systems',
    'Theory & Lab',
    75.00
),
(
    'sub3c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'CS403',
    'Operating Systems',
    'Theory',
    75.00
),
(
    'sub4c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'c1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    's1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'HU401',
    'Technical Communication Skills',
    'Theory',
    75.00
)
ON CONFLICT (course_id, semester_id, code) DO NOTHING;

-- 9. SEED DEFAULT ATTENDANCE RULES
INSERT INTO attendance_rules (college_id, department_id, min_percentage, warning_percentage, allow_self_correction, correction_window_days)
VALUES (
    'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    'd1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    75.00,
    80.00,
    TRUE,
    7
) ON CONFLICT DO NOTHING;
