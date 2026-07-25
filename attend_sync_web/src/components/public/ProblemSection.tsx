import React from 'react';
import { FileSpreadsheet, Clock, AlertTriangle, HelpCircle, EyeOff, Layers } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      icon: FileSpreadsheet,
      title: 'Manual Attendance Tracking',
      description: 'Faculty spends 10–15 minutes of every lecture manually calling out names or passing roll sheets.',
    },
    {
      icon: Clock,
      title: 'Paper Records & Lost Registers',
      description: 'Physical registers get misplaced, damaged, or take weeks to be manually typed into college ERPs.',
    },
    {
      icon: AlertTriangle,
      title: 'Delayed Student Updates',
      description: 'Students only discover they are below 75% attendance threshold weeks later when exam hall tickets are blocked.',
    },
    {
      icon: HelpCircle,
      title: 'Attendance Disputes',
      description: 'Lack of timestamped audit logs leads to frequent student-faculty disputes over proxy or missed marks.',
    },
    {
      icon: EyeOff,
      title: 'No Real-Time Visibility',
      description: 'HODs and Principals lack live dashboards to monitor daily campus attendance percentages across departments.',
    },
    {
      icon: Layers,
      title: 'Scattered Legacy Systems',
      description: 'Biometric scanners, Excel files, and legacy ERPs operate in silos without real-time synchronization.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3.5 py-1 rounded-full">
            The Status Quo Challenge
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Attendance Management Shouldn't Be This Difficult.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Legacy paper registers and delayed ERP entries create administrative bottlenecks for colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800/90 hover:border-rose-500/30 transition-all flex flex-col space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{prob.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prob.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
