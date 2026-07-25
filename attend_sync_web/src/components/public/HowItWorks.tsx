import React from 'react';
import { Building, UserCheck, Zap, BarChart3 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: Building,
      title: 'College Setup',
      description: 'College Admin configures academic structure, departments, courses, batches, sections, subjects, faculty, and timetables.',
    },
    {
      num: '02',
      icon: UserCheck,
      title: 'Teacher Marks Attendance',
      description: 'Faculty selects today’s scheduled class session on laptop, tablet, or smartphone and submits attendance in seconds.',
    },
    {
      num: '03',
      icon: Zap,
      title: 'Attendance Syncs Instantly',
      description: 'Records are validated with Supabase PostgreSQL Row Level Security and broadcast live via WebSockets to student apps.',
    },
    {
      num: '04',
      icon: BarChart3,
      title: 'Live Insights & Alerts',
      description: 'Students see updated standing, while college management accesses real-time department analytics and low-attendance alerts.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            4-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            How AttendX Operates in 4 Simple Steps
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            No biometric hardware scanners required. Works seamlessly on existing college infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-indigo-500/40">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
