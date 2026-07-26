import React from 'react';
import { ShieldCheck, Lock, FileKey2, Building, Server } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const securityFeatures = [
    {
      title: 'Role-Based Access Control (RBAC)',
      description:
        'Granular permissions ensure students, teachers, department heads, and super administrators only access authorized features.',
      icon: Lock,
    },
    {
      title: 'Row-Level Security (RLS)',
      description:
        'Powered by Supabase PostgreSQL Row Level Security. Data queries are strictly scoped at the database engine level.',
      icon: ShieldCheck,
    },
    {
      title: 'Immutable Audit Trails',
      description:
        'Every attendance marking event, time log, and manual correction is recorded in cryptographically verifiable audit logs.',
      icon: FileKey2,
    },
    {
      title: 'Institution-Level Isolation',
      description:
        'Multi-tenant architecture ensures complete data separation between different college campuses and departments.',
      icon: Building,
    },
  ];

  return (
    <section id="security" className="py-16 lg:py-24 bg-[#F8FAFC]">
      <div className="container-custom space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Server className="w-3.5 h-3.5" />
            <span>ENTERPRISE SECURITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Your College Data. Secure and Controlled.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Built from the ground up with military-grade database security, strict access controls, and transparent audit logging.
          </p>
        </div>

        {/* 4 Security Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityFeatures.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] text-[#00B8D9] flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#0F172A]">{sec.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{sec.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
