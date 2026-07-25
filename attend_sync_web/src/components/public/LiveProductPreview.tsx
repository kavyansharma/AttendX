import React from 'react';
import { UserCheck, AlertTriangle, CheckCircle, Clock, BookOpen, ChevronRight, Bell } from 'lucide-react';

export const LiveProductPreview: React.FC = () => {
  const subjects = [
    { code: 'CS401', name: 'Data Structures & Algorithms', percentage: 78, attended: 39, total: 50, status: 'safe' },
    { code: 'CS402', name: 'Database Management Systems', percentage: 84, attended: 42, total: 50, status: 'safe' },
    { code: 'CS403', name: 'Operating Systems', percentage: 91, attended: 45, total: 50, status: 'safe' },
    { code: 'HU401', name: 'Technical Communication', percentage: 69, attended: 27, total: 39, status: 'low' },
  ];

  return (
    <div id="live-preview" className="relative rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-xl transition-all w-full max-w-[600px] mx-auto">
      {/* Top OS window bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-semibold text-slate-400 truncate max-w-[200px] sm:max-w-none">
            AttendX Student Portal — Rahul Verma (2024-CSE-042)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full animate-pulse">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Realtime Synchronized</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-6 space-y-5 text-left">
        {/* Header row */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Good Morning</span>
            <h3 className="text-lg font-black text-white">Rahul Verma</h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xl font-black text-emerald-400">82%</div>
              <div className="text-[10px] text-slate-400 font-semibold">Overall Standing</div>
            </div>
            <span className="badge badge-success px-2.5 py-1 text-[11px]">SAFE</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400">Classes Attended</div>
            <div className="text-sm font-bold text-white mt-0.5">82 Conducted</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[11px] text-slate-400">Classes Missed</div>
            <div className="text-sm font-bold text-rose-400 mt-0.5">18 Sessions</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-[11px] text-slate-400">Low Attendance Risk</div>
            <div className="text-sm font-bold text-amber-400 mt-0.5">1 Subject (Tech Comm)</div>
          </div>
        </div>

        {/* Subject List Grid */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Subject-Wise Breakdown</h4>
            <span className="text-[11px] text-indigo-400 hover:underline flex items-center">
              View History <ChevronRight className="w-3 h-3" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subjects.map((sub) => (
              <div
                key={sub.code}
                className={`p-3 rounded-xl border transition-all ${
                  sub.status === 'low'
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-slate-400">{sub.code}</span>
                  <span
                    className={`text-[11px] font-extrabold ${
                      sub.status === 'low' ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {sub.percentage}%
                  </span>
                </div>
                <div className="text-xs font-semibold text-white truncate">{sub.name}</div>
                <div className="mt-1.5 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>
                    {sub.attended}/{sub.total} Classes
                  </span>
                  {sub.status === 'low' ? (
                    <span className="text-rose-400 font-bold flex items-center gap-0.5">
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
        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-indigo-200 truncate">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate text-[11px]">
              <strong className="text-white">DBMS</strong> attendance marked by Dr. Kumar (Present)
            </span>
          </div>
          <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-500/20 px-2 py-0.5 rounded flex-shrink-0">
            Just now
          </span>
        </div>
      </div>
    </div>
  );
};
