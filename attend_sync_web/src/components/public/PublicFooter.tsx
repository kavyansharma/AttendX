import React from 'react';
import { UserCheck } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-[#0F172A] py-12 lg:py-16">
      <div className="container-custom space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center shadow-md">
                <UserCheck className="w-5 h-5 text-[#00B8D9]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-[#0B1F3A]">
                Attend<span className="text-[#00B8D9]">X</span>
              </span>
            </a>
            <p className="text-sm font-semibold text-slate-700">
              College Attendance, Synchronized.
            </p>
            <p className="text-xs text-[#64748B] leading-relaxed max-w-sm">
              AttendX connects students, faculty, and college administration with real-time attendance tracking and centralized institution compliance.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <a href="#features" className="hover:text-[#0B1F3A] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#0B1F3A] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#for-students" className="hover:text-[#0B1F3A] transition-colors">
                  For Students
                </a>
              </li>
              <li>
                <a href="#for-teachers" className="hover:text-[#0B1F3A] transition-colors">
                  For Teachers
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <a href="#" className="hover:text-[#0B1F3A] transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B1F3A] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#live-demo" className="hover:text-[#0B1F3A] transition-colors">
                  Request Demo
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <a href="#" className="hover:text-[#0B1F3A] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0B1F3A] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-[#0B1F3A] transition-colors">
                  Security & Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {new Date().getFullYear()} AttendX Platform. All rights reserved.</p>
          <p>Built with precision for modern college ecosystems.</p>
        </div>
      </div>
    </footer>
  );
};
