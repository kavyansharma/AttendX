import React from 'react';
import { Activity, CheckCircle2, Clock, Inbox } from 'lucide-react';
import { TeacherActivity } from '../../types/teacher';

interface RecentActivityProps {
  activities: TeacherActivity[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <Inbox className="w-6 h-6" />
        </div>
        <div className="text-sm font-bold text-slate-700">No recent attendance activity.</div>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Attendance submission logs and session completion records will appear here once sessions are conducted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
            Recent Activity
          </h3>
        </div>
        <span className="text-xs font-semibold text-slate-400">Today</span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#10B981] flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[#0F172A]">{act.title}</div>
              {act.subjectName && (
                <div className="text-[11px] font-semibold text-[#2563EB]">{act.subjectName}</div>
              )}
              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                <span>{act.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
