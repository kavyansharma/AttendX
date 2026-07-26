import React, { useState, useEffect } from 'react';
import { PublicNavbar } from './components/public/PublicNavbar';
import { PublicFooter } from './components/public/PublicFooter';
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

// Teacher Portal Components
import { TeacherLayout } from './components/teacher/TeacherLayout';
import { TeacherLoginPage } from './pages/teacher/TeacherLoginPage';
import { TeacherDashboardPage } from './pages/teacher/TeacherDashboardPage';
import { TeacherClassesPage } from './pages/teacher/TeacherClassesPage';
import { TeacherProfilePage } from './pages/teacher/TeacherProfilePage';
import { TeacherAttendanceSessionPage } from './pages/teacher/TeacherAttendanceSessionPage';
import { TeacherService } from './services/teacherService';
import { AttendanceService } from './services/attendanceService';
import { TeacherProfileData, TodayClass } from './types/teacher';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);

  // Admin routing state
  const [currentAdminPath, setCurrentAdminPath] = useState<string>(
    window.location.pathname.startsWith('/admin') ? window.location.pathname : ''
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);

  // Teacher routing & auth state
  const [currentTeacherPath, setCurrentTeacherPath] = useState<string>(
    window.location.pathname.startsWith('/teacher') ? window.location.pathname : ''
  );
  const [teacherSession, setTeacherSession] = useState<TeacherProfileData | null>(
    TeacherService.getActiveSession()
  );

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setCurrentAdminPath(path);
        setCurrentTeacherPath('');
      } else if (path.startsWith('/teacher')) {
        setCurrentTeacherPath(path);
        setCurrentAdminPath('');
      } else {
        setCurrentAdminPath('');
        setCurrentTeacherPath('');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateAdmin = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentAdminPath(path);
    setCurrentTeacherPath('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTeacher = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentTeacherPath(path);
    setCurrentAdminPath('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLogin = (role?: UserRole) => {
    if (role === 'teacher') {
      navigateTeacher('/teacher/login');
      return;
    }
    if (role) setActiveRole(null);
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (role: UserRole) => {
    setLoginModalOpen(false);
    if (role === 'admin' || role === 'super_admin') {
      setIsAdminLoggedIn(true);
      navigateAdmin('/admin');
    } else if (role === 'teacher') {
      const session = TeacherService.getActiveSession();
      setTeacherSession(session);
      navigateTeacher('/teacher/dashboard');
    } else {
      setActiveRole(role);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleTeacherLoginSuccess = (teacherProfile: TeacherProfileData) => {
    setTeacherSession(teacherProfile);
    navigateTeacher('/teacher/dashboard');
  };

  const handleTeacherLogout = async () => {
    await TeacherService.logout();
    setTeacherSession(null);
    navigateTeacher('/teacher/login');
  };

  const handleLogout = () => {
    setActiveRole(null);
    setCurrentAdminPath('');
    setCurrentTeacherPath('');
    setTeacherSession(null);
    window.history.pushState({}, '', '/');
  };

  // Start or resume attendance session callback
  const handleStartAttendanceSession = async (cls: TodayClass) => {
    const session = TeacherService.getActiveSession() || teacherSession;
    if (!session) return;
    const sessionDetails = await AttendanceService.startOrResumeSession(cls, session);
    navigateTeacher(`/teacher/attendance/${sessionDetails.id}`);
  };

  // IF IN TEACHER PORTAL ROUTE SPACE
  if (currentTeacherPath.startsWith('/teacher')) {
    // If not authenticated and trying to access protected teacher routes, redirect to login
    if (!teacherSession && currentTeacherPath !== '/teacher/login') {
      return (
        <TeacherLoginPage
          onLoginSuccess={handleTeacherLoginSuccess}
          onNavigateHome={() => handleLogout()}
        />
      );
    }

    if (currentTeacherPath === '/teacher/login') {
      return (
        <TeacherLoginPage
          onLoginSuccess={handleTeacherLoginSuccess}
          onNavigateHome={() => handleLogout()}
        />
      );
    }

    let teacherContent = (
      <TeacherDashboardPage
        teacher={teacherSession}
        onStartAttendanceSession={handleStartAttendanceSession}
      />
    );

    if (currentTeacherPath.startsWith('/teacher/attendance/')) {
      const sessionId = currentTeacherPath.replace('/teacher/attendance/', '');
      teacherContent = (
        <TeacherAttendanceSessionPage
          sessionId={sessionId}
          teacher={teacherSession}
          onNavigateBack={() => navigateTeacher('/teacher/dashboard')}
        />
      );
    } else {
      switch (currentTeacherPath) {
        case '/teacher':
        case '/teacher/dashboard':
          teacherContent = (
            <TeacherDashboardPage
              teacher={teacherSession}
              onStartAttendanceSession={handleStartAttendanceSession}
            />
          );
          break;
        case '/teacher/classes':
          teacherContent = (
            <TeacherClassesPage
              teacher={teacherSession}
              onStartAttendanceSession={handleStartAttendanceSession}
            />
          );
          break;
        case '/teacher/profile':
          teacherContent = <TeacherProfilePage teacher={teacherSession} />;
          break;
        default:
          teacherContent = (
            <TeacherDashboardPage
              teacher={teacherSession}
              onStartAttendanceSession={handleStartAttendanceSession}
            />
          );
      }
    }

    return (
      <TeacherLayout
        activePath={currentTeacherPath}
        onNavigate={navigateTeacher}
        onLogout={handleTeacherLogout}
        teacher={teacherSession}
      >
        {teacherContent}
      </TeacherLayout>
    );
  }

  // IF IN ADMIN ROUTE SPACE
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

  // Standard Public SaaS Website
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#2563EB] selection:text-white overflow-x-hidden">
      <PublicNavbar
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={handleOpenLogin}
      />

      <HomePage
        onOpenDemo={() => setDemoModalOpen(true)}
        onOpenLogin={handleOpenLogin}
      />

      <PublicFooter />

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
