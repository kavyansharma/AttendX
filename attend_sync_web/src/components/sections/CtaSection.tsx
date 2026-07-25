import React from 'react';
import { ArrowRight, UserCheck, CheckCircle2 } from 'lucide-react';

interface CtaSectionProps {
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-slate-900 to-cyan-900/20 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-indigo-600/30">
          <UserCheck className="w-8 h-8" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ready to Bring College Attendance Into Sync?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Give students transparency, teachers simplicity, and college management complete real-time visibility.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto btn btn-primary py-4 px-10 text-base font-bold shadow-2xl shadow-indigo-600/40"
          >
            <span>Request a Customized Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onOpenLogin}
            className="w-full sm:w-auto btn btn-secondary py-4 px-8 text-base font-semibold border-slate-700"
          >
            <span>Access Portal Login</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Fast Institutional Onboarding</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Hardware Scanners Needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Multi-Department Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};
