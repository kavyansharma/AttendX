import React from 'react';
import { UserCheck } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-left">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                AX
              </div>
              <span className="text-lg font-black text-white">
                Attend<span className="text-indigo-400">X</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium text-xs max-w-sm">
              College Attendance, Synchronized. Real-time attendance monitoring platform connecting students, faculty, and college management.
            </p>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider">Product</div>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#live-preview" className="hover:text-white transition-colors">Live Demo</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Role Portals</a></li>
            </ul>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider">Platform</div>
            <ul className="space-y-2">
              <li><a href="#roles" className="hover:text-white transition-colors">Students</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Teachers</a></li>
              <li><a href="/admin" className="hover:text-white transition-colors">College Admin</a></li>
            </ul>
          </div>

          {/* Column 3: Security & Company */}
          <div className="space-y-2.5">
            <div className="font-bold text-white uppercase text-[11px] tracking-wider">Security</div>
            <ul className="space-y-2">
              <li><a href="#security" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">PostgreSQL Security</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AttendX Platform. All rights reserved. Apex Institute of Technology Deployment.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">Security Audit</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
