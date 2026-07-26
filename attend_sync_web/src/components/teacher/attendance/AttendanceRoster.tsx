import React from 'react';
import { AttendanceStudentRow } from './AttendanceStudentRow';
import { StudentRosterItem, AttendanceRecordStatus } from '../../../types/teacher';
import { Users } from 'lucide-react';

interface AttendanceRosterProps {
  roster: StudentRosterItem[];
  onStatusChange: (studentId: string, status: AttendanceRecordStatus) => void;
  disabled?: boolean;
}

export const AttendanceRoster: React.FC<AttendanceRosterProps> = ({
  roster,
  onStatusChange,
  disabled = false,
}) => {
  if (!roster || roster.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
        <Users className="w-10 h-10 text-slate-300 mx-auto" />
        <div className="text-sm font-bold text-slate-700">No students found.</div>
        <p className="text-xs text-slate-400">
          Try clearing your search query or switching your status filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {roster.map((student) => (
        <AttendanceStudentRow
          key={student.studentId}
          student={student}
          onStatusChange={onStatusChange}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
