import React from 'react';
import { AttendanceStatusSelector } from './AttendanceStatusSelector';
import { StudentRosterItem, AttendanceRecordStatus } from '../../../types/teacher';

interface AttendanceStudentRowProps {
  student: StudentRosterItem;
  onStatusChange: (studentId: string, status: AttendanceRecordStatus) => void;
  disabled?: boolean;
}

export const AttendanceStudentRow: React.FC<AttendanceStudentRowProps> = ({
  student,
  onStatusChange,
  disabled = false,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Student Info */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-full bg-slate-800 text-[#00B8D9] flex items-center justify-center font-bold text-sm shrink-0 border border-slate-700">
          {student.avatarUrl ? (
            <img src={student.avatarUrl} alt={student.fullName} className="w-full h-full object-cover rounded-full" />
          ) : (
            student.fullName?.[0] || 'S'
          )}
        </div>

        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-[#0F172A] truncate">
              {student.fullName}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-bold font-mono">
              {student.rollNumber}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Reg: {student.registrationNumber}
          </div>
        </div>
      </div>

      {/* Action Controls & Status Selector */}
      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
        <AttendanceStatusSelector
          currentStatus={student.status}
          onStatusChange={(newStatus) => onStatusChange(student.studentId, newStatus)}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
