import React from 'react';
import { ClipboardX, Clock, AlertTriangle, EyeOff } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const problems = [
    {
      title: 'Manual Attendance Registers',
      description:
        'Paper registers take 10+ minutes out of every class session, get damaged easily, and require tedious manual entry.',
      icon: ClipboardX,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      title: 'Delayed Student Updates',
      description:
        'Students discover low attendance percentages at the very end of the semester when it is already too late to rectify.',
      icon: Clock,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
    },
    {
      title: 'Attendance Calculation Errors',
      description:
        'Manual tallying across hundreds of student spreadsheets leads to disputes, missing records, and incorrect eligibility status.',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      title: 'No Centralized Visibility',
      description:
        'College management and department heads lack real-time oversight of class attendance trends and low-attendance alerts.',
      icon: EyeOff,
      color: 'text-slate-600',
      bgColor: 'bg-slate-100',
      borderColor: 'border-slate-200',
    },
  ];

  return (
    <section id="problem" className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <span>THE CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Traditional Attendance Is Still Too Manual.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Legacy paper registers and fragmented spreadsheets slow down teachers, confuse students, and leave administrators in the dark.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl border ${problem.borderColor} shadow-sm space-y-4 hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${problem.bgColor} ${problem.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
