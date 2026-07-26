import React from 'react';
import { Users, CheckCircle2, XCircle, Clock, ShieldAlert, Award, AlertCircle } from 'lucide-react';
import { AttendanceSummaryData } from '../../../types/teacher';

interface AttendanceSummaryProps {
  summary: AttendanceSummaryData;
}

export const AttendanceSummary: React.FC<AttendanceSummaryProps> = ({ summary }) => {
  return (
    <div className="space-y-4">
      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Total Students */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-between">
            <span>Total</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-[#0F172A]">{summary.totalStudents}</div>
          <div className="text-[10px] text-slate-400 font-medium">Enrolled</div>
        </div>

        {/* Marked */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-between">
            <span>Marked</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
          </div>
          <div className="text-2xl font-black text-[#2563EB]">{summary.markedCount}</div>
          <div className="text-[10px] text-slate-400 font-medium">Recorded</div>
        </div>

        {/* Not Marked */}
        <div className={`p-3.5 rounded-xl border shadow-xs space-y-1 ${
          summary.notMarkedCount > 0 ? 'bg-amber-50/70 border-amber-200' : 'bg-white border-slate-200'
        }`}>
          <div className="text-[11px] font-extrabold uppercase text-slate-500 flex items-center justify-between">
            <span>Not Marked</span>
            <AlertCircle className={`w-3.5 h-3.5 ${summary.notMarkedCount > 0 ? 'text-amber-600' : 'text-slate-400'}`} />
          </div>
          <div className={`text-2xl font-black ${summary.notMarkedCount > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
            {summary.notMarkedCount}
          </div>
          <div className="text-[10px] text-slate-400 font-medium">Pending</div>
        </div>

        {/* Present */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-emerald-700 flex items-center justify-between">
            <span>Present</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
          </div>
          <div className="text-2xl font-black text-[#10B981]">{summary.presentCount}</div>
          <div className="text-[10px] text-emerald-600 font-medium">In Class</div>
        </div>

        {/* Absent */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-rose-700 flex items-center justify-between">
            <span>Absent</span>
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">{summary.absentCount}</div>
          <div className="text-[10px] text-rose-500 font-medium">Unexcused</div>
        </div>

        {/* Late */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-amber-700 flex items-center justify-between">
            <span>Late</span>
            <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>
          <div className="text-2xl font-black text-[#F59E0B]">{summary.lateCount}</div>
          <div className="text-[10px] text-amber-600 font-medium">Arrived Late</div>
        </div>

        {/* Excused */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-extrabold uppercase text-blue-700 flex items-center justify-between">
            <span>Excused</span>
            <ShieldAlert className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-blue-600">{summary.excusedCount}</div>
          <div className="text-[10px] text-blue-500 font-medium">Authorized</div>
        </div>
      </div>

      {/* Attendance Rate Progress Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-[#0B1F3A] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Live Session Attendance Rate</div>
            <div className="text-lg font-black text-[#0F172A]">
              {summary.attendanceRate}% <span className="text-xs font-medium text-slate-500">(Present + Late / Total)</span>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-64 space-y-1">
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${
                summary.attendanceRate >= 75
                  ? 'bg-[#10B981]'
                  : summary.attendanceRate >= 60
                  ? 'bg-[#F59E0B]'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${summary.attendanceRate}%` }}
            />
          </div>
          <div className="text-[10px] text-right font-semibold text-slate-400">
            Threshold: 75%
          </div>
        </div>
      </div>
    </div>
  );
};
