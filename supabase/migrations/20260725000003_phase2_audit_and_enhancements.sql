-- AttendX Database Audit & Enhancement Migration
-- Migration File: 20260725000003_phase2_audit_and_enhancements.sql

-- 1. TIMETABLE CONFLICT PREVENTION FUNCTION
CREATE OR REPLACE FUNCTION check_timetable_conflict(
    p_teacher_id UUID,
    p_section_id UUID,
    p_day day_of_week,
    p_start_time TIME,
    p_end_time TIME,
    p_exclude_id UUID DEFAULT NULL
)
RETURNS TABLE (
    has_conflict BOOLEAN,
    conflict_type VARCHAR(50),
    conflict_message TEXT
) AS $$
DECLARE
    v_teacher_conflict INT;
    v_section_conflict INT;
BEGIN
    -- Check if teacher has an overlapping class on the same day
    SELECT COUNT(*) INTO v_teacher_conflict
    FROM timetables
    WHERE teacher_id = p_teacher_id
      AND day = p_day
      AND is_active = TRUE
      AND (p_exclude_id IS NULL OR id != p_exclude_id)
      AND (
          (p_start_time >= start_time AND p_start_time < end_time) OR
          (p_end_time > start_time AND p_end_time <= end_time) OR
          (p_start_time <= start_time AND p_end_time >= end_time)
      );

    IF v_teacher_conflict > 0 THEN
        RETURN QUERY SELECT TRUE, 'TEACHER_OVERLAP'::VARCHAR, 'Teacher is already scheduled for another class during this time slot.'::TEXT;
        RETURN;
    END IF;

    -- Check if section has another class scheduled at the same time
    SELECT COUNT(*) INTO v_section_conflict
    FROM timetables
    WHERE section_id = p_section_id
      AND day = p_day
      AND is_active = TRUE
      AND (p_exclude_id IS NULL OR id != p_exclude_id)
      AND (
          (p_start_time >= start_time AND p_start_time < end_time) OR
          (p_end_time > start_time AND p_end_time <= end_time) OR
          (p_start_time <= start_time AND p_end_time >= end_time)
      );

    IF v_section_conflict > 0 THEN
        RETURN QUERY SELECT TRUE, 'SECTION_OVERLAP'::VARCHAR, 'Section already has a subject scheduled during this time slot.'::TEXT;
        RETURN;
    END IF;

    RETURN QUERY SELECT FALSE, 'NONE'::VARCHAR, 'No schedule conflict detected.'::TEXT;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 2. AUTOMATIC AUDIT LOGGING TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION audit_trigger_func()
RETURNS TRIGGER AS $$
DECLARE
    v_college_id UUID;
    v_user_id UUID;
BEGIN
    v_user_id := auth.uid();
    
    -- Extract college_id based on table structure
    IF (TG_TABLE_NAME = 'users' OR TG_TABLE_NAME = 'colleges') THEN
        v_college_id := COALESCE(NEW.college_id, OLD.college_id, NEW.id, OLD.id);
    ELSIF (TG_TABLE_NAME = 'departments') THEN
        v_college_id := COALESCE(NEW.college_id, OLD.college_id);
    ELSE
        SELECT college_id INTO v_college_id FROM users WHERE id = v_user_id;
    END IF;

    IF (TG_OP = 'INSERT') THEN
        INSERT INTO audit_logs (college_id, user_id, action, entity_name, entity_id, new_data)
        VALUES (v_college_id, v_user_id, 'CREATE', TG_TABLE_NAME, NEW.id, to_jsonb(NEW));
    ELSIF (TG_OP = 'UPDATE') THEN
        INSERT INTO audit_logs (college_id, user_id, action, entity_name, entity_id, old_data, new_data)
        VALUES (v_college_id, v_user_id, 'UPDATE', TG_TABLE_NAME, NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO audit_logs (college_id, user_id, action, entity_name, entity_id, old_data)
        VALUES (v_college_id, v_user_id, 'DELETE', TG_TABLE_NAME, OLD.id, to_jsonb(OLD));
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach triggers to critical administrative tables
DROP TRIGGER IF EXISTS audit_student_profiles ON student_profiles;
CREATE TRIGGER audit_student_profiles AFTER INSERT OR UPDATE OR DELETE ON student_profiles FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_teacher_profiles ON teacher_profiles;
CREATE TRIGGER audit_teacher_profiles AFTER INSERT OR UPDATE OR DELETE ON teacher_profiles FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_teacher_subject_assignments ON teacher_subject_assignments;
CREATE TRIGGER audit_teacher_subject_assignments AFTER INSERT OR UPDATE OR DELETE ON teacher_subject_assignments FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

DROP TRIGGER IF EXISTS audit_timetables ON timetables;
CREATE TRIGGER audit_timetables AFTER INSERT OR UPDATE OR DELETE ON timetables FOR EACH ROW EXECUTE FUNCTION audit_trigger_func();

-- 3. INDEX ENHANCEMENTS FOR FAST BULK LOOKUPS
CREATE INDEX IF NOT EXISTS idx_student_profiles_roll ON student_profiles(roll_number);
CREATE INDEX IF NOT EXISTS idx_teacher_profiles_emp ON teacher_profiles(employee_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_college_created ON audit_logs(college_id, created_at DESC);
