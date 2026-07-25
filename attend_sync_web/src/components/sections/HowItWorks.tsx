import React from 'react';
import { UserCheck, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900/40 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            3-Step Simplicity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How AttendSync Works in 3 Seconds
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No complex setup or hardware scanners required. Works on any faculty laptop, tablet, or smartphone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Teacher Marks Class</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Teacher logs into web portal, chooses today’s scheduled timetable session, and marks students present or absent with quick bulk toggles.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Attendance Synchronizes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Records are committed to PostgreSQL database with Row Level Security validation and instantly broadcast via Supabase Realtime WebSockets.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 relative">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Students See Updates</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Students receive live dashboard updates, recomputed subject percentages, and push notifications if falling below target thresholds.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
