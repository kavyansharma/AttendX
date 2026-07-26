-- AttendX Database Migration: Phase 3B Attendance Engine
-- Migration File: 20260726000004_phase3_attendance_engine.sql

-- 1. ADD 'not_marked' TO attendance_status ENUM IF NOT EXISTS
DO $$ BEGIN
    ALTER TYPE attendance_status ADD VALUE 'not_marked';
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. ENHANCE ATTENDANCE_SESSIONS TABLE
ALTER TABLE attendance_sessions 
ADD COLUMN IF NOT EXISTS timetable_id UUID REFERENCES timetables(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS session_status VARCHAR(50) DEFAULT 'IN_PROGRESS';

-- 3. INDEXES FOR FAST SESSION & ROSTER LOOKUPS
CREATE INDEX IF NOT EXISTS idx_attendance_sessions_timetable_date 
ON attendance_sessions(teacher_id, timetable_id, session_date);

CREATE INDEX IF NOT EXISTS idx_attendance_records_session_status 
ON attendance_records(session_id, status);

-- 4. ENHANCED RLS POLICIES FOR ATTENDANCE SESSIONS & RECORDS
-- Prevent editing submitted sessions
CREATE OR REPLACE FUNCTION is_session_editable(p_session_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM attendance_sessions
    WHERE id = p_session_id
      AND is_submitted = FALSE
      AND teacher_id = get_current_teacher_id()
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Update RLS for attendance_records modification
DROP POLICY IF EXISTS "Teachers manage records for assigned sessions" ON attendance_records;

CREATE POLICY "Teachers insert records for active sessions" ON attendance_records
    FOR INSERT WITH CHECK (
        is_session_editable(session_id)
    );

CREATE POLICY "Teachers update records for active sessions" ON attendance_records
    FOR UPDATE USING (
        is_session_editable(session_id)
    );

CREATE POLICY "Teachers view records for assigned sessions" ON attendance_records
    FOR SELECT USING (
        session_id IN (SELECT id FROM attendance_sessions WHERE teacher_id = get_current_teacher_id())
        OR get_current_user_role() IN ('super_admin', 'college_admin')
    );

-- 5. TRANSACTIONAL SUBMIT ATTENDANCE FUNCTION
CREATE OR REPLACE FUNCTION submit_attendance_session(
    p_session_id UUID,
    p_teacher_id UUID
)
RETURNS TABLE (
    success BOOLEAN,
    message TEXT,
    submitted_at TIMESTAMPTZ
) AS $$
DECLARE
    v_session RECORD;
    v_now TIMESTAMPTZ := NOW();
BEGIN
    -- Verify session exists and belongs to teacher
    SELECT * INTO v_session
    FROM attendance_sessions
    WHERE id = p_session_id
      AND teacher_id = p_teacher_id;

    IF v_session.id IS NULL THEN
        RETURN QUERY SELECT FALSE, 'Session not found or user unauthorized.'::TEXT, NULL::TIMESTAMPTZ;
        RETURN;
    END IF;

    -- Verify session is not already submitted
    IF v_session.is_submitted THEN
        RETURN QUERY SELECT FALSE, 'Session is already submitted and locked.'::TEXT, v_session.submitted_at;
        RETURN;
    END IF;

    -- Update session status
    UPDATE attendance_sessions
    SET is_submitted = TRUE,
        submitted_at = v_now,
        session_status = 'SUBMITTED',
        updated_at = v_now
    WHERE id = p_session_id;

    -- Audit log entry
    INSERT INTO audit_logs (college_id, user_id, action, entity_name, entity_id, new_data)
    VALUES (
        v_session.college_id,
        auth.uid(),
        'SUBMIT_ATTENDANCE',
        'attendance_sessions',
        p_session_id,
        jsonb_build_object(
            'session_id', p_session_id,
            'teacher_id', p_teacher_id,
            'section_id', v_session.section_id,
            'subject_id', v_session.subject_id,
            'submitted_at', v_now
        )
    );

    RETURN QUERY SELECT TRUE, 'Attendance submitted successfully.'::TEXT, v_now;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
