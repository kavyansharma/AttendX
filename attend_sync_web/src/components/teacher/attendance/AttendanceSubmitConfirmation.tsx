import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowLeft, Eye, Award } from 'lucide-react';
import { AttendanceSessionDetails, AttendanceSummaryData } from '../../../types/teacher';

interface AttendanceSubmitConfirmationProps {
  session: AttendanceSessionDetails;
  summary: AttendanceSummaryData;
  onBackToDashboard: () => void;
  onViewDetails: () => void;
}

export const AttendanceSubmitConfirmation: React.FC<AttendanceSubmitConfirmationProps> = ({
  session,
  summary,
  onBackToDashboard,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 max-w-2xl mx-auto space-y-8 text-center animate-in zoom-in-95 duration-200">
      {/* Success Animated Icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#10B981] flex items-center justify-center mx-auto shadow-md border-4 border-white">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#10B981] text-xs font-black uppercase tracking-wider border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>TRANSACTION SUBMITTED & LOCKED</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Attendance Submitted Successfully
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          Official attendance records have been securely written to PostgreSQL database.
        </p>
      </div>

      {/* Class Meta Box */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm font-bold text-[#0F172A]">
          <span>{session.subjectName} ({session.subjectCode})</span>
          <span>•</span>
          <span className="text-[#2563EB]">Section {session.sectionName}</span>
          <span>•</span>
          <span>{session.roomNumber}</span>
        </div>
        <div className="text-xs font-semibold text-slate-400">
          Session Date: {session.sessionDate} ({session.startTime} - {session.endTime})
        </div>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Total Students</div>
          <div className="text-2xl font-black text-[#0F172A]">{summary.totalStudents}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-emerald-600 uppercase">Present</div>
          <div className="text-2xl font-black text-[#10B981]">{summary.presentCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-rose-600 uppercase">Absent</div>
          <div className="text-2xl font-black text-rose-600">{summary.absentCount}</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[10px] font-bold text-amber-600 uppercase">Late</div>
          <div className="text-2xl font-black text-amber-600">{summary.lateCount}</div>
        </div>
      </div>

      {/* Attendance Rate Highlight Box */}
      <div className="bg-gradient-to-r from-[#0B1F3A] to-[#123B66] text-white p-5 rounded-2xl flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-[#00B8D9]" />
          <div className="text-left">
            <div className="text-xs font-bold text-[#00B8D9] uppercase">Final Attendance Rate</div>
            <div className="text-xs text-slate-300">Minimum threshold: 75%</div>
          </div>
        </div>
        <div className="text-3xl font-black text-white">{summary.attendanceRate}%</div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={onBackToDashboard}
          className="w-full sm:w-auto btn btn-primary py-3.5 px-6 text-xs font-bold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-md flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4 text-[#00B8D9]" />
          <span>Back to Dashboard</span>
        </button>

        <button
          onClick={onViewDetails}
          className="w-full sm:w-auto btn btn-secondary py-3.5 px-6 text-xs font-bold text-slate-700 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4 text-[#2563EB]" />
          <span>View Roster & Audit Details</span>
        </button>
      </div>
    </div>
  );
};
