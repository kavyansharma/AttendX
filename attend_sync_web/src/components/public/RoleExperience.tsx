import React, { useState } from 'react';
import { UserCheck, GraduationCap, Building2, Calendar, AlertTriangle, Play, Users, BarChart, ShieldCheck } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleExperienceProps {
  onOpenLogin?: (role?: UserRole) => void;
}

export const RoleExperience: React.FC<RoleExperienceProps> = ({ onOpenLogin }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');

  return (
    <section id="for-students" className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-[#0B1F3A] text-xs font-bold uppercase tracking-wider">
            <span>TAILORED PORTALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Built for Everyone on Campus.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Switch between views to experience the tailored interface for students, teachers, and college administrators.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-xl bg-slate-100 border border-slate-200 gap-2 text-sm font-bold">
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all ${
                activeTab === 'student'
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Students</span>
            </button>

            <button
              onClick={() => setActiveTab('teacher')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all ${
                activeTab === 'teacher'
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Teachers</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#0B1F3A] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#0F172A]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>College Admins</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENTS (Non-overlapping container) */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md">
          {/* STUDENT TAB */}
          {activeTab === 'student' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Student Portal Experience</h3>
                  <p className="text-sm text-[#64748B]">Real-time visibility over attendance stats & risk warnings</p>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={() => onOpenLogin('student')}
                    className="btn btn-primary py-2 px-4 text-xs font-bold bg-[#0B1F3A] text-white"
                  >
                    Try Student Demo Login
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1: Overall Percentage */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Attendance Percentage</div>
                  <div className="text-3xl font-extrabold text-[#0F172A]">84.2%</div>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Eligible for Exams
                  </div>
                </div>

                {/* Stat 2: Subject Breakdown */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Subject Breakdown</div>
                  <div className="text-base font-bold text-[#0F172A]">5 Enrolled Subjects</div>
                  <div className="text-xs text-slate-500">Math (88%), Physics (76%), CS (92%)</div>
                </div>

                {/* Stat 3: Today's Timetable */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Today's Timetable</div>
                  <div className="text-base font-bold text-[#0F172A] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#2563EB]" />
                    3 Classes Scheduled
                  </div>
                  <div className="text-xs text-slate-500">Next: Physics at 11:30 AM</div>
                </div>

                {/* Stat 4: Risk Alerts */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Risk Alerts</div>
                  <div className="text-base font-bold text-[#F59E0B] flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    1 Subject Near Threshold
                  </div>
                  <div className="text-xs text-slate-500">Physics is at 76% (Limit: 75%)</div>
                </div>
              </div>
            </div>
          )}

          {/* TEACHER TAB */}
          {activeTab === 'teacher' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">Teacher Portal Experience</h3>
                  <p className="text-sm text-[#64748B]">Fast class attendance entry and real-time student rosters</p>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={() => onOpenLogin('teacher')}
                    className="btn btn-primary py-2 px-4 text-xs font-bold bg-[#0B1F3A] text-white"
                  >
                    Try Teacher Demo Login
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1: Today's Classes */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Today's Classes</div>
                  <div className="text-3xl font-extrabold text-[#0F172A]">4 Sessions</div>
                  <div className="text-xs text-[#2563EB] font-semibold">2 Completed • 2 Remaining</div>
                </div>

                {/* Stat 2: Start Attendance */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Start Attendance</div>
                  <div className="text-base font-bold text-[#10B981] flex items-center gap-1.5">
                    <Play className="w-4 h-4" />
                    Session Ready
                  </div>
                  <div className="text-xs text-slate-500">Click to open digital roll call</div>
                </div>

                {/* Stat 3: Student Roster */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Student Roster</div>
                  <div className="text-base font-bold text-[#0F172A] flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#00B8D9]" />
                    60 Students / Class
                  </div>
                  <div className="text-xs text-slate-500">B.Tech CSE - Section A</div>
                </div>

                {/* Stat 4: Attendance Summary */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Attendance Summary</div>
                  <div className="text-base font-bold text-[#0F172A]">54 Present • 6 Absent</div>
                  <div className="text-xs text-slate-500">90% class attendance rate</div>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN TAB */}
          {activeTab === 'admin' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0F172A]">College Admin Portal</h3>
                  <p className="text-sm text-[#64748B]">Complete institution management, department analytics, and audit logs</p>
                </div>
                {onOpenLogin && (
                  <button
                    onClick={() => onOpenLogin('super_admin')}
                    className="btn btn-primary py-2 px-4 text-xs font-bold bg-[#0B1F3A] text-white"
                  >
                    Open Admin Console
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Stat 1: Student Count */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Student Count</div>
                  <div className="text-2xl font-extrabold text-[#0F172A]">5,240</div>
                  <div className="text-[11px] text-slate-500">Active enrollments</div>
                </div>

                {/* Stat 2: Teacher Count */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Teacher Count</div>
                  <div className="text-2xl font-extrabold text-[#0F172A]">248</div>
                  <div className="text-[11px] text-slate-500">Faculty members</div>
                </div>

                {/* Stat 3: Average Attendance */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Avg Attendance</div>
                  <div className="text-2xl font-extrabold text-[#10B981]">81.4%</div>
                  <div className="text-[11px] text-slate-500">College-wide metric</div>
                </div>

                {/* Stat 4: Low Attendance Alerts */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Low Attendance Alerts</div>
                  <div className="text-2xl font-extrabold text-rose-600">12%</div>
                  <div className="text-[11px] text-slate-500">Students below 75%</div>
                </div>

                {/* Stat 5: Department Analytics */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Department Analytics</div>
                  <div className="text-sm font-bold text-[#0F172A] flex items-center gap-1">
                    <BarChart className="w-3.5 h-3.5 text-[#2563EB]" />
                    12 Depts Active
                  </div>
                  <div className="text-[11px] text-slate-500">Real-time audit reports</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
