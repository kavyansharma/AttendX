import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';
import { AttendanceService } from '../../services/attendanceService';
import {
  AttendanceSessionDetails,
  StudentRosterItem,
  AttendanceRecordStatus,
  TeacherProfileData,
} from '../../types/teacher';
import { AttendanceSummary } from '../../components/teacher/attendance/AttendanceSummary';
import { AttendanceFilters, FilterStatusOption } from '../../components/teacher/attendance/AttendanceFilters';
import { BulkAttendanceAction } from '../../components/teacher/attendance/BulkAttendanceAction';
import { AttendanceRoster } from '../../components/teacher/attendance/AttendanceRoster';
import { AttendanceReview } from '../../components/teacher/attendance/AttendanceReview';
import { AttendanceSubmitConfirmation } from '../../components/teacher/attendance/AttendanceSubmitConfirmation';

interface TeacherAttendanceSessionPageProps {
  sessionId: string;
  teacher: TeacherProfileData | null;
  onNavigateBack: () => void;
}

export const TeacherAttendanceSessionPage: React.FC<TeacherAttendanceSessionPageProps> = ({
  sessionId,
  teacher,
  onNavigateBack,
}) => {
  const [session, setSession] = useState<AttendanceSessionDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterStatusOption>('ALL');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittedState, setIsSubmittedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      setIsLoading(true);
      try {
        const details = await AttendanceService.getSessionDetails(sessionId);
        if (details) {
          setSession(details);
          setIsSubmittedState(details.isSubmitted);
        }
      } catch (err) {
        console.error('Error loading attendance session:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, [sessionId]);

  if (isLoading || !session) {
    return (
      <div className="py-16 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-4 border-[#0B1F3A] border-t-[#00B8D9] animate-spin mx-auto" />
        <div className="text-sm font-bold text-slate-600">Loading attendance session...</div>
      </div>
    );
  }

  // Summary calculations
  const summary = AttendanceService.calculateSummary(session.roster);

  // Handle individual status change
  const handleStatusChange = async (studentId: string, newStatus: AttendanceRecordStatus) => {
    try {
      const updated = await AttendanceService.updateStudentStatus(sessionId, studentId, newStatus);
      setSession(updated);
    } catch (err: any) {
      alert(err.message || 'Failed to update student status.');
    }
  };

  // Handle Bulk Mark Present
  const handleBulkMarkPresent = async () => {
    try {
      const updated = await AttendanceService.bulkMarkPresent(sessionId);
      setSession(updated);
    } catch (err: any) {
      alert(err.message || 'Bulk mark present failed.');
    }
  };

  // Handle Final Submission
  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const teacherId = teacher?.id || session.teacherId;
      const submitted = await AttendanceService.submitSession(sessionId, teacherId);
      setSession(submitted);
      setIsSubmittedState(true);
      setReviewModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to submit attendance session.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter & Search Roster
  const filteredRoster = session.roster.filter((st) => {
    // Search query filter
    const matchesSearch =
      searchQuery.trim() === '' ||
      st.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Status filter
    if (activeFilter === 'ALL') return true;
    return st.status === activeFilter;
  });

  // Post Submission Screen View
  if (isSubmittedState) {
    return (
      <div className="space-y-6">
        <button
          onClick={onNavigateBack}
          className="text-xs font-bold text-slate-600 hover:text-[#0B1F3A] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <AttendanceSubmitConfirmation
          session={session}
          summary={summary}
          onBackToDashboard={onNavigateBack}
          onViewDetails={() => setIsSubmittedState(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onNavigateBack}
          className="text-xs font-bold text-slate-600 hover:text-[#0B1F3A] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Schedule</span>
        </button>

        <div className="flex items-center gap-2">
          {session.isSubmitted ? (
            <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              SESSION LOCKED (SUBMITTED)
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-cyan-100 text-[#007A93] text-xs font-bold border border-[#00B8D9]/30 flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#00B8D9]" />
              LIVE ATTENDANCE SESSION IN PROGRESS
            </span>
          )}
        </div>
      </div>

      {/* SESSION HEADER CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-100 text-[#0B1F3A] text-xs font-black">
                {session.subjectCode}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                {session.subjectName}
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              Section <strong className="text-[#2563EB]">{session.sectionName}</strong> • {session.courseName} ({session.semesterName})
            </p>
          </div>

          <div className="text-right text-xs space-y-1">
            <div className="font-bold text-[#0F172A]">Room: {session.roomNumber}</div>
            <div className="text-slate-500 font-medium">Time: {session.startTime} - {session.endTime}</div>
            <div className="text-slate-400 font-mono text-[11px]">Date: {session.sessionDate}</div>
          </div>
        </div>

        {/* Action Toolbar Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <BulkAttendanceAction
            unmarkedCount={summary.notMarkedCount}
            totalCount={summary.totalStudents}
            onConfirmBulkMarkPresent={handleBulkMarkPresent}
            disabled={session.isSubmitted}
          />

          <button
            onClick={() => setReviewModalOpen(true)}
            disabled={session.isSubmitted}
            className="btn btn-primary py-2.5 px-5 text-xs font-extrabold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-[#00B8D9]" />
            <span>Review & Submit Attendance ({summary.markedCount}/{summary.totalStudents})</span>
          </button>
        </div>
      </div>

      {/* SUMMARY STATS & PROGRESS BAR */}
      <AttendanceSummary summary={summary} />

      {/* SEARCH AND FILTER BAR */}
      <AttendanceFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalCount={session.roster.length}
        filteredCount={filteredRoster.length}
      />

      {/* STUDENT ROSTER LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <span>Student Roster</span>
          <span>Status Controls</span>
        </div>

        <AttendanceRoster
          roster={filteredRoster}
          onStatusChange={handleStatusChange}
          disabled={session.isSubmitted}
        />
      </div>

      {/* STICKY BOTTOM SUBMIT BAR FOR FAST TEACHER ACCESS */}
      {!session.isSubmitted && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 shadow-2xl flex items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-[#0F172A]">
              Progress: <span className="text-[#2563EB] font-black">{summary.markedCount}/{summary.totalStudents}</span> Marked
            </div>
            {summary.notMarkedCount > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                <AlertCircle className="w-3 h-3" />
                {summary.notMarkedCount} pending
              </span>
            )}
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="btn btn-primary py-3 px-6 text-xs font-extrabold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-lg flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-[#00B8D9]" />
            <span>Review & Submit</span>
          </button>
        </div>
      )}

      {/* REVIEW & VERIFICATION MODAL */}
      <AttendanceReview
        session={session}
        summary={summary}
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onConfirmSubmit={handleConfirmSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
