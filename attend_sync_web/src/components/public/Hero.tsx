import React from 'react';
import { ArrowRight, CheckCircle2, Radio, BookOpen, ShieldCheck, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  return (
    <section className="relative py-12 lg:py-20 bg-[#F8FAFC] overflow-hidden">
      {/* Decorative ambient background blur (pointer-events-none, absolute) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00B8D9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2563EB]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Content & CTAs */}
          <div className="flex flex-col items-start space-y-6 text-left">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6FAFF] border border-[#00B8D9]/30 text-[#007A93] text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-[#00B8D9] animate-pulse" />
              <span>LIVE ATTENDANCE PLATFORM</span>
            </div>

            {/* Heading */}
            <h1 className="text-[32px] sm:text-[42px] lg:text-[56px] xl:text-[64px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1] max-w-[650px]">
              College Attendance, Synchronized in{' '}
              <span className="text-[#00B8D9] relative inline-block">
                Real Time.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#64748B] font-normal leading-relaxed max-w-[600px]">
              AttendX connects teachers, students, and college administrators through one simple attendance platform. Teachers update attendance once, and students see their attendance instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
              <button
                onClick={onOpenDemo}
                className="btn btn-primary py-3.5 px-7 text-base font-bold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-lg shadow-[#0B1F3A]/20 flex items-center justify-center gap-2 transition-all"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-5 h-5 text-[#00B8D9]" />
              </button>

              <a
                href="#how-it-works"
                className="btn btn-secondary py-3.5 px-6 text-base font-semibold text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100 text-center flex items-center justify-center gap-2"
              >
                <span>Explore AttendX</span>
              </a>
            </div>

            {/* Bullet Highlights */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-semibold text-[#0F172A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Live attendance updates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>Student transparency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                <span>College-wide analytics</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: AttendX Student Dashboard Mockup */}
          <div className="w-full">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Dashboard Header Bar */}
              <div className="bg-[#0B1F3A] text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
                    AttendX Student Dashboard
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00B8D9]/20 text-[#00B8D9] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#00B8D9] animate-ping" />
                  <span>LIVE UPDATED</span>
                </div>
              </div>

              {/* Dashboard Main Content */}
              <div className="p-6 space-y-6 bg-slate-50/50">
                {/* Overall Attendance Stat Card */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Overall Attendance
                    </span>
                    <div className="text-3xl font-extrabold text-[#0F172A]">
                      82.5%
                    </div>
                    <p className="text-xs text-slate-500">Above required 75% threshold</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#10B981] text-xs font-bold border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      SAFE
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">B.Tech CSE - Sec A</span>
                  </div>
                </div>

                {/* Subject Breakdown Cards Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Subject-wise Attendance
                  </h3>
                  <span className="text-xs font-semibold text-[#2563EB] flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Updated Just Now
                  </span>
                </div>

                {/* Subject Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Mathematics Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#10B981]">85%</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">Mathematics</div>
                      <div className="text-xs text-slate-500">34 / 40 Attended</div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#2563EB] h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Physics Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00B8D9] flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#F59E0B]">78%</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">Physics</div>
                      <div className="text-xs text-slate-500">28 / 36 Attended</div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#00B8D9] h-2 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>

                  {/* Computer Science Card */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#0B1F3A] flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#10B981]">91%</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0F172A]">Computer Sci</div>
                      <div className="text-xs text-slate-500">41 / 45 Attended</div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-[#0B1F3A] h-2 rounded-full" style={{ width: '91%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
