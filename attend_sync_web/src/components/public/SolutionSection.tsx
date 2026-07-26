import React from 'react';
import { UserCheck, GraduationCap, Building2, CheckCircle2 } from 'lucide-react';

export const SolutionSection: React.FC = () => {
  const experiences = [
    {
      role: 'FOR STUDENTS',
      title: 'Students',
      description: 'Complete transparency over subject percentages, live status alerts, and seamless correction requests.',
      icon: UserCheck,
      badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-200',
      accentColor: 'border-l-4 border-l-[#2563EB]',
      points: [
        'See attendance instantly after class',
        'Track subject-wise attendance stats',
        'Know when attendance is at risk (<75%)',
        'Submit correction requests directly',
      ],
    },
    {
      role: 'FOR TEACHERS',
      title: 'Teachers',
      description: 'Fast, hassle-free attendance marking in seconds without paperwork or manual calculations.',
      icon: GraduationCap,
      badgeColor: 'bg-cyan-50 text-[#00B8D9] border-cyan-200',
      accentColor: 'border-l-4 border-l-[#00B8D9]',
      points: [
        'Start live attendance sessions in 1 click',
        'Mark students quickly with intuitive UI',
        'Update attendance in real time',
        'Review attendance before final submission',
      ],
    },
    {
      role: 'FOR COLLEGE ADMINISTRATION',
      title: 'College Administration',
      description: 'Centralized institution control with complete visibility, department reports, and audit trails.',
      icon: Building2,
      badgeColor: 'bg-indigo-50 text-[#0B1F3A] border-indigo-200',
      accentColor: 'border-l-4 border-l-[#0B1F3A]',
      points: [
        'Manage students and faculty members',
        'Configure departments, courses & sections',
        'Create & schedule class timetables',
        'View college-wide analytics and audit trails',
      ],
    },
  ];

  return (
    <section id="solution" className="py-16 lg:py-24 bg-white border-y border-slate-200">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6FAFF] text-[#007A93] text-xs font-bold uppercase tracking-wider">
            <span>THE SOLUTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            One Platform. Three Powerful Experiences.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            AttendX connects everyone on campus into a unified real-time workflow.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div
                key={idx}
                className={`bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200 shadow-sm ${exp.accentColor} space-y-6 hover:shadow-md transition-all flex flex-col justify-between`}
              >
                <div className="space-y-6">
                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${exp.badgeColor}`}>
                      {exp.role}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Icon className="w-5 h-5 text-[#0F172A]" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#0F172A]">{exp.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{exp.description}</p>
                  </div>

                  {/* Feature Bullet Points */}
                  <div className="pt-2 space-y-3 border-t border-slate-200/80">
                    {exp.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-sm font-medium text-[#0F172A]">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
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
