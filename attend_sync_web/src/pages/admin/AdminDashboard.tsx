import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Department, Course, Teacher, Student, AuditLog } from '../../types/admin';
import { Building, BookOpen, UserCheck, GraduationCap, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [depts, setDepts] = useState<Department[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [d, c, t, s, l] = await Promise.all([
        AdminService.getDepartments(),
        AdminService.getCourses(),
        AdminService.getTeachers(),
        AdminService.getStudents(),
        AdminService.getAuditLogs(),
      ]);
      setDepts(d);
      setCourses(c);
      setTeachers(t);
      setStudents(s);
      setLogs(l);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">Operational Command Center</span>
          <h1 className="text-2xl font-black text-white">Apex Institute of Technology</h1>
          <p className="text-xs text-slate-400 mt-1">
            College Admin Control Hub • Spring Semester 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge badge-success text-xs">Live Database Connection</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Total Enrolled Students</div>
            <div className="text-2xl font-black text-white mt-1">{loading ? '...' : students.length}</div>
            <div className="text-[11px] text-slate-500">Across 2 Sections</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Active Faculty Members</div>
            <div className="text-2xl font-black text-white mt-1">{loading ? '...' : teachers.length}</div>
            <div className="text-[11px] text-slate-500">Assigned Subjects</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Total Departments</div>
            <div className="text-2xl font-black text-white mt-1">{loading ? '...' : depts.length}</div>
            <div className="text-[11px] text-slate-500">{courses.length} Programs Offered</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Today's Class Sessions</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">4 Conducted</div>
            <div className="text-[11px] text-slate-500">81.4% Avg Attendance</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Activity & Low Attendance Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Audit Trail */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Recent Administrative Activity
            </h3>
            <span className="text-xs text-slate-500">Auto Logged</span>
          </div>

          <div className="space-y-3">
            {logs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400">{log.action} on {log.entityName}</span>
                  <span className="text-slate-500 text-[11px]">{log.createdAt}</span>
                </div>
                <div className="text-slate-300">By: {log.userName}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick System Health */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Compliance Status
          </h3>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-2">
            <div className="font-bold text-amber-300">Minimum Threshold Compliance</div>
            <p className="text-slate-400">
              Department of Computer Science default attendance requirement set to 75.0%.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-2">
            <div className="font-bold text-emerald-300">Multi-Tenant Isolation</div>
            <p className="text-slate-400">
              Row Level Security active. Institutional data bounded to Apex Institute of Technology ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
