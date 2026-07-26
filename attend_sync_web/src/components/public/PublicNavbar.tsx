import React, { useState } from 'react';
import { UserCheck, Menu, X, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

interface PublicNavbarProps {
  onOpenDemo: () => void;
  onOpenLogin: (role?: UserRole) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ onOpenDemo, onOpenLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all w-full h-[72px] flex items-center">
      <div className="container-custom flex items-center justify-between gap-6 w-full">
        {/* LEFT: AttendX Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center shadow-md group-hover:bg-[#123B66] transition-colors">
            <UserCheck className="w-5 h-5 text-[#00B8D9]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#0B1F3A] leading-tight">
              Attend<span className="text-[#00B8D9]">X</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 -mt-0.5">
              College Attendance
            </span>
          </div>
        </a>

        {/* CENTER / RIGHT: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          <a
            href="#features"
            className="text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] transition-colors"
          >
            How It Works
          </a>
          <a
            href="#for-students"
            className="text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] transition-colors"
          >
            For Students
          </a>
          <a
            href="#for-teachers"
            className="text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] transition-colors"
          >
            For Teachers
          </a>
          <a
            href="#for-colleges"
            className="text-sm font-semibold text-slate-600 hover:text-[#0B1F3A] transition-colors"
          >
            For Colleges
          </a>
        </nav>

        {/* RIGHT: CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenLogin()}
            className="text-sm font-semibold text-slate-700 hover:text-[#0B1F3A] px-4 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm"
          >
            Sign In
          </button>
          <button
            onClick={onOpenDemo}
            className="btn btn-primary text-sm py-2 px-4 font-bold flex items-center gap-1.5 bg-[#0B1F3A] hover:bg-[#123B66] text-white shadow-sm"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-4 h-4 text-[#00B8D9]" />
          </button>
        </div>

        {/* MOBILE: Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-[72px] left-0 right-0 bg-white border-b border-slate-200 shadow-xl lg:hidden px-6 py-6 space-y-4 text-sm z-[999] animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#0B1F3A] py-2 font-semibold border-b border-slate-100"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#0B1F3A] py-2 font-semibold border-b border-slate-100"
            >
              How It Works
            </a>
            <a
              href="#for-students"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#0B1F3A] py-2 font-semibold border-b border-slate-100"
            >
              For Students
            </a>
            <a
              href="#for-teachers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#0B1F3A] py-2 font-semibold border-b border-slate-100"
            >
              For Teachers
            </a>
            <a
              href="#for-colleges"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#0B1F3A] py-2 font-semibold border-b border-slate-100"
            >
              For Colleges
            </a>
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full text-center py-2.5 rounded-lg border border-slate-200 text-slate-800 font-semibold bg-slate-50 hover:bg-slate-100"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full btn btn-primary py-2.5 text-sm font-bold bg-[#0B1F3A] text-white flex justify-center items-center gap-2"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4 text-[#00B8D9]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
