import React from 'react';
import { Check, X, Clock, Shield } from 'lucide-react';
import { AttendanceRecordStatus } from '../../../types/teacher';

interface AttendanceStatusSelectorProps {
  currentStatus: AttendanceRecordStatus;
  onStatusChange: (status: AttendanceRecordStatus) => void;
  disabled?: boolean;
}

export const AttendanceStatusSelector: React.FC<AttendanceStatusSelectorProps> = ({
  currentStatus,
  onStatusChange,
  disabled = false,
}) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80 shrink-0">
      {/* PRESENT */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onStatusChange('PRESENT')}
        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
          currentStatus === 'PRESENT'
            ? 'bg-[#10B981] text-white shadow-xs scale-[1.02]'
            : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <Check className="w-3.5 h-3.5" />
        <span>PRESENT</span>
      </button>

      {/* ABSENT */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onStatusChange('ABSENT')}
        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
          currentStatus === 'ABSENT'
            ? 'bg-rose-500 text-white shadow-xs scale-[1.02]'
            : 'text-slate-600 hover:text-rose-700 hover:bg-rose-50'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <X className="w-3.5 h-3.5" />
        <span>ABSENT</span>
      </button>

      {/* LATE */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onStatusChange('LATE')}
        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
          currentStatus === 'LATE'
            ? 'bg-[#F59E0B] text-white shadow-xs scale-[1.02]'
            : 'text-slate-600 hover:text-amber-700 hover:bg-amber-50'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <Clock className="w-3.5 h-3.5" />
        <span>LATE</span>
      </button>

      {/* EXCUSED */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onStatusChange('EXCUSED')}
        className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
          currentStatus === 'EXCUSED'
            ? 'bg-[#2563EB] text-white shadow-xs scale-[1.02]'
            : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <Shield className="w-3.5 h-3.5" />
        <span>EXCUSED</span>
      </button>
    </div>
  );
};
