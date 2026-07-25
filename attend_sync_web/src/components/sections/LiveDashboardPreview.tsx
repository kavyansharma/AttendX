import React from 'react';
import { UserCheck, AlertTriangle, CheckCircle, Clock, BookOpen, ChevronRight, Bell } from 'lucide-react';
import { initialStudentData } from '../../data/mockData';

export const LiveDashboardPreview: React.FC = () => {
  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl transition-all">
      {/* Top OS window bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-semibold text-slate-400">
            AttendSync Student Portal — Rahul Verma (2024-CSE-042)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Realtime Synchronized</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 text-left">
        {/* Sidebar Mini */}
        <div className="lg:col-span-3 bg-slate-950/60 p-4 space-y-4 hidden sm:block">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
              RV
            </div>
            <div>
              <div className="text-sm font-bold text-white">Rahul Verma</div>
              <div className="text-[11px] text-slate-400">CSE 2nd Yr • Sec A</div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="p-2.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-semibold text-xs flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Overview</span>
            </div>
            <div className="p-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Timetable</span>
            </div>
            <div className="p-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-xs flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="lg:col-span-9 p-6 space-y-6">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Good Morning</span>
              <h3 className="text-xl font-black text-white">Rahul Verma</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">82%</div>
                <div className="text-[11px] text-slate-400 font-semibold">Overall Standing</div>
              </div>
              <span className="badge badge-success px-3 py-1.5 text-xs">SAFE</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">Classes Attended</div>
              <div className="text-lg font-bold text-white mt-1">82 Conducted</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">Classes Missed</div>
              <div className="text-lg font-bold text-rose-400 mt-1">18 Sessions</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-xs text-slate-400">Low Attendance Risk</div>
              <div className="text-lg font-bold text-amber-400 mt-1">1 Subject (English)</div>
            </div>
          </div>

          {/* Subject List Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Subject-Wise Breakdown</h4>
              <span className="text-xs text-indigo-400 hover:underline flex items-center">
                View History <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {initialStudentData.subjects.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    sub.status === 'low'
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-400">{sub.code}</span>
                    <span
                      className={`text-xs font-extrabold ${
                        sub.status === 'low' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {sub.percentage}%
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white truncate">{sub.name}</div>
                  <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>
                      {sub.attended}/{sub.total} Classes
                    </span>
                    {sub.status === 'low' ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> LOW (Req 75%)
                      </span>
                    ) : (
                      <span className="text-emerald-400 font-medium">Safe</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Recent Event Ticker */}
          <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-indigo-200">
              <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>
                <strong className="text-white">DBMS</strong> attendance marked by Dr. Kumar (Present)
              </span>
            </div>
            <span className="text-[11px] text-indigo-300 font-semibold bg-indigo-500/20 px-2 py-0.5 rounded">
              Just now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
