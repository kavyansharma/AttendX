import React from 'react';
import { UserCheck, ShieldCheck, Mail, Globe, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Col 1 & 2 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Attend<span className="text-indigo-400">X</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The next-generation live attendance monitoring ecosystem for higher education institutions. Connecting students, teachers, and admins in real time.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-500">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-indigo-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Product */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Real-Time Sync</a></li>
              <li><a href="#demo-live" className="hover:text-white transition-colors">Student Mobile App</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Teacher Portal</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Admin Console</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security & RLS</a></li>
            </ul>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#roles" className="hover:text-white transition-colors">Student App Access</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">Faculty Login</a></li>
              <li><a href="#roles" className="hover:text-white transition-colors">College Admin Portal</a></li>
              <li><a href="#analytics" className="hover:text-white transition-colors">Audit & Reports</a></li>
            </ul>
          </div>

          {/* Col 5: Security */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Security</h4>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Grade</span>
              </div>
              <p className="text-slate-400">PostgreSQL Row Level Security, SSL encrypted WebSockets, and zero data leakage.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AttendX Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
