import React from 'react';
import { Zap, Calendar, BarChart3, MessageSquare, Users, FileText } from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      title: 'Live Attendance',
      description: 'One-tap attendance session entry with instant WebSocket sync across mobile and web apps.',
      icon: Zap,
      color: 'text-[#00B8D9]',
      bgColor: 'bg-cyan-50',
    },
    {
      title: 'Smart Timetable',
      description: 'Dynamic timetable integration mapping teachers, sections, and subjects automatically.',
      icon: Calendar,
      color: 'text-[#2563EB]',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Attendance Analytics',
      description: 'Comprehensive college-wide analytics, subject averages, and early low-attendance warnings.',
      icon: BarChart3,
      color: 'text-[#0B1F3A]',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Correction Requests',
      description: 'Students can submit documented attendance dispute requests directly to course teachers.',
      icon: MessageSquare,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      title: 'Bulk Student Import',
      description: 'Seamless CSV & Excel bulk student and teacher onboarding for large college batches.',
      icon: Users,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      title: 'Audit Trail',
      description: 'Immutable record logs tracing who marked, edited, or approved every single attendance update.',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6FAFF] text-[#007A93] text-xs font-bold uppercase tracking-wider">
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Designed for Modern Educational Institutions.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Every feature is built to streamline administrative workflows and ensure complete transparency.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A]">{feature.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
