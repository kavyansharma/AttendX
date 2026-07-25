import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Users, PlayCircle, CheckCircle2 } from 'lucide-react';
import { LiveDashboardPreview } from './LiveDashboardPreview';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-950">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>Next-Gen College Attendance Ecosystem</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            College Attendance, <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Synchronized Live.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            AttendSync connects students, faculty, and college administrators in one secure platform — giving everyone instant real-time visibility into attendance statistics.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto btn btn-primary py-3.5 px-8 text-base font-bold shadow-xl shadow-indigo-600/25"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#demo-live"
              className="w-full sm:w-auto btn btn-secondary py-3.5 px-6 text-base font-semibold border-slate-700"
            >
              <PlayCircle className="w-5 h-5 text-indigo-400" />
              <span>See Live Interactive Demo</span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Supabase PostgreSQL Security</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Zero Attendance Delay</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Multi-Tenant Architecture</span>
            </div>
          </div>
        </div>

        {/* Dashboard Mockup Component */}
        <div className="mt-14 max-w-5xl mx-auto">
          <LiveDashboardPreview />
        </div>
      </div>
    </section>
  );
};
