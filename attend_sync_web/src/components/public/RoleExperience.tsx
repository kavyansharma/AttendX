import React, { useState } from 'react';
import { GraduationCap, UserCheck, Building, CheckCircle, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface RoleExperienceProps {
  onOpenLogin: (role?: UserRole) => void;
}

export const RoleExperience: React.FC<RoleExperienceProps> = ({ onOpenLogin }) => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');

  const rolesData = {
    student: {
      title: 'For Students',
      badge: 'Mobile App Experience',
      icon: GraduationCap,
      description: 'Empower students with real-time clarity into their subject percentages and attendance standing.',
      points: [
        'Instant live attendance status updates',
        'Subject-wise breakdown & standing percentages',
        'Low attendance (sub-75%) warning alerts',
        'Weekly interactive timetable schedule',
        'Digital attendance correction requests',
      ],
      roleKey: 'student' as UserRole,
      ctaText: 'Launch Student Demo Portal',
    },
    teacher: {
      title: 'For Teachers',
      badge: 'Faculty Web Experience',
      icon: UserCheck,
      description: 'Streamline classroom attendance marking so teachers focus on instruction, not paperwork.',
      points: [
        'View today’s scheduled class sessions',
        '1-click bulk toggle attendance marking',
        'Mark Present, Absent, Late, or Excused',
        'Zero-latency PostgreSQL submission',
        'Historical session log & attendance history',
      ],
      roleKey: 'teacher' as UserRole,
      ctaText: 'Launch Teacher Demo Portal',
    },
    admin: {
      title: 'For College Management',
      badge: 'Admin Command Center',
      icon: Building,
      description: 'Centralized governance portal for managing academic structures, faculty, roster CSV imports, and audit logs.',
      points: [
        'Bulk student onboarding via CSV engine',
        'Manage Departments, Courses, Batches, & Sections',
        'Timetable scheduling with conflict engine',
        'Institutional PDF/CSV compliance report export',
        'Immutable administrative audit trail logs',
      ],
      roleKey: 'admin' as UserRole,
      ctaText: 'Launch College Admin Portal',
    },
  };

  const current = rolesData[activeTab];
  const Icon = current.icon;

  return (
    <section id="roles" className="py-16 sm:py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            Tailored Experiences
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Designed for Every Stakeholder
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose your role to experience AttendX in action.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-slate-800 gap-2">
            {(['student', 'teacher', 'admin'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === key
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {key === 'student' ? 'Students' : key === 'teacher' ? 'Teachers' : 'College Management'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Role Card View */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase">
              <Icon className="w-3.5 h-3.5" />
              <span>{current.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white">{current.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{current.description}</p>

            <div className="space-y-2 pt-2">
              {current.points.map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenLogin(current.roleKey)}
                className="btn btn-primary py-3 px-6 text-xs font-bold flex items-center gap-2"
              >
                <span>{current.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-cyan-500/20 border border-indigo-500/30 flex items-center justify-center p-6 shadow-xl">
              <Icon className="w-24 h-24 text-indigo-400 opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
