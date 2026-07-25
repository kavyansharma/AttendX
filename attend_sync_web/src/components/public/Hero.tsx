import React from 'react';
import { ArrowRight, Zap, PlayCircle, CheckCircle2 } from 'lucide-react';
import { LiveProductPreview } from './LiveProductPreview';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <section className="relative py-10 lg:py-16 bg-slate-950 overflow-hidden">
      {/* Background Glows (decorative pointer-events-none) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[300px] sm:w-[350px] h-[300px] sm:h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-extrabold uppercase tracking-wide">
              <Zap className="w-3.5 h-3.5" />
              <span>Next-Gen College Attendance Ecosystem</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]">
              College Attendance, <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
                Synchronized.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              AttendX connects students, faculty, and college administrators in one secure platform — giving everyone instant, real-time visibility into attendance statistics.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenDemo}
                className="btn btn-primary py-3.5 px-7 text-sm font-bold shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#live-preview"
                className="btn btn-secondary py-3.5 px-6 text-sm font-semibold border-slate-800 text-center flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-4 h-4 text-indigo-400" />
                <span>See Live Interactive Demo</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Supabase PostgreSQL Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Real-Time Attendance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Multi-Tenant Architecture</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Product Preview Mockup */}
          <div className="lg:col-span-6 w-full min-w-0">
            <LiveProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
};
