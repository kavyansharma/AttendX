import React, { useState } from 'react';
import { TeacherSidebar } from './TeacherSidebar';
import { TeacherHeader } from './TeacherHeader';
import { TeacherProfileData } from '../../types/teacher';
import { X } from 'lucide-react';

interface TeacherLayoutProps {
  activePath: string;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  teacher: TeacherProfileData | null;
  children: React.ReactNode;
}

export const TeacherLayout: React.FC<TeacherLayoutProps> = ({
  activePath,
  onNavigate,
  onLogout,
  teacher,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-[#0F172A] font-sans antialiased overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0">
        <TeacherSidebar
          activePath={activePath}
          onNavigate={onNavigate}
          onLogout={onLogout}
          teacher={teacher}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 max-w-full h-full bg-[#0B1F3A] flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Close Navigation Drawer"
            >
              <X className="w-5 h-5" />
            </button>
            <TeacherSidebar
              activePath={activePath}
              onNavigate={onNavigate}
              onLogout={onLogout}
              teacher={teacher}
              onCloseMobile={() => setMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TeacherHeader
          teacher={teacher}
          onLogout={onLogout}
          onToggleMobileSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
};
