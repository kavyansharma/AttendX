import React from 'react';
import { BarChart3, GraduationCap, Building, UserCheck, TrendingUp, ShieldAlert } from 'lucide-react';

export const AnalyticsSection: React.FC = () => {
  return (
    <section id="analytics" className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            Real-Time Intelligence
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Smart Attendance Analytics
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Gain executive oversight across all campus departments, courses, and student cohorts.
          </p>
        </div>

        {/* Analytics Mockup Display */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-6 text-left">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Total Students</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">5,240</div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" /> 98.2% Enrolled
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Average Attendance</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">81.4%</div>
              <div className="text-[10px] text-slate-400 mt-1">Target: 75.0% Min</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Departments</div>
              <div className="text-xl sm:text-2xl font-black text-indigo-400 mt-1">12</div>
              <div className="text-[10px] text-slate-400 mt-1">42 Degree Courses</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400 font-semibold">Faculty Members</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-1">342</div>
              <div className="text-[10px] text-slate-400 mt-1">Active Staff</div>
            </div>
          </div>

          {/* Department Performance Bar Preview */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Departmental Compliance Benchmark
              </h4>
              <span className="text-[11px] text-slate-400 font-semibold">Spring Term 2026</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Computer Science & Engineering (CSE)</span>
                  <span className="text-emerald-400 font-bold">84.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '84.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Electronics & Communication (ECE)</span>
                  <span className="text-emerald-400 font-bold">82.1%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '82.1%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Mechanical Engineering (ME)</span>
                  <span className="text-amber-400 font-bold">76.8%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '76.8%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
