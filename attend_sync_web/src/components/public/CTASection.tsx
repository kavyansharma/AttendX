import React from 'react';
import { ArrowRight, Mail } from 'lucide-react';

interface CTASectionProps {
  onOpenDemo: () => void;
  onOpenLogin: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenDemo, onOpenLogin }) => {
  return (
    <section className="py-20 lg:py-28 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B8D9]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-custom relative z-10 text-center max-w-[800px] mx-auto space-y-8">
        <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-white tracking-tight leading-tight">
          Ready to Make Attendance Smarter?
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-[650px] mx-auto">
          Bring real-time attendance visibility to your college with AttendX. Simplify teacher workflows, empower students, and digitize institution compliance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenDemo}
            className="btn btn-accent py-4 px-8 text-base font-bold bg-[#00B8D9] hover:bg-[#009BB5] text-[#0B1F3A] shadow-xl flex items-center justify-center gap-2"
          >
            <span>Request a Demo</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLogin}
            className="btn btn-secondary py-4 px-8 text-base font-semibold bg-white/10 hover:bg-white/20 text-white border-white/20 flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#00B8D9]" />
            <span>Contact Us / Portal Login</span>
          </button>
        </div>
      </div>
    </section>
  );
};
