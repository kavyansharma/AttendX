import React, { useState } from 'react';
import { UserCheck, School, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@apextech.edu');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/30">
            <UserCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Attend<span className="text-indigo-400">X</span> Admin Portal
          </h1>
          <p className="text-xs text-slate-400">
            College Operational Source of Truth Login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Administrator Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3.5 text-sm font-bold shadow-xl shadow-indigo-600/30"
            >
              {loading ? 'Authenticating...' : 'Enter Admin Console'}
              {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </form>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Protected by PostgreSQL Row Level Security</span>
        </div>
      </div>
    </div>
  );
};
