import React from 'react';
import { LayoutDashboard, BookOpen, User, UserCheck, LogOut, ShieldCheck } from 'lucide-react';
import { TeacherProfileData } from '../../types/teacher';

interface TeacherSidebarProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  teacher: TeacherProfileData | null;
  onCloseMobile?: () => void;
}

export const TeacherSidebar: React.FC<TeacherSidebarProps> = ({
  activePath,
  onNavigate,
  onLogout,
  teacher,
  onCloseMobile,
}) => {
  const navItems = [
    {
      label: 'Dashboard',
      path: '/teacher/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'My Classes',
      path: '/teacher/classes',
      icon: BookOpen,
    },
    {
      label: 'My Profile',
      path: '/teacher/profile',
      icon: User,
    },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className="w-64 bg-[#0B1F3A] text-white flex flex-col h-full shrink-0 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#123B66] flex items-center justify-center shadow-md">
          <UserCheck className="w-5 h-5 text-[#00B8D9]" />
        </div>
        <div>
          <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
            Attend<span className="text-[#00B8D9]">X</span>
          </span>
          <span className="block text-[10px] uppercase font-extrabold tracking-wider text-[#00B8D9] -mt-1">
            Teacher Portal
          </span>
        </div>
      </div>

      {/* Nav Menu Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activePath === item.path || (item.path === '/teacher/dashboard' && activePath === '/teacher');

          return (
            <button
              key={item.path}
              onClick={() => handleLinkClick(item.path)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-[#00B8D9] text-[#0B1F3A] font-bold shadow-md shadow-[#00B8D9]/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0B1F3A]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Profile Box & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-[#071527]">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-lg bg-slate-700 text-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
            {teacher?.fullName?.[0] || 'T'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">{teacher?.fullName || 'Dr. Aris Thorne'}</div>
            <div className="text-[10px] text-slate-400 truncate">{teacher?.departmentName || 'Computer Science'}</div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
          <span>Sign Out</span>
        </button>

        <div className="text-[10px] text-slate-500 text-center font-mono flex items-center justify-center gap-1 pt-1">
          <ShieldCheck className="w-3 h-3 text-[#10B981]" />
          <span>Verified Teacher Session</span>
        </div>
      </div>
    </aside>
  );
};
