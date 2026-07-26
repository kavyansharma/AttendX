import React from 'react';
import { Users, GraduationCap, Building2, Zap } from 'lucide-react';

export const Stats: React.FC = () => {
  const stats = [
    {
      label: 'Students Enrolled',
      value: '5,000+',
      description: 'Active student profiles tracking attendance',
      icon: Users,
      color: 'text-[#2563EB]',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Teachers Onboarded',
      value: '250+',
      description: 'Faculty members marking attendance daily',
      icon: GraduationCap,
      color: 'text-[#00B8D9]',
      bgColor: 'bg-cyan-50',
    },
    {
      label: 'Departments Managed',
      value: '50+',
      description: 'Streamlined academic departments',
      icon: Building2,
      color: 'text-[#0B1F3A]',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Attendance Synchronization',
      value: 'Real-Time',
      description: 'Instant updates to student devices',
      icon: Zap,
      color: 'text-[#10B981]',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-slate-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/60 p-6 rounded-xl border border-slate-200/80 flex items-start gap-4 hover:border-slate-300 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} ${stat.color} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-700">{stat.label}</div>
                  <p className="text-xs text-slate-500">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
