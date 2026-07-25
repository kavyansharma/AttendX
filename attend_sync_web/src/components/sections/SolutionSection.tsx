import React from 'react';
import { UserCheck, Database, Zap, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UserCheck,
      title: 'Teacher Marks Attendance',
      description: 'Faculty opens today’s class list on tablet/laptop, selects present/absent with 1-click bulk toggles, and submits.',
    },
    {
      num: '02',
      icon: Database,
      title: 'Supabase PostgreSQL Save',
      description: 'Records are saved securely with Row Level Security enforcement, timestamping, and automatic calculation triggers.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'WebSocket Realtime Broadcast',
      description: 'Supabase Realtime instantly emits session update payloads directly to active student device channels.',
    },
    {
      num: '04',
      icon: Smartphone,
      title: 'Live Student Dashboard Refresh',
      description: 'Student Flutter app recomputes subject & overall attendance percentages instantly without logout/login.',
    },
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            The AttendSync Solution
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            One Platform. Everyone in Sync.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Eliminate communication gaps between classrooms and students with zero-latency synchronization.
          </p>
        </div>

        {/* Step Cards Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-indigo-500/40">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-indigo-500/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
