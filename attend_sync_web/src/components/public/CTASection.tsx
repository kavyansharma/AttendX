import React from 'react';
import { ArrowRight, UserCheck } from 'lucide-react';
import { UserRole } from '../../types';

interface CTASectionProps {
  onOpenDemo: () => void;
  onOpenLogin: (role?: UserRole) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto shadow-lg">
            <UserCheck className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Bring Your College Attendance Into Real Time.
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Give students visibility, teachers simplicity, and college management complete control.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto btn btn-primary py-3.5 px-8 text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenLogin('admin')}
              className="w-full sm:w-auto btn btn-secondary py-3.5 px-6 text-sm font-semibold border-slate-700"
            >
              <span>Explore AttendX Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
