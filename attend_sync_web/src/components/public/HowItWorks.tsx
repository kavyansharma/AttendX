import React from 'react';
import { Settings, Play, CheckCircle, Smartphone } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'College Sets Up',
      description: 'Administrators configure departments, courses, teachers, and student rosters in minutes.',
      icon: Settings,
    },
    {
      step: '02',
      title: 'Teacher Starts Class',
      description: 'Teachers select their subject and section from the digital timetable to open a live session.',
      icon: Play,
    },
    {
      step: '03',
      title: 'Attendance Is Marked',
      description: 'Teachers mark attendance in seconds with intuitive present/absent/late toggles.',
      icon: CheckCircle,
    },
    {
      step: '04',
      title: 'Students See Live Updates',
      description: 'Attendance records sync instantly to the student Flutter app and portal dashboards.',
      icon: Smartphone,
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#2563EB] text-xs font-bold uppercase tracking-wider">
            <span>SIMPLE WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            How AttendX Works
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            From setup to real-time synchronization in four straightforward steps.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div className="space-y-4">
                  {/* Step Number Circle & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center font-extrabold text-sm shadow-sm">
                      {item.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#00B8D9] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
