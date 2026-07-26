import React from 'react';
import { Search, Filter } from 'lucide-react';
import { AttendanceRecordStatus } from '../../../types/teacher';

export type FilterStatusOption = 'ALL' | AttendanceRecordStatus;

interface AttendanceFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: FilterStatusOption;
  onFilterChange: (filter: FilterStatusOption) => void;
  totalCount: number;
  filteredCount: number;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  totalCount,
  filteredCount,
}) => {
  const filterOptions: { label: string; value: FilterStatusOption }[] = [
    { label: 'All Students', value: 'ALL' },
    { label: 'Not Marked', value: 'NOT_MARKED' },
    { label: 'Present', value: 'PRESENT' },
    { label: 'Absent', value: 'ABSENT' },
    { label: 'Late', value: 'LATE' },
    { label: 'Excused', value: 'EXCUSED' },
  ];

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by student name or roll number (e.g. CSE001)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:bg-white transition-all"
          />
        </div>

        {/* Counter Info */}
        <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
          <Filter className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Showing {filteredCount} of {totalCount} students</span>
        </div>
      </div>

      {/* Filter Tabs Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onFilterChange(opt.value)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#0B1F3A] text-white shadow-xs font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-[#0F172A]'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
