import React from 'react';
import { ShieldCheck, Lock, Database, Layers, Eye, KeyRound } from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const items = [
    { icon: Database, title: 'Supabase PostgreSQL', desc: 'Enterprise-grade relational database hosting with high availability and automated snapshots.' },
    { icon: ShieldCheck, title: 'Row Level Security (RLS)', desc: 'Database-level isolation policy rules enforcing tenant and role access boundaries.' },
    { icon: Lock, title: 'Role-Based Access Control', desc: 'Strict permission guardrails ensuring Students, Teachers, and Admins access only authorized data.' },
    { icon: Layers, title: 'Multi-Tenant Isolation', desc: 'Data is strictly partitioned by college identifier to protect institutional privacy.' },
    { icon: Eye, title: 'Immutable Audit Trail', desc: 'Automatic PostgreSQL triggers record all administrative actions for regulatory compliance.' },
    { icon: KeyRound, title: 'Encrypted Transits & Auth', desc: 'TLS/SSL transport layer security and JWT token-based authentication session management.' },
  ];

  return (
    <section id="security" className="py-16 sm:py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 rounded-full">
            Institutional Governance
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Built for Institutional Security.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Protecting student data and institutional records with bank-grade database security policies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800/90 hover:border-emerald-500/30 transition-all space-y-3 group text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{sec.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
