import React, { useState, useEffect } from 'react';
import { BookOpen, Users, MapPin, Clock, Calendar } from 'lucide-react';
import { TeacherService } from '../../services/teacherService';
import { TeacherProfileData, TodayClass } from '../../types/teacher';
import { TodayClassCard } from '../../components/teacher/TodayClassCard';

interface TeacherClassesPageProps {
  teacher: TeacherProfileData | null;
}

export const TeacherClassesPage: React.FC<TeacherClassesPageProps> = ({ teacher }) => {
  const [classes, setClasses] = useState<TodayClass[]>([]);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadClasses() {
      setIsLoading(true);
      const teacherId = teacher?.id || 'tch-001';
      try {
        const list = await TeacherService.getTodayClasses(teacherId);
        setClasses(list);
      } catch (err) {
        console.error('Failed to load classes:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadClasses();
  }, [teacher]);

  const filteredClasses = classes.filter((c) => {
    if (activeFilter === 'COMPLETED') return c.status === 'COMPLETED';
    if (activeFilter === 'UPCOMING') return c.status === 'UPCOMING' || c.status === 'IN_PROGRESS';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            My Teaching Classes
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] font-medium">
            Overview of assigned subject timetables and section roll calls
          </p>
        </div>

        {/* Filter Pills */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeFilter === 'ALL'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            All Classes ({classes.length})
          </button>
          <button
            onClick={() => setActiveFilter('UPCOMING')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeFilter === 'UPCOMING'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter('COMPLETED')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              activeFilter === 'COMPLETED'
                ? 'bg-[#0B1F3A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-sm font-bold text-slate-500">
          Loading assigned classes...
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="text-base font-bold text-slate-700">No classes match the selected filter.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((cls) => (
            <TodayClassCard key={cls.id} cls={cls} />
          ))}
        </div>
      )}

      {/* Assigned Subjects Summary Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#00B8D9]" />
          <h3 className="text-base font-extrabold text-[#0F172A]">Allocated Course Workload</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(teacher?.assignedSubjects || []).map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-[#2563EB] text-xs font-bold">
                  {sub.code}
                </span>
                <span className="text-xs text-slate-400 font-mono">{sub.credits} Credits</span>
              </div>
              <div className="text-sm font-bold text-[#0F172A]">{sub.name}</div>
              <div className="text-xs text-slate-500">{sub.courseName} • {sub.semesterName}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
