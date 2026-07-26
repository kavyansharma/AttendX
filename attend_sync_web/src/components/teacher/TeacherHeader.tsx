import React from 'react';
import { Menu, LogOut, UserCheck, Bell } from 'lucide-react';
import { TeacherProfileData } from '../../types/teacher';

interface TeacherHeaderProps {
  teacher: TeacherProfileData | null;
  onLogout: () => void;
  onToggleMobileSidebar: () => void;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  teacher,
  onLogout,
  onToggleMobileSidebar,
}) => {
  // Determine greeting based on local time
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const teacherName = teacher?.fullName || 'Teacher';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Open Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Greeting & Title */}
        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            {greeting}, {teacherName}
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-medium">
            Here is your teaching schedule for today.
          </p>
        </div>
      </div>

      {/* Right Action Icons & Profile Info */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Notification Icon */}
        <button
          className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-[#0B1F3A] hover:bg-slate-200 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00B8D9]" />
        </button>

        {/* Teacher Avatar & Details */}
        <div className="hidden md:flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-9 h-9 rounded-xl bg-[#0B1F3A] text-[#00B8D9] flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden">
            {teacher?.avatarUrl ? (
              <img src={teacher.avatarUrl} alt={teacherName} className="w-full h-full object-cover" />
            ) : (
              <UserCheck className="w-5 h-5" />
            )}
          </div>
          <div className="text-left hidden lg:block">
            <div className="text-xs font-bold text-[#0F172A] leading-tight">{teacherName}</div>
            <div className="text-[11px] font-semibold text-[#00B8D9]">{teacher?.employeeId || 'Faculty'}</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="btn btn-secondary py-2 px-3 sm:px-4 text-xs font-bold text-rose-600 hover:bg-rose-50 border-rose-200 flex items-center gap-1.5 transition-colors"
          title="Sign Out of Teacher Portal"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};
