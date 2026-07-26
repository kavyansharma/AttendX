import React, { useState, useEffect } from 'react';
import { UserCheck, CheckCircle2, XCircle, Bell, Zap, Shield, Smartphone } from 'lucide-react';

export const LiveProductPreview: React.FC = () => {
  // Live simulation state
  const [arjunStatus, setArjunStatus] = useState<'Present' | 'Absent'>('Present');
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('Just now');

  // Toggle Arjun's attendance every 4 seconds to demonstrate real-time sync
  useEffect(() => {
    const interval = setInterval(() => {
      setArjunStatus((prev) => (prev === 'Present' ? 'Absent' : 'Present'));
      setLastUpdatedTime('Just now');
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="live-demo" className="py-16 lg:py-24 bg-[#0B1F3A] text-white overflow-hidden relative">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00B8D9]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B8D9]/20 text-[#00B8D9] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL-TIME SYNCHRONIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-tight">
            Attendance Updates. The Moment They Happen.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Watch how a single tap on the teacher dashboard updates the student status instantly.
          </p>
        </div>

        {/* 2-Column Grid: Left Teacher Panel | Right Student Notification Sync */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Teacher Dashboard Panel (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-[#123B66]/80 rounded-2xl border border-slate-700/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#00B8D9]" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                      Teacher Live Session
                    </span>
                  </div>
                  <div className="text-xl font-bold text-white">Class: B.Tech CSE — Section A</div>
                  <div className="text-sm font-semibold text-[#00B8D9]">Subject: Physics</div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>SESSION ACTIVE</span>
                </div>
              </div>

              {/* Roster List */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Student Roster
                </div>

                <div className="space-y-2.5">
                  {/* Rahul */}
                  <div className="bg-[#0B1F3A] p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold">
                        R
                      </div>
                      <span className="text-sm font-semibold text-white">Rahul Sharma</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Present
                    </span>
                  </div>

                  {/* Priya */}
                  <div className="bg-[#0B1F3A] p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold">
                        P
                      </div>
                      <span className="text-sm font-semibold text-white">Priya Patel</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Present
                    </span>
                  </div>

                  {/* Arjun (Toggles automatically) */}
                  <div className="bg-[#0B1F3A] p-3.5 rounded-xl border border-[#00B8D9]/60 flex items-center justify-between transition-all shadow-lg shadow-[#00B8D9]/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00B8D9] text-[#0B1F3A] flex items-center justify-center text-xs font-bold">
                        A
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-white">Arjun Kumar</span>
                        <span className="block text-[10px] text-[#00B8D9] font-mono">Simulating live toggle...</span>
                      </div>
                    </div>
                    {arjunStatus === 'Present' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Present
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold flex items-center gap-1.5 border border-rose-500/30">
                        <XCircle className="w-3.5 h-3.5" />
                        Absent
                      </span>
                    )}
                  </div>

                  {/* Neha */}
                  <div className="bg-[#0B1F3A] p-3.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold">
                        N
                      </div>
                      <span className="text-sm font-semibold text-white">Neha Verma</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Present
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-300 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#00B8D9]" />
              <span>Session changes are immediately signed and pushed to Supabase PostgreSQL</span>
            </div>
          </div>

          {/* RIGHT: Live Animated Student Sync Device Mockup (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-[#071527] rounded-2xl border border-slate-700/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#00B8D9]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                    Student App Sync
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Arjun's Phone</span>
              </div>

              {/* Notification Card */}
              <div className="space-y-4">
                <div className="bg-[#0B1F3A] p-5 rounded-xl border border-[#00B8D9]/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#00B8D9]/20 text-[#00B8D9] flex items-center justify-center">
                        <Bell className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-white">Attendance Updated</span>
                    </div>
                    <span className="text-[11px] text-[#00B8D9] font-medium">{lastUpdatedTime}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-base font-bold text-white">Physics</div>
                    <div className="text-xs text-slate-300">Prof. Dr. Mehta • B.Tech CSE Sec A</div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Status:</span>
                    {arjunStatus === 'Present' ? (
                      <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Present
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                        <XCircle className="w-3.5 h-3.5" />
                        Absent
                      </span>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-[#123B66]/40 p-4 rounded-xl border border-slate-700/40 text-xs text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white font-semibold">Zero Latency:</strong> As soon as the teacher marks attendance, the record updates instantly across the mobile app & college administration dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Real-Time WebSocket Sync Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
