import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TeacherStatCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  borderColor?: string;
}

export const TeacherStatCard: React.FC<TeacherStatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
  bgColor,
  borderColor = 'border-slate-200',
}) => {
  return (
    <div className={`bg-white p-5 rounded-2xl border ${borderColor} shadow-xs hover:shadow-sm transition-all flex items-start justify-between gap-4`}>
      <div className="space-y-1">
        <span className="text-xs font-extrabold uppercase tracking-wider text-[#64748B]">
          {title}
        </span>
        <div className="text-3xl font-black text-[#0F172A] tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs font-semibold text-slate-500">{subtitle}</p>
        )}
      </div>

      <div className={`w-12 h-12 rounded-xl ${bgColor} ${iconColor} flex items-center justify-center shrink-0 shadow-xs`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};
