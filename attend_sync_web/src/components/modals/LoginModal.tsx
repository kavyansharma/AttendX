import React, { useState } from 'react';
import { X, UserCheck, GraduationCap, School, ShieldAlert, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(selectedRole);
    }, 600);
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'student':
        return { label: 'Student Mobile App', icon: GraduationCap, bg: 'from-blue-600 to-indigo-600' };
      case 'teacher':
        return { label: 'Teacher Web Portal', icon: UserCheck, bg: 'from-indigo-600 to-violet-600' };
      case 'admin':
        return { label: 'College Admin Portal', icon: School, bg: 'from-violet-600 to-purple-600' };
      case 'super_admin':
        return { label: 'Super Admin Console', icon: ShieldAlert, bg: 'from-purple-600 to-pink-600' };
    }
  };

  const currentBadge = getRoleBadge(selectedRole);
  const BadgeIcon = currentBadge.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
            <UserCheck className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-black text-white">Welcome Back</h3>
          <p className="text-xs text-slate-400 mt-1">Select your role to access your AttendSync portal</p>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('student');
              setEmail('rahul.verma@apextech.edu');
              setPassword('••••••••');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'student'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Student</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('teacher');
              setEmail('dr.kumar@apextech.edu');
              setPassword('••••••••');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'teacher'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Teacher</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRole('admin');
              setEmail('admin@apextech.edu');
              setPassword('••••••••');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'admin'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Selected Scope:</span>
            <span className="font-bold text-indigo-400 flex items-center gap-1">
              <BadgeIcon className="w-3.5 h-3.5" />
              {currentBadge.label}
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {selectedRole === 'student' ? 'Roll Number / Email' : 'Institutional Email'}
            </label>
            <input
              type="text"
              required
              placeholder={selectedRole === 'student' ? '2024-CSE-042 or email' : 'faculty@apextech.edu'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <a href="#" className="text-[11px] font-semibold text-indigo-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 font-bold text-sm"
            >
              {loading ? 'Authenticating...' : `Enter ${selectedRole.toUpperCase()} Dashboard`}
              {!loading && <ArrowRight className="w-4 h-4 ml-1" />}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-500 mt-5">
          Protected by Supabase Row Level Security & 256-bit SSL encryption.
        </p>
      </div>
    </div>
  );
};
