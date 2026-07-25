import React, { useState } from 'react';
import { GraduationCap, UserCheck, School, Check, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleSectionProps {
  onOpenLogin: (role?: UserRole) => void;
}

export const RoleSection: React.FC<RoleSectionProps> = ({ onOpenLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('student');

  return (
    <section id="roles" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Tailored User Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Designed Specifically for Every Role
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Dedicated mobile apps and web portals tailored to the exact daily workflow of students, teachers, and college management.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl gap-2">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'student'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>For Students</span>
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'teacher'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>For Teachers</span>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'admin'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <School className="w-4 h-4" />
              <span>For Colleges</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl">
          {activeTab === 'student' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Mobile App Experience
                </span>
                <h3 className="text-2xl font-black text-white">Know Your Attendance. Always.</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Students get total peace of mind with real-time percentage updates, low attendance alerts before exam cutoff dates, and digital correction submission.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Real-time overall & subject percentage tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Automated low attendance warning notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Class timetable & session history logs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> 1-Click attendance correction requests
                  </li>
                </ul>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenLogin('student')}
                    className="btn btn-primary px-6 text-sm"
                  >
                    <span>Launch Student Demo App</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-bold text-white">
                  <span>Student Mobile Dashboard</span>
                  <span className="text-emerald-400">82% Standing</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                  <span>Data Structures & Algorithms</span>
                  <span className="font-bold text-emerald-400">78%</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
                  <span>Database Systems</span>
                  <span className="font-bold text-emerald-400">84%</span>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-500/30 flex justify-between text-rose-300">
                  <span>Technical Communication</span>
                  <span className="font-bold text-rose-400">69% (Warning)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'teacher' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Responsive Web Dashboard
                </span>
                <h3 className="text-2xl font-black text-white">Mark Attendance. In Seconds.</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Faculty can select today’s classes from their assigned timetable, toggle present/absent with bulk shortcuts, and review before single-click submission.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> "Mark All Present" & bulk status shortcuts
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Student photo roster & search filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Review student correction requests in 1-click
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Configurable post-submission edit window
                  </li>
                </ul>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenLogin('teacher')}
                    className="btn btn-primary px-6 text-sm"
                  >
                    <span>Launch Teacher Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-bold text-white">
                  <span>Today's Assigned Sessions</span>
                  <span className="text-indigo-400">3 Classes Today</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">CSE 2nd Year - Sec A</div>
                    <div className="text-[11px] text-slate-400">CS401 Data Structures</div>
                  </div>
                  <span className="badge badge-success text-[11px]">Submitted</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">CSE 3rd Year - Sec B</div>
                    <div className="text-[11px] text-slate-400">CS602 Advanced DBMS</div>
                  </div>
                  <span className="badge badge-warning text-[11px]">Pending Today</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  College Administration Console
                </span>
                <h3 className="text-2xl font-black text-white">Complete Attendance Visibility.</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Full command center for college management to configure academic hierarchy, assign faculty timetable slots, audit records, and export institutional reports.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Complete CRUD for Departments, Courses & Batches
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Department-wide & Subject-level attendance rules
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Instant PDF, CSV & Excel report exports
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Immutable audit log tracking all modifications
                  </li>
                </ul>
                <div className="pt-2">
                  <button
                    onClick={() => onOpenLogin('admin')}
                    className="btn btn-primary px-6 text-sm"
                  >
                    <span>Launch Admin Console</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-bold text-white">
                  <span>Institutional Overview</span>
                  <span className="text-indigo-400">5,240 Total Students</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Avg Attendance</div>
                    <div className="text-lg font-black text-emerald-400">81.4%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400">At-Risk Students</div>
                    <div className="text-lg font-black text-rose-400">438</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
