import React from 'react';
import { TeacherProfileCard } from '../../components/teacher/TeacherProfileCard';
import { TeacherProfileData } from '../../types/teacher';

interface TeacherProfilePageProps {
  teacher: TeacherProfileData | null;
}

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({ teacher }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Teacher Profile & Institutional Assignments
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] font-medium">
          Verified academic profile, employee records, assigned courses, and class sections
        </p>
      </div>

      <TeacherProfileCard teacher={teacher} />
    </div>
  );
};
