import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPreviewPage } from './pages/DashboardPreviewPage';
import { DemoModal } from './components/modals/DemoModal';
import { LoginModal } from './components/modals/LoginModal';
import { UserRole } from './types';

// Admin Portal Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DepartmentsPage } from './pages/admin/DepartmentsPage';
import { CoursesPage } from './pages/admin/CoursesPage';
import { AcademicYearsPage } from './pages/admin/AcademicYearsPage';
import { SemestersPage } from './pages/admin/SemestersPage';
import { BatchesPage } from './pages/admin/BatchesPage';
import { SectionsPage } from './pages/admin/SectionsPage';
import { SubjectsPage } from './pages/admin/SubjectsPage';
import { TeachersPage } from './pages/admin/TeachersPage';
import { StudentsPage } from './pages/admin/StudentsPage';
import { AssignmentsPage } from './pages/admin/AssignmentsPage';
import { TimetablePage } from './pages/admin/TimetablePage';
import { ReportsPage } from './pages/admin/ReportsPage';
import { AuditLogsPage } from './pages/admin/AuditLogsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);

  // Admin routing state
  const [currentAdminPath, setCurrentAdminPath] = useState<string>(
    window.location.pathname.startsWith('/admin') ? window.location.pathname : ''
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/admin')) {
        setCurrentAdminPath(window.location.pathname);
      } else {
        setCurrentAdminPath('');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateAdmin = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentAdminPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = (role?: string) => {
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setLoginModalOpen(false);
    if (role === 'admin' || role === 'super_admin') {
      setIsAdminLoggedIn(true);
      navigateAdmin('/admin');
    } else {
      setActiveRole(role);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    setActiveRole(null);
    setCurrentAdminPath('');
    window.history.pushState({}, '', '/');
  };

  // If in Admin route space
  if (currentAdminPath.startsWith('/admin')) {
    if (!isAdminLoggedIn && currentAdminPath !== '/admin/login') {
      return <AdminLoginPage onLoginSuccess={() => setIsAdminLoggedIn(true)} />;
    }

    let adminPageContent = <AdminDashboard />;
    switch (currentAdminPath) {
      case '/admin':
      case '/admin/dashboard':
        adminPageContent = <AdminDashboard />;
        break;
      case '/admin/departments':
        adminPageContent = <DepartmentsPage />;
        break;
      case '/admin/courses':
        adminPageContent = <CoursesPage />;
        break;
      case '/admin/academic-years':
        adminPageContent = <AcademicYearsPage />;
        break;
      case '/admin/semesters':
        adminPageContent = <SemestersPage />;
        break;
      case '/admin/batches':
        adminPageContent = <BatchesPage />;
        break;
      case '/admin/sections':
        adminPageContent = <SectionsPage />;
        break;
      case '/admin/subjects':
        adminPageContent = <SubjectsPage />;
        break;
      case '/admin/teachers':
        adminPageContent = <TeachersPage />;
        break;
      case '/admin/students':
        adminPageContent = <StudentsPage />;
        break;
      case '/admin/assignments':
        adminPageContent = <AssignmentsPage />;
        break;
      case '/admin/timetable':
        adminPageContent = <TimetablePage />;
        break;
      case '/admin/reports':
        adminPageContent = <ReportsPage />;
        break;
      case '/admin/audit-logs':
        adminPageContent = <AuditLogsPage />;
        break;
      case '/admin/settings':
        adminPageContent = <SettingsPage />;
        break;
      default:
        adminPageContent = <AdminDashboard />;
    }

    return (
      <AdminLayout
        activePath={currentAdminPath}
        onNavigate={navigateAdmin}
        onLogout={handleLogout}
      >
        {adminPageContent}
      </AdminLayout>
    );
  }

  // Student / Teacher Demo Simulation View
  if (activeRole) {
    return <DashboardPreviewPage role={activeRole} onLogout={handleLogout} />;
  }

  // Standard Public Website
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <Navbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={handleOpenLogin}
      />

      <HomePage
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={handleOpenLogin}
      />

      <Footer />

      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
