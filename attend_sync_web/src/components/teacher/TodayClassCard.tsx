import React, { useState } from 'react';
import { Clock, MapPin, Play, CheckCircle2, Info, Users, Sparkles, X } from 'lucide-react';
import { TodayClass } from '../../types/teacher';

interface TodayClassCardProps {
  cls: TodayClass;
  onStartSession?: (classId: string) => void;
  onViewDetails?: (classId: string) => void;
}

export const TodayClassCard: React.FC<TodayClassCardProps> = ({
  cls,
  onStartSession,
  onViewDetails,
}) => {
  const [phase3bModalOpen, setPhase3bModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleStartAttendanceClick = () => {
    if (onStartSession) {
      onStartSession(cls.id);
    }
    setPhase3bModalOpen(true);
  };

  const handleViewDetailsClick = () => {
    if (onViewDetails) {
      onViewDetails(cls.id);
    }
    setDetailsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Card Top Row: Subject Code & Status Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-[#0B1F3A] text-xs font-black uppercase tracking-wider border border-indigo-100">
              {cls.subjectCode}
            </span>

            {cls.status === 'COMPLETED' && (
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#10B981] text-xs font-extrabold flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                COMPLETED
              </span>
            )}

            {cls.status === 'IN_PROGRESS' && (
              <span className="px-3 py-1 rounded-full bg-cyan-50 text-[#007A93] text-xs font-extrabold flex items-center gap-1 border border-cyan-200 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#00B8D9]" />
                IN PROGRESS
              </span>
            )}

            {cls.status === 'UPCOMING' && (
              <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-extrabold flex items-center gap-1 border border-blue-200">
                <Clock className="w-3.5 h-3.5" />
                UPCOMING
              </span>
            )}
          </div>

          {/* Subject Name & Section/Course/Semester */}
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-[#0F172A] leading-snug">
              {cls.subjectName}
            </h3>
            <div className="text-xs font-semibold text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[#2563EB] font-bold">Section {cls.sectionName}</span>
              <span>•</span>
              <span>{cls.courseName}</span>
              <span>•</span>
              <span>{cls.semesterName}</span>
            </div>
          </div>

          {/* Room Number, Time Slot & Total Students */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-[#00B8D9] shrink-0" />
              <span className="truncate">{cls.roomNumber}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Clock className="w-4 h-4 text-[#2563EB] shrink-0" />
              <span>{cls.startTime} - {cls.endTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 font-medium col-span-2">
              <Users className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{cls.totalStudents} Enrolled Students</span>
            </div>
          </div>
        </div>

        {/* Action Button Section */}
        <div className="pt-3 border-t border-slate-100">
          {cls.status === 'COMPLETED' ? (
            <button
              onClick={handleViewDetailsClick}
              className="w-full btn btn-secondary py-2.5 px-4 text-xs font-bold text-[#0F172A] border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4 text-slate-500" />
              <span>View Details</span>
            </button>
          ) : (
            <button
              onClick={handleStartAttendanceClick}
              className="w-full btn btn-primary py-2.5 px-4 text-xs font-bold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-sm flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 text-[#00B8D9] fill-current" />
              <span>Start Attendance</span>
            </button>
          )}
        </div>
      </div>

      {/* PHASE 3B COMING SOON NOTICE MODAL */}
      {phase3bModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200 relative">
            <button
              onClick={() => setPhase3bModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#E6FAFF] text-[#007A93] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#00B8D9]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                Attendance Session Coming in Phase 3B
              </h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                The secure Teacher Portal foundation is now active. Live attendance sessions and real-time student roster marking will be enabled in <strong className="text-[#0B1F3A]">Phase 3B</strong>.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1 font-mono text-slate-600">
              <div><strong>Class:</strong> {cls.subjectName}</div>
              <div><strong>Section:</strong> {cls.sectionName} ({cls.roomNumber})</div>
              <div><strong>Time Slot:</strong> {cls.startTime} - {cls.endTime}</div>
            </div>

            <button
              onClick={() => setPhase3bModalOpen(false)}
              className="w-full btn btn-primary py-3 text-sm font-bold bg-[#0B1F3A] text-white"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* COMPLETED CLASS DETAILS MODAL */}
      {detailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 border border-slate-200 relative">
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">Class Session Summary</h3>
              <p className="text-sm text-[#64748B]">Attendance record details for completed session</p>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Subject:</span>
                <span className="font-bold text-[#0F172A]">{cls.subjectName} ({cls.subjectCode})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Section:</span>
                <span className="font-bold text-[#0F172A]">{cls.sectionName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Time Slot:</span>
                <span className="font-bold text-[#0F172A]">{cls.startTime} - {cls.endTime}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Enrolled Students:</span>
                <span className="font-bold text-[#0F172A]">{cls.totalStudents}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-medium">Attendance Recorded:</span>
                <span className="font-bold text-[#10B981]">{cls.attendedCount || cls.totalStudents - 6} Present</span>
              </div>
            </div>

            <button
              onClick={() => setDetailsModalOpen(false)}
              className="w-full btn btn-primary py-2.5 text-xs font-bold bg-[#0B1F3A] text-white"
            >
              Close Summary
            </button>
          </div>
        </div>
      )}
    </>
  );
};
