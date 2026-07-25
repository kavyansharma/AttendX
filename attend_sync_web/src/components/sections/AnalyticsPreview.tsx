import React from 'react';
import { collegeAnalyticsData } from '../../data/mockData';
import { BarChart3, Users, AlertTriangle, CheckCircle, Building } from 'lucide-react';

export const AnalyticsPreview: React.FC = () => {
  return (
    <section id="analytics" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Institutional Intelligence
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Reporting & Analytics for Leadership
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Gain immediate insight into campus-wide attendance trends, department benchmarks, and at-risk student lists.
          </p>
        </div>

        {/* Dashboard Analytics Preview Mockup */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">College Attendance Overview</span>
              <h3 className="text-2xl font-black text-white">Apex Institute of Technology</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="badge badge-info text-xs">Academic Year 2025-2026</span>
              <span className="badge badge-success text-xs">Live Data</span>
            </div>
          </div>

          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Total Enrolled Students</span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white">{collegeAnalyticsData.totalStudents.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 5 Departments</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Average Attendance</span>
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">{collegeAnalyticsData.averageAttendance}%</div>
              <div className="text-[11px] text-emerald-500 mt-1">+2.1% higher than last semester</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>At-Risk Students (&lt;75%)</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-rose-400">{collegeAnalyticsData.studentsAtRisk}</div>
              <div className="text-[11px] text-rose-500 mt-1">Automatic warning notifications dispatched</div>
            </div>
          </div>

          {/* Department Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
              Department Attendance Benchmarks
            </h4>

            <div className="space-y-3">
              {collegeAnalyticsData.departmentStats.map((dept, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Building className="w-4 h-4 text-indigo-400" /> {dept.name}
                    </span>
                    <span className="font-black text-emerald-400">{dept.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
