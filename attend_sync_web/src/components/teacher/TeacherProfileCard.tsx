import React from 'react';
import { UserCheck, Mail, IdCard, Building2, GraduationCap, Lock, BookOpen, Users, Calendar, Award } from 'lucide-react';
import { TeacherProfileData } from '../../types/teacher';

interface TeacherProfileCardProps {
  teacher: TeacherProfileData | null;
}

export const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({ teacher }) => {
  if (!teacher) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
        Loading teacher profile...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Navy Header Strip */}
        <div className="bg-[#0B1F3A] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#123B66] text-[#00B8D9] flex items-center justify-center font-bold text-2xl border-2 border-[#00B8D9]/40 shadow-lg overflow-hidden shrink-0">
              {teacher.avatarUrl ? (
                <img src={teacher.avatarUrl} alt={teacher.fullName} className="w-full h-full object-cover" />
              ) : (
                <UserCheck className="w-10 h-10" />
              )}
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {teacher.fullName}
              </h2>
              <div className="text-sm font-bold text-[#00B8D9] flex items-center gap-2">
                <IdCard className="w-4 h-4" />
                <span>Employee ID: {teacher.employeeId}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{teacher.qualification}</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Institutional Profile Locked</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/50">
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#2563EB]" />
              Official Email
            </span>
            <div className="text-sm font-bold text-[#0F172A] truncate">{teacher.email}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-[#00B8D9]" />
              Department
            </span>
            <div className="text-sm font-bold text-[#0F172A] truncate">{teacher.departmentName}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0B1F3A]" />
              Institution College
            </span>
            <div className="text-sm font-bold text-[#0F172A] truncate">{teacher.collegeName}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              Joining Date
            </span>
            <div className="text-sm font-bold text-[#0F172A]">{teacher.joiningDate}</div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Qualification
            </span>
            <div className="text-sm font-bold text-[#0F172A] truncate">{teacher.qualification}</div>
          </div>
        </div>
      </div>

      {/* Assigned Subjects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-lg font-extrabold text-[#0F172A]">Assigned Subjects</h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {teacher.assignedSubjects.length} Active Subjects
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase font-bold border-b border-slate-200">
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Course & Semester</th>
                <th className="py-3 px-4 text-right">Credits</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teacher.assignedSubjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#0B1F3A]">
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-[#0B1F3A] text-xs font-bold">
                      {sub.code}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#0F172A]">{sub.name}</td>
                  <td className="py-3 px-4 text-xs font-semibold text-slate-600">
                    {sub.courseName} • {sub.semesterName}
                  </td>
                  <td className="py-3 px-4 text-right font-extrabold text-[#2563EB]">{sub.credits} HP</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assigned Sections Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00B8D9]" />
            <h3 className="text-lg font-extrabold text-[#0F172A]">Assigned Class Sections</h3>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {teacher.assignedSections.length} Sections Assigned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teacher.assignedSections.map((sec) => (
            <div key={sec.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-[#0F172A]">{sec.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-[#007A93] text-xs font-bold">
                  {sec.studentCount} Students
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {sec.courseName} • {sec.semesterName}
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {sec.batchName} • Default Room: {sec.roomNumber}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Managed Note */}
      <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
        <Lock className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Institutional profile data and subject allocations are managed by your College Administrator. Contact administration for transfer or timetable adjustments.</span>
      </div>
    </div>
  );
};
