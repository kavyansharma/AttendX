import React from 'react';
import { ShieldCheck, Lock, Database, FileText, Key, Server } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityItems = [
    {
      icon: Lock,
      title: 'PostgreSQL Row Level Security (RLS)',
      desc: 'Permissions are enforced at the database engine level so students can never read or mutate sibling records.',
    },
    {
      icon: Key,
      title: 'Role-Based Authorization',
      desc: 'Strict tenant boundaries isolate colleges, departments, faculty profiles, and student access keys.',
    },
    {
      icon: FileText,
      title: 'Immutable Audit Trail',
      desc: 'Every session creation, student status mark, edit, or correction request is logged with timestamp, user ID, and IP.',
    },
    {
      icon: Server,
      title: 'Enterprise Supabase Infrastructure',
      desc: 'High-availability hosted database clusters with automated daily backups, point-in-time recovery, and 256-bit TLS encryption.',
    },
  ];

  return (
    <section id="security" className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            Data Protection Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Your College Data. Protected.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Designed with security and data ownership in mind — ensuring complete institutional control over student attendance records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {securityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
