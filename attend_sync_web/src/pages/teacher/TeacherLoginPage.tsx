import React, { useState } from 'react';
import { UserCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff, Sparkles, ShieldCheck } from 'lucide-react';
import { TeacherService } from '../../services/teacherService';
import { TeacherProfileData } from '../../types/teacher';

interface TeacherLoginPageProps {
  onLoginSuccess: (teacher: TeacherProfileData) => void;
  onNavigateHome?: () => void;
}

export const TeacherLoginPage: React.FC<TeacherLoginPageProps> = ({
  onLoginSuccess,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('aris.thorne@attendx.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const teacherProfile = await TeacherService.login(email, password);
      onLoginSuccess(teacherProfile);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoQuickLogin = async () => {
    setEmail('aris.thorne@attendx.edu');
    setPassword('password123');
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const teacherProfile = await TeacherService.login('aris.thorne@attendx.edu', 'password123');
      onLoginSuccess(teacherProfile);
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between font-sans antialiased">
      {/* Top Header Bar */}
      <header className="px-6 py-5 bg-white border-b border-slate-200 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center shadow-md">
            <UserCheck className="w-5 h-5 text-[#00B8D9]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#0B1F3A]">
              Attend<span className="text-[#00B8D9]">X</span>
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500 -mt-1">
              Teacher Portal
            </span>
          </div>
        </a>

        <a
          href="/"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="text-xs font-semibold text-slate-600 hover:text-[#0B1F3A]"
        >
          ← Back to Marketing Site
        </a>
      </header>

      {/* Main Login Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          {/* Card Wrapper */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            {/* Title Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#0B1F3A] text-[#00B8D9] flex items-center justify-center mx-auto shadow-md">
                <UserCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Teacher Portal
              </h1>
              <p className="text-sm text-[#64748B] font-normal">
                Manage your classes and attendance in one place.
              </p>
            </div>

            {/* Error Alert Box */}
            {errorMessage && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Teacher Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dr.thorne@attendx.edu"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary py-3.5 text-sm font-bold bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-lg shadow-[#0B1F3A]/10 flex justify-center items-center gap-2 transition-all mt-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Signing In...</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Teacher Portal</span>
                    <ArrowRight className="w-4 h-4 text-[#00B8D9]" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Box */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="text-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Quick Demo Access
              </div>
              <button
                onClick={handleDemoQuickLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-[#E6FAFF] border border-[#00B8D9]/30 text-[#007A93] hover:bg-[#D1F5FF] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#00B8D9]" />
                <span>Instant Demo Teacher Sign In (Dr. Aris Thorne)</span>
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Protected by Supabase Row-Level Security</span>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <h3 className="text-lg font-extrabold text-[#0F172A]">Password Reset</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Teacher password resets must be issued by your institution's College Administrator. Please contact your IT Department or Academic Office.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="w-full btn btn-primary py-2.5 text-xs font-bold bg-[#0B1F3A] text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} AttendX Platform. Teacher Portal Access.
      </footer>
    </div>
  );
};
