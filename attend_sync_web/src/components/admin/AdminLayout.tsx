import React, { useState } from 'react';
import { 
  Building, BookOpen, Calendar, Clock, Layers, Grid, Users, GraduationCap, 
  UserCheck, ShieldCheck, FileText, Settings, LogOut, ChevronRight, Menu, X, 
  Search, Bell, User
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  activePath,
  onNavigate,
  onLogout,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: Grid },
    { label: 'Departments', path: '/admin/departments', icon: Building },
    { label: 'Courses', path: '/admin/courses', icon: BookOpen },
    { label: 'Academic Years', path: '/admin/academic-years', icon: Calendar },
    { label: 'Semesters', path: '/admin/semesters', icon: Clock },
    { label: 'Batches', path: '/admin/batches', icon: Layers },
    { label: 'Sections', path: '/admin/sections', icon: Grid },
    { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
    { label: 'Teachers', path: '/admin/teachers', icon: UserCheck },
    { label: 'Students', path: '/admin/students', icon: GraduationCap },
    { label: 'Subject Assignments', path: '/admin/assignments', icon: UserCheck },
    { label: 'Timetable', path: '/admin/timetable', icon: Clock },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldCheck },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0 hidden md:flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-600/30">
            AX
          </div>
          <div>
            <div className="font-black text-lg text-white tracking-tight">
              Attend<span className="text-indigo-400">X</span>
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Admin Portal</div>
          </div>
        </div>

        {/* College Scope Badge */}
        <div className="p-3 mx-4 my-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium truncate">Apex Tech College</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-2 font-semibold">
              <span>Admin</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white capitalize">
                {activePath.split('/')[2] || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Global Search..."
                className="bg-transparent text-white focus:outline-none text-xs w-36"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-300">
                AD
              </div>
              <div className="hidden md:block text-left text-xs">
                <div className="font-bold text-white">Administrator</div>
                <div className="text-[10px] text-slate-400">admin@apextech.edu</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
