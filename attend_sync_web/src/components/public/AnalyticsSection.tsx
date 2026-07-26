import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, Award, Building2 } from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  const departmentPerformance = [
    { name: 'Computer Science & Eng', percentage: 89, students: 1200 },
    { name: 'Information Technology', percentage: 85, students: 850 },
    { name: 'Electronics & Comm', percentage: 79, students: 920 },
    { name: 'Mechanical Engineering', percentage: 76, students: 780 },
    { name: 'Civil Engineering', percentage: 73, students: 640 },
  ];

  return (
    <section id="analytics" className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-[#007A93] text-xs font-bold uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>COLLEGE INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            College-Wide Attendance Analytics.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Gain immediate visibility into campus-wide trends, departmental benchmarks, and low-attendance alerts.
          </p>
        </div>

        {/* Analytics Dashboard Container */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Top 3 Stat Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1: Average Attendance */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Average Attendance
                </span>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#10B981] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="text-4xl font-extrabold text-[#0F172A]">81.4%</div>
              <p className="text-xs text-slate-500">+2.3% improvement vs last month</p>
            </div>

            {/* Stat 2: Students At Risk */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Students At Risk
                </span>
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="text-4xl font-extrabold text-rose-600">12%</div>
              <p className="text-xs text-slate-500">Attendance below 75% threshold</p>
            </div>

            {/* Stat 3: Most Attended Subject */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Most Attended Subject
                </span>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-[#0F172A]">Computer Science</div>
              <p className="text-xs font-semibold text-[#2563EB]">91.2% average attendance</p>
            </div>
          </div>

          {/* Department Performance CSS Visualization */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#0B1F3A]" />
                <h3 className="text-lg font-bold text-[#0F172A]">Department Performance</h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">Current Semester</span>
            </div>

            <div className="space-y-4">
              {departmentPerformance.map((dept, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[#0F172A]">{dept.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500">{dept.students} Students</span>
                      <span className="font-extrabold text-[#0B1F3A]">{dept.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        dept.percentage >= 85
                          ? 'bg-[#10B981]'
                          : dept.percentage >= 78
                          ? 'bg-[#00B8D9]'
                          : 'bg-[#F59E0B]'
                      }`}
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
