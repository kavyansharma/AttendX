import React from 'react';
import { Building, UserCheck, Zap, Database, Smartphone, PieChart, ArrowRight } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const flow = [
    { num: '01', icon: Building, label: 'College Admin', desc: 'Sets hierarchy & timetables' },
    { num: '02', icon: UserCheck, label: 'Teacher Marks Class', desc: '1-click session submission' },
    { num: '03', icon: Database, label: 'Secure PostgreSQL', desc: 'Row Level Security save' },
    { num: '04', icon: Zap, label: 'Realtime Broadcast', desc: 'Instant WebSocket push' },
    { num: '05', icon: Smartphone, label: 'Student Mobile App', desc: 'Live percent & alert refresh' },
    { num: '06', icon: PieChart, label: 'College Analytics', desc: 'Real-time compliance reports' },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            The AttendX Solution
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            One Connected Attendance Ecosystem.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate communication gaps between classrooms and students with zero-latency synchronization.
          </p>
        </div>

        {/* 6-Step Workflow Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {flow.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-indigo-400">{item.num}</span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1">{item.label}</h3>
                  <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
