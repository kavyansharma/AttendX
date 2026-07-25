import React, { useState } from 'react';
import { UserCheck, CheckCircle2, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

export const RealtimeDemo: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [physicsAttended, setPhysicsAttended] = useState(28);
  const [physicsTotal, setPhysicsTotal] = useState(36);
  const [physicsPercentage, setPhysicsPercentage] = useState(77.7);

  const triggerSubmission = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const newAttended = physicsAttended + 1;
      const newTotal = physicsTotal + 1;
      setPhysicsAttended(newAttended);
      setPhysicsTotal(newTotal);
      setPhysicsPercentage(parseFloat(((newAttended / newTotal) * 100).toFixed(1)));
    }, 700);
  };

  const resetDemo = () => {
    setSubmitted(false);
    setPhysicsAttended(28);
    setPhysicsTotal(36);
    setPhysicsPercentage(77.7);
  };

  return (
    <section id="demo-live" className="py-20 bg-slate-900 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            Live Simulation Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Experience Real-Time Attendance in Action
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click below to simulate Dr. Kumar submitting today’s Physics lecture attendance and watch the student app react in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Panel: Teacher Simulator */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">Teacher Portal View</span>
                <h3 className="text-lg font-bold text-white">Dr. Kumar — Physics Class</h3>
              </div>
              <span className="badge badge-info text-xs">CSE-2A Section</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span>Lecture Session</span>
                <span className="font-bold text-white">Physics 101 • 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span>Target Student</span>
                <span className="font-bold text-indigo-400">Rahul Verma (Roll #042)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span>Attendance Status</span>
                <span className="font-bold text-emerald-400">Present (Verified)</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={triggerSubmission}
                disabled={loading || submitted}
                className="flex-1 btn btn-primary py-3 font-bold text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Submitting & Syncing...
                  </span>
                ) : submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Attendance Synchronized!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4" /> Submit Class Attendance
                  </span>
                )}
              </button>
              {submitted && (
                <button
                  onClick={resetDemo}
                  className="btn btn-secondary py-3 px-4 text-xs font-semibold"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Right Panel: Student App Reactive View */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">Student App Live Screen</span>
                <h3 className="text-lg font-bold text-white">Rahul Verma’s Subject Card</h3>
              </div>
              {submitted ? (
                <span className="badge badge-success text-xs animate-pulse flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Updated Just Now
                </span>
              ) : (
                <span className="badge badge-warning text-xs">Waiting for Class...</span>
              )}
            </div>

            {/* Subject Card Simulation */}
            <div
              className={`p-5 rounded-xl border transition-all duration-500 ${
                submitted
                  ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-400">CS402 • Physics 101</span>
                <span className={`text-xl font-black ${submitted ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {physicsPercentage}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-700"
                  style={{ width: `${physicsPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Classes: {physicsAttended} / {physicsTotal}</span>
                <span className={submitted ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {submitted ? '+1 Present Added' : '77.7% Before Class'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center italic">
              Notice how the percentage automatically recomputes and pushes via WebSocket directly to the student’s phone screen!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
