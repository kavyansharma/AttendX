import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ShieldCheck, X, ArrowLeft, Send } from 'lucide-react';
import { AttendanceSessionDetails, AttendanceSummaryData } from '../../../types/teacher';

interface AttendanceReviewProps {
  session: AttendanceSessionDetails;
  summary: AttendanceSummaryData;
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit: () => void;
  isSubmitting: boolean;
}

export const AttendanceReview: React.FC<AttendanceReviewProps> = ({
  session,
  summary,
  isOpen,
  onClose,
  onConfirmSubmit,
  isSubmitting,
}) => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'UNMARKED' | 'ABSENT' | 'PRESENT'>('ALL');

  if (!isOpen) return null;

  const rosterGrouped = session.roster.filter((s) => {
    if (activeTab === 'UNMARKED') return s.status === 'NOT_MARKED';
    if (activeTab === 'ABSENT') return s.status === 'ABSENT';
    if (activeTab === 'PRESENT') return s.status === 'PRESENT' || s.status === 'LATE';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Header Bar */}
        <div className="bg-[#0B1F3A] text-white p-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#00B8D9] uppercase tracking-wider">
              Attendance Verification
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Review Session — {session.subjectName}
            </h3>
            <p className="text-xs text-slate-300">
              Section {session.sectionName} • {session.roomNumber} • {session.sessionDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Warning Banner if Unmarked Students > 0 */}
          {summary.notMarkedCount > 0 && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>{summary.notMarkedCount} Students Are Still Not Marked</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Please review un-marked students before submitting. Not-marked students will not be counted as Present in the official eligibility records.
              </p>
            </div>
          )}

          {/* Breakdown Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Students</div>
              <div className="text-xl font-extrabold text-[#0F172A]">{summary.totalStudents}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-emerald-600 uppercase">Present + Late</div>
              <div className="text-xl font-extrabold text-[#10B981]">{summary.presentCount + summary.lateCount}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-rose-600 uppercase">Absent</div>
              <div className="text-xl font-extrabold text-rose-600">{summary.absentCount}</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-indigo-600 uppercase">Attendance Rate</div>
              <div className="text-xl font-extrabold text-[#2563EB]">{summary.attendanceRate}%</div>
            </div>
          </div>

          {/* Filter Pills for Grouped Roster */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Student Roster Verification
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold gap-1">
                <button
                  onClick={() => setActiveTab('ALL')}
                  className={`px-3 py-1 rounded-lg ${activeTab === 'ALL' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-slate-500'}`}
                >
                  All ({summary.totalStudents})
                </button>
                {summary.notMarkedCount > 0 && (
                  <button
                    onClick={() => setActiveTab('UNMARKED')}
                    className={`px-3 py-1 rounded-lg ${activeTab === 'UNMARKED' ? 'bg-amber-100 text-amber-900 shadow-xs' : 'text-amber-700'}`}
                  >
                    Unmarked ({summary.notMarkedCount})
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('ABSENT')}
                  className={`px-3 py-1 rounded-lg ${activeTab === 'ABSENT' ? 'bg-rose-100 text-rose-900 shadow-xs' : 'text-slate-500'}`}
                >
                  Absent ({summary.absentCount})
                </button>
              </div>
            </div>

            {/* Roster Group List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {rosterGrouped.map((st) => (
                <div key={st.studentId} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-[#0F172A]">{st.fullName}</span>
                    <span className="ml-2 font-mono text-slate-400">({st.rollNumber})</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black ${
                    st.status === 'PRESENT'
                      ? 'bg-emerald-100 text-[#10B981]'
                      : st.status === 'ABSENT'
                      ? 'bg-rose-100 text-rose-600'
                      : st.status === 'LATE'
                      ? 'bg-amber-100 text-amber-700'
                      : st.status === 'EXCUSED'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary py-3 px-5 text-xs font-bold text-slate-700 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back & Edit</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirmSubmit}
            className="btn btn-primary py-3 px-6 text-xs font-bold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-md flex items-center gap-2"
          >
            {isSubmitting ? (
              <span>Submitting Transaction...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#00B8D9]" />
                <span>Confirm & Submit Attendance</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
