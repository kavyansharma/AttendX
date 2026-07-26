import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Clock, Users, BookOpen, Sparkles } from 'lucide-react';
import { TeacherStatCard } from '../../components/teacher/TeacherStatCard';
import { TodayClassCard } from '../../components/teacher/TodayClassCard';
import { UpcomingClassCard } from '../../components/teacher/UpcomingClassCard';
import { RecentActivity } from '../../components/teacher/RecentActivity';
import { TeacherService } from '../../services/teacherService';
import {
  TeacherProfileData,
  TodayClass,
  UpcomingClass,
  TeacherDashboardStats,
  TeacherActivity,
} from '../../types/teacher';

interface TeacherDashboardPageProps {
  teacher: TeacherProfileData | null;
  onStartAttendanceSession: (cls: TodayClass) => void;
}

export const TeacherDashboardPage: React.FC<TeacherDashboardPageProps> = ({
  teacher,
  onStartAttendanceSession,
}) => {
  const [stats, setStats] = useState<TeacherDashboardStats>({
    todayClassesCount: 4,
    completedCount: 2,
    upcomingCount: 2,
    totalStudentsCount: 184,
  });

  const [todayClasses, setTodayClasses] = useState<TodayClass[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([]);
  const [activities, setActivities] = useState<TeacherActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      const teacherId = teacher?.id || 'tch-001';

      try {
        const [dashStats, classesList, upcomingList, activityList] = await Promise.all([
          TeacherService.getDashboardStats(teacherId),
          TeacherService.getTodayClasses(teacherId),
          TeacherService.getUpcomingClasses(teacherId),
          TeacherService.getRecentActivities(teacherId),
        ]);

        setStats(dashStats);
        setTodayClasses(classesList);
        setUpcomingClasses(upcomingList);
        setActivities(activityList);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [teacher]);

  if (isLoading) {
    return (
      <div className="py-16 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-4 border-[#0B1F3A] border-t-[#00B8D9] animate-spin mx-auto" />
        <div className="text-sm font-bold text-slate-600">Loading your teaching schedule...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* SECTION 1: STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <TeacherStatCard
          title="Today's Classes"
          value={stats.todayClassesCount}
          subtitle="Scheduled sessions today"
          icon={Calendar}
          iconColor="text-[#2563EB]"
          bgColor="bg-blue-50"
        />

        <TeacherStatCard
          title="Completed"
          value={stats.completedCount}
          subtitle="Sessions conducted"
          icon={CheckCircle2}
          iconColor="text-[#10B981]"
          bgColor="bg-emerald-50"
        />

        <TeacherStatCard
          title="Upcoming"
          value={stats.upcomingCount}
          subtitle="Classes remaining"
          icon={Clock}
          iconColor="text-[#00B8D9]"
          bgColor="bg-cyan-50"
        />

        <TeacherStatCard
          title="Total Students"
          value={stats.totalStudentsCount}
          subtitle="Enrolled across sections"
          icon={Users}
          iconColor="text-[#0B1F3A]"
          bgColor="bg-indigo-50"
        />
      </div>

      {/* SECTION 2: MAIN GRID (Left Today's Classes | Right Sidebar Widgets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: TODAY'S CLASSES (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
                Today's Schedule
              </h2>
              <p className="text-xs text-[#64748B] font-medium">
                Select an upcoming class to prepare for roll call session
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6FAFF] text-[#007A93] text-xs font-bold border border-[#00B8D9]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#00B8D9]" />
              <span>Phase 3B Engine Active</span>
            </div>
          </div>

          {/* Today's Classes List */}
          {todayClasses.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
              <div className="text-sm font-bold text-slate-700">No classes scheduled for today.</div>
              <p className="text-xs text-slate-400">Enjoy your teaching break!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {todayClasses.map((cls) => (
                <TodayClassCard
                  key={cls.id}
                  cls={cls}
                  onStartSession={(item) => onStartAttendanceSession(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: UPCOMING WIDGET & RECENT ACTIVITY (4 cols on desktop) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Classes List Widget */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00B8D9]" />
                <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
                  Upcoming Classes
                </h3>
              </div>
              <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">
                {upcomingClasses.length} Next
              </span>
            </div>

            {upcomingClasses.length === 0 ? (
              <div className="text-xs text-[#64748B] italic py-2">
                No more upcoming classes scheduled today.
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingClasses.map((uCls) => (
                  <UpcomingClassCard key={uCls.id} cls={uCls} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity List */}
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
};
