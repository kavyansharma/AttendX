import React from 'react';
import { Clock, MapPin, BookOpen } from 'lucide-react';
import { UpcomingClass } from '../../types/teacher';

interface UpcomingClassCardProps {
  cls: UpcomingClass;
}

export const UpcomingClassCard: React.FC<UpcomingClassCardProps> = ({ cls }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4 hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00B8D9] flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-[#0F172A] truncate">
            {cls.subjectName}
          </h4>
          <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
            <span className="text-[#2563EB] font-bold">{cls.sectionName}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#00B8D9]" />
              {cls.roomNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-xs font-bold text-[#0F172A]">{cls.startTime}</div>
        <div className="text-[11px] font-semibold text-[#007A93] bg-[#E6FAFF] px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#00B8D9]/30 mt-0.5">
          <Clock className="w-3 h-3" />
          <span>{cls.timeRemaining}</span>
        </div>
      </div>
    </div>
  );
};
