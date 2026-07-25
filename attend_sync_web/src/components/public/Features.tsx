import React from 'react';
import { 
  Zap, Smartphone, UserCheck, GraduationCap, Building, BarChart3, 
  FileText, Clock, ShieldCheck, Lock, Layers, Database 
} from 'lucide-react';

export const Features: React.FC = () => {
  const list = [
    { icon: Zap, title: 'Live Attendance Marking', desc: 'Faculty marks class attendance in seconds with quick bulk toggles on any device.' },
    { icon: Smartphone, title: 'Real-Time Student Updates', desc: 'Students receive instant WebSocket updates and recalculated standing percentages.' },
    { icon: UserCheck, title: 'Teacher Web Portal', desc: 'Dedicated portal for teachers to view today’s class timetable and past session history.' },
    { icon: GraduationCap, title: 'Student Mobile App', desc: 'Flutter cross-platform app providing low-attendance warnings and correction requests.' },
    { icon: Building, title: 'College Admin Portal', desc: 'Centralized operational source of truth for academic hierarchy and master records.' },
    { icon: BarChart3, title: 'Smart Attendance Analytics', desc: 'Real-time department-wise, section-wise, and subject-wise compliance dashboards.' },
    { icon: FileText, title: 'Attendance Reports & Exports', desc: 'Generate and export official PDF/CSV attendance rosters for university submissions.' },
    { icon: Clock, title: 'Timetable Management', desc: 'Configure time slots with built-in conflict detection for faculty and sections.' },
    { icon: ShieldCheck, title: 'Immutable Audit Trail', desc: 'Automatic PostgreSQL triggers record all administrative creation and edit actions.' },
    { icon: Lock, title: 'Role-Based Access Control', desc: 'Strict permission boundaries separating Student, Teacher, and College Admin roles.' },
    { icon: Layers, title: 'Multi-Tenant Architecture', desc: 'Complete institutional data isolation supporting multiple colleges and campuses.' },
    { icon: Database, title: 'Secure Supabase PostgreSQL', desc: 'Powered by enterprise-grade PostgreSQL with Row Level Security (RLS) enforcement.' },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1 rounded-full">
            Comprehensive Capabilities
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Built for Modern Educational Institutions
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything your college needs to manage live attendance, ensure compliance, and streamline administrative workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-indigo-500/30 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
